// Pagine interne. Condividono design system e componenti della homepage,
// con animazioni più sobrie (solo reveal e progress).
// Mappatura WordPress: single-servizio.php, page-azienda.php, archive-progetto.php, page-contatti.php
import { company, areas, services, timeline, projects, method } from '../content/site.mjs';
import { layout, ph, btn, esc, icon, svc, areaOf, ctaBand, localBusinessSchema, PROD } from './layout.mjs';
import { quoteForm, contactCards, colorKey } from './partials.mjs';
import { caseCard } from './home.mjs';

const crumbs = (p, items) => `<nav class="crumbs mono" aria-label="Percorso">
  <ol><li><a href="${p}">Home</a></li>${items.map(([href, label], i) => i === items.length - 1
    ? `<li><span aria-current="page">${esc(label)}</span></li>`
    : `<li><a href="${p}${href}">${esc(label)}</a></li>`).join('')}</ol>
</nav>`;

const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [['', 'Home'], ...items].map(([href, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: PROD + href })),
});

const pageHero = (p, { eyebrow, title, lead, crumb, color = 'var(--ipm-orange)', media = '' }) => `<section class="page-hero${media ? ' page-hero-media' : ''}" style="--c:${color}">
  <div class="wrap page-hero-inner">
    ${crumbs(p, crumb)}
    <p class="eyebrow mono">${eyebrow}</p>
    <h1 class="display-xl" data-split>${title}</h1>
    ${lead ? `<p class="lead page-lead" data-reveal>${lead}</p>` : ''}
  </div>
  ${media ? `<div class="page-hero-figure" data-reveal="mask">${media}</div>` : ''}
</section>`;

