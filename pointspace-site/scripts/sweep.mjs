// Runtime sweep of every built page in a real browser (system Edge), at 1280 and 1920 px.
// Checks: console errors, failed requests, broken images, horizontal overflow, elements wider than the
// viewport, text clipped by overflow:hidden, language switch target, and that the mega menu opens.
// Requires the dev (or preview) server on 127.0.0.1:4321.
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '../dist');
async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name === 'index.html') out.push('/' + path.relative(DIST, dir).split(path.sep).join('/'));
  }
  return out.map((r) => (r === '/' ? '/' : r.replace(/\/$/, '')));
}
const routes = (await walk(DIST)).sort();
const browser = await chromium.launch({ channel: 'msedge' });
const issues = [];
for (const width of [1280, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  let current = '';
  page.on('console', (m) => { if (m.type() === 'error') issues.push(`${width} ${current}: console error: ${m.text().slice(0, 160)}`); });
  page.on('requestfailed', (r) => { if (!/\.mp4/.test(r.url())) issues.push(`${width} ${current}: request failed ${r.url()}`); });
  page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith('http://127.0.0.1')) issues.push(`${width} ${current}: HTTP ${r.status()} ${r.url()}`); });
  for (const route of routes) {
    current = route;
    await page.goto('http://127.0.0.1:4321' + encodeURI(route), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager')));
    await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 20000 }).catch(() => {});
    const r = await page.evaluate(() => {
      const out = [];
      const vw = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > vw + 1) out.push(`horizontal overflow ${document.documentElement.scrollWidth} > ${vw}`);
      for (const img of document.images) if (img.complete && img.naturalWidth === 0) out.push(`broken image ${img.getAttribute('src')}`);
      // elements that stick out of the viewport (ignoring decorative/marquee)
      for (const el of document.querySelectorAll('main *')) {
        if (el.closest('.logos__viewport, .phero__media, .pagehero__media, .hero__media, .visually-hidden, .cta__bars')) continue;
        const b = el.getBoundingClientRect();
        if (b.width && (b.right > vw + 2 || b.left < -2)) { out.push(`element outside viewport: <${el.tagName.toLowerCase()} class="${el.className}"> ${Math.round(b.left)}–${Math.round(b.right)}`); break; }
      }
      // text clipped horizontally (single-line overflow)
      for (const el of document.querySelectorAll('h1,h2,h3,h4,p,a,span,li,dd,button,label')) {
        if (!el.closest('.visually-hidden') && el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow === 'hidden' && el.clientWidth > 0) { out.push(`clipped text: ${el.textContent.trim().slice(0, 60)}`); }
      }
      // headings that overlap the sticky header at the top of the page are not checked here (visual pass)
      const alt = document.querySelector('a.lang')?.getAttribute('href');
      return { out, alt, h1: document.querySelector('h1')?.textContent.trim() };
    });
    for (const o of r.out) issues.push(`${width} ${route}: ${o}`);
    if (width === 1280) {
      const res = await page.request.get('http://127.0.0.1:4321' + encodeURI(r.alt ?? ''));
      if (!res.ok()) issues.push(`${route}: language switch → ${r.alt} (${res.status()})`);
    }
  }
  // menu interaction once per width
  await page.goto('http://127.0.0.1:4321/fr-ca', { waitUntil: 'networkidle' });
  await page.click('[data-menu-button][aria-controls="menu-services"]');
  const open = await page.evaluate(() => getComputedStyle(document.querySelector('#menu-services')).visibility);
  if (open !== 'visible') issues.push(`${width}: services mega menu did not open on click`);
  await page.keyboard.press('Escape');
  await page.close();
}
await browser.close();
console.log(`${routes.length} routes × 2 widths swept`);
console.log(issues.length ? [...new Set(issues)].map((i) => ' - ' + i).join('\n') : 'No runtime issues found.');
