import type { Bilingual, ServiceContent } from '../types';
import { read } from '../../data/blog';

export const asBuilt: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: 'Plans tels que construits (as-built) | pointSpace',
      description: "Plans tels que construits conformes à l'exécution, produits à partir d'un relevé laser 3D : plans d'étage, élévations et coupes, plafonds réfléchis en DWG.",
    },
    serviceType: 'Plans tels que construits',
    hero: {
      eyebrow: 'Service · Livrables CAO',
      h1: 'Plans tels que construits (as-built)',
      lead: "Des plans conformes à l'exécution, tirés d'un relevé laser 3D de l'existant.",
      image: 'gare-windsor-plan-tel-que-construit', fit: 'contain',
      chips: ['DWG', 'DXF', 'PDF'],
    },
    intro: {
      h2: "Des plans à jour, là où les plans d'origine ne suffisent plus",
      lead: "Nos <strong>plans tels que construits</strong> représentent votre bâtiment tel qu'il est réellement, pas tel qu'il a été dessiné. À partir d'un <strong>relevé de l'existant</strong> au scanner laser, nous produisons des plans 2D <strong>conformes à l'exécution</strong> : plans d'étage, élévations et coupes, plans de plafonds réfléchis, en fichiers CAO modifiables.",
      body: [
        "Quand les plans d'origine sont absents, désuets ou ne reflètent plus les nombreuses modifications d'un bâtiment, le relevé architectural numérique évite les imprévus en conception et en chantier. Du plan de base au plan très détaillé, nous documentons la structure, les façades, les systèmes mécaniques et les toitures selon vos besoins.",
        "Le procédé est souvent appelé Scan-to-CAD : le nuage de points sert de référence, et chaque ligne des plans CAO est tracée sur des mesures réelles.",
      ],
      glance: [
        { k: 'Idéal pour', v: 'Architectes, gestionnaires immobiliers, rénovation, aménagement locatif et d\'usine' },
        { k: 'Livrables', v: "Plans d'étage, élévations, coupes, plafonds réfléchis" },
        { k: 'Formats', v: 'DWG, DXF, PDF' },
        { k: 'Source', v: 'Relevé laser 3D (nuage de points)' },
      ],
    },
    features: {
      eyebrow: 'Du nuage de points au plan',
      title: 'Chaque ligne tracée sur une mesure réelle',
      cols: 3,
      items: [
        { title: 'Coupe du nuage de points', text: "Une tranche horizontale du nuage révèle les murs, les ouvertures et les colonnes de chaque étage.", image: 'gare-windsor-coupe-nuage-points' },
        { title: "Plan d'étage tel que construit", text: 'Les locaux, les cloisons et les éléments fixes sont dessinés et identifiés en CAO.', image: 'gare-windsor-plan-tel-que-construit' },
        { title: 'Élévations et coupes', text: 'Façades et coupes dessinées à partir du nuage, y compris les ornements patrimoniaux.', image: 'theatre-st-james-elevation-dessin' },
      ],
    },
    deliverables: {
      title: 'Livrables et formats de fichiers',
      intro: 'Des fichiers CAO modifiables, organisés pour être repris par votre équipe.',
      items: [
        { title: "Plans d'étage", formats: ['DWG', 'PDF'], text: "Plans d'étage cotés de chaque niveau : cloisons, portes, fenêtres, escaliers, colonnes et éléments fixes." },
        { title: 'Élévations et coupes', formats: ['DWG', 'PDF'], text: 'Élévations de façades et coupes du bâtiment, avec les hauteurs réelles relevées.' },
        { title: 'Plans de plafonds réfléchis', formats: ['DWG'], text: 'Plafonds, retombées et éléments suspendus, utiles pour les travaux de mécanique et d\'éclairage.' },
        { title: "Plans d'aménagement d'usine", formats: ['DWG', 'DXF'], text: "Empreinte des machines et des équipements au sol, avec blocs AutoCAD, pour tester de nouveaux aménagements." },
        { title: 'Nuage de points de référence', formats: ['E57', 'RCP/RCS'], text: "Le nuage de points source, pour vérifier une dimension ou compléter les plans plus tard." },
      ],
      visuals: [
        { image: 'plans-tels-que-construits-plan-etage-gare-windsor', caption: "Plan d'étage tel que construit d'un bâtiment en L.", fit: 'contain' },
        { image: 'nadco-plan-amenagement-cao', caption: "Plan d'aménagement CAO d'une usine avec l'empreinte des machines (Les Plastiques Nadco)." },
      ],
    },
    process: {
      title: 'Quatre étapes vers des plans fiables',
      steps: [
        { title: 'Portée et niveau de détail', text: 'Étages, disciplines et niveau de détail des plans sont définis avec vous, selon l\'usage prévu.' },
        { title: 'Relevé laser 3D', text: "Le bâtiment est numérisé ; les scans sont assemblés en un nuage de points de l'état existant." },
        { title: 'Mise en plan CAO', text: 'Nos dessinateurs tracent les plans directement sur le nuage de points, avec des calques nommés et structurés.' },
        { title: 'Contrôle et livraison', text: 'Les plans sont vérifiés contre le nuage de points, puis livrés dans vos formats. Les révisions sont possibles sur demande.' },
      ],
    },
    cases: { title: 'Projets de plans tels que construits', ids: ['st-james', 'le-foufou', 'westcliff'] },
    testimonial: 'marquis',
    faq: {
      title: 'Questions fréquentes sur les plans tels que construits',
      items: [
        { q: "Qu'est-ce qu'un plan tel que construit ?", a: "C'est un plan conforme à l'exécution : il représente le bâtiment dans son état réel, après les travaux et les modifications successives, plutôt que le projet tel qu'il avait été dessiné. Nos plans sont produits à partir d'un relevé laser 3D de l'existant." },
        { q: 'Quelle est la précision de vos plans ?', a: "Les données sont captées avec des scanners de précision millimétrique. Bien que nous ne puissions pas garantir un niveau de précision exact, nos méthodes, nos outils et nos contrôles de qualité nous permettent de produire des plans très précis et fiables." },
        { q: 'Dans quels formats livrez-vous les plans ?', a: 'En DWG, DXF et PDF. Le nuage de points source peut être fourni en E57 ou RCP/RCS, et nous offrons des formations personnalisées au besoin.' },
        { q: 'Pourrons-nous modifier les plans après la livraison ?', a: 'Oui. Les fichiers DWG sont modifiables par votre équipe, et nous pouvons effectuer des révisions sur demande.' },
        { q: "Quelle différence avec un modèle Scan-to-BIM ?", a: "Les plans tels que construits sont des dessins 2D en CAO. Le Scan-to-BIM produit un modèle 3D Revit de l'existant, duquel on peut aussi extraire des plans. Le choix dépend de l'usage : dessin, coordination ou gestion du bâtiment." },
      ],
    },
    related: ['scanning', 'scanToBim', 'boma'],
    reading: read('fr', ['modelisation', 'workflow']),
    cta: { title: 'Obtenez des plans à jour de votre bâtiment', text: "Précisez les étages, les plans souhaités (plans d'étage, élévations, coupes, plafonds) et le format. Nous vous préparons une soumission." },
  },
  en: {
    seo: {
      title: 'As-Built Drawings from 3D Laser Scans | pointSpace',
      description: 'As-built drawings produced from 3D laser scans: floor plans, elevations, sections and reflected ceiling plans in DWG. Existing conditions drawings you can trust.',
    },
    serviceType: 'As-built drawings',
    hero: {
      eyebrow: 'Service · CAD deliverables',
      h1: 'As-Built Drawings',
      lead: 'Drawings of your building as it actually stands, traced from a 3D laser survey.',
      image: 'gare-windsor-plan-tel-que-construit', fit: 'contain',
      chips: ['DWG', 'DXF', 'PDF'],
    },
    intro: {
      h2: 'Up-to-date drawings where the originals no longer hold',
      lead: 'Our <strong>as-built drawings</strong> show your building as it really is, not as it was designed. From an <strong>existing conditions survey</strong> with a laser scanner, we produce 2D <strong>measured drawings</strong>: floor plans, elevations and sections, and reflected ceiling plans, as editable CAD files.',
      body: [
        'When original drawings are missing, outdated or no longer reflect years of changes, existing conditions drawings prevent surprises during design and construction. From basic layouts to highly detailed plans, we document structure, façades, mechanical systems and roofs as you need.',
        'The process is often called Scan-to-CAD: the point cloud is the reference, and every line in the CAD drawings is traced on real measurements.',
      ],
      glance: [
        { k: 'Best for', v: 'Architects, property managers, renovations, tenant fit-outs and plant layouts' },
        { k: 'Deliverables', v: 'Floor plans, elevations, sections, reflected ceiling plans' },
        { k: 'Formats', v: 'DWG, DXF, PDF' },
        { k: 'Source', v: '3D laser survey (point cloud)' },
      ],
    },
    features: {
      eyebrow: 'From point cloud to drawing',
      title: 'Every line traced on a real measurement',
      cols: 3,
      items: [
        { title: 'Point cloud slice', text: 'A horizontal slice of the point cloud reveals the walls, openings and columns of each floor.', image: 'gare-windsor-coupe-nuage-points' },
        { title: 'As-built floor plan', text: 'Rooms, partitions and fixed elements are drawn and labelled in CAD.', image: 'gare-windsor-plan-tel-que-construit' },
        { title: 'Elevations and sections', text: 'Façades and sections drawn from the point cloud, including heritage ornament.', image: 'theatre-st-james-elevation-dessin' },
      ],
    },
    deliverables: {
      title: 'Deliverables and file formats',
      intro: 'Editable CAD files, organised so your team can pick them up.',
      items: [
        { title: 'Floor plans', formats: ['DWG', 'PDF'], text: 'Dimensioned floor plans of every level: partitions, doors, windows, stairs, columns and fixed elements.' },
        { title: 'Elevations and sections', formats: ['DWG', 'PDF'], text: 'Façade elevations and building sections with the real surveyed heights.' },
        { title: 'Reflected ceiling plans', formats: ['DWG'], text: 'Ceilings, bulkheads and suspended elements, useful for mechanical and lighting work.' },
        { title: 'Plant layout drawings', formats: ['DWG', 'DXF'], text: 'Footprint of machines and floor equipment, with AutoCAD blocks, to test new layouts.' },
        { title: 'Reference point cloud', formats: ['E57', 'RCP/RCS'], text: 'The source point cloud, to check a dimension or extend the drawings later.' },
      ],
      visuals: [
        { image: 'plans-tels-que-construits-plan-etage-gare-windsor', caption: 'As-built floor plan of an L-shaped building.', fit: 'contain' },
        { image: 'nadco-plan-amenagement-cao', caption: 'CAD plant layout showing machine footprints (Nadco Plastics).' },
      ],
    },
    process: {
      title: 'Four steps to reliable drawings',
      steps: [
        { title: 'Scope and level of detail', text: 'Floors, disciplines and the drawings’ level of detail are defined with you, based on their intended use.' },
        { title: '3D laser survey', text: 'The building is scanned and the scans are registered into a point cloud of existing conditions.' },
        { title: 'CAD drafting', text: 'Our drafters trace the drawings directly on the point cloud, with named, structured layers.' },
        { title: 'Checks and delivery', text: 'Drawings are checked against the point cloud, then delivered in your formats. Revisions are available on request.' },
      ],
    },
    cases: { title: 'As-built drawing projects', ids: ['st-james', 'le-foufou', 'westcliff'] },
    testimonial: 'marquis',
    faq: {
      title: 'As-built drawings FAQ',
      items: [
        { q: 'What are as-built drawings?', a: 'They show a building in its real condition, after construction and later changes, rather than the design as originally drawn. Ours are produced from a 3D laser survey of existing conditions.' },
        { q: 'How accurate are your drawings?', a: 'Data is captured with millimetre-grade scanners. While we do not provide a guaranteed tolerance level, our workflows, tools and quality checks allow us to consistently produce highly precise and reliable drawings.' },
        { q: 'Which formats do you deliver?', a: 'DWG, DXF and PDF. The source point cloud can be provided in E57 or RCP/RCS, and we offer tailored training if needed.' },
        { q: 'Can we edit the drawings after delivery?', a: 'Yes. DWG files are editable by your team, and we can make revisions on request.' },
        { q: 'How do as-built drawings differ from Scan-to-BIM?', a: 'As-built drawings are 2D CAD drawings. Scan-to-BIM produces a 3D Revit model of existing conditions, from which drawings can also be extracted. The choice depends on use: drafting, coordination or building management.' },
      ],
    },
    related: ['scanning', 'scanToBim', 'boma'],
    reading: read('en', ['modelisation', 'workflow']),
    cta: { title: 'Get up-to-date drawings of your building', text: 'Tell us which floors, which drawings (floor plans, elevations, sections, ceilings) and which format. We will prepare a quote.' },
  },
};
