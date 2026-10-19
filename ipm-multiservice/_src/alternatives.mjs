// Tre direzioni grafiche alternative per la sola homepage.
// Stessi contenuti verificati (content/site.mjs), linguaggio visivo diverso.
// Uso: node _src/alternatives.mjs  →  alternative/{a,b,c}/index.html + alternative/index.html
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { company, areas, method, timeline, figures, services } from './content/site.mjs';
import { esc, svc } from './templates/layout.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = '../../'; // dalla cartella alternative/x/ alla radice del prototipo
const years = new Date().getFullYear() - company.founded;
const arrow = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
const petal = (c) => `var(--petal-${c})`;
const firstLink = (a) => `${P}${a.links[0]}/`;

function page({ key, title, body }) {
  return `<!doctype html>
<html lang="it" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)} · Alternativa ${key.toUpperCase()} | IPM Multiservice (prototipo)</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/png" href="${P}assets/img/favicon.png">
<link rel="stylesheet" href="${P}assets/css/alt-${key}.css">
<script>(function(c){c.classList.remove('no-js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)c.classList.add('motion');setTimeout(function(){if(!c.classList.contains('motion-ready'))c.classList.remove('motion')},2500)})(document.documentElement)</script>
</head>
<body class="alt-${key}">
<a class="skip" href="#main">Vai al contenuto</a>
${body}
<div class="alt-switch" role="navigation" aria-label="Alternative">
  <span>Proposta</span>
  ${['a', 'b', 'c'].map((k) => `<a href="../${k}/"${k === key ? ' aria-current="page"' : ''}>${k.toUpperCase()}</a>`).join('')}
  <a href="../">Tutte</a>
</div>
<script src="${P}assets/js/vendor/gsap.min.js" defer></script>
<script src="${P}assets/js/vendor/ScrollTrigger.min.js" defer></script>
<script src="${P}assets/js/alt.js" defer></script>
</body>
</html>
`;
}

const header = (cta = 'Richiedi preventivo') => `<header class="hd">
  <a class="hd-logo" href="${P}"><img src="${P}assets/img/logo-ipm.png" alt="IPM Multiservice" width="715" height="309"></a>
  <nav class="hd-nav" aria-label="Principale">
    <a href="${P}azienda/">Azienda</a><a href="${P}servizi/">Servizi</a><a href="${P}progetti/">Progetti</a><a href="${P}contatti/">Contatti</a>
  </nav>
  <a class="hd-cta" href="${P}contatti/#preventivo">${cta}</a>
</header>`;

const footer = () => `<footer class="ft">
  <div class="ft-in">
    <p>${esc(company.legalName)} · ${esc(company.address.street)}, ${company.address.zip} ${esc(company.address.city)} (${company.address.province})</p>
    <p><a href="tel:${company.phoneHref}">${company.phone}</a> · <a href="mailto:${company.email}">${company.email}</a></p>
    <p class="ft-flag">Prototipo di redesign — non è il sito ufficiale</p>
  </div>
</footer>`;

