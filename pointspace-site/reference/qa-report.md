# QA report: pointSpace prototype

Run on 2026-09-30 and re-run on 2026-10-02 (all green) against the production build (`npm run build`, served with `astro preview`). Every check is scripted and can be re-run with the commands below.

## Results

| Check | Command | Result |
|---|---|---|
| Structure and SEO: exactly one H1, no heading-level skips, alt on every image, internal links and anchors resolve, canonical present, `hreflang` fr-CA / en-CA / x-default present and reciprocal, unique titles and meta descriptions, valid JSON-LD, forbidden wording | `npm run qa` | 41 pages, **no problems** |
| Brief wording decisions 1–8 (46 assertions: BIM expansion, "Plans tels que construits", Scan-to-BIM H1 + Revit/IFC, BOMA names/H1s/"superficie locative"/"conformes aux normes BOMA", quote buttons, deliverable vocabulary, main term in title/H1/first paragraph, no spoken variants) | `npm run wording` | **46/46 passed** |
| Runtime in a real browser (Edge) at 1280 and 1920 px: console errors, failed requests, HTTP errors, broken images, horizontal overflow, elements outside the viewport, clipped text, FR↔EN switch targets, mega-menu opens | `npm run sweep` | 41 routes × 2 widths, **no issues** |
| Accessibility (axe-core, WCAG 2.1 A/AA incl. colour contrast) | `npm run a11y` | 41 pages, **no violations** |
| Visual review | full-page screenshots of all FR pages and a sample of EN pages | Reviewed; fixes below |
| Portfolio folder untouched | SHA-256 of all 85 files compared with the baseline taken before any work | **0 differences** (85 files, 7 folders) |

`npm run sweep` and `npm run a11y` need the site served on http://127.0.0.1:4321 (`npm run preview -- --port 4321 --host 127.0.0.1`).

## Issues found during the sweep, and fixed

1. Section headings wrapped too narrowly: the `ch` width limit was measured against the body font size, not the heading's. The limit is now set on the heading itself.
2. Home: the "Livrables et analyses" grid left an empty eighth slot. It's now filled with a quote tile.
3. French typography: "Scan-to-BIM / : modélisation" broke a line before the colon. Middleware now adds non-breaking spaces before `: ; ? ! »` and after `«` on every French page.
4. The case-studies index had cards (h3) directly under the H1 (heading skip). A section H2 was added.
5. Case cards with no approved image (St-Denis Thompson, Nelmar, the steel client, Le FouFou) left gaps. They now show a branded placeholder.
6. Feature grids that mixed image and imageless tiles (Analyse du bâtiment) broke the layout. Imageless tiles now show a placeholder.
7. The plan images in the Plans tels que construits and Mesurage BOMA heroes were cropped into mostly white space. They're now shown whole on white.
8. The Jumeaux numériques "related services" block was half-empty (no blog links). It now spans the full width.
9. H1s on image heroes without an eyebrow sat at the top of the block. They now align with the other heroes.
10. Contrast: the call-to-action text on green #036238 was 4.46:1. It's now full cream, 6.07:1.
11. Four service hero lines didn't contain the page's main term (Numérisation LiDAR 3D, Scan-to-BIM, Modélisation 3D, Mesurage BOMA). They were rewritten in FR and EN.
12. Content: unsupported claims were removed or neutralised during the build:
    - an XLSX area schedule and "plans de location" on the BOMA page;
    - "photos 360°" as a modelling source;
    - BOMA listed as a Windsor service.

    Case-study lists now match those on the live pages.
13. Meta lengths were tightened: Windsor FR title (67 → 57 characters), FR case-studies description, EN About description.
14. The logo marquee now loads its logos eagerly, so logos never appear late.

## Hover consistency sweep (2026-10-02)

`npm run hover` hovers every card and image on all 41 pages and groups the visual changes by component.

Before the sweep, clickable cards used 7 different hover behaviours. Most notably, case-study and blog images zoomed while the sector cards' images didn't, and the job cards and the quote tile barely reacted. Clickable cards now follow one system, defined once in `global.css` and `tokens.css`:

| Tier | Components | Hover |
|---|---|---|
| 1. Boxed cards | Service cards, sector cards (home), job cards, "Pas certain du livrable ?" tile | Lift 3 px + shadow + image zoom (1.03, 600 ms) + arrow nudge |
| 2. Open media cards | Case-study cards, blog cards, featured article | Image zoom + title underline + arrow nudge. Image-less case cards change background colour. |
| 3. List rows | Related services, blog links on service pages | Title underline + arrow nudge |

Static media never reacts to hover: feature tiles, process steps, deliverable images, galleries, team portraits, stats and the CTA photo aren't links. Whole-card links show a gold focus ring on the card for keyboard users. Arrows use one utility: `.go` moves → right and ↗ diagonally.

## Known limits (by design)

- Forms are static: submitting shows a prototype notice.
- 14 case studies, the blog articles, the job postings and the privacy policy link to the live site (marked ↗).
- Open questions were decided on 2026-10-02 (`decisions.md`). TODO boxes and approval badges were removed from the UI, and the checks were re-run: QA clean, 47/47 wording checks, sweep clean, no axe violations.
- `sitemap.xml` (40 URLs, each with fr-CA / en-CA / x-default alternates) and `robots.txt` (sitemap reference; `/styleguide` disallowed) are generated with the build. Every sitemap URL was checked against a built page.
