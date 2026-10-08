# Client names publicly visible on pointspace.ca

Crawl date: 2026-09-30 (from `pages/`). Extra live checks on the same day: the homepage logo slider JSON, the health-and-safety case study pages (they are not in the sitemap or the crawl) and redirect targets.
Logos are saved in `logos/` (originals) and `logos/png/` (flattened on dark grey for viewing, plus contact sheets `_sheet_1..3.png`). **Every logo below was checked by looking at the image.** The alt text on the site is AI-generated and often wrong: for example, logo 04 has the alt texts "TAG NUT", "CODA … trophy", "CODN … mortarboard" and "CONX", and logo 01 on /about-us has "JESSICA PAQUIST".

Visibility levels used below:
- **Linked**: the page is reachable from a case-study index card, the nav or another page.
- **Sitemap-only**: the page is in sitemap.xml but no crawled page links to it.
- **Unlisted**: the page is live (HTTP 200) and linked, but not in sitemap.xml.
- **Filename-only**: the name appears only in an image file name, CSS or JSON-LD. It is not visible on the page.

---

## 1. Yes/no answers for the names asked about

| Name | Publicly visible? | Evidence |
|---|---|---|
| **SPVM** | **NO (filename only)** | No visible text anywhere. The only trace is a CSS background image `…/opt/SPVM--282-29-2880w.png` on EN-only `/services/3d-scanning-and-3d-modeling`. I downloaded and viewed it: it is a greyscale render of a brick house with white trim, with no SPVM branding. |
| **Pharmascience(s)** | **NO** | No text, alt text, link, filename or logo in any crawled page, the raw HTML or the sitemap. |
| **Interplast** | **NO** | Same as above. |
| **Novabus / Nova Bus** | **NO** | Same as above. The bus case study is **Prevost** ("part of the Volvo Group"), not Novabus. |
| **Gare Windsor / Windsor Station** | **YES** | Case study "3D Scanning and Plan Updating: Windsor Station in Montreal" / "Numérisation 3D et mise à jour de plans : la Gare Windsor à Montréal". The **client is Laurier Capital** (the owner). There is a card on both the FR and EN case-study indexes. URLs: `/case-studies/case-study-windsor`, `/fr-ca/case-studies/case-study-windsor`. Both pages have the wrong `<title>` "Prevost Case Study \| 3D Scanning & As-Built Plans" (copy/paste error). |
| **Eaton Centre / Centre Eaton / Montréal Trust** | **NO** | No trace in text, images, filenames or the sitemap. |
| **Centre la Cité / "the Mall"** | **NO** | No trace. The only "mall" hits are image alt texts ("shopping mall corridor", on the Reitmans store photo). |
| **eStruxture** | **NO** | No trace. |
| **Hapag-Lloyd** | **YES** | Case study "Industrial 3D Scanning for Marine Retrofit: the Toronto Express at the Port of Montreal". Linked from both indexes, and there is a named testimonial (Frank Tiedemann). |
| **Nadco (Les Plastiques Nadco)** | **YES (FR linked; EN sitemap-only)** | The FR index card "Plans d'aménagement 2D d'une usine manufacturière – Les Plastiques Nadco" links `/fr-ca/case-studies/case-study-nadco`. The **EN index has no Nadco card**, so `/case-studies/case-study-nadco` is reachable only via the sitemap and the FR page's hreflang. The Nadco logo image appears on both pages, and there is a testimonial by Samuel Brassard. |
| **Prevost / Prévost** | **YES** | Case study "3D scanning a bus factory" / "Numérisation 3D d'une usine de bus". Its URL slug is `copy-of-case-study-nadco`. Linked from both indexes, with a testimonial by Ulric Roy-Pelletier. The word "Prevost" is also wrongly used in the `<title>` of both Windsor pages. |
| **Broccolini** | **YES** | Case study (restaurant next to "the Sherbrooke" project; the Béatrice restaurant is named only in the video JSON-LD). Also logo #16 in the homepage strip, a testimonial by Jacob Marquis, and cards on 14 pages. |
| **Groupe CDF / CDF Group** | **YES** | Sawmill fire-protection case study. Also logo #17 in the strip, a testimonial by Jean-François Wragg, and cards on 14 pages. |
| **VAC AERO International** | **YES** | Dorval factory case study, logo #09 in the strip, and cards on 15 pages. No testimonial. |
| **Théâtre St-James** | **YES** | The case study "3D Scan and As-Built Plans of the St-James Theatre" names the **client as Groupe Carosielli inc.** The Théâtre St-James logo is #03 in the strip, and it links to groupecarosielli.ca. The testimonial (Juliano Rodriguez-Daoust, Groupe Carosielli) mentions the theatre and is shown on about 20 pages. |
| **Le FouFou** | **YES** | Case study "As-Built Plans – Le FouFou" / "Plans tels que construits \| Le FouFou". The **client is JCB Construction Canada**, and the project is at Royalmount (developer Carbonleo, named). It is linked from both indexes, the architecture sector pages, the BOMA pages and the EN blog index ("TQC Plans - Le FouFou"). |

