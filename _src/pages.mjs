import { site, paths, models, method, services, projects, faqGeneral } from './content.mjs';
import { page, picture, esc, contactCta, quickContacts, personLd } from './layout.mjs';

const U = site.url;
const byPath = Object.fromEntries(paths.map((p) => [p.id, p]));
const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
const cases = projects.filter((p) => p.case);
const others = projects.filter((p) => !p.case);

const crumbLd = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: U + path })),
});
const crumbs = (items) => `<nav aria-label="Percorso"><ol class="crumb label">${items.map(([name, path], i) => i === items.length - 1
  ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${path}">${esc(name)}</a></li>`).join('')}</ol></nav>`;
const faqLd = (list) => ({ '@type': 'FAQPage', mainEntity: list.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const faqHtml = (list) => `<div class="faq">${list.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;
const color = (c) => `var(--${c})`;

function pathCard(p, { link = true, px = null } = {}) {
  const pxAttr = px === null ? '' : ` data-px="${px}"`;
  const inner = `<div class="key"><span class="label">Percorso</span><b>${p.key}</b></div>
    <h3>${esc(p.name)}</h3><p class="sub">${esc(p.title)}</p>
    <p class="pb">${esc(p.problem)}</p>
    <ul>${p.includes.slice(0, 4).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    ${link ? `<span class="more" style="--c:${color(p.color)}">Scopri il percorso <span class="arr" aria-hidden="true">→</span></span>` : ''}`;
  return link
    ? `<a class="path glass" href="/servizi/#${p.id}" style="--c:${color(p.color)}" data-rv${pxAttr}>${inner}</a>`
    : `<div class="path glass" style="--c:${color(p.color)}" data-rv${pxAttr}>${inner}</div>`;
}

function workCard(p, sizes, px = null, lcp = false) {
  // lcp: prima immagine visibile della pagina, niente entrata animata e caricamento prioritario
  return `<a class="work" href="/lavori/${p.slug}/"${lcp ? '' : ' data-rv'}${px === null ? '' : ` data-px="${px}"`}>
  <div class="ph">${picture({ base: p.img, alt: p.imgAlt, w: p.w, h: p.h, sizes, high: lcp })}</div>
  <div class="meta"><span class="label">${esc(p.sector)}${p.place ? ' · ' + esc(p.place) : ''}</span><h3>${esc(p.name)}</h3><p>${esc(p.line)}</p>
  <span class="more">Leggi il caso <span class="arr" aria-hidden="true">→</span></span></div>
</a>`;
}

function otherCard(p) {
  return `<article class="card soft" data-rv>
  <div class="ph">${picture({ base: p.img, alt: p.imgAlt, w: p.w, h: p.h, sizes: '(min-width:900px) 33vw, (min-width:640px) 50vw, 100vw' })}</div>
  <div class="tx"><span class="label">${esc(p.sector)} · ${esc(p.kind)}</span><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p>
  ${p.href ? `<a class="more" href="${p.href}">${esc(p.hrefLabel)} <span class="arr" aria-hidden="true">→</span></a>` : ''}</div>
</article>`;
}





const modelsHtml = `<div class="models">${models.map((m) => `<div class="model" data-rv><span class="label">${m.n}</span><h3>${m.title}</h3><p>${esc(m.text)}</p></div>`).join('')}</div>`;

/* =========================================================== HOME */
// Luci colorate di sfondo: si muovono a profondità diverse (parallasse).
const orbs = (list) => list.map(([c, cls, v]) => `<span class="orb ${cls}" style="--c:var(--${c})" data-px="${v}" aria-hidden="true"></span>`).join('');

// Un caso reale per ogni percorso (stesse associazioni delle pagine servizio).
const pathCase = { direzione: bySlug.carlambroeus, identita: bySlug['brut-merate'], regia: bySlug['p-stop'] };

// Testi aggiuntivi della home: un punto per schermata.
const problemsFull = [
  { n: '01', c: 'cyan', t: 'Sito, social e materiali li hanno fatti persone diverse, in anni diversi.',
    sign: 'Il logo sul furgone non è quello del sito. Il sito racconta un\'azienda, Instagram un\'altra, la brochure una terza. Ognuno ha fatto bene il suo pezzo, ma nessuno ha guardato l\'insieme.',
    change: 'Si parte da una direzione scritta — chi sei, per chi, con quale tono — e ogni materiale nuovo la segue. Chi ti incontra riconosce la stessa azienda ovunque.' },
  { n: '02', c: 'indigo', t: 'Si investe in comunicazione, ma non si sa cosa abbia funzionato.',
    sign: 'Una campagna, un servizio fotografico, un sito nuovo. A fine anno la domanda è sempre la stessa: è servito? Senza un obiettivo deciso prima, non c\'è modo di rispondere.',
    change: 'Prima di spendere si decide cosa deve succedere — più richieste, più prenotazioni dirette, un pubblico diverso — e come misurarlo. Poi si guarda insieme, e si corregge.' },
  { n: '03', c: 'pink', t: 'Nessuno tiene il filo: i social li aggiorna chi ha cinque minuti.',
    sign: 'Si pubblica a ondate: tre post in una settimana, poi niente per un mese. Le decisioni le prende il titolare, la sera, tra un impegno e l\'altro.',
    change: 'Un calendario deciso a inizio mese, una persona che lo porta avanti, il titolare che approva invece di inseguire. La comunicazione resta costante anche nei mesi pieni.' },
];
// Sfondo del Metodo: due luci per fase (colori dalla palette del sito, posizioni dal prototipo).
const methodBg = [['#0a84ff', '#64d2ff', 18, 22, 85, 78], ['#0040dd', '#5e5ce6', 80, 20, 20, 85], ['#5e5ce6', '#bf5af2', 50, 12, 50, 90], ['#bf5af2', '#ff375f', 15, 70, 85, 25], ['#0a84ff', '#30d0c0', 70, 75, 25, 20]];
// Metodo: cinque fasi (testi e parole chiave dal prototipo "Sezione Metodo, scroll v2").
const methodSteps = [
  { t: 'Analisi', c: '#b5ecff', p: 'Studio del settore, dei competitor, del pubblico e degli obiettivi.', chips: ['Settore', 'Competitor', 'Pubblico', 'Obiettivi'] },
  { t: 'Strategia', c: '#9fd0ff', p: 'Definizione del posizionamento, dei messaggi e delle priorità.', chips: ['Posizionamento', 'Messaggi', 'Priorità'] },
  { t: 'Identità', c: '#c4c3ff', p: 'Costruzione dell\'immagine coordinata e del linguaggio del brand.', chips: ['Immagine coordinata', 'Linguaggio'] },
  { t: 'Produzione', c: '#f0c6ff', p: 'Sito web, contenuti, materiali grafici e campagne.', chips: ['Sito web', 'Contenuti', 'Grafica', 'Campagne'] },
  { t: 'Ottimizzazione', c: '#b8f5ef', p: 'Monitoraggio dei risultati e aggiornamento continuo della strategia.', chips: ['Risultati', 'Aggiornamento'] },
];

// Sezione Metodo (unica versione, usata in home e in Chi sono). `skip`: dove porta "Salta".
const methodStage = (skip) => `<section class="method" id="metodo" data-method aria-label="Metodo di lavoro: cinque fasi">
  <div class="m-stage">
    <div class="m-bg" aria-hidden="true">${methodBg.map((b, i) => `<i style="--c1:${b[0]};--c2:${b[1]};--x1:${b[2]}%;--y1:${b[3]}%;--x2:${b[4]}%;--y2:${b[5]}%"${i ? '' : ' class="on"'}></i>`).join('')}</div>
    <div class="m-head"><span class="m-tag">Metodo di lavoro</span><a class="m-skip" href="${skip}">Salta</a></div>
    <div class="m-tl" aria-hidden="true"><div class="m-fill"></div>${methodSteps.map((_, i) => `<i style="top:${i * 25}%"></i>`).join('')}</div>
    <div class="m-center">
      <div class="m-num" aria-hidden="true"><div class="m-col">${methodSteps.map((_, i) => String(i + 1).padStart(2, '0')).join('<br>')}</div></div>
      <ol class="m-steps">
        ${methodSteps.map((st, i) => `<li class="m-step" style="--c:${st.c};--len:${st.t.length}">
          <span class="m-k">Fase ${String(i + 1).padStart(2, '0')}</span>
          <h3>${st.t}</h3>
          <p>${esc(st.p)}</p>
          <div class="m-chips">${st.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>
        </li>`).join('')}
      </ol>
    </div>
    <div class="m-foot" aria-hidden="true"><span class="m-count">01 / 05</span><span>Scorri ↓</span></div>
  </div>
</section>`;

// "Perché nel tempo": un elemento per ogni passo di scorrimento.
const storySteps = [
  { c: 'cyan', t: 'Il sito', s: 'dialoga con i social',
    text: 'È l\'unico spazio online davvero tuo. Chi ti scopre altrove viene qui a decidere: orari, prezzi, prenotazioni, contatti. Se il sito non regge, tutto il resto perde efficacia.',
    how: 'Le tre informazioni che tutti cercano, raggiungibili in due tocchi da telefono.' },
  { c: 'blue', t: 'I social', s: 'dialogano con la fotografia',
    text: 'Sono la voce di tutti i giorni: tengono viva la relazione tra una visita e l\'altra. Funzionano con un ritmo costante e con materiale all\'altezza, non quando c\'è tempo.',
    how: 'Un calendario deciso a inizio mese e format riconoscibili a colpo d\'occhio.' },
  { c: 'indigo', t: 'La fotografia', s: 'dialoga con il brand',
    text: 'È ciò che le persone ricordano. Una linea fotografica coerente — luce, taglio, ambienti — fa riconoscere l\'azienda prima ancora di leggere il nome.',
    how: 'Produzione concentrata in poche giornate, archivio ordinato da usare per mesi.' },
  { c: 'purple', t: 'Il brand', s: 'dialoga con il marketing',
    text: 'Posizionamento, tono di voce, identità visiva: sono le regole che tengono insieme tutto il resto. Senza, ogni fornitore interpreta a modo suo.',
    how: 'Poche regole scritte, che chiunque lavori con te può seguire.' },
  { c: 'pink', t: 'Il marketing', s: 'dialoga con il business',
    text: 'Campagne, newsletter, promozioni: servono a obiettivi concreti — richieste, prenotazioni, clienti che tornano — e si misurano.',
    how: 'Obiettivi decisi prima di spendere, e una lettura dei risultati ogni mese.' },
];

const storyLoop = { c: 'mint', t: 'E il business torna al sito', s: 'il cerchio si chiude',
  text: 'Quello che si impara dalle campagne e dai clienti torna nel sito, nei contenuti, nel modo di raccontarsi. Un sistema, non una serie di consegne: per questo funziona meglio se lo segue una persona sola.' };

const modelsIdeal = ['Non sai ancora da dove partire, o vuoi un parere esterno prima di decidere.', 'Sai già cosa ti serve: un posizionamento, un sito, un\'identità, un servizio fotografico.', 'Vuoi una persona che tenga il filo della comunicazione tutto l\'anno.'];

// Schermata introduttiva di una sezione
const intro = (id, tag, tagColor, title, lead, orbList) => `<section class="intro has-orbs" aria-labelledby="${id}">
  ${orbs(orbList)}
  <div class="wrap" data-rv data-px="-0.08">
    <p class="label tag" style="--t:var(--${tagColor})">${tag}</p>
    <h2 class="h2 h2-xl" id="${id}">${title}</h2>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

export function home() {
  const body = `
<section class="hero hx" aria-labelledby="h1">
  ${orbs([['indigo', 'o-a', 0.45], ['blue', 'o-b', 0.25], ['pink', 'o-c', 0.6], ['cyan', 'o-d', 0.15]])}
  <div class="wrap hx-grid">
    <div class="hx-text" data-px="-0.1">
      <p class="label" data-rv><span class="dot" aria-hidden="true"></span>Marketing strategist e art director · ${site.city}, Brianza</p>
      <h1 class="display" id="h1" data-rv style="--d:80ms">Do una direzione alla comunicazione della tua azienda. <span class="grad">Poi la realizzo.</span></h1>
      <p class="lead" data-rv style="--d:160ms">Sono Andrea Sironi. Aiuto PMI, ristoranti e hotel a decidere <strong>cosa dire, a chi e con quali priorità</strong> — e lo traduco in identità, contenuti, sito e campagne. La stessa persona dalla strategia all'ultimo post.</p>
      <div class="actions" data-rv style="--d:240ms">
        <a class="btn btn-primary" href="/contatti/">Raccontami il progetto <span class="arr" aria-hidden="true">→</span></a>
        <a class="btn btn-glass" href="/servizi/">Come lavoro</a>
      </div>
      <p class="reassure" data-rv style="--d:280ms"><span class="dot" aria-hidden="true"></span>La prima conversazione è gratuita e non impegna. Parli direttamente con me.</p>
    </div>
    <div class="hx-scene hide-m" aria-hidden="true">
      <div class="glass gp gp-1" style="--c:var(--cyan)" data-px="-0.22" data-px-r="-4"><span class="label">01 · Direzione</span><b>Cosa dire, a chi, in che ordine.</b></div>
      <div class="glass gp gp-2" style="--c:var(--purple)" data-px="0.12" data-px-r="3"><span class="label">02 · Identità</span><b>Come appari e come parli.</b></div>
      <div class="glass gp gp-3" style="--c:var(--pink)" data-px="0.34" data-px-r="-2"><span class="label">03 · Regia</span><b>Ogni mese, lo stesso filo.</b></div>
      <div class="glass gp-ring" data-px="-0.4"><i></i></div>
      <div class="glass gp-pill" style="--c:var(--mint)" data-px="0.5"><span class="dot"></span>Merate · Brianza</div>
    </div>
    <dl class="proof glass-lite" data-rv style="--d:320ms">
      <div><dt class="label">Formazione</dt><dd>NABA Milano, Art Direction &amp; Graphic Design</dd></div>
      <div><dt class="label">Ha lavorato con</dt><dd>${cases.map((c) => `<a href="/lavori/${c.slug}/">${esc(c.short)}</a>`).join(', ')}, AL.SIL., Flytech</dd></div>
      <div><dt class="label">Dove</dt><dd>Brianza, Lecco, Monza, Como, Milano e a distanza</dd></div>
    </dl>
  </div>
</section>

<div class="mq-wrap">
  ${orbs([['purple', 'o-e', 0.3], ['cyan', 'o-f', -0.2]])}
  <div class="marquee glass-strip" aria-hidden="true">
    <p data-marquee="-1"><span class="c1">Strategia</span><i>✦</i><span class="o" style="--c:var(--purple)">Identità</span><i>✦</i><span class="c2">Fotografia</span><i>✦</i><span class="o" style="--c:var(--cyan)">Siti web</span><i>✦</i><span class="c3">Social</span><i>✦</i><span class="o" style="--c:var(--pink)">Campagne</span><i>✦</i><span class="c1">Strategia</span><i>✦</i><span class="o" style="--c:var(--purple)">Identità</span></p>
    <p data-marquee="1"><span class="o" style="--c:var(--mint)">Ospitalità</span><i>✦</i><span class="c4">Ristorazione</span><i>✦</i><span class="o" style="--c:var(--blue)">Industria</span><i>✦</i><span class="c2">Tecnologia</span><i>✦</i><span class="o" style="--c:var(--pink)">Brianza</span><i>✦</i><span class="c3">Milano</span><i>✦</i><span class="o" style="--c:var(--mint)">Ospitalità</span><i>✦</i><span class="c4">Ristorazione</span></p>
  </div>
</div>

${intro('pb-t', 'Il punto di partenza', 'cyan', 'Molte aziende comunicano tanto.<br><em>Poche comunicano in una direzione.</em>',
  'Non è quasi mai un problema di creatività. È un problema di direzione: tante cose fatte bene, ma ognuna per conto suo. Tre situazioni che incontro spesso.', [['cyan', 'o-g', 0.35]])}

${problemsFull.map((pb, i) => `<section class="panel has-orbs" aria-labelledby="pb-${i}">
  ${orbs([[pb.c, i % 2 ? 'os-l' : 'os-r', 0.4]])}
  <div class="wrap panel-grid">
    <span class="pnum" style="--c:var(--${pb.c})" data-px="0.22" aria-hidden="true">${pb.n}</span>
    <div class="soft panel-card" style="--c:var(--${pb.c})" data-rv data-px="0.07">
      <p class="label" style="color:color-mix(in srgb,var(--${pb.c}) 75%,#fff)">Situazione ${pb.n}</p>
      <h3 class="panel-title" id="pb-${i}">${esc(pb.t)}</h3>
      <div class="panel-cols">
        <div class="hide-m"><p class="label">Come si riconosce</p><p>${esc(pb.sign)}</p></div>
        <div><p class="label">Cosa cambia</p><p>${esc(pb.change)}</p></div>
      </div>
    </div>
  </div>
</section>`).join('')}

${intro('paths-t', 'Come posso aiutarti', 'blue', 'Tre percorsi.<br><em>Si entra da quello che serve.</em>',
  'La strategia e la realizzazione non sono due servizi separati: sono lo stesso lavoro, fatto dalla stessa persona. Si può entrare da qualsiasi percorso, e spesso uno porta all\'altro.', [['blue', 'o-h', 0.4], ['purple', 'o-i', 0.2]])}

${paths.map((p, i) => `<section class="panel has-orbs" aria-labelledby="path-${p.id}">
  ${orbs([[p.color, i % 2 ? 'os-r' : 'os-l', 0.45], ['pink', i % 2 ? 'os-l' : 'os-r', 0.15]])}
  <div class="wrap panel-grid">
    <span class="pnum" style="--c:${color(p.color)}" data-px="0.22" aria-hidden="true">${p.key}</span>
    <div class="glass panel-card" style="--c:${color(p.color)}" data-rv data-px="0.07">
      <p class="label" style="color:color-mix(in srgb,${color(p.color)} 75%,#fff)">Percorso ${p.key} · ${esc(p.title)}</p>
      <h3 class="panel-title" id="path-${p.id}">${esc(p.name)}</h3>
      <p class="panel-lead">${esc(p.problem)}</p>
      <div class="panel-cols">
        <div class="hide-m"><p class="label">Per chi</p><p>${esc(p.who)}</p><p class="label" style="margin-top:18px">Obiettivo</p><p>${esc(p.goal)}</p></div>
        <div><p class="label">Cosa comprende</p><ul class="ticks">${p.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
      <p class="example"><span class="label">Un esempio</span><a href="/lavori/${pathCase[p.id].slug}/">${esc(pathCase[p.id].name)} →</a></p>
      <div class="panel-foot"><span class="small muted hide-m">${esc(p.mode)}</span>
        <a class="btn btn-glass" href="${p.link}">${esc(p.linkLabel)} <span class="arr" aria-hidden="true">→</span></a></div>
    </div>
  </div>
</section>`).join('')}

<section class="cta-band has-orbs" aria-labelledby="first-t">
  ${orbs([['mint', 'os-r', 0.3]])}
  <div class="wrap"><div class="glass band-card" style="--c:var(--mint)" data-rv>
    <p class="label" style="color:var(--mint)">Il primo passo</p>
    <h2 class="h3 band-title" id="first-t">Non sai da quale percorso partire?</h2>
    <p>Mezz'ora, di persona in Brianza o in videochiamata. Mi racconti la situazione, ti dico cosa vedo e cosa farei. Non si paga e non impegna.</p>
    <a class="btn btn-primary" href="/contatti/" data-where="home-band">Chiedi la prima lettura <span class="arr" aria-hidden="true">→</span></a>
  </div></div>
</section>

${intro('m-t', 'Metodo', 'indigo', 'Prima si decide.<br><em>Poi si produce.</em>',
  'Cinque fasi, in quest\'ordine. Anche nei progetti piccoli l\'analisi c\'è: magari dura un pomeriggio, ma evita di spendere nella direzione sbagliata.', [['indigo', 'o-k', 0.3], ['cyan', 'o-l', 0.5]])}

${methodStage('#perche')}

<section class="story" id="perche" aria-labelledby="band-t">
  <div class="story-pin">
    <span class="orb o-m" style="--c:var(--purple)" aria-hidden="true"></span><span class="orb o-n" style="--c:var(--pink)" aria-hidden="true"></span>
    <div class="wrap story-grid">
      <div class="story-head">
        <p class="label tag" style="--t:var(--purple)">Perché nel tempo</p>
        <h2 class="story-title" id="band-t">Un'identità si costruisce in mesi. <em>Si disperde in settimane.</em></h2>
        <p class="story-intro">Ogni elemento della comunicazione parla con il successivo. Se li segue una persona sola, si rafforzano a vicenda.</p>
      </div>
      <div class="glass story-card" style="--c:var(--indigo)">
        <ol class="story-list" data-dots>
          ${[...storySteps, storyLoop].map((st, i, all) => `<li class="snode" style="--c:var(--${st.c});--c2:var(--${(all[i + 1] || st).c});--i:${i}">
            <span class="sdot" aria-hidden="true"></span><b>${st.t}</b><span class="ssub">${st.s}</span>
          </li>`).join('')}
        </ol>
        <p class="story-close">${esc(storyLoop.text)}</p>
      </div>
    </div>
  </div>
</section>

<section class="panel has-orbs hide-m" aria-labelledby="cmp-t">
  ${orbs([['mint', 'o-p', 0.3], ['pink', 'os-l', 0.2]])}
  <div class="wrap">
    <div data-rv data-px="-0.05">
      <p class="label tag" style="--t:var(--mint)">La differenza</p>
      <h2 class="h2" id="cmp-t">Fornitori separati<br><em>o una regia sola.</em></h2>
      <p class="lead only-m" style="margin-top:18px">Quando la stessa persona segue strategia e produzione, ogni elemento parla con il successivo. È ciò che rende riconoscibile un'azienda nel tempo.</p>
    </div>
    <div class="compare">
      <div class="soft" style="--c:var(--pink)" data-rv><span class="label">Fornitori separati</span><h3>Ognuno fa il suo pezzo</h3><ul><li>Il grafico consegna il logo</li><li>L'agenzia web consegna il sito</li><li>Chi fa i social improvvisa sul materiale che trova</li><li>Il titolare fa da collante</li></ul></div>
      <div class="soft on" style="--c:var(--cyan)" data-rv><span class="label" style="color:var(--cyan)">Una regia sola</span><h3>Un referente tiene il filo</h3><ul><li>La direzione è scritta e condivisa</li><li>Sito, foto e social nascono dalla stessa idea</li><li>Ogni mese si guarda cosa funziona e si corregge</li><li>Il titolare approva, non coordina</li></ul></div>
    </div>
  </div>
</section>

<section class="panel has-orbs" aria-labelledby="me-t">
  ${orbs([['blue', 'o-q', 0.4], ['purple', 'os-r', 0.2]])}
  <div class="wrap profile">
    <figure class="pull soft" style="--c:var(--indigo)" data-rv data-px="0.1"><blockquote>Un posizionamento che resta su carta <span class="grad">non cambia niente.</span></blockquote><figcaption class="label">Andrea Sironi · ${site.city}, Brianza</figcaption></figure>
    <div data-rv data-px="-0.04">
      <p class="label tag" style="--t:var(--cyan)">Chi sono</p>
      <h2 class="h2" id="me-t">Strategist per metodo.<br><em>Art director per formazione.</em></h2>
      <p class="body" style="margin-top:22px">Mi sono formato in Art Direction &amp; Graphic Design alla <strong>NABA di Milano</strong>. Negli anni il mio lavoro si è spostato dal progetto grafico alla <strong>consulenza strategica</strong>, senza lasciare il fare: scrivo il posizionamento, poi scatto le foto, progetto il sito, imposto il piano editoriale.</p>
      <p class="body">Lavoro da indipendente, con base a <strong>Merate</strong>. Parli sempre con chi fa il lavoro.</p>
      <p style="margin-top:26px"><a class="link" href="/chi-sono/">Il mio modo di lavorare →</a></p>
    </div>
  </div>
</section>

<div id="lavori">
${intro('works-t', 'Lavori selezionati', 'purple', 'Il ragionamento,<br><em>prima delle immagini.</em>',
  'Tre progetti nell\'ospitalità e nella ristorazione. Ognuno racconta da dove si partiva, quale intuizione ha guidato il lavoro e cosa è stato realizzato.', [['purple', 'o-r', 0.3], ['cyan', 'o-s', 0.5]])}
${cases.map((c, i) => `<section class="panel panel-work has-orbs" aria-labelledby="w-${c.slug}">
  ${orbs([[['purple', 'blue', 'pink'][i], i % 2 ? 'os-l' : 'os-r', 0.35]])}
  <div class="wrap work-grid${i % 2 ? ' flip' : ''}">
    <div class="work-ph" data-rv data-px="0.05"><span class="ph">${picture({ base: c.img, alt: c.imgAlt, w: c.w, h: c.h, sizes: '(min-width:900px) 45vw, 100vw' })}</span></div>
    <div data-rv data-px="-0.08">
      <p class="label">${esc(c.sector)}${c.place ? ' · ' + esc(c.place) : ''} · ${esc(c.period)}</p>
      <h3 class="panel-title" id="w-${c.slug}">${esc(c.name)}</h3>
      <p class="panel-lead">${esc(c.line)}</p>
      <p class="small muted" style="margin-top:14px">Ruolo: ${esc(c.role)}</p>
      <a class="btn btn-glass" style="margin-top:26px" href="/lavori/${c.slug}/">Leggi il caso <span class="arr" aria-hidden="true">→</span></a>
    </div>
  </div>
</section>`).join('')}
<section class="intro intro-s has-orbs" aria-label="Altri lavori">
  <div class="wrap works-foot" data-rv>
    <p class="body">Anche industria e tecnologia: AL.SIL., Flytech, IPM Multiservice.</p>
    <a class="btn btn-glass" href="/lavori/">Tutti i lavori <span class="arr" aria-hidden="true">→</span></a>
  </div>
</section>
</div>

${intro('mod-t', 'Come si inizia', 'mint', 'Tre modi<br><em>di lavorare insieme.</em>',
  'Dopo la prima conversazione ricevi una proposta scritta: cosa farei, in quanto tempo, quanto costa. Se qualcosa secondo me non ti serve, te lo dico invece di metterlo dentro.', [['mint', 'o-t', 0.35], ['indigo', 'o-u', 0.15]])}
${models.map((m, i) => `<section class="panel panel-s has-orbs" aria-labelledby="mod-${i}">
  ${orbs([[['mint', 'cyan', 'purple'][i], i % 2 ? 'os-l' : 'os-r', 0.4]])}
  <div class="wrap panel-grid">
    <span class="pnum" style="--c:var(--${['mint', 'cyan', 'purple'][i]})" data-px="0.22" aria-hidden="true">${m.n}</span>
    <div class="soft panel-card" style="--c:var(--${['mint', 'cyan', 'purple'][i]})" data-rv data-px="0.07">
      <h3 class="panel-title" id="mod-${i}">${m.title}</h3>
      <p class="panel-lead">${esc(m.text)}</p>
      <p class="panel-get"><span class="label">Ideale se</span>${esc(modelsIdeal[i])}</p>
    </div>
  </div>
</section>`).join('')}

${contactCta({ where: 'home-cta', id: 'contatto' })}`;

  return page({
    path: '/',
    current: '/',
    bodyClass: 'is-home',
    title: 'Andrea Sironi — Marketing strategist e art director in Brianza',
    description: 'Strategia, identità, contenuti e siti per PMI, ristoranti e hotel tra Lecco, Monza e Milano. Definisco la direzione della comunicazione e la realizzo.',
    body,
    ld: [
      personLd(),
      {
        '@type': 'ProfessionalService', '@id': `${U}/#servizio`, name: 'Andrea Sironi — Marketing strategist e art director', url: `${U}/`,
        email: site.email, telephone: site.phone, founder: { '@id': `${U}/#andrea` }, image: `${U}/og/andrea-sironi.jpg`,
        address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.province, addressCountry: 'IT' },
        areaServed: ['Provincia di Lecco', 'Provincia di Monza e della Brianza', 'Provincia di Como', 'Provincia di Bergamo', 'Città metropolitana di Milano'].map((n) => ({ '@type': 'AdministrativeArea', name: n })),
        makesOffer: paths.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${p.name}: ${p.title}`, description: p.goal } })),
      },
      { '@type': 'WebSite', '@id': `${U}/#sito`, url: `${U}/`, name: 'Andrea Sironi', inLanguage: 'it-IT', publisher: { '@id': `${U}/#andrea` } },
    ],
  });
}

