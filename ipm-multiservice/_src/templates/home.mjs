// Homepage — scroll storytelling in 7 capitoli (vedi docs/02-ux-storyboard.md).
// Mappatura WordPress: front-page.php + template-parts/home/*.php
import { company, areas, environments, method, timeline, figures, projects } from '../content/site.mjs';
import { layout, ph, btn, esc, icon, svc, ctaBand, localBusinessSchema } from './layout.mjs';
import { quoteForm, contactCards, colorKey } from './partials.mjs';

const years = new Date().getFullYear() - company.founded;

const hero = (p) => `<section class="hero" data-hero aria-labelledby="hero-t">
  <div class="hero-media" data-hero-media>
    ${ph(p, 'hero', 'Video o foto hero: linea produttiva in esercizio, ripresa radente al pavimento', { code: 'PH-00', eager: true, cls: 'ph-hero' })}
  </div>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="hero-guides" aria-hidden="true">
    <span class="guide guide-v" style="--x:33.333%"></span><span class="guide guide-v" style="--x:66.666%"></span>
    <span class="guide-label mono" style="--x:33.333%">A</span><span class="guide-label mono" style="--x:66.666%">B</span>
  </div>
  <div class="wrap hero-content">
    <p class="eyebrow mono hero-eyebrow" data-hero-fade>${colorKey()} Pulizie industriali e multiservizi · Dal ${company.founded}</p>
    <h1 id="hero-t" class="display-xl hero-title" data-split="hero">Ambienti industriali pronti a&nbsp;produrre.</h1>
    <p class="hero-lead" data-hero-fade>Pulizie tecniche, impianti, pavimenti in resina, imbiancature e disinfestazione per le aziende lombarde. Un solo interlocutore, squadre interne e mezzi di proprietà.</p>
    <div class="cta-row" data-hero-fade>
      ${btn(`${p}contatti/#preventivo`, 'Richiedi un preventivo')}
      ${btn('#servizi', 'Esplora i servizi', { variant: 'ghost' })}
    </div>
  </div>
  <div class="hero-meta" data-hero-fade>
    <div class="wrap hero-meta-inner mono">
      <span>${esc(company.address.city)} (${company.address.province})</span>
      <span class="hide-s">${company.geo.label}</span>
      <a class="scroll-cue" href="#mondo"><span>Scorri</span><span class="scroll-cue-line" aria-hidden="true"></span></a>
    </div>
  </div>
</section>`;

const world = (p) => `<section class="world" id="mondo" aria-labelledby="world-t">
  <div class="wrap world-intro">
    <p class="eyebrow mono"><span class="sec-n">02</span> Dove interveniamo</p>
    <h2 id="world-t" class="statement" data-words>Dove si produce, si sporca. Oli, polveri, residui di lavorazione, superfici che si consumano, infestanti che cercano riparo. Il nostro lavoro comincia da qui.</h2>
  </div>
  <div class="world-stage" data-world style="--n:${environments.length}">
    <div class="world-sticky">
      <div class="world-scenes">
        ${environments.map((e, i) => `<div class="scene" data-scene>${ph(p, e.ph, `Ambiente: ${e.title.toLowerCase()}`, { code: 'PH-0' + (i + 1) })}</div>`).join('')}
      </div>
      <div class="world-copy">
        <div class="wrap world-copy-inner">
          <p class="world-count mono" aria-hidden="true"><span data-world-n>01</span> / ${String(environments.length).padStart(2, '0')}</p>
          <ol class="world-list">
            ${environments.map((e) => `<li class="world-item" data-world-item>
              <h3 class="display-m">${esc(e.title)}</h3>
              <p>${esc(e.text)}</p>
            </li>`).join('')}
          </ol>
        </div>
      </div>
      <div class="world-bar" aria-hidden="true"><span data-world-bar></span></div>
    </div>
  </div>
