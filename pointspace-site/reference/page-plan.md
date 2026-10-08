# Page plan: pointSpace desktop prototype

Sources: the SEO vocabulary research (the source of truth for wording, except where the brief overrides it), the capabilities PDF, and the live-site crawl in `current-site/`. Every page has **one main search intent**. Its main term goes in the `<title>`, the H1 and the first paragraph. Synonyms go in body copy only.

Conventions:

- The FR site lives under `/fr-ca/…` and the EN site at the root, as today. Every page carries `hreflang="fr-CA"` / `hreflang="en-CA"` / `x-default` (→ FR) plus a self-canonical on `https://www.pointspace.ca/…`.
- Titles end with `| pointSpace` and are ≤ 62 characters where possible. Meta descriptions are 140–160 characters.
- Quote CTA: **"Obtenir une soumission"** (FR) / **"Get a quote"** (EN) everywhere.
- ⏳ = image pending Louis's approval (a ✅ fallback is given). Image numbers refer to `image-inventory.md` (B# = Portfolio row, L# = live image).
- 🔀 = slug change (approved 2026-09-30, see `redirects.md`).
- Decisions 2026-09-30: all slug changes applied; case-study template = Gare Windsor; ⏳ images shown with an "Approbation requise" badge; headings in sentence case.

## 1. Sitemap

| # | FR page (menu label) | FR URL | EN page (menu label) | EN URL |
|---|---|---|---|---|
| 1 | Accueil | `/fr-ca` | Home | `/` |
| 2 | Numérisation LiDAR 3D | `/fr-ca/services/numerisation-LiDAR-3D` | LiDAR 3D Scanning | `/services/LiDAR-3D-Scanning` |
| 3 | Scan-to-BIM | `/fr-ca/services/modélisation-bim` | Scan-to-BIM | `/services/scan-to-bim` |
| 4 | Plans tels que construits | 🔀 `/fr-ca/services/plans-tels-que-construits` (was `/mise-en-plan`) | As-Built Drawings | 🔀 `/services/as-built-drawings` (was `/As-Built-Drafting`) |
| 5 | Modélisation 3D | `/fr-ca/services/modelisation-3d` | 3D Modeling | `/services/3D-modeling` |
| 6 | Analyse du bâtiment | `/fr-ca/services/analyse-du-bâtiment` | Building Analysis | `/services/building-analysis` |
| 7 | Mesurage BOMA | 🔀 `/fr-ca/services/mesurage-boma` (was `/mise-en-plan-boma`) | BOMA Measurement | 🔀 `/services/boma-measurement` (was `/BOMA_As-Built_Digital_Plans`) |
| 8 | Suivi d'avancement | 🔀 `/fr-ca/services/suivi-davancement` (was `/rapport-davancement`) | Progress Tracking | `/services/progress-reporting` (kept) |
| 9 | Photo 360° | `/fr-ca/services/photo-360` | 360° Photo | 🔀 `/services/360-photo` (was `/360°-photo`) |
| 10 | Visites virtuelles Matterport | `/fr-ca/services/visites-virtuelles-matterport` | Matterport Virtual Tours | `/services/Matterport-3D-Virtual-Tours` |
| 11 | Jumeaux numériques | 🔀 `/fr-ca/services/jumeaux-numeriques` (was `/prevu3d`) | Digital Twins | 🔀 `/services/digital-twins` (was `/prevu3d`) |
| 12 | Manufacturier et industriel | `/fr-ca/manufacturier-industriel` | Manufacturing & Industrial | `/manufacturing-industrial` |
| 13 | Architecture et bâtiments | `/fr-ca/architecture-batiments` | Architecture & Buildings | `/architecture-buildings` |
| 14 | Études de cas | `/fr-ca/etudes-de-cas` | Case Studies | `/case-studies` |
| 15 | Étude de cas (template): Gare Windsor | `/fr-ca/case-studies/case-study-windsor` | Case study: Windsor Station | `/case-studies/case-study-windsor` |
| 16 | Blogue | `/fr-ca/blogue` | Blog | `/blog` |
| 17 | À propos | `/fr-ca/a-propos` | About | `/about-us` |
| 18 | Contact | `/fr-ca/contact` | Contact | `/contact` |
| 19 | Obtenir une soumission | `/fr-ca/obtenir-une-soumission` | Get a quote | `/get-a-quote` |
| 20 | Carrières | `/fr-ca/carrieres` | Careers | `/careers` |

