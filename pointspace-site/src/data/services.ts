import type { RouteId } from './routes';

// The 10 services. Labels follow the brief's wording decisions:
// "Plans tels que construits" (no English label on the FR site), "Scan-to-BIM", "Mesurage BOMA".
export type Service = {
  id: RouteId;
  group: 'capture' | 'deliver';
  image: string; // key in image-manifest.json
  fr: { label: string; card: string };
  en: { label: string; card: string };
};

export const SERVICES: Service[] = [
  {
    id: 'scanning', group: 'capture', image: 'scanner-leica-rtc360-toit-industriel',
    fr: { label: 'Numérisation LiDAR 3D', card: "Relevé laser 3D rapide et précis de l'existant : bâtiments, façades, mécanique, entreplafonds et toitures." },
    en: { label: 'LiDAR 3D Scanning', card: 'Fast, accurate 3D laser surveys of existing conditions: buildings, façades, mechanical rooms, ceiling spaces and roofs.' },
  },
  {
    id: 'photo360', group: 'capture', image: 'prevost-usine-photo-360',
    fr: { label: 'Photo 360°', card: 'Photographie de site 360° haute résolution, convertible en visite virtuelle Matterport immersive.' },
    en: { label: '360° Photo', card: 'High-resolution 360° site photography that can be converted into an immersive Matterport virtual tour.' },
  },
  {
    id: 'matterport', group: 'capture', image: 'broccolini-restaurant-nuage-points',
    fr: { label: 'Visites virtuelles Matterport', card: "Visites virtuelles 3D immersives et sécurisées pour le marketing, les présentations et l'accès à distance." },
    en: { label: 'Matterport Virtual Tours', card: 'Immersive, secure 3D virtual tours for marketing, presentations and remote project access.' },
  },
  {
    id: 'asBuilt', group: 'deliver', image: 'gare-windsor-plan-tel-que-construit',
    fr: { label: 'Plans tels que construits', card: "Plans 2D conformes à l'exécution, produits à partir de scans 3D : plans d'étage, élévations, coupes et plafonds réfléchis." },
    en: { label: 'As-Built Drawings', card: 'As-built drawings produced from 3D scans: floor plans, elevations, sections and reflected ceiling plans.' },
  },
  {
    id: 'scanToBim', group: 'deliver', image: 'scan-to-bim-revit-model-cutaway-dark',
    fr: { label: 'Scan-to-BIM', card: "Modèles Revit (RVT) et IFC de l'existant, produits à partir de nuages de points selon le niveau de détail (LOD) convenu." },
    en: { label: 'Scan-to-BIM', card: 'As-built Revit (RVT) and IFC models produced from point clouds at the agreed level of detail (LOD).' },
  },
  {
    id: 'modeling3d', group: 'deliver', image: 'vac-aero-modele-3d-usine',
    fr: { label: 'Modélisation 3D', card: "Modèles 3D d'installations et d'équipements, compatibles avec Revit, CAO, STEP, SAT et plus encore." },
    en: { label: '3D Modeling', card: '3D models of facilities and equipment, compatible with Revit, CAD, STEP, SAT and more.' },
  },
  {
    id: 'boma', group: 'deliver', image: 'plan-superficies-locatives-gare-windsor',
    fr: { label: 'Mesurage BOMA', card: 'Calcul de superficie locative et plans conformes aux normes BOMA pour propriétaires et gestionnaires immobiliers.' },
    en: { label: 'BOMA Measurement', card: 'Rentable and usable area calculations with floor plans that follow BOMA standards, for owners and property managers.' },
  },
  {
    id: 'analysis', group: 'deliver', image: 'analyse-planeite-dalle-carte-couleur',
    fr: { label: 'Analyse du bâtiment', card: 'Planéité, verticalité, déformations structurelles et façades, mesurées sur le nuage de points.' },
    en: { label: 'Building Analysis', card: 'Flatness, plumbness, structural deformation and façades, measured on the point cloud.' },
  },
  {
    id: 'progress', group: 'deliver', image: 'modele-bim-mep-entrepot',
    fr: { label: "Suivi d'avancement", card: "Suivez l'avancement de vos travaux et obtenez rapidement des données précises à chaque étape du projet." },
    en: { label: 'Progress Tracking', card: 'Track construction progress and get accurate data quickly at every stage of your project.' },
  },
  {
    id: 'digitalTwins', group: 'deliver', image: 'prevu3d-interface-jumeau-numerique',
    fr: { label: 'Jumeaux numériques', card: 'Jumeaux numériques 3D propulsés par Prevu3D pour la visualisation, la simulation et la gestion des installations.' },
    en: { label: 'Digital Twins', card: '3D digital twins powered by Prevu3D for visualization, simulation and facility management.' },
  },
];

export const serviceById = (id: RouteId) => SERVICES.find((s) => s.id === id)!;
