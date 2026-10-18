// Layout condiviso: <head>, header, footer, componenti ricorrenti.
// Mappatura WordPress: header.php, footer.php, template-parts/*.php
import { company, nav, areas, services } from '../content/site.mjs';

export const PROD = 'https://www.ipmmultiservice.it/';
export const ASSET_V = '1';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const svc = (slug) => services.find((s) => s.slug === slug);
export const areaOf = (id) => areas.find((a) => a.id === id);

export const icon = {
  arrow: '<svg class="i i-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  arrowDown: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6"/></svg>',
  phone: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  mail: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 6l9 7 9-7"/></svg>',
  pin: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  plus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
};

// Slot immagine: illustrazione tecnica provvisoria + etichetta "foto da fornire".
// In WordPress: the_post_thumbnail() / wp_get_attachment_image() con srcset.
export function ph(p, name, note, { code = '', cls = '', eager = false, alt = '' } = {}) {
  return `<figure class="ph ${cls}" data-ph="${name}">
  <img src="${p}assets/img/ph/${name}.svg" alt="${esc(alt)}" width="1600" height="1000" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
  <figcaption class="ph-tag"><span>${code ? esc(code) + ' · ' : ''}Foto da fornire</span>${note ? `<span class="ph-note">${esc(note)}</span>` : ''}</figcaption>
</figure>`;
}

export function btn(href, label, { variant = 'primary', cls = '', attrs = '' } = {}) {
  return `<a class="btn btn-${variant} ${cls}" href="${href}" ${attrs}><span class="btn-label">${label}</span><span class="btn-icon">${icon.arrow}</span></a>`;
}

function megaMenu(p) {
  return `<div class="mega" id="mega-servizi" hidden>
  <div class="mega-inner wrap">
    ${areas.map((a) => `<div class="mega-col" style="--c:var(--petal-${a.color})">
      <p class="mega-n mono">${a.n}</p>
      <p class="mega-title">${esc(a.short)}</p>
      <ul>${a.links.map((sl) => `<li><a href="${p}${sl}/">${esc(svc(sl).title)}</a></li>`).join('')}</ul>
    </div>`).join('')}
    <a class="mega-all" href="${p}servizi/">Tutti i servizi ${icon.arrow}</a>
  </div>
</div>`;
}

