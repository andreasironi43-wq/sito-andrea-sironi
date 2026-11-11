// Test end-to-end del sito con Playwright (preinstallato nell'ambiente).
// Uso: avvia un server statico sulla radice (npx http-server -p 8080 -s) e poi
//      node tests/qa.mjs http://localhost:8080
// Opzionale: AXE=/percorso/axe.min.js per il controllo di accessibilità automatico.
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:8080';
const AXE = process.env.AXE && existsSync(process.env.AXE) ? readFileSync(process.env.AXE, 'utf8') : null;

const PAGES = ['/', '/servizi/', '/servizi/strategie-marketing/', '/servizi/sito-web/', '/servizi/content-creator/',
  '/servizi/social-media-manager/', '/lavori/', '/lavori/carlambroeus/', '/lavori/brut-merate/', '/lavori/p-stop/',
  '/chi-sono/', '/contatti/', '/privacy-policy/', '/cookie-policy/', '/404.html'];
const WIDTHS = [320, 375, 390, 768, 1024, 1280, 1440, 1920];
const FORBIDDEN = /da inserire|da completare|lorem ipsum|\bTODO\b|placeholder|immagine mancante|segnaposto|P\.IVA da/;

let failures = 0;
const fail = (msg) => { failures++; console.log('  ✗ ' + msg); };
const ok = (msg) => console.log('  ✓ ' + msg);

const browser = await chromium.launch();
const titles = new Map();
const links = new Set();

for (const path of PAGES) {
  console.log(path);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: AXE ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  const res = await page.goto(base + path, { waitUntil: 'networkidle' });
  if (!res || res.status() !== 200) fail(`status ${res && res.status()}`);

  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content || '',
    canonical: document.querySelector('link[rel=canonical]')?.href || '',
    robots: document.querySelector('meta[name=robots]')?.content || '',
    h1: document.querySelectorAll('h1').length,
    lang: document.documentElement.lang,
    text: document.body.innerText,
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    imgsNoAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
    emptyLinks: [...document.querySelectorAll('a,button')].filter((a) => !(a.innerText.trim() || a.getAttribute('aria-label'))).length,
    order: [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => +h.tagName[1]),
  }));
  if (info.h1 !== 1) fail(`h1 = ${info.h1}`);
  if (info.lang !== 'it') fail('lang mancante');
  if (!info.desc || info.desc.length < 70 || info.desc.length > 170) fail(`meta description lunga ${info.desc.length}`);
  if (path !== '/404.html' && !info.canonical.endsWith(path)) fail(`canonical ${info.canonical}`);
  if (path === '/404.html' && !/noindex/.test(info.robots)) fail('404 indicizzabile');
  if (titles.has(info.title)) fail(`titolo duplicato con ${titles.get(info.title)}`); titles.set(info.title, path);
  if (FORBIDDEN.test(info.text)) fail(`testo provvisorio: "${info.text.match(FORBIDDEN)[0]}"`);
  if (info.imgsNoAlt) fail(`${info.imgsNoAlt} immagini senza alt`);
  if (info.emptyLinks) fail(`${info.emptyLinks} link/pulsanti senza nome`);
  for (let i = 1; i < info.order.length; i++) if (info.order[i] - info.order[i - 1] > 1) { fail(`salto di titolo h${info.order[i - 1]} → h${info.order[i]}`); break; }
  for (const j of info.ld) { try { JSON.parse(j); } catch { fail('JSON-LD non valido'); } }
  info.links.forEach((l) => links.add(l));

  // immagini: scorro la pagina per caricare quelle lazy, poi verifico che siano tutte decodificate
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    for (const g of document.querySelectorAll('.gal')) { g.scrollIntoView(); for (let x = 0; x <= g.scrollWidth; x += 200) { g.scrollLeft = x; await new Promise((r) => setTimeout(r, 40)); } } });
  await page.waitForLoadState('networkidle');
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
  if (broken.length) fail('immagini non caricate: ' + broken.join(', '));

  // larghezze
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (over > 0) fail(`overflow orizzontale di ${over}px a ${w}px`);
  }

  if (AXE) {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.addScriptTag({ content: AXE });
    const v = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] })).violations
      .map((x) => `${x.id} (${x.impact}) ×${x.nodes.length}: ${x.nodes[0].target.join(' ')}`));
    v.forEach((x) => fail('axe ' + x));
  }
  if (errors.length) fail('errori console: ' + errors.join(' | '));
  if (!failures) ok('ok');
  await ctx.close();
}

