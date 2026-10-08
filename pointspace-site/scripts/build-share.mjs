// Builds a copy of the site meant for sharing a review link (dist-share/).
// Same pages as the production build, but every page is noindex and robots.txt blocks crawlers,
// so the review link never competes with www.pointspace.ca in search results.
import { execSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';

const out = 'dist-share';
execSync(`npx astro build --outDir ${out}`, { stdio: 'inherit', env: { ...process.env, PUBLIC_SHARE: '1' } });
writeFileSync(`${out}/robots.txt`, '# Review copy of the pointSpace prototype. Not for indexing.\nUser-agent: *\nDisallow: /\n');
rmSync(`${out}/sitemap.xml`, { force: true });
console.log(`\nReview build ready in ${out}/`);