export function header(p, current) {
  const link = (n) => {
    const cur = current && current.startsWith(n.href) ? ' aria-current="page"' : '';
    if (n.mega) {
      return `<li class="has-mega"><a href="${p}${n.href}"${cur}>${n.label}</a><button class="mega-toggle" aria-expanded="false" aria-controls="mega-servizi"><span class="sr-only">Apri il menu servizi</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg></button></li>`;
    }
    return `<li><a href="${p}${n.href}"${cur}>${n.label}</a></li>`;
  };
  return `<a class="skip" href="#main">Vai al contenuto</a>
<header class="site-header" data-header>
  <div class="progress" aria-hidden="true"><span data-progress></span></div>
  <div class="wrap header-inner">
    <a class="brand" href="${p}" aria-label="IPM Multiservice — home">
      <img src="${p}assets/img/logo-ipm.png" alt="IPM Multiservice" width="715" height="309">
    </a>
    <nav class="main-nav" aria-label="Principale">
      <ul>${nav.map(link).join('')}</ul>
    </nav>
    <div class="header-actions">
      <a class="header-phone mono" href="tel:${company.phoneHref}">${icon.phone}<span>${company.phone}</span></a>
      ${btn(`${p}contatti/#preventivo`, 'Richiedi preventivo', { variant: 'primary', cls: 'btn-sm header-cta' })}
      <button class="burger" aria-expanded="false" aria-controls="mobile-menu"><span class="sr-only">Menu</span><span class="burger-lines" aria-hidden="true"></span></button>
    </div>
  </div>
  ${megaMenu(p)}
</header>
<div class="mobile-menu" id="mobile-menu" hidden>
  <div class="wrap">
    <nav aria-label="Menu mobile">
      <ul class="mm-list">
        <li><a href="${p}">Home</a></li>
        ${nav.map((n) => `<li><a href="${p}${n.href}">${n.label}</a></li>`).join('')}
      </ul>
      <p class="mm-label mono">Servizi</p>
      <ul class="mm-services">
        ${services.map((s) => `<li><a href="${p}${s.slug}/">${esc(s.title)}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="mm-foot">
      ${btn(`${p}contatti/#preventivo`, 'Richiedi preventivo')}
      <a class="mm-phone" href="tel:${company.phoneHref}">${icon.phone} ${company.phone}</a>
    </div>
  </div>
</div>`;
}

export function ctaBand(p, { title = 'Ogni ambiente ha esigenze specifiche.', text = 'Raccontaci dove e cosa devi intervenire: ti rispondiamo con una proposta tecnica e un preventivo gratuito.' } = {}) {
  return `<section class="cta-band" aria-labelledby="cta-band-t">
  <div class="wrap cta-band-inner">
    <p class="eyebrow mono">Preventivo gratuito e senza impegno</p>
    <h2 id="cta-band-t" class="display-l" data-split>${esc(title)}</h2>
    <p class="lead">${esc(text)}</p>
    <div class="cta-row">
      ${btn(`${p}contatti/#preventivo`, 'Richiedi un preventivo')}
      <a class="link-phone" href="tel:${company.phoneHref}">${icon.phone}<span>Chiama ${company.phone}</span></a>
    </div>
  </div>
</section>`;
}

export function footer(p) {
  const a = company.address;
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-plate"><img src="${p}assets/img/logo-ipm.png" alt="IPM Multiservice" width="715" height="309" loading="lazy"></div>
        <p class="footer-claim">Pulizie industriali e multiservizi per le aziende lombarde. Dal ${company.founded}.</p>
      </div>
      <div class="footer-col">
        <p class="footer-h mono">Sede</p>
        <address>${esc(company.legalName)}<br>${esc(a.street)}<br>${a.zip} ${esc(a.city)} (${a.province})</address>
        <p class="mono footer-geo">${company.geo.label}</p>
      </div>
      <div class="footer-col">
        <p class="footer-h mono">Contatti</p>
        <ul class="footer-list">
          <li><a href="tel:${company.phoneHref}">Tel. ${company.phone}</a></li>
          <li>Fax ${company.fax}</li>
          <li><a href="mailto:${company.email}">${company.email}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <p class="footer-h mono">Servizi</p>
        <ul class="footer-list">
          ${services.slice(0, 8).map((s) => `<li><a href="${p}${s.slug}/">${esc(s.title)}</a></li>`).join('')}
        </ul>
      </div>
      <div class="footer-col">
        <p class="footer-h mono">Azienda</p>
        <ul class="footer-list">
          <li><a href="${p}azienda/">Chi siamo</a></li>
          <li><a href="${p}progetti/">Progetti</a></li>
          <li><a href="${p}lavora-con-noi/">Lavora con noi</a></li>
          <li><a href="${p}contatti/">Contatti</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-area">
      <p class="mono">Area di intervento</p>
      <ul>${company.area.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
    <div class="footer-bottom mono">
      <p>© ${new Date().getFullYear()} ${esc(company.legalName)} · P.IVA ${company.vat}</p>
      <p><a href="${p}privacy-policy/">Privacy</a> · <a href="${p}cookie-policy/">Cookie</a></p>
      <p class="proto-flag">Prototipo di redesign — non è il sito ufficiale</p>
    </div>
  </div>
</footer>`;
}

const fontPreload = (p) => `<link rel="preload" href="${p}assets/fonts/archivo-var.woff2" as="font" type="font/woff2" crossorigin>`;

export function layout({ path, title, desc, body, bodyClass = '', home = false, schema = null, prefix = null }) {
  const depth = path === '' ? 0 : path.split('/').filter(Boolean).length;
  const p = prefix ?? '../'.repeat(depth);
  const canonical = PROD + path;
  return `<!doctype html>
<html lang="it" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<!-- Prototipo: non indicizzare. Rimuovere in produzione. -->
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0E1828">
<meta property="og:type" content="website">
<meta property="og:locale" content="it_IT">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<link rel="icon" type="image/png" href="${p}assets/img/favicon.png">
<link rel="apple-touch-icon" href="${p}assets/img/apple-touch-icon.png">
${fontPreload(p)}
<link rel="stylesheet" href="${p}assets/css/main.css?v=${ASSET_V}">
<script>
  // Attiva le animazioni solo con JS disponibile e senza "riduci movimento".
  (function(d){var c=d.documentElement;c.classList.remove('no-js');c.classList.add('js');
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){c.classList.add('motion');}
  setTimeout(function(){if(!c.classList.contains('motion-ready'))c.classList.remove('motion');},2500);})(document);
</script>
${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
</head>
<body class="${bodyClass}">
${header(p, path)}
<main id="main">
${body(p)}
</main>
${footer(p)}
<script src="${p}assets/js/vendor/gsap.min.js" defer></script>
<script src="${p}assets/js/vendor/ScrollTrigger.min.js" defer></script>
<script src="${p}assets/js/main.js?v=${ASSET_V}" defer></script>
${home ? `<script src="${p}assets/js/home.js?v=${ASSET_V}" defer></script>` : ''}
</body>
</html>
`;
}

export function localBusinessSchema() {
  const a = company.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.brand,
    legalName: company.legalName,
    url: PROD,
    telephone: '+39 ' + company.phone,
    faxNumber: '+39 ' + company.fax,
    email: company.email,
    foundingDate: String(company.founded),
    vatID: 'IT' + company.vat,
    address: { '@type': 'PostalAddress', streetAddress: a.street, postalCode: a.zip, addressLocality: a.city, addressRegion: a.province, addressCountry: 'IT' },
    geo: { '@type': 'GeoCoordinates', latitude: company.geo.lat, longitude: company.geo.lng },
    areaServed: company.area.map((n) => ({ '@type': 'AdministrativeArea', name: n })),
  };
}
