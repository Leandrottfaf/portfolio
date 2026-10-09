// Single source of truth for every page's URL in both languages.
// Used for navigation, the FR|EN switch, hreflang and canonical tags.
// Slug changes are listed in reference/redirects.md.

export type Lang = 'fr' | 'en';

export const ROUTES = {
  home: { fr: '/fr-ca', en: '/' },
  scanning: { fr: '/fr-ca/services/numerisation-LiDAR-3D', en: '/services/LiDAR-3D-Scanning' },
  scanToBim: { fr: '/fr-ca/services/modélisation-bim', en: '/services/scan-to-bim' },
  asBuilt: { fr: '/fr-ca/services/plans-tels-que-construits', en: '/services/as-built-drawings' },
  modeling3d: { fr: '/fr-ca/services/modelisation-3d', en: '/services/3D-modeling' },
  analysis: { fr: '/fr-ca/services/analyse-du-bâtiment', en: '/services/building-analysis' },
  boma: { fr: '/fr-ca/services/mesurage-boma', en: '/services/boma-measurement' },
  progress: { fr: '/fr-ca/services/suivi-davancement', en: '/services/progress-reporting' },
  photo360: { fr: '/fr-ca/services/photo-360', en: '/services/360-photo' },
  matterport: { fr: '/fr-ca/services/visites-virtuelles-matterport', en: '/services/Matterport-3D-Virtual-Tours' },
  digitalTwins: { fr: '/fr-ca/services/jumeaux-numeriques', en: '/services/digital-twins' },
  manufacturing: { fr: '/fr-ca/manufacturier-industriel', en: '/manufacturing-industrial' },
  architecture: { fr: '/fr-ca/architecture-batiments', en: '/architecture-buildings' },
  caseStudies: { fr: '/fr-ca/etudes-de-cas', en: '/case-studies' },
  caseWindsor: { fr: '/fr-ca/case-studies/case-study-windsor', en: '/case-studies/case-study-windsor' },
  blog: { fr: '/fr-ca/blogue', en: '/blog' },
  blogScanToBim: { fr: '/fr-ca/blogue/numerisation-3d-scan-to-bim-plans-tels-que-construits', en: '/blog/3d-scanning-scan-to-bim-as-built-drawings' },
  about: { fr: '/fr-ca/a-propos', en: '/about-us' },
  contact: { fr: '/fr-ca/contact', en: '/contact' },
  quote: { fr: '/fr-ca/obtenir-une-soumission', en: '/get-a-quote' },
  careers: { fr: '/fr-ca/carrieres', en: '/careers' },
  styleguide: { fr: '/styleguide', en: '/styleguide' }, // internal, noindex
} as const;

export type RouteId = keyof typeof ROUTES;

export const url = (id: RouteId, lang: Lang) => ROUTES[id][lang];

/** Pages not rebuilt in the prototype: these links go to the live site. */
export const LIVE = 'https://www.pointspace.ca';
export const PRIVACY = { fr: `${LIVE}/fr-ca/politique-de-confidentialite`, en: `${LIVE}/security-and-privacy-policy` };
