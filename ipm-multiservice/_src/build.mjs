// Genera le pagine statiche del prototipo a partire da contenuti e template.
// Uso: node _src/build.mjs   (nessuna dipendenza esterna)
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { services } from './content/site.mjs';
import { home } from './templates/home.mjs';
import { servicePage, servicesHub, companyPage, projectsPage, contactPage, jobsPage, legalPage, notFound } from './templates/pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = (rel, html) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log('→', rel, (html.length / 1024).toFixed(1) + 'kB');
};

out('index.html', home());
out('servizi/index.html', servicesHub());
for (const s of services) out(`${s.slug}/index.html`, servicePage(s));
out('azienda/index.html', companyPage());
out('progetti/index.html', projectsPage());
out('contatti/index.html', contactPage());
out('lavora-con-noi/index.html', jobsPage());
out('privacy-policy/index.html', legalPage('privacy-policy', 'Privacy policy'));
out('cookie-policy/index.html', legalPage('cookie-policy', 'Cookie policy'));
out('404.html', notFound());