// ===================================================================== A
// EDITORIALE: bianco, griglia svizzera, titoli enormi condensati, indice dei servizi.
const altA = () => page({
  key: 'a',
  title: 'Editoriale',
  body: `${header()}
<main id="main">
  <section class="a-hero">
    <div class="a-meta mono"><span>Pulizie industriali</span><span>Multiservizi</span><span>${esc(company.address.city)} (${company.address.province})</span><span>Dal ${company.founded}</span></div>
    <h1 class="a-title" data-lines><span class="ln"><span>Ambienti</span></span><span class="ln"><span>industriali</span></span><span class="ln"><span><em>pronti</em> a</span></span><span class="ln"><span>produrre.</span></span></h1>
    <div class="a-hero-grid">
      <p class="a-lead" data-up>Pulizie tecniche, impianti, pavimenti in resina, imbiancature e disinfestazione per le aziende lombarde. Un solo interlocutore, squadre interne e mezzi di proprietà.</p>
      <div class="a-hero-cta" data-up>
        <a class="a-btn" href="${P}contatti/#preventivo">Richiedi un preventivo ${arrow}</a>
        <a class="a-link" href="tel:${company.phoneHref}">oppure chiama ${company.phone}</a>
      </div>
      <ol class="a-mini-index" data-up>${areas.map((a) => `<li><i style="background:${petal(a.color)}"></i><span class="mono">${a.n}</span> ${esc(a.short)}</li>`).join('')}</ol>
    </div>
    <div class="a-stripes" aria-hidden="true">${areas.map((a) => `<span style="background:${petal(a.color)}"></span>`).join('')}</div>
  </section>

  <section class="a-sec a-intro">
    <p class="a-label mono">01 / Chi siamo</p>
    <p class="a-statement" data-up>Dal ${company.founded} entriamo negli stabilimenti per tenerli puliti, sicuri e in ordine: linee di produzione, impianti, pavimenti, capannoni, uffici. Con persone nostre e attrezzature nostre.</p>
  </section>

  <section class="a-sec a-services" id="servizi">
    <div class="a-sec-head"><p class="a-label mono">02 / Servizi</p><h2 class="a-h2" data-up>Indice delle aree operative</h2></div>
    <ol class="a-index">
      ${areas.map((a) => `<li style="--c:${petal(a.color)}">
        <a href="${firstLink(a)}">
          <span class="a-ix-n mono">${a.n}</span>
          <span class="a-ix-t">${esc(a.title)}</span>
          <span class="a-ix-d">${esc(a.lead)}</span>
          <span class="a-ix-tags mono">${a.tags.map(esc).join(' · ')}</span>
          <span class="a-ix-arrow">${arrow}</span>
        </a>
      </li>`).join('')}
    </ol>
  </section>

  <section class="a-sec a-method">
    <div class="a-sec-head"><p class="a-label mono">03 / Metodo</p><h2 class="a-h2" data-up>Prima si guarda. Poi si interviene.</h2></div>
    <ol class="a-steps">${method.map((m) => `<li data-up><span class="a-step-n">${m.n}</span><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></li>`).join('')}</ol>
  </section>

  <section class="a-sec a-history">
    <div class="a-year" aria-hidden="true" data-up>${company.founded}</div>
    <div class="a-history-grid">
      <div><p class="a-label mono">04 / Storia</p><h2 class="a-h2" data-up>${years} anni dentro le aziende lombarde.</h2></div>
      <ol class="a-tl">${timeline.map((t) => `<li data-up><span class="mono">${esc(t.y)}</span><div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div></li>`).join('')}</ol>
    </div>
    <ul class="a-figs">${figures.map((f) => `<li data-up><b>${f.v}${f.suffix || ''}${f.unit ? `<small>${f.unit}</small>` : ''}</b><span class="mono">${esc(f.label)}</span></li>`).join('')}</ul>
  </section>

  <section class="a-cta">
    <p class="a-label mono">05 / Contatto</p>
    <h2 class="a-cta-t" data-up>Partiamo dal tuo prossimo intervento.</h2>
    <div class="a-cta-row" data-up>
      <a class="a-cta-big" href="mailto:${company.email}">${company.email}</a>
      <a class="a-cta-big" href="tel:${company.phoneHref}">${company.phone}</a>
      <a class="a-btn a-btn-inv" href="${P}contatti/#preventivo">Compila la richiesta ${arrow}</a>
    </div>
  </section>
</main>
${footer()}`,
});