console.log('link interni');
const ctx = await browser.newContext();
const req = ctx.request;
for (const l of [...links].filter((l) => l.startsWith('/'))) {
  const r = await req.get(base + l.split('#')[0]);
  if (r.status() !== 200) fail(`${l} → ${r.status()}`);
}
for (const l of [...links].filter((l) => l.startsWith('#'))) { /* ancore verificate a mano */ }
ok(`${[...links].filter((l) => l.startsWith('/')).length} link interni controllati`);
for (const a of ['/sitemap.xml', '/robots.txt', '/favicon.svg', '/favicon.ico', '/apple-touch-icon.png', '/og/andrea-sironi.jpg', '/video/lavori-01-8f1e0e66a9.mp4']) {
  const r = await req.get(base + a); if (r.status() !== 200) fail(`${a} → ${r.status()}`);
}
const sm = await (await req.get(base + '/sitemap.xml')).text();
for (const p of PAGES.filter((p) => p !== '/404.html')) if (!sm.includes(`<loc>https://www.andreasironi.it${p}</loc>`)) fail(`sitemap senza ${p}`);
ok('sitemap e file statici');

console.log('menu mobile');
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(base + '/');
  await page.click('.burger');
  await page.waitForTimeout(500);
  if (!(await page.isVisible('#menu-mobile a[href="/lavori/"]'))) fail('il menu non si apre');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  if (await page.getAttribute('.burger', 'aria-expanded') !== 'false') fail('Esc non chiude il menu');
  else ok('apertura, chiusura con Esc');
  await page.close();
}

console.log('modulo di contatto');
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base + '/contatti/?tipo=regia');
  if ((await page.inputValue('#f-type')) !== 'Comunicazione continuativa') fail('preselezione da ?tipo non funziona');
  await page.click('button[type=submit]');
  const errs = await page.$$eval('.err', (e) => e.filter((x) => x.textContent).length);
  if (errs < 4) fail(`errori di validazione mostrati: ${errs}`); else ok('validazione dei campi obbligatori');
  if (await page.evaluate(() => document.activeElement.id) !== 'f-name') fail('il focus non va al primo campo errato');
  await page.fill('#f-name', 'Mario Rossi');
  await page.fill('#f-email', 'mario@example.com');
  await page.fill('#f-msg', 'Abbiamo un ristorante e vorremmo rifare sito e social.');
  await page.check('input[name=privacy]');
  await page.waitForTimeout(3100); // supera il controllo antispam sul tempo minimo
  // Senza funzione server (server statico): il sito NON deve dichiarare un invio riuscito.
  await page.click('button[type=submit]');
  await page.waitForSelector('#form-status[data-kind]');
  const kind = await page.getAttribute('#form-status', 'data-kind');
  const text = await page.textContent('#form-status');
  const mailto = await page.getAttribute('#form-status a[href^="mailto:"]', 'href');
  if (kind !== 'info' || /Messaggio inviato/.test(text)) fail('falso successo con server non configurato');
  else if (!mailto || !decodeURIComponent(mailto).includes('Mario Rossi')) fail('email di riserva non compilata');
  else ok('ripiego onesto: email e WhatsApp precompilati');

  // Con il server che risponde ok → conferma
  await page.route('**/api/contact', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await page.fill('#f-name', 'Mario Rossi'); await page.fill('#f-email', 'mario@example.com');
  await page.fill('#f-msg', 'Abbiamo un ristorante e vorremmo rifare sito e social.');
  await page.selectOption('#f-type', 'Comunicazione continuativa'); await page.check('input[name=privacy]');
  await page.click('button[type=submit]');
  await page.waitForFunction(() => document.querySelector('#form-status')?.dataset.kind === 'ok');
  ok('conferma solo dopo risposta positiva del server');
  await page.close();
}

