import { site, nav } from './content.mjs';

export const BUILD_ID = process.env.BUILD_ID || Date.now().toString(36);

export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Immagine responsive: WebP con JPG di riserva. `base` è il percorso senza estensione.
export function picture({ base, alt, w, h, eager = false, sizes = '100vw' }) {
  const load = eager ? 'loading="eager" fetchpriority="low"' : 'loading="lazy"';
  return `<picture data-px-img><source type="image/webp" srcset="${base}.webp"><img src="${base}.jpg" alt="${esc(alt)}" width="${w}" height="${h}" ${load} decoding="async" sizes="${sizes}"></picture>`;
}

export const mark = (size = 26) => `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true" focusable="false"><defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#64D2FF"/><stop offset=".45" stop-color="#0A84FF"/><stop offset="1" stop-color="#BF5AF2"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="url(#mg)"/><path d="M14 46 26.5 16h3L42 46" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 35h17" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/></svg>`;

const icons = {
  mail: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
  phone: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/></svg>',
  wa: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.6A8.4 8.4 0 1 1 20.5 11.6z"/><path d="M9 9.2c0 3 2.3 5.3 5.3 5.3.6 0 1.1-.5 1.1-1.1l-1.7-.8-.9 1a5.6 5.6 0 0 1-2.6-2.6l1-.9-.8-1.7c-.6 0-1.1.5-1.1 1.1z" fill="currentColor" stroke="none"/></svg>',
};

export function quickContacts(where) {
  return `<div class="quick">
  <a href="mailto:${site.email}" data-where="${where}" style="--c:var(--blue)"><span class="ic">${icons.mail}</span><span><b>Email</b><em>${site.email}</em></span></a>
  <a href="${site.whatsapp}" target="_blank" rel="noopener" data-where="${where}" style="--c:var(--mint)"><span class="ic">${icons.wa}</span><span><b>WhatsApp</b><em>Per le domande veloci</em></span></a>
  <a href="tel:${site.phone}" data-where="${where}" style="--c:var(--cyan)"><span class="ic">${icons.phone}</span><span><b>Telefono</b><em>${site.phoneLabel}</em></span></a>
</div>`;
}

export function contactCta({ title = 'Raccontami<br><em>dove vuoi arrivare.</em>', text = 'Scrivimi due righe sul progetto. Ti propongo una prima conversazione di mezz\'ora, gratuita: ti dico cosa vedo e cosa farei.', where = 'cta', id = '' } = {}) {
  return `<section class="section"${id ? ` id="${id}"` : ''} aria-labelledby="cta-t"><div class="wrap"><div class="contact-cta" data-rv>
  <p class="label tag" style="--t:var(--mint)">Iniziamo</p>
  <h2 class="h2" id="cta-t">${title}</h2>
  <p class="lead">${text}</p>
  <div class="actions"><a class="btn btn-primary" href="/contatti/">Raccontami il progetto <span class="arr" aria-hidden="true">→</span></a></div>
  ${quickContacts(where)}
</div></div></section>`;
}

