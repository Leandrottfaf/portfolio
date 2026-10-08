# Proposed URL changes (old → new)

**Decision (2026-09-30): all 8 changes approved ("make the changes as you see fit"), and the prototype uses the new URLs.** Louis still has final sign-off (TODO T2). The brief says to keep existing slugs where possible. The rows below are proposed only where the old slug names the wrong thing (an old service name or a partner brand) or contains a character that causes trouble in URLs. If you'd rather not change a slug, the prototype keeps the old one and only the H1 and title change.

Each change needs a **301 redirect** on the production host. Duda supports these under Site Settings → URL Redirects. The live site already uses 301s for several legacy slugs (for example `/fr-ca/etude-de-cas/vac-aero`).

## Proposed

| # | Old URL | New URL | Why | Priority |
|---|---|---|---|---|
| 1 | `/fr-ca/services/mise-en-plan` | `/fr-ca/services/plans-tels-que-construits` | The page's main term becomes "Plans tels que construits" (brief wording decision 2). The research found no competitor using "mise en plan", and the URL then matches the H1. | Approved |
| 2 | `/services/As-Built-Drafting` | `/services/as-built-drawings` | The EN label becomes "As-Built Drawings". The slug matches the buyer term and is lowercase. | Approved |
| 3 | `/fr-ca/services/mise-en-plan-boma` | `/fr-ca/services/mesurage-boma` | The service is renamed "Mesurage BOMA" (decision 4). The research found no competitor using "mise en plan BOMA". | Approved |
| 4 | `/services/BOMA_As-Built_Digital_Plans` | `/services/boma-measurement` | The EN label becomes "BOMA Measurement". This also drops the underscores and capitals. | Approved |
| 5 | `/fr-ca/services/prevu3d` | `/fr-ca/services/jumeaux-numeriques` | The slug is a partner's brand, not the service. The menu says "Jumeaux numériques". | Approved |
| 6 | `/services/prevu3d` | `/services/digital-twins` | Same as #5. | Approved |
| 7 | `/services/360°-photo` | `/services/360-photo` | The `°` character is percent-encoded (`/services/360%C2%B0-photo`) and breaks when copied or shared. | Approved |
| 8 | `/fr-ca/services/rapport-davancement` | `/fr-ca/services/suivi-davancement` | The brief names the service "Suivi d'avancement", and the live homepage card already says "SUIVI D'AVANCEMENT". | Approved |

## Kept as-is (deliberately)

| URL | Note |
|---|---|
| `/fr-ca/services/modélisation-bim` | The H1 becomes "Scan-to-BIM : modélisation BIM de l'existant" and the slug still matches ("modélisation-bim"). The accented slug works but is encoded in links. A later change to `/fr-ca/services/scan-to-bim` is possible, but not proposed now. |
| `/fr-ca/services/numerisation-LiDAR-3D`, `/services/LiDAR-3D-Scanning` | Mixed case is kept to avoid a redirect. |
| `/services/progress-reporting` | Kept. The EN menu label becomes "Progress Tracking". |
| `/fr-ca/services/analyse-du-bâtiment` | Accented, kept. |
| `/fr-ca/case-studies/case-study-windsor` | Kept for the template. Note that FR case studies live under two prefixes (`/fr-ca/etude-de-cas/` and `/fr-ca/case-studies/`). Harmonising them is out of scope. |

## Pages not rebuilt: recommendations for production

| Old URL | Recommendation |
|---|---|
| `/services/3d-scanning-and-3d-modeling` (EN only, not in any menu) | 301 → `/services/LiDAR-3D-Scanning`. It's a near-duplicate of the scanning page, and the brief asks for no near-duplicate pages. |
| `/fr-ca/services/numerisation-3d-et-modelisation-3d` (unlisted FR twin, not in the sitemap) | 301 → `/fr-ca/services/numerisation-LiDAR-3D`. |
| `/fr-ca/landing-page`, `/landing-page`, `/fr-ca/lead-magnet-landing-page`, `/lead-magnet-landing-page` | Ad landing pages, out of scope. Keep or `noindex` as the marketing plan decides. |

## Existing broken internal links (404 today): fix in production

| Broken link | Found on | Point to |
|---|---|---|
| `/etude-de-cas-jcb` | EN architecture page | `/case-studies/As-Built-plans-le-foufou` |
| `/fr-ca/la-numerisation-3d-le-processus-de-mise-en-plan` | FR LiDAR FAQ | `/fr-ca/la-numerisation-3d-le-processus-de-modelisation3d-et-mise-en-plan` |
| `/fr-ca/services/analyse` | FR in-text links | `/fr-ca/services/analyse-du-bâtiment` |
| `/fr-ca/services/bim` | FR in-text links | `/fr-ca/services/modélisation-bim` |
| `/fr-ca/services/numerisation` | FR in-text links | `/fr-ca/services/numerisation-LiDAR-3D` |
| `/fr-ca/services/rapport-davancemment` | FR LiDAR page | `/fr-ca/services/suivi-davancement` (or `rapport-davancement` if #8 isn't approved) |
