// Company facts. Every value here comes from the live site or the capabilities PDF (see reference/).
export const SITE = {
  name: 'pointSpace',
  legalName: 'Technologie pointSpace',          // footer and capabilities PDF
  url: 'https://www.pointspace.ca',
  phone: '(514) 606-9604',
  phoneE164: '+15146069604',
  email: 'ldallaire@pointspace.ca',
  contactPerson: 'Louis Dallaire',
  linkedin: 'https://ca.linkedin.com/company/pointspace',
  // Published on the live contact pages (/fr-ca/contact, /contact)
  addresses: {
    head: { fr: 'Siège social', en: 'Head office', street: '2211, rue de la Métropole', city: 'Longueuil', region: 'QC', postal: 'J4G 1S5' },
    satellite: { fr: 'Bureau satellite', en: 'Satellite office', street: '3700, rue Saint-Patrick, unité 312', streetEn: '3700 Saint-Patrick Street, Unit 312', city: 'Montréal', region: 'QC', postal: 'H4E 1A2' },
  },
  // Live site: "We offer our services throughout Quebec and Ontario."
  areaServed: ['Québec', 'Ontario'],
  stats: [
    { value: '400+', fr: 'Projets livrés', en: 'Projects delivered' },
    { value: '50+', fr: 'Clients servis', en: 'Clients served' },
    { value: '10+', fr: 'Services', en: 'Services' },
    { value: '6+', fr: "Années d'expérience", en: 'Years of experience' },
  ],
} as const;