function header(current) {
  const links = nav.map((n) => `<li><a href="${n.href}"${current === n.href ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');
  return `<a class="skip" href="#main">Vai al contenuto</a>
<header class="nav" role="banner"><div class="wrap">
  <a class="brand" href="/"><i class="brand-dot" aria-hidden="true"></i>Andrea Sironi</a>
  <nav aria-label="Principale"><ul class="menu">${links}</ul></nav>
  <a class="nav-cta" href="/contatti/">Raccontami il progetto</a>
  <button class="burger" type="button" aria-expanded="false" aria-controls="menu-mobile" aria-label="Apri il menu"><span class="burger-in"><span></span><span></span></span></button>
</div></header>
<div class="sheet" id="menu-mobile">
  <nav aria-label="Menu mobile"><ul>${nav.map((n) => `<li><a href="${n.href}"${current === n.href ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}</ul></nav>
  <div class="sheet-foot">
    <a class="btn btn-primary" href="/contatti/">Raccontami il progetto</a>
    <a class="btn btn-ghost" href="${site.whatsapp}" target="_blank" rel="noopener" data-where="menu">WhatsApp</a>
  </div>
</div>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `<footer class="foot" role="contentinfo"><div class="wrap">
  <div class="foot-grid">
    <div>
      <h2>Direzione e realizzazione della comunicazione, per aziende che vogliono farsi capire.</h2>
      <p class="body small" style="margin-top:14px">${esc(site.role)} · ${site.city} (${site.province}) · ${site.areas.slice(1).join(', ')} e a distanza.</p>
    </div>
    <nav aria-label="Sito">
      <span class="label">Sito</span>
      <ul>
        <li><a href="/">Home</a></li>
        ${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
      </ul>
    </nav>
    <div>
      <span class="label">Contatti</span>
      <address>
        <a href="mailto:${site.email}" data-where="footer">${site.email}</a>
        <a href="tel:${site.phone}" data-where="footer">${site.phoneLabel}</a>
        <a href="${site.whatsapp}" target="_blank" rel="noopener" data-where="footer">WhatsApp</a>
        <span style="padding-top:4px">${site.city} (${site.province}), ${site.region}</span>
      </address>
    </div>
  </div>
  <p class="foot-mark" aria-hidden="true"><span data-px="-0.12">Andrea Sironi</span></p>
  <div class="foot-bottom">
    <span>© ${year} Andrea Sironi${site.vat ? ' · P.IVA ' + esc(site.vat) : ''}</span>
    <span><a href="/privacy-policy/">Privacy</a> · <a href="/cookie-policy/">Cookie</a></span>
  </div>
</div></footer>`;
}

export function personLd() {
  return {
    '@type': 'Person',
    '@id': `${site.url}/#andrea`,
    name: 'Andrea Sironi',
    jobTitle: 'Marketing strategist e art director',
    url: `${site.url}/`,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'NABA, Nuova Accademia di Belle Arti', address: { '@type': 'PostalAddress', addressLocality: 'Milano', addressCountry: 'IT' } },
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.province, addressCountry: 'IT' },
    knowsAbout: ['Strategia di marketing', 'Posizionamento di marca', 'Art direction', 'Identità visiva', 'Siti web', 'Fotografia', 'Social media management', 'Comunicazione per la ristorazione e l\'ospitalità'],
  };
}

// Pagina completa.
export function page({ path, title, description, body, current, noindex = false, ld = [], ogImage = '/og/andrea-sironi.jpg', bodyClass = '' }) {
  const url = site.url + path;
  const graph = ld.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld }).replace(/</g, '\\u003c')}</script>` : '';
  const analytics = site.analytics === 'vercel'
    ? '<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script><script defer src="/_vercel/insights/script.js"></script>'
    : '';
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#000000">
<meta name="color-scheme" content="dark">
<meta name="author" content="Andrea Sironi">
<meta property="og:type" content="website">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="Andrea Sironi">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${site.url}${ogImage}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/inter-tight-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=${BUILD_ID}">
<script>document.documentElement.classList.add('js')</script>
${graph}
${analytics}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${header(current)}
${bodyClass.includes('is-case') ? '<div class="read-progress" aria-hidden="true"><i></i></div>' : ''}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${current === '/contatti/' ? '' : `<div class="dock" id="dock" aria-hidden="true">
  <a class="btn btn-primary" href="/contatti/" tabindex="-1" data-where="dock">Raccontami il progetto</a>
  <a class="dock-wa" href="${site.whatsapp}" target="_blank" rel="noopener" tabindex="-1" data-where="dock" aria-label="Scrivimi su WhatsApp"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.6A8.4 8.4 0 1 1 20.5 11.6z"/><path d="M9 9.2c0 3 2.3 5.3 5.3 5.3.6 0 1.1-.5 1.1-1.1l-1.7-.8-.9 1a5.6 5.6 0 0 1-2.6-2.6l1-.9-.8-1.7c-.6 0-1.1.5-1.1 1.1z" fill="currentColor" stroke="none"/></svg></a>
</div>`}
<script src="/assets/js/site.js?v=${BUILD_ID}" defer></script>
</body>
</html>
`;
}

