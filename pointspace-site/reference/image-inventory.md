# Image inventory

Reviewed on 2026-09-30. I opened every image and watched the video. Portfolio files were only read. Previews were made in a temporary scratch folder. The HEIC photos were decoded with pillow-heif and the video frames were pulled with ffmpeg; neither wrote anything to the Portfolio folder.

**Public-client test (from the brief):** client imagery may go on the site only if that client already appears on pointspace.ca. See `current-site/public-clients.md` for the evidence. Clients publicly named today: Reitmans, St-Denis Thompson, Nelmar, Westcliff, Groupe Renfort, Groupe Carosielli / Théâtre St-James, JCB Construction / Le FouFou, Groupe CDF, VAC AERO, Broccolini, Hapag-Lloyd, Les Plastiques Nadco, Prevost, **Laurier Capital / Gare Windsor**, plus the 25 companies in the logo strip.
**Not public:** SPVM, Pharmascience, Interplast, Novabus, Eaton Centre / Place Montréal Trust, Centre la Cité, eStruxture, Vidéotron.

Status legend:

- ✅ **OK**: the client is public on pointspace.ca, **or** the same image or photo shoot is already published on pointspace.ca, **or** it's pointSpace's own asset (logo, equipment).
- ⏳ **Pending Louis**: allowed in the prototype, but it must be approved before launch. Each one is also listed in `todo-for-louis.md`, and the prototype shows a small "Approbation requise" badge on it (dev-only).
- ⛔ **Do not use**: a client deliverable, or not a web asset.

Web names are the files that will be created in `public/images/` (WebP, resized, originals untouched). "—" means not used.

## A. Portfolio folder: logos

| File | What it shows | Use | Web name | Status |
|---|---|---|---|---|
| `Green_Background_Logo/*.svg` (+ .png/.jpg) | Cream wordmark with cream and gold bars | Header and footer on green #004225 | `logo-pointspace-on-green.svg` (SVG copied as-is) | ✅ own |
| `Cream_Background_Logo/*.svg` (+ .png/.jpg, `_rotated.png`) | Green wordmark with green and gold bars (rotated version is vertical) | Any logo on cream or white sections; favicon mark | `logo-pointspace-on-cream.svg` | ✅ own |
| `Yellow_Background_Logo/*.svg` (+ .png/.jpg) | Green wordmark with green and cream bars, no gold | Only if a gold band ever carries the logo. Not planned. | — | ✅ own |

## B. Portfolio folder: loose images and video

