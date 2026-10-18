# 03 — SEO e piano redirect 301

## Principi

- Gli URL delle pagine servizio attuali **restano invariati** (stessi slug al primo livello).
- Si consolidano solo i contenuti duplicati, con redirect 301 verso la pagina più forte.
- Gli articoli del blog si migrano con lo stesso slug (WordPress, nessun cambio di permalink).
- Ogni pagina ha meta title e description propri (vedi `_src/content/site.mjs`), un solo H1, breadcrumb e dati strutturati (`LocalBusiness`, `Service`, `BreadcrumbList`).
- Il prototipo ha `noindex, nofollow`: **rimuoverlo in produzione**. I canonical puntano già a `https://www.ipmmultiservice.it/`.

## URL mantenuti

`/`, `/pulizie-industriali/`, `/pulizia-impianti-industriali/`, `/sabbiatura-criogenica/`, `/pavimenti-in-resina/`, `/segnaletica-orizzontale/`, `/imbiancature-industriali/`, `/disinfestazione-deratizzazione/`, `/sanificazione-ambienti/`, `/pulizie-civili-e-commerciali/`, `/pulizie-in-cantiere/`, `/fornitura-consumabili/`, `/contatti/`, `/lavora-con-noi/`, `/blog/` e articoli.

## Redirect 301 proposti

| Da | A | Motivo |
|---|---|---|
| `/pulizie-speciali/` | `/sabbiatura-criogenica/` | Stesso contenuto (criogenia e soda blasting) |
| `/le-pulizie-tecniche-industriali/` | `/pulizie-industriali/` | Duplicato del servizio — *solo se è una pagina e non un articolo del blog; se articolo, mantenerlo e linkare il servizio* |
| `/chi-siamo/` (se esiste) | `/azienda/` | Nuova pagina aziendale |
| Eventuali URL con parametri / pagine tag sottili | pagina di categoria pertinente | Pulizia dell'indice |

Nuove pagine senza equivalente: `/azienda/`, `/servizi/`, `/progetti/`.

**Prima del lancio:** esportare da Google Search Console e da un crawl (Screaming Frog) l'elenco completo degli URL con traffico o backlink e completare questa tabella; nessun URL con traffico deve finire in 404.

Esempio `.htaccess` (oppure plugin Redirection in WordPress):

```apache
Redirect 301 /pulizie-speciali/ /sabbiatura-criogenica/
Redirect 301 /chi-siamo/ /azienda/
```

## Dopo il lancio

Inviare la nuova sitemap, monitorare copertura ed errori 404 in Search Console per 8 settimane, confrontare posizioni delle query principali ("pulizie industriali Milano/Monza/Lecco", "pavimenti in resina", "sabbiatura criogenica", "disinfestazione aziende").
