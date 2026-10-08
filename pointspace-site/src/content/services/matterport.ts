import type { Bilingual, ServiceContent } from '../types';

export const matterport: Bilingual<ServiceContent> = {
  fr: {
    seo: {
      title: 'Visites virtuelles Matterport | pointSpace',
      description: "Visites virtuelles 3D Matterport immersives et sécurisées pour le marketing, les présentations et l'accès à distance à vos bâtiments et projets.",
    },
    serviceType: 'Visite virtuelle Matterport',
    hero: {
      eyebrow: 'Service · Capture',
      h1: 'Visites virtuelles Matterport',
      lead: 'Parcourez vos espaces en 3D, partout et à tout moment.',
      image: 'broccolini-restaurant-nuage-points', position: '50% 50%',
    },
    intro: {
      h2: 'Vos lieux, accessibles à distance',
      lead: "Une <strong>visite virtuelle Matterport</strong> assemble des photos 360° en un modèle 3D navigable de vos espaces. Vos équipes, vos clients et vos partenaires visitent les lieux à distance, voient des zones à accès restreint et suivent l'avancement d'un chantier, sans se déplacer.",
      body: [
        "Idéales pour les initiatives marketing, les présentations et l'accès à distance aux projets, nos visites virtuelles sont sécurisées : vous choisissez qui peut les consulter, et vos fichiers peuvent être protégés par un mot de passe.",
      ],
      glance: [
        { k: 'Idéal pour', v: 'Marketing immobilier, présentations, accès à distance, zones restreintes' },
        { k: 'Accès', v: 'Public, privé, protégé par mot de passe ou interne' },
        { k: 'Intégration', v: 'Sites web, PowerPoint, réseaux sociaux, plateformes immobilières' },
      ],
    },
    features: {
      eyebrow: 'Pourquoi Matterport',
      title: 'Polyvalente, accessible, simple',
      cols: 3,
      items: [
        { title: 'Polyvalence', text: 'Une même visite sert au marketing, à la gestion des lieux, à la coordination et à la documentation.' },
        { title: 'Accessibilité', text: 'Consultable sur ordinateur, tablette ou téléphone, par un lien sécurisé ou public.' },
        { title: 'Simplicité', text: 'Une navigation intuitive, sans logiciel à installer, et des fichiers protégés par mot de passe.' },
      ],
    },
    deliverables: {
      title: 'Ce que vous recevez',
      items: [
        { title: 'Visite virtuelle Matterport', text: 'Un modèle 3D navigable de vos espaces, avec une structure et une navigation claires.' },
        { title: "Paramètres d'accès", text: 'Visite publique, privée, protégée par mot de passe ou réservée à votre équipe, gérée par les administrateurs Matterport.' },
        { title: 'Liens et intégration', text: 'Liens de partage et code d\'intégration pour vos sites web, présentations et plateformes immobilières.' },
      ],
      visuals: [
        { image: 'broccolini-restaurant-nuage-points', caption: "Vue en coupe d'un restaurant sur plusieurs étages (Broccolini)." },
        { image: 'nadco-usine-photo-360', caption: "Vue immersive d'une usine, prête à être partagée." },
      ],
    },
    process: {
      title: 'Six étapes vers une visite prête à partager',
      steps: [
        { title: "Préparation et plan d'accès", text: 'Nous définissons les espaces à couvrir, les accès et l\'usage prévu de la visite.' },
        { title: 'Capture Matterport sur site', text: 'Chaque espace est capturé en 360° pour former le modèle 3D.' },
        { title: 'Contrôle qualité et alignement', text: 'Les captures sont vérifiées et alignées pour une navigation fluide.' },
        { title: 'Structure et navigation', text: 'La visite est organisée pour que chacun trouve facilement les espaces clés.' },
        { title: 'Image de marque et partage', text: 'Les paramètres de partage sont réglés : public, privé, protégé par mot de passe ou interne.' },
        { title: 'Livraison, intégration et accompagnement', text: 'Vous recevez les liens et le code d\'intégration ; nous restons disponibles pour la suite.' },
      ],
    },
    cases: { title: 'Projets avec visite virtuelle', ids: ['reitmans', 'broccolini', 'cdf'] },
    testimonial: 'carosielliShort',
    faq: {
      title: 'Questions fréquentes sur les visites virtuelles',
      items: [
        { q: 'Comment fonctionne une visite virtuelle Matterport ?', a: 'Elle combine plusieurs photos 360° pour créer un modèle 3D dans lequel on se déplace librement.' },
        { q: 'Nos visites sont-elles sécurisées ?', a: 'Oui. Les visites sont hébergées sur la plateforme de visualisation de données Matterport, gérée par des administrateurs, et peuvent être partagées par des liens protégés par mot de passe.' },
        { q: 'Comment donner accès à la visite ?', a: 'Par un lien sécurisé, par les administrateurs Matterport, par un lien non sécurisé ou en mode public, selon vos besoins.' },
        { q: 'Peut-on intégrer la visite à notre site web ?', a: 'Oui : sites web, présentations PowerPoint, réseaux sociaux et plateformes immobilières.' },
        { q: 'Peut-on montrer des zones à accès restreint ?', a: 'Oui. La visite permet de voir à distance des zones difficiles ou interdites d\'accès.' },
      ],
    },
    related: ['photo360', 'scanning', 'digitalTwins'],
    cta: { title: 'Ouvrez vos espaces au monde', text: "Indiquez-nous les lieux à capturer et l'usage de la visite. Nous vous préparons une soumission." },
  },
  en: {
    seo: {
      title: 'Matterport Virtual Tours | pointSpace',
      description: 'Immersive, secure Matterport 3D virtual tours for marketing, presentations and remote access to your buildings and projects.',
    },
    serviceType: 'Matterport virtual tour',
    hero: {
      eyebrow: 'Service · Capture',
      h1: 'Matterport Virtual Tours',
      lead: 'Walk through your spaces in 3D, anywhere, anytime.',
      image: 'broccolini-restaurant-nuage-points', position: '50% 50%',
    },
    intro: {
      h2: 'Your spaces, accessible remotely',
      lead: 'A <strong>Matterport virtual tour</strong> combines 360° photos into a navigable 3D model of your spaces. Your teams, clients and partners visit remotely, see restricted areas and follow construction progress without travelling.',
      body: [
        'Ideal for marketing initiatives, presentations and remote project access, our virtual tours are secure: you decide who can view them, and your files can be password protected.',
      ],
      glance: [
        { k: 'Best for', v: 'Real estate marketing, presentations, remote access, restricted areas' },
        { k: 'Access', v: 'Public, private, password protected or internal' },
        { k: 'Embedding', v: 'Websites, PowerPoint, social media, real estate platforms' },
      ],
    },
    features: {
      eyebrow: 'Why Matterport',
      title: 'Versatile, accessible, simple',
      cols: 3,
      items: [
        { title: 'Versatility', text: 'One tour serves marketing, facility management, coordination and documentation.' },
        { title: 'Accessibility', text: 'Viewable on a computer, tablet or phone through a secure or public link.' },
        { title: 'Simplicity', text: 'Intuitive navigation with nothing to install, and password-protected files.' },
      ],
    },
    deliverables: {
      title: 'What you receive',
      items: [
        { title: 'Matterport virtual tour', text: 'A navigable 3D model of your spaces with clear structure and navigation.' },
        { title: 'Access settings', text: 'Public, private, password protected or internal, managed through Matterport administrators.' },
        { title: 'Links and embedding', text: 'Share links and embed code for your websites, presentations and real estate platforms.' },
      ],
      visuals: [
        { image: 'broccolini-restaurant-nuage-points', caption: 'Cutaway view of a multi-storey restaurant (Broccolini).' },
        { image: 'nadco-usine-photo-360', caption: 'Immersive view of a plant, ready to share.' },
      ],
    },
    process: {
      title: 'Six steps to a tour ready to share',
      steps: [
        { title: 'Project setup and access planning', text: 'We define the spaces to cover, site access and how the tour will be used.' },
        { title: 'On-site Matterport capture', text: 'Every space is captured in 360° to build the 3D model.' },
        { title: 'Quality control and alignment', text: 'Captures are checked and aligned for smooth navigation.' },
        { title: 'Tour structure and navigation', text: 'The tour is organised so everyone finds the key spaces easily.' },
        { title: 'Branding and share settings', text: 'Share settings are configured: public, private, password protected or internal.' },
        { title: 'Delivery, embed and support', text: 'You receive the links and embed code; we stay available afterwards.' },
      ],
    },
    cases: { title: 'Projects with virtual tours', ids: ['reitmans', 'broccolini', 'cdf'] },
    testimonial: 'carosielliShort',
    faq: {
      title: 'Virtual tours FAQ',
      items: [
        { q: 'How does a Matterport virtual tour work?', a: 'It combines multiple 360° photos to create a 3D model you can move through freely.' },
        { q: 'Are the tours secure?', a: 'Yes. Tours are hosted on the Matterport data visualisation platform, managed by administrators, and can be shared through password-protected links.' },
        { q: 'How can people access the tour?', a: 'Through a secure link, Matterport administrators, an unsecured link or public mode, depending on your needs.' },
        { q: 'Can we embed the tour on our website?', a: 'Yes: websites, PowerPoint presentations, social media and real estate platforms.' },
        { q: 'Can the tour show restricted areas?', a: 'Yes. It lets people view hard-to-reach or restricted areas remotely.' },
      ],
    },
    related: ['photo360', 'scanning', 'digitalTwins'],
    cta: { title: 'Open your spaces to the world', text: 'Tell us which spaces to capture and how the tour will be used. We will prepare a quote.' },
  },
};
