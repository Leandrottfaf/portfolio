// Full-page screenshots of prototype pages via the system Edge (no browser download).
// Usage: node scripts/shoot.mjs <outDir> <path> [path...]   (dev server on 127.0.0.1:4321)
import { chromium } from 'playwright-core';
import path from 'node:path';
const [out, ...paths] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: Number(process.env.W || 1440), height: 900 } });
for (const p of paths) {
  await page.goto('http://127.0.0.1:4321' + encodeURI(p), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible')));
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await page.mouse.wheel(0, 600); await page.waitForTimeout(90); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(300);
  const file = path.join(out, (p.replace(/[\/]+/g, '_').replace(/^_/, '') || 'root') + '.png');
  await page.screenshot({ path: file, fullPage: true });
  console.log(file, await page.evaluate(() => document.body.scrollHeight));
}
await browser.close();
