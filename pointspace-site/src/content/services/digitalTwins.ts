import type { Bilingual, ServiceContent } from '../types';

// Partner page: wording kept to what the live page says about Prevu3D (no feature claims added;
// the unsourced -25 % / -35 % / +70 % figures are left out, see TODO W10).
export const digitalTwins: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: "Jumeaux numériques de bâtiments et d'usines | pointSpace",
      description: 'Jumeaux numériques 3D précis, propulsés par Prevu3D, pour visualiser, simuler et gérer vos installations à partir de vos données de numérisation.',
    },
    serviceType: 'Jumeau numérique',
    hero: {
      eyebrow: 'Service · Partenaire Prevu3D',
      h1: "Jumeaux numériques de bâtiments et d'usines",
      lead: 'Une réplique 3D de vos installations pour visualiser, simuler et gérer.',
      image: 'prevu3d-interface-jumeau-numerique', position: '50% 50%',
    },
    intro: {
      h2: 'Votre usine, consultable et modifiable à l\'écran',
      lead: "Un <strong>jumeau numérique</strong> est une réplique 3D fidèle de vos espaces et de vos actifs, construite à partir de la numérisation 3D. En complément de nos solutions de numérisation et de mise en plan, nous enrichissons vos projets avec les outils de visualisation <strong>Prevu3D</strong> pour l'industrie manufacturière.",
      body: [
        "Nous créons un jumeau numérique intuitif et précis de vos installations. Vos équipes peuvent y centraliser leurs captures de la réalité, planifier un nouvel aménagement, déplacer des machines pour vérifier leur adéquation et suivre l'état de leurs équipements, sans perturber la production.",
      ],
      glance: [
        { k: 'Idéal pour', v: "Industrie manufacturière, gestion des installations, planification d'aménagement" },
        { k: 'Plateforme', v: 'Outils de visualisation Prevu3D (RealityPlan™)' },
        { k: 'Source', v: 'Numérisation 3D de vos installations' },
      ],
    },
    features: {
      eyebrow: 'Avec Prevu3D',
      title: 'Ce que votre jumeau numérique permet',
      cols: 3,
      items: [
        { title: 'Centraliser vos captures de la réalité', text: 'Héberger, gérer et traiter vos nuages de points et les convertir en maillages 3D, dans RealityPlan™.', image: 'prevu3d-interface-jumeau-numerique' },
        { title: 'Planifier vos aménagements', text: "Déplacer des machines dans le jumeau et vérifier qu'elles s'intègrent avant de toucher au plancher de production.", image: 'modele-bim-salle-mecanique-vue-ensemble' },
        { title: 'Suivre vos actifs', text: "Consigner pour chaque équipement la fréquence d'inspection, l'accessibilité et la date de la dernière inspection (RealityAsset).", image: 'hero-point-cloud-to-bim-poster' },
      ],
    },
    related: ['scanning', 'modeling3d', 'scanToBim'],
    cta: { title: 'Découvrez les jumeaux numériques', text: "Parlez-nous de votre installation et de vos objectifs : nous vous proposerons une démonstration et une soumission." },
  },
  en: {
    seo: {
      title: 'Digital Twins for Buildings and Plants | pointSpace',
      description: 'Accurate 3D digital twins powered by Prevu3D, to visualise, simulate and manage your facilities from your scanning data.',
    },
    serviceType: 'Digital twin',
    hero: {
      eyebrow: 'Service · Prevu3D partner',
      h1: 'Digital Twins for Buildings and Plants',
      lead: 'A 3D replica of your facilities to visualise, simulate and manage.',
      image: 'prevu3d-interface-jumeau-numerique', position: '50% 50%',
    },
    intro: {
      h2: 'Your plant, on screen and ready to plan',
      lead: 'A <strong>digital twin</strong> is an accurate 3D replica of your spaces and assets, built from 3D scanning. Alongside our scanning and drafting services, we enhance your projects with <strong>Prevu3D</strong> visualisation tools for manufacturing.',
      body: [
        'We create an intuitive, accurate digital twin of your facilities. Your teams can centralise their reality captures, plan a new layout, move machines to check that they fit, and track the condition of their equipment without disrupting production.',
      ],
      glance: [
        { k: 'Best for', v: 'Manufacturing, facility management, layout planning' },
        { k: 'Platform', v: 'Prevu3D visualisation tools (RealityPlan™)' },
        { k: 'Source', v: '3D scan of your facilities' },
      ],
    },
    features: {
      eyebrow: 'With Prevu3D',
      title: 'What your digital twin lets you do',
      cols: 3,
      items: [
        { title: 'Centralise your reality captures', text: 'Host, manage and process your point clouds and convert them into 3D meshes in RealityPlan™.', image: 'prevu3d-interface-jumeau-numerique' },
        { title: 'Plan your layouts', text: 'Move machines in the twin and check that they fit before touching the production floor.', image: 'modele-bim-salle-mecanique-vue-ensemble' },
        { title: 'Track your assets', text: 'Record inspection frequency, accessibility and last inspection date for each piece of equipment (RealityAsset).', image: 'hero-point-cloud-to-bim-poster' },
      ],
    },
    related: ['scanning', 'modeling3d', 'scanToBim'],
    cta: { title: 'Discover digital twins', text: 'Tell us about your facility and your goals: we will suggest a demo and a quote.' },
  },
};
