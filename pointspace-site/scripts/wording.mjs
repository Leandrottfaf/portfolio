// Verifies the brief's wording decisions on the built site (dist/). Run after `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const DIST = path.resolve(import.meta.dirname, '../dist');
const load = (route) => cheerio.load(fs.readFileSync(path.join(DIST, route, 'index.html'), 'utf8'));
const text = ($, sel = 'body') => { const c = $(sel).clone(); c.find('script,style').remove(); return c.text().replace(/\s+/g, ' ').replace(/ /g, ' '); };
const results = [];
const check = (name, ok, detail = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
const norm = (s) => s.replace(/ /g, ' ').replace(/[’]/g, "'").trim();

// 1. BIM expansion
const all = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' && all.push(path.relative(DIST, d))));
walk(DIST);
const every = all.map((r) => ({ r, $: load(r) }));
check('1. No "Intergrated" anywhere', every.every(({ $ }) => !/Intergrated/i.test($.html())));
check('1. "Building Information Modeling" on both Scan-to-BIM pages', ['fr-ca/services/modélisation-bim', 'services/scan-to-bim'].every((r) => /Building Information Modeling/.test(text(load(r)))));

// 2. Drafting label
const fr = every.filter(({ $ }) => $('html').attr('lang') === 'fr-CA');
// "mise en plan" may still appear in existing article and case-study titles; it must not be a service label.
check('2. FR pages never show "As-Built Drafting" / "Mise en plan BOMA"; no "Mise en plan" service label', fr.every(({ $ }) => !/As-Built Drafting|Mise en plan BOMA/i.test(text($)) && !/Mise en plan/i.test($('#menu-services, .site-footer, .svc__title').text())));
const frHome = load('fr-ca');
check('2. FR menu, footer and card use "Plans tels que construits"', frHome('#menu-services a').text().includes('Plans tels que construits') && frHome('.site-footer').text().includes('Plans tels que construits') && frHome('.svc__title').text().includes('Plans tels que construits'));
const pt = load('fr-ca/services/plans-tels-que-construits');
check('2. H1 "Plans tels que construits (as-built)"', norm(pt('h1').text()) === 'Plans tels que construits (as-built)', norm(pt('h1').text()));
check('2. "conformes à l\'exécution" in description', /conformes à l'exécution/.test(pt('meta[name=description]').attr('content')));
const enAB = load('services/as-built-drawings');
check('2. EN label "As-Built Drawings"', norm(enAB('h1').text()) === 'As-Built Drawings');

// 3. Scan-to-BIM
const sb = load('fr-ca/services/modélisation-bim');
check('3. H1 "Scan-to-BIM : modélisation BIM de l\'existant"', norm(sb('h1').text()) === "Scan-to-BIM : modélisation BIM de l'existant", norm(sb('h1').text()));
const card = frHome('.svc').filter((_, el) => frHome(el).find('.svc__title').text().trim() === 'Scan-to-BIM');
check('3. Menu + card titled "Scan-to-BIM"; card mentions Revit and IFC', card.length === 1 && /Revit/.test(card.text()) && /IFC/.test(card.text()) && frHome('#menu-services a').text().includes('Scan-to-BIM'));
const intro = text(sb, '#intro-title + div');
check('3. Intro mentions Revit and IFC', /Revit/.test(intro) && /IFC/.test(intro));

// 4. BOMA
const bo = load('fr-ca/services/mesurage-boma');
check('4. FR menu/card/title "Mesurage BOMA"', frHome('#menu-services a').text().includes('Mesurage BOMA') && /Mesurage BOMA/.test(bo('title').text()));
check('4. FR H1', norm(bo('h1').text()) === 'Mesurage BOMA : calcul de superficie locative', norm(bo('h1').text()));
const enBo = load('services/boma-measurement');
check('4. EN H1', norm(enBo('h1').text()) === 'BOMA Measurement: Rentable and Usable Area');
check('4. "superficie locative" used; "surface louable" never', /superficie locative/.test(text(bo)) && every.every(({ $ }) => !/surface louable/i.test(text($))));
check('4. "plans conformes aux normes BOMA" used; never "certifié(s) BOMA"', /plans conformes aux normes BOMA/.test(text(bo)) && every.every(({ $ }) => !/certifiés? BOMA|BOMA certified/i.test(text($))));
check('4. Placeholder "formé aux normes de mesurage BOMA" visible', /formée? aux normes de mesurage BOMA/.test(text(bo)));
check('4. "certificat de mesurage" not used (decision W1)', every.every(({ $ }) => !/certificat de mesurage/i.test(text($))));
check('4. No TODO boxes or approval badges left on any page', every.every(({ $ }) => !/TODO Louis|Approbation requise|Approval required/.test(text($))));

// 5. Quote button
check('5. FR pages: "Obtenir une soumission", no "devis"', fr.every(({ $ }) => /Obtenir une soumission/.test(text($)) && !/\bdevis\b/i.test(text($))));
const en = every.filter(({ $ }) => $('html').attr('lang') === 'en-CA');
check('5. EN pages: "Get a quote"', en.every(({ $ }) => /Get a quote/.test(text($))));

// 6. Deliverable vocabulary (somewhere in the FR site, in the right place)
const frAll = fr.map(({ $ }) => text($)).join(' ');
for (const term of ['relevé architectural', "relevé de l'existant", 'état existant', "plans d'étage", 'élévations et coupes', 'plans de plafonds réfléchis', 'nuage de points', 'plans CAO', 'Scan-to-CAD', 'RVT', 'IFC', 'DWG', 'E57', 'RCP/RCS'])
  check(`6. Vocabulary "${term}"`, frAll.replace(/’/g, "'").includes(term));

// 7. Main term in title, H1 and first paragraph
const MAIN = {
  'fr-ca/services/numerisation-LiDAR-3D': ['numérisation', 'relevé laser'],
  'fr-ca/services/modélisation-bim': ['Scan-to-BIM', "modélisation BIM de l'existant"],
  'fr-ca/services/plans-tels-que-construits': ['plans tels que construits'],
  'fr-ca/services/modelisation-3d': ['modélisation 3D'],
  'fr-ca/services/analyse-du-bâtiment': ['analyse du bâtiment'],
  'fr-ca/services/mesurage-boma': ['mesurage BOMA', 'superficie locative'],
  'fr-ca/services/suivi-davancement': ["suivi d'avancement"],
  'fr-ca/services/photo-360': ['photo 360°'],
  'fr-ca/services/visites-virtuelles-matterport': ['visite'],
  'fr-ca/services/jumeaux-numeriques': ['jumeau'],
  'fr-ca/manufacturier-industriel': ['numérisation 3D industrielle'],
  'fr-ca/architecture-batiments': ["relevé de l'existant"],
};
for (const [r, terms] of Object.entries(MAIN)) {
  const $ = load(r);
  const low = (s) => norm(s).toLowerCase();
  const first = low($('main p').filter((_, el) => $(el).text().length > 80).first().text());
  const ok = terms.every((t) => low($('title').text()).includes(t.toLowerCase()) || low($('h1').text()).includes(t.toLowerCase())) && terms.some((t) => first.includes(t.toLowerCase()) || first.includes(t.toLowerCase().replace(/s\b/, '')));
  check(`7. Main term in title/H1/first paragraph: /${r}`, ok);
}

// 8. Spoken variants
check('8. No spoken variants ("les as-built", "le layout", "le RVT")', every.every(({ $ }) => !/les as-built|le layout|le RVT\b/i.test(text($))));

console.log(results.join('\n'));
const fails = results.filter((r) => r.startsWith('FAIL')).length;
console.log(`\n${results.length - fails}/${results.length} checks passed`);
process.exitCode = fails ? 1 : 0;
