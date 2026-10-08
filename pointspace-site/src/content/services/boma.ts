import type { Bilingual, ServiceContent } from '../types';

// Wording rules (brief, decision 4): "Mesurage BOMA", "superficie locative" (never "surface louable"),
// "plans conformes aux normes BOMA" (never "certifiés BOMA"). Credential and "certificat de mesurage" = TODO for Louis.
export const boma: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: 'Mesurage BOMA : calcul de superficie locative | pointSpace',
      description: "Mesurage BOMA de vos espaces locatifs : calcul de superficie locative et utilisable, plans conformes aux normes BOMA produits à partir d'un relevé laser 3D.",
    },
    serviceType: 'Mesurage BOMA',
    hero: {
      eyebrow: 'Service · Superficies',
      h1: 'Mesurage BOMA : calcul de superficie locative',
      lead: 'Un mesurage BOMA fiable et comparable de la superficie locative, pour louer, gérer et valoriser vos espaces.',
      image: 'plan-superficies-locatives-gare-windsor', fit: 'contain',
      chips: ['DWG', 'PDF'],
    },
    intro: {
      h2: 'Des superficies mesurées, pas estimées',
      lead: "Le <strong>mesurage BOMA</strong> établit la <strong>superficie locative</strong> et la superficie utilisable de vos <strong>espaces locatifs</strong> selon les normes de la Building Owners and Managers Association (BOMA). Nous partons d'un relevé laser 3D de l'existant pour produire des <strong>plans conformes aux normes BOMA</strong> et un calcul des superficies standardisé, idéal pour les gestionnaires immobiliers et les propriétaires d'espaces commerciaux, industriels et locatifs.",
      body: [
        "La superficie utilisable correspond à l'espace qu'occupe réellement un locataire ; la superficie locative y ajoute sa part des aires communes du bâtiment. Mesurées de façon uniforme, ces superficies assurent une répartition équitable des aires communes et des charges, et des comparaisons fiables entre les locaux et les immeubles.",
        "Notre équipe est formée aux normes de mesurage BOMA.",
      ],
      glance: [
        { k: 'Idéal pour', v: 'Propriétaires, gestionnaires immobiliers, courtiers, locataires' },
        { k: 'Types d\'immeubles', v: 'Tours de bureaux, commerces de détail, espaces commerciaux et industriels, développements mixtes, résidentiel' },
        { k: 'Résultats', v: 'Superficies locatives et utilisables, plans conformes aux normes BOMA' },
      ],
    },
    deliverables: {
      title: 'Livrables et formats de fichiers',
      intro: 'Des résultats reproductibles et vérifiables, prêts pour vos baux et vos rapports.',
      items: [
        { title: 'Plans de superficies par étage', formats: ['DWG', 'PDF'], text: "Plans conformes aux normes BOMA montrant chaque local, les aires communes et les zones exclues, avec leurs superficies." },
        { title: 'Rapport des superficies', formats: ['PDF'], text: 'Superficies locatives et utilisables par local et par étage, présentées de façon claire et vérifiable.' },
        { title: "Plans d'étage tels que construits", formats: ['DWG'], text: "Les plans d'étage de l'existant qui servent de base au mesurage, réutilisables pour vos projets d'aménagement." },
      ],
      visuals: [
        { image: 'mesurage-boma-plan-superficie-entrepot', caption: "Plan de superficies d'un entrepôt : espace de location, zone de service du bâtiment et grande pénétration verticale." },
        { image: 'gare-windsor-plan-superficies-etage', caption: "Plan des superficies par zone d'un étage de la Gare Windsor." },
      ],
    },
    process: {
      title: 'Six étapes vers des superficies défendables',
      steps: [
        { title: 'Alignement sur la norme BOMA', text: "Nous confirmons avec vous la norme BOMA applicable et l'usage visé : location, évaluation, rapports internes ou conformité." },
        { title: "Relevé de l'existant", text: 'Les plateaux, les noyaux et les aires de circulation sont numérisés au scanner laser.' },
        { title: 'Calcul des superficies', text: 'Les superficies sont calculées de façon reproductible et vérifiable, local par local.' },
        { title: 'Plans clairs et standardisés', text: 'Les plans montrent les limites de chaque local, les aires communes et les exclusions.' },
        { title: 'Résultats vérifiés', text: 'Les calculs et les plans sont contrôlés avant la livraison, prêts à être revus.' },
        { title: 'Livraison et suivi', text: 'Nous mettons à jour les plans et les superficies lors des changements de locataires ou des réaménagements.' },
      ],
    },
    cases: { title: 'Projets de superficies et de plans', ids: ['westcliff', 'windsor', 'le-foufou'] },
    testimonial: 'carosielliShort',
    faq: {
      title: 'Questions fréquentes sur le mesurage BOMA',
      items: [
        { q: 'Que sont les normes BOMA ?', a: "Ce sont les normes de mesurage des superficies de la Building Owners and Managers Association (BOMA), approuvées par l'American National Standards Institute (ANSI). Elles définissent une méthode uniforme pour calculer la superficie locative et la superficie utilisable des bâtiments." },
        { q: 'Quelle différence entre superficie locative et superficie utilisable ?', a: "La superficie utilisable (ou surface utile) est l'espace occupé par le locataire. La superficie locative ajoute à cette superficie une part des aires communes du bâtiment, comme les halls et les corridors partagés." },
        { q: 'En quoi le mesurage BOMA aide-t-il les propriétaires et les gestionnaires ?', a: 'Il assure une répartition équitable des aires communes et des charges entre les locataires, facilite la gestion des baux et permet de comparer les immeubles sur une base commune.' },
        { q: 'Le mesurage BOMA est-il obligatoire ?', a: "Non, il n'est pas obligatoire sur le plan juridique, mais c'est la norme de l'industrie pour les transactions immobilières et la gestion des espaces." },
        { q: 'Quand faut-il mettre à jour les superficies ?', a: 'Après des aménagements locatifs, des rénovations ou des reconfigurations qui modifient les limites des locaux ou des aires communes.' },
        { q: 'Comment se déroule un mesurage BOMA ?', a: "Nous numérisons les étages au scanner laser, nous produisons les plans de l'existant, puis nous calculons et vérifions les superficies selon la norme convenue avant de livrer les plans et le rapport." },
      ],
    },
    related: ['asBuilt', 'scanning', 'analysis'],
    cta: { title: 'Obtenez les superficies de vos espaces locatifs', text: "Indiquez-nous l'immeuble, le nombre d'étages et l'usage prévu des superficies. Nous vous préparons une soumission de mesurage BOMA." },
  },
  en: {
    seo: {
      title: 'BOMA Measurement: Rentable & Usable Area | pointSpace',
      description: 'BOMA measurement of leasable space: rentable and usable area calculations with floor plans that follow BOMA standards, based on a 3D laser survey.',
    },
    serviceType: 'BOMA measurement',
    hero: {
      eyebrow: 'Service · Floor areas',
      h1: 'BOMA Measurement: Rentable and Usable Area',
      lead: 'Reliable, comparable BOMA measurement of rentable and usable area, to lease, manage and add value to your space.',
      image: 'plan-superficies-locatives-gare-windsor', fit: 'contain',
      chips: ['DWG', 'PDF'],
    },
    intro: {
      h2: 'Floor areas that are measured, not estimated',
      lead: '<strong>BOMA measurement</strong> establishes the <strong>rentable area</strong> and <strong>usable area</strong> of your leasable space following the standards of the Building Owners and Managers Association (BOMA). Starting from a 3D laser survey of existing conditions, we produce <strong>floor plans that follow BOMA standards</strong> and standardised area calculations, ideal for property managers and owners of commercial, industrial and rental space.',
      body: [
        'Usable area is the space a tenant actually occupies; rentable area adds the tenant’s share of the building’s common areas. Measured consistently, these figures ensure fair allocation of common areas and costs, and reliable comparisons between suites and buildings.',
        'Our team is trained in BOMA measurement standards.',
      ],
      glance: [
        { k: 'Best for', v: 'Owners, property managers, brokers, tenants' },
        { k: 'Building types', v: 'Office towers, retail, commercial and industrial space, mixed-use developments, residential' },
        { k: 'Results', v: 'Rentable and usable areas, floor plans following BOMA standards' },
      ],
    },
    deliverables: {
      title: 'Deliverables and file formats',
      intro: 'Repeatable, auditable results, ready for your leases and reports.',
      items: [
        { title: 'Area plans by floor', formats: ['DWG', 'PDF'], text: 'Floor plans following BOMA standards showing each suite, common areas and excluded areas, with their areas.' },
        { title: 'Area report', formats: ['PDF'], text: 'Rentable and usable areas by suite and by floor, presented clearly and verifiably.' },
        { title: 'As-built floor plans', formats: ['DWG'], text: 'The existing-conditions floor plans used for measurement, reusable for your fit-out projects.' },
      ],
      visuals: [
        { image: 'mesurage-boma-plan-superficie-entrepot', caption: 'Warehouse area plan: rentable space, building service area and major vertical penetration.' },
        { image: 'gare-windsor-plan-superficies-etage', caption: 'Area-by-zone plan of a Windsor Station floor.' },
      ],
    },
    process: {
      title: 'Six steps to defensible floor areas',
      steps: [
        { title: 'BOMA standard alignment', text: 'We confirm the applicable BOMA standard and intended use with you: leasing, valuation, internal reporting or compliance.' },
        { title: 'Capture of existing conditions', text: 'Floor plates, cores and circulation areas are laser scanned.' },
        { title: 'Area calculations', text: 'Areas are calculated in a repeatable, auditable way, suite by suite.' },
        { title: 'Clear, standardised drawings', text: 'Drawings show each suite boundary, common areas and exclusions.' },
        { title: 'Verified results', text: 'Calculations and drawings are checked before delivery, ready for review.' },
        { title: 'Delivery and ongoing support', text: 'We update drawings and areas when tenants change or spaces are reconfigured.' },
      ],
    },
    cases: { title: 'Floor area and drawing projects', ids: ['westcliff', 'windsor', 'le-foufou'] },
    testimonial: 'carosielliShort',
    faq: {
      title: 'BOMA measurement FAQ',
      items: [
        { q: 'What are BOMA standards?', a: 'They are the floor measurement standards of the Building Owners and Managers Association (BOMA), approved by the American National Standards Institute (ANSI). They define a consistent method for calculating the rentable and usable area of buildings.' },
        { q: 'What is the difference between rentable and usable area?', a: 'Usable area is the space occupied by the tenant. Rentable area adds a share of the building’s common areas, such as lobbies and shared corridors.' },
        { q: 'How does BOMA measurement help owners and managers?', a: 'It ensures fair allocation of common areas and costs between tenants, simplifies lease management and allows buildings to be compared on a common basis.' },
        { q: 'Is BOMA measurement mandatory?', a: 'No, it is not legally mandatory, but it is the industry standard for real estate transactions and space management.' },
        { q: 'When should areas be updated?', a: 'After tenant improvements, renovations or reconfigurations that change suite or common-area boundaries.' },
        { q: 'How does a BOMA measurement work?', a: 'We laser scan the floors, produce existing-conditions plans, then calculate and check the areas against the agreed standard before delivering the drawings and report.' },
      ],
    },
    related: ['asBuilt', 'scanning', 'analysis'],
    cta: { title: 'Get the floor areas of your leasable space', text: 'Tell us about the building, the number of floors and how the areas will be used. We will prepare a BOMA measurement quote.' },
  },
};