That's **40 pages** (20 FR + 20 EN).

**Main navigation (FR):** Services ▾ (10 services, in two groups: *Capture*: Numérisation LiDAR 3D, Photo 360°, Visites virtuelles Matterport; *Livrables*: Plans tels que construits, Scan-to-BIM, Modélisation 3D, Mesurage BOMA, Analyse du bâtiment, Suivi d'avancement, Jumeaux numériques) · Secteurs ▾ · Études de cas · Blogue · À propos · Contact · **[Obtenir une soumission]** · FR | EN.
EN mirrors it.

**Footer:** services list (same labels as the menu; no English label on the FR site), sectors, company links, phone (514) 606-9604, email, Carrières, privacy policy (links to the live policy page), © line.

**Not rebuilt, linked out to the live site:** the 14 other case studies, the blog articles, the job postings, the Louis Dallaire bio page, the privacy policy, demande-demo/get-a-demo, landing pages and thank-you. Those links are marked as external in QA. The EN-only page `/services/3d-scanning-and-3d-modeling` has no FR pair and duplicates the LiDAR page, so I propose a 301 (see `redirects.md`).

**Choice of case-study template: Gare Windsor.** It's public (Laurier Capital; linked from both indexes). The Portfolio has strong ✅ imagery for it (plans, BOMA-coloured plan, point-cloud slices and views), and the live page has clear defects the rebuild fixes (its `<title>` says "Prevost Case Study", it reuses the Prevost bus photos, and its only H1 is "Contact us !"). Alternative if you prefer: Théâtre St-James.

## 2. Keyword ownership (prevents overlap between pages)

| Page | Owns (title / H1 / first paragraph) | Synonyms in body only | Must not target |
|---|---|---|---|
| Accueil | numérisation 3D, plans et modèles BIM **de l'existant** (the company-level offer, "de la capture terrain à la documentation finale") | relevé de l'existant, reality capture | a single service |
| Numérisation LiDAR 3D | **numérisation 3D de bâtiments**, relevé laser 3D | balayage laser, scan 3D, nuage de points, relevé de l'existant / état existant | Scan-to-BIM, plans |
| Scan-to-BIM | **Scan-to-BIM, modélisation BIM de l'existant** | maquette BIM, modèle Revit à partir de nuages de points, RVT/IFC, LOD | "numérisation 3D" as the main term |
| Plans tels que construits | **plans tels que construits (as-built)**, plans conformes à l'exécution | relevé architectural, plans d'étage, élévations et coupes, plans de plafonds réfléchis, Scan-to-CAD / plans CAO, DWG | BOMA |
| Modélisation 3D | **modélisation 3D** d'installations et d'équipements (non-BIM: STEP, SAT, CAD, rendus) | modèle 3D, maillage | Scan-to-BIM |
| Analyse du bâtiment | **analyse du bâtiment**: planéité, verticalité, déformations | contrôle géométrique, analyse de déformation, façades | |
| Mesurage BOMA | **mesurage BOMA, superficie locative** | espaces locatifs, superficie utilisable (usable area), plans conformes aux normes BOMA | "certifié BOMA", "surface louable" |
| Suivi d'avancement | **suivi d'avancement** de chantier | rapport d'avancement, comparaison nuage/modèle | |
| Photo 360° | **photo 360°** de chantier et de bâtiment | photographie immersive | Matterport as the main term |
| Visites virtuelles Matterport | **visite virtuelle Matterport** | visite 3D immersive | |
| Jumeaux numériques | **jumeau numérique** (with Prevu3D) | | |
| Manufacturier et industriel | **numérisation 3D industrielle** | plans d'usine, aménagement d'usine, relevé de tuyauterie existante, salles mécaniques | |
| Architecture et bâtiments | **relevé de l'existant** pour architectes et gestionnaires immobiliers; relevé avant rénovation | | |

## 3. Page-by-page

Section pattern for **service pages** (from the brief): ① Hero: H1, one-line value, "Obtenir une soumission" · ② Intro paragraph (main term in the first sentence) · ③ **Ce que vous recevez**: deliverables and file formats · ④ **Processus**: numbered steps · ⑤ **Études de cas** related (2–3 public cards) · ⑥ **FAQ** (the existing live FAQs, corrected, plus the missing vocabulary; FAQPage JSON-LD) · ⑦ Closing CTA band.

---

### 1. Accueil / Home

- **FR title:** `Numérisation 3D, plans et modèles BIM de l'existant | pointSpace`
- **FR meta:** `pointSpace transforme vos bâtiments et installations en données précises : numérisation LiDAR 3D, plans tels que construits, Scan-to-BIM et mesurage BOMA.`
- **FR H1:** `De la numérisation 3D aux plans et modèles BIM de l'existant`
- **EN title:** `3D Scanning, As-Built Drawings & Scan-to-BIM | pointSpace`
- **EN meta:** `pointSpace turns buildings and facilities into accurate data: LiDAR 3D scanning, as-built drawings, Scan-to-BIM models and BOMA measurement.`
- **EN H1:** `From 3D Scanning to As-Built Drawings and BIM Models`
- **Intent:** navigational + "services de numérisation 3D" (company level).
- **Sections:** Hero with a looping video (point cloud → BIM) · Stats band 400+ projets livrés / 50+ clients servis / 10+ services / 6+ années d'expérience (capabilities PDF and site) · "Du terrain au livrable" (3-step flow: Capture → Traitement → Livrables, with formats E57 · RCP/RCS · RVT · IFC · DWG) · Services grid (10 cards, grouped Capture / Livrables) · Sectors (2 large cards) · Featured projects (Gare Windsor, Théâtre St-James, VAC AERO) · Existing testimonials (Carosielli, Nelmar) · Logo strip (the existing 25 client logos) · Closing CTA.
- **Images:** hero `Video.mp4` ⏳ (✅ fallback: B42 MEP render or L043 St-James) · service cards: B3 (Scan-to-BIM), B10 (scanning), B27 (plans), B25 (BOMA), L058 (analysis), L092 (360), L090 (Matterport), B15 (3D modeling), B42 (progress), video poster (twins) ⏳ with fallback B13 · sectors: L054 VAC AERO model; L043 St-James.

### 2. Numérisation LiDAR 3D / LiDAR 3D Scanning

- **FR title:** `Numérisation 3D de bâtiments – relevé laser LiDAR | pointSpace`
- **FR meta:** `Relevé laser 3D de l'existant pour bâtiments et usines : nuages de points E57 ou RCP/RCS, prêts pour vos plans tels que construits et modèles BIM.`
- **FR H1:** `Numérisation LiDAR 3D : relevé laser de vos bâtiments`
- **EN title:** `Building 3D Laser Scanning & LiDAR Surveys | pointSpace`
- **EN meta:** `3D laser scanning of existing buildings and plants: registered point clouds in E57 or RCP/RCS, ready for as-built drawings and BIM models.`
- **EN H1:** `LiDAR 3D Scanning: Laser Surveys of Your Buildings`
- **Deliverables:** nuage de points assemblé (E57, RCP/RCS), relevé de l'existant / état existant, vues et coupes du nuage, next steps to plans or BIM. *Equipment named only as on the live site (Leica RTC360 / BLK360).*
- **Process:** Portée et précision · Planification des stations · Numérisation sur site · Assemblage des scans (registration) · Nettoyage et livraison.
- **Case studies:** Reitmans, Nelmar, Hapag-Lloyd.
- **Images:** hero B10 ✅ · deliverable L002 (entreplafond point cloud) ✅ + B22 ⏳ (fallback L068 VAC AERO cloud) · process B19 ⏳ (fallback: none, drop the image) · B38 ✅.

### 3. Scan-to-BIM  *(Step 2 page)*

- **FR menu/card:** `Scan-to-BIM` · **card description:** `Modèles Revit (RVT) et IFC de l'existant, produits à partir de nuages de points selon le niveau de détail (LOD) convenu.`
- **FR title:** `Scan-to-BIM : modélisation BIM de l'existant | pointSpace`
- **FR meta:** `Du nuage de points au modèle Revit : modélisation BIM de l'existant selon le LOD convenu, livrée en RVT et IFC pour vos projets de rénovation et de coordination.`
- **FR H1:** `Scan-to-BIM : modélisation BIM de l'existant`
- **FR one-liner:** `Un modèle Revit fidèle à votre bâtiment, construit à partir d'un relevé laser 3D.`
- **FR intro (main term first):** "Le Scan-to-BIM transforme la numérisation 3D de votre bâtiment en modèle BIM (Building Information Modeling) de l'existant, livré en Revit (RVT) et en IFC…"
- **EN title:** `Scan-to-BIM Services: As-Built Revit Models | pointSpace`
- **EN meta:** `From point cloud to Revit: as-built BIM models of existing buildings at the agreed LOD, delivered in RVT and IFC for renovation and coordination.`
- **EN H1:** `Scan-to-BIM: As-Built BIM Models of Existing Buildings`
- **Deliverables:** modèle Revit (RVT), export IFC, nuage de points source (E57/RCP), plans 2D extraits en DWG (plans d'étage, élévations et coupes), disciplines: architecture, structure, MEP (mécanique, électricité, plomberie) as listed on the live page.
- **Process:** the 6 live steps, corrected: Objectifs et LOD · Planification et capture · Nuage de points assemblé et nettoyé · Modélisation BIM · Contrôle qualité contre le nuage (+ détection des conflits) · Livraison et accompagnement.
- **Case studies:** VAC AERO (Revit), Groupe CDF (sawmill), Broccolini.
- **FAQ:** the 6 live questions, rewritten with BIM = Building Information Modeling. The accuracy answer keeps the live wording ("généralement précis à quelques millimètres près"); flagged as a TODO to confirm. New question: "Pouvez-vous modéliser à partir d'un nuage de points existant ?" (from the research's client phrases).
- **Images:** hero B42 ✅ (MEP Revit render) · deliverables B2 ✅ (Revit cutaway) + B13 ✅ (piping) · "du nuage au modèle" pair: L068 (VAC AERO cloud) + L054 (VAC AERO model) ✅ · secondary B36 ⏳ pool model (optional).

### 4. Plans tels que construits / As-Built Drawings

- **FR title:** `Plans tels que construits (as-built) | pointSpace`
- **FR meta:** `Plans tels que construits conformes à l'exécution, produits à partir d'un relevé laser 3D : plans d'étage, élévations et coupes, plafonds réfléchis en DWG.`
- **FR H1:** `Plans tels que construits (as-built)`
- **FR card description:** `Plans 2D conformes à l'exécution, produits à partir de scans 3D : plans d'étage, élévations, coupes et plafonds réfléchis.`
- **EN title:** `As-Built Drawings from 3D Laser Scans | pointSpace`
- **EN meta:** `As-built drawings produced from 3D laser scans: floor plans, elevations, sections and reflected ceiling plans in DWG. Existing conditions drawings you can trust.`
- **EN H1:** `As-Built Drawings`, with body synonyms "existing conditions drawings" and "measured drawings" (from the research).
- **Deliverables:** relevé architectural, plans d'étage, élévations et coupes, plans de plafonds réfléchis, plans CAO (DWG), Scan-to-CAD, plans d'aménagement d'usine.
- **Case studies:** Théâtre St-James, Le FouFou (JCB), Westcliff.
- **Images:** hero B27 ✅ (Gare Windsor as-built plan) · process B28 slice → B27 plan ✅ · élévations L123 + L046 ✅ · L087 Nadco CAD layout ✅.

### 5. Modélisation 3D / 3D Modeling

- **FR title:** `Modélisation 3D d'installations et d'équipements | pointSpace`
- **FR H1:** `Modélisation 3D d'installations et d'équipements`
- **FR meta:** `Modèles 3D précis de vos installations, équipements et façades à partir de scans : formats Revit, CAD, STEP et SAT, du modèle de base au modèle détaillé.`
- **EN title:** `3D Modeling of Facilities and Equipment | pointSpace` · **EN H1:** `3D Modeling of Facilities and Equipment`
- **Distinct from Scan-to-BIM:** geometry for plant layout, equipment fit checks ("Est-ce que le nouvel équipement va entrer ?"), STEP/SAT exchange, renders. The formats are the ones the live page states.
- **Images:** L054/L069 VAC AERO ✅ · L062 Balcan equipment model ✅ (Groupe Renfort is public) · B14 ✅ · L124 residential towers model ✅.

### 6. Analyse du bâtiment / Building Analysis

- **FR title:** `Analyse du bâtiment : planéité et déformations | pointSpace`
- **FR H1:** `Analyse du bâtiment : planéité, verticalité et déformations`
- **FR meta:** `Contrôle géométrique à partir de nuages de points : analyse de planéité des dalles, verticalité des murs et colonnes, déformations structurelles et façades.`
- **EN title:** `Building Analysis: Flatness & Deformation | pointSpace` · **EN H1:** `Building Analysis: Flatness, Plumbness and Deformation`
- **Case studies:** Structural and roofing analysis (anonymous steel client), St-Denis Thompson (façades), Groupe CDF.
- **Images:** hero L103 heatmap ✅ · L104 profile ✅ · B11 St-James façade cloud ✅ · B5 ⏳ (optional).

### 7. Mesurage BOMA / BOMA Measurement

- **FR menu/card/title:** `Mesurage BOMA`
- **FR title:** `Mesurage BOMA : calcul de superficie locative | pointSpace`
- **FR meta:** `Mesurage BOMA de vos espaces locatifs : calcul de superficie locative et utilisable, plans conformes aux normes BOMA produits à partir d'un relevé laser 3D.`
- **FR H1:** `Mesurage BOMA : calcul de superficie locative`
- **EN title:** `BOMA Measurement: Rentable & Usable Area | pointSpace`
- **EN meta:** `BOMA measurement of leasable space: rentable and usable area calculations with floor plans that follow BOMA standards, based on a 3D laser survey.`
- **EN H1:** `BOMA Measurement: Rentable and Usable Area`
- **Wording rules:** "superficie locative" (never "surface louable"); "plans conformes aux normes BOMA" (never "certifiés"); team credential shown as the TODO placeholder "formé aux normes de mesurage BOMA"; "certificat de mesurage" shown only as a visible **TODO** box for Louis.
- **Deliverables:** plans de superficie par étage, tableau des superficies locatives et utilisables, plans d'étage DWG, **plans de location** (optional, per research).
- **Case studies:** Westcliff (La Baie, Kitchener) and Le FouFou (both are listed on the live BOMA page), plus Gare Windsor shown as "superficies locatives" only. **The live Windsor case study never says BOMA** (it says "know precisely its leasable spaces"), so calling Windsor a BOMA project is a TODO for Louis.
- **Images:** hero B25 ✅, captioned neutrally as "Plan des superficies par zone – Gare Windsor" (not "BOMA" until Louis confirms) · B26 ✅ · B4 ⏳ (warehouse BOMA plan with a BOMA legend; the best BOMA-specific image, but the client isn't identified).
- **Not reused from the live page:** the BOMA Canada logo (it implies an affiliation nobody has confirmed) and the claims "certifiés BOMA" / "garantit… la conformité aux réglementations".

### 8. Suivi d'avancement / Progress Tracking

- **FR title:** `Suivi d'avancement de chantier par numérisation 3D | pointSpace`
- **FR H1:** `Suivi d'avancement de chantier par numérisation 3D`
- **FR meta:** `Suivez l'avancement de vos travaux avec des relevés 3D et photos 360° réguliers : données précises à chaque étape et rapports comparant le réel au prévu.`  *(Wording to verify against the live page's actual claims before Step 3.)*
- **EN title:** `Construction Progress Tracking with 3D Scans | pointSpace` · **EN H1:** `Construction Progress Tracking`
- **Images:** B42 ✅ · Structural/roofing case study images (live) ✅.

### 9. Photo 360° / 360° Photo

- **FR title:** `Photo 360° de chantier et de bâtiment | pointSpace` · **H1:** `Photo 360° de chantier et de bâtiment`
- **FR meta:** `Photographie 360° haute résolution de vos chantiers et bâtiments, prête à être convertie en visite virtuelle Matterport pour consulter le site à distance.`
- **EN title:** `360° Site Photography for Buildings | pointSpace` · **EN H1:** `360° Site Photography`
- **Images:** L092 Prevost 360 ✅ · L086 Nadco 360 ✅ · L006 Reitmans ✅.

### 10. Visites virtuelles Matterport / Matterport Virtual Tours

- **FR title:** `Visites virtuelles Matterport | pointSpace` · **H1:** `Visites virtuelles Matterport`
- **FR meta:** `Visites virtuelles 3D Matterport immersives et sécurisées pour le marketing, les présentations et l'accès à distance à vos bâtiments et projets.`
- **EN title:** `Matterport Virtual Tours | pointSpace` · **EN H1:** `Matterport Virtual Tours`
- **Images:** L090 Béatrice dollhouse (Broccolini) ✅ · L086 ✅.

### 11. Jumeaux numériques / Digital Twins

- **FR title:** `Jumeaux numériques de bâtiments et d'usines | pointSpace` · **H1:** `Jumeaux numériques de bâtiments et d'usines`
- **FR meta:** `Jumeaux numériques 3D précis, propulsés par Prevu3D, pour visualiser, simuler et gérer vos installations à partir de vos données de numérisation.`
- **EN title:** `Digital Twins for Buildings and Plants | pointSpace` · **EN H1:** `Digital Twins for Buildings and Plants`
- **Note:** the live page is a partner page ("Partenaire Prevu3D", demo request). I'll keep the partner wording exactly as on the site and invent no Prevu3D feature claims.
- **Images:** video poster ⏳ (fallback B15 ✅) · L129 Prevu3D UI screenshot ✅ (already on the live page).

### 12. Manufacturier et industriel / Manufacturing & Industrial

- **FR title:** `Numérisation 3D industrielle et plans d'usine | pointSpace` · **H1:** `Numérisation 3D industrielle pour le manufacturier`
- **FR meta:** `Relevés laser 3D d'usines en exploitation : plans d'aménagement d'usine, relevé de tuyauterie existante, salles mécaniques et modèles 3D d'équipements.`
- **EN title:** `Industrial 3D Laser Scanning for Manufacturers | pointSpace` · **EN H1:** `Industrial 3D Scanning for Manufacturers`
- **Sections:** client problems (research phrases: scanning while the plant runs, "will the new equipment fit?"), services used, case studies (VAC AERO, CDF, Nelmar, Nadco, Prevost, Hapag-Lloyd, Groupe Renfort), testimonial (Nelmar), CTA.
- **Images:** hero B15 ✅ · B31 technician ✅ · L054 ✅ · L065 ✅.

### 13. Architecture et bâtiments / Architecture & Buildings

- **FR title:** `Relevé de l'existant pour architectes et immeubles | pointSpace` · **H1:** `Relevé de l'existant pour l'architecture et les bâtiments`
- **FR meta:** `Relevés 3D avant rénovation, plans tels que construits, modèles BIM et mesurage BOMA pour architectes, promoteurs et gestionnaires immobiliers.`
- **EN title:** `Existing Conditions Surveys for Architects | pointSpace` · **EN H1:** `Existing Conditions Surveys for Architecture and Buildings`
- **Case studies:** St-James, Le FouFou, Westcliff, Broccolini, St-Denis Thompson, Gare Windsor.
- **Images:** hero L043 ✅ · B7 church ⏳ (heritage band, fallback L046) · B3 ✅.

### 14. Études de cas / Case Studies (index)

- **FR title:** `Études de cas : numérisation 3D et BIM | pointSpace` · **H1:** `Études de cas`
- **EN title:** `Case Studies: 3D Scanning and BIM Projects | pointSpace` · **EN H1:** `Case Studies`
- **Content:** the 15 public case studies as cards, with service and sector filter chips (client-side). The Windsor card goes to the template; the others link to the live pages. Client names and labels are corrected (Groupe Renfort not "Reitmans Canada Lée"; Carosielli spelling).

### 15. Case study template: Gare Windsor / Windsor Station

- **FR title:** `Gare Windsor : numérisation 3D et mise à jour de plans | pointSpace`
- **FR H1:** `Numérisation 3D et mise à jour de plans : la Gare Windsor à Montréal` (the live heading)
- **EN title:** `Windsor Station: 3D Scanning and Plan Updates | pointSpace` · **EN H1:** `3D Scanning and Plan Updating: Windsor Station in Montreal`
- **Template sections:** hero (client, sector, services chips) · Le défi · Notre approche · Livrables · Résultats · Témoignage (William Bakayoko, COO, Laurier Capital, as on the live site) · Related services · CTA. **Copy only from the live case study.**
- **Images:** L066 hero ✅ · B30, B28, B27, B25 ✅ · L088 ✅.

### 16. Blogue / Blog (index)

- **FR title:** `Blogue : numérisation 3D, BIM et plans | pointSpace` · **H1:** `Blogue`
- **Content:** the existing articles (FR: 9, including the BIM article, which is live but missing from today's FR index; EN: 7), each with title, date and author as on the live site, linking to the live article URL. No new articles.
- **Note:** the FR list includes the BIM article. Its EN teaser has the "Building Intergrated Modeling" error, and the teaser text is corrected in the prototype. The article body itself is out of scope (see TODO).

### 17. À propos / About

- **FR title:** `À propos de pointSpace : numérisation 3D et BIM | pointSpace` · **H1:** `À propos de pointSpace`
- **Content:** mission (live wording), stats, team as published (Louis Dallaire – Président; Philippe Dallaire – Fondateur; Thomas Sévigny – Chargé de projet; Maxime Montreuil – Technicien en relevé de bâtiment; Leandro Lazaretti – Technicien en Revit, nuage de points et scan 3D), equipment (Leica RTC360 and BLK360 as named on the site), service area "au Québec et en Ontario" (live wording), CTA to Carrières.
- **Images:** L018 Louis, L019–L022 team ✅ · B31 ✅ · L052 kit ✅.

### 18. Contact

- **FR title:** `Contactez pointSpace | pointSpace` → `Contact – numérisation 3D et BIM | pointSpace` · **H1:** `Contactez-nous`
- **Content:** Louis Dallaire, ldallaire@pointspace.ca, (514) 606-9604. **Both addresses as published on the live contact page:** Siège social 2211 Rue de la Métropole, Longueuil, QC J4G 1S5; Bureau satellite 3700, rue Saint-Patrick, unité 312, Montréal, QC H4E 1A2. Static 4-field form as on the live site (Prénom, Nom de famille, Courriel, Message). No backend: the submit button shows a prototype notice.

### 19. Obtenir une soumission / Get a quote

- **FR title:** `Obtenir une soumission – numérisation 3D | pointSpace` · **H1:** `Obtenir une soumission`
- **Content:** the 3 live fields (Prénom et nom, Courriel, Description du projet), plus optional fields to review: Entreprise, Téléphone, "Services requis" checkboxes (the 10 services) and "Livrables souhaités" (plans tels que construits DWG, modèle RVT/IFC, nuage de points E57/RCP, superficies BOMA). The new fields are flagged as a TODO (form backend and CRM). Static, no backend.
- **Images:** B38 ✅.

### 20. Carrières / Careers

- **FR title:** `Carrières chez pointSpace | pointSpace` · **H1:** `Carrières`
- **Content:** culture blurb (live), the 3 open roles (Chargé de projets, Technicien en relevé de bâtiment, Stagiaire marketing), linking to the live postings.
- **Images:** B31 ✅ · L052 ✅.

## 4. Structured data

- Every page: `Organization` with name "pointSpace" (legal name "Technologie pointSpace", as in the footer and capabilities PDF), url, logo, telephone "+1-514-606-9604", email ldallaire@pointspace.ca, `sameAs` LinkedIn (the only social link on the site), `address` = the Longueuil head office (published on the live contact page), `areaServed` = Québec and Ontario (as stated on the live site).
- Service pages: `Service` (name, description, provider → Organization, serviceType) plus `FAQPage` where there's a FAQ.
- Case study: `Article` plus `BreadcrumbList`. Every page gets a `BreadcrumbList`.
