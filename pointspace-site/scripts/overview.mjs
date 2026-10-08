// Turn full-page screenshots into one-third-scale column overviews (ov-*.png) for quick visual review.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const dir = process.argv[2];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.png') && !f.startsWith('ov-'))) {
  const buf = await sharp(path.join(dir, f)).resize({ width: 480 }).png().toBuffer();
  const m = await sharp(buf).metadata();
  const H = 1700, n = Math.ceil(m.height / H), parts = [];
  for (let i = 0; i < n; i++) parts.push({ input: await sharp(buf).extract({ left: 0, top: i * H, width: 480, height: Math.min(H, m.height - i * H) }).toBuffer(), left: i * 490, top: 0 });
  await sharp({ create: { width: n * 490, height: H, channels: 3, background: '#f0f' } }).composite(parts).png().toFile(path.join(dir, 'ov-' + f));
}
