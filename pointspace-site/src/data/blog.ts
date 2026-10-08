// Existing articles on pointspace.ca (titles, dates, authors as published; see content-digest.md §8).
// The prototype does not rebuild articles: every link goes to the live article.
const L = 'https://www.pointspace.ca';
// `internal: true` = article rebuilt in this prototype (links stay on the site, no "on pointspace.ca" label).
export type Article = { id: string; title: string; date: string; iso: string; author?: string; url: string; topic: string; internal?: boolean };

export const BLOG: { fr: Article[]; en: Article[] } = {
  fr: [
    { id: 'scan-to-bim-maison', title: "Scan 3D d'un bâtiment existant : du nuage de points aux plans tels que construits et au modèle BIM", date: '7 octobre 2026', iso: '2026-10-07', author: 'Leandro Lazaretti', url: '/fr-ca/blogue/scan-3d-batiment-existant-plans-tels-que-construits-bim', topic: 'Scan-to-BIM', internal: true },
    { id: 'ia-autodesk', title: "L'IA dans Autodesk 2027 et son rôle dans le futur de l'industrie", date: '30 avril 2026', iso: '2026-04-30', author: 'Marketing pointSpace', url: `${L}/l-ia-dans-autodesk-2027-et-son-role-dans-le-futur-de-l-industrie`, topic: 'BIM' },
    { id: 'glossaire', title: 'Glossaire du monde de la numérisation et de la modélisation 3D', date: '26 mars 2026', iso: '2026-03-26', author: 'Marketing pointSpace', url: `${L}/glossaire-du-monde-de-la-numerisation-et-de-la-modelisation-3d`, topic: 'Ressources' },
    { id: 'materiel', title: 'Le matériel qui différencie pointSpace', date: '26 février 2026', iso: '2026-02-26', url: `${L}/le-materiel-qui-differencie-pointspace`, topic: 'Numérisation' },
    { id: 'workflow', title: 'Comment la numérisation 3D optimise et transforme votre manière de travailler ?', date: '15 janvier 2026', iso: '2026-01-15', author: 'Louis Dallaire', url: `${L}/fr-ca/comment-la-numerisation-3d-optimise-et-transforme-votre-maniere-de-travailler`, topic: 'Numérisation' },
    { id: 'modelisation', title: 'Le processus de modélisation 3D et mise en plan', date: '28 février 2025', iso: '2025-02-28', author: 'Louis Dallaire', url: `${L}/fr-ca/la-numerisation-3d-le-processus-de-modelisation3d-et-mise-en-plan`, topic: 'Modélisation' },
    { id: 'bim', title: 'BIM : définitions, bénéfices, niveaux de maturité et durabilité', date: '9 octobre 2024', iso: '2024-10-09', author: 'Louis Dallaire', url: `${L}/fr-ca/bim-definitions-avantages-niveaux-de-maturite-et-durabilite`, topic: 'BIM' },
    { id: 'entreplafonds', title: 'Numérisation 3D des entreplafonds', date: '24 septembre 2024', iso: '2024-09-24', author: 'Louis Dallaire', url: `${L}/fr-ca/numerisation-3d-des-entreplafonds`, topic: 'Numérisation' },
    { id: 'processus', title: 'La numérisation 3D : le processus de numérisation', date: '17 septembre 2024', iso: '2024-09-17', author: 'Louis Dallaire', url: `${L}/fr-ca/la-numerisation-3d-le-processus-de-numerisation`, topic: 'Numérisation' },
    { id: 'preparation', title: "Préparation technique d'un relevé de numérisation 3D", date: '11 mars 2024', iso: '2024-03-11', author: 'Louis Dallaire', url: `${L}/fr-ca/preparation-technique-dun-releve-numerisation-3d`, topic: 'Numérisation' },
  ],
  en: [
    { id: 'scan-to-bim-maison', title: '3D Scanning an Existing Building: From Point Cloud to As-Built Drawings and a BIM Model', date: 'October 7, 2026', iso: '2026-10-07', author: 'Leandro Lazaretti', url: '/blog/3d-scan-existing-building-as-built-drawings-bim', topic: 'Scan-to-BIM', internal: true },
    { id: 'materiel', title: 'The Material Differentiating pointSpace', date: 'March 19, 2026', iso: '2026-03-19', author: 'Louis Dallaire', url: `${L}/the-material-differentiating-pointspace`, topic: 'Scanning' },
    { id: 'workflow', title: 'How 3D Scanning Streamlines and Elevates Your Workflow', date: 'March 12, 2026', iso: '2026-03-12', author: 'Louis Dallaire', url: `${L}/how-3d-scanning-streamlined-and-elevates-your-workflow`, topic: 'Scanning' },
    { id: 'modelisation', title: 'The 3D Modeling Process', date: 'February 28, 2025', iso: '2025-02-28', author: 'Louis Dallaire', url: `${L}/3d-modeling-process`, topic: 'Modeling' },
    { id: 'bim', title: 'BIM: Definitions, Benefits, Maturity Levels and Sustainability', date: 'October 9, 2024', iso: '2024-10-09', author: 'Louis Dallaire', url: `${L}/bim-definitions-benefits-maturity-levels-and-sustainability`, topic: 'BIM' },
    { id: 'entreplafonds', title: '3D Scan of Ceiling Spaces', date: 'September 24, 2024', iso: '2024-09-24', author: 'Louis Dallaire', url: `${L}/3d-digitizing-of-ceiling-spaces`, topic: 'Scanning' },
    { id: 'processus', title: 'The 3D Scanning Process', date: 'September 17, 2024', iso: '2024-09-17', author: 'Louis Dallaire', url: `${L}/3d-scanning-the-scanning-process`, topic: 'Scanning' },
    { id: 'preparation', title: 'Technical Preparation of a 3D Scanning Survey', date: 'March 11, 2024', iso: '2024-03-11', author: 'Louis Dallaire', url: `${L}/technical-preparation-of-a-survey-3d-scanning`, topic: 'Scanning' },
  ],
};

export const read = (lang: 'fr' | 'en', ids: string[]) =>
  ids.map((id) => BLOG[lang].find((a) => a.id === id)).filter(Boolean).map((a) => ({ title: a!.title, href: a!.url, meta: [a!.author, a!.date].filter(Boolean).join(' · ') }));
