import type { Bilingual, ServiceContent } from '../types';
import { read } from '../../data/blog';

export const analysis: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: 'Analyse du bâtiment : planéité et déformations | pointSpace',
      description: 'Contrôle géométrique à partir de nuages de points : analyse de planéité des dalles, verticalité des murs et colonnes, déformations structurelles et façades.',
    },
    serviceType: 'Analyse du bâtiment',
    hero: {
      eyebrow: 'Service · Analyses',
      h1: 'Analyse du bâtiment : planéité, verticalité et déformations',
      lead: "Des mesures objectives de l'état de vos dalles, murs, structures et façades.",
      image: 'analyse-planeite-dalle-carte-couleur', position: '50% 50%',
    },
    intro: {
      h2: "Mesurer l'existant avant d'intervenir",
      lead: "L'<strong>analyse du bâtiment</strong> utilise le nuage de points d'un relevé laser 3D pour faire un contrôle géométrique précis : <strong>planéité</strong> des dalles, <strong>verticalité</strong> des murs et des colonnes, <strong>déformations structurelles</strong>, état des façades et conservation du patrimoine.",
      body: [
        "Les écarts sont calculés sur des millions de points plutôt que sur quelques mesures ponctuelles. Les résultats prennent la forme de cartes en couleur, de profils et de coupes, faciles à lire pour les ingénieurs, les entrepreneurs et les gestionnaires, et à intégrer à leurs logiciels.",
      ],
      glance: [
        { k: 'Idéal pour', v: 'Ajout de charpente, installation d\'équipements, rénovation, expertise de bâtiments' },
        { k: 'Analyses', v: 'Planéité, verticalité, déformations, façades, patrimoine' },
        { k: 'Livrables', v: 'Cartes d\'écarts, profils, coupes, nuage de points E57' },
      ],
    },
    features: {
      eyebrow: 'Types d\'analyses',
      title: 'Six contrôles sur un même relevé',
      cols: 3,
      items: [
        { title: 'Planéité', text: 'Carte des écarts de niveau d\'une dalle ou d\'une toiture, pour préparer une installation ou un nivellement.', image: 'analyse-planeite-dalle-carte-couleur' },
        { title: 'Verticalité', text: 'Écarts d\'aplomb des murs, des colonnes et des façades sur toute leur hauteur.' },
        { title: 'Déformations structurelles', text: 'Flèches, affaissements et déformations d\'éléments structuraux, mesurés sur le nuage de points.' },
        { title: 'Façades détaillées', text: 'Relevé complet des façades, y compris les ornements, pour l\'expertise et la restauration.', image: 'theatre-st-james-facade-nuage-points' },
        { title: 'Conservation du patrimoine', text: 'Documentation précise des bâtiments patrimoniaux avant toute intervention.', image: 'numerisation-3d-eglise-nef-nuage-points' },
        { title: 'Superficies BOMA', text: 'Calcul des superficies locatives selon les normes BOMA : voir notre service de mesurage BOMA.' },
      ],
    },
    deliverables: {
      title: 'Ce que contient une analyse',
      intro: 'Des résultats visuels, chiffrés et vérifiables, accompagnés des données sources.',
      items: [
        { title: "Cartes d'écarts en couleur", formats: ['PDF'], text: 'Planéité ou verticalité représentées par un dégradé de couleurs, avec l\'échelle des écarts.' },
        { title: 'Profils et coupes', formats: ['PDF', 'DWG'], text: 'Profils de dalle, coupes de murs ou de façades aux endroits critiques.' },
        { title: "Nuage de points pour intégration", formats: ['E57'], text: 'Le nuage de points en couleur, prêt à intégrer dans le logiciel de votre équipe (par exemple SDS2 pour la charpente d\'acier).' },
      ],
      visuals: [
        { image: 'analyse-planeite-profil', caption: "Profil de planéité d'une dalle, tiré du nuage de points." },
        { image: 'theatre-st-james-elevation-nuage-points', caption: 'Élévation orthographique d\'une façade tirée du nuage de points (Théâtre St-James).' },
      ],
    },
    process: {
      title: "Six étapes, de l'objectif à des résultats validés",
      steps: [
        { title: "Objectifs d'analyse", text: 'Nous définissons avec vous les éléments à analyser, les tolérances visées et le format des résultats.' },
        { title: 'Capture des conditions', text: "Le bâtiment ou la zone est numérisé au scanner laser, avec la densité nécessaire à l'analyse." },
        { title: 'Données propres et structurées', text: 'Les scans sont assemblés, nettoyés et organisés par élément.' },
        { title: "Modèles pour l'analyse", text: 'Des surfaces et des références sont établies pour mesurer les écarts.' },
        { title: 'Analyse technique', text: 'Dimensions, alignements, écarts et dégagements sont calculés et vérifiés.' },
        { title: 'Résultats validés et accompagnement', text: 'Les résultats sont livrés et expliqués ; notre équipe reste disponible pour la suite du projet.' },
      ],
    },
    cases: { title: "Projets d'analyse réalisés", ids: ['steel', 'st-denis', 'cdf'] },
    testimonial: 'wragg',
    faq: {
      title: "Questions fréquentes sur l'analyse du bâtiment",
      items: [
        { q: 'Quels types d\'analyses réalisez-vous ?', a: 'Planéité des dalles et des toitures, verticalité des murs et des colonnes, déformations structurelles, relevés détaillés de façades et documentation patrimoniale. Le mesurage des superficies BOMA fait l\'objet d\'un service distinct.' },
        { q: 'Quelle est la précision des analyses ?', a: 'Nous utilisons des scanners LiDAR de précision millimétrique. Bien que la précision millimétrique absolue ne puisse être garantie, nos analyses offrent de façon constante un très haut niveau de précision.' },
        { q: 'Comment se déroule le relevé ?', a: 'Nous planifions la numérisation selon les éléments à analyser, nous relevons le site au scanner laser, puis nous traitons les données au bureau avant de produire les résultats.' },
        { q: 'Que nous apportent ces analyses ?', a: "Une vision chiffrée de l'état réel du bâtiment pour planifier une installation, un ajout de structure ou une rénovation, réduire les interférences sur le chantier et mieux coordonner les intervenants." },
        { q: 'Pour quels secteurs faites-vous des analyses ?', a: 'La construction, l\'ingénierie, l\'architecture, l\'immobilier et l\'industrie.' },
      ],
    },
    related: ['scanning', 'boma', 'progress'],
    reading: read('fr', ['processus', 'preparation']),
    cta: { title: "Planifions l'analyse de votre bâtiment", text: 'Indiquez-nous les éléments à contrôler (dalles, murs, structure, façades) et vos tolérances. Nous vous préparons une soumission.' },
  },
  en: {
    seo: {
      title: 'Building Analysis: Flatness & Deformation | pointSpace',
      description: 'Geometric checks from point clouds: floor flatness analysis, plumbness of walls and columns, structural deformation and façade surveys.',
    },
    serviceType: 'Building analysis',
    hero: {
      eyebrow: 'Service · Analysis',
      h1: 'Building Analysis: Flatness, Plumbness and Deformation',
      lead: 'Objective measurements of the condition of your slabs, walls, structure and façades.',
      image: 'analyse-planeite-dalle-carte-couleur', position: '50% 50%',
    },
    intro: {
      h2: 'Measure existing conditions before you intervene',
      lead: '<strong>Building analysis</strong> uses the point cloud from a 3D laser survey for precise geometric checks: <strong>floor flatness</strong>, <strong>plumbness</strong> of walls and columns, <strong>structural deformation</strong>, façade condition and heritage conservation.',
      body: [
        'Deviations are calculated on millions of points rather than a few spot measurements. Results come as colour maps, profiles and sections that engineers, contractors and managers can read easily and bring into their own software.',
      ],
      glance: [
        { k: 'Best for', v: 'Steel additions, equipment installation, renovation, building assessments' },
        { k: 'Analyses', v: 'Flatness, plumbness, deformation, façades, heritage' },
        { k: 'Deliverables', v: 'Deviation maps, profiles, sections, E57 point cloud' },
      ],
    },
    features: {
      eyebrow: 'Types of analysis',
      title: 'Six checks from one survey',
      cols: 3,
      items: [
        { title: 'Flatness', text: 'Level deviation map of a slab or roof, to prepare an installation or levelling work.', image: 'analyse-planeite-dalle-carte-couleur' },
        { title: 'Plumbness', text: 'Out-of-plumb deviations of walls, columns and façades over their full height.' },
        { title: 'Structural deformation', text: 'Deflection, sagging and deformation of structural elements, measured on the point cloud.' },
        { title: 'Detailed façades', text: 'Complete façade surveys, including ornament, for assessment and restoration.', image: 'theatre-st-james-facade-nuage-points' },
        { title: 'Heritage conservation', text: 'Accurate documentation of heritage buildings before any intervention.', image: 'numerisation-3d-eglise-nef-nuage-points' },
        { title: 'BOMA areas', text: 'Rentable area calculations following BOMA standards: see our BOMA measurement service.' },
      ],
    },
    deliverables: {
      title: 'What an analysis includes',
      intro: 'Visual, quantified and verifiable results, delivered with the source data.',
      items: [
        { title: 'Colour deviation maps', formats: ['PDF'], text: 'Flatness or plumbness shown as a colour gradient, with the deviation scale.' },
        { title: 'Profiles and sections', formats: ['PDF', 'DWG'], text: 'Slab profiles and sections of walls or façades at critical locations.' },
        { title: 'Point cloud for integration', formats: ['E57'], text: 'The colour point cloud, ready to bring into your team’s software (for example SDS2 for steel detailing).' },
      ],
      visuals: [
        { image: 'analyse-planeite-profil', caption: 'Slab flatness profile from the point cloud.' },
        { image: 'theatre-st-james-elevation-nuage-points', caption: 'Orthographic façade elevation from the point cloud (St-James Theatre).' },
      ],
    },
    process: {
      title: 'Six steps from objective to validated results',
      steps: [
        { title: 'Analysis objectives', text: 'We define the elements to analyse, the target tolerances and the output format with you.' },
        { title: 'Capture of conditions', text: 'The building or area is laser scanned at the density the analysis requires.' },
        { title: 'Clean, structured data', text: 'Scans are registered, cleaned and organised by element.' },
        { title: 'Models built for analysis', text: 'Surfaces and references are set up to measure deviations.' },
        { title: 'Technical analysis', text: 'Dimensions, alignments, deviations and clearances are calculated and checked.' },
        { title: 'Validated results and support', text: 'Results are delivered and explained; our team stays available for the rest of the project.' },
      ],
    },
    cases: { title: 'Analysis projects delivered', ids: ['steel', 'st-denis', 'cdf'] },
    testimonial: 'wragg',
    faq: {
      title: 'Building analysis FAQ',
      items: [
        { q: 'Which analyses do you perform?', a: 'Slab and roof flatness, plumbness of walls and columns, structural deformation, detailed façade surveys and heritage documentation. BOMA area measurement is a separate service.' },
        { q: 'How accurate are the analyses?', a: 'We use millimetre-level LiDAR scanners. While absolute millimetric precision cannot be guaranteed, our analyses consistently deliver a very high level of accuracy.' },
        { q: 'How does the survey work?', a: 'We plan the scan around the elements to analyse, survey the site with a laser scanner, then process the data in the office before producing the results.' },
        { q: 'What do these analyses give us?', a: 'A quantified view of the building’s real condition to plan an installation, a structural addition or a renovation, reduce on-site interference and coordinate trades better.' },
        { q: 'Which industries do you work with?', a: 'Construction, engineering, architecture, real estate and industry.' },
      ],
    },
    related: ['scanning', 'boma', 'progress'],
    reading: read('en', ['processus', 'preparation']),
    cta: { title: 'Let’s plan your building analysis', text: 'Tell us which elements to check (slabs, walls, structure, façades) and your tolerances. We will prepare a quote.' },
  },
};
