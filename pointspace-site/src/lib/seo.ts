import { SITE } from '../data/site';
import { ROUTES, type Lang, type RouteId } from '../data/routes';

/** Absolute production URL for a route (canonical / hreflang / JSON-LD). */
export const absUrl = (path: string) => new URL(encodeURI(path), SITE.url).href.replace(/\/$/, path === '/' ? '/' : '');

export const alternates = (id: RouteId) => ({
  fr: absUrl(ROUTES[id].fr),
  en: absUrl(ROUTES[id].en),
});

export function organizationLd(lang: Lang) {
  const a = SITE.addresses.head;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/images/logo-pointspace-on-cream.svg`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    sameAs: [SITE.linkedin],
    address: { '@type': 'PostalAddress', streetAddress: '2211 Rue de la Métropole', addressLocality: a.city, addressRegion: a.region, postalCode: a.postal, addressCountry: 'CA' },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
  };
}

export function serviceLd(opts: { id: RouteId; lang: Lang; name: string; description: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absUrl(ROUTES[opts.id][opts.lang]),
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    inLanguage: opts.lang === 'fr' ? 'fr-CA' : 'en-CA',
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}
