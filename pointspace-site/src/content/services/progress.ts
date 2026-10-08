import type { Bilingual, ServiceContent } from '../types';

export const progress: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: "Suivi d'avancement de chantier par numérisation 3D | pointSpace",
      description: "Suivi d'avancement de vos travaux par relevés laser 3D réguliers : plans tels que construits, modèles 3D et analyses mis à jour à chaque étape du projet.",
    },
    serviceType: "Suivi d'avancement de chantier",
    hero: {
      eyebrow: 'Service · Chantier',
      h1: "Suivi d'avancement de chantier par numérisation 3D",
      lead: 'Des données précises sur votre chantier, à chaque étape du projet.',
      image: 'scanner-laser-3d-entrepot-vide', position: '50% 60%',
      chips: ['E57', 'DWG', 'RVT'],
    },
    intro: {
      h2: "L'état réel du chantier, relevé à intervalles réguliers",
      lead: "Le <strong>suivi d'avancement</strong> consiste à numériser votre chantier à des moments clés pour documenter ce qui a réellement été construit. À chaque relevé laser 3D, vous obtenez rapidement des données précises : nuage de points, plans tels que construits, modèles 3D et analyses mis à jour.",
      body: [
        "Ce suivi clair et détaillé vous aide à piloter le projet : vérifier l'avancement des travaux, documenter les éléments avant qu'ils soient cachés, préparer les étapes suivantes et mobiliser rapidement les équipes. La fréquence des relevés est établie selon un calendrier adapté à vos besoins.",
      ],
      glance: [
        { k: 'Idéal pour', v: 'Entrepreneurs, promoteurs, gestionnaires de projet' },
        { k: 'Fréquence', v: 'Selon un calendrier adapté à votre projet' },
        { k: 'Livrables', v: 'Nuages de points, plans, modèles 3D et analyses mis à jour' },
      ],
    },
    deliverables: {
      title: "Ce que vous recevez à chaque relevé",
      items: [
        { title: 'Nuage de points daté', formats: ['E57'], text: "Le relevé de l'état du chantier à une date donnée, conservé comme référence." },
        { title: 'Plans tels que construits mis à jour', formats: ['DWG', 'PDF'], text: 'Plans révisés pour refléter les travaux réalisés depuis le relevé précédent.' },
        { title: 'Modèle 3D mis à jour', formats: ['RVT'], text: "Mises à jour régulières du modèle au fil de l'avancement des travaux." },
        { title: 'Analyses', text: 'Au besoin, des analyses de planéité, de verticalité ou de déformations sur les éléments construits.' },
      ],
      visuals: [
        { image: 'modele-bim-mep-entrepot', caption: "Modèle BIM d'un entrepôt avec ses réseaux mécaniques." },
        { image: 'analyse-planeite-dalle-carte-couleur', caption: "Carte de planéité d'une dalle, un contrôle possible à chaque étape." },
      ],
    },
    process: {
      title: 'Un suivi en quatre temps',
      steps: [
        { title: 'Calendrier des relevés', text: 'Nous fixons avec vous les étapes clés du chantier à documenter et les livrables attendus.' },
        { title: 'Relevés sur site', text: 'Notre équipe numérise le chantier à chaque étape prévue.' },
        { title: 'Mise à jour des livrables', text: 'Plans, modèles et analyses sont mis à jour à partir du nouveau relevé.' },
        { title: 'Diffusion et suivi', text: 'Les résultats sont transmis à votre équipe pour préparer la suite des travaux.' },
      ],
    },
    cases: { title: "Projets avec suivi d'avancement", ids: ['le-foufou', 'steel', 'westcliff'] },
    testimonial: 'carosielliShort',
    faq: {
      title: "Questions fréquentes sur le suivi d'avancement",
      items: [
        { q: 'Que comprend le suivi d\'avancement ?', a: 'Des relevés laser 3D à des étapes clés, et selon vos besoins des plans tels que construits, des modèles 3D et des analyses mis à jour.' },
        { q: 'À quelle fréquence faites-vous les relevés ?', a: 'Selon un calendrier adapté à vos besoins et aux étapes de votre chantier.' },
        { q: 'Quelle est la précision des relevés ?', a: 'Nous utilisons des scanners LiDAR de précision millimétrique. Bien que la précision millimétrique absolue ne puisse être garantie, nos relevés offrent de façon constante un très haut niveau de précision.' },
        { q: 'Dans quels formats recevons-nous les résultats ?', a: 'Dans les formats de votre équipe : E57 pour les nuages de points, DWG et PDF pour les plans, Revit pour les modèles. Nous offrons aussi des formations personnalisées.' },
      ],
    },
    related: ['scanning', 'photo360', 'analysis'],
    cta: { title: 'Planifions le suivi de votre chantier', text: 'Présentez-nous votre projet et ses grandes étapes. Nous vous proposerons un calendrier de relevés et une soumission.' },
  },
  en: {
    seo: {
      title: 'Construction Progress Tracking with 3D Scans | pointSpace',
      description: 'Construction progress tracking with regular 3D laser surveys: as-built drawings, 3D models and analyses updated at every stage of your project.',
    },
    serviceType: 'Construction progress tracking',
    hero: {
      eyebrow: 'Service · Construction',
      h1: 'Construction Progress Tracking',
      lead: 'Accurate data on your site at every stage of the project.',
      image: 'scanner-laser-3d-entrepot-vide', position: '50% 60%',
      chips: ['E57', 'DWG', 'RVT'],
    },
    intro: {
      h2: 'The real state of the site, surveyed at regular intervals',
      lead: '<strong>Construction progress tracking</strong> means scanning your site at key moments to document what has actually been built. With each 3D laser survey you quickly get accurate data: point cloud, as-built drawings, 3D models and analyses, all updated.',
      body: [
        'This clear, detailed tracking helps you run the project: check progress, document elements before they are concealed, prepare the next stages and mobilise teams quickly. Survey frequency follows a schedule tailored to your needs.',
      ],
      glance: [
        { k: 'Best for', v: 'Contractors, developers, project managers' },
        { k: 'Frequency', v: 'On a schedule tailored to your project' },
        { k: 'Deliverables', v: 'Updated point clouds, drawings, 3D models and analyses' },
      ],
    },
    deliverables: {
      title: 'What you receive with each survey',
      items: [
        { title: 'Dated point cloud', formats: ['E57'], text: 'A record of site conditions on a given date, kept as a reference.' },
        { title: 'Updated as-built drawings', formats: ['DWG', 'PDF'], text: 'Drawings revised to reflect the work completed since the previous survey.' },
        { title: 'Updated 3D model', formats: ['RVT'], text: 'Regular model updates as construction progresses.' },
        { title: 'Analyses', text: 'When needed, flatness, plumbness or deformation analyses of the built elements.' },
      ],
      visuals: [
        { image: 'modele-bim-mep-entrepot', caption: 'BIM model of a warehouse with its mechanical services.' },
        { image: 'analyse-planeite-dalle-carte-couleur', caption: 'Slab flatness map, a check available at any stage.' },
      ],
    },
    process: {
      title: 'Tracking in four stages',
      steps: [
        { title: 'Survey schedule', text: 'We agree with you on the key construction stages to document and the deliverables required.' },
        { title: 'Site surveys', text: 'Our team scans the site at each planned stage.' },
        { title: 'Deliverable updates', text: 'Drawings, models and analyses are updated from the new survey.' },
        { title: 'Sharing and follow-up', text: 'Results go to your team to prepare the next phase of work.' },
      ],
    },
    cases: { title: 'Projects with progress tracking', ids: ['le-foufou', 'steel', 'westcliff'] },
    testimonial: 'carosielliShort',
    faq: {
      title: 'Progress tracking FAQ',
      items: [
        { q: 'What does progress tracking include?', a: '3D laser surveys at key stages and, depending on your needs, updated as-built drawings, 3D models and analyses.' },
        { q: 'How often do you survey?', a: 'On a schedule tailored to your needs and to your construction stages.' },
        { q: 'How accurate are the surveys?', a: 'We use millimetre-level LiDAR scanners. While absolute millimetric precision cannot be guaranteed, our surveys consistently deliver a very high level of accuracy.' },
        { q: 'Which formats do we receive?', a: 'Your team’s formats: E57 for point clouds, DWG and PDF for drawings, Revit for models. We also offer tailored training.' },
      ],
    },
    related: ['scanning', 'photo360', 'analysis'],
    cta: { title: 'Let’s plan your progress tracking', text: 'Tell us about your project and its main stages. We will propose a survey schedule and a quote.' },
  },
};