---

## 2. Case studies: client, URL and how public each one is

"FR idx" = linked from `/fr-ca/etudes-de-cas`; "EN idx" = linked from `/case-studies`; "SM" = in sitemap.xml.

| # | Client (as displayed) | FR URL | EN URL | SM | FR idx | EN idx | Other pages linking/naming it |
|---|---|---|---|---|---|---|---|
| 1 | **Reitmans Canada Ltée / Ltd.** (FR card label typo "Reitmans Canada **Lée**") | /fr-ca/etude-de-cas/Numérisation-3D-exhaustive-de-commerces-de-détail | /case-studies/Comprehensive_3D_Scan_of_retail_spaces | yes | yes | yes | LiDAR service FR/EN, 360 photo FR/EN. "Partners like Reitmans" appears in the "Why pointSpace?" boilerplate on most case studies and on the "How 3D scanning…" blog post. |
| 2 | **St-Denis Thompson Inc.** (EN index/services spell "St. Denis Thompson Inc.") | /fr-ca/etude-de-cas/Scan-3D-et-modélisation-3D-des-façades-dun-bâtiment | /case-studies/3D-Scan-and-3D-Modeling-of-Building-Facades | yes | yes | yes | Architecture sector FR/EN, building analysis FR/EN, 3D modeling FR, LiDAR FR/EN |
| 3 | **Nelmar** (h5: "Nelmar Security Packaging System" / "Système d'emballage de sécurité Nelmar") | /fr-ca/etude-de-cas/Mise-en-plan-et-numérisation-3D-des-zones-critiques-de-la-chaîne-de-production | /case-studies/3D-Scan-and-as-built-plans-of-Critical-Areas-on-a-Production-Line | yes | yes | yes | LiDAR FR/EN, As-Built FR/EN. The testimonial appears sitewide. |
| 4 | **Westcliff** (building: former Hudson's Bay / La Baie, Kitchener ON) | /fr-ca/case-studies/Plans-architecturaux-tels-que-construits-dun-espace-commercial | /case-studies/As-built_architectural_plans_for_a_retail_space | yes | yes | yes | As-Built FR/EN, BOMA FR/EN, progress FR/EN. It is also the "featured" case card on the FR blog index, the FR Louis page, most FR case studies and the unlisted FR 3D page. |
| 5 | **"Secteur industriel / Industrial Sector"** (anonymous: "Une entreprise québécoise spécialisée dans la construction de bâtiments en acier") | /fr-ca/etude-de-cas/etude-structurelle-et-toiture | /case-studies/Structural-and-Roofing-Analysis-Ahead-of-Steel-Frame-Installation | yes | yes | yes (the title link wrongly points to the FR page) | Building analysis FR/EN, progress FR/EN |
| 6 | **Groupe Renfort** | /fr-ca/case-studies/Problème-de-santé-et-sécurité-en-milieu-industriel (the index links `/fr-ca/case-studies/etude-de-cas-groupe-renfort`, which 301-redirects here) | /case-studies/Health-and-safety-issue-in-an-industrial-site | **no (unlisted, not crawled; fetched live)** | yes, **but the card label says "Reitmans Canada Lée"** (wrong client) | yes (label "Groupe Renfort" links http://www.renfort.com/; the title link wrongly points to the FR structural page) | Manufacturing FR/EN, progress EN (the FR progress card is also mislabelled "Reitmans Canada Lée"). Logo #20 is in the strip. |
| 7 | **Groupe Carosielli inc. / Carosielli Group inc.** (project: Théâtre St-James). Also spelled "Carrossielli" (see §6). | /fr-ca/etude-de-cas/scan-3d-et-mise-en-plan-du-theatre-st-james | /case-studies/3D_Scan_and_As-Built_plans_of_the_st-james_theater | yes | yes | yes | Architecture FR/EN, As-Built FR/EN, BOMA FR/EN |
| 8 | **JCB Construction Canada** (project: Le FouFou at Royalmount) | /fr-ca/etude-de-cas/Plans-tels-que-construits-Le-FouFou | /case-studies/As-Built-plans-le-foufou | yes | yes | yes | Architecture FR/EN, BOMA FR/EN, EN blog index. The EN architecture card links `/etude-de-cas-jcb`, which returns **404**. |
| 9 | **Groupe CDF / CDF Group** (sawmill) | /fr-ca/etude-de-cas/Scan-3D-et-modélisation-3D-dune-scierie | /case-studies/fire-protection-for-a-sawmill | yes | yes | yes | Manufacturing FR/EN, 3D modeling FR/EN, BIM FR/EN, Matterport FR/EN, building analysis (testimonial) |
| 10 | **VAC AERO International Inc.** (Dorval factory) | /fr-ca/etude-de-cas/Scan-3D-et-modélisation-3D-dune-usine (the FR index links `/fr-ca/etude-de-cas/vac-aero`, which 301-redirects here) | /case-studies/3D-Scan-and-3D-Modeling-of-an-Industrial-Facility | yes | yes | yes | Manufacturing, 3D modeling, BIM, 360, Matterport, building analysis EN |
| 11 | **Broccolini** (restaurant next to "the Sherbrooke") | /fr-ca/etude-de-cas/numerisation-3D-et-modelisation-3D-complete-dun-batiment | /case-studies/Comprehensive-Building-3D-Scanning-and-3D-Modeling | yes | yes (**two identical cards**) | yes | Architecture, As-Built, 3D modeling, BIM, 360, Matterport, Louis Dallaire EN page |
| 12 | **Hapag-Lloyd** (vessel Toronto Express, Port of Montreal) | /fr-ca/case-studies/case-study-hapag-lloyd | /case-studies/hapag-lloyd | yes | yes | yes | none other |
| 13 | **Les Plastiques Nadco / Nadco Plastics / Plastique Nadco Inc.** | /fr-ca/case-studies/case-study-nadco | /case-studies/case-study-nadco | yes | yes | **NO: EN is sitemap-only** | none other |
| 14 | **Prevost / Prévost** ("part of the Volvo Group") | /fr-ca/case-studies/copy-of-case-study-nadco | /case-studies/copy-of-case-study-nadco | yes | yes | yes | none other |
| 15 | **Laurier Capital** (building: Gare Windsor / Windsor Station) | /fr-ca/case-studies/case-study-windsor | /case-studies/case-study-windsor | yes | yes | yes | none other |

Notes:
- On pages 12–15 and on the Westcliff EN/FR pages, the only `<h1>` is "Contact us !" / "Contactez-nous !". The real title is not an H1.
- **Windsor pages:** they reuse the Prevost images (bus photos `Project3-1920w.jpg`, alt "Two parked luxury tour buses"). Their `<title>` and meta description are the Prevost ones, in English even on the FR page.
- **Nadco EN/FR:** the meta descriptions say "retail redevelopment project in Kitchener" (copied from Westcliff).
- **Hapag-Lloyd and Prevost:** the meta descriptions call them a "commercial project".

---

## 3. Testimonials (named person, title, company, where shown)

| Person | Title (EN / FR as written) | Company as written | Where |
|---|---|---|---|
| Juliano Rodriguez-Daoust | "VP Business Development and Acquisitions" / "Vice-président du développement commercial et des acquisitions" | "Carosielli Group" / "Groupe Carosielli". Also "Carrossielli Group" (EN St-James case study, EN progress reporting) and "Groupe Carrossielli" (FR St-James case study, FR rapport d'avancement) | Home FR/EN, architecture FR/EN, manufacturing FR/EN, FR case-study index, St-James case study FR/EN, and service pages: LiDAR FR/EN, BIM FR/EN, BOMA FR/EN, progress FR/EN, 360 FR/EN, Matterport FR/EN, EN 3d-scanning-and-3d-modeling, FR landing page ("…du groupe Carosielli") |
| Olivier Tremblay | "Process Improvement and Maintenance Manager" / "Responsable Amélioration et Maintenance des Procédés". On the case study: EN "Maintenance and Special Projects", FR "Entretien et projets spéciaux" | "Nelmar". **EN case study wrongly says "St-Denis Thompson Inc."** under his name. | Home FR/EN, architecture FR/EN, manufacturing FR/EN, FR case-study index, Nelmar case study FR/EN, EN 3d-scanning page, FR landing ("…chez Nelmar") |
| Pierre-Luc Comptois | "Director of Expertises and Inspections" / "Directeur des expertises et des inspections" | St-Denis Thompson Inc. | Facades case study FR/EN |
| (unnamed) | none | JCB Construction Canada | Le FouFou case study FR/EN |
| Sebastien Dupuis | "Vice President, Construction" / "Vice-président, Construction" | Westcliff | Westcliff case study FR/EN |
| Jacob Marquis | "Real Estate Development Coordinator" / "coordonnateur du développement immobilier" | Broccolini | Broccolini case study FR/EN, As-Built FR/EN, 3D modeling FR/EN |
| Bruno Cadieux | "Construction Manager" (EN on both FR and EN pages) | Reitmans Canada Ltd. (project: "Reitmans Carrefour de l'Estrie") | Reitmans case study FR/EN |
| Jean-François Wragg | "Director of Estimates and Surveillance" / "Directeur des Estimations et de la Surveillance" | CDF Group / Groupe CDF | Sawmill case study FR/EN, building analysis FR/EN (shortened quote) |
| Alain Gagnon | FR "Président" / EN "Chief Executive Officer" | Groupe Renfort | H&S case study FR/EN (unlisted pages) |
| Samuel Brassard | "Project Manager - Industrial Engineering" / "Chargé de projet - Génie Industriel" | Plastique Nadco Inc. | Nadco case study FR/EN |
| William Bakayoko | "COO" | Laurier Capital | Windsor case study FR/EN |
| Frank Tiedemann | none | Hapag-Lloyd | Hapag-Lloyd case study FR/EN |
| Ulric Roy-Pelletier | "Mechanical processes technician" / "Technicien des procédés mécaniques" | Prevost / Prévost | Prevost case study FR/EN. The quote names staff "Louis, Maxime, and Thomas". |

VAC AERO and the anonymous steel-structure client have no testimonial.

---

## 4. Logo strip (verified visually)

This is a Duda image slider (`SSR_IMAGE_SLIDER`, auto-advance every 7 s) of 25 logos. Each logo links to the company's site. The heading is FR **"Clients satisfaits"** / EN **"Trusted across industries"**. The same 25 logos, in the same order, were confirmed in the live FR and EN homepage HTML.

It appears on these pages: fr-ca, en-home, about-us, fr-ca/a-propos, architecture-buildings, fr-ca/architecture-batiments, manufacturing-industrial, fr-ca/manufacturier-industriel, and the service pages LiDAR FR/EN, BIM/scan-to-bim FR/EN, As-Built/mise-en-plan FR/EN, 3D modeling FR/EN, building analysis FR/EN, BOMA FR/EN, progress FR/EN, 360 FR/EN, Matterport FR/EN and EN 3d-scanning-and-3d-modeling. It is **not** on the case-study pages, blog, contact, careers, Prevu3D or the 4 landing pages (they have their own subsets, below).

| # | Local file (`logos/`) | CDN file | Link target | What the image shows (visual check) |
|---|---|---|---|---|
| 01 | 01_Logos_7-1920w.webp | Logos+%287%29-1920w.webp | jessicadaoustarchitecte.ca | "JESSICA DAOUST ARCHITECTES" wordmark → **Jessica Daoust Architectes** |
| 02 | 02_25_2-1920w.webp | 25+%282%29-1920w.webp | ateliermonarque.com/en/ | Monogram only (stylised "ΛMΛ"); no name in the image. Identified as **Atelier Monarque** from the link target only. |
| 03 | 03_18_1-1920w.webp | 18+%281%29-1920w.webp | groupecarosielli.ca | "THÉÂTRE ST-JAMES" crest → **Théâtre St-James** (linked to Groupe Carosielli) |
| 04 | 04_Logos-1920w.webp | Logos-1920w.webp | conn-x.ca/en/ | "conn✕ – FUSION W/T ASIMUT – MEMBRE DU GROUPE CAMNOR \| MEMBER OF CAMNOR GROUP" → **Conn-X** (Camnor group) |
| 05 | 05_20_1-1920w.webp | 20+%281%29-1920w.webp | aedifica.com | "ædifica" → **Aedifica** |
| 06 | 06_22_1-1920w.webp | 22+%281%29-1920w.webp | jcb.ca/en/ | "jcb CONSTRUCTION CANADA" → **JCB Construction Canada** |
| 07 | 07_17_1-1920w.webp | 17+%281%29-1920w.webp | idxdesign.com | "I D X" blocks → **IDX** |
| 08 | 08_21_1-1920w.webp | 21+%281%29-1920w.webp | tla-architectes.com | "tla architectes" → **TLA Architectes** |
| 09 | 09_13_1-1920w.webp | 13+%281%29-1920w.webp | vacaero.com | "VAC AERO INTERNATIONAL INC." → **VAC AERO** |
| 10 | 10_23_1-1920w.webp | 23+%281%29-1920w.webp | nelmar.com | "NELMAR Security Packaging Systems Inc." → **Nelmar** |
| 11 | 11_2_1-1920w.webp | 2+%281%29-1920w.webp | stdenisthompson.com/en/ | "St-Denis Thompson" with S-building mark → **St-Denis Thompson** |
| 12 | 12_11_1-1920w.webp | 11+%281%29-1920w.webp | benoy.com | "BENOY" → **Benoy** |
| 13 | 13_12_1-1920w.webp | 12+%281%29-1920w.webp | groupemach.com/en/home.html | "MACH" → **Groupe MACH** |
| 14 | 14_15_1-1920w.webp | 15+%281%29-1920w.webp | dallaireconsultants.com/en/ | "dallaire consultants" with D mark → **Dallaire Consultants** |
| 15 | 15_16_1-1920w.webp | 16+%281%29-1920w.webp | cominar.com/en/ | "Cominar" → **Cominar** |
| 16 | 16_14_1-1920w.webp | 14+%281%29-1920w.webp | broccolini.com/en | "BROCCOLINI" → **Broccolini** |
| 17 | 17_4_1-1920w.webp | 4+%281%29-1920w.webp | groupecdf.com/en/ | "GROUPE CDF" → **Groupe CDF** |
| 18 | 18_6_1-1920w.webp | 6+%281%29-1920w.webp | **(no link)** | "Reitmans" script → **Reitmans** |
| 19 | 19_8_1-1920w.webp | 8+%281%29-1920w.webp | lainco.ca/en/ | "LAINCO" → **Lainco** |
| 20 | 20_10_1-1920w.webp | 10+%281%29-1920w.webp | renfort.com/home/ | "LE GROUPE RENFORT" with cog → **Groupe Renfort** |
| 21 | 21_2-c0d7ef18-1920w.png | 2-c0d7ef18-1920w.png | musesolution.ca/fr/ | "MUSE SOLUTION DE GESTION" → **Muse Solution de gestion** |
| 22 | 22_3-100388f4-1920w.png | 3-100388f4-1920w.png | fr.oktodev.ca | "OKTODEV" → **Oktodev** |
| 23 | 23_4-31dab3f9-1920w.png | 4-31dab3f9-1920w.png | shellex.ca/fr/accueil/ | "SHELLEX" → **Shellex** |
| 24 | 24_5-7617cdb3-1920w.png | 5-7617cdb3-1920w.png | navada.com/fr | "NAVADA" → **Navada** |
| 25 | 25_6-b66f75f9-1920w.png | 6-b66f75f9-1920w.png | kolostat.com/fr/ | "Kolostat" → **Kolostat** |

Landing-page subsets (sitemap-only pages that nothing links to):
- `/fr-ca/landing-page`, `/lead-magnet-landing-page` and `/fr-ca/lead-magnet-landing-page` show 5 logos: Dallaire Consultants, JCB, a monogram file `25+%281%29-1920w.webp` (downloaded as `26_landing_25_1-1920w.webp`; visually the same ΛMΛ mark as #02, no link), St-Denis Thompson and Théâtre St-James.
- `/landing-page` (EN) shows 5 logos: St-Denis Thompson, Théâtre St-James, IDX, Broccolini and Lainco.

Also visible, but **not a client logo**: a **BOMA Canada** logo (`Boma-logo-in-beige-1920w.png`, verified visually as "BOMA Canada"). It appears on `/services/BOMA_As-Built_Digital_Plans` and `/fr-ca/services/mise-en-plan-boma`, with no accompanying membership or certification text. Saved as `logos/boma-page_Boma-logo-in-beige-1920w.png`.

---

## 5. Consolidated list of every company publicly named as a client/partner

Client or likely-client (case study, testimonial and/or strip logo):
- Reitmans: CS + testimonial + logo
- St-Denis Thompson: CS + testimonial + logo
- Nelmar: CS + testimonial + logo
- Westcliff: CS + testimonial
- Groupe Renfort: CS (unlisted pages) + testimonial + logo
- Groupe Carosielli / Théâtre St-James: CS + testimonial + logo
- JCB Construction Canada: CS + testimonial + logo
- Groupe CDF: CS + testimonial + logo
- VAC AERO International: CS + logo
- Broccolini: CS + testimonial + logo
- Hapag-Lloyd: CS + testimonial
- Les Plastiques Nadco: CS + testimonial
- Prevost: CS + testimonial
- Laurier Capital: CS + testimonial
- Logo only (no case study): Jessica Daoust Architectes, Atelier Monarque (monogram only), Conn-X, Aedifica, IDX, TLA Architectes, Benoy, Groupe MACH, Dallaire Consultants, Cominar, Lainco, Muse Solution de gestion, Oktodev, Shellex, Navada, Kolostat

Named in case-study prose as context, not as pointSpace clients:
- Carbonleo and Royalmount (Le FouFou)
- Hudson's Bay / La Baie d'Hudson and Canadian Tire (Westcliff)
- Volvo Group (Prevost)
- CIBC (history of the Théâtre St-James)
- Penningtons and RW&CO. (Reitmans brands)
- "Canadian Vac-Hyd Processing Ltd" (VAC AERO's former name)
- "Reitmans Carrefour de l'Estrie" (project name)
- Toronto Express (vessel) and Port of Montreal
- "the Sherbrooke" (a Broccolini project)

Named as vendor or partner:
- Prevu3D: titles "Partenaire Prevu3D" / "Prevu3D Partner"
- Leica Geosystems (BLK360, RTC360)
- Matterport
- Autodesk (blog)
- Sparkweb.ca (site developer, in the footer)

## 6. Names that appear only in filenames or metadata (not visible text)

- `SPVM--282-29-2880w.png`: a house render, used as a CSS background on EN `/services/3d-scanning-and-3d-modeling`.
- `Domaine-du-Parc-Olympique_R-a7686535-…webp`: a parallax background on the home pages.
- `GareStBruno_Render…png`: home FR image (alt "Maison en briques…").
- `nuage+-+videotron-1920w.webp`: EN `/landing-page` (alt "Abstract multicolored 3D room or arena model"). Not viewed.
- `Balcan-2`, `Balcan+3`, `Balcan+7`: machine images on the FR case-study index (Renfort card), the manufacturing pages and the EN landing page.
- `Vac-Aero_*`, `pointSpace_Prevost_9`, `Logo-Nadco`: files tied to the named case studies.
- JSON-LD `VideoObject` descriptions name "the Béatrice restaurant for Broccolini" and "The Bay in Kitchener".
- Legacy link slugs such as `/case-studies/broccolini`, `/fr-ca/case-studies/the-bay`, `/case-studies/vac-aero` and `/fr-ca/etude-de-cas/JCB` exist only in hrefs, and all 301-redirect to the case studies above.

## 7. Client-name errors found

1. The FR index card for the H&S case study and the FR rapport d'avancement card show the client as **"Reitmans Canada Lée"**. The real client is Groupe Renfort. "Lée" (instead of "Ltée") is also used for the real Reitmans card on the FR index, FR LiDAR and FR photo-360 pages.
2. EN Nelmar case study: Olivier Tremblay is signed "St-Denis Thompson Inc." It should be Nelmar.
3. "Carrossielli" / "Carrossielli Group" / "Groupe Carrossielli" are misspellings of Carosielli. See §3 for the pages.
4. Windsor pages (FR+EN) have the `<title>` "Prevost Case Study…".
5. The EN index has no Nadco card. The FR index has the Broccolini card twice.
6. EN index: the "Structural and roofing…" and "Health and safety…" title links point to the FR page `/fr-ca/etude-de-cas/etude-structurelle-et-toiture`.
7. Spelling of St-Denis Thompson varies: "St-Denis Thompson Inc." and "St. Denis Thompson Inc.". The testimonial surname is spelled "Comptois".
