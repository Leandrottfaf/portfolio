import type { Bilingual, ServiceContent } from '../types';
import { read } from '../../data/blog';

export const scanToBim: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: "Scan-to-BIM : modélisation BIM de l'existant | pointSpace",
      description: "Du nuage de points au modèle Revit : modélisation BIM de l'existant selon le LOD convenu, livrée en RVT et IFC pour vos projets de rénovation et de coordination.",
    },
    serviceType: 'Scan-to-BIM',
    hero: {
      eyebrow: 'Service · Livrables BIM',
      h1: "Scan-to-BIM : modélisation BIM de l'existant",
      lead: "La modélisation BIM de l'existant : un modèle Revit fidèle à votre bâtiment, construit à partir d'un relevé laser 3D.",
      image: 'modele-bim-mep-entrepot', position: '60% 50%',
      chips: ['RVT', 'IFC', 'DWG', 'E57', 'RCP/RCS'],
    },
    intro: {
      h2: "Le modèle BIM de votre bâtiment, tel qu'il existe aujourd'hui",
      lead: "Le <strong>Scan-to-BIM</strong> transforme la numérisation 3D de votre bâtiment en <strong>modèle BIM de l'existant</strong> (Building Information Modeling). Nous relevons l'état existant au scanner laser, puis nous modélisons l'architecture, la structure et les systèmes mécaniques dans <strong>Revit</strong>, selon le niveau de détail (LOD) convenu. Vous recevez un modèle Revit (RVT) et un export <strong>IFC</strong> prêts pour la conception, la rénovation, la coordination et la gestion des installations.",
      body: [
        "Pour les bâtiments anciens ou mal documentés, une maquette BIM construite à partir de nuages de points remplace de longues prises de mesures manuelles et les erreurs qui les accompagnent. Nous utilisons des outils de capture LiDAR offrant une précision millimétrique pour documenter chaque élément de votre bâtiment, et un service clé en main : de la capture des données au modèle livré dans vos formats.",
      ],
      glance: [
        { k: 'Idéal pour', v: 'Rénovation, modernisation, coordination des disciplines, gestion des installations' },
        { k: 'Disciplines', v: 'Architecture · Structure · MEP (mécanique, électricité, plomberie)' },
        { k: 'Niveau de détail', v: 'Du modèle de base au modèle très détaillé, défini avec vous (LOD)' },
        { k: 'Logiciels', v: 'Revit, AutoCAD, formats ouverts IFC et E57' },
      ],
    },
    deliverables: {
      title: 'Livrables et formats de fichiers',
      intro: "Chaque livrable découle du même relevé de l'existant : vos plans, votre modèle et votre nuage de points restent cohérents entre eux.",
      items: [
        { title: 'Modèle BIM Revit', formats: ['RVT'], text: 'Architecture, structure, façades, toiture et systèmes MEP (mécanique, électricité, plomberie) modélisés selon le niveau de détail convenu, du modèle de base au modèle très détaillé.' },
        { title: 'Export IFC', formats: ['IFC'], text: "Le même modèle en format ouvert, pour le partager avec les partenaires qui travaillent dans d'autres logiciels BIM." },
        { title: 'Plans 2D extraits du modèle', formats: ['DWG', 'PDF'], text: "Plans d'étage, élévations et coupes cohérents avec le modèle, en plans CAO prêts pour AutoCAD." },
        { title: 'Nuage de points source', formats: ['E57', 'RCP/RCS'], text: "Le nuage de points assemblé et nettoyé qui a servi à la modélisation : la référence de l'état existant, à conserver pour les phases suivantes." },
      ],
      visuals: [
        { image: 'scan-to-bim-revit-model-cutaway-light', caption: 'Modèle Revit en coupe : murs, conduits de ventilation et postes de travail.' },
        { image: 'modele-bim-tuyauterie-mecanique-vanne', caption: "Détail d'un modèle MEP : tuyauterie, pompes et vannes." },
      ],
    },
    compare: {
      eyebrow: 'Du nuage de points au modèle',
      title: 'Le même point de vue, avant et après la modélisation',
      intro: "Faites glisser le curseur pour comparer le nuage de points de l'usine de VAC AERO à Dorval et le modèle 3D produit à partir de ce relevé.",
      before: 'vac-aero-nuage-points-usine', after: 'vac-aero-modele-3d-usine',
      beforeLabel: 'Nuage de points', afterLabel: 'Modèle 3D',
      sliderLabel: 'Comparer le nuage de points et le modèle 3D',
      caption: "VAC AERO International, Dorval : numérisation 3D de l'usine, puis modélisation 3D de l'architecture, de la structure et des équipements au sol.",
    },
    process: {
      title: 'Six étapes, de la portée du projet au modèle livré',
      steps: [
        { title: 'Objectifs et niveau de détail', text: 'Nous définissons avec vous les objectifs du projet, la précision requise, le niveau de détail (LOD) et les livrables finaux, pour éviter les révisions inutiles plus tard.' },
        { title: 'Planification et numérisation', text: "Nous choisissons les positions du scanner, le chevauchement et la résolution selon les conditions du site, puis nous numérisons l'existant." },
        { title: 'Nuage de points unifié et nettoyé', text: 'Les scans sont assemblés et alignés en un nuage de points unique, débarrassé du bruit et des données inutiles.' },
        { title: 'Modélisation BIM', text: 'Le nuage validé est importé dans Revit. Les éléments architecturaux, structurels et mécaniques sont modélisés selon le LOD convenu.' },
        { title: 'Contrôle qualité et détection des conflits', text: 'Le modèle est comparé directement au nuage de points, puis une détection des conflits entre disciplines permet de régler les problèmes tôt.' },
        { title: 'Livraison et accompagnement', text: 'Vous recevez le modèle et les plans dans vos formats. Notre équipe reste disponible après la livraison.' },
      ],
    },
    cases: { title: 'Projets de modélisation réalisés', ids: ['vac-aero', 'cdf', 'broccolini'] },
    testimonial: 'carosielliLong',
    faq: {
      title: 'Questions fréquentes sur le Scan-to-BIM',
      items: [
        { q: "Qu'est-ce que le Scan-to-BIM ?", a: "Le Scan-to-BIM consiste à produire le modèle BIM (Building Information Modeling) d'un bâtiment existant à partir de sa numérisation 3D. Le relevé laser capture l'état existant sous forme de nuage de points ; ce nuage sert de référence pour modéliser dans Revit les éléments architecturaux, structurels et mécaniques. Le modèle réunit la géométrie et les informations techniques utiles à la conception, à la coordination et à la gestion du bâtiment." },
        { q: 'Quels formats de fichiers livrez-vous ?', a: 'Le modèle est livré en Revit (RVT) et peut être exporté en IFC. Selon vos besoins, nous fournissons aussi les plans 2D extraits du modèle en DWG et le nuage de points source en E57 ou RCP/RCS. Nous adaptons les livrables aux logiciels de votre équipe.' },
        { q: "Quelle est la précision d'un modèle Scan-to-BIM ?", a: 'La précision dépend de la méthode de numérisation, des conditions du site et du niveau de détail (LOD) requis, mais les modèles sont généralement précis à quelques millimètres près. Chaque modèle est vérifié en le comparant directement au nuage de points.' },
        { q: 'Quand faut-il prévoir un Scan-to-BIM dans un projet de rénovation ?', a: "Dès les premières étapes, lorsque vous avez besoin de données fiables sur les conditions existantes. C'est particulièrement utile pour les bâtiments anciens ou mal documentés, dont les plans sont désuets ou incomplets : un modèle BIM de l'existant réduit les risques de conception, limite les conflits et permet de décider avant le début des travaux." },
        { q: 'Quels éléments du bâtiment pouvez-vous modéliser ?', a: 'Du modèle de base au modèle très détaillé, selon le niveau de détail convenu : architecture, structure, façades, toiture et systèmes mécaniques, électriques et de plomberie (MEP).' },
        { q: 'Quels services BIM les architectes peuvent-ils nous confier ?', a: "Les relevés 3D, la modélisation BIM de l'existant, la production de plans, la génération de nuages de points et la mise à jour de modèles existants. Votre équipe gagne du temps et se concentre sur la conception." },
        { q: 'Nous avons déjà un nuage de points : pouvez-vous le modéliser ?', a: "Oui. Décrivez votre nuage de points (format, étendue du relevé) dans votre demande de soumission : nous vérifierons qu'il couvre la zone et la densité nécessaires au niveau de détail visé avant de lancer la modélisation." },
      ],
    },
    related: ['scanning', 'asBuilt', 'modeling3d'],
    reading: read('fr', ['bim', 'modelisation']),
    cta: { title: "Obtenez votre modèle BIM de l'existant", text: 'Indiquez-nous le bâtiment, les disciplines à modéliser et le niveau de détail visé. Nous vous préparons une soumission Scan-to-BIM.' },
  },
  en: {
    seo: {
      title: 'Scan-to-BIM Services: As-Built Revit Models | pointSpace',
      description: 'From point cloud to Revit: as-built BIM models of existing buildings at the agreed LOD, delivered in RVT and IFC for renovation and coordination.',
    },
    serviceType: 'Scan-to-BIM',
    hero: {
      eyebrow: 'Service · BIM deliverables',
      h1: 'Scan-to-BIM: As-Built BIM Models of Existing Buildings',
      lead: 'As-built BIM modelling: a Revit model that matches your building, built from a 3D laser survey.',
      image: 'modele-bim-mep-entrepot', position: '60% 50%',
      chips: ['RVT', 'IFC', 'DWG', 'E57', 'RCP/RCS'],
    },
    intro: {
      h2: 'A BIM model of your building as it stands today',
      lead: '<strong>Scan-to-BIM</strong> turns the 3D scan of your building into an <strong>as-built BIM model</strong> (Building Information Modeling). We survey existing conditions with a laser scanner, then model architecture, structure and mechanical systems in <strong>Revit</strong> at the agreed level of detail (LOD). You receive a Revit (RVT) model and an <strong>IFC</strong> export ready for design, renovation, coordination and facility management.',
      body: [
        'For older or poorly documented buildings, a BIM model built from point clouds replaces long manual measuring sessions and the errors that come with them. We use millimetre-accurate LiDAR capture tools to document every element of your building, with a turnkey service from data capture to a model delivered in your formats.',
      ],
      glance: [
        { k: 'Best for', v: 'Renovation, retrofits, discipline coordination, facility management' },
        { k: 'Disciplines', v: 'Architecture · Structure · MEP (mechanical, electrical, plumbing)' },
        { k: 'Level of detail', v: 'From basic to highly detailed models, agreed with you (LOD)' },
        { k: 'Software', v: 'Revit, AutoCAD, open IFC and E57 formats' },
      ],
    },
    deliverables: {
      title: 'Deliverables and file formats',
      intro: 'Every deliverable comes from the same existing-conditions survey, so your drawings, model and point cloud stay consistent.',
      items: [
        { title: 'Revit BIM model', formats: ['RVT'], text: 'Architecture, structure, façades, roof and MEP systems (mechanical, electrical, plumbing) modelled at the agreed level of detail, from basic to highly detailed.' },
        { title: 'IFC export', formats: ['IFC'], text: 'The same model in an open format, to share with partners who work in other BIM software.' },
        { title: '2D drawings from the model', formats: ['DWG', 'PDF'], text: 'Floor plans, elevations and sections consistent with the model, as CAD drawings ready for AutoCAD.' },
        { title: 'Source point cloud', formats: ['E57', 'RCP/RCS'], text: 'The registered, cleaned point cloud used for modelling: your record of existing conditions for later phases.' },
      ],
      visuals: [
        { image: 'scan-to-bim-revit-model-cutaway-light', caption: 'Cutaway Revit model: walls, ventilation ducts and workstations.' },
        { image: 'modele-bim-tuyauterie-mecanique-vanne', caption: 'MEP model detail: piping, pumps and valves.' },
      ],
    },
    compare: {
      eyebrow: 'From point cloud to model',
      title: 'The same viewpoint, before and after modelling',
      intro: 'Drag the slider to compare the point cloud of the VAC AERO plant in Dorval with the 3D model produced from that survey.',
      before: 'vac-aero-nuage-points-usine', after: 'vac-aero-modele-3d-usine',
      beforeLabel: 'Point cloud', afterLabel: '3D model',
      sliderLabel: 'Compare the point cloud and the 3D model',
      caption: 'VAC AERO International, Dorval: 3D scan of the plant, then 3D modelling of the architecture, structure and floor equipment.',
    },
    process: {
      title: 'Six steps from project scope to delivered model',
      steps: [
        { title: 'Objectives and level of detail', text: 'We define the project objectives, required accuracy, level of detail (LOD) and final deliverables with you, to avoid unnecessary revisions later.' },
        { title: 'Planning and capture', text: 'We plan scanner positions, overlap and resolution for the site conditions, then scan the existing conditions.' },
        { title: 'Unified, clean point cloud', text: 'Scans are registered and aligned into a single point cloud, cleaned of noise and unnecessary data.' },
        { title: 'BIM modelling', text: 'The validated point cloud is imported into Revit. Architectural, structural and mechanical elements are modelled at the agreed LOD.' },
        { title: 'Quality control and clash detection', text: 'The model is checked directly against the point cloud, then clash detection between disciplines resolves issues early.' },
        { title: 'Delivery and support', text: 'You receive the model and drawings in your formats. Our team stays available after delivery.' },
      ],
    },
    cases: { title: 'Modelling projects delivered', ids: ['vac-aero', 'cdf', 'broccolini'] },
    testimonial: 'carosielliLong',
    faq: {
      title: 'Scan-to-BIM FAQ',
      items: [
        { q: 'What is Scan-to-BIM?', a: 'Scan-to-BIM means producing a BIM (Building Information Modeling) model of an existing building from its 3D scan. The laser survey captures existing conditions as a point cloud, which is used as the reference to model architectural, structural and mechanical elements in Revit. The model combines geometry and the technical information needed for design, coordination and building management.' },
        { q: 'Which file formats do you deliver?', a: 'The model is delivered in Revit (RVT) and can be exported to IFC. Depending on your needs, we also provide 2D drawings from the model in DWG and the source point cloud in E57 or RCP/RCS. We adapt deliverables to your team’s software.' },
        { q: 'How accurate is a Scan-to-BIM model?', a: 'Accuracy depends on the scanning method, site conditions and the required level of detail (LOD), but models are typically accurate to within a few millimetres. Every model is checked directly against the point cloud.' },
        { q: 'When should Scan-to-BIM be used in a renovation project?', a: 'At the earliest stages, when you need reliable data on existing conditions. It is especially useful for older or undocumented buildings whose drawings are outdated or incomplete: an as-built BIM model reduces design risk, limits clashes and supports decisions before construction starts.' },
        { q: 'Which building elements can you model?', a: 'From basic to highly detailed models, depending on the agreed level of detail: architecture, structure, façades, roof and mechanical, electrical and plumbing (MEP) systems.' },
        { q: 'Which BIM services can architects outsource to you?', a: '3D surveys, as-built BIM modelling, drawing production, point cloud generation and updates to existing models. Your team saves time and focuses on design.' },
        { q: 'We already have a point cloud. Can you model it?', a: 'Yes. Describe your point cloud (format, survey extent) in your quote request and we will check that it covers the area and density needed for the level of detail before modelling starts.' },
      ],
    },
    related: ['scanning', 'asBuilt', 'modeling3d'],
    reading: read('en', ['bim', 'modelisation']),
    cta: { title: 'Get an as-built BIM model of your building', text: 'Tell us about the building, the disciplines to model and the level of detail you need. We will prepare a Scan-to-BIM quote.' },
  },
};
