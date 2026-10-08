import type { RouteId } from './routes';

// The 15 public case studies on pointspace.ca (see reference/current-site/public-clients.md).
// Titles are the live titles with obvious typos fixed. Only the Windsor study is rebuilt as a template (`route`);
// the others link to the live pages (`live`).
export type CaseStudy = {
  id: string;
  client: string;
  sector: 'manufacturing' | 'architecture';
  services: RouteId[];
  image?: string;
  route?: RouteId;
  fr: { title: string; live: string };
  en: { title: string; live: string };
};

const L = 'https://www.pointspace.ca';

export const CASE_STUDIES: CaseStudy[] = [
  { id: 'windsor', client: 'Laurier Capital', sector: 'architecture', services: ['scanning', 'asBuilt'], image: 'gare-windsor-numerisation-facade', route: 'caseWindsor',
    fr: { title: 'Numérisation 3D et mise à jour de plans : la Gare Windsor à Montréal', live: `${L}/fr-ca/case-studies/case-study-windsor` },
    en: { title: '3D Scanning and Plan Updating: Windsor Station in Montreal', live: `${L}/case-studies/case-study-windsor` } },
  { id: 'st-james', client: 'Groupe Carosielli', sector: 'architecture', services: ['scanning', 'asBuilt'], image: 'theatre-st-james-numerisation-facade',
    fr: { title: 'Scan 3D et mise en plan du Théâtre St-James', live: `${L}/fr-ca/etude-de-cas/scan-3d-et-mise-en-plan-du-theatre-st-james` },
    en: { title: '3D Scan and As-Built Plans of the St-James Theatre', live: `${L}/case-studies/3D_Scan_and_As-Built_plans_of_the_st-james_theater` } },
  { id: 'vac-aero', client: 'VAC AERO International', sector: 'manufacturing', services: ['scanning', 'modeling3d', 'scanToBim', 'asBuilt'], image: 'vac-aero-modele-3d-usine',
    fr: { title: "Scan 3D, modélisation 3D et aménagement d'une usine", live: `${L}/fr-ca/etude-de-cas/Scan-3D-et-modélisation-3D-dune-usine` },
    en: { title: '3D Scan and 3D Modeling of an Industrial Facility', live: `${L}/case-studies/3D-Scan-and-3D-Modeling-of-an-Industrial-Facility` } },
  { id: 'cdf', client: 'Groupe CDF', sector: 'manufacturing', services: ['scanning', 'modeling3d', 'scanToBim'], image: 'scierie-modele-3d-groupe-cdf',
    fr: { title: "Scan 3D et modélisation 3D d'une scierie", live: `${L}/fr-ca/etude-de-cas/Scan-3D-et-modélisation-3D-dune-scierie` },
    en: { title: '3D Scan and 3D Modeling of a Sawmill', live: `${L}/case-studies/fire-protection-for-a-sawmill` } },
  { id: 'broccolini', client: 'Broccolini', sector: 'architecture', services: ['scanning', 'scanToBim', 'modeling3d'], image: 'broccolini-modele-revit',
    fr: { title: "Numérisation 3D et modélisation 3D complète d'un bâtiment", live: `${L}/fr-ca/etude-de-cas/numerisation-3D-et-modelisation-3D-complete-dun-batiment` },
    en: { title: 'Comprehensive Building 3D Scanning and 3D Modeling', live: `${L}/case-studies/Comprehensive-Building-3D-Scanning-and-3D-Modeling` } },
  { id: 'reitmans', client: 'Reitmans Canada Ltée', sector: 'architecture', services: ['scanning', 'photo360', 'matterport', 'asBuilt'], image: 'reitmans-vitrine-nuage-points',
    fr: { title: 'Numérisation 3D exhaustive de commerces de détail', live: `${L}/fr-ca/etude-de-cas/Numérisation-3D-exhaustive-de-commerces-de-détail` },
    en: { title: 'Comprehensive 3D Scan of Retail Spaces', live: `${L}/case-studies/Comprehensive_3D_Scan_of_retail_spaces` } },
  { id: 'st-denis', client: 'St-Denis Thompson', sector: 'architecture', services: ['scanning', 'modeling3d', 'analysis'], image: 'st-denis-thompson-tours-nuage-points',
    fr: { title: 'Numérisation 3D et modélisation 3D des façades de bâtiments', live: `${L}/fr-ca/etude-de-cas/Scan-3D-et-modélisation-3D-des-façades-dun-bâtiment` },
    en: { title: '3D Scan and 3D Modeling of Building Façades', live: `${L}/case-studies/3D-Scan-and-3D-Modeling-of-Building-Facades` } },
  { id: 'nelmar', client: 'Nelmar', sector: 'manufacturing', services: ['scanning', 'asBuilt'], image: 'nelmar-usine-vue-aerienne',
    fr: { title: "Numérisation et mise en plan des zones critiques d'une ligne de production", live: `${L}/fr-ca/etude-de-cas/Mise-en-plan-et-numérisation-3D-des-zones-critiques-de-la-chaîne-de-production` },
    en: { title: '3D Scan and Plans of Critical Areas on a Production Line', live: `${L}/case-studies/3D-Scan-and-as-built-plans-of-Critical-Areas-on-a-Production-Line` } },
  { id: 'westcliff', client: 'Westcliff', sector: 'architecture', services: ['scanning', 'asBuilt', 'boma'], image: 'westcliff-la-baie-nuage-points',
    fr: { title: "Plans architecturaux tels que construits d'un espace commercial", live: `${L}/fr-ca/case-studies/Plans-architecturaux-tels-que-construits-dun-espace-commercial` },
    en: { title: 'As-Built Architectural Plans for a Retail Space', live: `${L}/case-studies/As-built_architectural_plans_for_a_retail_space` } },
  { id: 'steel', client: 'Secteur industriel', sector: 'manufacturing', services: ['scanning', 'analysis', 'progress'], image: 'analyse-planeite-dalle-carte-couleur',
    fr: { title: "Étude structurelle et de toiture pour l'ajout de charpente en acier", live: `${L}/fr-ca/etude-de-cas/etude-structurelle-et-toiture` },
    en: { title: 'Structural and Roofing Analysis Ahead of Steel Frame Installation', live: `${L}/case-studies/Structural-and-Roofing-Analysis-Ahead-of-Steel-Frame-Installation` } },
  { id: 'renfort', client: 'Groupe Renfort', sector: 'manufacturing', services: ['scanning', 'modeling3d'], image: 'equipement-modele-3d-renfort',
    fr: { title: 'Problème de santé et sécurité en milieu industriel', live: `${L}/fr-ca/case-studies/Problème-de-santé-et-sécurité-en-milieu-industriel` },
    en: { title: 'Health and Safety Issue in an Industrial Site', live: `${L}/case-studies/Health-and-safety-issue-in-an-industrial-site` } },
  { id: 'le-foufou', client: 'JCB Construction Canada', sector: 'architecture', services: ['scanning', 'asBuilt', 'scanToBim', 'progress'], image: 'le-foufou-royalmount-modele-bim',
    fr: { title: 'Plans tels que construits – Espace Le FouFou', live: `${L}/fr-ca/etude-de-cas/Plans-tels-que-construits-Le-FouFou` },
    en: { title: 'As-Built Plans – Le FouFou', live: `${L}/case-studies/As-Built-plans-le-foufou` } },
  { id: 'hapag-lloyd', client: 'Hapag-Lloyd', sector: 'manufacturing', services: ['scanning'], image: 'hapag-lloyd-nuage-points-coque',
    fr: { title: 'Numérisation 3D industrielle pour navire : le Toronto Express au port de Montréal', live: `${L}/fr-ca/case-studies/case-study-hapag-lloyd` },
    en: { title: 'Industrial 3D Scanning for Marine Retrofit: the Toronto Express at the Port of Montreal', live: `${L}/case-studies/hapag-lloyd` } },
  { id: 'nadco', client: 'Les Plastiques Nadco', sector: 'manufacturing', services: ['scanning', 'asBuilt'], image: 'nadco-plan-amenagement-cao',
    fr: { title: "Plans d'aménagement 2D d'une usine manufacturière", live: `${L}/fr-ca/case-studies/case-study-nadco` },
    en: { title: '2D Layout Plans of a Manufacturing Plant', live: `${L}/case-studies/case-study-nadco` } },
  { id: 'prevost', client: 'Prevost', sector: 'manufacturing', services: ['scanning', 'modeling3d', 'photo360'], image: 'prevost-modele-usine',
    fr: { title: "Numérisation 3D d'une usine de bus", live: `${L}/fr-ca/case-studies/copy-of-case-study-nadco` },
    en: { title: '3D Scanning a Bus Factory', live: `${L}/case-studies/copy-of-case-study-nadco` } },
];

export const caseById = (id: string) => CASE_STUDIES.find((c) => c.id === id)!;
