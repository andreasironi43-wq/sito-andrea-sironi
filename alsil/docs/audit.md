# Audit — sito AL.SIL. S.r.l.

Aggiornato il 27.10.2026 · Branch `alsil-redesign-v2` · Sorgente analizzata: `alsil-vercel.zip` (sito pubblicato su alsil.vercel.app)

## 1. Cosa ho trovato

### Stack originale
- HTML statico, 14 pagine, nessun build step. Deploy Vercel con `cleanUrls`.
- CSS (`assets/style.css`, ~16 KB) e JS (`assets/app.js`) **incorporati in ogni pagina**; header, footer e banner duplicati 14 volte.
- Una serverless function `api/invia.js` con Resend, honeypot e tempo minimo. **Il modulo in pagina non era collegato**: `app.js` mostrava "Concept dimostrativo: il modulo non invia dati". Nessun allegato, nessun campo materiale/quantità/colore.
- `vercel.json`: redirect dai vecchi URL WordPress (`/index.php/...`), header di sicurezza, cache degli asset.
- SEO: canonical scritto a mano su `https://www.alsil.it`, nessun og:image, nessuna card Twitter, nessun JSON-LD, sitemap statica.
- Font Onest dichiarato ma **file mancanti** (`assets/fonts/` vuota): il sito usava il carattere di sistema.
- Nessun analytics; banner cookie solo per la mappa OpenStreetMap.

### Design system originale
| Elemento | Valore |
|---|---|
| Sfondo | `#000`, pannelli `#0b0b0d` e `#141416`, bordi `rgba(255,255,255,.10)` |
| Testo | `#f5f5f7`, secondario `#86868b` |
| Accento | `#2997ff` |
| Font | Onest 400/500/600 |
| Forme | bottoni a pillola (980px), card con raggio 20px, tile 24px |
| Firma tipografica | titoli H2 su due righe, la seconda in grigio (`h2 em`) |
| Componenti | hero a tutto schermo con illustrazione e sfumatura, griglia di 4 dati, card con immagine, elenco a step, fascia foto, configuratore con disco in alluminio, barra cookie |
| Logo | SVG vettoriale "AL.SIL." (`assets/logo.svg`) |
| Immagini | illustrazioni vettoriali segnaposto ("SLOT FOTO 01…09") |

### Problemi di contenuto
Oltre ai claim indicati nel brief, il sito originale conteneva altre affermazioni non verificate o in contrasto con il Manuale della Qualità (rev. 19.02.24). Le più gravi:
- **"13 stadi di pretrattamento"** in tutto il sito, contro le 19 fasi del manuale.
- **"Conversione nanotecnologica… senza cromo esavalente"**: il manuale indica una passivazione con **cromo trivalente**.
- "Dal 1998", settori serviti, "aziende leader", "doppia mano su ogni pezzo", "un solo passaggio dal grezzo all'imballo", "report per lotto", classi di polvere e gloss nel configuratore.

Elenco completo in `docs/claims-da-confermare.md`.

### Problemi di accessibilità
- Bottoni pieni con testo bianco su `#2997ff`: contrasto 2,9:1 (serve 4,5:1).
- Link nel testo distinguibili solo dal colore.
- Contatore animato e nebbia che si muovono di continuo (gestiti con `prefers-reduced-motion`, ma solo in parte).

## 2. Decisioni

### Stack
Su indicazione del committente: **Next.js 15 (App Router) + TypeScript**, deploy Vercel, con il design system originale. Motivi: `SITE_URL` deve governare canonical e og:url (serve una build), og:image per pagina, test della route del modulo e un solo layout invece di 14 copie. Nessun framework CSS: il foglio di stile è quello originale, esteso.

### Identità visiva: cosa resta uguale
Palette, Onest (ora self-hosted con `next/font/local`, `display: swap`), logo SVG, bottoni a pillola, card, griglia dati, step, fascia foto, disco in alluminio, barra cookie, struttura della navigazione e del footer, titoli a due righe con la seconda in grigio, link "›".

### Cosa cambia, e perché
| Modifica | Motivo |
|---|---|
| Bottoni pieni `#0071e3` invece di `#2997ff` (link invariati) | Contrasto AA |
| Link nel testo sottolineati | WCAG 1.4.1 |
| Hero con l'illustrazione della linea aerea, senza contatore, nebbia e badge | Claim nebbia salina rimosso; l'illustrazione della camera di prova è riservata al blocco prove nascosto |
| Ciclo: timeline in 3 blocchi con le 19 fasi del manuale | Sostituisce i "13 stadi" |
| `/finiture` diventa `/per-ambiente`; il configuratore mostra i cicli per ambiente del manuale | Classi di polvere e gloss non verificati |
| `/settori` rimossa dalla navigazione (redirect a `/azienda`) | Settori da confermare |
| `/azienda` riscritta con i soli dati dell'impianto | "Dal 1998", clienti e promesse non verificati |
| Modulo preventivo vero in `/contatti#preventivo` | Il modulo originale non inviava dati |
| Articoli del blog originale come bozze nascoste | Testi riscritti per il concept, con claim non verificati |
| Fax rimosso | Da confermare |

### Pagine
| URL | Contenuto |
|---|---|
| `/` | Hero, ciclo in 3 card, fascia impianto, 4 dati, ambienti, polveri e controlli, CTA |
| `/ciclo` | Timeline verticale in 3 blocchi |
| `/per-ambiente` | Configuratore con disco, polveri |
| `/azienda` | Impianto e controlli |
| `/contatti` → `/contatti/grazie` | Recapiti, modulo, mappa su consenso, dati amministrativi |
| `/blog`, `/blog/categoria/[slug]`, `/blog/[slug]` | Blog con categorie, indice, correlati, CTA |
| `/privacy`, `/cookie` | Testi originali aggiornati ai nuovi trattamenti |

## 3. Note tecniche
- **Allegato fino a 10 MB su Vercel.** Le funzioni accettano body fino a ~4,5 MB: oltre 4 MB il browser carica il file su **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`) e l'email lo allega via URL.
- **Analytics** (Plausible o GA4) e **pixel** (Google Ads, Meta) solo dopo il consenso nel banner. Eventi: click telefono, click email, invio modulo (conversione sulla pagina di conferma).
- **UTM/gclid/fbclid** salvati in `sessionStorage` e inviati con il modulo.
- **Variabili d'ambiente**: `QUOTE_TO_EMAIL` e `QUOTE_FROM_EMAIL`; per compatibilità valgono anche `MAIL_TO` e `MAIL_FROM` di `api/invia.js`. Vedi `.env.example`.
