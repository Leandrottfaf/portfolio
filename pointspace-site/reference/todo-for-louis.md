# TODO for Louis

> **Resolved on 2026-10-02.** Every item below was decided and applied; see `decisions.md`. The prototype no longer shows TODO boxes or approval badges. This list is kept as the record of what was open.

This list is kept up to date through every step. In the prototype, each open item also appears on the page it affects as a visible yellow "TODO Louis" box or an "Approbation requise" badge. That way nothing unconfirmed can reach production unnoticed.

## 1. Wording and claims to confirm

| # | Item | Where | Current placeholder / proposal |
|---|---|---|---|
| W1 | **"Certificat de mesurage"**: keep it in the intro or FAQ? Clients may search for it, but BOMA providers in Montréal who sell a "certificat de mesurage" are mostly arpenteurs-géomètres. | Mesurage BOMA | Visible TODO box; the term isn't used in body copy yet |
| W2 | **Exact name of the BOMA training one drafter holds**, and who issued it (for example a BOMA Québec workshop). BOMA International certifies no individuals or firms for floor measurement. | Mesurage BOMA, À propos | Placeholder: "formé aux normes de mesurage BOMA" |
| W3 | Remove the **BOMA Canada logo** shown on the live BOMA pages? No membership or affiliation is stated anywhere. | Mesurage BOMA | Not used in the prototype |
| W4 | Remove the live claims **"plans certifiés BOMA"** and **"garantit… la conformité aux réglementations locales et internationales"**. | Mesurage BOMA | Replaced with "plans conformes aux normes BOMA" |
| W5 | Was the **Gare Windsor** project measured to BOMA standards? The live case study never says BOMA, but the Portfolio has a colour-coded area plan. | BOMA, Windsor case study | Captioned "plan des superficies par zone" (no BOMA claim) |
| W6 | Does pointSpace measure **shopping centres (ICSC method)**? This is a research question. | Mesurage BOMA | Not mentioned |
| W7 | **Accuracy wording**: the live site says "précision millimétrique" on most pages, "généralement précis à quelques millimètres près" (Scan-to-BIM FAQ), and elsewhere "nous ne pouvons pas garantir un niveau de précision exact". Which one is the official line? | All service pages | The prototype keeps the live wording plus the live disclaimer. No new figures. |
| W8 | **Founding year**: the site says 2018 (EN 3D page), 2019 (careers) and "6+ ans". | À propos | "6+ années d'expérience" only |
| W9 | Louis's title: **Président** (FR) / **CEO** (EN) / "Manager" (privacy page). | À propos, JSON-LD | Président / CEO as on the About pages |
| W10 | **Prevu3D figures** (-25 % erreurs de planification, -35 % coûts d'opérations, +70 % collaboration) have no stated source. Keep them? | Jumeaux numériques | Not used |
| W11 | **Equipment**: is the scanner list (Leica RTC360, BLK360, Matterport) still current? | Numérisation, À propos | As on the live site |
| W12 | Spoken Québec variants ("les as-built", "le layout", "le RVT"…) are unconfirmed and aren't used. Team to fill the "Confirmed by team" column in the research. | — | Not used, per the brief |
| W13 | Services the research lists as less visible (**relevé de tuyauterie existante, documentation patrimoniale, livraison de nuages de points seuls, modélisation à partir d'un nuage existant**): confirm pointSpace sells each. | Manufacturier, Scan-to-BIM FAQ, Numérisation | The live site supports point-cloud delivery ("génération de nuages de points", "we can also provide you with the raw data") and heritage ("conservation du patrimoine"). Piping surveys are unconfirmed, so they're shown as a TODO box. |
| W14 | **Formats**: RVT, IFC, DWG, E57 and RCP/RCS are now named as deliverables (brief wording decision 6). The live site names DWG, DXF, Revit, IFC, E57, STEP/STP, SAT, STL. **RCP/RCS** (Autodesk ReCap) isn't on the live site, apart from "recap files" in the Renfort case. Confirm that you deliver RCP/RCS. | Numérisation, Scan-to-BIM, Plans | Shown, with a TODO badge on "RCP/RCS" |
| W15 | Client names to fix on the live site: "Reitmans Canada **Lée**" (and the Renfort card mislabelled as Reitmans), "Carrossielli", Olivier Tremblay credited to St-Denis Thompson on the EN Nelmar page, and the Windsor `<title>` "Prevost Case Study". | Live site | Corrected in the prototype |
| W16 | "Building Intergrated Modeling" appears 6 times on the live site, including the **body of both BIM articles**. The articles aren't rebuilt, so fix them in Duda. | Blog articles (live) | Fixed in all prototype teasers |

## 2. Images pending approval (client not public on pointspace.ca)

The "Placed on" column reflects the finished prototype (see `image-placement.md`, generated from the build). Placed images show a yellow "Approbation requise" badge. If an image is declined, swap it for the ✅ fallback shown.

| # | Image (Portfolio file) | Client / project | Placed on (FR + EN) | ✅ fallback if declined |
|---|---|---|---|---|
| I1 | `Video.mp4` (generator-hall point cloud → BIM) + its poster frame | Not identified (data-centre gensets; possibly eStruxture) | Home hero; Jumeaux numériques ("Suivre vos actifs" tile) | `modele-bim-mep-entrepot` (MEP render already on the live site) |
| I2 | `EStruxture (8).png` (mechanical room point cloud) | eStruxture | Numérisation LiDAR 3D ("Salles mécaniques" tile) | `modele-3d-tuyauterie-salle-mecanique` |
| I5 | `church-2.jpg`, `church.jpg` (church point clouds) | Church not identified | Architecture et bâtiments ("Bâtiments patrimoniaux"); Analyse du bâtiment ("Conservation du patrimoine") | `theatre-st-james-elevation-nuage-points` |
| I7 | `boma-floor-area-analysis.png` (warehouse BOMA plan) | Not identified | Mesurage BOMA (deliverables visual) | `gare-windsor-plan-superficies-etage` |
| I10 | `SPVM (2).jpg` (brick building render) | SPVM (already on the live site as `SPVM--282-29.png` / `GareStBruno_Render.png`, but SPVM isn't named) | Modélisation 3D (deliverables visual) | `broccolini-modele-revit` |
| I13 | `EStruxture (4).png`: file name says eStruxture, but the plan is identical to the Gare Windsor plan | Gare Windsor? (treated as ✅) | Plans tels que construits (deliverables visual) | `gare-windsor-plan-tel-que-construit` |

**Converted to WebP but not placed on any page** (no approval needed unless you want to use them): eStruxture (`EStruxture (5)`, `(9)`, `EStruxture.png`), Centre la Cité (`Mall - Floor 17`, `Mall - Basement A`), Centre Eaton / Place Montréal Trust (2 HEIC photos), the indoor-pool Revit renders, `Création sans titre (1)`, `(4)`, `Création sans titre.png` (Vidéotron), `building-analysis.png`, `Screenshot_17-6-2024…`. `Nuage - novabus.png` wasn't converted. One Centre la Cité image appears only on the internal `/styleguide` page, to demonstrate the badge.

## 3. Technical and production

| # | Item |
|---|---|
| T1 | **Font licence**: Neue Haas Grotesk Display (Monotype) is used from the files on pointSpace's Duda CDN. Confirm the web licence covers a new host. |
| T2 | **URL changes**: approve or reject each row in `redirects.md`. |
| T3 | **Forms**: the prototype has no backend. Choose the form handler / CRM (the live site uses Duda forms; Pipedrive is mentioned in the careers posting). Also approve the extra quote-form fields. |
| T4 | Hosting: the prototype is Astro static output. Decide whether production stays on Duda (Sparkweb) or moves. |
| T5 | Unrebuilt pages (13 other case studies, blog articles, job posts, privacy policy) link to the live site. Decide on their migration. |
| T6 | The EN site has no "Careers" menu item today. The prototype adds it in both languages. OK? |
| T7 | Analytics and cookie consent (Loi 25) aren't part of the prototype. |
| T8 | The FR blog index in the prototype lists the BIM article, which is live but missing from today's FR blog index. The three FR articles published at root paths (`/l-ia-dans-autodesk…`, `/glossaire…`, `/le-materiel…`) have no `/fr-ca/` prefix and no hreflang: fix in production. |
| T9 | Only the Windsor case study is rebuilt (as the template). The other 14 cards link to the live pages. Confirm the Windsor narrative (copied from the live page, with "superficies louables" changed to "superficies locatives"). |