// ===================================================================== B
// COLORE: blu IPM pieno, rombi nei colori dei petali, griglia "bento" colorata.
const diamonds = ['purple', 'teal', 'green', 'yellow', 'red', 'orange', 'blue', 'teal', 'yellow'];
const altB = () => page({
  key: 'b',
  title: 'Colore',
  body: `${header('Preventivo gratuito')}
<main id="main">
  <section class="b-hero">
    <div class="b-hero-in">
      <p class="b-kicker" data-up><span class="b-dot"></span> Pulizie industriali e multiservizi · dal ${company.founded}</p>
      <h1 class="b-title" data-up>Ambienti industriali pronti a produrre.</h1>
      <p class="b-lead" data-up>Pulizie tecniche, impianti, pavimenti in resina, imbiancature e disinfestazione. Un solo interlocutore per tutta l’azienda.</p>
      <div class="b-ctas" data-up>
        <a class="b-btn b-btn-orange" href="${P}contatti/#preventivo">Richiedi un preventivo ${arrow}</a>
        <a class="b-btn b-btn-line" href="#servizi">Scopri i servizi</a>
      </div>
    </div>
    <div class="b-diamonds" aria-hidden="true">
      ${diamonds.map((c, i) => `<span class="b-dm" style="--c:${petal(c)};--i:${i}"></span>`).join('')}
    </div>
    <ul class="b-badges" data-up>
      <li><b>${years}</b><span>anni di attività</span></li>
      <li><b>5</b><span>province servite</span></li>
      <li><b>100%</b><span>mezzi di proprietà</span></li>
    </ul>
  </section>

  <div class="b-marquee" aria-hidden="true"><div class="b-marquee-track">${[...services, ...services].map((s) => `<span>${esc(s.title)}</span><i></i>`).join('')}</div></div>

  <section class="b-sec" id="servizi">
    <div class="b-head">
      <h2 class="b-h2" data-up>Sei aree, un solo referente.</h2>
      <p data-up>Ogni colore è un’area operativa: scegli quella che ti serve o chiedici di combinarle.</p>
    </div>
    <div class="b-bento">
      ${areas.map((a, i) => `<a class="b-tile b-tile-${i + 1}" href="${firstLink(a)}" style="--c:${petal(a.color)}" data-up>
        <span class="b-tile-n">${a.n}</span>
        <span class="b-tile-dm" aria-hidden="true"></span>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.lead)}</p>
        <span class="b-tile-go">${a.links.length > 1 ? `${a.links.length} servizi` : 'Scopri'} ${arrow}</span>
      </a>`).join('')}
    </div>
  </section>

  <section class="b-sec b-method">
    <div class="b-head"><h2 class="b-h2" data-up>Come lavoriamo</h2></div>
    <ol class="b-steps">${method.map((m, i) => `<li data-up style="--c:${petal(['teal', 'yellow', 'orange', 'green'][i])}"><span class="b-step-n">${m.n}</span><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></li>`).join('')}</ol>
  </section>

  <section class="b-history">
    <div class="b-history-in">
      <div class="b-big" data-up><b>${years}</b><span>anni<br>di lavoro</span></div>
      <ol class="b-tl">${timeline.map((t) => `<li data-up><span>${esc(t.y)}</span><p><strong>${esc(t.title)}.</strong> ${esc(t.text)}</p></li>`).join('')}</ol>
    </div>
  </section>

  <section class="b-cta">
    <h2 class="b-h2" data-up>Partiamo dal tuo prossimo intervento.</h2>
    <p data-up>Preventivo gratuito e senza impegno. Rispondiamo da ${esc(company.address.city)}.</p>
    <div class="b-ctas" data-up>
      <a class="b-btn b-btn-orange" href="${P}contatti/#preventivo">Richiedi un preventivo ${arrow}</a>
      <a class="b-btn b-btn-line" href="tel:${company.phoneHref}">Chiama ${company.phone}</a>
    </div>
  </section>
</main>
${footer()}`,
});

