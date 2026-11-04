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

function pathCard(p, { link = true } = {}) {
  const inner = `<div class="key"><span class="label">Percorso</span><b>${p.key}</b></div>
    <h3>${esc(p.name)}</h3><p class="sub">${esc(p.title)}</p>
    <p class="pb">${esc(p.problem)}</p>
    <ul>${p.includes.slice(0, 4).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    ${link ? `<span class="more" style="--c:${color(p.color)}">Scopri il percorso <span class="arr" aria-hidden="true">→</span></span>` : ''}`;
  return link
    ? `<a class="path" href="/servizi/#${p.id}" style="--c:${color(p.color)}" data-rv>${inner}</a>`
    : `<div class="path" style="--c:${color(p.color)}" data-rv>${inner}</div>`;
}

function workCard(p, sizes) {
  return `<a class="work" href="/lavori/${p.slug}/" data-rv>
  <div class="ph">${picture({ base: p.img, alt: p.imgAlt, w: p.w, h: p.h, sizes })}</div>
  <div class="meta"><span class="label">${esc(p.sector)}${p.place ? ' · ' + esc(p.place) : ''}</span><h3>${esc(p.name)}</h3><p>${esc(p.line)}</p>
  <span class="more">Leggi il caso <span class="arr" aria-hidden="true">→</span></span></div>
</a>`;
}

function otherCard(p) {
  return `<article class="card" data-rv>
  <div class="ph">${picture({ base: p.img, alt: p.imgAlt, w: p.w, h: p.h, sizes: '(min-width:900px) 33vw, (min-width:640px) 50vw, 100vw' })}</div>
  <div class="tx"><span class="label">${esc(p.sector)} · ${esc(p.kind)}</span><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p>
  ${p.href ? `<a class="more" href="${p.href}">${esc(p.hrefLabel)} <span class="arr" aria-hidden="true">→</span></a>` : ''}</div>
</article>`;
}

const systemDiagram = `<div class="system" aria-label="Come si collegano gli elementi della comunicazione">
  <div class="node" style="--c:var(--cyan);--d:.05s"><b>Il sito</b><span>dialoga con i social</span></div>
  <div class="node" style="--c:var(--blue);--d:.2s"><b>I social</b><span>dialogano con la fotografia</span></div>
  <div class="node" style="--c:var(--indigo);--d:.35s"><b>La fotografia</b><span>dialoga con il brand</span></div>
  <div class="node" style="--c:var(--purple);--d:.5s"><b>Il brand</b><span>dialoga con il marketing</span></div>
  <div class="node" style="--c:var(--pink);--d:.65s"><b>Il marketing</b><span>dialoga con il business</span></div>
  <p class="loop label">E il business torna al sito</p>
</div>`;

const stepsHtml = `<div class="steps">${method.map((s) => `<div class="step"><span class="label">${s.n}</span><div><h3>${s.title}</h3><p>${esc(s.text)}</p></div></div>`).join('')}</div>`;

const modelsHtml = `<div class="models rail" data-rail aria-label="Modi di iniziare">${models.map((m) => `<div class="model" data-rv><span class="label">${m.n}</span><h3>${m.title}</h3><p>${esc(m.text)}</p></div>`).join('')}</div>`;