// ---------- Servizio ----------
export const servicePage = (s) => {
  const a = areaOf(s.area);
  const path = s.slug + '/';
  const crumb = [['servizi/', 'Servizi'], [path, s.title]];
  return layout({
    path,
    title: s.metaTitle,
    desc: s.metaDesc,
    bodyClass: 'is-service',
    schema: [breadcrumbSchema(crumb), {
      '@context': 'https://schema.org', '@type': 'Service', name: s.title, serviceType: s.title,
      provider: { '@type': 'LocalBusiness', name: company.brand, telephone: '+39 ' + company.phone },
      areaServed: company.area.map((n) => ({ '@type': 'AdministrativeArea', name: n })),
    }],
    body: (p) => `${pageHero(p, {
      eyebrow: `${colorKey()} Area ${a.n} · ${esc(a.short)}`,
      title: esc(s.h1),
      lead: esc(s.intro),
      crumb,
      color: `var(--petal-${a.color})`,
      media: ph(p, s.ph, s.phNote, { code: 'PH-S', eager: true, cls: 'ph-wide' }),
    })}
<section class="svc-body" style="--c:var(--petal-${a.color})">
  <div class="wrap svc-grid">
    <aside class="svc-aside">
      <div class="svc-aside-sticky">
        <dl class="svc-facts">
          ${s.facts.map(([k, v]) => `<div><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
        </dl>
        ${s.factsNote ? `<p class="svc-facts-note mono">${esc(s.factsNote)}</p>` : ''}
        ${btn(`${p}contatti/?servizio=${encodeURIComponent(s.title)}#preventivo`, 'Preventivo per questo servizio', { cls: 'btn-block' })}
        <a class="link-phone" href="tel:${company.phoneHref}">${icon.phone}<span>${company.phone}</span></a>
      </div>
    </aside>
    <div class="svc-main">
      <h2 class="display-m" data-split>Cosa facciamo</h2>
      <ol class="scope">
        ${s.scope.map(([t, d], i) => `<li class="scope-item" data-reveal>
          <span class="scope-n mono">${String(i + 1).padStart(2, '0')}</span>
          <h3 class="display-s">${esc(t)}</h3>
          <p>${esc(d)}</p>
        </li>`).join('')}
      </ol>
      <div class="svc-method" data-reveal>
        <h2 class="display-m">Come lavoriamo</h2>
        <ol class="mini-steps">
          ${method.map((m) => `<li><span class="mono">${m.n}</span><strong>${esc(m.title)}</strong></li>`).join('')}
        </ol>
      </div>
      <div class="svc-area" data-reveal>
        <h2 class="display-s">Dove interveniamo</h2>
        <p>Province di ${company.area.slice(0, -1).join(', ')} e ${company.area.at(-1)}. Sede operativa a ${esc(company.address.city)} (${company.address.province}).</p>
      </div>
    </div>
  </div>
</section>
<section class="related">
  <div class="wrap">
    <h2 class="eyebrow mono">Servizi correlati</h2>
    <ul class="related-list">
      ${s.related.map((sl) => { const r = svc(sl); const ra = areaOf(r.area); return `<li style="--c:var(--petal-${ra.color})"><a href="${p}${r.slug}/"><span class="mono">${ra.n}</span><span class="related-t">${esc(r.title)}</span>${icon.arrow}</a></li>`; }).join('')}
    </ul>
  </div>
</section>
${ctaBand(p)}`,
  });
};

// ---------- Hub servizi ----------
export const servicesHub = () => layout({
  path: 'servizi/',
  title: 'Servizi di pulizia industriale e multiservizi | IPM Multiservice',
  desc: 'Tutti i servizi IPM Multiservice: pulizie industriali, pulizia impianti, sabbiatura criogenica, pavimenti in resina, imbiancature, disinfestazione, sanificazione e forniture.',
  bodyClass: 'is-hub',
  schema: breadcrumbSchema([['servizi/', 'Servizi']]),
  body: (p) => `${pageHero(p, {
    eyebrow: `${colorKey()} Servizi`,
    title: 'Sei aree operative, undici servizi specialistici.',
    lead: 'Dalle pulizie tecniche sulle linee di produzione alla segnaletica a pavimento, dalla sabbiatura criogenica alla derattizzazione. Scegli l’area o chiedici una proposta che le combini.',
    crumb: [['servizi/', 'Servizi']],
  })}
<section class="hub">
  <div class="wrap">
    ${areas.map((a) => `<article class="hub-area" style="--c:var(--petal-${a.color})" data-reveal>
      <div class="hub-media">${ph(p, a.ph, a.phNote)}</div>
      <div class="hub-copy">
        <p class="ex-n mono"><span class="ex-dot" aria-hidden="true"></span>Area ${a.n}</p>
        <h2 class="display-m">${esc(a.title)}</h2>
        <p>${esc(a.lead)}</p>
        <ul class="ex-links">
          ${a.links.map((sl) => `<li><a href="${p}${sl}/"><span>${esc(svc(sl).title)}</span>${icon.arrow}</a></li>`).join('')}
        </ul>
      </div>
    </article>`).join('')}
  </div>
</section>
${ctaBand(p, { title: 'Non sai quale servizio ti serve?', text: 'Descrivici l’ambiente e il problema: valutiamo noi la combinazione di interventi più adatta.' })}`,
});

// ---------- Azienda ----------
export const companyPage = () => {
  const years = new Date().getFullYear() - company.founded;
  return layout({
    path: 'azienda/',
    title: `Chi siamo: dal ${company.founded} al servizio delle aziende | IPM Multiservice`,
    desc: `IPM Multiservice nasce nel ${company.founded} a Paderno d'Adda. Squadre interne, mezzi di proprietà e officina interna per pulizie industriali e multiservizi in Lombardia.`,
    bodyClass: 'is-company',
    schema: [breadcrumbSchema([['azienda/', 'Azienda']]), localBusinessSchema()],
    body: (p) => `${pageHero(p, {
      eyebrow: `${colorKey()} Azienda`,
      title: `Dal ${company.founded}, dentro le aziende.`,
      lead: `IPM nasce come impresa individuale di pulizie civili e industriali. In ${years} anni è diventata un’organizzazione multiservizio con sede, magazzino e officina a ${esc(company.address.city)}.`,
      crumb: [['azienda/', 'Azienda']],
      media: ph(p, 'magazzino', 'Sede e magazzino IPM a Paderno d’Adda, esterno con mezzi', { code: 'PH-A', eager: true, cls: 'ph-wide' }),
    })}
<section class="values">
  <div class="wrap values-grid">
    <h2 class="display-l" data-split>Cosa ci rende diversi da un’impresa di pulizie.</h2>
    <ul class="values-list">
      <li data-reveal><span class="mono">01</span><h3 class="display-s">Persone interne</h3><p>Le squadre sono composte da personale IPM qualificato e aggiornato, anche per i lavori in quota con piattaforme aeree.</p></li>
      <li data-reveal><span class="mono">02</span><h3 class="display-s">Mezzi di proprietà</h3><p>Attrezzature e mezzi sono di proprietà e mantenuti nella nostra officina interna: disponibilità e manutenzione non dipendono da terzi.</p></li>
      <li data-reveal><span class="mono">03</span><h3 class="display-s">Più competenze, un referente</h3><p>Pulizie tecniche, resine, imbiancature, disinfestazione, sanificazione e forniture: servizi diversi coordinati dallo stesso interlocutore.</p></li>
      <li data-reveal><span class="mono">04</span><h3 class="display-s">Radici nel territorio</h3><p>Operiamo tra ${company.area.join(', ')}, a breve distanza dalla sede di ${esc(company.address.city)}.</p></li>
    </ul>
  </div>
</section>
<section class="chrono">
  <div class="wrap">
    <h2 class="eyebrow mono">Cronologia</h2>
    <ol class="chrono-list">
      ${timeline.map((t) => `<li class="chrono-item" data-reveal>
        <p class="chrono-y display-l">${esc(t.y)}</p>
        <div><h3 class="display-s">${esc(t.title)}</h3><p>${esc(t.text)}</p></div>
      </li>`).join('')}
    </ol>
  </div>
</section>
<section class="gallery-strip" aria-label="Galleria">
  <div class="wrap gallery-grid">
    ${ph(p, 'facciata', 'Foto storica: i primi mezzi IPM (anni ’80)', { code: 'PH-A1' })}
    ${ph(p, 'capannone', 'Foto attuale: la squadra al completo davanti alla sede', { code: 'PH-A2' })}
    ${ph(p, 'impianto', 'Officina interna: manutenzione delle attrezzature', { code: 'PH-A3' })}
  </div>
</section>
${ctaBand(p)}`,
  });
};