// ===================================================================== C
// HERITAGE 1981: carta calda, titoli serif, cornici ad arco, tono da azienda di famiglia.
const altC = () => page({
  key: 'c',
  title: 'Heritage 1981',
  body: `${header()}
<main id="main">
  <section class="c-hero">
    <p class="c-kicker" data-up>— Dal ${company.founded} a ${esc(company.address.city)} —</p>
    <h1 class="c-title" data-up>Da ${years} anni teniamo<br>gli ambienti industriali <em>pronti a produrre.</em></h1>
    <div class="c-hero-row">
      <p class="c-lead" data-up>Pulizie tecniche, impianti, pavimenti in resina, imbiancature e disinfestazione per le aziende della Lombardia. Squadre interne, mezzi di proprietà, un solo interlocutore.</p>
      <figure class="c-arch" data-arch>
        <img src="${P}assets/img/ph/capannone.svg" alt="" width="1600" height="1000">
        <figcaption class="mono">Foto da fornire · squadra IPM al lavoro</figcaption>
      </figure>
      <div class="c-hero-side" data-up>
        <a class="c-btn" href="${P}contatti/#preventivo">Richiedi un preventivo</a>
        <p class="c-sign">Fondata da ${esc(company.founder)}</p>
      </div>
    </div>
  </section>

  <section class="c-sec c-intro">
    <p class="c-drop" data-up>Abbiamo cominciato con le pulizie civili e industriali. Poi, un servizio alla volta, abbiamo aggiunto quello che i clienti ci chiedevano: le forniture nel 1991, le resine, le imbiancature e la disinfestazione nel 1996, il multiservizio nel 2009. Oggi seguiamo gli stabilimenti dalla linea di produzione al tetto del capannone.</p>
  </section>

  <section class="c-sec c-services">
    <h2 class="c-h2" data-up>Cosa facciamo</h2>
    <ol class="c-list">
      ${areas.map((a, i) => `<li data-up style="--c:${petal(a.color)}">
        <span class="c-n">${['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</span>
        <div class="c-list-body">
          <h3><a href="${firstLink(a)}">${esc(a.title)}</a></h3>
          <p>${esc(a.lead)}</p>
          <p class="c-links">${a.links.map((sl) => `<a href="${P}${sl}/">${esc(svc(sl).title)}</a>`).join('<span>·</span>')}</p>
        </div>
        <figure class="c-thumb"><img src="${P}assets/img/ph/${a.ph}.svg" alt="" loading="lazy" width="1600" height="1000"></figure>
      </li>`).join('')}
    </ol>
  </section>

  <section class="c-sec c-method">
    <h2 class="c-h2" data-up>Il nostro metodo</h2>
    <ol class="c-steps">${method.map((m) => `<li data-up><span>${m.n}</span><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></li>`).join('')}</ol>
  </section>

  <section class="c-sec c-history">
    <h2 class="c-h2" data-up>La nostra storia</h2>
    <ol class="c-tl">${timeline.map((t) => `<li data-up><span class="c-tl-y">${esc(t.y)}</span><div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div></li>`).join('')}</ol>
  </section>

  <section class="c-cta">
    <h2 data-up>Partiamo dal tuo prossimo intervento.</h2>
    <p data-up>Raccontaci l’ambiente e il problema: il preventivo è gratuito e senza impegno.</p>
    <div class="c-cta-row" data-up>
      <a class="c-btn c-btn-light" href="${P}contatti/#preventivo">Richiedi un preventivo</a>
      <a href="tel:${company.phoneHref}">${company.phone}</a>
      <a href="mailto:${company.email}">${company.email}</a>
    </div>
  </section>
</main>
${footer()}`,
});

const chooser = () => `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Alternative homepage | IPM Multiservice (prototipo)</title><meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/png" href="../assets/img/favicon.png">
<style>
body{margin:0;font-family:system-ui,sans-serif;background:#F3F1EC;color:#0E1828;padding:48px 16px}
main{max-width:960px;margin:0 auto}h1{font-size:clamp(28px,5vw,48px);margin:0 0 8px}p{color:#3A4356}
ul{list-style:none;padding:0;display:grid;gap:12px;margin-top:32px}
a{display:block;padding:24px;background:#fff;border:1px solid #ddd;text-decoration:none;color:inherit}
a:hover{border-color:#2B4C8A}b{font-size:20px}span{display:block;margin-top:6px;color:#5A6273}
</style></head><body><main>
<h1>Homepage IPM — tre alternative</h1>
<p>Stessi contenuti, tre linguaggi grafici. La versione attuale resta in <a style="display:inline;padding:0;border:0;background:none;color:#2B4C8A" href="../">/ipm-multiservice/</a>.</p>
<ul>
<li><a href="a/"><b>A · Editoriale</b><span>Bianco, griglia svizzera, titoli enormi condensati, indice dei servizi a tutta pagina.</span></a></li>
<li><a href="b/"><b>B · Colore</b><span>Blu IPM pieno, rombi nei colori del logo, griglia di servizi colorata, tono energico.</span></a></li>
<li><a href="c/"><b>C · Heritage 1981</b><span>Carta calda, titoli serif, cornici ad arco: racconta la storia e l’affidabilità.</span></a></li>
</ul></main></body></html>`;

const out = (rel, html) => { const f = join(ROOT, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); console.log('→', rel); };
out('alternative/a/index.html', altA());
out('alternative/b/index.html', altB());
out('alternative/c/index.html', altC());
out('alternative/index.html', chooser());
