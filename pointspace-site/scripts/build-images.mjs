// Build web images for the prototype.
// Reads originals (Portfolio folder = READ ONLY, live-site downloads, decoded HEIC in the scratchpad),
// writes resized WebP files to public/images/ and a manifest to src/data/image-manifest.json.
// Never writes anything into the Portfolio folder.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORTFOLIO = 'C:/Users/pointSpace/pointspace.ca/Louis Dallaire - Marketing/Portfolio';
const LIVE = path.join(ROOT, 'reference/current-site/images');
const LOGOS = path.join(ROOT, 'reference/current-site/logos');
// Decoded HEIC photos + video poster frame (derived from Portfolio files, kept in the project).
// Regenerate with the commands in README.md if needed.
const SCRATCH = process.env.PS_SCRATCH ?? path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'public/images');

const liveFiles = await fs.readdir(LIVE);
const live = (id) => {
  const f = liveFiles.find((n) => n.startsWith(id + '_'));
  if (!f) throw new Error('live image not found: ' + id);
  return path.join(LIVE, f);
};
const P = (rel) => path.join(PORTFOLIO, rel);

// status: 'ok' = public client / already published / own asset; 'pending' = needs Louis's approval
// source: shown in the image inventory and the dev-only approval badge
const IMAGES = [
  // Portfolio
  ['scan-to-bim-revit-model-cutaway-light', P('bim v1.png'), 'ok', 'Portfolio: bim v1.png'],
  ['scan-to-bim-revit-model-cutaway-dark', P('bim.png'), 'ok', 'Portfolio: bim.png'],
  ['mesurage-boma-plan-superficie-entrepot', P('boma-floor-area-analysis.png'), 'pending', 'Portfolio: boma-floor-area-analysis.png (client non identifié)'],
  ['analyse-batiment-nuage-points-toiture', P('building-analysis.png'), 'pending', 'Portfolio: building-analysis.png (client non identifié)'],
  ['numerisation-3d-eglise-tribune-orgue', P('church-2.jpg'), 'pending', 'Portfolio: church-2.jpg (église non identifiée)'],
  ['numerisation-3d-eglise-nef-nuage-points', P('church.jpg'), 'pending', 'Portfolio: church.jpg (église non identifiée)'],
  ['modele-revit-etage-laboratoire', P('Création sans titre (1).png'), 'pending', 'Portfolio: Création sans titre (1).png (client non identifié)'],
  ['scanner-leica-rtc360-toit-industriel', P('Création sans titre (2).png'), 'ok', 'Portfolio: Création sans titre (2).png'],
  ['theatre-st-james-facade-nuage-points', P('Création sans titre (3).png'), 'ok', 'Portfolio: Création sans titre (3).png'],
  ['nuage-points-etage-interieur-coupe', P('Création sans titre (4).png'), 'pending', 'Portfolio: Création sans titre (4).png (client non identifié)'],
  ['modele-bim-tuyauterie-mecanique-vanne', P('Création sans titre (5).png'), 'ok', 'Portfolio: Création sans titre (5).png'],
  ['modele-3d-tuyauterie-salle-mecanique', P('Création sans titre (6).png'), 'ok', 'Portfolio: Création sans titre (6).png'],
  ['modele-bim-salle-mecanique-vue-ensemble', P('Création sans titre (7).png'), 'ok', 'Portfolio: Création sans titre (7).png'],
  ['nuage-points-salle-couleur', P('Création sans titre.png'), 'pending', 'Portfolio: Création sans titre.png (Vidéotron, non nommé sur le site)'],
  ['plans-tels-que-construits-plan-etage-gare-windsor', P('EStruxture (4).png'), 'ok', 'Portfolio: EStruxture (4).png (= plan Gare Windsor, à confirmer)'],
  ['assemblage-scans-reseau-stations', P('EStruxture (5).png'), 'pending', 'Portfolio: EStruxture (5).png (eStruxture)'],
  ['nuage-points-salle-mecanique-haute-densite', P('EStruxture (8).png'), 'pending', 'Portfolio: EStruxture (8).png (eStruxture)'],
  ['nuage-points-salle-mecanique-2', P('EStruxture (9).png'), 'pending', 'Portfolio: EStruxture (9).png (eStruxture)'],
  ['plan-cao-dwg-mecanique', P('EStruxture.png'), 'pending', 'Portfolio: EStruxture.png (eStruxture)'],
  ['plan-superficies-locatives-gare-windsor', P('Gare Windsor/2.png'), 'ok', 'Portfolio: Gare Windsor/2.png'],
  ['gare-windsor-plan-superficies-etage', P('Gare Windsor/EStruxture (1).png'), 'ok', 'Portfolio: Gare Windsor/EStruxture (1).png'],
  ['gare-windsor-plan-tel-que-construit', P('Gare Windsor/EStruxture (2).png'), 'ok', 'Portfolio: Gare Windsor/EStruxture (2).png'],
  ['gare-windsor-coupe-nuage-points', P('Gare Windsor/Gare Windsor 1A.png'), 'ok', 'Portfolio: Gare Windsor/Gare Windsor 1A.png'],
  ['gare-windsor-nuage-points-vue-dessus', P('Gare Windsor/Gare Windsor 1C.png'), 'ok', 'Portfolio: Gare Windsor/Gare Windsor 1C.png'],
  ['technicien-releve-numerisation-usine', P('Image (2).jpg'), 'ok', 'Portfolio: Image (2).jpg'],
  ['centre-commercial-etage-17-nuage-points', P('Mall - Centre la Cite/Mall - Floor 17.png'), 'pending', 'Portfolio: Mall - Centre la Cite (Centre la Cité)'],
  ['centre-commercial-sous-sol-nuage-points', P('Mall - Centre la Cite/Mall - Basement A.png'), 'pending', 'Portfolio: Mall - Centre la Cite (Centre la Cité)'],
  ['numerisation-facade-scanner-mat-centre-ville', SCRATCH && path.join(SCRATCH, 'heic/20260728_123313409_iOS.png'), 'pending', 'Portfolio: Projet centre eaton-mtl trust/20260728_123313409_iOS.heic (Place Montréal Trust)'],
  ['technicien-scanner-trottoir-centre-ville', SCRATCH && path.join(SCRATCH, 'heic/20260728_105803449_iOS.png'), 'pending', 'Portfolio: Projet centre eaton-mtl trust/20260728_105803449_iOS.heic (Place Montréal Trust)'],
  ['modele-revit-centre-aquatique', P('revit-model.png'), 'pending', 'Portfolio: revit-model.png (client non identifié)'],
  ['modele-revit-centre-aquatique-2', P('revit-model2.png'), 'pending', 'Portfolio: revit-model2.png (client non identifié)'],
  ['scanner-laser-3d-entrepot-vide', P('scanner.png'), 'ok', 'Portfolio: scanner.png'],
  ['reitmans-vitrine-nuage-points', P('Screenshot+2025-04-03+163540.png'), 'ok', 'Portfolio: Screenshot+2025-04-03+163540.png'],
  ['modele-revit-etage-chemins-cables', P('Screenshot_17-6-2024_105143_.jpeg'), 'pending', 'Portfolio: Screenshot_17-6-2024_105143_.jpeg (client non identifié)'],
  ['modele-bim-mep-entrepot', P('Sous-titre-545a2f08.png'), 'ok', 'Portfolio: Sous-titre-545a2f08.png'],
  ['rendu-architectural-batiment-brique', P('SPVM (2).jpg'), 'pending', 'Portfolio: SPVM (2).jpg (SPVM)'],
  ['hero-point-cloud-to-bim-poster', SCRATCH && path.join(SCRATCH, 'heic/poster.png'), 'pending', 'Portfolio: Video.mp4 (client non identifié)'],
  // Blog article: first and last frames of the scan-to-BIM animation (player bar cropped)
  ['blogue-scan-to-bim-nuage-points-maison', SCRATCH && path.join(SCRATCH, 'heic/blog-scan-to-bim-poster-scan.png'), 'ok', 'Animation scan-to-BIM pointSpace (oct. 2026)'],
  ['blogue-scan-to-bim-modele-bim-maison', SCRATCH && path.join(SCRATCH, 'heic/blog-scan-to-bim-poster-bim.png'), 'ok', 'Animation scan-to-BIM pointSpace (oct. 2026)'],
  // Live site (already published)
  ['louis-dallaire-portrait', live('018'), 'ok', 'pointspace.ca'],
  ['equipe-philippe-dallaire', live('019'), 'ok', 'pointspace.ca'],
  ['equipe-portrait-3', live('020'), 'ok', 'pointspace.ca'],
  ['equipe-thomas-sevigny', live('021'), 'ok', 'pointspace.ca'],
  ['equipe-maxime-montreuil', live('022'), 'ok', 'pointspace.ca'],
  ['theatre-st-james-numerisation-facade', live('043'), 'ok', 'pointspace.ca'],
  ['theatre-st-james-elevation-nuage-points', live('046'), 'ok', 'pointspace.ca'],
  ['theatre-st-james-elevation-dessin', live('123'), 'ok', 'pointspace.ca'],
  ['gare-windsor-numerisation-facade', live('066'), 'ok', 'pointspace.ca'],
  ['gare-windsor-nuage-points-exterieur', live('088'), 'ok', 'pointspace.ca'],
  ['analyse-planeite-dalle-carte-couleur', live('103'), 'ok', 'pointspace.ca'],
  ['analyse-planeite-profil', live('104'), 'ok', 'pointspace.ca'],
  ['vac-aero-modele-3d-usine', live('067'), 'ok', 'pointspace.ca'],
  ['vac-aero-nuage-points-usine', live('068'), 'ok', 'pointspace.ca'],
  ['scierie-modele-3d-groupe-cdf', live('094'), 'ok', 'pointspace.ca'],
  ['prevost-usine-photo-360', live('092'), 'ok', 'pointspace.ca'],
  ['prevost-modele-usine', live('093'), 'ok', 'pointspace.ca'],
  ['hapag-lloyd-toronto-express', live('064'), 'ok', 'pointspace.ca'],
  ['hapag-lloyd-nuage-points-coque', live('101'), 'ok', 'pointspace.ca'],
  ['nadco-usine-photo-360', live('086'), 'ok', 'pointspace.ca'],
  ['nadco-plan-amenagement-cao', live('087'), 'ok', 'pointspace.ca'],
  ['westcliff-la-baie-nuage-points', live('112'), 'ok', 'pointspace.ca'],
  ['broccolini-restaurant-nuage-points', live('090'), 'ok', 'pointspace.ca'],
  ['broccolini-modele-revit', live('047'), 'ok', 'pointspace.ca'],
  ['reitmans-magasin-numerisation', live('006'), 'ok', 'pointspace.ca'],
  ['entreplafond-nuage-points', live('002'), 'ok', 'pointspace.ca'],
  ['modele-3d-tours-residentielles', live('124'), 'ok', 'pointspace.ca'],
  ['plan-elevation-tour', live('077'), 'ok', 'pointspace.ca'],
  ['releve-manuel-croquis', live('113'), 'ok', 'pointspace.ca'],
  ['equipement-releve-pointspace', live('052'), 'ok', 'pointspace.ca'],
  ['equipement-modele-3d-renfort', live('062'), 'ok', 'pointspace.ca'],
  ['prevu3d-interface-jumeau-numerique', live('129'), 'ok', 'pointspace.ca'],
  ['st-denis-thompson-tours-nuage-points', live('078'), 'ok', 'pointspace.ca (St-Denis Thompson case study)'],
  ['nelmar-usine-vue-aerienne', live('079'), 'ok', 'pointspace.ca (Nelmar case study)'],
  ['le-foufou-royalmount-modele-bim', live('081'), 'ok', 'pointspace.ca (Le FouFou / JCB case study)'],
];

