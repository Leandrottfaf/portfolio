// QA over the built site (dist/): run `npm run build` first.
// Checks: one H1, heading order, alt text, internal links, hreflang pairs, canonical, unique title/meta,
// JSON-LD validity, and the brief's wording rules.
import fs from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';

const DIST = path.resolve(import.meta.dirname, '../dist');
const SITE = 'https://www.pointspace.ca';

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}
const toRoute = (file) => {
  const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
  return rel ? '/' + rel : '/';
};
const exists = async (p) => fs.access(p).then(() => true, () => false);

const files = await walk(DIST);
const pages = new Map();
const problems = [];
const warn = (route, msg) => problems.push(`${route}: ${msg}`);

// Wording rules from the brief (checked in visible text + title/meta)
const FORBIDDEN = [
  [/Intergrated/i, 'BIM must be "Building Information Modeling"'],
  [/surface louable/i, 'use "superficie locative"'],
  [/certifi(é|e)s? BOMA|plans certifiés/i, 'use "plans conformes aux normes BOMA"'],
  [/Obtenir un devis|Obtenez un devis/i, 'FR quote button must be "Obtenir une soumission"'],
  [/As-Built Drafting|Mise en plan BOMA/i, 'old service label'],
  [/les as-built|le layout/i, 'unconfirmed spoken variant'],
];

for (const file of files) {
  const route = toRoute(file);
  const html = await fs.readFile(file, 'utf8');
  const $ = cheerio.load(html);
  const lang = $('html').attr('lang');
  const title = $('title').text().trim();
  const desc = $('meta[name="description"]').attr('content') ?? '';
  const noindex = $('meta[name="robots"]').attr('content')?.includes('noindex');
  pages.set(route, { title, desc, lang, noindex });

  const h1 = $('h1');
  if (h1.length !== 1) warn(route, `${h1.length} <h1>`);
  let prev = 1;
  $('main h1, main h2, main h3, main h4, main h5, main h6').each((_, el) => {
    const lvl = Number(el.tagName[1]);
    if (lvl > prev + 1) warn(route, `heading skip h${prev} → h${lvl}: "${$(el).text().trim().slice(0, 60)}"`);
    prev = lvl;
  });
  $('img').each((_, el) => {
    const alt = $(el).attr('alt');
    if (alt === undefined) warn(route, `img without alt: ${$(el).attr('src')}`);
  });
  if (!title) warn(route, 'missing <title>');
  if (!desc && !noindex) warn(route, 'missing meta description');
  if (!noindex) {
    const canon = $('link[rel="canonical"]').attr('href');
    if (!canon) warn(route, 'missing canonical');
    const hl = Object.fromEntries($('link[rel="alternate"][hreflang]').map((_, el) => [[$(el).attr('hreflang'), $(el).attr('href')]]).get());
    for (const k of ['fr-CA', 'en-CA', 'x-default']) if (!hl[k]) warn(route, `missing hreflang ${k}`);
    pages.get(route).hreflang = hl;
    pages.get(route).canonical = canon;
  }
  $('script[type="application/ld+json"]').each((_, el) => { try { JSON.parse($(el).text()); } catch { warn(route, 'invalid JSON-LD'); } });

  // Internal links
  const links = new Set();
  $('a[href]').each((_, el) => links.add($(el).attr('href')));
  for (const href of links) {
    if (/^(mailto:|tel:|#)/.test(href)) continue;
    if (/^https?:/.test(href)) { if (!href.startsWith(SITE)) continue; }
    if (href.startsWith(SITE)) continue; // links to the live site (pages not rebuilt)
    const [p, hash] = href.split('#');
    const target = path.join(DIST, decodeURI(p), 'index.html');
    if (!(await exists(target))) warn(route, `broken internal link ${href}`);
    else if (hash) {
      const t$ = cheerio.load(await fs.readFile(target, 'utf8'));
      if (!t$(`[id="${hash}"]`).length) warn(route, `missing anchor ${href}`);
    }
  }

  // Wording
  const text = $('body').clone().find('script,style').remove().end().text() + ' ' + title + ' ' + desc;
  for (const [re, why] of FORBIDDEN) {
    const m = text.match(re);
    if (m && !(lang === 'en-CA' && /Obtenir/.test(why))) warn(route, `wording "${m[0]}": ${why}`);
  }
  if (lang === 'fr-CA' && /Get a quote/.test(text)) warn(route, 'English quote label on FR page');
  if (lang === 'en-CA' && /Obtenir une soumission/.test(text)) warn(route, 'French quote label on EN page');
}

// Pairing, uniqueness
const titles = new Map(), descs = new Map();
for (const [route, p] of pages) {
  if (p.noindex) continue;
  titles.set(p.title, [...(titles.get(p.title) ?? []), route]);
  descs.set(p.desc, [...(descs.get(p.desc) ?? []), route]);
  for (const [k, href] of Object.entries(p.hreflang ?? {})) {
    if (k === 'x-default') continue;
    const r = decodeURI(new URL(href).pathname).replace(/\/$/, '') || '/';
    if (!pages.has(r)) warn(route, `hreflang ${k} → ${r} (page not built)`);
    else {
      const back = pages.get(r).hreflang;
      const self = decodeURI(new URL(p.canonical).pathname).replace(/\/$/, '') || '/';
      const backR = back && Object.values(back).map((h) => decodeURI(new URL(h).pathname).replace(/\/$/, '') || '/');
      if (back && !backR.includes(self)) warn(route, `hreflang not reciprocal with ${r}`);
    }
  }
}
for (const [t, rs] of titles) if (rs.length > 1) problems.push(`duplicate title "${t}": ${rs.join(', ')}`);
for (const [d, rs] of descs) if (rs.length > 1) problems.push(`duplicate meta description: ${rs.join(', ')}`);

console.log(`${pages.size} pages checked`);
console.log(problems.length ? problems.map((p) => ' - ' + p).join('\n') : 'No problems found.');
process.exitCode = problems.length ? 1 : 0;
