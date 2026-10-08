# pointSpace website: desktop prototype

This is an Astro static prototype of pointspace.ca for review. It's desktop-only (1280–1920 px), has no backend, and isn't a production deployment.

## Commands

```bash
npm install
npm run dev        # http://127.0.0.1:4321/fr-ca  (add --host 127.0.0.1 if needed)
npm run build      # static site in dist/
npm run preview    # serve dist/
npm run qa         # after build: H1s, headings, alt text, links, hreflang, titles, JSON-LD, wording rules
npm run wording    # after build: the brief's wording decisions (46 assertions)
npm run sweep      # needs preview on :4321: real-browser checks at 1280 and 1920 px (system Edge)
npm run a11y       # needs preview on :4321: axe-core WCAG 2.1 AA scan
npm run images     # rebuild public/images from the originals (see below)
```

`npm run images` reads three sources:

- the Portfolio folder (read-only);
- the live-site downloads in `reference/current-site/images/`;
- `assets-src/heic/`: the two Place Montréal Trust photos decoded from HEIC, plus the video poster frame.

It writes WebP files to `public/images/` and the manifest `src/data/image-manifest.json`. It never writes into the Portfolio folder.

To regenerate `assets-src/heic/`, you need Python with `pip install pillow pillow-heif`:

- **HEIC photos:** open each HEIC file from `Projet centre eaton-mtl trust/` with pillow-heif, apply `ImageOps.exif_transpose`, resize to fit within 2400 px, and save it as PNG.
- **Poster frame:** `node_modules/ffmpeg-static/ffmpeg.exe -ss 9.5 -i "<Portfolio>/Video.mp4" -frames:v 1 assets-src/heic/poster.png`
- **Hero video:** `public/video/hero-point-cloud-to-bim.mp4` was encoded with `ffmpeg -an -vf "scale=1440:-2,fps=24" -c:v libx264 -preset slower -crf 31 -pix_fmt yuv420p -movflags +faststart`.

## Where things are

- `reference/`: research, crawl, brand extraction, image inventory, page plan, redirects, TODO list for Louis
- `src/styles/tokens.css`: design tokens (brand colours exactly as extracted)
- `src/data/`: routes (FR/EN URL pairs), services, case studies, site facts, image alt text
- `src/components/`: shared components; `src/layouts/BaseLayout.astro`: head, SEO, JSON-LD, header, footer
- `src/middleware.ts`: French non-breaking spaces before `: ; ? ! »`
- `src/pages/sitemap.xml.ts` + `public/robots.txt`: sitemap with fr-CA / en-CA alternates (40 URLs); `/styleguide` excluded
- `/styleguide`: design-system reference page (noindex)
- `reference/qa-report.md`: final QA results; `reference/image-placement.md`: which image is on which page

The prototype is for UI review. The open content questions were decided and applied (`reference/decisions.md`), so pages show no TODO boxes or approval badges.
