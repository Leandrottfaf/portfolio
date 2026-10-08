// Slice a tall full-page screenshot into side-by-side strips for review.
import sharp from 'sharp';
const [file, outPrefix, h = '2200'] = process.argv.slice(2);
const H = Number(h);
const meta = await sharp(file).metadata();
const n = Math.ceil(meta.height / H);
for (let i = 0; i < n; i += 2) {
  const parts = [];
  for (let k = 0; k < 2 && i + k < n; k++) {
    const top = (i + k) * H, height = Math.min(H, meta.height - top);
    parts.push({ input: await sharp(file).extract({ left: 0, top, width: meta.width, height }).toBuffer(), left: k * (meta.width + 20), top: 0 });
  }
  await sharp({ create: { width: meta.width * 2 + 20, height: H, channels: 3, background: '#ff00ff' } }).composite(parts).png().toBuffer().then((b) => sharp(b).resize({ width: 1800 }).png().toFile(`${outPrefix}-${i / 2 + 1}.png`));
  console.log(`${outPrefix}-${i / 2 + 1}.png`);
}
