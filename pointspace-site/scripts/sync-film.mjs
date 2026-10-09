// Copies the scan → BIM → CAD film from ../bim-to-cad (same repo) into public/film/,
// where the blog article embeds it as a scroll-driven section (see BlogScanToBim.astro).
// Run again after the film changes:  node scripts/sync-film.mjs
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '..', 'bim-to-cad');
const out = join(root, 'public', 'film');
mkdirSync(join(out, 'drawings'), { recursive: true });

const sub = (s, a, b) => {
  if (!s.includes(a)) throw new Error(`sync-film: "${a}" not found; the film changed, update this script`);
  return s.replace(a, b);
};

// The film script, with paths flattened for public/film/. `?lines=0` hides the
// linework (used for the point-cloud still).
let film = readFileSync(join(src, 'film', 'film.js'), 'utf8');
film = sub(film, '"../terrain.js"', '"./terrain.js"');
film = sub(film, 'fetch("../drawings/drawings.json"', 'fetch("drawings/drawings.json"');
film = sub(film, 'fetch("../" + m.src', 'fetch(m.src');
film = sub(film, 'edges.visible = edgeMat.uniforms.uOpacity.value > 0;', 'edges.visible = edgeMat.uniforms.uOpacity.value > 0 && params.get("lines") !== "0";');
writeFileSync(join(out, 'film.js'), film);

copyFileSync(join(src, 'terrain.js'), join(out, 'terrain.js'));
for (const f of ['soundtrack.js', 'house-elements.glb', 'scan.bin', 'scan.json']) copyFileSync(join(src, 'film', f), join(out, f));
for (const f of readdirSync(join(src, 'drawings'))) copyFileSync(join(src, 'drawings', f), join(out, 'drawings', f));

// The page: the film's stage without the player, scaled to fill the frame. Brand,
// captions and end card are hidden; the article shows its own step captions.
let html = readFileSync(join(src, 'film', 'index.html'), 'utf8');
html = html.replaceAll('../../fonts/NeueHaasDisplayRoman.ttf', '/fonts/NeueHaasDisplay-Roman.ttf');
html = html.replaceAll('../../fonts/NeueHaasDisplayBold.ttf', '/fonts/NeueHaasDisplay-Bold.ttf');
html = sub(html, '  <script type="module" src="player.js"></script>\n', `  <script type="module">
    // Embedded mode: fit the 1920×1080 stage to the frame (cover), no controls.
    const stage = document.getElementById("stage");
    const fit = () => {
      const s = Math.max(innerWidth / 1920, innerHeight / 1080);
      stage.style.transform = \`translate(\${(innerWidth - 1920 * s) / 2}px, \${(innerHeight - 1080 * s) / 2}px) scale(\${s})\`;
    };
    addEventListener("resize", fit);
    fit();
  </script>
`);
html = sub(html, '<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n  <meta name="robots" content="noindex" />');
html = sub(html, '  </style>', `    /* Embedded in the blog article */
    html, body { width: 100%; height: 100%; }
    #stage { position: absolute; left: 0; top: 0; transform-origin: 0 0; }
    #brand, #caption, #end, #fade { display: none; }
  </style>`);
writeFileSync(join(out, 'index.html'), html);
console.log('film synced to public/film/');