/* =========================================================== HOME */
export function home() {
  const body = `
<section class="hero" aria-labelledby="h1">
  <div class="aurora" aria-hidden="true" data-px="0.35"></div>
  <div class="wrap hero-grid">
    <div class="hero-text">
    <p class="label" data-rv><span class="dot" aria-hidden="true"></span>Marketing strategist e art director · ${site.city}, Brianza</p>
    <h1 class="display" id="h1" data-rv style="--d:80ms">Do una direzione alla comunicazione della tua azienda. <span class="grad">Poi la realizzo.</span></h1>
    <p class="lead" data-rv style="--d:160ms">Sono Andrea Sironi. Aiuto PMI, ristoranti e hotel a decidere <strong>cosa dire, a chi e con quali priorità</strong> — e lo traduco in identità, contenuti, sito e campagne. La stessa persona dalla strategia all'ultimo post.</p>
    <div class="actions" data-rv style="--d:240ms">
      <a class="btn btn-primary" href="/contatti/">Raccontami il progetto <span class="arr" aria-hidden="true">→</span></a>
      <a class="btn btn-ghost" href="/lavori/">Guarda i lavori</a>
    </div>
    <dl class="proof" data-rv style="--d:320ms">
      <div><dt class="label">Formazione</dt><dd>NABA Milano, Art Direction &amp; Graphic Design</dd></div>
      <div><dt class="label">Ha lavorato con</dt><dd>${cases.map((c) => `<a href="/lavori/${c.slug}/">${esc(c.short)}</a>`).join(', ')}, AL.SIL., Flytech</dd></div>
      <div><dt class="label">Dove</dt><dd>Brianza, Lecco, Monza, Como, Milano e a distanza</dd></div>
    </dl>
    </div>
    <div class="hero-stack" aria-label="Tre lavori">
      ${cases.map((c, i) => `<a class="hs hs-${i + 1}" href="/lavori/${c.slug}/" data-px="${[-0.06, 0.1, 0.22][i]}" aria-label="${esc(c.name)}: leggi il caso">
        <span class="hs-ph">${picture({ base: c.img, alt: '', w: c.w, h: c.h, sizes: '(min-width:1024px) 22vw, 1px' })}</span>
        <span class="hs-cap label">${esc(c.short)}</span></a>`).join('')}
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <p data-marquee="-1"><span>Strategia</span><i>·</i><span class="o">Identità</span><i>·</i><span>Fotografia</span><i>·</i><span class="o">Siti web</span><i>·</i><span>Social</span><i>·</i><span class="o">Campagne</span><i>·</i><span>Strategia</span><i>·</i><span class="o">Identità</span></p>
  <p data-marquee="1"><span class="o">Ospitalità</span><i>·</i><span>Ristorazione</span><i>·</i><span class="o">Industria</span><i>·</i><span>Tecnologia</span><i>·</i><span class="o">Brianza</span><i>·</i><span>Milano</span><i>·</i><span class="o">Ospitalità</span><i>·</i><span>Ristorazione</span></p>
</div>

<section class="section" aria-labelledby="pb-t">
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--cyan)">Il punto di partenza</p>
      <h2 class="h2" id="pb-t">Molte aziende comunicano tanto.<br><em>Poche comunicano in una direzione.</em></h2>
    </div>
    <div class="problems rail" data-rail aria-label="Situazioni tipiche">
      <div class="problem" data-rv style="--c:var(--cyan)"><span class="label">01</span><p>Sito, social e materiali li hanno fatti persone diverse, in anni diversi.</p><span>Il risultato è un'azienda che sembra tre aziende. Il cliente non sa cosa aspettarsi.</span></div>
      <div class="problem" data-rv style="--c:var(--indigo);--d:80ms"><span class="label">02</span><p>Si investe in comunicazione, ma non si sa cosa abbia funzionato.</p><span>Senza un obiettivo deciso prima, ogni spesa è un tentativo.</span></div>
      <div class="problem" data-rv style="--c:var(--purple);--d:160ms"><span class="label">03</span><p>Nessuno tiene il filo: i social li aggiorna chi ha cinque minuti.</p><span>Il titolare decide tutto da solo, la sera, tra un impegno e l'altro.</span></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="paths-t">
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--blue)">Come posso aiutarti</p>
      <h2 class="h2" id="paths-t">Tre percorsi.<br><em>Si entra da quello che serve.</em></h2>
      <p class="lead">La strategia e la realizzazione non sono due servizi separati: sono lo stesso lavoro, fatto dalla stessa persona.</p>
    </div>
    <div class="paths rail" data-rail aria-label="I tre percorsi">${paths.map((p) => pathCard(p)).join('')}</div>
  </div>
</section>

<section class="section" id="lavori" aria-labelledby="works-t">
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--purple)">Lavori selezionati</p>
      <h2 class="h2" id="works-t">Il ragionamento,<br><em>prima delle immagini.</em></h2>
      <p class="lead">Ogni caso racconta da dove si partiva, quale intuizione ha guidato il lavoro e cosa è stato realizzato.</p>
    </div>
    <div class="works rail" data-rail aria-label="Lavori selezionati">${cases.map((c, i) => workCard(c, i === 0 ? '(min-width:900px) 58vw, 100vw' : '(min-width:900px) 33vw, 100vw')).join('')}</div>
    <div class="works-foot" data-rv>
      <p class="body small">Anche industria e tecnologia: AL.SIL., Flytech, IPM Multiservice.</p>
      <a class="btn btn-ghost" href="/lavori/">Tutti i lavori <span class="arr" aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<section class="section" id="metodo" aria-labelledby="m-t">
  <div class="wrap split">
    <div class="sticky" data-rv>
      <p class="label tag" style="--t:var(--indigo)">Metodo</p>
      <h2 class="h2" id="m-t">Prima si decide.<br><em>Poi si produce.</em></h2>
      <p class="body" style="margin-top:20px">Cinque fasi, in quest'ordine. Anche nei progetti piccoli l'analisi c'è: magari dura un pomeriggio, ma evita di spendere nella direzione sbagliata.</p>
    </div>
    <div data-rv>${stepsHtml}</div>
  </div>
</section>

<div class="band" aria-labelledby="band-t">
  <div class="band-glow" aria-hidden="true" data-px="0.25"></div>
  <div class="wrap split">
    <div data-rv>
      <p class="label tag" style="--t:var(--purple)">Perché nel tempo</p>
      <h2 class="quote" id="band-t">Un'identità si costruisce in mesi.<br><em>Si disperde in settimane.</em></h2>
      <p class="body" style="margin-top:24px">Quando la stessa persona segue strategia e produzione, ogni elemento parla con il successivo. È ciò che rende riconoscibile un'azienda nel tempo.</p>
    </div>
    <div data-rv style="--d:120ms">${systemDiagram}</div>
  </div>
  <div class="wrap">
    <div class="compare rail" data-rail aria-label="Fornitori separati o una regia sola">
      <div><span class="label">Fornitori separati</span><h3>Ognuno fa il suo pezzo</h3><ul><li>Il grafico consegna il logo</li><li>L'agenzia web consegna il sito</li><li>Chi fa i social improvvisa sul materiale che trova</li><li>Il titolare fa da collante</li></ul></div>
      <div class="on"><span class="label" style="color:var(--cyan)">Una regia sola</span><h3>Un referente tiene il filo</h3><ul><li>La direzione è scritta e condivisa</li><li>Sito, foto e social nascono dalla stessa idea</li><li>Ogni mese si guarda cosa funziona e si corregge</li><li>Il titolare approva, non coordina</li></ul></div>
    </div>
  </div>
</div>

<section class="section" aria-labelledby="me-t">
  <div class="wrap profile">
    <figure class="pull" data-rv><blockquote data-px="-0.05">Un posizionamento che resta su carta <span class="grad">non cambia niente.</span></blockquote><figcaption class="label">Andrea Sironi · ${site.city}, Brianza</figcaption></figure>
    <div data-rv>
      <p class="label tag" style="--t:var(--cyan)">Chi sono</p>
      <h2 class="h2" id="me-t">Strategist per metodo.<br><em>Art director per formazione.</em></h2>
      <p class="body" style="margin-top:22px">Mi sono formato in Art Direction &amp; Graphic Design alla <strong>NABA di Milano</strong>. Negli anni il mio lavoro si è spostato dal progetto grafico alla <strong>consulenza strategica</strong>, senza lasciare il fare: scrivo il posizionamento, poi scatto le foto, progetto il sito, imposto il piano editoriale.</p>
      <p class="body">Lavoro da indipendente, con base a <strong>Merate</strong>. Parli sempre con chi fa il lavoro.</p>
      <p style="margin-top:26px"><a class="link" href="/chi-sono/">Il mio modo di lavorare →</a></p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="mod-t">
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--mint)">Come si inizia</p>
      <h2 class="h2" id="mod-t">Tre modi di lavorare insieme.</h2>
    </div>
    ${modelsHtml}
  </div>
</section>

${contactCta({ where: 'home-cta', id: 'contatto' })}`;

  return page({
    path: '/',
    current: '/',
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
<section class="section" id="${p.id}" aria-labelledby="${p.id}-t">
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
  <div class="aurora" aria-hidden="true" style="opacity:.5"></div>
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Servizi', '/servizi/']])}
    <h1 class="h1" id="h1" data-rv>Tre percorsi, <em>un solo referente.</em></h1>
    <p class="lead" data-rv style="--d:100ms">Non serve sapere come si chiamano le cose. Guarda quale problema assomiglia di più al tuo: da lì si parte. Si può entrare da qualsiasi percorso, e spesso uno porta all'altro.</p>
    <h2 class="sr-only">I tre percorsi</h2>
    <div class="paths rail" data-rail aria-label="I tre percorsi" style="margin-top:clamp(48px,6vw,72px)">${paths.map((p) => pathCard(p)).join('')}</div>
  </div>
</section>
${blocks}
<section class="section" aria-labelledby="mod-t">
  <div class="wrap">
    <div class="section-head" data-rv>
      <p class="label tag" style="--t:var(--mint)">Come si lavora</p>
      <h2 class="h2" id="mod-t">Tre modi di iniziare,<br><em>senza sorprese.</em></h2>
      <p class="lead">Dopo la prima conversazione ricevi una proposta scritta: cosa faccio, in quanto tempo, quanto costa. Se qualcosa secondo me non ti serve, te lo dico invece di metterlo dentro.</p>
    </div>
    ${modelsHtml}
  </div>
</section>
<section class="section" aria-labelledby="faq-t">
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
  <div class="aurora" aria-hidden="true" style="opacity:.45"></div>
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

<section class="section" aria-labelledby="when-t">
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:${color(p.color)}">Quando serve</p><h2 class="h2" id="when-t">Se ti riconosci<br><em>in questi punti.</em></h2></div>
    <ul class="checks" style="--c:${color(p.color)}" data-rv>${s.when.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="inc-t">
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:${color(p.color)}">Cosa comprende</p><h2 class="h2" id="inc-t">Il lavoro,<br><em>voce per voce.</em></h2></div>
    <div data-rv>
      <div class="items">${s.items.map(([t, d]) => `<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
      <p class="label" style="margin:40px 0 8px">Cosa ricevi</p>
      <ul class="outputs" style="--c:${color(p.color)}">${s.outputs.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="proof-t">
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--purple)">Un caso reale</p><h2 class="h2" id="proof-t">Com'è andata<br><em>con ${esc(proof.short)}.</em></h2>
      <p class="body" style="margin-top:20px">${esc(proof.line)}</p></div>
    <div class="works even" style="grid-template-columns:1fr">${workCard(proof, '(min-width:900px) 50vw, 100vw')}</div>
  </div>
</section>

<section class="section" id="domande" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--cyan)">Domande frequenti</p><h2 class="h2" id="faq-t">Le cose<br><em>che mi chiedono.</em></h2></div>
    <div data-rv>${faqHtml(s.faq)}</div>
  </div>
</section>

<section class="section" aria-labelledby="rel-t">
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
  <div class="aurora" aria-hidden="true" style="opacity:.45"></div>
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Lavori', '/lavori/']])}
    <h1 class="h1" id="h1" data-rv>Lavori. <em>Il ragionamento, prima delle immagini.</em></h1>
    <p class="lead" data-rv style="--d:100ms">Tre casi raccontati per intero — da dove si partiva, l'intuizione, cosa è stato realizzato — e una selezione di altri progetti, con quello che è documentato e niente di più.</p>
  </div>
</section>
<section class="section" aria-labelledby="cs-t" style="padding-top:clamp(48px,6vw,80px)">
  <div class="wrap">
    <h2 class="label tag" id="cs-t" style="--t:var(--purple)">Casi studio · Ospitalità e ristorazione</h2>
    <div class="works even">${cases.map((c) => workCard(c, '(min-width:900px) 33vw, 100vw')).join('')}</div>
  </div>
</section>
<section class="section" aria-labelledby="ot-t">
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
    <dl class="sheet-meta" data-rv style="--d:160ms">
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

<section class="section" aria-labelledby="ctx-t">
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

<div class="insight" data-rv><div class="wrap">
  <p class="label tag" style="--t:var(--indigo)">L'intuizione</p>
  <blockquote data-px="-0.06">${cs.insight}</blockquote>
  <p>${esc(cs.insightText)}</p>
</div></div>

<section class="section" aria-labelledby="work-t">
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--blue)">Il lavoro</p><h2 class="h2" id="work-t">Cosa ho<br><em>realizzato.</em></h2></div>
    <div class="work-list" data-rv>${cs.work.map(([t, d], i) => `<div><span class="label">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}</div>
  </div>
</section>

${cs.galleries ? `<section class="section" aria-labelledby="gal-t"><div class="wrap">
  <div class="section-head" data-rv><p class="label tag" style="--t:var(--pink)">I materiali</p><h2 class="h2" id="gal-t">${cs.galleryTitle}</h2>${cs.galleryText ? `<p class="lead">${esc(cs.galleryText)}</p>` : ''}</div>
  ${cs.galleries.map(gal).join('')}
</div></section>` : ''}

${cs.extra || ''}

<section class="section" aria-labelledby="res-t">
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--mint)">Cosa è cambiato</p><h2 class="h2" id="res-t">${cs.resultTitle}</h2></div>
    <div data-rv>
      <div class="prose">${cs.result.map((t) => `<p>${t}</p>`).join('')}</div>
      <ul class="notes" style="margin-top:28px">${cs.deliverables.map(([t, d]) => `<li><b>${esc(t)}</b>${esc(d)}</li>`).join('')}</ul>
      <p class="body small" style="margin-top:22px">${esc(cs.status)}</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="svc-t">
  <div class="wrap">
    <div class="section-head" data-rv><p class="label tag">Servizi collegati</p><h2 class="h2" id="svc-t">Se ti serve<br><em>qualcosa di simile.</em></h2></div>
    <div class="related" data-rv>${p.services.map((id) => byPath[id]).map((x) => `<a href="/servizi/#${x.id}"><span><b>${esc(x.name)}</b><span>${esc(x.title)}</span></span><span class="more" style="--c:${color(x.color)}">Percorso ${x.key} <span class="arr" aria-hidden="true">→</span></span></a>`).join('')}</div>
    <a class="next-case" href="/lavori/${next.slug}/" style="margin-top:clamp(48px,6vw,72px)" data-rv>
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
  <div class="aurora" aria-hidden="true" style="opacity:.5"></div>
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Chi sono', '/chi-sono/']])}
    <h1 class="h1" id="h1" data-rv>Andrea Sironi. <em>Strategist per metodo, art director per formazione.</em></h1>
    <p class="lead" data-rv style="--d:100ms">Aiuto le aziende a dare una direzione alla propria comunicazione e poi la realizzo: posizionamento, identità, foto, sito, contenuti. Da indipendente, con base a Merate.</p>
  </div>
</section>

<section class="section" aria-labelledby="st-t">
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

<section class="section" aria-labelledby="pr-t">
  <div class="wrap">
    <div class="section-head" data-rv><p class="label tag" style="--t:var(--blue)">Come lavoro</p><h2 class="h2" id="pr-t">Quattro principi<br><em>che non cambio.</em></h2></div>
    <div class="problems" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
      <div class="problem" data-rv style="--c:var(--cyan)"><span class="label">01</span><p>Rapporto diretto.</p><span>Parli con chi fa il lavoro. Nessun account in mezzo, nessun messaggio che si perde nei passaggi.</span></div>
      <div class="problem" data-rv style="--c:var(--blue-link);--d:60ms"><span class="label">02</span><p>Prima si decide, poi si spende.</p><span>Ogni lavoro parte da un'analisi, anche breve. Se qualcosa non ti serve, te lo dico.</span></div>
      <div class="problem" data-rv style="--c:var(--indigo);--d:120ms"><span class="label">03</span><p>Una regia sola.</p><span>Sito, social, foto e materiali nascono dalla stessa idea, quindi si riconoscono.</span></div>
      <div class="problem" data-rv style="--c:var(--purple);--d:180ms"><span class="label">04</span><p>Strumenti AI, decisioni umane.</p><span>Uso l'intelligenza artificiale per esplorare e produrre più in fretta. Le scelte progettuali restano mie e tue.</span></div>
    </div>
  </div>
</section>

<section class="section" id="metodo" aria-labelledby="m-t">
  <div class="wrap split">
    <div class="sticky" data-rv>
      <p class="label tag" style="--t:var(--indigo)">Metodo</p>
      <h2 class="h2" id="m-t">Cinque fasi,<br><em>in quest'ordine.</em></h2>
      <p class="body" style="margin-top:20px">L'ordine conta: l'identità viene dopo la strategia, la produzione dopo l'identità. E l'ultima fase riporta alla prima.</p>
    </div>
    <div data-rv>${stepsHtml}<div style="margin-top:48px">${systemDiagram}</div></div>
  </div>
</section>

<section class="section" aria-labelledby="who-t">
  <div class="wrap split">
    <div class="sticky" data-rv><p class="label tag" style="--t:var(--pink)">Con chi lavoro meglio</p><h2 class="h2" id="who-t">Aziende che hanno<br><em>qualcosa da dire.</em></h2></div>
    <div data-rv>
      <dl class="facts">
        <div><dt class="label">Soprattutto</dt><dd>PMI e attività senza un ufficio marketing interno, che cercano un referente per strutturare la comunicazione.</dd></div>
        <div><dt class="label">Specializzazione</dt><dd>Ospitalità e ristorazione: locande, hotel, ristoranti, bar, luoghi d'esperienza e brand del territorio.</dd></div>
        <div><dt class="label">Anche</dt><dd>Aziende industriali e tecnologiche che vogliono un'immagine all'altezza della qualità del loro lavoro.</dd></div>
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
  const typeOpts = [['direzione', 'Strategia e posizionamento'], ['identita', 'Identità, sito, foto e video'], ['regia', 'Comunicazione continuativa'], ['', 'Non lo so ancora']];
  const budgets = ['Fino a 3.000 €', '3.000 – 8.000 €', '8.000 – 20.000 €', 'Oltre 20.000 €', 'Preferisco parlarne'];
  const body = `
<section class="page-hero" aria-labelledby="h1">
  <div class="aurora" aria-hidden="true" style="opacity:.5"></div>
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Contatti', '/contatti/']])}
    <h1 class="h1" id="h1" data-rv>Raccontami <em>dove vuoi arrivare.</em></h1>
    <p class="lead" data-rv style="--d:100ms">Non serve avere le idee chiare: serve avere un problema. Scegli il modo che preferisci.</p>
  </div>
</section>

<section class="section" style="padding-top:clamp(48px,6vw,80px)" aria-labelledby="fast-t">
  <div class="wrap">
    <h2 class="label tag" id="fast-t" style="--t:var(--mint)">Percorso rapido · Se sai già cosa vuoi chiedere</h2>
    ${quickContacts('contatti-rapido')}
  </div>
</section>

<section class="section" aria-labelledby="form-t">
  <div class="wrap contact-grid">
    <div data-rv>
      <p class="label tag" style="--t:var(--blue)">Percorso guidato</p>
      <h2 class="h2" id="form-t">Racconta il progetto,<br><em>ricevi una prima lettura.</em></h2>
      <form class="form" id="contact-form" novalidate data-email="${site.email}" data-wa="${site.whatsapp}" style="margin-top:36px" aria-describedby="form-note">
        <div class="field"><label for="f-name">Nome e cognome</label><input class="input" id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="err-name" maxlength="120"><p class="err" id="err-name" aria-live="polite"></p></div>
        <div class="field"><label for="f-company">Azienda <span class="opt">(facoltativo)</span></label><input class="input" id="f-company" name="company" type="text" autocomplete="organization" maxlength="160"></div>
        <div class="field"><label for="f-email">Email</label><input class="input" id="f-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" required aria-describedby="err-email" maxlength="200"><p class="err" id="err-email" aria-live="polite"></p></div>
        <div class="field"><label for="f-type">Di cosa hai bisogno?</label>
          <select class="input" id="f-type" name="type" required aria-describedby="err-type">
            <option value="" selected disabled>Scegli un'opzione</option>
            ${typeOpts.map(([id, l]) => `<option value="${l}" data-id="${id}">${l}</option>`).join('')}
          </select><p class="err" id="err-type" aria-live="polite"></p></div>
        <div class="field"><label for="f-msg">Raccontami la situazione</label><p class="hint" id="hint-msg">Cosa fa l'azienda, cosa non funziona, entro quando ti serve.</p><textarea class="input" id="f-msg" name="message" enterkeyhint="done" required aria-describedby="hint-msg err-message" maxlength="5000"></textarea><p class="err" id="err-message" aria-live="polite"></p></div>
        <div class="field"><label for="f-budget">Investimento indicativo <span class="opt">(facoltativo)</span></label><p class="hint" id="hint-budget">Serve solo a proporti la soluzione più adatta.</p>
          <select class="input" id="f-budget" name="budget" aria-describedby="hint-budget"><option value="">Preferisco non indicarlo</option>${budgets.map((b) => `<option>${b}</option>`).join('')}</select></div>
        <div class="hp" aria-hidden="true"><label for="f-web">Non compilare questo campo</label><input id="f-web" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <div class="field"><label class="check"><input type="checkbox" name="privacy" required aria-describedby="err-privacy"><span>Ho letto l'<a href="/privacy-policy/">informativa privacy</a> e acconsento al trattamento dei dati per ricevere una risposta.</span></label><p class="err" id="err-privacy" aria-live="polite"></p></div>
        <div><button class="btn btn-primary" type="submit">Invia la richiesta</button></div>
        <div class="form-status" id="form-status" role="status" aria-live="polite" tabindex="-1"></div>
        <p class="hint" id="form-note">Uso i dati solo per risponderti. Nessuna newsletter, nessuna cessione a terzi.</p>
      </form>
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

/* =========================================================== LEGALI */
export function privacy() {
  const body = `
<section class="page-hero" aria-labelledby="h1"><div class="wrap">
  ${crumbs([['Home', '/'], ['Privacy', '/privacy-policy/']])}
  <h1 class="h1" id="h1">Informativa privacy</h1>
  <p class="lead">Come vengono trattati i dati personali raccolti da questo sito. Ultimo aggiornamento: 2 novembre 2026.</p>
</div></section>
<section class="section" style="padding-top:48px"><div class="wrap legal prose">
  <h2>Titolare del trattamento</h2>
  <p>Andrea Sironi, ${site.city} (${site.province}), Italia${site.vat ? ' — P.IVA ' + esc(site.vat) : ''}. Contatto: <a href="mailto:${site.email}">${site.email}</a>.</p>

  <h2>Quali dati e perché</h2>
  <p><strong>Modulo di contatto.</strong> Nome, azienda (facoltativa), email, tipo di progetto, investimento indicativo (facoltativo) e testo del messaggio. Servono solo a rispondere alla richiesta e, se lo desideri, a preparare una proposta. Base giuridica: misure precontrattuali adottate su tua richiesta (art. 6, par. 1, lett. b GDPR).</p>
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
