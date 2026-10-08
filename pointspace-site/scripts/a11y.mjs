// axe-core accessibility sweep (WCAG 2.x A/AA incl. colour contrast) over every built page.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const DIST = path.resolve(import.meta.dirname, '../dist');
const routes = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' && routes.push('/' + path.relative(DIST, d).split(path.sep).join('/'))));
walk(DIST);
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const summary = new Map();
for (const r of routes.sort()) {
  const route = r === '/' ? '/' : r.replace(/\/$/, '');
  await page.goto('http://127.0.0.1:4321' + encodeURI(route), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible')));
  await page.addScriptTag({ content: axeSrc });
  const res = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')).slice(0, 4) })));
  for (const v of res) {
    const k = v.id;
    if (!summary.has(k)) summary.set(k, { impact: v.impact, pages: [], sample: v.nodes });
    summary.get(k).pages.push(route);
  }
}
await browser.close();
console.log(`${routes.length} pages scanned`);
if (!summary.size) console.log('No axe violations.');
for (const [id, s] of summary) console.log(`\n${id} (${s.impact}) on ${s.pages.length} pages: ${s.pages.slice(0, 5).join(', ')}\n  ${s.sample.join('\n  ')}`);
