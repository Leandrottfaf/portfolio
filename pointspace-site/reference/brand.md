# pointSpace — brand extraction

Extracted on 2026-09-30 from the live site (https://www.pointspace.ca/fr-ca). Sources: the site stylesheet `5767f5b6_fr-ca_header_1.min.css` (saved in `reference/current-site/raw/`), inline styles in the page HTML, `getComputedStyle()` in a browser on the live homepage, and the logo SVGs in the Portfolio folder. No values are guessed. Each one below was found in at least one of these sources, and the counts show how often.

## Colours

| Token (proposed) | Hex | RGB as written in the CSS | Where it appears on the live site | Count in CSS + homepage |
|---|---|---|---|---|
| `--ps-green-900` (primary) | **#004225** | `rgba(0,66,37,1)` | Main dark background (hero, sections, **footer**), button text on gold, borders. Also the green in the logo SVGs (`#004225`). | 167 + 5 |
| `--ps-green-700` | **#036238** | `rgba(3,98,56,1)` | Secondary green section backgrounds (alternating bands, 10 blocks on the homepage) | 79 |
| `--ps-green-600` | **#2F634A** | `rgba(47,99,74,1)` | Borders / dividers | 15 |
| `--ps-gold` (accent) | **#E3AB38** | `rgba(227,171,56,1)` | Primary CTA pill background ("Obtenir un devis"), gold headings/links, borders | 72 + 23 |
| `--ps-cream` | **#EDE7DA** | `rgba(237,231,218,1)` (also `rgb(237,231,219)` on the H1) | Text on green (H1, body), cream sections, secondary pill buttons, SVG icon fills. Also the cream in the logo SVG (`#ede7da`). | 308 + 217 + 38 |
| `--ps-cream-50` | **#FAF6EA** | `rgba(250,246,234,1)` (also `#faf5e8`) | Light text variant | 9 + 13 |
| `--ps-ink-brown` | **#463939** | `#463939` | Computed text colour inside pill buttons | 6 |
| `--ps-header-grey` | **#F4F4F4** | `rgb(244,244,244)` | Header container background (behind the transparent header) | 8 |

**Logo colours** (from the Portfolio SVGs, which are authoritative for the logo):

- `Green_Background_Logo.svg`: cream `#ede7da` wordmark + cream and gold `#e3ab35` bars. **Use on #004225 green.**
- `Cream_Background_Logo.svg`: green `#004225` / `#003f23` wordmark + green and gold `#e3ab35` bars. **Use on cream #EDE7DA or white.**
- `Yellow_Background_Logo.svg`: green `#004225` / `#003f23` wordmark + green and cream bars (no gold). **Use on gold #E3AB38.**

Note: the logo gold is `#E3AB35`, while the site CSS gold is `#E3AB38`. The difference can't be seen. The prototype uses `#E3AB38` for UI and leaves the logo SVG untouched.

### Contrast (WCAG 2.x, computed)

| Foreground on background | Ratio | AA normal text (4.5) | AA large text (3.0) |
|---|---|---|---|
| Cream #EDE7DA on green #004225 | 9.44 | ✅ | ✅ |
| Cream-50 #FAF6EA on green #004225 | 10.76 | ✅ | ✅ |
| Gold #E3AB38 on green #004225 | 5.62 | ✅ | ✅ |
| Green #004225 on gold #E3AB38 (CTA) | 5.62 | ✅ | ✅ |
| Green #004225 on cream #EDE7DA | 9.44 | ✅ | ✅ |
| Green-700 #036238 on cream #EDE7DA | 6.07 | ✅ | ✅ |
| Cream #EDE7DA on green-700 #036238 | 6.07 | ✅ | ✅ |
| Gold #E3AB38 on green-700 #036238 | 3.61 | ❌ | ✅ large text/UI only |
| **Gold #E3AB38 on cream #EDE7DA** | **1.68** | ❌ | ❌ **never use** |

Rules for the prototype: gold is used for text only on #004225 green. On cream, gold is used only as a decorative fill or border, never for text or icons that carry meaning.

## Typography

The live site self-hosts **Neue Haas Grotesk Display** (Duda custom font upload). The font files were downloaded to `reference/brand-fonts/`:

| Family name in CSS | File | Used for on live site |
|---|---|---|
| `NeueHaasDisplay-Roman` | `NeueHaasDisplay-Roman-1e90_400.ttf` | H1 (70px/70px), body copy, buttons (16–18px), nav |
| `NeueHaasDisplayLight` | `NeueHaasDisplayLight-4f1c_400.ttf` | Headings H2/H3 base family (most frequent: 40 uses) |
| `NeueHaasDisplay-Mediu` / `NeueHaasDisplayMediu` | `NeueHaasDisplay-Mediu-9db1_400.ttf`, `NeueHaasDisplayMediu-ab01_400.ttf` | Emphasis |
| `NeueHaasDisplayBold`, `NeueHaasDisplayBlack`, `NeueHaasDisplayThin`, `NeueHaasDisplay-XThin` | matching files | Occasional |

Each weight is uploaded as a separate family at `font-weight:400`. In the prototype they're mapped to one `"Neue Haas Display"` family with real weights (300 Light, 400 Roman, 500 Medium, 700 Bold).

The live site also loads Google Fonts (Roboto, Montserrat, Poppins, Lato). These come from Duda widget defaults (for example, 7 `Eater` and `Creepster` references are template leftovers) and aren't part of the brand, so the prototype doesn't use them.

⚠️ **Licence to confirm (TODO for Louis):** Neue Haas Grotesk Display is a commercial Monotype typeface. The files are served from pointSpace's own Duda CDN, so a web licence probably exists. Confirm that it covers a new host before production. The prototype uses it locally for review only, with fallback `"Helvetica Neue", Arial, sans-serif`.

## Components observed on the live site

- **Buttons:** fully rounded pills (`border-radius: 50px`), 16px Neue Haas Display Roman.
  - Primary: gold `#E3AB38` fill, green `#004225` label.
  - Secondary on green: transparent, 1px gold or cream border, cream label.
  - Secondary on cream: transparent, 1px green border, green label.
  - Arrow glyph "🡒" appended to secondary CTAs.
- **Headings:** uppercase on the live site (`SERVICES DE NUMÉRISATION 3D…`). The prototype uses sentence case, which reads better at the size of the new French H1s ("Scan-to-BIM : modélisation BIM de l'existant"). This is a design choice, not a brand rule, and can be reverted.
- **Header:** logo centred, hamburger menu, FR | EN switch, all on dark green.
- **Footer:** `#004225` background, `#F7F7F7` text.
- **Logo mark:** a stepped series of vertical bars rising left to right (a "scan line" motif) plus the lowercase wordmark "pointSpace". The prototype reuses this bar rhythm as a subtle graphic device (dividers, progress steps) without altering the logo itself.