/* =========================================================== SERVIZI */
export function servicesIndex() {
  const blocks = paths.map((p) => `
<section class="section has-orbs" id="${p.id}" aria-labelledby="${p.id}-t">
  ${orbs([['purple','os-r',0.45]])}
  <div class="wrap split">
    <div class="sticky" data-rv>
      <p class="label tag" style="--t:${color(p.color)}">Percorso ${p.key}</p>
      <h2 class="h2" id="${p.id}-t">${esc(p.name)}<br><em>${esc(p.title.toLowerCase())}.</em></h2>
      <p class="body" style="margin-top:20px">${esc(p.goal)}</p>
      <div class="actions" style="margin-top:28px">
        <a class="btn btn-ghost" href="${p.link}">${esc(p.linkLabel)} <span class="arr" aria-hidden="true">→</span></a>
        ${p.link2 ? `<a class="btn btn-ghost" href="${p.link2}">${esc(p.link2Label)} <span class="arr" aria-hidden="true">→</span></a>` : ''}
      </div>
    </div>
    <div data-rv style="--c:${color(p.color)}">
      <dl class="facts">
        <div><dt class="label">Il problema</dt><dd>${esc(p.problem)}</dd></div>
        <div><dt class="label">Per chi</dt><dd>${esc(p.who)}</dd></div>
        <div><dt class="label">Obiettivo</dt><dd>${esc(p.goal)}</dd></div>
        <div><dt class="label">Cosa comprende</dt><dd>${p.includes.map(esc).join(' · ')}</dd></div>
        <div><dt class="label">Cosa ricevi</dt><dd>${p.outputs.map(esc).join(' · ')}</dd></div>
        <div><dt class="label">Come</dt><dd>${esc(p.mode)}</dd></div>
      </dl>
      <p style="margin-top:24px"><a class="link" href="/contatti/?tipo=${p.id}">${esc(p.cta)} →</a></p>
    </div>
  </div>
</section>`).join('');

  const body = `
<section class="page-hero" aria-labelledby="h1">
  ${orbs([['indigo','oh-1',0.4],['cyan','oh-2',0.2],['pink','oh-3',0.55]])}
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Servizi', '/servizi/']])}
    <h1 class="h1" id="h1" data-rv>Tre percorsi, <em>un solo referente.</em></h1>
    <p class="lead" data-rv style="--d:100ms">Non serve sapere come si chiamano le cose. Guarda quale problema assomiglia di più al tuo: da lì si parte. Si può entrare da qualsiasi percorso, e spesso uno porta all'altro.</p>
    <h2 class="sr-only">I tre percorsi</h2>
    <div class="paths" style="margin-top:clamp(48px,6vw,72px)">${paths.map((p) => pathCard(p)).join('')}</div>
  </div>
</section>
${blocks}
<section class="section has-orbs" aria-labelledby="mod-t">
  ${orbs([['cyan','os-l',0.2]])}
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--mint)">Come si lavora</p>
      <h2 class="h2" id="mod-t">Tre modi di iniziare,<br><em>senza sorprese.</em></h2>
      <p class="lead">Dopo la prima conversazione ricevi una proposta scritta: cosa faccio, in quanto tempo, quanto costa. Se qualcosa secondo me non ti serve, te lo dico invece di metterlo dentro.</p>
    </div>
    ${modelsHtml}
  </div>
</section>
<section class="section has-orbs" aria-labelledby="faq-t">
  ${orbs([['pink','os-r',0.3]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--cyan)">Domande frequenti</p><h2 class="h2" id="faq-t">Risposte<br><em>senza giri di parole.</em></h2></div>
    <div data-rv>${faqHtml(faqGeneral)}</div>
  </div>
</section>
${contactCta({ where: 'servizi-cta', title: 'Non sai da quale<br><em>percorso partire?</em>', text: 'È normale. Raccontami la situazione: nella prima conversazione capiamo insieme da dove conviene iniziare.' })}`;

  return page({
    path: '/servizi/', current: '/servizi/',
    title: 'Servizi: strategia, identità, sito e social | Andrea Sironi',
    description: 'Tre percorsi per PMI, ristoranti e hotel in Brianza: strategia e posizionamento, identità e strumenti (sito, foto, video), comunicazione continuativa.',
    body,
    ld: [personLd(), crumbLd([['Home', '/'], ['Servizi', '/servizi/']]), faqLd(faqGeneral),
      ...paths.map((p) => ({ '@type': 'Service', name: `${p.name}: ${p.title}`, description: p.goal, provider: { '@id': `${U}/#andrea` }, url: `${U}/servizi/#${p.id}`, areaServed: 'Lombardia' }))],
  });
}

