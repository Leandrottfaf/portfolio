// Renders film/index.html frame by frame and encodes an MP4 with ffmpeg.
//
//   python3 -m http.server 8000            (from the repo root)
//   node bim-to-cad/film/render.mjs --url http://localhost:8000/bim-to-cad/film/ --out film.mp4
//
// Options: --fps 30, --from 0, --to <seconds>, --lang en|fr, --step 1 (render every Nth frame,
// for quick previews). Needs Playwright (npm i playwright) and ffmpeg with libx264.

import { spawn } from "node:child_process";
import { chromium } from "playwright";

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : def;
};
const url = arg("url", "http://localhost:8000/bim-to-cad/film/");
const out = arg("out", "film.mp4");
const fps = +arg("fps", 30);
const step = +arg("step", 1);
const lang = arg("lang", "en");

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.error("page error:", e.message));
if (process.env.THREE_DIR) { // serve three.js locally when the CDN isn't reachable
  await page.route(/cdn\.jsdelivr\.net\/npm\/three@0\.169\.0\/(.*)$/, (r) =>
    r.fulfill({ path: `${process.env.THREE_DIR}/${r.request().url().split("three@0.169.0/")[1]}`, contentType: "application/javascript" }));
}
await page.goto(`${url}?lang=${lang}`);
await page.waitForFunction(() => window.film?.ready, null, { timeout: 180000 });
await page.evaluate(() => document.fonts.ready);
const duration = await page.evaluate(() => window.film.duration);
const from = +arg("from", 0), to = +arg("to", duration);

const ffmpeg = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps / step), "-i", "-",
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-r", String(fps), "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });

const frames = Math.round((to - from) * fps);
const t0 = Date.now();
for (let f = 0; f < frames; f += step) {
  const t = from + f / fps;
  await page.evaluate((t) => window.film.render(t), t);
  const jpg = await page.screenshot({ type: "jpeg", quality: 95 });
  if (!ffmpeg.stdin.write(jpg)) await new Promise((r) => ffmpeg.stdin.once("drain", r));
  if (f % (fps * step) === 0) {
    const done = (f + step) / frames, el = (Date.now() - t0) / 1000;
    console.log(`t=${t.toFixed(1)}s  ${(done * 100).toFixed(0)}%  ~${Math.round(el / done - el)}s left`);
  }
}
ffmpeg.stdin.end();
await new Promise((r) => ffmpeg.on("close", r));
await browser.close();
console.log("wrote", out);
