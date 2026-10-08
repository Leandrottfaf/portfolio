// Hover audit: hovers every clickable card/link block and every image on every page (system Edge),
// records what visually changes, and groups results by component so inconsistencies stand out.
// Requires the preview server on 127.0.0.1:4321.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '../dist');
const routes = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' && routes.push('/' + path.relative(DIST, d).split(path.sep).join('/'))));
walk(DIST);

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const groups = new Map(); // signature -> { kind, effects:Set, pages:Set, samples }

const SNAP = () => {
  window.__snap = (root) => {
    const q = (sel) => root.matches(sel) ? root : root.querySelector(sel);
    const img = root.querySelector('img');
    const title = root.querySelector('.card-link, .svc__title, .reading .t-h4, h2, h3, h4') || (root.matches('.reading a') ? root.querySelector('.t-h4') : root);
    const arrow = root.querySelector('.go, .svc__arrow, .btn__arrow, .link-arrow span');
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const r = cs(root), i = cs(img), t = cs(title), a = cs(arrow);
    return {
      cursor: r.cursor,
      rootTransform: r.transform, rootShadow: r.boxShadow, rootBg: r.backgroundColor, rootBorder: r.borderColor,
      imgTransform: i ? i.transform : null,
      titleDeco: t ? t.textDecorationLine : null, titleColor: t ? t.color : null,
      arrowTransform: a ? a.transform : null,
    };
  };
};

for (const r of routes.sort()) {
  const route = r === '/' ? '/' : r.replace(/\/$/, '');
  await page.goto('http://127.0.0.1:4321' + encodeURI(route), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible')));
  await page.evaluate(SNAP);
  // Candidate blocks: cards and link blocks inside <main> (header/footer menus audited separately)
  const handles = await page.$$(
    'main a.svc, main a.svc-cta, main article.case, main a.sector, main li.post, main article.feature, main li.job, main .reading a, main .related__services a, main .flow__step, main .need, main .feature, main .member, main .sol li, main .gallery figure, main .deliv-visuals figure, main .cases-head .link-arrow, main .details__quote, main .cmp, main .stats__item, main li.step'
  );
  for (const h of handles) {
    const info = await h.evaluate((el) => {
      const cls = (el.className && typeof el.className === 'string' ? el.className : '').split(' ').filter((c) => c && !c.startsWith('astro') && !/^is-|reveal/.test(c));
      const clickable = el.tagName === 'A' || !!el.querySelector('a[href]');
      return { sig: `${el.tagName.toLowerCase()}.${cls[0] || '?'}${cls.includes('svc--compact') ? '--compact' : ''}${el.querySelector('img') ? '+img' : ''}`, clickable, visible: el.getBoundingClientRect().height > 0 };
    });
    if (!info.visible) continue;
    await h.scrollIntoViewIfNeeded();
    await page.mouse.move(2, 2);
    await page.waitForTimeout(80);
    const before = await h.evaluate((el) => window.__snap(el));
    const box = await h.boundingBox();
    if (!box) continue;
    await page.mouse.move(box.x + box.width / 2, box.y + Math.min(box.height / 2, 120));
    await page.waitForTimeout(700);
    const after = await h.evaluate((el) => window.__snap(el));
    const effects = [];
    if (before.imgTransform !== after.imgTransform) effects.push('img-zoom');
    if (before.rootTransform !== after.rootTransform) effects.push('lift');
    if (before.rootShadow !== after.rootShadow) effects.push('shadow');
    if (before.rootBg !== after.rootBg) effects.push('bg');
    if (before.rootBorder !== after.rootBorder) effects.push('border');
    if (before.titleDeco !== after.titleDeco) effects.push('title-underline');
    if (before.titleColor !== after.titleColor) effects.push('title-color');
    if (before.arrowTransform !== after.arrowTransform) effects.push('arrow-nudge');
    const key = info.sig;
    if (!groups.has(key)) groups.set(key, { clickable: info.clickable, variants: new Map(), cursor: new Set() });
    const g = groups.get(key);
    const v = effects.join(' + ') || '(none)';
    if (!g.variants.has(v)) g.variants.set(v, new Set());
    g.variants.get(v).add(route);
    g.cursor.add(after.cursor);
  }
}
await browser.close();

for (const [sig, g] of [...groups].sort()) {
  console.log(`\n${sig}  ${g.clickable ? '[clickable]' : '[static]'}  cursor: ${[...g.cursor].join('/')}`);
  for (const [v, pages] of g.variants) console.log(`   ${v.padEnd(48)} on ${pages.size} page(s): ${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? ', …' : ''}`);
}
