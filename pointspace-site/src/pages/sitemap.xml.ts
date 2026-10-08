// sitemap.xml with fr-CA / en-CA alternates for every page pair (the internal styleguide is excluded).
import type { APIRoute } from 'astro';
import { ROUTES, type RouteId } from '../data/routes';
import { absUrl } from '../lib/seo';

export const GET: APIRoute = () => {
  const ids = (Object.keys(ROUTES) as RouteId[]).filter((id) => id !== 'styleguide');
  const entry = (loc: string, id: RouteId) => `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="${absUrl(ROUTES[id].fr)}"/>
    <xhtml:link rel="alternate" hreflang="en-CA" href="${absUrl(ROUTES[id].en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(ROUTES[id].fr)}"/>
  </url>`;
  const body = ids.flatMap((id) => [entry(absUrl(ROUTES[id].fr), id), entry(absUrl(ROUTES[id].en), id)]).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