// ---------- Progetti ----------
export const projectsPage = () => layout({
  path: 'progetti/',
  title: 'Progetti e interventi | IPM Multiservice',
  desc: 'Interventi di pulizia industriale, resinatura, imbiancatura e disinfestazione realizzati da IPM Multiservice.',
  bodyClass: 'is-projects',
  schema: breadcrumbSchema([['progetti/', 'Progetti']]),
  body: (p) => `${pageHero(p, {
    eyebrow: `${colorKey()} Progetti e interventi`,
    title: 'Casi reali, raccontati con i dati.',
    lead: 'Questa sezione è pronta ad accogliere i casi studio di IPM. Ogni scheda riporterà ambiente, problema iniziale, soluzione adottata e risultato documentato, con fotografie autentiche.',
    crumb: [['progetti/', 'Progetti']],
  })}
<section class="work work-page">
  <div class="wrap">
    <div class="notice" role="note">
      <p class="mono">Contenuto da fornire</p>
      <p>Le schede qui sotto sono segnaposto strutturali: nessun caso è stato inventato. Per ogni intervento servono 3–6 foto (prima, durante, dopo), il settore del cliente (anche anonimo), superficie o durata e un risultato verificabile.</p>
    </div>
    <div class="cases cases-page">
      ${projects.map((c) => `<div id="${c.code.toLowerCase()}" class="case-anchor">${caseCard(p, c, { h: 'h2' })}</div>`).join('')}
    </div>
  </div>
</section>
${ctaBand(p)}`,
});

// ---------- Contatti ----------
export const contactPage = () => layout({
  path: 'contatti/',
  title: 'Contatti e richiesta preventivo | IPM Multiservice',
  desc: `Richiedi un preventivo gratuito a IPM Multiservice: ${company.address.street}, ${company.address.city} (${company.address.province}). Tel. ${company.phone}, ${company.email}.`,
  bodyClass: 'is-contact',
  schema: [breadcrumbSchema([['contatti/', 'Contatti']]), localBusinessSchema()],
  body: (p) => `${pageHero(p, {
    eyebrow: `${colorKey()} Contatti`,
    title: 'La soluzione comincia da un confronto.',
    lead: 'Raccontaci l’ambiente, le superfici e i vincoli della tua attività. Il preventivo è gratuito e senza impegno.',
    crumb: [['contatti/', 'Contatti']],
  })}
<section class="contact contact-page">
  <div class="wrap contact-grid">
    <div class="contact-copy">
      ${contactCards()}
      <div class="contact-extra">
        <p class="mono">Fax ${company.fax}</p>
        <p class="mono">${esc(company.legalName)} · P.IVA ${company.vat}</p>
      </div>
      <div class="map-ph" aria-label="Mappa">
        ${ph(p, 'disinfestazione', 'Mappa interattiva (caricata solo dopo consenso cookie)', { code: 'MAP' })}
      </div>
    </div>
    <div class="contact-form">
      <h2 class="display-m">Richiedi un preventivo</h2>
      ${quoteForm(p, { id: 'preventivo' })}
    </div>
  </div>
</section>`,
});

