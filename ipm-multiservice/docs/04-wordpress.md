# 04 — Integrazione WordPress

Il prototipo è HTML/CSS/JS statico generato da contenuti separati dalla presentazione. **Non è un tema WordPress pronto**: è la base da cui costruirlo.

## Raccomandazione

Tema custom (classico o ibrido con `theme.json`) + ACF Pro, in un ambiente di sviluppo isolato. Nessun riuso di tema, plugin o file del sito attuale prima di una verifica di sicurezza: si migrano **solo i contenuti** (pagine, articoli, media) tramite esportazione WXR o WP-CLI.

## Mappatura

| Prototipo | WordPress |
|---|---|
| `_src/content/site.mjs` → `company` | Pagina opzioni ACF "Dati aziendali" |
| `areas` | Tassonomia `area_operativa` (campi: numero, colore petalo, dettaglio) |
| `services` | CPT `servizio` con slug di primo livello (rewrite `'slug' => '/'`, `with_front => false`), oppure pagine figlie con template dedicato. Campi ACF: intro, scope (repeater), facts (repeater), correlati (relationship) |
| `projects` | CPT `progetto` (ambiente, problema, soluzione, risultato, galleria) |
| `timeline`, `method`, `figures`, `environments` | Campi ACF della front page (repeater) |
| `layout.mjs` header/footer | `header.php`, `footer.php`, menu `wp_nav_menu` con walker per il mega menu |
| `home.mjs` sezioni | `front-page.php` + `template-parts/home/{hero,world,services,method,history,work,contact}.php` |
| `pages.mjs` | `single-servizio.php`, `page-azienda.php`, `archive-progetto.php`, `page-contatti.php`, `404.php` |
| `ph()` slot immagine | `wp_get_attachment_image()` con `srcset`/`sizes`, formato WebP/AVIF |
| `assets/css/main.css` token | `theme.json` (palette, font, spaziature) + `style.css` |
| `assets/js/*` | `wp_enqueue_script` con `defer`; `home.js` solo su `is_front_page()` |
| Form (`data-endpoint`) | Contact Form 7 / WPForms, oppure endpoint REST custom con nonce, honeypot, rate limit e Cloudflare Turnstile; invio a commerciale@ipmmultiservice.it |

## Plugin consigliati (minimi)

ACF Pro, Yoast SEO o Rank Math, Redirection, un plugin form, un plugin di cache/ottimizzazione immagini compatibile con l'hosting, banner cookie conforme (il form e la mappa non usano cookie di terze parti; la mappa va caricata solo dopo consenso).

## Checklist di produzione

- [ ] Logo vettoriale originale
- [ ] Shooting fotografico/video reale (vedi elenco slot "foto da fornire" nelle pagine)
- [ ] Validazione di tutti i punti `VERIFY` in `site.mjs` e in `01-strategia.md`
- [ ] Casi studio reali per `/progetti/`
- [ ] Testi privacy e cookie aggiornati
- [ ] Rimuovere `noindex` e il bollino "prototipo" nel footer
- [ ] Piano redirect completato (`03-seo-redirect.md`)
- [ ] Test Lighthouse / WCAG su staging