| # | File | What it actually shows | Fits page / intent | Web name | Status |
|---|---|---|---|---|---|
| 1 | `Video.mp4` (15 s, 1920×1080, 30 fps, no audio, 18 MB) | Fly-through of a colour **point cloud** of an industrial **generator/engine hall** (large diesel gensets, exhaust ducts). About halfway through it turns into a **Revit/BIM model** with coloured MEP (ducts, yellow and orange piping), and it ends on a top-down cutaway of the whole plant. | **Home hero background.** It shows point cloud → BIM in 15 s. Poster frame reused on the Jumeaux numériques page. | `video/hero-point-cloud-to-bim.mp4` (re-encoded ~3–4 MB, 1600w) + `hero-point-cloud-to-bim-poster.webp` | ⏳ **Client not identified.** Gensets suggest a data-centre client (possibly eStruxture, not public). Not on the live site. |
| 2 | `bim v1.png` (1672×941) | Revit model, isometric cutaway of a single-storey lab or industrial space: walls, HVAC ductwork, workstations, an enclosed room. Light grey background. | Scan-to-BIM: "what you receive" | `scan-to-bim-revit-model-cutaway-light.webp` | ✅ Same project and model (labelled "DIGIFAB") is already published on the live site (`Présentation-source.png`) |
| 3 | `bim.png` (1920×1080) | Same model as #2 on a black background | Home "Scan-to-BIM" service card; Architecture sector | `scan-to-bim-revit-model-cutaway-dark.webp` | ✅ same as #2 |
| 4 | `boma-floor-area-analysis.png` (3600×2025) | BOMA area plan of a warehouse ("Entrepôt"). The legend in French reads Espace de location, Zone de service du bâtiment, Zone en surplomb, Grande pénétration verticale. | Mesurage BOMA: deliverable example (second image) | `mesurage-boma-plan-superficie-entrepot.webp` | ⏳ client not identified |
| 5 | `building-analysis.png` (1920×1080) | Isometric colour-mapped point cloud of a large multi-wing industrial building with its roof visible. The colours look like a classification or deviation map. | Analyse du bâtiment | `analyse-batiment-nuage-points-toiture.webp` | ⏳ client not identified. Also confirm what the colours mean before writing the caption. |
| 6 | `church-2.jpg` (11859×7380, 42 MB) | Very high-resolution **point cloud** render of a church interior: organ loft, gallery, arcades | Home "patrimoine" band; Numérisation LiDAR 3D (heritage) | `numerisation-3d-eglise-tribune-orgue.webp` | ⏳ church/client not identified; not on the live site |
| 7 | `church.jpg` (11670×7380) | Same church, nave view towards the altar, point cloud | Numérisation LiDAR 3D hero (option); Architecture sector | `numerisation-3d-eglise-nef-nuage-points.webp` | ⏳ as #6 |
| 8 | `church.png` / `church2.png` (1920×1200) | Smaller exports of #7 and #6 | Duplicates; #6 and #7 are used instead | — | ⏳ |
| 9 | `Création sans titre (1).png` | Revit model of a floor plate with lab or kitchen rooms and fixtures, isometric, black background | Modélisation 3D / Scan-to-BIM (secondary) | `modele-revit-etage-laboratoire.webp` | ⏳ client not identified |
| 10 | `Création sans titre (2).png` | **Leica RTC360 scanner on a tripod on an industrial rooftop** (silos and steam behind, background blurred) | Numérisation LiDAR 3D hero; À propos; Contact | `scanner-leica-rtc360-toit-industriel.webp` | ✅ The same photo (a crop) is published on the live site (`2-14a196b3…png`). Client not identifiable. |
| 11 | `Création sans titre (3).png` | Greyscale point cloud of a **neoclassical colonnade façade** (Corinthian columns) seen from below | Théâtre St-James case study; Analyse du bâtiment (façades) | `theatre-st-james-facade-nuage-points.webp` | ✅ Same building as the live St-James case-study photos (public client Groupe Carosielli) |
| 12 | `Création sans titre (4).png` | Point cloud of an interior floor (offices plus open plant), cutaway, black background | Numérisation LiDAR 3D: "nuage de points" deliverable | `nuage-points-etage-interieur-coupe.webp` | ⏳ client not identified |
| 13 | `Création sans titre (5).png` | Revit **MEP piping** model close-up (valves, pumps, grey pipes) | Scan-to-BIM (MEP); Manufacturier | `modele-bim-tuyauterie-mecanique-vanne.webp` | ✅ Same render set is on the live site (`13.jpg`) |
| 14 | `Création sans titre (6).png` | Same MEP piping model, wider view | Modélisation 3D | `modele-3d-tuyauterie-salle-mecanique.webp` | ✅ as #13 |
| 15 | `Création sans titre (7).png` | Same MEP model, overview with pipe racks and structural frame | Manufacturier et industriel hero (option) | `modele-bim-salle-mecanique-vue-ensemble.webp` | ✅ as #13 |
| 16 | `Création sans titre.png` (3600×2025) | Rainbow-coloured point cloud of a large room (arena or studio) in isometric view | Nuage de points visual | `nuage-points-salle-couleur.webp` | ⏳ matches the live image `nuage - videotron` (only on a sitemap-only landing page). Client Vidéotron is not named publicly. |
| 17 | `EStruxture (3).png` (4000×2400) | Same rooftop RTC360 photo as #10, wider crop | Duplicate of #10 | — | ✅ (covered by #10) |
| 18 | `EStruxture (4).png` | Grey architectural floor plan of an L-shaped building. It's identical to `Gare Windsor/EStruxture (1)` without colours, so it's actually **Gare Windsor**. | Plans tels que construits (plan d'étage) | `plans-tels-que-construits-plan-etage-gare-windsor.webp` | ✅ Gare Windsor is public (Laurier Capital case study). The file name is misleading, so confirm with Louis. |
| 19 | `EStruxture (5).png` | **Scan registration network**: scan positions (red dots) linked by green lines over a greyscale point-cloud plan | Numérisation LiDAR 3D: process step "assemblage des scans" | `assemblage-scans-reseau-stations.webp` | ⏳ eStruxture (not public) |
| 20 | `EStruxture (6).png` | Greyscale point cloud of a large building exterior | Nuage de points visual | — (not needed) | ⏳ eStruxture |
| 21 | `EStruxture (7).png` | Same as #19, point cloud coloured | Duplicate of #19 | — | ⏳ eStruxture |
| 22 | `EStruxture (8).png` (4000×2400, 25 MB) | High-density colour **point cloud of a mechanical room** (blowers, compressors, piping, workers visible as points) | Numérisation LiDAR 3D (deliverable); Manufacturier | `nuage-points-salle-mecanique-haute-densite.webp` | ⏳ eStruxture |
| 23 | `EStruxture (9).png` | Same mechanical room, other angle | Scan-to-BIM "from point cloud" step | `nuage-points-salle-mecanique-2.webp` | ⏳ eStruxture |
| 24 | `EStruxture.png` (2000×1200) | CAD linework plan (walls plus MEP runs) | Plans tels que construits (CAO) | `plan-cao-dwg-mecanique.webp` | ⏳ eStruxture |
| 25 | `Gare Windsor/2.png` | **BOMA-style area plan**: zones coloured green, yellow and pink, labelled with square-foot areas | **Mesurage BOMA hero** (caption "plan des superficies par zone") + Gare Windsor case study | `plan-superficies-locatives-gare-windsor.webp` | ✅ public client (Laurier Capital). ⚠️ The live case study doesn't say BOMA, so don't caption it "BOMA" until Louis confirms. |
| 26 | `Gare Windsor/EStruxture (1).png` | Same L-shaped building as #18, with BOMA colour zones | Gare Windsor case study; BOMA | `gare-windsor-plan-boma-etage.webp` | ✅ public |
| 27 | `Gare Windsor/EStruxture (2).png` | Grey as-built floor plan of the L-shaped building with room labels | Plans tels que construits hero | `gare-windsor-plan-tel-que-construit.webp` | ✅ public |
| 28 | `Gare Windsor/Gare Windsor 1A.png` | Point-cloud **slice** (white on black) of the L-shaped floor | Plans tels que construits: "du nuage de points au plan" step 1 | `gare-windsor-coupe-nuage-points.webp` | ✅ public |
| 29 | `Gare Windsor/Gare Windsor 1B.png` | Same slice, darker and sparse | Duplicate of #28 | — | ✅ |
| 30 | `Gare Windsor/Gare Windsor 1C.png` | Colour point cloud, top view of an office floor (furniture visible) | Gare Windsor case study; Numérisation | `gare-windsor-nuage-points-vue-dessus.webp` | ✅ public |
| 31 | `Image (2).jpg` (2448×3264) | **pointSpace technician** in a hi-vis vest with a tablet next to a scanner in an industrial plant | À propos; Carrières; Manufacturier | `technicien-releve-numerisation-usine.webp` | ✅ The same photo is on the live site (`undefined.png`). Product packaging is visible in the background; low risk. |
| 32 | `Mall - Centre la Cite/*` (9 PNGs) | Colour point clouds and slices of a mall basement, "Block D" and a 17th-floor office plate (plan and isometric views) | Numérisation / BOMA (office floor plate) | `centre-commercial-etage-17-nuage-points.webp` (from `Mall - Floor 17.png`), `centre-commercial-sous-sol-nuage-points.webp` (from `Mall - Basement A.png`) | ⏳ Centre la Cité (not public) |
| 33 | `Mall - Centre la Cite/*.pdf` (3 PDFs) | Plans and a point-cloud sheet (client deliverables) | Not used | — | ⛔ deliverable |
| 34 | `Nuage - novabus.png` | Greyscale point cloud of a large industrial plant exterior with parking and trucks | Manufacturier (option) | — (not needed; covered by public projects) | ⏳ Novabus (not public) |
| 35 | `Projet centre eaton-mtl trust/*.heic` (10 photos, 4284×5712, portrait) | **Place Montréal Trust** exterior on rue Sainte-Catherine: a technician running a tripod scanner on the sidewalk (3 photos) and a mast-mounted scanner in front of the entrance (7 photos). One passer-by is visible. | Numérisation LiDAR 3D "sur le terrain"; Analyse du bâtiment (façade); À propos | `numerisation-facade-scanner-mat-centre-ville.webp` (from `…123313409`), `technicien-scanner-trottoir-centre-ville.webp` (from `…105803449`) | ⏳ Eaton / Montréal Trust (not public). The signage names the building. |
| 36 | `revit-model.png` | Revit model render of an indoor **pool / aquatic centre** with steel trusses; "pointSpace" watermark | Modélisation 3D / Scan-to-BIM | `modele-revit-centre-aquatique.webp` | ⏳ client not identified |
| 37 | `revit-model2.png` | Same pool, other angle (diving boards) | Scan-to-BIM secondary | `modele-revit-centre-aquatique-2.webp` | ⏳ as #36 |
| 38 | `scanner.png` (1200×1200) | **Leica RTC360 on a tripod in an empty warehouse** (yellow bollards, high bays) | Numérisation LiDAR 3D; Obtenir une soumission | `scanner-laser-3d-entrepot-vide.webp` | ✅ The same photo is on the live site (`46.jpg`) |
| 39 | `Screenshot 2026-05-22 114357.png` | Church point cloud (organ loft), a screen capture | Duplicate of #6 | — | ⏳ |
| 40 | `Screenshot+2025-04-03+163540.png` | Point cloud of a **Reitmans** storefront in a mall | Reitmans case study card | `reitmans-vitrine-nuage-points.webp` | ✅ public client and the same image is on the live site |
| 41 | `Screenshot_17-6-2024_105143_.jpeg` | Grey Revit model of a multi-room floor with cable trays and MEP | Scan-to-BIM (secondary) | `modele-revit-etage-chemins-cables.webp` | ⏳ client not identified |
| 42 | `Sous-titre-545a2f08.png` | Revit render of a warehouse interior with coloured **MEP** (cyan ducts, blue and red piping), sunlight through windows | Scan-to-BIM hero (option); Suivi d'avancement | `modele-bim-mep-entrepot.webp` | ✅ The same image is on the live site (Royalmount animation, public Le FouFou/JCB context) |
| 43 | `SPVM (2).jpg` | Photoreal **architectural render** of a brick building with white brackets and garden (Gare St-Bruno render) | Modélisation 3D (rendering) | `rendu-architectural-batiment-brique.webp` | ⏳ **SPVM is named in the brief as pending.** The identical image is already on the live site (`SPVM--282-29.png`, `GareStBruno_Render.png`), but the client isn't named. |
| 44 | `Interplast - *.pdf`, `pointSpace_Pharmasciences_*.pdf` | Client deliverables | Reading only | — | ⛔ never publish |
| 45 | `AutoCAD/*.pdf`, `pointSpace_Gare Windsor-Etage B.plt` | Drawing files | Ignored per the brief | — | ⛔ |

## C. Live-site images (downloaded to `reference/current-site/images/`, 142 of 144)

These are already public. The brief prefers them where they fit. Chosen ones, with their numbers in `live-images.json`:

| Live # | File | Shows | Planned use | Web name |
|---|---|---|---|---|
| 004/018 | `20221222_185010508_iOS` | B&W staff portrait (Louis Dallaire) | À propos | `louis-dallaire-portrait.webp` |
| 019–022 | Staff portraits: Philippe Dallaire (Fondateur), Leandro Lazaretti (`Image+(7).jpg`, 5th portrait on the live FR About page, matching the team order), Thomas Sévigny (Chargé de projet), Maxime Montreuil (Technicien en relevé de bâtiment) | Team | À propos (names and titles only as written on the live page) | `equipe-*.webp` |
| 043 | `41.jpg` | Operator with a scanner in front of the Théâtre St-James colonnade | St-James case study hero | `theatre-st-james-numerisation-facade.webp` |
| 046/080 | St-James orthographic façade point cloud | Façade elevation from point cloud | St-James case study; Plans tels que construits (élévations) | `theatre-st-james-elevation-nuage-points.webp` |
| 123 | `56.jpg` | **Line drawing of an ornate façade elevation** (St-James) | Plans tels que construits: élévations et coupes | `theatre-st-james-elevation-dessin.webp` |
| 066 | `Image--289-29.png` | **Leica scanner in front of Gare Windsor** (stone façade, Montréal) | Gare Windsor case study; Home "projets" band | `gare-windsor-numerisation-facade.webp` |
| 088 | `Project3.jpg` | Colour point cloud of the Gare Windsor exterior | Gare Windsor case study | `gare-windsor-nuage-points-exterieur.webp` |
| 058/061/103 | Floor-flatness heatmap (blue→green→yellow) | Analyse de planéité | **Analyse du bâtiment hero** | `analyse-planeite-dalle-carte-couleur.webp` |
| 104 | Flatness profile section | Planéité profile | Analyse du bâtiment detail | `analyse-planeite-profil.webp` |
| 054/067–074/106 | VAC AERO models and point clouds (model vs cloud pairs) | Industrial facility | Manufacturier hero; Modélisation 3D; VAC AERO card | `vac-aero-modele-3d-usine.webp`, `vac-aero-nuage-points-usine.webp` |
| 053/094 | Sawmill models (Groupe CDF) | Industrial Revit model | Manufacturier; CDF card | `scierie-modele-3d.webp` |
| 092/093 | Prevost bus plant (360 photo; colour-coded model) | Plant | Prevost card; Photo 360° | `prevost-usine-photo-360.webp`, `prevost-modele-usine.webp` |
| 064, 095–101 | Hapag-Lloyd vessel photo and hull point clouds | Marine retrofit | Hapag-Lloyd card; Numérisation (industrial) | `hapag-lloyd-toronto-express.webp`, `hapag-lloyd-nuage-points-coque.webp` |
| 086/087 | Nadco plant 360 photo; CAD layout | Plant layout | Nadco card; Plans tels que construits (layout) | `nadco-usine-photo-360.webp`, `nadco-plan-amenagement-cao.webp` |
| 083/084/112/136 | Hudson's Bay Kitchener point cloud (Westcliff) | Retail building | Westcliff card; Mesurage BOMA / Plans | `westcliff-la-baie-nuage-points.webp` |
| 090 | Béatrice restaurant cutaway point cloud (Broccolini) | Point cloud dollhouse | Broccolini card; Visites virtuelles | `broccolini-restaurant-nuage-points.webp` |
| 047 | Restaurant Revit interior (Broccolini) | Revit | Modélisation 3D | `broccolini-modele-revit.webp` |
| 006 | Scanner in a clothing store (Reitmans) | Field | Reitmans card; Photo 360° | `reitmans-magasin-numerisation.webp` |
| 002/003 | Ceiling-void point clouds (entreplafond) | Above-ceiling | Blog card "entreplafonds"; Numérisation | `entreplafond-nuage-points.webp` |
| 124/045/107 | Domaine du Parc Olympique rendered model | Residential towers model | Modélisation 3D | `modele-3d-tours-residentielles.webp` |
| 077/113 | Elevation drawing of a tower; hand-sketched field survey (relevé) | Drawings | Plans tels que construits ("ancien relevé vs numérique") | `plan-elevation-tour.webp`, `releve-manuel-croquis.webp` |
| 052/119/144 | pointSpace field kit flat-lay (RTC360 accessories, tripod, vests) | Equipment | À propos; Carrières | `equipement-releve-pointspace.webp` |
| 138 | Leica BLK360 marketing-style photo | Equipment | — Probably a Leica press image; not used | — |
| 110, 127, 130 | Stock photos (pexels, office stock) | Stock | **Not used** (the brief asks for real imagery) | — |
| 012–042 | Client logo strip (25 logos) | Logos | Home and sector "Ils nous font confiance" strip, same 25 logos | `logos/client-*.webp` |
| 121 | BOMA Canada logo | Association logo | **Not used**: implies an affiliation the site doesn't state (and there's no certification wording). Listed in TODO. | — |
| 116, 117 | `Présentation-source-(11).png`, `IMG_1360.png` | Could not download (fetch failed twice). Both appear only on landing pages, which aren't rebuilt. | — | — |

## D. Rule check

- No image is placed on a page it doesn't match. Each web name describes the content, and alt text will be written per page, per language, from the "What it shows" column.
- Images marked ⏳ can be swapped for ✅ alternatives on every page. The page plan names a ✅ fallback for each ⏳ hero, so approval can't block launch.