const LOGO_FILES = [
  ['jessica-daoust-architectes', '01'], ['atelier-monarque', '02'], ['theatre-st-james', '03'], ['conn-x', '04'],
  ['aedifica', '05'], ['jcb-construction-canada', '06'], ['idx', '07'], ['tla-architectes', '08'], ['vac-aero', '09'],
  ['nelmar', '10'], ['st-denis-thompson', '11'], ['benoy', '12'], ['groupe-mach', '13'], ['dallaire-consultants', '14'],
  ['cominar', '15'], ['broccolini', '16'], ['groupe-cdf', '17'], ['reitmans', '18'], ['lainco', '19'], ['groupe-renfort', '20'],
  ['muse-solution', '21'], ['oktodev', '22'], ['shellex', '23'], ['navada', '24'], ['kolostat', '25'],
];

await fs.mkdir(path.join(OUT, 'logos'), { recursive: true });
const manifest = {};
const WIDTHS = [800, 1600];

for (const [name, src, status, source] of IMAGES) {
  if (!src) throw new Error('Missing source for ' + name);
  const img = sharp(src, { limitInputPixels: false }).rotate();
  const meta = await img.metadata();
  const w0 = meta.autoOrient?.width ?? meta.width;
  const h0 = meta.autoOrient?.height ?? meta.height;
  const widths = WIDTHS.filter((w) => w < w0);
  if (!widths.includes(Math.min(w0, 1600))) widths.push(Math.min(w0, 1600));
  const files = [];
  for (const w of [...new Set(widths)].sort((a, b) => a - b)) {
    const file = `${name}-${w}.webp`;
    await sharp(src, { limitInputPixels: false }).rotate().flatten({ background: '#0b1f15' })
      .resize({ width: w, withoutEnlargement: true }).webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, file));
    files.push({ w, file });
  }
  manifest[name] = { width: w0, height: h0, files, status, source };
  process.stdout.write('.');
}

const logoDir = await fs.readdir(LOGOS);
for (const [name, id] of LOGO_FILES) {
  const f = logoDir.find((n) => n.startsWith(id + '_'));
  const out = `logos/client-${name}.webp`;
  const buf = sharp(path.join(LOGOS, f)).trim().resize({ height: 120, width: 360, fit: 'inside' });
  const info = await buf.webp({ quality: 90 }).toFile(path.join(OUT, out));
  manifest['logo-' + name] = { width: info.width, height: info.height, files: [{ w: info.width, file: out }], status: 'ok', source: 'pointspace.ca (logo strip)' };
}

// Brand logos: SVGs copied unchanged
await fs.copyFile(P('Green_Background_Logo/Green_Background_Logo.svg'), path.join(OUT, 'logo-pointspace-on-green.svg'));
await fs.copyFile(P('Cream_Background_Logo/Cream_Background_Logo.svg'), path.join(OUT, 'logo-pointspace-on-cream.svg'));

await fs.writeFile(path.join(ROOT, 'src/data/image-manifest.json'), JSON.stringify(manifest, null, 1));
console.log('\n', Object.keys(manifest).length, 'images');