</section>`;

const servicesExplorer = (p) => `<section class="services" id="servizi" aria-labelledby="servizi-t">
  <div class="wrap">
    <header class="sec-head">
      <p class="eyebrow mono"><span class="sec-n">03</span> Servizi</p>
      <h2 id="servizi-t" class="display-l" data-split>Sei aree operative, un&nbsp;solo interlocutore.</h2>
      <p class="lead">Lo stesso referente coordina squadre e tecniche diverse. Meno fornitori da gestire, interventi che si parlano.</p>
    </header>
    <div class="explorer" data-explorer>
      <div class="explorer-visual" aria-hidden="true">
        <div class="ex-frame">
          ${areas.map((a, i) => `<div class="ex-img${i === 0 ? ' is-active' : ''}" data-ex-img style="--c:var(--petal-${a.color})">${ph(p, a.ph, a.phNote, { code: 'PH-1' + (i + 1) })}</div>`).join('')}
          <span class="ex-num display-xl" data-ex-num>01</span>
        </div>
        <ol class="ex-ticks">${areas.map((a, i) => `<li class="${i === 0 ? 'is-active' : ''}" data-ex-tick style="--c:var(--petal-${a.color})"><span class="mono">${a.n}</span></li>`).join('')}</ol>
      </div>
      <ol class="explorer-list">
        ${areas.map((a) => `<li class="ex-item" data-ex-item style="--c:var(--petal-${a.color})">
          <div class="ex-mobile-img">${ph(p, a.ph, a.phNote)}</div>
          <p class="ex-n mono"><span class="ex-dot" aria-hidden="true"></span>${a.n} / 06</p>
          <h3 class="display-m">${esc(a.title)}</h3>
          <p class="ex-lead">${esc(a.lead)}</p>
          <p class="ex-detail mono">${icon.plus}${esc(a.detail)}</p>
          <ul class="ex-links">
            ${a.links.map((sl) => `<li><a href="${p}${sl}/"><span>${esc(svc(sl).title)}</span>${icon.arrow}</a></li>`).join('')}
          </ul>
        </li>`).join('')}
      </ol>
    </div>
  </div>
</section>`;

const methodSec = (p) => `<section class="method" id="metodo" aria-labelledby="metodo-t">
  <div class="wrap">
    <header class="sec-head sec-head-split">
      <div>
        <p class="eyebrow mono"><span class="sec-n">04</span> Il metodo</p>
        <h2 id="metodo-t" class="display-l" data-split>Prima si guarda. Poi si&nbsp;interviene.</h2>
      </div>
      <p class="lead">Ogni stabilimento ha turni, materiali e vincoli di sicurezza diversi. Il lavoro si progetta attorno alla tua attività, non il contrario.</p>
    </header>
    <div class="steps-wrap" data-steps>
    <span class="steps-line" aria-hidden="true"><span data-steps-fill></span></span>
    <ol class="steps">
      ${method.map((m) => `<li class="step" data-step>
        <span class="step-node" aria-hidden="true"></span>
        <p class="step-n mono">Fase ${m.n}</p>
        <h3 class="display-s">${esc(m.title)}</h3>
        <p>${esc(m.text)}</p>
      </li>`).join('')}
    </ol>
    </div>
    <p class="method-note mono">Le fasi descrivono il nostro modo di lavorare: tempi e modalità si definiscono intervento per intervento.</p>
  </div>
