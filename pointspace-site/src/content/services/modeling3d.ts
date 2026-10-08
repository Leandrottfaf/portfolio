import type { Bilingual, ServiceContent } from '../types';
import { read } from '../../data/blog';

export const modeling3d: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: "Modélisation 3D d'installations et d'équipements | pointSpace",
      description: 'Modèles 3D précis de vos installations, équipements et bâtiments à partir de scans : formats Revit, Inventor, CAO, STEP et SAT, du modèle de base au modèle détaillé.',
    },
    serviceType: 'Modélisation 3D',
    hero: {
      eyebrow: 'Service · Modèles 3D',
      h1: "Modélisation 3D d'installations et d'équipements",
      lead: 'La modélisation 3D fidèle de vos machines, de votre usine ou de votre bâtiment, prête pour vos logiciels.',
      image: 'modele-bim-salle-mecanique-vue-ensemble', position: '50% 50%',
      chips: ['STEP', 'SAT', 'RVT', 'DWG', 'STL'],
    },
    intro: {
      h2: 'La géométrie réelle, dans le format de votre équipe',
      lead: "La <strong>modélisation 3D</strong> transforme un relevé laser en modèles précis de vos équipements, de vos installations industrielles et de vos bâtiments. Nous produisons des modèles compatibles avec <strong>Revit, Inventor, CAO, STEP, SAT</strong> et plus encore, du modèle de base au modèle très détaillé.",
      body: [
        "Là où le Scan-to-BIM vise la coordination d'un bâtiment, la modélisation 3D sert souvent l'ingénierie et l'exploitation : vérifier qu'un nouvel équipement entre dans l'espace disponible, simuler un réaménagement d'usine, échanger des modèles de machines avec des logiciels de conception mécanique comme SolidWorks, ou présenter un projet.",
        "Chaque modèle est construit sur un nuage de points unifié et nettoyé, avec des calques et des éléments nommés de façon cohérente.",
      ],
      glance: [
        { k: 'Idéal pour', v: "Aménagement d'usine, intégration d'équipements, conception, gestion d'actifs" },
        { k: 'Formats', v: 'Revit, Inventor, DWG, IFC, STEP, SAT, STL' },
        { k: 'Source', v: 'Relevé laser 3D (nuage de points)' },
        { k: 'Secteurs', v: 'Industriel, manufacturier, construction, architecture' },
      ],
    },
    features: {
      eyebrow: 'Ce que nous modélisons',
      title: "De la machine à l'usine complète",
      cols: 4,
      items: [
        { title: 'Machines et équipements', text: 'Modèles de machines industrielles livrés en STEP et SAT, compatibles avec SolidWorks.', image: 'equipement-modele-3d-renfort' },
        { title: 'Usines et installations', text: "Architecture, structure et machinerie au sol d'une usine, pour planifier les aménagements.", image: 'vac-aero-modele-3d-usine' },
        { title: 'Salles mécaniques', text: 'Tuyauterie, pompes et vannes modélisées pour les travaux de mécanique.', image: 'modele-3d-tuyauterie-salle-mecanique' },
        { title: 'Bâtiments', text: 'Enveloppes et volumes de bâtiments pour la conception et la présentation.', image: 'modele-3d-tours-residentielles' },
      ],
    },
    deliverables: {
      title: 'Livrables et formats de fichiers',
      intro: 'Nous livrons dans les formats de vos logiciels, avec des modèles modifiables.',
      items: [
        { title: "Modèles d'équipements", formats: ['STEP', 'SAT', 'STL'], text: 'Géométrie des machines et équipements pour la conception mécanique et les vérifications de dégagement.' },
        { title: 'Modèles d\'installations', formats: ['RVT', 'IFC'], text: "Modèles Revit ou Inventor de l'usine : architecture, structure et machinerie au sol." },
        { title: 'Plans 2D', formats: ['DWG', 'PDF'], text: "Plans d'étage et plans d'aménagement d'usine tirés du modèle, en format AutoCAD." },
        { title: 'Maillage texturé et rendus', text: 'Maillage polygonal texturé et rendus architecturaux pour la visualisation et la présentation.' },
      ],
      visuals: [
        { image: 'scierie-modele-3d-groupe-cdf', caption: "Modèle 3D de l'intérieur d'une scierie (Groupe CDF)." },
        { image: 'rendu-architectural-batiment-brique', caption: "Rendu architectural photoréaliste produit à partir d'un modèle 3D." },
      ],
    },
    process: {
      title: 'Six étapes vers un modèle utilisable',
      steps: [
        { title: 'Objectifs de modélisation', text: "Niveau de détail, étendue, tolérances et formats de sortie sont définis avec vous avant la numérisation." },
        { title: 'Données sources précises', text: "Le site est numérisé au scanner laser pour obtenir des mesures fiables de l'existant." },
        { title: 'Nuage de points unifié', text: 'Les scans sont assemblés et nettoyés en un nuage de points unique.' },
        { title: 'Modélisation cohérente', text: 'Les modèles sont construits sur le nuage, avec des calques et des éléments nommés de façon cohérente.' },
        { title: 'Validation de la qualité', text: 'Le modèle est vérifié contre le nuage de points avant la livraison.' },
        { title: 'Livrables et accompagnement', text: 'Modèles et plans livrés dans vos formats ; notre équipe reste disponible après la livraison.' },
      ],
    },
    cases: { title: 'Projets de modélisation 3D', ids: ['vac-aero', 'cdf', 'renfort'] },
    testimonial: 'marquis',
    faq: {
      title: 'Questions fréquentes sur la modélisation 3D',
      items: [
        { q: 'À quoi sert un modèle 3D de mon installation ?', a: "À concevoir et rénover, coordonner un chantier, gérer vos actifs, planifier un aménagement industriel ou présenter un projet. Le modèle reproduit la géométrie réelle de vos lieux et de vos équipements." },
        { q: 'Quels formats livrez-vous ?', a: 'Revit, Inventor, DWG, IFC, STEP, SAT, STL et autres selon vos besoins. Nous offrons aussi des formations personnalisées.' },
        { q: 'Vos modèles sont-ils compatibles avec tous les logiciels ?', a: "Les modèles 3D ne sont pas automatiquement compatibles avec toutes les plateformes : nous les créons directement dans les formats dont vous avez besoin." },
        { q: 'Quelle est la précision des modèles ?', a: "Nous utilisons des scanners LiDAR de précision millimétrique. Bien que la précision millimétrique absolue ne puisse être garantie, nos modèles offrent de façon constante un très haut niveau de précision." },
        { q: 'Quelle différence avec le Scan-to-BIM ?', a: "Le Scan-to-BIM produit un modèle BIM de bâtiment, riche en informations, pour la coordination et la gestion. La modélisation 3D couvre aussi les équipements, les machines et les usines, dans des formats d'ingénierie comme STEP et SAT." },
        { q: 'Pour quels secteurs modélisez-vous ?', a: 'La construction, l\'architecture, l\'industrie et le manufacturier.' },
      ],
    },
    related: ['scanToBim', 'scanning', 'digitalTwins'],
    reading: read('fr', ['modelisation', 'glossaire']),
    cta: { title: 'Parlez-nous de votre projet de modélisation', text: 'Décrivez les équipements ou les espaces à modéliser, le niveau de détail et le format attendu. Nous vous préparons une soumission.' },
  },
  en: {
    seo: {
      title: '3D Modeling of Facilities and Equipment | pointSpace',
      description: 'Accurate 3D models of your facilities, equipment and buildings from scans: Revit, Inventor, CAD, STEP and SAT formats, from basic to highly detailed.',
    },
    serviceType: '3D modeling',
    hero: {
      eyebrow: 'Service · 3D models',
      h1: '3D Modeling of Facilities and Equipment',
      lead: 'Accurate 3D modeling of your machines, plant or building, ready for your software.',
      image: 'modele-bim-salle-mecanique-vue-ensemble', position: '50% 50%',
      chips: ['STEP', 'SAT', 'RVT', 'DWG', 'STL'],
    },
    intro: {
      h2: 'Real geometry, in your team’s format',
      lead: '<strong>3D modeling</strong> turns a laser survey into accurate models of your equipment, industrial facilities and buildings. We produce models compatible with <strong>Revit, Inventor, CAD, STEP, SAT</strong> and more, from basic to highly detailed.',
      body: [
        'Where Scan-to-BIM focuses on building coordination, 3D modeling often serves engineering and operations: checking that new equipment fits the available space, simulating a plant layout, exchanging machine models with mechanical design software such as SolidWorks, or presenting a project.',
        'Every model is built on a unified, cleaned point cloud, with consistently named layers and elements.',
      ],
      glance: [
        { k: 'Best for', v: 'Plant layouts, equipment integration, design, asset management' },
        { k: 'Formats', v: 'Revit, Inventor, DWG, IFC, STEP, SAT, STL' },
        { k: 'Source', v: '3D laser survey (point cloud)' },
        { k: 'Industries', v: 'Industrial, manufacturing, construction, architecture' },
      ],
    },
    features: {
      eyebrow: 'What we model',
      title: 'From a single machine to a full plant',
      cols: 4,
      items: [
        { title: 'Machines and equipment', text: 'Industrial machine models delivered in STEP and SAT, compatible with SolidWorks.', image: 'equipement-modele-3d-renfort' },
        { title: 'Plants and facilities', text: 'Architecture, structure and floor machinery of a plant, to plan layouts.', image: 'vac-aero-modele-3d-usine' },
        { title: 'Mechanical rooms', text: 'Piping, pumps and valves modelled for mechanical work.', image: 'modele-3d-tuyauterie-salle-mecanique' },
        { title: 'Buildings', text: 'Building envelopes and massing for design and presentation.', image: 'modele-3d-tours-residentielles' },
      ],
    },
    deliverables: {
      title: 'Deliverables and file formats',
      intro: 'We deliver in the formats your software uses, as editable models.',
      items: [
        { title: 'Equipment models', formats: ['STEP', 'SAT', 'STL'], text: 'Machine and equipment geometry for mechanical design and clearance checks.' },
        { title: 'Facility models', formats: ['RVT', 'IFC'], text: 'Revit or Inventor models of the plant: architecture, structure and floor machinery.' },
        { title: '2D drawings', formats: ['DWG', 'PDF'], text: 'Floor plans and plant layout drawings from the model, in AutoCAD format.' },
        { title: 'Textured mesh and renderings', text: 'Textured polygon mesh and architectural renderings for visualisation and presentation.' },
      ],
      visuals: [
        { image: 'scierie-modele-3d-groupe-cdf', caption: '3D model of a sawmill interior (CDF Group).' },
        { image: 'rendu-architectural-batiment-brique', caption: 'Photorealistic architectural rendering produced from a 3D model.' },
      ],
    },
    process: {
      title: 'Six steps to a usable model',
      steps: [
        { title: 'Modelling objectives', text: 'Level of detail, scope, tolerances and output formats are defined with you before scanning.' },
        { title: 'Accurate source data', text: 'The site is laser scanned to obtain reliable measurements of existing conditions.' },
        { title: 'Unified point cloud', text: 'Scans are registered and cleaned into a single point cloud.' },
        { title: 'Consistent modelling', text: 'Models are built on the point cloud with consistently named layers and elements.' },
        { title: 'Quality validation', text: 'The model is checked against the point cloud before delivery.' },
        { title: 'Deliverables and support', text: 'Models and drawings are delivered in your formats; our team stays available after delivery.' },
      ],
    },
    cases: { title: '3D modeling projects', ids: ['vac-aero', 'cdf', 'renfort'] },
    testimonial: 'marquis',
    faq: {
      title: '3D modeling FAQ',
      items: [
        { q: 'What is a 3D model of my facility used for?', a: 'Design and renovation, site coordination, asset management, industrial layout planning or project presentation. The model reproduces the real geometry of your spaces and equipment.' },
        { q: 'Which formats do you deliver?', a: 'Revit, Inventor, DWG, IFC, STEP, SAT, STL and others as needed. We also offer tailored training.' },
        { q: 'Are your models compatible with every software?', a: '3D models are not automatically compatible with every platform, so we create them directly in the file formats you need.' },
        { q: 'How accurate are the models?', a: 'We use millimetre-level LiDAR scanners. While absolute millimetric precision cannot be guaranteed, our models consistently deliver a very high level of accuracy.' },
        { q: 'How is this different from Scan-to-BIM?', a: 'Scan-to-BIM produces an information-rich building model for coordination and management. 3D modeling also covers equipment, machines and plants, in engineering formats such as STEP and SAT.' },
        { q: 'Which industries do you model for?', a: 'Construction, architecture, industry and manufacturing.' },
      ],
    },
    related: ['scanToBim', 'scanning', 'digitalTwins'],
    reading: read('en', ['modelisation', 'materiel']),
    cta: { title: 'Tell us about your modelling project', text: 'Describe the equipment or spaces to model, the level of detail and the format you need. We will prepare a quote.' },
  },
};
