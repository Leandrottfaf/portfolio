// Crawl the live pointspace.ca pages listed in the sitemap and save, per page:
// title, meta description, canonical, hreflang, H1, heading outline, body copy, FAQ, image URLs.
// Output: reference/current-site/pages/<slug>.json + <slug>.md, and index.md
import fs from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'reference/current-site');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

const sitemap = await fs.readFile(path.join(OUT, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));

const slugFor = (u) => {
  const p = decodeURIComponent(new URL(u).pathname).replace(/^\/|\/$/g, '') || 'en-home';
  return p.replace(/[\/]/g, '__').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9_\-.]/g, '-');
};

const clean = (s) => s.replace(/ /g, ' ').replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();

async function fetchPage(u) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(encodeURI(decodeURI(u)), { headers: { 'User-Agent': UA, 'Accept-Language': 'fr-CA,fr;q=0.9,en;q=0.8' }, redirect: 'follow' });
      return { status: r.status, finalUrl: r.url, html: await r.text() };
    } catch (e) {
      if (i === 2) return { status: 0, finalUrl: u, html: '', error: String(e) };
    }
  }
}

function extract(html, url) {
  const $ = cheerio.load(html);
  const meta = (n) => $(`meta[name="${n}"]`).attr('content') || $(`meta[property="${n}"]`).attr('content') || '';
  const out = {
    url,
    lang: $('html').attr('lang') || '',
    title: clean($('title').first().text()),
    metaDescription: clean(meta('description')),
    ogTitle: meta('og:title'),
    ogDescription: meta('og:description'),
    ogImage: meta('og:image'),
    canonical: $('link[rel="canonical"]').attr('href') || '',
    hreflang: $('link[rel="alternate"][hreflang]').map((_, el) => ({ lang: $(el).attr('hreflang'), href: $(el).attr('href') })).get(),
    h1: [],
    headings: [],
    nav: [],
    footerLinks: [],
    links: [],
    body: '',
    faq: [],
    images: [],
    jsonLd: $('script[type="application/ld+json"]').map((_, el) => $(el).text()).get(),
  };

  // Navigation + footer (Duda: header/footer containers)
  const header = $('.dmHeader, #hcontainer, header').first();
  header.find('a[href]').each((_, a) => {
    const t = clean($(a).text());
    if (t) out.nav.push({ text: t, href: $(a).attr('href') });
  });
  const footer = $('.dmFooter, #fcontainer, footer').first();
  footer.find('a[href]').each((_, a) => {
    const t = clean($(a).text());
    if (t) out.footerLinks.push({ text: t, href: $(a).attr('href') });
  });

  // Images (img src/data-src/srcset + inline background images), whole document
  const imgs = new Set();
  $('img').each((_, el) => {
    for (const attr of ['src', 'data-src', 'data-dm-image-path']) {
      const v = $(el).attr(attr);
      if (v && !v.startsWith('data:')) imgs.add(v);
    }
  });
  $('[style*="background"], [data-bg]').each((_, el) => {
    const st = ($(el).attr('style') || '') + ' ' + ($(el).attr('data-bg') || '');
    for (const m of st.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) if (!m[1].startsWith('data:')) imgs.add(m[1]);
  });
  for (const m of html.matchAll(/https?:\/\/[^"'\s)]+?\.(?:jpe?g|png|webp|gif|svg)(?![a-z])/gi)) {
    if (/irp\.cdn-website\.com|lirp\.cdn-website\.com|cdn-website\.com/.test(m[0])) imgs.add(m[0]);
  }
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src && !src.startsWith('data:')) out.images.push({ src, alt: $(el).attr('alt') || '' });
  });
  out.allImageUrls = [...imgs];

  // Main content = body minus header/footer/scripts
  const main = $('body').clone();
  main.find('script, style, noscript, svg, .dmHeader, #hcontainer, header, .dmFooter, #fcontainer, footer, #dm_content .dmPopup, .dmPopupMask').remove();

  main.find('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const t = clean($(el).text());
    if (!t) return;
    const lvl = el.tagName.toLowerCase();
    out.headings.push(`${lvl}: ${t}`);
    if (lvl === 'h1') out.h1.push(t);
  });

  // FAQ: Duda accordion widgets
  main.find('.dmAccordion li, [data-element-type="dAccordion"] li, .accordion-item').each((_, el) => {
    const q = clean($(el).find('.accordion-title, [class*="title"]').first().text());
    const a = clean($(el).find('.accordion-description, [class*="description"], [class*="content"]').first().text());
    if (q) out.faq.push({ q, a });
  });
  // FAQ from FAQPage JSON-LD (Duda publishes accordions this way)
  const decode = (s) => clean(cheerio.load(`<div>${s}</div>`)('div').text());
  for (const raw of out.jsonLd) {
    try {
      const j = JSON.parse(raw);
      for (const node of [j, ...(j['@graph'] || [])].flat()) {
        if (node && node['@type'] === 'FAQPage') {
          for (const q of node.mainEntity || []) out.faq.push({ q: decode(q.name), a: decode(q.acceptedAnswer?.text || '') });
        }
      }
    } catch {}
  }

  main.find('a[href]').each((_, a) => {
    const t = clean($(a).text());
    out.links.push({ text: t, href: $(a).attr('href') });
  });

  // Body copy: block-level text, deduped consecutive lines
  main.find('br').replaceWith('\n');
  main.find('p, li, h1, h2, h3, h4, h5, h6, div, span, a').each((_, el) => {
    $(el).append('\n');
  });
  const lines = clean(main.text()).split('\n').map((l) => l.trim()).filter(Boolean);
  const dedup = [];
  for (const l of lines) if (dedup[dedup.length - 1] !== l) dedup.push(l);
  out.body = dedup.join('\n');
  return out;
}

