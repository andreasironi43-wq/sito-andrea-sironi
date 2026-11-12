// Build eseguita da Vercel a ogni deploy (vercel.json → buildCommand).
// 1. Ricava l'indirizzo pubblico del sito:
//    SITE_URL (variabile impostata a mano, es. quando si collega un dominio)
//    oppure VERCEL_PROJECT_PRODUCTION_URL (variabile di sistema di Vercel: il dominio
//    di produzione del progetto, .vercel.app o il dominio personalizzato quando c'è).
//    Se nessuna delle due esiste la build si ferma: meglio nessun deploy che
//    canonical e sitemap verso un dominio sbagliato.
// 2. Rigenera le pagine con quell'indirizzo.
// 3. Copia in dist/ solo ciò che va pubblicato (niente sorgenti, documenti, test).
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const raw = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || '';
if (!raw) {
  console.error('SITE_URL o VERCEL_PROJECT_PRODUCTION_URL mancanti: build interrotta.');
  process.exit(1);
}
const url = (/^https?:\/\//.test(raw) ? raw : `https://${raw}`).replace(/\/+$/, '');
console.log(`Indirizzo pubblico: ${url}`);
execFileSync(process.execPath, [join(root, '_src/build.mjs')], { stdio: 'inherit', env: { ...process.env, SITE_URL: url } });

const PUBLISH = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png',
  'assets', 'img', 'og', 'video', 'servizi', 'lavori', 'chi-sono', 'contatti', 'ristoranti', 'pmi', 'privacy-policy', 'cookie-policy', 'ipm-multiservice'];
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist);
for (const p of PUBLISH) {
  const from = join(root, p);
  if (!existsSync(from)) { console.error(`Manca ${p}: build interrotta.`); process.exit(1); }
  cpSync(from, join(dist, p), { recursive: true, filter: (src) => !/[\\/](_src|docs|tests|README\.md)([\\/]|$)/.test(src.slice(from.length)) });
}
console.log(`Pubblicazione pronta in dist/ (${PUBLISH.length} voci).`);
