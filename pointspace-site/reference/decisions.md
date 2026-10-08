# Decisions (2026-10-02)

The prototype exists to review the UI, so it isn't the canonical source for content. Instead of waiting for sign-off, every open item from `todo-for-louis.md` was decided as below and applied. The on-page "TODO Louis" boxes and "Approbation requise" badges were removed.

If the site goes to production, revisit the items marked †. They're the ones where the decision goes beyond what the live site already says.

## Wording and claims

| # | Item | Decision applied |
|---|---|---|
| W1 | "Certificat de mesurage" | Not mentioned anywhere. |
| W2 | BOMA credential | Final text: "Notre équipe est formée aux normes de mesurage BOMA." / "Our team is trained in BOMA measurement standards." There's no mention of certification. |
| W3 | BOMA Canada logo | Not used. |
| W4 | "certifiés BOMA" and regulatory-compliance claims | Removed; "plans conformes aux normes BOMA" is used instead. |
| W5 | Windsor = BOMA project? | No. Windsor is presented as plans plus rentable areas ("superficies locatives"), not as a BOMA mandate. |
| W6 | ICSC (shopping centres) | Not mentioned. |
| W7 | Accuracy wording | The live wording is kept: "précision millimétrique" with the live disclaimers, and "généralement précis à quelques millimètres près" for Scan-to-BIM. No new figures. |
| W8 | Founding year | Only "6+ années d'expérience" is used. |
| W9 | Louis's title | Président (FR) / CEO (EN). |
| W10 | Prevu3D percentages | Not used. |
| W11 | Equipment | Leica RTC360, Leica BLK360 and Matterport, as on the live site. |
| W12 | Spoken Québec variants | Not used. |
| W13 † | Modelling from a client-supplied point cloud | **Yes**, subject to a coverage and density check (Scan-to-BIM FAQ, FR + EN). Piping surveys aren't mentioned. |
| W14 † | RCP/RCS delivery | Kept as a delivered format alongside E57 (brief wording decision 6). |
| W15 | Client-name errors on the live site | Corrected in the prototype. |
| W16 | "Building Intergrated Modeling" in the live articles | Out of scope for the prototype; the live articles should be fixed in Duda. |

## Images

| # | Image | Decision applied |
|---|---|---|
| I1 † | `Video.mp4` (home hero) + poster | Kept, no badge. |
| I2 † | eStruxture mechanical-room point cloud | Kept on Numérisation LiDAR 3D, no badge. |
| I5 † | Church point clouds | Kept on Architecture and Analyse du bâtiment, no badge. |
| I7 † | Warehouse BOMA plan | Kept on Mesurage BOMA, no badge. |
| I10 † | SPVM render (already on the live site) | Kept on Modélisation 3D, no badge. |
| I13 | `EStruxture (4)` | Treated as the Gare Windsor plan (identical drawing). |
| Others | Centre la Cité, Eaton / Place Montréal Trust, pool, Vidéotron, other eStruxture files | Converted but not placed. |

The approval status is still recorded in `image-inventory.md` and `src/data/image-manifest.json` (`status: "pending"`). It just isn't displayed.

## Technical

| # | Item | Decision applied |
|---|---|---|
| T1 † | Neue Haas Grotesk Display | Used locally for the UI review. |
| T2 | URL changes | All 8 applied (see `redirects.md`). |
| T3 | Forms | Static forms; submitting shows a short prototype notice. The quote form keeps the extra fields (company, phone, services, deliverables). |
| T4–T5 | Hosting, pages not rebuilt | Out of scope. Pages that weren't rebuilt link to pointspace.ca (↗). |
| T6 | "Careers" in the EN menu | Added in both languages (footer). |
| T7 | Analytics, cookie consent | Not included. |
| T8–T9 | FR blog index, Windsor text | The BIM article is listed. The Windsor text is used as published, with "superficies locatives". |

## Marketing feedback (2026-10-02)

| Item | Applied |
|---|---|
| Form fields | Contact and quote pages share one form: Prénom, Nom, Entreprise, Courriel, Téléphone, Type de projet, Ville / emplacement du projet, Description brève du projet. Required: Prénom, Nom, Courriel, Type de projet, Description. |
| "Type de projet" options | Marketing's list, using the site's service names: "Mise en plan" → "Plans tels que construits", "Plans BOMA" → "Mesurage BOMA" (brief wording rules 2 and 4). Modélisation 3D and Photo 360° were added so all 10 services are covered, plus "Je ne sais pas encore". |
| Submit button | "Demander une soumission" / "Request a quote" on the form only. Buttons that link to the quote page keep "Obtenir une soumission" (brief rule 5). |
| Commercial FAQ on the home page | 5 pre-purchase questions placed before the closing call to action, with FAQPage JSON-LD. Adjustments: "pointSpace" brand casing; the file-format answer uses the site's formats (E57, RCP/RCS, DWG, RVT, IFC, CAD, STEP, SAT); the Montréal / Rive-Sud answer adds the area served as stated on the live site (Québec and Ontario). |