// ---------- Lavora con noi ----------
export const jobsPage = () => layout({
  path: 'lavora-con-noi/',
  title: 'Lavora con noi | IPM Multiservice',
  desc: 'Posizioni aperte in IPM Multiservice: tecnici e addetti alle pulizie industriali, imbianchini. Invia la tua candidatura.',
  bodyClass: 'is-jobs',
  schema: breadcrumbSchema([['lavora-con-noi/', 'Lavora con noi']]),
  body: (p) => `${pageHero(p, {
    eyebrow: `${colorKey()} Lavora con noi`,
    title: 'Cerchiamo persone che sanno lavorare bene.',
    lead: 'Le squadre IPM sono interne: chi entra viene formato, aggiornato e lavora con attrezzature professionali di proprietà.',
    crumb: [['lavora-con-noi/', 'Lavora con noi']],
  })}
<section class="jobs">
  <div class="wrap jobs-grid">
    <div>
      <h2 class="eyebrow mono">Posizioni pubblicate</h2>
      <ul class="jobs-list">
        <li data-reveal><h3 class="display-s">Tecnico pulizie industriali</h3><p class="mono">Paderno d’Adda (LC)</p></li>
        <li data-reveal><h3 class="display-s">Addetto pulizie industriali</h3><p class="mono">Part time · patente B</p></li>
        <li data-reveal><h3 class="display-s">Imbianchino</h3><p class="mono">Full time</p></li>
      </ul>
      <p class="note-inline">Elenco ripreso dal sito attuale: da aggiornare con le posizioni effettivamente aperte.</p>
    </div>
    <div class="contact-form">
      <h2 class="display-m">Invia la candidatura</h2>
      ${quoteForm(p, { id: 'candidatura', jobs: true })}
    </div>
  </div>
</section>`,
});

// ---------- Legali (testi da importare) ----------
export const legalPage = (slug, title) => layout({
  path: slug + '/',
  title: `${title} | IPM Multiservice`,
  desc: `${title} del sito IPM Multiservice.`,
  bodyClass: 'is-legal',
  body: (p) => `${pageHero(p, { eyebrow: 'Note legali', title, lead: '', crumb: [[slug + '/', title]] })}
<section class="legal"><div class="wrap legal-body">
  <div class="notice" role="note"><p class="mono">Testo da importare</p><p>In produzione questa pagina riprende l’informativa vigente del sito attuale (stesso URL), aggiornata dal titolare del trattamento.</p></div>
</div></section>`,
});

// ---------- 404 ----------
export const notFound = () => layout({
  path: '',
  title: 'Pagina non trovata | IPM Multiservice',
  desc: 'La pagina richiesta non esiste.',
  bodyClass: 'is-404',
  prefix: '/ipm-multiservice/', // percorsi assoluti: la 404 può essere servita a qualsiasi profondità
  body: () => `<section class="page-hero"><div class="wrap page-hero-inner">
    <p class="eyebrow mono">Errore 404</p>
    <h1 class="display-xl">Questa area è fuori percorso.</h1>
    <p class="lead">La pagina potrebbe essere stata spostata. Riparti dalla home o dai servizi.</p>
    <div class="cta-row"><a class="btn btn-primary" href="/ipm-multiservice/"><span class="btn-label">Torna alla home</span><span class="btn-icon">${icon.arrow}</span></a><a class="btn btn-ghost-dark" href="/ipm-multiservice/servizi/"><span class="btn-label">Servizi</span><span class="btn-icon">${icon.arrow}</span></a></div>
  </div></section>`,
});