function toMd(p) {
  const L = [];
  L.push(`# ${p.url}`, '');
  L.push(`- **HTTP**: ${p.status}${p.finalUrl !== p.url ? ` → ${p.finalUrl}` : ''}`);
  L.push(`- **lang**: ${p.lang}`);
  L.push(`- **Title**: ${p.title}`);
  L.push(`- **Meta description**: ${p.metaDescription}`);
  L.push(`- **Canonical**: ${p.canonical}`);
  L.push(`- **hreflang**: ${p.hreflang.map((h) => `${h.lang} → ${h.href}`).join(' · ')}`);
  L.push(`- **H1**: ${p.h1.join(' | ') || '(none)'}`, '');
  L.push('## Headings', '', ...p.headings.map((h) => `- ${h}`), '');
  if (p.faq.length) {
    L.push('## FAQ', '');
    for (const f of p.faq) L.push(`**Q: ${f.q}**`, '', f.a, '');
  }
  L.push('## Images', '', ...p.images.map((i) => `- ${i.src} — alt: "${i.alt}"`), '');
  const extra = p.allImageUrls.filter((u) => !p.images.some((i) => i.src === u));
  if (extra.length) L.push('### Other image URLs (backgrounds, srcsets)', '', ...extra.map((u) => `- ${u}`), '');
  L.push('## Body copy', '', '```text', p.body, '```', '');
  return L.join('\n');
}

await fs.mkdir(path.join(OUT, 'pages'), { recursive: true });
const index = [];
const queue = [...urls];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const u = queue.shift();
    const r = await fetchPage(u);
    const slug = slugFor(u);
    const data = { ...extract(r.html, u), status: r.status, finalUrl: r.finalUrl, error: r.error };
    await fs.writeFile(path.join(OUT, 'pages', slug + '.json'), JSON.stringify(data, null, 2));
    await fs.writeFile(path.join(OUT, 'pages', slug + '.md'), toMd(data));
    index.push({ url: u, slug, status: r.status, title: data.title, h1: data.h1.join(' | '), metaDescription: data.metaDescription });
    process.stdout.write('.');
  }
});
await Promise.all(workers);
index.sort((a, b) => a.url.localeCompare(b.url));
const md = ['# Current site crawl — ' + new Date().toISOString().slice(0, 10), '', `${index.length} URLs from sitemap.xml. One JSON + one Markdown file per page in \`pages/\`.`, '', '| URL | HTTP | Title | H1 | Meta description | File |', '|---|---|---|---|---|---|'];
for (const i of index) md.push(`| ${i.url} | ${i.status} | ${i.title.replace(/\|/g, '\\|')} | ${i.h1.replace(/\|/g, '/')} | ${i.metaDescription.replace(/\|/g, '\\|')} | pages/${i.slug}.md |`);
await fs.writeFile(path.join(OUT, 'index.md'), md.join('\n') + '\n');
console.log('\ndone', index.length);
