// Genera con Chromium (Playwright): immagine social OG, favicon, screenshot del prototipo IPM.
// Uso: avvia un server statico sulla radice (es. npx http-server -p 8080) e poi
//      node _src/tools/media.mjs http://localhost:8080
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // preinstallato globalmente
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const base = process.argv[2] || 'http://localhost:8080';
const browser = await chromium.launch();

const mark = (s) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#64D2FF"/><stop offset=".45" stop-color="#0A84FF"/><stop offset="1" stop-color="#BF5AF2"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="url(#g)"/><path d="M14 46 26.5 16h3L42 46" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 35h17" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/></svg>`;
writeFileSync(join(root, 'favicon.svg'), mark(64).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));

const shot = async (html, w, h, file, type = 'png') => {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.goto(base + '/404.html');
  await p.setContent(html, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: join(root, file), type, ...(type === 'jpeg' ? { quality: 88 } : {}), omitBackground: type === 'png' });
  await p.close();
};
const fonts = `<style>@font-face{font-family:IT;font-weight:100 900;src:url(${base}/assets/fonts/inter-tight-latin-wght-normal.woff2)}@font-face{font-family:JB;src:url(${base}/assets/fonts/jetbrains-mono-latin-500-normal.woff2)}html,body{margin:0}</style>`;

await shot(`${fonts}<div style="width:180px;height:180px">${mark(180).replace('rx="16"', 'rx="0"')}</div>`, 180, 180, 'apple-touch-icon.png');
await shot(`${fonts}<div style="width:32px;height:32px">${mark(32)}</div>`, 32, 32, '_src/tools/favicon-32.png');

await shot(`${fonts}<div style="width:1200px;height:630px;background:#000;color:#F5F5F7;font-family:IT;position:relative;overflow:hidden">
  <div style="position:absolute;inset:-30% -20% auto -10%;height:640px;filter:blur(60px);opacity:.9;background:radial-gradient(36% 40% at 22% 34%,rgba(94,92,230,.6),transparent 70%),radial-gradient(32% 36% at 80% 22%,rgba(191,90,242,.45),transparent 70%),radial-gradient(40% 42% at 56% 66%,rgba(10,132,255,.45),transparent 72%)"></div>
  <div style="position:absolute;left:80px;top:72px;display:flex;align-items:center;gap:16px;font-size:26px;font-weight:600;letter-spacing:-.02em">${mark(44)}Andrea Sironi</div>
  <div style="position:absolute;left:80px;right:80px;top:200px;font-size:76px;line-height:.98;font-weight:680;letter-spacing:-.045em">Do una direzione alla comunicazione.<br><span style="background:linear-gradient(100deg,#64D2FF,#0A84FF 30%,#7D7AFF 62%,#BF5AF2);-webkit-background-clip:text;color:transparent">Poi la realizzo.</span></div>
  <div style="position:absolute;left:80px;bottom:64px;font-family:JB;font-size:19px;letter-spacing:.14em;text-transform:uppercase;color:#98989F">Marketing strategist e art director · Brianza · Lecco · Monza · Milano</div>
</div>`, 1200, 630, 'og/andrea-sironi.jpg', 'jpeg');

// Screenshot reale della homepage del prototipo IPM (lavoro di Andrea, nello stesso repository).
const p = await browser.newPage({ viewport: { width: 600, height: 750 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
await p.goto(base + '/ipm-multiservice/', { waitUntil: 'networkidle' });
await p.addStyleTag({ content: '.ph-tag{display:none!important}' }); // nasconde le note interne del prototipo
await p.waitForTimeout(1500);
await p.screenshot({ path: join(root, 'img/ipm-multiservice-prototipo.jpg'), type: 'jpeg', quality: 82 });
await browser.close();
console.log('ok');
