# Strategia SEO

Nessuna promessa di posizionamento. Le priorità sotto sono **ipotesi qualitative**: non erano disponibili Search Console né strumenti di volume di ricerca. Vanno validate con i dati reali dopo 8–12 settimane di indicizzazione.

## Keyword e intenti

| Gruppo di intento | Esempi di ricerca | Pagina di destinazione | Priorità | Note |
|---|---|---|---|---|
| Nome | andrea sironi, andrea sironi marketing, andrea sironi art director | `/`, `/chi-sono/` | Alta | Esiste un omonimo noto (presidente di Generali): servono coerenza tra sito, LinkedIn e Instagram e dati strutturati `Person` con ruolo e città |
| Social per la ristorazione | social media manager ristoranti Lecco / Brianza, gestione instagram ristorante, comunicazione per ristoranti, foto per ristoranti | `/ristoranti/` (landing), poi `/servizi/social-media-manager/` | Alta | Intento commerciale forte e specializzazione reale (BRUT, P.Stop, Carlambroeus) |
| Consulenza | consulente marketing Brianza / Lecco / Merate, strategia comunicazione PMI, marketing per PMI | `/pmi/` (landing), poi `/servizi/strategie-marketing/` | Alta | Concorrenza locale di agenzie generaliste |
| Siti | realizzazione siti web Lecco / Merate, sito web ristorante | `/servizi/sito-web/` | Media | Molto competitivo, ma intento d'acquisto chiaro |
| Foto e video | fotografo food Brianza, foto per ristoranti Lecco, content creator Monza | `/servizi/content-creator/` | Media | |
| Direzione creativa | art director Monza / Milano, direzione creativa per aziende, brand strategist Milano | `/`, `/chi-sono/`, `/servizi/` | Media | Milano molto competitiva: obiettivo realistico è la Brianza |
| Casi | rebranding locanda, comunicazione ristorante caso studio | `/lavori/*` | Bassa per volume, alta per conversione | Condivisibili su LinkedIn |

Decisioni:
- **Nessuna pagina-città duplicata** (es. "social media manager Como" con testo copiato). L'area servita è dichiarata nei testi, nella FAQ e nei dati strutturati.
- Gli URL esistenti dei servizi sono stati **mantenuti** per non perdere l'eventuale indicizzazione, anche se `/servizi/content-creator/` ora si intitola "Foto e video".
- Nessun blog finché non c'è materiale originale (vedi `growth-roadmap.md`).

## Implementato

| Elemento | Stato |
|---|---|
| Title unici per ogni pagina (verificato dai test) | ✓ |
| Meta description 70–170 caratteri (verificato) | ✓ |
| Un solo H1 per pagina, nessun salto di livello nei titoli (verificato) | ✓ |
| URL leggibili con slash finale, `trailingSlash: true` in `vercel.json` | ✓ |
| Canonical assoluto su `https://www.andreasironi.it` | ✓ |
| `sitemap.xml` generata a ogni build con data e priorità | ✓ |
| `robots.txt` con sitemap; `/api/` e `/_src/` esclusi | ✓ |
| 404 con navigazione e `noindex` | ✓ |
| Open Graph e Twitter card con immagine 1200×630 dedicata (`/og/andrea-sironi.jpg`) | ✓ (prima puntava a un file inesistente) |
| Favicon SVG + ICO + apple-touch-icon | ✓ (prima assenti) |
| Breadcrumb visibili e `BreadcrumbList` | ✓ |
| Alt descrittivi su tutte le immagini, verificati sulle foto | ✓ |
| Link interni: home → percorsi → pagine servizio → caso collegato → contatti; casi → servizi collegati → caso successivo | ✓ |
| Prototipo IPM con `noindex` (era già così) e scansione consentita, perché Google veda il `noindex` | ✓ |

### Dati strutturati (JSON-LD, coerenti con il testo visibile)

- `Person` (Andrea Sironi, ruolo, NABA come `alumniOf`, Merate) su tutte le pagine.
- `ProfessionalService` + `WebSite` in home, con area servita per province.
- `Service` per percorsi e pagine servizio, `FAQPage` dove le FAQ sono visibili.
- `CreativeWork` per i casi studio, `CollectionPage`, `ProfilePage`, `ContactPage`.
- Rimossi dal markup precedente: `priceRange "$$"` (non documentato), `geo` con coordinate puntuali, l'elenco di 20 città e regioni (Piemonte, Veneto, Trentino…) usato come `areaServed`, `alternateName "Studio Andrea Sironi"`. Erano dati non verificabili o gonfiati.

## Preview Vercel e duplicati

- Le preview deployment di Vercel ricevono automaticamente `X-Robots-Tag: noindex` ([documentazione Vercel](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines)).
- L'URL di produzione `*.vercel.app` invece è indicizzabile. Il canonical verso `www.andreasironi.it` evita la duplicazione **solo se il dominio è attivo**. Non è stato possibile verificarlo da qui.
- **Da fare quando il dominio è collegato**: in Vercel → Settings → Domains, impostare il reindirizzamento 308 da `andreasironi.it` e dal dominio `.vercel.app` verso `www.andreasironi.it`. In alternativa aggiungere in `vercel.json` un header `X-Robots-Tag: noindex` per host `.*\.vercel\.app`. Non l'ho aggiunto ora perché, se il dominio non fosse ancora attivo, renderebbe il sito invisibile.

## Ricerca con intelligenza artificiale

Segue le indicazioni di Google ([AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)): nessun file o markup speciale, ma
- risposte chiare a domande concrete nelle FAQ (costo, tempi, contratti, area),
- casi reali con ragionamento esplicito,
- testo interamente nell'HTML (nessun contenuto caricato da JavaScript),
- informazioni coerenti tra pagine (stessi ruoli, stessa area, stessi nomi dei clienti).

Non è stato aggiunto `llms.txt`: non ha effetti documentati sulla Ricerca Google.

## Search Console (da fare, richiede accesso)

1. Aggiungere la proprietà di dominio `andreasironi.it` (verifica DNS).
2. Inviare `https://www.andreasironi.it/sitemap.xml`.
3. Dopo 4 settimane: controllare pagine indicizzate, query per pagina servizio, CTR dei title.
4. Collegare Bing Webmaster Tools importando da Search Console.
