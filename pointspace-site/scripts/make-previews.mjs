// Read-only pass over the Portfolio folder: write small PNG previews (for visual review)
// and record pixel dimensions. Never writes into the Portfolio folder.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PORTFOLIO = 'C:/Users/pointSpace/pointspace.ca/Louis Dallaire - Marketing/Portfolio';
const OUT = process.argv[2];
await fs.mkdir(OUT, { recursive: true });
const exts = /\.(png|jpe?g|heic|webp)$/i;

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'AutoCAD') out.push(...(await walk(p))); }
    else if (exts.test(e.name)) out.push(p);
  }
  return out;
}

const rows = [];
let i = 0;
for (const f of await walk(PORTFOLIO)) {
  const rel = path.relative(PORTFOLIO, f).replace(/\\/g, '/');
  const id = String(++i).padStart(2, '0');
  try {
    const img = sharp(f, { limitInputPixels: false, failOn: 'none' });
    const m = await img.metadata();
    await img.rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true }).png().toFile(path.join(OUT, `${id}.png`));
    rows.push({ id, rel, width: m.width, height: m.height, format: m.format });
  } catch (e) {
    rows.push({ id, rel, error: String(e.message).slice(0, 160) });
  }
}
await fs.writeFile(path.join(OUT, 'index.json'), JSON.stringify(rows, null, 1));
for (const r of rows) console.log(r.id, r.rel, r.error ? 'ERROR ' + r.error : `${r.width}x${r.height} ${r.format}`);