export function servicePage(slug) {
  const s = services[slug];
  const p = byPath[s.path];
  const proof = bySlug[s.proof];
  const others_ = Object.entries(services).filter(([k]) => k !== slug);
  const path = `/servizi/${slug}/`;
  const body = `
<section class="page-hero" aria-labelledby="h1">
  ${orbs([['blue','oh-1',0.4],['purple','oh-2',0.2],['cyan','oh-3',0.55]])}
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Servizi', '/servizi/'], [s.h1, path]])}
    <p class="label tag" style="--t:${color(p.color)}" data-rv>Percorso ${p.key} · ${esc(p.name)}</p>
    <h1 class="h1" id="h1" data-rv>${esc(s.h1)}. <em>${esc(s.lead)}</em></h1>
    <p class="lead" data-rv style="--d:100ms">${esc(s.intro)}</p>
    <div class="actions" data-rv style="--d:180ms">
      <a class="btn btn-primary" href="/contatti/?tipo=${p.id}">${esc(p.cta)} <span class="arr" aria-hidden="true">→</span></a>
      <a class="btn btn-ghost" href="#domande">Domande frequenti</a>
    </div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="when-t">
  ${orbs([['blue','os-l',0.45]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:${color(p.color)}">Quando serve</p><h2 class="h2" id="when-t">Se ti riconosci<br><em>in questi punti.</em></h2></div>
    <ul class="checks" style="--c:${color(p.color)}" data-rv>${s.when.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="inc-t">
  ${orbs([['indigo','os-r',0.2]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:${color(p.color)}">Cosa comprende</p><h2 class="h2" id="inc-t">Il lavoro,<br><em>voce per voce.</em></h2></div>
    <div data-rv>
      <div class="items">${s.items.map(([t, d]) => `<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
      <p class="label" style="margin:40px 0 8px">Cosa ricevi</p>
      <ul class="outputs" style="--c:${color(p.color)}">${s.outputs.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="proof-t">
  ${orbs([['mint','os-l',0.3]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--purple)">Un caso reale</p><h2 class="h2" id="proof-t">Com'è andata<br><em>con ${esc(proof.short)}.</em></h2>
      <p class="body" style="margin-top:20px">${esc(proof.line)}</p></div>
    <div class="works even" style="grid-template-columns:1fr">${workCard(proof, '(min-width:900px) 50vw, 100vw')}</div>
  </div>
</section>

<section class="section has-orbs" id="domande" aria-labelledby="faq-t">
  ${orbs([['purple','os-r',0.45]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--cyan)">Domande frequenti</p><h2 class="h2" id="faq-t">Le cose<br><em>che mi chiedono.</em></h2></div>
    <div data-rv>${faqHtml(s.faq)}</div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="rel-t">
  ${orbs([['cyan','os-l',0.2]])}
  <div class="wrap">
    <div class="section-head" data-rv><p class="label tag">Le altre aree</p><h2 class="h2" id="rel-t">Funzionano insieme,<br><em>non da sole.</em></h2></div>
    <div class="related" data-rv>${others_.map(([k, o]) => `<a href="/servizi/${k}/"><span><b>${esc(o.h1)}</b><span>${esc(o.lead)}</span></span><span class="more">Scopri <span class="arr" aria-hidden="true">→</span></span></a>`).join('')}</div>
  </div>
</section>
${contactCta({ where: `servizio-${slug}` })}`;

  return page({
    path, current: '/servizi/', title: s.seoTitle, description: s.description, body,
    ld: [personLd(), crumbLd([['Home', '/'], ['Servizi', '/servizi/'], [s.h1, path]]), faqLd(s.faq),
      { '@type': 'Service', name: s.h1, serviceType: s.h1, description: s.description, provider: { '@id': `${U}/#andrea` }, url: U + path,
        areaServed: ['Provincia di Lecco', 'Provincia di Monza e della Brianza', 'Città metropolitana di Milano'].map((n) => ({ '@type': 'AdministrativeArea', name: n })) }],
  });
}

/* =========================================================== LAVORI */
export function worksIndex() {
  const body = `
<section class="page-hero" aria-labelledby="h1">
  ${orbs([['purple','oh-1',0.4],['pink','oh-2',0.2],['blue','oh-3',0.55]])}
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Lavori', '/lavori/']])}
    <h1 class="h1" id="h1" data-rv>Lavori. <em>Il ragionamento, prima delle immagini.</em></h1>
    <p class="lead" data-rv style="--d:100ms">Tre casi raccontati per intero — da dove si partiva, l'intuizione, cosa è stato realizzato — e una selezione di altri progetti, con quello che è documentato e niente di più.</p>
  </div>
</section>
<section class="section has-orbs" aria-labelledby="cs-t" style="padding-top:clamp(48px,6vw,80px)">
  ${orbs([['pink','os-r',0.3]])}
  <div class="wrap">
    <h2 class="label tag" id="cs-t" style="--t:var(--purple)">Casi studio · Ospitalità e ristorazione</h2>
    <div class="works even">${cases.map((c, i) => workCard(c, '(min-width:900px) 33vw, 100vw', null, i === 0)).join('')}</div>
  </div>
</section>
<section class="section has-orbs" aria-labelledby="ot-t">
  ${orbs([['blue','os-l',0.45]])}
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--cyan)">Altri lavori · Industria, tecnologia, eventi</p>
      <h2 class="h2" id="ot-t">Progetti singoli,<br><em>settori diversi.</em></h2>
      <p class="lead">Schede essenziali: descrivono il lavoro consegnato. Per conoscere contesto e risultati, chiedimi direttamente.</p>
    </div>
    <div class="cards">${others.map(otherCard).join('')}</div>
  </div>
</section>
${contactCta({ where: 'lavori-cta', title: 'Hai un progetto<br><em>simile in mente?</em>' })}`;

  return page({
    path: '/lavori/', current: '/lavori/',
    title: 'Lavori e casi studio: ristorazione, ospitalità, industria | Andrea Sironi',
    description: 'Casi studio di strategia, art direction e contenuti per Carlambroeus, BRUT Merate e P.Stop, e progetti per AL.SIL., Flytech, BlackMood e IPM Multiservice.',
    body,
    ld: [personLd(), crumbLd([['Home', '/'], ['Lavori', '/lavori/']]),
      { '@type': 'CollectionPage', name: 'Lavori', url: `${U}/lavori/`, hasPart: cases.map((c) => ({ '@type': 'CreativeWork', name: c.name, url: `${U}/lavori/${c.slug}/` })) }],
  });
}

// Corpo di un caso studio. `cs` è definito in cases.mjs.
export function casePage(cs) {
  const p = bySlug[cs.slug];
  const idx = cases.findIndex((c) => c.slug === cs.slug);
  const next = cases[(idx + 1) % cases.length];
  const path = `/lavori/${cs.slug}/`;
  const gal = (g, i) => `<div class="gal-block" data-gal data-rv>
  <div class="gal-head"><div><span class="label">${String(i + 1).padStart(2, '0')}</span><h3>${esc(g.title)}</h3></div>
    <div class="gal-nav"><button type="button" data-prev aria-label="Immagini precedenti: ${esc(g.title)}">←</button><button type="button" data-next aria-label="Immagini successive: ${esc(g.title)}">→</button></div></div>
  <div class="gal" tabindex="0" role="region" aria-label="Galleria: ${esc(g.title)}">${g.items.map(([img, cap]) => `<figure><div class="ph">${picture({ base: img, alt: cap, w: 440, h: 550, sizes: '(min-width:1280px) 24vw, (min-width:900px) 31vw, (min-width:640px) 44vw, 76vw' })}</div><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div>
</div>`;

  const body = `
<article>
<section class="page-hero" aria-labelledby="h1">
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Lavori', '/lavori/'], [p.short, path]])}
    <div class="case-top"><div>
    <p class="label tag" style="--t:var(--purple)" data-rv>Caso studio · ${esc(p.sector)}${p.place ? ' · ' + esc(p.place) : ''}</p>
    <h1 class="h1" id="h1" data-rv>${cs.title}</h1>
    <p class="lead" data-rv style="--d:100ms">${esc(cs.summary)}</p>
    <dl class="sheet-meta glass-lite" data-rv style="--d:160ms">
      <div><dt class="label">Cliente</dt><dd>${esc(p.name)}</dd></div>
      <div><dt class="label">Settore</dt><dd>${esc(p.sector)}</dd></div>
      <div><dt class="label">Periodo</dt><dd>${esc(p.period)}</dd></div>
      <div><dt class="label">Ruolo</dt><dd>${esc(p.role)}</dd></div>
    </dl>
    </div>
    <div class="cover" data-rv>${picture({ base: cs.cover[0], alt: cs.cover[1], w: cs.cover[2], h: cs.cover[3], eager: true, sizes: '(min-width:900px) 40vw, 100vw' })}</div>
    </div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="ctx-t">
  ${orbs([['indigo','os-r',0.2]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--cyan)">Il punto di partenza</p><h2 class="h2" id="ctx-t">${cs.contextTitle}</h2></div>
    <div data-rv>
      <div class="prose">${cs.context.map((t) => `<p>${t}</p>`).join('')}</div>
      ${cs.problems ? `<ul class="notes" style="margin-top:28px">${cs.problems.map(([t, d]) => `<li><b>${esc(t)}</b>${esc(d)}</li>`).join('')}</ul>` : ''}
      <p class="label" style="margin:40px 0 10px">Obiettivo</p>
      <p class="lead">${esc(cs.goal)}</p>
    </div>
  </div>
</section>

<div class="insight has-orbs" data-rv>${orbs([['indigo','os-r',0.35],['pink','os-l',0.2]])}<div class="wrap glass ins-card" style="--c:var(--indigo)">
  <p class="label tag" style="--t:var(--indigo)">L'intuizione</p>
  <blockquote data-px="-0.06">${cs.insight}</blockquote>
  <p>${esc(cs.insightText)}</p>
</div></div>

<section class="section has-orbs" aria-labelledby="work-t">
  ${orbs([['mint','os-l',0.3]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--blue)">Il lavoro</p><h2 class="h2" id="work-t">Cosa ho<br><em>realizzato.</em></h2></div>
    <div class="work-list" data-rv>${cs.work.map(([t, d], i) => `<div class="soft wl" data-px-x="${i % 2 ? 0.05 : -0.05}"><span class="label">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}</div>
  </div>
</section>

${cs.galleries ? `<section class="section has-orbs" aria-labelledby="gal-t">
  ${orbs([['purple','os-r',0.45]])}<div class="wrap">
  <div class="section-head" data-rv><p class="label tag" style="--t:var(--pink)">I materiali</p><h2 class="h2" id="gal-t">${cs.galleryTitle}</h2>${cs.galleryText ? `<p class="lead">${esc(cs.galleryText)}</p>` : ''}</div>
  ${cs.galleries.map(gal).join('')}
</div></section>` : ''}

${cs.extra || ''}

<section class="section has-orbs" aria-labelledby="res-t">
  ${orbs([['cyan','os-l',0.2]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--mint)">Cosa è cambiato</p><h2 class="h2" id="res-t">${cs.resultTitle}</h2></div>
    <div data-rv>
      <div class="prose">${cs.result.map((t) => `<p>${t}</p>`).join('')}</div>
      <ul class="notes" style="margin-top:28px">${cs.deliverables.map(([t, d]) => `<li><b>${esc(t)}</b>${esc(d)}</li>`).join('')}</ul>
      <p class="body small" style="margin-top:22px">${esc(cs.status)}</p>
    </div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="svc-t">
  ${orbs([['pink','os-r',0.3]])}
  <div class="wrap">
    <div class="section-head" data-rv><p class="label tag">Servizi collegati</p><h2 class="h2" id="svc-t">Se ti serve<br><em>qualcosa di simile.</em></h2></div>
    <div class="related" data-rv>${p.services.map((id) => byPath[id]).map((x) => `<a href="/servizi/#${x.id}"><span><b>${esc(x.name)}</b><span>${esc(x.title)}</span></span><span class="more" style="--c:${color(x.color)}">Percorso ${x.key} <span class="arr" aria-hidden="true">→</span></span></a>`).join('')}</div>
    <a class="next-case glass" style="--c:var(--purple)" href="/lavori/${next.slug}/" style="margin-top:clamp(48px,6vw,72px)" data-rv>
      <span><span class="label">Caso successivo</span><b>${esc(next.name)}</b><span class="s">${esc(next.sector)} · ${esc(next.role)}</span></span>
      <span class="arr" aria-hidden="true">→</span>
    </a>
  </div>
</section>
</article>
${contactCta({ where: `caso-${cs.slug}`, title: 'Hai un progetto<br><em>simile in mente?</em>' })}`;

  return page({
    path, current: '/lavori/', title: cs.seoTitle, description: cs.description, body, bodyClass: 'is-case',
    ogImage: '/og/andrea-sironi.jpg',
    ld: [personLd(), crumbLd([['Home', '/'], ['Lavori', '/lavori/'], [p.short, path]]),
      { '@type': 'CreativeWork', name: `${p.name} — caso studio`, about: p.sector, creator: { '@id': `${U}/#andrea` }, url: U + path, image: `${U}${cs.cover[0]}.jpg`, inLanguage: 'it-IT' }],
  });
}

/* =========================================================== CHI SONO */
export function about() {
  const body = `
<section class="page-hero" aria-labelledby="h1">
  ${orbs([['cyan','oh-1',0.4],['indigo','oh-2',0.2],['mint','oh-3',0.55]])}
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Chi sono', '/chi-sono/']])}
    <h1 class="h1" id="h1" data-rv>Andrea Sironi. <em>Strategist per metodo, art director per formazione.</em></h1>
    <p class="lead" data-rv style="--d:100ms">Aiuto le aziende a dare una direzione alla propria comunicazione e poi la realizzo: posizionamento, identità, foto, sito, contenuti. Da indipendente, con base a Merate.</p>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="st-t">
  ${orbs([['blue','os-l',0.45]])}
  <div class="wrap profile">
    <div data-rv>
      <figure class="pull"><blockquote>Un posizionamento che resta su carta <span class="grad">non cambia niente.</span></blockquote><figcaption class="label">Andrea Sironi · ${site.city}, Brianza</figcaption></figure>
      <dl class="facts" style="margin-top:28px">
        <div><dt class="label">Ruolo</dt><dd>Marketing strategist e art director indipendente</dd></div>
        <div><dt class="label">Formazione</dt><dd>${esc(site.education)}</dd></div>
        <div><dt class="label">Base</dt><dd>${site.city} (${site.province}), ${site.region}</dd></div>
        <div><dt class="label">Di persona</dt><dd>Brianza, Lecco, Monza, Como, Bergamo, Milano</dd></div>
        <div><dt class="label">A distanza</dt><dd>Strategia, sito e social in tutto il Nord Italia</dd></div>
      </dl>
    </div>
    <div data-rv>
      <p class="label tag" style="--t:var(--cyan)">Il percorso</p>
      <h2 class="h2" id="st-t">Dal progetto grafico<br><em>alla direzione.</em></h2>
      <div class="prose" style="margin-top:24px">
        <p>Vengo dall'art direction: mi sono formato in Art Direction &amp; Graphic Design alla <strong>NABA di Milano</strong>. Lavorando con locali, hotel e aziende ho visto che il problema raramente era la grafica. Era la direzione: cosa dire, a chi, in che ordine.</p>
        <p>Per questo il mio lavoro si è spostato verso la <strong>consulenza strategica</strong>. Ma non ho smesso di fare: un posizionamento che resta su carta non cambia niente. Così lo porto a terra io — nelle foto, nel sito, nel piano editoriale, nelle campagne.</p>
        <p>Il settore in cui ho lavorato di più è l'<strong>ospitalità e la ristorazione</strong>: una locanda sulle colline di Montevecchia, un ristorante a Merate, un bar che cambia volto quattro volte al giorno. Ho seguito anche aziende <strong>industriali e tecnologiche</strong>, dove il lavoro è rendere chiaro un processo tecnico.</p>
      </div>
    </div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="pr-t">
  ${orbs([['indigo','os-r',0.2]])}
  <div class="wrap">
    <div class="section-head" data-rv><p class="label tag" style="--t:var(--blue)">Come lavoro</p><h2 class="h2" id="pr-t">Quattro principi<br><em>che non cambio.</em></h2></div>
    <div class="problems" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
      <div class="problem soft" data-rv data-px="0" style="--c:var(--cyan)"><span class="label">01</span><p>Rapporto diretto.</p><span>Parli con chi fa il lavoro. Nessun account in mezzo, nessun messaggio che si perde nei passaggi.</span></div>
      <div class="problem soft" data-rv data-px="0.06" style="--c:var(--blue-link);--d:60ms"><span class="label">02</span><p>Prima si decide, poi si spende.</p><span>Ogni lavoro parte da un'analisi, anche breve. Se qualcosa non ti serve, te lo dico.</span></div>
      <div class="problem soft" data-rv data-px="0.12" style="--c:var(--indigo);--d:120ms"><span class="label">03</span><p>Una regia sola.</p><span>Sito, social, foto e materiali nascono dalla stessa idea, quindi si riconoscono.</span></div>
      <div class="problem soft" data-rv data-px="0.18" style="--c:var(--purple);--d:180ms"><span class="label">04</span><p>Strumenti AI, decisioni umane.</p><span>Uso l'intelligenza artificiale per esplorare e produrre più in fretta. Le scelte progettuali restano mie e tue.</span></div>
    </div>
  </div>
</section>

<section class="intro has-orbs" aria-labelledby="m-t">
  ${orbs([['indigo','os-l',0.3]])}
  <div class="wrap" data-rv>
    <p class="label tag" style="--t:var(--indigo)">Metodo</p>
    <h2 class="h2" id="m-t">Cinque fasi,<br><em>in quest'ordine.</em></h2>
    <p class="lead" style="margin-top:20px">L'ordine conta: l'identità viene dopo la strategia, la produzione dopo l'identità. E l'ultima fase riporta alla prima.</p>
  </div>
</section>

${methodStage('#con-chi')}

<section class="section has-orbs" id="con-chi" aria-labelledby="who-t">
  ${orbs([['purple','os-r',0.45]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--pink)">Con chi lavoro meglio</p><h2 class="h2" id="who-t">Aziende che hanno<br><em>qualcosa da dire.</em></h2></div>
    <div data-rv>
      <dl class="facts">
        <div><dt class="label">Soprattutto</dt><dd>PMI e attività senza un ufficio marketing interno, che cercano un referente per strutturare la comunicazione.</dd></div>
        <div><dt class="label">Specializzazione</dt><dd>Ospitalità e ristorazione: locande, hotel, ristoranti, bar, luoghi d'esperienza e brand del territorio. <a class="link" href="/ristoranti/">Cosa faccio per i locali →</a></dd></div>
        <div><dt class="label">Anche</dt><dd>Aziende industriali e tecnologiche che vogliono un'immagine all'altezza della qualità del loro lavoro. <a class="link" href="/pmi/">Cosa faccio per le PMI →</a></dd></div>
      </dl>
      <p class="body" style="margin-top:24px">Funziona meglio quando c'è la disponibilità a decidere insieme e a mantenere le decisioni nel tempo. Funziona peggio quando si cerca solo "qualcuno che faccia i post".</p>
    </div>
  </div>
</section>
${contactCta({ where: 'chi-sono-cta' })}`;

  return page({
    path: '/chi-sono/', current: '/chi-sono/',
    title: 'Chi sono: Andrea Sironi, marketing strategist e art director | Merate',
    description: 'Formazione NABA in Art Direction, base a Merate: aiuto PMI, ristoranti e hotel a dare una direzione alla comunicazione e la realizzo. Metodo e principi di lavoro.',
    body,
    ld: [{ ...personLd(), description: 'Marketing strategist e art director indipendente con base a Merate (LC).' }, crumbLd([['Home', '/'], ['Chi sono', '/chi-sono/']]),
      { '@type': 'ProfilePage', url: `${U}/chi-sono/`, mainEntity: { '@id': `${U}/#andrea` } }],
  });
}

/* =========================================================== CONTATTI */
export function contact() {
  const body = `
<section class="page-hero" aria-labelledby="h1">
  ${orbs([['mint','oh-1',0.4],['blue','oh-2',0.2],['purple','oh-3',0.55]])}
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Contatti', '/contatti/']])}
    <h1 class="h1" id="h1" data-rv>Raccontami <em>dove vuoi arrivare.</em></h1>
    <p class="lead" data-rv style="--d:100ms">Non serve avere le idee chiare: serve avere un problema. Scegli il modo che preferisci.</p>
  </div>
</section>

<section class="section has-orbs" style="padding-top:clamp(48px,6vw,80px)" aria-labelledby="fast-t">
  ${orbs([['cyan','os-l',0.2]])}
  <div class="wrap">
    <h2 class="label tag" id="fast-t" style="--t:var(--mint)">Percorso rapido · Se sai già cosa vuoi chiedere</h2>
    ${quickContacts('contatti-rapido')}
  </div>
</section>

<section class="section has-orbs" aria-labelledby="form-t">
  ${orbs([['pink','os-r',0.3]])}
  <div class="wrap contact-grid">
    <div data-rv>
      <p class="label tag" style="--t:var(--blue)">Percorso guidato</p>
      <h2 class="h2" id="form-t">Racconta il progetto,<br><em>ricevi una prima lettura.</em></h2>
      <div class="glass form-card" style="--c:var(--blue)">
      ${contactForm()}
      </div>
    </div>
    <aside data-rv style="--d:120ms" aria-labelledby="next-t">
      <p class="label tag" style="--t:var(--cyan)">Cosa succede dopo</p>
      <h2 class="h3" id="next-t" style="margin-bottom:22px">Tre passi, senza impegno.</h2>
      <ol class="next-steps">
        <li><span><b>Leggo e rispondo</b>Ti scrivo per fissare una conversazione, oppure ti dico subito se non sono la persona giusta.</span></li>
        <li><span><b>Ci sentiamo mezz'ora</b>Di persona in Brianza o in videochiamata. Non si paga.</span></li>
        <li><span><b>Ricevi una proposta scritta</b>Cosa farei, in quanto tempo, quanto costa. Decidi con calma.</span></li>
      </ol>
      <dl class="facts" style="margin-top:36px">
        <div><dt class="label">Base</dt><dd>${site.city} (${site.province})</dd></div>
        <div><dt class="label">Di persona</dt><dd>Brianza, Lecco, Monza, Como, Bergamo, Milano</dd></div>
      </dl>
    </aside>
  </div>
</section>
<script>
// Preseleziona il tipo di progetto quando si arriva da un percorso (es. /contatti/?tipo=regia)
(function(){var t=new URLSearchParams(location.search).get('tipo');if(!t)return;var o=document.querySelector('#f-type option[data-id="'+t.replace(/[^a-z]/g,'')+'"]');if(o)o.selected=true;})();
</script>`;

  return page({
    path: '/contatti/', current: '/contatti/',
    title: 'Contatti | Andrea Sironi, marketing strategist e art director',
    description: 'Scrivi ad Andrea Sironi per un progetto di strategia, identità, sito o comunicazione continuativa. Email, WhatsApp o modulo guidato. Prima conversazione gratuita.',
    body,
    ld: [personLd(), crumbLd([['Home', '/'], ['Contatti', '/contatti/']]), { '@type': 'ContactPage', url: `${U}/contatti/`, mainEntity: { '@id': `${U}/#andrea` } }],
  });
}

// Modulo di contatto (unico): usato in Contatti e nella landing ristoranti.
function contactForm({ companyLabel = 'Azienda', preset = '', msgHint = 'Cosa fa l\'azienda, cosa non funziona, entro quando ti serve.' } = {}) {
  const typeOpts = [['direzione', 'Strategia e posizionamento'], ['identita', 'Identità, sito, foto e video'], ['regia', 'Comunicazione continuativa'], ['', 'Non lo so ancora']];
  const budgets = ['Fino a 3.000 €', '3.000 – 8.000 €', '8.000 – 20.000 €', 'Oltre 20.000 €', 'Preferisco parlarne'];
  return `      <form class="form" id="contact-form" novalidate data-email="${site.email}" data-wa="${site.whatsapp}" aria-describedby="form-note">
        <div class="field"><label for="f-name">Nome e cognome</label><input class="input" id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="err-name" maxlength="120"><p class="err" id="err-name" aria-live="polite"></p></div>
        <div class="field"><label for="f-company">${companyLabel} <span class="opt">(facoltativo)</span></label><input class="input" id="f-company" name="company" type="text" autocomplete="organization" maxlength="160"></div>
        <div class="field"><label for="f-email">Email</label><input class="input" id="f-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" required aria-describedby="err-email" maxlength="200"><p class="err" id="err-email" aria-live="polite"></p></div>
        <div class="field"><label for="f-type">Di cosa hai bisogno?</label>
          <select class="input" id="f-type" name="type" required aria-describedby="err-type">
            <option value=""${preset ? '' : ' selected'} disabled>Scegli un'opzione</option>
            ${typeOpts.map(([id, l]) => `<option value="${l}" data-id="${id}"${preset && id === preset ? ' selected' : ''}>${l}</option>`).join('')}
          </select><p class="err" id="err-type" aria-live="polite"></p></div>
        <div class="field"><label for="f-msg">Raccontami la situazione</label><p class="hint" id="hint-msg">${msgHint}</p><textarea class="input" id="f-msg" name="message" enterkeyhint="done" required aria-describedby="hint-msg err-message" maxlength="5000"></textarea><p class="err" id="err-message" aria-live="polite"></p></div>
        <div class="field"><label for="f-budget">Investimento indicativo <span class="opt">(facoltativo)</span></label><p class="hint" id="hint-budget">Serve solo a proporti la soluzione più adatta.</p>
          <select class="input" id="f-budget" name="budget" aria-describedby="hint-budget"><option value="">Preferisco non indicarlo</option>${budgets.map((b) => `<option>${b}</option>`).join('')}</select></div>
        <div class="hp" aria-hidden="true"><label for="f-web">Non compilare questo campo</label><input id="f-web" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <div class="field"><label class="check"><input type="checkbox" name="privacy" required aria-describedby="err-privacy"><span>Ho letto l'<a href="/privacy-policy/">informativa privacy</a> e acconsento al trattamento dei dati per ricevere una risposta.</span></label><p class="err" id="err-privacy" aria-live="polite"></p></div>
        <div><button class="btn btn-primary" type="submit">Invia la richiesta</button></div>
        <div class="form-status" id="form-status" role="status" aria-live="polite" tabindex="-1"></div>
        <p class="hint" id="form-note">Uso i dati solo per risponderti. Nessuna newsletter, nessuna cessione a terzi.</p>
      </form>`;
}

/* =========================================================== LANDING RISTORANTI */
// Pagina per acquisire clienti nella ristorazione. Solo lavori reali e dati verificabili.
const restoPains = [
  ['Le foto le fa chi ha tempo, con il telefono.', 'Dal vivo il locale colpisce. Sui social sembra un posto qualunque.'],
  ['Pubblichi a ondate, poi sparisci per settimane.', 'Nei mesi pieni i social sono la prima cosa che salta. E chi ti segue se ne accorge.'],
  ['Il sito è fermo, il menu non è quello vero.', 'Chi ti cerca da telefono vuole tre cose: orari, dove sei, come prenotare. Se non le trova subito, va altrove.'],
  ['Le serate e le novità passano inosservate.', 'Eventi, menu stagionali, piatti nuovi: se li racconti all\'ultimo momento, li vede chi c\'era già.'],
];
const restoServices = [
  { c: 'pink', t: 'Social', s: 'Instagram e Facebook, seguiti tutto l\'anno',
    items: ['Calendario mensile condiviso con te', 'Di solito 2–4 contenuti a settimana, più le storie', 'Format riconoscibili per piatti, serate, novità', 'Risposte ai messaggi e campagne quando serve'],
    link: '/servizi/social-media-manager/' },
  { c: 'purple', t: 'Foto e video', s: 'Mezza giornata nel locale, materiale per mesi',
    items: ['Piatti, sala, bar, persone al lavoro', 'Video brevi verticali per social e sito', 'Senza chiudere: si lavora negli orari morti', 'Archivio ordinato, foto tue per sempre'],
    link: '/servizi/content-creator/' },
  { c: 'blue', t: 'Sito e prenotazioni', s: 'Le tre cose che tutti cercano, in due tocchi',
    items: ['Orari, dove sei, come prenotare', 'Collegamento ai sistemi di prenotazione che usi già', 'Menu aggiornabile da te (WordPress)', 'Titoli e descrizioni giusti per Google'],
    link: '/servizi/sito-web/' },
  { c: 'cyan', t: 'Menu, eventi, clienti', s: 'Quello che fa tornare le persone',
    items: ['Menu stagionali e materiali per la sala', 'Comunicazione delle serate e degli eventi', 'Newsletter e community WhatsApp', 'Un\'identità che si riconosce ovunque'],
    link: '/servizi/strategie-marketing/' },
];
const restoFaq = [
  ['Quanto costa?', 'Dipende da cosa serve al locale: un servizio fotografico, il sito o la gestione dei social tutto l\'anno sono lavori diversi. Dopo la prima conversazione ricevi una proposta scritta con attività, tempi e costo. L\'eventuale budget per le campagne a pagamento resta separato dal mio compenso.'],
  ['Devo chiudere il locale per le foto?', 'No. Si lavora negli orari morti o durante il servizio, a seconda di cosa serve raccontare. Di solito basta mezza giornata.'],
  ['Posso vedere prima cosa viene pubblicato?', 'Sì. Il calendario è condiviso: vedi tutto in anticipo e puoi dire la tua prima della pubblicazione.'],
  ['Devo firmare per un anno?', 'No. Si può partire da un lavoro singolo, per esempio un servizio fotografico o il sito. La gestione continuativa si può interrompere.'],
  ['Chi risponde ai messaggi su Instagram?', 'Se lo concordiamo, me ne occupo io: chi scrive trova qualcuno, non il vuoto. Per prenotazioni e richieste particolari ti passo il contatto.'],
  ['Dove lavori?', 'Base a Merate. Di persona nel locale in Brianza, a Lecco, Monza, Como, Bergamo e Milano. Social e sito si possono seguire anche a distanza.'],
];

export function restaurants() {
  const pc = bySlug['p-stop'], br = bySlug['brut-merate'], ca = bySlug.carlambroeus;
  const proof = [
    [ca, 'Riposizionamento da destinazione gastronomica a rifugio tra le colline: tono di voce, format editoriali ricorrenti, newsletter, sito con le due prenotazioni (tavolo e camera).'],
    [br, 'Una sola grammatica fotografica per sala, cucina, vino e dolci. Social, newsletter, community WhatsApp, menu stagionali e il format evento BRUTLAND.'],
    [pc, 'Un bar che cambia volto quattro volte al giorno: format grafico ricorrente per i piatti, foto in luce naturale per sala e bar, piano editoriale.'],
  ];
  const body = `
<section class="hero hx lp-hero" aria-labelledby="h1">
  ${orbs([['pink', 'o-a', 0.45], ['purple', 'o-b', 0.25], ['cyan', 'o-d', 0.15]])}
  <div class="wrap hx-grid">
    <div class="hx-text">
      ${crumbs([['Home', '/'], ['Per ristoranti e locali', '/ristoranti/']])}
      <p class="label" data-rv><span class="dot" aria-hidden="true"></span>Per ristoranti, bar e locali · Brianza, Lecco, Monza, Milano</p>
      <h1 class="display lp-h1" id="h1" data-rv style="--d:80ms">Il tuo locale è più bello dal vivo che online? <span class="grad">Facciamolo vedere com'è.</span></h1>
      <p class="lead" data-rv style="--d:160ms">Social, foto, sito e menu per ristoranti, bar e locali, <strong>seguiti da una persona sola</strong>: decido con te cosa raccontare, lo produco e lo pubblico. Tu continui a fare il tuo lavoro.</p>
      <div class="actions" data-rv style="--d:240ms">
        <a class="btn btn-primary" href="#richiesta" data-where="resto-hero">Chiedi la prima lettura gratuita <span class="arr" aria-hidden="true">→</span></a>
        <a class="btn btn-glass" href="${site.whatsapp}" target="_blank" rel="noopener" data-where="resto-hero">Scrivimi su WhatsApp</a>
      </div>
      <p class="reassure" data-rv style="--d:280ms"><span class="dot" aria-hidden="true"></span>Mezz'ora nel tuo locale o in videochiamata. Non si paga e non impegna.</p>
    </div>
    <div class="lp-strip" aria-label="Lavori nella ristorazione">
      ${[br, pc, ca].map((c, i) => `<a class="rs rs-${i + 1}" href="/lavori/${c.slug}/" data-px="${[-0.08, 0.1, 0.22][i]}" aria-label="${esc(c.name)}: leggi il caso">
        <span class="ph">${picture({ base: c.img, alt: '', w: c.w, h: c.h, sizes: '(min-width:1024px) 20vw, 33vw' })}</span><span class="rs-cap label">${esc(c.short)}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="pain-t">
  ${orbs([['pink', 'os-r', 0.35]])}
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--pink)">Ti riconosci?</p>
      <h2 class="h2" id="pain-t">Il problema raramente è la cucina.<br><em>È come la racconti.</em></h2>
    </div>
    <div class="lp-pains">${restoPains.map(([t, d], i) => `<div class="soft lp-pain" style="--c:var(--${['pink', 'purple', 'blue', 'cyan'][i]})" data-rv><span class="label">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="serv-t">
  ${orbs([['purple', 'os-l', 0.4], ['blue', 'os-r', 0.2]])}
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--purple)">Cosa faccio per il tuo locale</p>
      <h2 class="h2" id="serv-t">Una regia sola,<br><em>dalla foto al tavolo prenotato.</em></h2>
      <p class="lead">Puoi partire da una cosa sola — un servizio fotografico, il sito — o affidarmi tutta la comunicazione. Quello che conta è che ogni pezzo parli con gli altri.</p>
    </div>
    <div class="lp-services">${restoServices.map((sv) => `<div class="glass lp-service" style="--c:var(--${sv.c})" data-rv>
      <h3>${esc(sv.t)}</h3><p class="sub">${esc(sv.s)}</p>
      <ul class="ticks">${sv.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <a class="more" href="${sv.link}" style="--c:var(--${sv.c})">Approfondisci <span class="arr" aria-hidden="true">→</span></a>
    </div>`).join('')}</div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="fmt-t">
  ${orbs([['cyan', 'os-l', 0.3]])}
  <div class="wrap lp-format">
    <div data-rv>
      <p class="label tag" style="--t:var(--cyan)">Un esempio concreto · P.Stop</p>
      <h2 class="h2" id="fmt-t">Un piatto si dimentica.<br><em><span class="grad">Un format si riconosce.</span></em></h2>
      <p class="body" style="margin-top:20px">Per la cucina di P.Stop ho creato uno schema fisso: la foto del piatto sempre nello stesso taglio, il nome scritto a mano sull'angolo libero, due trattini a incorniciarlo. Cambia il piatto, resta lo schema: ogni nuovo post è riconoscibile come P.Stop prima ancora di leggere il nome.</p>
      <p style="margin-top:24px"><a class="link" href="/lavori/p-stop/">Il caso completo →</a></p>
    </div>
    <div class="lp-pair" data-rv>
      <figure data-px="-0.06"><span class="ph">${picture({ base: '/img/lavori-10-290badd9f6', alt: 'Format grafico P.Stop: tagliatelle al ragù con il nome del piatto scritto a mano', w: 440, h: 550, sizes: '(min-width:900px) 22vw, 45vw' })}</span></figure>
      <figure data-px="0.08"><span class="ph">${picture({ base: '/img/lavori-11-a282702057', alt: 'Lo stesso format applicato all\'insalata greca', w: 440, h: 550, sizes: '(min-width:900px) 22vw, 45vw' })}</span></figure>
    </div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="proof-t">
  ${orbs([['purple', 'os-r', 0.35]])}
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--purple)">Lavori nella ristorazione e nell'ospitalità</p>
      <h2 class="h2" id="proof-t">Tre locali,<br><em>tre problemi diversi.</em></h2>
    </div>
    <div class="lp-proof">${proof.map(([c, t]) => `<a class="lp-case" href="/lavori/${c.slug}/" data-rv>
      <span class="ph">${picture({ base: c.img, alt: c.imgAlt, w: c.w, h: c.h, sizes: '(min-width:900px) 30vw, 100vw' })}</span>
      <span class="label">${esc(c.sector)}${c.place ? ' · ' + esc(c.place) : ''}</span>
      <h3>${esc(c.name)}</h3><p>${esc(t)}</p>
      <span class="more">Leggi il caso <span class="arr" aria-hidden="true">→</span></span></a>`).join('')}</div>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="how-t">
  ${orbs([['mint', 'os-l', 0.3]])}
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--mint)">Come si parte</p>
      <h2 class="h2" id="how-t">Tre passi,<br><em>senza impegno fino al terzo.</em></h2>
    </div>
    <ol class="lp-steps">
      <li class="soft" style="--c:var(--mint)" data-rv><span class="label">01</span><h3>Ci vediamo nel locale</h3><p>Mezz'ora, di persona o in videochiamata. Mi racconti come va, cosa funziona e cosa no. Guardo il locale con gli occhi di un cliente.</p></li>
      <li class="soft" style="--c:var(--cyan)" data-rv><span class="label">02</span><h3>Ricevi una proposta scritta</h3><p>Cosa farei, in che ordine, in quanto tempo, quanto costa. Se qualcosa non ti serve, te lo dico invece di metterlo dentro.</p></li>
      <li class="soft" style="--c:var(--purple)" data-rv><span class="label">03</span><h3>Si parte</h3><p>Di solito dal materiale: un servizio fotografico e il calendario del primo mese. Da lì, un passo alla volta.</p></li>
    </ol>
  </div>
</section>

<section class="section has-orbs" aria-labelledby="faq-t">
  ${orbs([['blue', 'os-r', 0.3]])}
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--cyan)">Domande dei ristoratori</p><h2 class="h2" id="faq-t">Le cose<br><em>che mi chiedono.</em></h2></div>
    <div data-rv>${faqHtml(restoFaq)}</div>
  </div>
</section>

<section class="section has-orbs" id="richiesta" aria-labelledby="req-t">
  ${orbs([['pink', 'os-l', 0.35], ['purple', 'os-r', 0.2]])}
  <div class="wrap contact-grid">
    <div data-rv>
      <p class="label tag" style="--t:var(--pink)">Prima lettura gratuita</p>
      <h2 class="h2" id="req-t">Raccontami il tuo locale.<br><em>Ti dico cosa vedo.</em></h2>
      <div class="glass form-card" style="--c:var(--pink)">
      ${contactForm({ companyLabel: 'Nome del locale', preset: 'regia', msgHint: 'Che locale è, dove si trova, cosa vorresti migliorare: social, foto, sito, eventi.' })}
      </div>
    </div>
    <aside data-rv style="--d:120ms" aria-labelledby="fast-t">
      <p class="label tag" style="--t:var(--mint)">Se preferisci</p>
      <h2 class="h3" id="fast-t" style="margin-bottom:18px">Scrivimi direttamente.</h2>
      ${quickContacts('resto-rapido')}
    </aside>
  </div>
</section>`;

  return page({
    path: '/ristoranti/', current: '', bodyClass: 'is-resto',
    dockHref: '#richiesta', dockLabel: 'Prima lettura gratuita',
    title: 'Social, foto e sito per ristoranti e locali in Brianza | Andrea Sironi',
    description: 'Comunicazione per ristoranti, bar e locali tra Lecco, Monza e Milano: social, servizi fotografici, sito con prenotazioni, menu ed eventi. Prima conversazione gratuita.',
    body,
    ld: [personLd(), crumbLd([['Home', '/'], ['Per ristoranti e locali', '/ristoranti/']]), faqLd(restoFaq),
      { '@type': 'Service', name: 'Comunicazione per ristoranti, bar e locali', serviceType: 'Social media, fotografia, sito web e marketing per la ristorazione',
        provider: { '@id': `${U}/#andrea` }, url: `${U}/ristoranti/`, audience: { '@type': 'BusinessAudience', name: 'Ristoranti, bar e locali' },
        areaServed: ['Provincia di Lecco', 'Provincia di Monza e della Brianza', 'Provincia di Como', 'Provincia di Bergamo', 'Città metropolitana di Milano'].map((n) => ({ '@type': 'AdministrativeArea', name: n })) }],
  });
}

/* =========================================================== LANDING PMI */
// Pagina per acquisire PMI e aziende senza un ufficio marketing. Solo lavori reali e dati verificabili.
export function businesses() {
  const al = bySlug['al-sil'], fl = bySlug.flytech, ipm = bySlug['ipm-multiservice'], ca = bySlug.carlambroeus;
  const pains = ['Il sito non vi rappresenta più.', 'Logo, sito e brochure non si parlano.', 'Il commerciale non ha materiali all\'altezza.'];
  const offer = [
    ['Posizionamento', 'Cosa vi distingue, messo per iscritto.', '/servizi/strategie-marketing/'],
    ['Identità e materiali', 'Logo, brochure, cataloghi, presentazioni.', '/servizi/#identita'],
    ['Sito web', 'Spiega chi siete. Porta richieste.', '/servizi/sito-web/'],
    ['Regia continuativa', 'Un referente, tutto l\'anno.', '/servizi/#regia'],
  ];
  const works = [
    [fl, 'Marchio e logotipo.', '/lavori/'],
    [ipm, 'Prototipo del nuovo sito.', '/ipm-multiservice/'],
    [ca, 'Riposizionamento completo.', `/lavori/${ca.slug}/`],
  ];
  const faq = [
    ['Quanto costa?', 'Dipende da cosa serve. Dopo la prima conversazione ricevete una proposta scritta con attività, tempi e costo.'],
    ['Quanto tempo serve?', 'Analisi e posizionamento: tre-sei settimane. Un sito: quattro-otto.'],
    ['Lavori con aziende tecniche?', 'Sì: industria e tecnologia. Il lavoro è rendere chiaro un processo tecnico a chi deve scegliere un fornitore.'],
    ['Chi segue il lavoro?', 'Io, dall\'inizio alla fine. Parlate sempre con chi fa il lavoro.'],
  ];
  const body = `
<section class="a-hero" aria-labelledby="h1">
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Per PMI', '/pmi/']])}
    <p class="a-eyebrow" data-rv>Per PMI · Brianza, Lecco, Monza, Milano</p>
    <h1 class="a-title" id="h1" data-rv style="--d:80ms">Fate un ottimo lavoro.<br><span class="a-blue">Fatelo capire.</span></h1>
    <p class="a-lead" data-rv style="--d:160ms">Posizionamento, identità, sito e materiali.<br>Un solo referente, dalla strategia alla consegna.</p>
    <div class="a-actions" data-rv style="--d:240ms">
      <a class="btn a-btn" href="#richiesta" data-where="pmi-hero">Prima lettura gratuita</a>
      <a class="a-link" href="mailto:${site.email}" data-where="pmi-hero">Scrivimi ›</a>
    </div>
    <p class="a-note" data-rv style="--d:280ms">30 minuti, in azienda o in videochiamata. Gratis, senza impegno.</p>
  </div>
</section>

<section class="a-sec a-gray" aria-labelledby="pain-t">
  <div class="wrap">
    <h2 class="a-h2" id="pain-t" data-rv>Vi riconoscete?</h2>
    <ul class="a-pains">${pains.map((t, i) => `<li data-rv style="--d:${i * 80}ms">${esc(t)}</li>`).join('')}</ul>
  </div>
</section>

<section class="a-sec" aria-labelledby="serv-t">
  <div class="wrap">
    <h2 class="a-h2" id="serv-t" data-rv>Prima la direzione.<br><span class="a-muted">Poi gli strumenti.</span></h2>
    <div class="a-tiles">${offer.map(([t, d, href], i) => `<a class="a-tile" href="${href}" data-rv style="--d:${i * 60}ms"><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="a-link">Scopri ›</span></a>`).join('')}</div>
  </div>
</section>

<section class="a-sec a-gray" aria-labelledby="ex-t">
  <div class="wrap a-split">
    <div data-rv>
      <p class="a-eyebrow">Un esempio · AL.SIL.</p>
      <h2 class="a-h2" id="ex-t">Un processo tecnico,<br>chiaro in una brochure.</h2>
      <p class="a-text">Verniciatura a polvere su alluminio, spiegata passo per passo a chi deve scegliere un fornitore.</p>
    </div>
    <div class="a-img" data-rv><span class="ph">${picture({ base: al.img, alt: al.imgAlt, w: al.w, h: al.h, sizes: '(min-width:900px) 45vw, 100vw' })}</span></div>
  </div>
</section>

<section class="a-sec" aria-labelledby="w-t">
  <div class="wrap">
    <h2 class="a-h2" id="w-t" data-rv>Altri lavori.</h2>
    <div class="a-works">${works.map(([c, line, href]) => `<a class="a-work" href="${href}" data-rv>
      <span class="ph">${picture({ base: c.img, alt: c.imgAlt, w: c.w, h: c.h, sizes: '(min-width:900px) 30vw, 100vw' })}</span>
      <h3>${esc(c.short || c.name)}</h3><p>${esc(line)}</p></a>`).join('')}</div>
  </div>
</section>

<section class="a-sec a-gray" aria-labelledby="how-t">
  <div class="wrap">
    <h2 class="a-h2" id="how-t" data-rv>Come si parte.</h2>
    <ol class="a-steps">
      <li data-rv><span>1</span><h3>Mezz'ora insieme.</h3><p>Mi raccontate l'azienda.</p></li>
      <li data-rv style="--d:80ms"><span>2</span><h3>Proposta scritta.</h3><p>Cosa, quando, quanto.</p></li>
      <li data-rv style="--d:160ms"><span>3</span><h3>Si parte.</h3><p>Dall'analisi, poi gli strumenti.</p></li>
    </ol>
  </div>
</section>

<section class="a-sec" aria-labelledby="faq-t">
  <div class="wrap a-narrow">
    <h2 class="a-h2" id="faq-t" data-rv>Domande.</h2>
    <div data-rv>${faqHtml(faq)}</div>
  </div>
</section>

<section class="a-sec a-gray" id="richiesta" aria-labelledby="req-t">
  <div class="wrap a-narrow">
    <h2 class="a-h2 a-center" id="req-t" data-rv>Raccontatemi l'azienda.</h2>
    <p class="a-text a-center" data-rv>Vi rispondo con una prima lettura. Gratis.</p>
    <div class="a-form" data-rv>
      ${contactForm({ companyLabel: 'Azienda', preset: 'direzione', msgHint: 'Cosa fate, a chi vendete, cosa vorreste migliorare.' })}
    </div>
    <p class="a-text a-center a-small">Oppure: <a class="a-link" href="mailto:${site.email}" data-where="pmi-rapido">${site.email}</a> · <a class="a-link" href="tel:${site.phone}" data-where="pmi-rapido">${site.phoneLabel}</a></p>
  </div>
</section>`;

  return page({
    path: '/pmi/', current: '', bodyClass: 'is-pmi', light: true,
    dockHref: '#richiesta', dockLabel: 'Prima lettura gratuita',
    title: 'Consulente marketing e comunicazione per PMI in Brianza | Andrea Sironi',
    description: 'Posizionamento, identità, sito e materiali per PMI tra Lecco, Monza e Milano. Un solo referente, dalla strategia alla consegna. Prima lettura gratuita.',
    body,
    ld: [personLd(), crumbLd([['Home', '/'], ['Per PMI', '/pmi/']]), faqLd(faq),
      { '@type': 'Service', name: 'Marketing e comunicazione per PMI', serviceType: 'Posizionamento, identità visiva, sito web e comunicazione per piccole e medie imprese',
        provider: { '@id': `${U}/#andrea` }, url: `${U}/pmi/`, audience: { '@type': 'BusinessAudience', name: 'Piccole e medie imprese' },
        areaServed: ['Provincia di Lecco', 'Provincia di Monza e della Brianza', 'Provincia di Como', 'Provincia di Bergamo', 'Città metropolitana di Milano'].map((n) => ({ '@type': 'AdministrativeArea', name: n })) }],
  });
}

/* =========================================================== LEGALI */
export function privacy() {
  const body = `
<section class="page-hero" aria-labelledby="h1"><div class="wrap">
  ${crumbs([['Home', '/'], ['Privacy', '/privacy-policy/']])}
  <h1 class="h1" id="h1">Informativa privacy</h1>
  <p class="lead">Come vengono trattati i dati personali raccolti da questo sito. Ultimo aggiornamento: 12 novembre 2026.</p>
</div></section>
<section class="section" style="padding-top:48px"><div class="wrap legal prose">
  <h2>Titolare del trattamento</h2>
  <p>Andrea Sironi, ${site.city} (${site.province}), Italia${site.vat ? ' — P.IVA ' + esc(site.vat) : ''}. Contatto: <a href="mailto:${site.email}">${site.email}</a>.</p>

  <h2>Quali dati e perché</h2>
  <p><strong>Modulo di contatto.</strong> Nome, azienda (facoltativa), email, tipo di progetto, investimento indicativo (facoltativo) e testo del messaggio. Servono solo a rispondere alla richiesta e, se lo desideri, a preparare una proposta. Base giuridica: misure precontrattuali adottate su tua richiesta (art. 6, par. 1, lett. b GDPR).</p>
  <p><strong>Richiesta di check-up gratuito.</strong> Nome, nome e città del locale, numero di cellulare e, se lo indichi, il profilo Instagram o il sito. Servono a preparare il check-up e a mandartelo su WhatsApp. Insieme alla richiesta registro da quale annuncio o link sei arrivato (parametri della campagna presenti nell'indirizzo della pagina, ad esempio utm_source), senza cookie, per sapere quali campagne funzionano. Base giuridica: misure precontrattuali adottate su tua richiesta (art. 6, par. 1, lett. b GDPR) e, per l'origine della visita, legittimo interesse a valutare le proprie campagne (art. 6, par. 1, lett. f).</p>
  <p><strong>Email, telefono e WhatsApp.</strong> Se scrivi o chiami direttamente, tratto i dati che mi comunichi per risponderti, con la stessa base giuridica.</p>
  <p><strong>Dati tecnici di navigazione.</strong> Il fornitore di hosting registra automaticamente dati tecnici (indirizzo IP, data, pagina richiesta) per sicurezza e funzionamento del servizio. Base giuridica: legittimo interesse alla sicurezza del sito (art. 6, par. 1, lett. f).</p>
  <p>Il sito <strong>non usa cookie di profilazione né strumenti di statistica</strong>, non ha newsletter e non carica risorse da servizi di terze parti come Google Fonts o social network.</p>

  <h2>Chi riceve i dati</h2>
  <ul>
    <li><strong>Vercel Inc.</strong> — hosting del sito e funzione che riceve il modulo. Può comportare trasferimento verso gli Stati Uniti, sulla base delle garanzie previste dal GDPR (decisione di adeguatezza EU-US Data Privacy Framework o clausole contrattuali standard).</li>
    <li><strong>Resend</strong> — servizio che inoltra via email i messaggi del modulo, quando l'invio automatico è attivo. Anche in questo caso il trasferimento extra UE avviene con le garanzie previste.</li>
    <li><strong>Google (Gmail)</strong> — casella email su cui ricevo e conservo la corrispondenza.</li>
    <li><strong>WhatsApp (Meta)</strong> — solo se scegli tu di scrivermi su WhatsApp, secondo le condizioni di quel servizio.</li>
  </ul>
  <p>I dati non vengono venduti né ceduti a terzi per finalità di marketing.</p>

  <h2>Per quanto tempo</h2>
  <p>Le richieste a cui non segue una collaborazione vengono cancellate entro 24 mesi dall'ultimo contatto. Se la collaborazione parte, i dati sono conservati per la durata del rapporto e per i termini previsti dalla legge (ad esempio, obblighi fiscali). I log tecnici dell'hosting sono conservati per il tempo stabilito dal fornitore.</p>

  <h2>I tuoi diritti</h2>
  <p>Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione, portabilità dei dati e opporti al trattamento basato sul legittimo interesse, scrivendo a <a href="mailto:${site.email}">${site.email}</a>. Hai anche il diritto di proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it/" rel="noopener">garanteprivacy.it</a>).</p>

  <h2>Obbligatorietà</h2>
  <p>I dati del modulo segnati come obbligatori servono per poterti rispondere. Senza, non posso dare seguito alla richiesta. Puoi sempre scegliere di scrivermi direttamente via email.</p>
</div></section>`;
  return page({ path: '/privacy-policy/', title: 'Informativa privacy | Andrea Sironi', description: 'Informativa sul trattamento dei dati personali raccolti tramite il sito di Andrea Sironi: modulo di contatto, email e dati tecnici.', body, noindex: false });
}

export function cookies() {
  const body = `
<section class="page-hero" aria-labelledby="h1"><div class="wrap">
  ${crumbs([['Home', '/'], ['Cookie', '/cookie-policy/']])}
  <h1 class="h1" id="h1">Cookie policy</h1>
  <p class="lead">In breve: questo sito non usa cookie. Ultimo aggiornamento: 2 novembre 2026.</p>
</div></section>
<section class="section" style="padding-top:48px"><div class="wrap legal prose">
  <h2>Cosa usa questo sito</h2>
  <p>Nessun cookie di profilazione, nessun cookie di statistica, nessun pixel di social network o di piattaforme pubblicitarie. Per questo non trovi un banner che chiede il consenso: non c'è nulla da accettare o rifiutare.</p>
  <p>I caratteri tipografici sono ospitati sul sito stesso: aprendo le pagine non vengono contattati server di terze parti come Google Fonts.</p>
  <h2>Link esterni</h2>
  <p>I collegamenti a WhatsApp, email o altri siti portano fuori da questo sito. Da quel momento valgono le regole dei rispettivi servizi.</p>
  <h2>Se cambia qualcosa</h2>
  <p>Se in futuro verranno introdotti strumenti che usano cookie o tecnologie simili, questa pagina sarà aggiornata e, quando la legge lo richiede, ti verrà chiesto il consenso prima di attivarli.</p>
  <p>Per domande: <a href="mailto:${site.email}">${site.email}</a>. Vedi anche l'<a href="/privacy-policy/">informativa privacy</a>.</p>
</div></section>`;
  return page({ path: '/cookie-policy/', title: 'Cookie policy | Andrea Sironi', description: 'Il sito di Andrea Sironi non usa cookie di profilazione né di statistica. Dettagli sugli strumenti utilizzati.', body });
}

export function notFound() {
  const body = `
<section class="page-hero nf" aria-labelledby="h1"><div class="wrap">
  <p class="label tag">Errore 404</p>
  <h1 class="h1" id="h1">Questa pagina <em>non esiste.</em></h1>
  <p class="lead">L'indirizzo è sbagliato o la pagina è stata spostata. Da qui puoi ripartire:</p>
  <div class="actions" style="margin-top:32px"><a class="btn btn-primary" href="/">Torna alla home</a><a class="btn btn-ghost" href="/lavori/">Lavori</a><a class="btn btn-ghost" href="/servizi/">Servizi</a><a class="btn btn-ghost" href="/contatti/">Contatti</a></div>
</div></section>`;
  return page({ path: '/404', title: 'Pagina non trovata | Andrea Sironi', description: 'La pagina richiesta non esiste o è stata spostata. Torna alla home o scopri lavori, servizi e contatti di Andrea Sironi.', body, noindex: true });
}

/* =========================================================== CAMPAGNE: CHECK-UP RISTORANTI */
// Pagina di destinazione degli annunci Meta. Esclusa da Google, senza navigazione:
// un'offerta, le prove, un modulo breve. Nessun cookie: l'origine dell'annuncio
// arriva al server con i parametri UTM e viene scritta nella richiesta.
const CHECKUP = '/ristoranti/check-up/';
const checkupGets = [
  ['Instagram', 'Le foto, la continuità, cosa capisce del locale chi lo vede per la prima volta.'],
  ['Scheda Google', 'Orari, foto, descrizione, recensioni: è la prima cosa che si apre quando cercano dove mangiare.'],
  ['Sito', 'Da telefono: in quanti tocchi si trovano orari, indirizzo e come prenotare.'],
];
const checkupFaq = [
  ['È davvero gratuito?', 'Sì. È il modo più semplice per farti vedere come lavoro. Il video resta tuo anche se poi non lavoriamo insieme.'],
  ['Devo fare una call o un incontro?', 'No. Mi bastano il nome del locale e un numero per mandarti il video. Se dopo vuoi parlarne, ci sentiamo; altrimenti finisce lì.'],
  ['Mi chiamerai per vendermi qualcosa?', 'No. Ti mando il video su WhatsApp. Se ti interessa approfondire, sei tu a scrivermi.'],
  ['Lavori anche fuori dalla Brianza?', 'Il check-up si fa a distanza, quindi ovunque. Per foto e video lavoro soprattutto tra Lecco, Monza, Como, Bergamo e Milano.'],
];

function checkupForm() {
  return `<form class="form" id="checkup-form" novalidate data-email="${site.email}" data-wa="${site.whatsapp}" data-thanks="${CHECKUP}grazie/" aria-describedby="ck-note">
        <div class="field"><label for="c-name">Il tuo nome</label><input class="input" id="c-name" name="name" type="text" autocomplete="name" required aria-describedby="err-c-name" maxlength="120"><p class="err" id="err-c-name" aria-live="polite"></p></div>
        <div class="field"><label for="c-venue">Nome del locale e città</label><input class="input" id="c-venue" name="venue" type="text" autocomplete="organization" required aria-describedby="err-c-venue" maxlength="160" placeholder="Es. Trattoria Da Mario, Merate"><p class="err" id="err-c-venue" aria-live="polite"></p></div>
        <div class="field"><label for="c-phone">Cellulare (WhatsApp)</label><p class="hint" id="hint-c-phone">Ti mando qui il video.</p><input class="input" id="c-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required aria-describedby="hint-c-phone err-c-phone" maxlength="24"><p class="err" id="err-c-phone" aria-live="polite"></p></div>
        <div class="field"><label for="c-link">Instagram o sito del locale <span class="opt">(facoltativo)</span></label><input class="input" id="c-link" name="link" type="text" autocapitalize="off" spellcheck="false" maxlength="200" placeholder="@nomelocale"></div>
        <div class="hp" aria-hidden="true"><label for="c-web">Non compilare questo campo</label><input id="c-web" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <div class="field"><label class="check"><input type="checkbox" name="privacy" required aria-describedby="err-c-privacy"><span>Ho letto l'<a href="/privacy-policy/">informativa privacy</a> e acconsento al trattamento dei dati per ricevere il check-up.</span></label><p class="err" id="err-c-privacy" aria-live="polite"></p></div>
        <div><button class="btn btn-primary btn-block" type="submit">Richiedi il check-up gratuito</button></div>
        <div class="form-status" id="form-status" role="status" aria-live="polite" tabindex="-1"></div>
        <p class="hint" id="ck-note">Uso i dati solo per mandarti il check-up. Nessuna newsletter, nessuna telefonata commerciale.</p>
      </form>`;
}

export function restaurantsCheckup() {
  const pc = bySlug['p-stop'], br = bySlug['brut-merate'], ca = bySlug.carlambroeus;
  const proof = [
    [br, 'Una sola grammatica fotografica per sala, cucina, vino e dolci. Social, newsletter, menu, eventi.'],
    [pc, 'Un bar con quattro momenti della giornata: format grafico ricorrente e foto in luce naturale.'],
    [ca, 'Da destinazione gastronomica a rifugio tra le colline: tono, format editoriali, sito con le prenotazioni.'],
  ];
  const body = `
<section class="hero lp-hero ck-hero has-orbs" aria-labelledby="h1">
  ${orbs([['pink', 'o-a', 0.3], ['purple', 'o-b', 0.15]])}
  <div class="wrap ck-grid">
    <div class="ck-text">
      <p class="label ck-label"><span class="dot" aria-hidden="true"></span>Per ristoranti, bar e locali</p>
      <h1 class="display lp-h1" id="h1">Il tuo locale è più bello dal vivo che online?</h1>
      <div class="glass ck-offer" style="--c:var(--pink)">
        <p class="ck-offer-t"><strong>Check-up gratuito</strong> della presenza online del tuo locale.</p>
        <p class="ck-offer-d">Guardo Instagram, scheda Google e sito come li vede un cliente. Entro 3 giorni lavorativi ti mando un <strong>video di circa 10 minuti</strong> con le 3 cose da sistemare per prime.</p>
      </div>
      <div class="actions"><a class="btn btn-primary" href="#checkup" data-where="ck-hero">Richiedi il check-up <span class="arr" aria-hidden="true">→</span></a></div>
      <p class="reassure"><span class="dot" aria-hidden="true"></span>Nessuna call obbligatoria, nessun impegno.</p>
    </div>
    <div class="ck-photos" aria-label="Alcuni locali con cui ho lavorato">
      ${[[br.img, br.imgAlt, 880, 1100, 'BRUT · Merate'], ['/img/lavori-23-946b552628', 'Risotto ai carciofi fotografato per BRUT', 440, 550, 'BRUT · cucina'], ['/img/lavori-10-290badd9f6', 'Format grafico P.Stop: tagliatelle al ragù con il nome del piatto scritto a mano', 440, 550, 'P.Stop']]
        .map(([base, alt, w, h, cap], i) => `<figure class="ck-ph ck-ph-${i + 1}"><span class="ph">${picture({ base, alt, w, h, sizes: '(min-width:1024px) 16vw, 31vw', eager: true })}</span><figcaption class="label">${esc(cap)}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section ck-sec" aria-labelledby="get-t">
  <div class="wrap">
    <div class="section-head">
      <p class="label tag" style="--t:var(--purple)">Cosa guardo</p>
      <h2 class="h2" id="get-t">Tre posti dove un cliente<br><em>decide se venire da te.</em></h2>
    </div>
    <ol class="lp-steps ck-gets">${checkupGets.map(([t, d], i) => `<li class="soft" style="--c:var(--${['pink', 'purple', 'cyan'][i]})"><span class="label">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
    <p class="ck-note">Nel video ti dico cosa funziona, cosa no e da dove partirei. Il video è tuo, anche se poi non lavoriamo insieme.</p>
  </div>
</section>

<section class="section ck-sec" aria-labelledby="proof-t">
  <div class="wrap">
    <div class="section-head">
      <p class="label tag" style="--t:var(--cyan)">Chi sono</p>
      <h2 class="h2" id="proof-t">Andrea Sironi, comunicazione<br><em>per ristoranti e locali.</em></h2>
      <p class="lead">Seguo social, foto, sito e menu, da solo, dalla strategia alla pubblicazione. Alcuni locali con cui ho lavorato:</p>
    </div>
    <div class="lp-proof">${proof.map(([c, t]) => `<div class="lp-case">
      <span class="ph">${picture({ base: c.img, alt: c.imgAlt, w: c.w, h: c.h, sizes: '(min-width:900px) 30vw, 100vw' })}</span>
      <span class="label">${esc(c.sector)}${c.place ? ' · ' + esc(c.place) : ''}</span>
      <h3>${esc(c.name)}</h3><p>${esc(t)}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section ck-sec has-orbs" id="checkup" aria-labelledby="req-t">
  ${orbs([['pink', 'os-l', 0.25]])}
  <div class="wrap ck-form-grid">
    <div>
      <p class="label tag" style="--t:var(--pink)">Check-up gratuito</p>
      <h2 class="h2" id="req-t">Un minuto per chiederlo.<br><em>Tre giorni per riceverlo.</em></h2>
      <ol class="ck-how">
        <li><b>1</b>Compili il modulo.</li>
        <li><b>2</b>Entro 3 giorni lavorativi ricevi il video su WhatsApp.</li>
        <li><b>3</b>Se vuoi, ne parliamo. Altrimenti finisce lì.</li>
      </ol>
    </div>
    <div class="glass form-card" style="--c:var(--pink)">
      ${checkupForm()}
    </div>
  </div>
</section>

<section class="section ck-sec" aria-labelledby="faq-t">
  <div class="wrap split">
    <div><p class="label tag" style="--t:var(--mint)">Domande</p><h2 class="h2" id="faq-t">Prima che<br><em>tu lo chieda.</em></h2></div>
    <div>${faqHtml(checkupFaq)}</div>
  </div>
</section>`;

  return page({
    path: CHECKUP, current: '', bodyClass: 'is-resto is-campaign', noindex: true,
    bare: { href: '#checkup', label: 'Check-up gratuito' },
    dockHref: '#checkup', dockLabel: 'Richiedi il check-up gratuito',
    title: 'Check-up gratuito per il tuo locale | Andrea Sironi',
    description: 'Instagram, Google e sito del tuo locale visti da un cliente: in 3 giorni lavorativi un video di 10 minuti con le 3 cose da sistemare. Gratis.',
    body, ld: [],
  });
}

export function restaurantsCheckupThanks() {
  const body = `
<section class="hero lp-hero ck-hero ck-thanks has-orbs" aria-labelledby="h1">
  ${orbs([['mint', 'o-a', 0.2], ['purple', 'o-b', 0.15]])}
  <div class="wrap">
    <p class="label ck-label"><span class="dot" aria-hidden="true"></span>Richiesta ricevuta</p>
    <h1 class="display lp-h1" id="h1">Grazie. Il check-up <span class="grad">è in arrivo.</span></h1>
    <p class="lead">Entro 3 giorni lavorativi ti mando il video su WhatsApp, al numero che mi hai indicato. Se nel frattempo vuoi aggiungere qualcosa, scrivimi pure.</p>
    <div class="actions"><a class="btn btn-glass" href="${site.whatsapp}" target="_blank" rel="noopener" data-where="ck-thanks">Scrivimi su WhatsApp</a></div>
    <p class="reassure"><span class="dot" aria-hidden="true"></span>Nel frattempo puoi vedere <a class="link" href="/ristoranti/">come lavoro con i locali</a>.</p>
  </div>
</section>`;
  return page({
    path: CHECKUP + 'grazie/', current: '', bodyClass: 'is-resto is-campaign is-thanks', noindex: true,
    bare: { href: site.whatsapp, label: 'WhatsApp' },
    dockHref: '/ristoranti/', dockLabel: 'Come lavoro con i locali',
    title: 'Richiesta ricevuta | Andrea Sironi',
    description: 'Richiesta di check-up gratuito ricevuta: entro 3 giorni lavorativi arriva il video con le 3 cose da sistemare per il tuo locale.',
    body, ld: [],
  });
}
