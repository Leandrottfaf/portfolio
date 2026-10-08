import { defineMiddleware } from 'astro:middleware';

// French typography: non-breaking space before : ; ? ! » and after «, so punctuation never starts a line
// ("Scan-to-BIM : modélisation…"). Applied to French pages only, outside <script> and <style>.
const NBSP = ' ';
const fixFrench = (html: string) =>
  html
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/g)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part
            .replace(/(\S) ([:;?!»])(?=[\s<"&]|$)/g, `$1${NBSP}$2`)
            .replace(/« /g, `«${NBSP}`),
    )
    .join('');

export const onRequest = defineMiddleware(async (_ctx, next) => {
  const res = await next();
  const type = res.headers.get('content-type') ?? '';
  if (!type.includes('text/html')) return res;
  const html = await res.text();
  const out = /<html lang="fr-CA"/.test(html) ? fixFrench(html) : html;
  return new Response(out, { status: res.status, headers: res.headers });
});
