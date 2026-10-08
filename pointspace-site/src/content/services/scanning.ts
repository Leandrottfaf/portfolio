import type { Bilingual, ServiceContent } from '../types';
import { read } from '../../data/blog';

export const scanning: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: 'Numérisation 3D de bâtiments – relevé laser LiDAR | pointSpace',
      description: "Relevé laser 3D de l'existant pour bâtiments et usines : nuages de points E57 ou RCP/RCS, prêts pour vos plans tels que construits et modèles BIM.",
    },
    serviceType: 'Numérisation 3D de bâtiments (relevé laser LiDAR)',
    hero: {
      eyebrow: 'Service · Capture',
      h1: 'Numérisation LiDAR 3D : relevé laser de vos bâtiments',
      lead: "La numérisation 3D de vos bâtiments et installations : l'état réel des lieux, mesuré au scanner laser et livré en nuage de points.",
      image: 'scanner-leica-rtc360-toit-industriel', position: '65% 50%',
      chips: ['E57', 'RCP/RCS', 'DWG', 'RVT'],
    },
    intro: {
      h2: "Un relevé de l'existant complet, en une seule visite",
      lead: "La <strong>numérisation 3D de bâtiments</strong> mesure l'état existant avec un scanner laser LiDAR : des millions de points forment un <strong>nuage de points</strong> fidèle aux murs, à la structure, aux façades, aux systèmes mécaniques et aux entreplafonds. Ce <strong>relevé laser 3D</strong> devient la référence commune pour vos plans tels que construits, vos modèles BIM et vos analyses.",
      body: [
        "Grâce à la technologie LiDAR, nous réalisons des relevés rapides et précis. Nos scanners Leica RTC360 et BLK360 offrent une précision millimétrique ; le BLK360, plus compact, se glisse dans les espaces restreints comme les entreplafonds. La capture se fait sur site, puis notre équipe assemble et traite les données au bureau.",
        "Vous pouvez recevoir le nuage de points seul, ou le faire transformer en plans CAO, en modèle Revit, en superficies BOMA ou en analyse de planéité : un seul relevé de l'existant sert à tous vos livrables.",
      ],
      glance: [
        { k: 'Équipement', v: 'Scanners laser Leica RTC360 et BLK360' },
        { k: 'Livrable principal', v: 'Nuage de points assemblé et nettoyé (E57, RCP/RCS)' },
        { k: 'Pour', v: 'Bâtiments, façades, usines, salles mécaniques, entreplafonds, toitures' },
        { k: 'Territoire', v: 'Québec et Ontario' },
      ],
    },
    features: {
      eyebrow: 'Ce que nous numérisons',
      title: "Des façades aux entreplafonds",
      intro: "Le même relevé laser 3D s'adapte aux bâtiments, aux usines et aux structures industrielles.",
      items: [
        { title: 'Bâtiments et étages complets', text: "Locaux, corridors et espaces communs, étage par étage, pour documenter l'état existant.", image: 'gare-windsor-nuage-points-vue-dessus' },
        { title: 'Façades', text: 'Façades détaillées, y compris les éléments architecturaux patrimoniaux.', image: 'theatre-st-james-facade-nuage-points' },
        { title: 'Entreplafonds', text: "Conduits, câbles et charpente cachés au-dessus des plafonds, mesurés sans démontage.", image: 'entreplafond-nuage-points' },
        { title: 'Salles mécaniques', text: 'Tuyauterie, équipements et dégagements des salles mécaniques.', image: 'nuage-points-salle-mecanique-haute-densite' },
        { title: 'Usines', text: "Planchers de production, machines et mezzanines, pour l'aménagement d'usine.", image: 'vac-aero-nuage-points-usine' },
        { title: 'Structures industrielles', text: 'Relevés de géométrie complexe, comme la coque d’un navire à quai.', image: 'hapag-lloyd-nuage-points-coque' },
      ],
    },
    deliverables: {
      title: 'Livrables et formats de fichiers',
      intro: 'Le nuage de points est un livrable à part entière. Il peut aussi alimenter tous nos autres services.',
      items: [
        { title: 'Nuage de points assemblé', formats: ['E57', 'RCP/RCS'], text: "Tous les scans alignés en un nuage de points unique, nettoyé et vérifié, prêt à ouvrir dans vos logiciels." },
        { title: "Coupes et vues de l'état existant", text: "Coupes, élévations et vues extraites du nuage pour valider des dimensions critiques avant la conception." },
        { title: 'Plans et modèles', formats: ['DWG', 'RVT', 'IFC'], text: 'Au besoin, le même relevé est converti en plans tels que construits (Scan-to-CAD) ou en modèle BIM (Scan-to-BIM).' },
        { title: 'Photos 360° et visite virtuelle', text: 'En option, une visite virtuelle Matterport pour consulter le site à distance.' },
      ],
      visuals: [
        { image: 'gare-windsor-nuage-points-exterieur', caption: 'Nuage de points couleur de la Gare Windsor, à Montréal.' },
        { image: 'gare-windsor-coupe-nuage-points', caption: "Coupe horizontale d'un étage, point de départ des plans d'étage." },
      ],
    },
    process: {
      title: 'De la planification au nuage de points livré',
      steps: [
        { title: 'Consultation et planification', text: 'Nous définissons avec vous la zone à relever, la précision requise et les livrables, puis nous planifions les positions du scanner et les cibles.' },
        { title: 'Préparation minutieuse du site', text: "Éclairage, accès, sécurité et obstacles sont vérifiés ; l'équipement est calibré et les points de contrôle sont mis en place au besoin." },
        { title: 'Numérisation de haute précision', text: "Le relevé laser couvre chaque zone avec assez de chevauchement ; un premier assemblage sur tablette permet de valider la couverture sur place." },
        { title: 'Traitement des données', text: "Les scans sont assemblés (registration), nettoyés et vérifiés par rapport aux points de contrôle." },
        { title: 'Livrables détaillés', text: 'Nuage de points, coupes, plans ou modèles, dans les formats de votre équipe.' },
        { title: 'Contrôle qualité et accompagnement', text: 'Chaque livrable est vérifié avant la livraison, et notre équipe reste disponible pour vos questions.' },
      ],
    },
    cases: { title: 'Projets de numérisation réalisés', ids: ['reitmans', 'st-denis', 'nelmar'] },
    testimonial: 'carosielliLong',
    faq: {
      title: 'Questions fréquentes sur la numérisation 3D',
      items: [
        { q: "Qu'est-ce que la numérisation 3D d'un bâtiment ?", a: "C'est la capture de la géométrie réelle d'un bâtiment ou d'une installation à l'aide d'un scanner laser. Le résultat est un nuage de points : des millions de mesures qui reproduisent fidèlement les lieux. Ce nuage sert ensuite à produire des plans tels que construits, des modèles BIM, des jumeaux numériques ou des analyses." },
        { q: 'Quels sont les avantages par rapport à un relevé manuel ?', a: "La précision millimétrique des scanners et la rapidité : un relevé complet s'obtient en quelques heures ou quelques jours, alors que les méthodes classiques demandent souvent plusieurs jours, voire des semaines. Rien n'est oublié, puisque tout ce qui est visible est capturé." },
        { q: 'Combien de temps dure un relevé ?', a: "Cela dépend de la taille et de la complexité des lieux : de quelques minutes à quelques heures pour une pièce, de quelques heures à plusieurs jours pour un grand bâtiment, auxquels s'ajoute le traitement des données au bureau." },
        { q: 'Comment se déroule la numérisation sur site ?', a: "Nous choisissons l'outil adapté, nous capturons les lieux sous plusieurs angles, puis les scans sont alignés, nettoyés et fusionnés. Un premier assemblage sur tablette nous donne un retour visuel en temps réel pendant la visite." },
        { q: 'Dans quels formats livrez-vous le nuage de points ?', a: "Le nuage de points est livré en E57 ou en RCP/RCS. Les plans et modèles produits à partir du relevé sont livrés en DWG, Revit, CAO, STEP, SAT et autres formats selon vos besoins. Nous offrons aussi des formations personnalisées pour exploiter les données." },
        { q: 'Peut-on obtenir seulement le nuage de points ?', a: "Oui. Le nuage de points brut, assemblé et nettoyé, peut être livré seul, par exemple si votre équipe fait elle-même la mise en plan ou la modélisation." },
        { q: 'Pour quels secteurs faites-vous des relevés ?', a: "Principalement le bâtiment et le manufacturier : architecture, ingénierie, construction, immobilier et industrie." },
      ],
    },
    related: ['asBuilt', 'scanToBim', 'analysis'],
    reading: read('fr', ['preparation', 'processus', 'entreplafonds']),
    cta: { title: 'Planifions votre relevé laser 3D', text: 'Indiquez-nous le bâtiment ou l’installation, la superficie approximative et les livrables attendus. Nous vous préparons une soumission.' },
  },
  en: {
    seo: {
      title: 'Building 3D Laser Scanning & LiDAR Surveys | pointSpace',
      description: '3D laser scanning of existing buildings and plants: registered point clouds in E57 or RCP/RCS, ready for as-built drawings and BIM models.',
    },
    serviceType: 'Building 3D laser scanning (LiDAR survey)',
    hero: {
      eyebrow: 'Service · Capture',
      h1: 'LiDAR 3D Scanning: Laser Surveys of Your Buildings',
      lead: '3D laser scanning of your buildings and facilities: their real condition, measured with a laser scanner and delivered as a point cloud.',
      image: 'scanner-leica-rtc360-toit-industriel', position: '65% 50%',
      chips: ['E57', 'RCP/RCS', 'DWG', 'RVT'],
    },
    intro: {
      h2: 'A complete existing conditions survey in a single visit',
      lead: '<strong>3D laser scanning</strong> measures existing conditions with a LiDAR scanner: millions of points form a <strong>point cloud</strong> that accurately records walls, structure, façades, mechanical systems and ceiling spaces. This <strong>3D laser survey</strong> becomes the shared reference for your as-built drawings, BIM models and analyses.',
      body: [
        'With LiDAR technology we carry out fast, accurate surveys. Our Leica RTC360 and BLK360 scanners deliver millimetric accuracy; the compact BLK360 reaches into tight spaces such as ceilings. Capture happens on site, then our team registers and processes the data in the office.',
        'You can receive the point cloud on its own, or have it turned into CAD drawings, a Revit model, BOMA areas or a flatness analysis: one existing conditions survey feeds every deliverable.',
      ],
      glance: [
        { k: 'Equipment', v: 'Leica RTC360 and BLK360 laser scanners' },
        { k: 'Main deliverable', v: 'Registered, cleaned point cloud (E57, RCP/RCS)' },
        { k: 'For', v: 'Buildings, façades, plants, mechanical rooms, ceiling spaces, roofs' },
        { k: 'Area served', v: 'Québec and Ontario' },
      ],
    },
    features: {
      eyebrow: 'What we scan',
      title: 'From façades to ceiling spaces',
      intro: 'The same 3D laser survey adapts to buildings, plants and industrial structures.',
      items: [
        { title: 'Buildings and full floors', text: 'Units, corridors and common areas, floor by floor, to document existing conditions.', image: 'gare-windsor-nuage-points-vue-dessus' },
        { title: 'Façades', text: 'Detailed façades, including heritage architectural features.', image: 'theatre-st-james-facade-nuage-points' },
        { title: 'Ceiling spaces', text: 'Ducts, cables and structure hidden above ceilings, measured without dismantling.', image: 'entreplafond-nuage-points' },
        { title: 'Mechanical rooms', text: 'Piping, equipment and clearances in mechanical rooms.', image: 'nuage-points-salle-mecanique-haute-densite' },
        { title: 'Plants', text: 'Production floors, machines and mezzanines, for plant layout work.', image: 'vac-aero-nuage-points-usine' },
        { title: 'Industrial structures', text: 'Complex geometry surveys, such as the hull of a docked vessel.', image: 'hapag-lloyd-nuage-points-coque' },
      ],
    },
    deliverables: {
      title: 'Deliverables and file formats',
      intro: 'The point cloud is a deliverable in its own right. It can also feed every other service we offer.',
      items: [
        { title: 'Registered point cloud', formats: ['E57', 'RCP/RCS'], text: 'All scans aligned into a single cleaned, verified point cloud, ready to open in your software.' },
        { title: 'Existing conditions sections and views', text: 'Sections, elevations and views extracted from the point cloud to validate critical dimensions before design.' },
        { title: 'Drawings and models', formats: ['DWG', 'RVT', 'IFC'], text: 'When needed, the same survey is converted into as-built drawings (Scan-to-CAD) or a BIM model (Scan-to-BIM).' },
        { title: '360° photos and virtual tour', text: 'Optionally, a Matterport virtual tour to review the site remotely.' },
      ],
      visuals: [
        { image: 'gare-windsor-nuage-points-exterieur', caption: 'Colour point cloud of Windsor Station, Montréal.' },
        { image: 'gare-windsor-coupe-nuage-points', caption: 'Horizontal slice of a floor, the starting point for floor plans.' },
      ],
    },
    process: {
      title: 'From planning to a delivered point cloud',
      steps: [
        { title: 'Consultation and planning', text: 'We define the survey area, required accuracy and deliverables with you, then plan scanner positions and targets.' },
        { title: 'Thorough site preparation', text: 'Lighting, access, safety and obstructions are checked; equipment is calibrated and control points are set up when needed.' },
        { title: 'High-precision scanning', text: 'The laser survey covers every area with enough overlap; a first registration on the tablet confirms coverage on site.' },
        { title: 'Data processing', text: 'Scans are registered, cleaned and checked against survey control points.' },
        { title: 'Detailed deliverables', text: 'Point cloud, sections, drawings or models, in your team’s formats.' },
        { title: 'Quality control and support', text: 'Every deliverable is checked before delivery, and our team stays available for your questions.' },
      ],
    },
    cases: { title: 'Scanning projects delivered', ids: ['reitmans', 'st-denis', 'nelmar'] },
    testimonial: 'carosielliLong',
    faq: {
      title: '3D laser scanning FAQ',
      items: [
        { q: 'What is 3D scanning of a building?', a: 'It captures the real geometry of a building or facility with a laser scanner. The result is a point cloud: millions of measurements that accurately reproduce the space. The point cloud is then used to produce as-built drawings, BIM models, digital twins or analyses.' },
        { q: 'What are the benefits over a manual survey?', a: 'Millimetre-level accuracy and speed: a complete survey takes a few hours or days, while traditional methods often take several days or even weeks. Nothing is missed, since everything visible is captured.' },
        { q: 'How long does a survey take?', a: 'It depends on the size and complexity of the site: from minutes to a few hours for a room, from a few hours to several days for a large building, plus data processing in the office.' },
        { q: 'How does on-site scanning work?', a: 'We choose the right tool, capture the space from multiple angles, then align, clean and merge the scans. A first registration on the tablet gives us real-time visual feedback during the visit.' },
        { q: 'In which formats do you deliver the point cloud?', a: 'The point cloud is delivered in E57 or RCP/RCS. Drawings and models produced from the survey are delivered in DWG, Revit, CAD, STEP, SAT and other formats as needed. We also offer tailored training to help you use the data.' },
        { q: 'Can we get the point cloud only?', a: 'Yes. The raw point cloud, registered and cleaned, can be delivered on its own, for example if your team does its own drafting or modelling.' },
        { q: 'Which industries do you survey for?', a: 'Mainly buildings and manufacturing: architecture, engineering, construction, real estate and industry.' },
      ],
    },
    related: ['asBuilt', 'scanToBim', 'analysis'],
    reading: read('en', ['preparation', 'processus', 'entreplafonds']),
    cta: { title: 'Let’s plan your 3D laser survey', text: 'Tell us about the building or facility, its approximate size and the deliverables you need. We will prepare a quote.' },
  },
};
