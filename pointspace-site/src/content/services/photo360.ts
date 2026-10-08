import type { Bilingual, ServiceContent } from '../types';

export const photo360: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: 'Photo 360° de chantier et de bâtiment | pointSpace',
      description: 'Photographie 360° haute résolution de vos chantiers et bâtiments, prête à être convertie en visite virtuelle Matterport pour consulter le site à distance.',
    },
    serviceType: 'Photo 360°',
    hero: {
      eyebrow: 'Service · Capture',
      h1: 'Photo 360° de chantier et de bâtiment',
      lead: 'Revoyez vos lieux sous tous les angles, sans retourner sur place.',
      image: 'prevost-usine-photo-360', position: '50% 50%',
    },
    intro: {
      h2: 'Une documentation visuelle complète de vos espaces',
      lead: "La <strong>photo 360°</strong> capture chaque pièce, chaque étage ou chaque zone de chantier en images panoramiques haute résolution. Ces photos documentent l'état des lieux à une date donnée et peuvent être converties en <strong>visite virtuelle Matterport</strong> immersive et interactive.",
      body: [
        "Idéale pour la promotion, la gestion et la documentation de vos espaces, la photographie immersive permet à vos équipes, vos clients ou vos partenaires de consulter le site à distance, sur ordinateur, tablette ou téléphone. Elle complète souvent un relevé laser 3D.",
      ],
      glance: [
        { k: 'Idéal pour', v: 'Documentation de chantier, gestion immobilière, marketing' },
        { k: 'Consultation', v: 'Ordinateur, tablette, téléphone, lien partagé ou intégration web' },
        { k: 'Option', v: 'Conversion en visite virtuelle Matterport' },
      ],
    },
    deliverables: {
      title: 'Ce que vous recevez',
      items: [
        { title: 'Photos 360° haute résolution', text: 'Images panoramiques de chaque espace, livrées dans les formats qui vous conviennent.' },
        { title: 'Visite virtuelle Matterport', text: 'En option, les photos sont assemblées en une visite 3D navigable.' },
        { title: 'Liens de partage et intégration', text: 'Un lien à partager ou à intégrer à votre site web, à consulter sur tous les appareils.' },
      ],
      visuals: [
        { image: 'nadco-usine-photo-360', caption: "Photo 360° d'une usine de moulage par injection (Les Plastiques Nadco)." },
        { image: 'reitmans-magasin-numerisation', caption: 'Capture dans un magasin de détail (Reitmans).' },
      ],
    },
    process: {
      title: 'De la visite à la consultation en ligne',
      steps: [
        { title: 'Planification', text: 'Nous définissons les espaces à photographier et l\'usage prévu des images.' },
        { title: 'Capture sur site', text: 'Chaque espace est photographié en 360°, y compris les zones difficiles d\'accès.' },
        { title: 'Traitement', text: 'Les images sont vérifiées et, au besoin, assemblées en visite virtuelle.' },
        { title: 'Livraison', text: 'Vous recevez les photos et les liens de partage, prêts à diffuser.' },
      ],
    },
    cases: { title: 'Projets avec photo 360°', ids: ['reitmans', 'vac-aero', 'broccolini'] },
    testimonial: 'carosielliShort',
    faq: {
      title: 'Questions fréquentes sur la photo 360°',
      items: [
        { q: "Qu'est-ce qu'une photo 360° ?", a: "Une image panoramique qui couvre toutes les directions autour d'un point. On peut s'y déplacer du regard comme si l'on était sur place." },
        { q: 'Combien de temps dure la capture ?', a: 'Cela dépend de la taille et de la complexité des lieux.' },
        { q: 'Comment consulter et partager les photos ?', a: 'Sur ordinateur, tablette ou téléphone, par un lien partagé ou intégré à un site web.' },
        { q: 'Dans quels formats sont livrées les photos ?', a: 'Dans les formats qui vous conviennent.' },
        { q: 'Pouvez-vous photographier des zones difficiles d\'accès ?', a: 'Oui.' },
      ],
    },
    related: ['matterport', 'scanning', 'progress'],
    cta: { title: 'Documentez vos espaces en 360°', text: 'Indiquez-nous les lieux à photographier et l\'usage prévu. Nous vous préparons une soumission.' },
  },
  en: {
    seo: {
      title: '360° Site Photography for Buildings | pointSpace',
      description: 'High-resolution 360° photography of your sites and buildings, ready to be turned into a Matterport virtual tour for remote site access.',
    },
    serviceType: '360° photography',
    hero: {
      eyebrow: 'Service · Capture',
      h1: '360° Site Photography',
      lead: 'Review your spaces from every angle without going back on site.',
      image: 'prevost-usine-photo-360', position: '50% 50%',
    },
    intro: {
      h2: 'Complete visual documentation of your spaces',
      lead: '<strong>360° photography</strong> captures every room, floor or construction area as high-resolution panoramic images. The photos record site conditions on a given date and can be turned into an immersive, interactive <strong>Matterport virtual tour</strong>.',
      body: [
        'Ideal for marketing, management and documentation, immersive photography lets your teams, clients or partners review the site remotely on a computer, tablet or phone. It often complements a 3D laser survey.',
      ],
      glance: [
        { k: 'Best for', v: 'Site documentation, property management, marketing' },
        { k: 'Viewing', v: 'Computer, tablet, phone, shared link or website embed' },
        { k: 'Option', v: 'Conversion into a Matterport virtual tour' },
      ],
    },
    deliverables: {
      title: 'What you receive',
      items: [
        { title: 'High-resolution 360° photos', text: 'Panoramic images of every space, delivered in the formats that suit you.' },
        { title: 'Matterport virtual tour', text: 'Optionally, the photos are assembled into a navigable 3D tour.' },
        { title: 'Share links and embedding', text: 'A link to share or embed on your website, viewable on any device.' },
      ],
      visuals: [
        { image: 'nadco-usine-photo-360', caption: '360° photo of an injection-moulding plant (Nadco Plastics).' },
        { image: 'reitmans-magasin-numerisation', caption: 'Capture in a retail store (Reitmans).' },
      ],
    },
    process: {
      title: 'From site visit to online viewing',
      steps: [
        { title: 'Planning', text: 'We define the spaces to photograph and how the images will be used.' },
        { title: 'On-site capture', text: 'Every space is photographed in 360°, including hard-to-reach areas.' },
        { title: 'Processing', text: 'Images are checked and, if needed, assembled into a virtual tour.' },
        { title: 'Delivery', text: 'You receive the photos and share links, ready to distribute.' },
      ],
    },
    cases: { title: 'Projects with 360° photography', ids: ['reitmans', 'vac-aero', 'broccolini'] },
    testimonial: 'carosielliShort',
    faq: {
      title: '360° photography FAQ',
      items: [
        { q: 'What is a 360° photo?', a: 'A panoramic image that covers every direction around a point. You can look around as if you were on site.' },
        { q: 'How long does capture take?', a: 'It depends on the size and complexity of the space.' },
        { q: 'How can we view and share the photos?', a: 'On a computer, tablet or phone, through a shared link or embedded on a website.' },
        { q: 'Which formats are the photos delivered in?', a: 'In the formats that suit you.' },
        { q: 'Can you photograph hard-to-reach areas?', a: 'Yes.' },
      ],
    },
    related: ['matterport', 'scanning', 'progress'],
    cta: { title: 'Document your spaces in 360°', text: 'Tell us which spaces to photograph and how the images will be used. We will prepare a quote.' },
  },
};