console.log('telefono con animazioni attive');
{
  const mctx = await browser.newContext({ viewport: { width: 390, height: 664 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const mp = await mctx.newPage();
  await mp.goto(base + '/', { waitUntil: 'networkidle' });
  // nessun blocco visibile deve finire sopra un altro, in tutta la home
  const overlaps = await mp.evaluate(async () => {
    const found = new Set();
    const H = document.body.scrollHeight;
    for (let y = 0; y < H; y += innerHeight * 0.5) {
      scrollTo(0, y); await new Promise((r) => setTimeout(r, 120));
      const els = [...document.querySelectorAll('main section, main > div, .scrub-card, .pull, .panel-card, .band-card, .work-ph, .soft, .glass')]
        .filter((e) => e.offsetParent && parseFloat(getComputedStyle(e).opacity) > 0.99);
      const rs = els.map((e) => [e, e.getBoundingClientRect()]);
      for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) {
        const [a, ra] = rs[i], [c, rc] = rs[j];
        if (a.contains(c) || c.contains(a)) continue;
        const oy = Math.min(ra.bottom, rc.bottom) - Math.max(ra.top, rc.top), ox = Math.min(ra.right, rc.right) - Math.max(ra.left, rc.left);
        if (oy > 4 && ox > 4) found.add(`${String(a.className).slice(0, 24)} × ${String(c.className).slice(0, 24)}`);
      }
    }
    scrollTo(0, 0);
    return [...found];
  });
  if (overlaps.length) fail('blocchi sovrapposti su telefono: ' + overlaps.join(' | ')); else ok('nessun blocco sovrapposto scorrendo la home');
  // "Perché nel tempo": a ogni passo si apre il punto successivo e tutto resta nello schermo
  const story = await mp.evaluate(async () => {
    const st = document.querySelector('.story'), range = st.offsetHeight - innerHeight, seq = [], bad = [];
    const n = st.querySelectorAll('[data-step]').length;
    for (let i = 0; i < n; i++) {
      scrollTo(0, st.offsetTop + range * (i + 0.5) / n); await new Promise((r) => setTimeout(r, 800));
      const cur = st.querySelector('.snode.cur'), pin = st.querySelector('.story-pin').getBoundingClientRect();
      const card = st.querySelector('.story-card').getBoundingClientRect(), head = st.querySelector('.story-head').getBoundingClientRect();
      seq.push(cur ? cur.querySelector('b').textContent : '-');
      if (head.top < pin.top - 1 || card.bottom > pin.bottom + 1) bad.push(i + 1);
    }
    return { seq, bad, n };
  });
  if (new Set(story.seq).size !== story.n) fail('"Perché nel tempo": passi non in sequenza: ' + story.seq.join(' → '));
  else if (story.bad.length) fail('"Perché nel tempo": il contenuto esce dallo schermo ai passi ' + story.bad.join(', '));
  else ok('"Perché nel tempo": ' + story.seq.join(' → ') + ', tutto nello schermo');
  // nessun tremolio: mentre la sezione è fissata, titolo, scheda e lista non devono muoversi di un pixel
  const jitter = await mp.evaluate(async () => {
    const st = document.querySelector('.story'); const keys = ['.story-title', '.story-card', '.story-list', '.story-detail'];
    const base = {}; let max = 0;
    for (let y = st.offsetTop + 5; y <= st.offsetTop + st.offsetHeight - innerHeight - 5; y += 9) {
      scrollTo(0, y); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      for (const k of keys) { const e = st.querySelector(k).getBoundingClientRect(); const v = [e.top, e.height, e.left];
        if (!base[k]) base[k] = v; else max = Math.max(max, ...v.map((x, i) => Math.abs(x - base[k][i]))); }
    }
    return max;
  });
  if (jitter > 0.5) fail(`"Perché nel tempo" si muove mentre è fissata: ${jitter.toFixed(1)}px`); else ok('"Perché nel tempo" ferma durante lo scorrimento (0 px)');
  await mctx.close();
}

console.log('home desktop');
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const panels = await page.evaluate(() => [...document.querySelectorAll('.panel')].filter((p) => p.offsetParent).map((p) => p.getBoundingClientRect().height));
  if (panels.length < 10 || panels.some((h) => h < 880)) fail('desktop, schermate per punto: ' + JSON.stringify(panels.map(Math.round)));
  else ok(`${panels.length} schermate a tutta altezza su desktop`);
  await page.close();
}

console.log('movimento ridotto');
{
  const ctx2 = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx2.newPage();
  await page.goto(base + '/');
  const hidden = await page.$$eval('[data-rv]', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
  if (hidden) fail(`${hidden} elementi nascosti con prefers-reduced-motion`); else ok('contenuti visibili senza animazioni');
  await ctx2.close();
}

console.log('telefono');
{
  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const page = await ctxM.newPage();
  for (const path of PAGES) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    // aree di tocco: link e pulsanti visibili alti almeno 44px (escluse le caselle dentro un'etichetta e i link nel testo corrente)
    const small = await page.evaluate(() => [...document.querySelectorAll('a[href],button,summary,select,input:not([type=checkbox]):not([type=hidden])')]
      .filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
        return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && !e.closest('.hp,[aria-hidden="true"],.check,.prose p,.legal') && r.height < 44; })
      .map((e) => `${e.tagName.toLowerCase()} "${(e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(e.getBoundingClientRect().height)}px`));
    if (small.length) fail(`${path}: aree di tocco < 44px: ${small.slice(0, 5).join('; ')}`);
    if (AXE) {
      await page.addScriptTag({ content: AXE });
      const v = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] })).violations
        .map((x) => `${x.id} ×${x.nodes.length}: ${x.nodes[0].target.join(' ')}`));
      v.forEach((x) => fail(`${path} 390px axe ${x}`));
    }
  }
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  // home su telefono: compatta, con il primo passo (prima lettura gratuita) presto
  const home = await page.evaluate(() => ({ screens: document.body.scrollHeight / innerHeight, width: innerWidth,
    first: (document.querySelector('#first-t').getBoundingClientRect().top + scrollY) / innerHeight,
    example: (document.querySelector('.example').getBoundingClientRect().top + scrollY) / innerHeight }));
  const rails = await page.evaluate(() => document.querySelectorAll('[data-rail]').length);
  if (rails) fail(`caroselli orizzontali ancora presenti: ${rails}`);
  if (home.width !== 390) fail(`la pagina si allarga oltre lo schermo: ${home.width}px`);
  if (home.screens > 22) fail(`home troppo lunga su telefono: ${home.screens.toFixed(1)} schermate`);
  else ok(`home su telefono: ${home.screens.toFixed(1)} schermate, nessun carosello`);
  if (home.first > 9 || home.example > 7) fail(`primo passo a schermata ${home.first.toFixed(1)}, primo esempio a ${home.example.toFixed(1)}`);
  else ok(`primo esempio reale a schermata ${home.example.toFixed(1)}, prima lettura gratuita a ${home.first.toFixed(1)}`);
  const clipped = await page.evaluate(() => [...document.querySelectorAll('.panel-card,.soft,.glass')].filter((el) => {
    const r = el.getBoundingClientRect(); return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1); }).length);
  if (clipped) fail(`${clipped} card tagliate ai lati`); else ok('nessuna card tagliata ai lati');
  const dockAt = async (sel) => { await page.evaluate((s) => s ? document.querySelector(s).scrollIntoView() : window.scrollTo(0, 0), sel); await page.waitForTimeout(500); return page.evaluate(() => document.getElementById('dock').classList.contains('on')); };
  const top = await dockAt(null), mid = await dockAt('#metodo'), end = await dockAt('.contact-cta');
  if (top || !mid || end) fail(`barra fissa: in alto ${top}, a metà ${mid}, sui contatti ${end}`); else ok('barra fissa: nascosta in alto e sui contatti, visibile a metà pagina');
  await page.goto(base + '/contatti/');
  if (await page.$('#dock')) fail('barra fissa presente nella pagina contatti'); else ok('nessuna barra fissa nella pagina contatti');
  await ctxM.close();
}

await browser.close();
console.log(failures ? `\n${failures} problemi` : '\nTutti i controlli superati');
process.exit(failures ? 1 : 0);