</section>`;

const history = (p) => `<section class="history" id="storia" aria-labelledby="storia-t">
  <div class="wrap history-head">
    <p class="eyebrow mono"><span class="sec-n">05</span> Esperienza</p>
    <h2 id="storia-t" class="history-years">
      <span class="hy-n" data-years data-from="${company.founded}">${years}</span>
      <span class="hy-t">anni dentro<br>le aziende lombarde</span>
    </h2>
    <p class="lead">Nata nel ${company.founded} come impresa individuale di pulizie civili e industriali, IPM è cresciuta aggiungendo un servizio alla volta, quando i clienti ne avevano bisogno.</p>
  </div>
  <div class="htrack-wrap" data-htrack-wrap>
    <ol class="htrack" data-htrack>
      ${timeline.map((t, i) => `<li class="hstop${i === timeline.length - 1 ? ' hstop-now' : ''}">
        <p class="hstop-y display-l">${esc(t.y)}</p>
        <span class="hstop-rule" aria-hidden="true"></span>
        <h3 class="display-s">${esc(t.title)}</h3>
        <p>${esc(t.text)}</p>
      </li>`).join('')}
    </ol>
  </div>
  <div class="wrap">
    <ul class="figures">
      ${figures.map((f) => `<li class="fig">
        <p class="fig-v display-l"><span data-count="${f.v}">${f.v}</span>${f.suffix || ''}${f.unit ? `<small>${f.unit}</small>` : ''}</p>
        <p class="fig-l mono">${esc(f.label)}</p>
      </li>`).join('')}
    </ul>
    <p class="history-link">${btn(`${p}azienda/`, 'La storia di IPM', { variant: 'ghost-dark' })}</p>
  </div>
</section>`;

export const caseCard = (p, c, { h = 'h3' } = {}) => `<article class="case case-${c.size}" data-case>
  <a class="case-link" href="${p}progetti/#${c.code.toLowerCase()}" aria-label="${esc(c.type)}: caso da documentare">
    <div class="case-media">${ph(p, c.ph, 'Foto reale dell’intervento (prima / durante / dopo)', { code: c.code })}</div>
    <div class="case-body">
      <p class="case-k mono">${esc(c.code)} · ${esc(c.type)}</p>
      <${h} class="display-s">Caso da documentare</${h}>
      <dl class="case-dl">
        <div><dt class="mono">Problema</dt><dd>Da compilare con IPM</dd></div>
        <div><dt class="mono">Soluzione</dt><dd>Da compilare con IPM</dd></div>
      </dl>
    </div>
  </a>
</article>`;

const work = (p) => `<section class="work" id="progetti" aria-labelledby="progetti-t">
  <div class="wrap">
    <header class="sec-head sec-head-split">
      <div>
        <p class="eyebrow mono"><span class="sec-n">06</span> Progetti e interventi</p>
        <h2 id="progetti-t" class="display-l" data-split>Il lavoro, raccontato dai&nbsp;cantieri.</h2>
      </div>
      <p class="lead">Ogni scheda mostrerà ambiente, problema, soluzione adottata e risultato documentato. <span class="note-inline">Spazi pronti: i casi reali verranno inseriti con foto e dati forniti da IPM.</span></p>
    </header>
    <div class="cases">
      ${projects.slice(0, 4).map((c) => caseCard(p, c)).join('')}
    </div>
    <p class="work-link">${btn(`${p}progetti/`, 'Tutti i progetti', { variant: 'ghost-dark' })}</p>
  </div>
</section>`;

const contact = (p) => `<section class="contact" id="contatto" aria-labelledby="contatto-t">
  <div class="wrap contact-grid">
    <div class="contact-copy">
      <p class="eyebrow mono"><span class="sec-n">07</span> Contatto</p>
      <h2 id="contatto-t" class="display-l" data-split>Partiamo dal tuo prossimo intervento.</h2>
      <p class="lead">Descrivi l’ambiente e il problema da risolvere. Ti ricontattiamo per capire i dettagli e, se serve, per un sopralluogo. Il preventivo è gratuito e senza impegno.</p>
      ${contactCards()}
    </div>
    <div class="contact-form">
      ${quoteForm(p, { id: 'preventivo-home', compact: true })}
    </div>
  </div>
</section>`;

export const home = () => layout({
  path: '',
  title: 'Pulizie industriali e multiservizi in Lombardia | IPM Multiservice',
  desc: 'Pulizie tecniche industriali, pulizia impianti, pavimenti in resina, imbiancature industriali e disinfestazione per aziende di Monza, Lecco, Como, Bergamo e Milano. Dal 1981.',
  bodyClass: 'is-home',
  home: true,
  schema: localBusinessSchema(),
  body: (p) => [hero(p), world(p), servicesExplorer(p), methodSec(p), history(p), work(p), contact(p)].join('\n'),
});
