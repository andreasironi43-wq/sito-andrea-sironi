// Genera le pagine HTML statiche del sito.
// Uso: node _src/build.mjs   (dalla radice del repository)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Versione degli asset = hash di CSS e JS: cambia solo quando cambiano i file.
const hash = createHash('sha1')
  .update(readFileSync(join(root, 'assets/css/site.css')))
  .update(readFileSync(join(root, 'assets/js/site.js')))
  .digest('hex').slice(0, 8);
process.env.BUILD_ID = hash;

const P = await import('./pages.mjs');
const { cases } = await import('./cases.mjs');
const { services, site } = await import('./content.mjs');

const out = [];
const write = (rel, html, { sitemap = true, priority = '0.7' } = {}) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (sitemap) out.push({ loc: site.url + '/' + rel.replace(/index\.html$/, ''), priority });
};

write('index.html', P.home(), { priority: '1.0' });
write('servizi/index.html', P.servicesIndex(), { priority: '0.9' });
for (const slug of Object.keys(services)) write(`servizi/${slug}/index.html`, P.servicePage(slug), { priority: '0.8' });
write('lavori/index.html', P.worksIndex(), { priority: '0.9' });
for (const cs of cases) write(`lavori/${cs.slug}/index.html`, P.casePage(cs), { priority: '0.8' });
write('chi-sono/index.html', P.about(), { priority: '0.7' });
write('ristoranti/index.html', P.restaurants(), { priority: '0.9' });
write('pmi/index.html', P.businesses(), { priority: '0.9' });
// pagine per le campagne: escluse da Google e dalla sitemap
write('ristoranti/check-up/index.html', P.restaurantsCheckup(), { sitemap: false });
write('ristoranti/check-up/grazie/index.html', P.restaurantsCheckupThanks(), { sitemap: false });
write('contatti/index.html', P.contact(), { priority: '0.8' });
write('privacy-policy/index.html', P.privacy(), { priority: '0.2' });
write('cookie-policy/index.html', P.cookies(), { priority: '0.2' });
write('404.html', P.notFound(), { sitemap: false });

const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${out.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(root, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_src/

Sitemap: ${site.url}/sitemap.xml
`);
console.log(`Generate ${out.length + 1} pagine · asset v=${hash}`);
