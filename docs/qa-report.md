# QA report

Data: 2 novembre 2026. Ambiente: server statico locale (`http-server`), Chromium 1243 via Playwright 1.63, axe-core 4.10.2, Lighthouse 12.6.1. Riproducibile con i comandi nel README.

## Risultati

| # | Controllo | Come | Esito |
|---|---|---|---|
| 1 | Build di produzione | `node _src/build.mjs` → 15 pagine, sitemap, robots | ✓ |
| 2 | Type checking | Non applicabile: JavaScript senza TypeScript né build | — |
| 3 | Linting | Non configurato nel progetto; JSON-LD e `vercel.json` validati come JSON dai test | parziale |
| 4 | Test delle pagine | 15 pagine: stato 200, un solo H1, lingua, title unici, description, canonical, gerarchia titoli | ✓ |
| 5 | Navigazione | Menu desktop; menu mobile apre, chiude con Esc, `aria-expanded` corretto | ✓ |
| 6 | Link | 22 link interni distinti + file statici (sitemap, favicon, OG, video): tutti 200. Ancore della home `#contatto`, `#lavori`, `#metodo` presenti | ✓ |
| 7 | Form e CTA | Validazione campi obbligatori, focus sul primo errore, nessun falso successo senza server, conferma solo con risposta 200, preselezione del percorso da `?tipo=`. Funzione server: 7/7 test (metodo, validazione, antispam, 503 senza credenziali, invio con `reply_to`, errore fornitore, limite per IP) | ✓ |
| 8 | Responsive | Nessun overflow orizzontale a 375, 390, 768, 1024, 1280, 1440 px su tutte le pagine; screenshot rivisti a 375 e 1440 | ✓ |
| 9 | Accessibilità | axe-core regole WCAG 2.0/2.1/2.2 A e AA su tutte le pagine: 0 violazioni. Lighthouse Accessibility 100 | ✓ automatico |
| 10 | Audit SEO | Lighthouse SEO 100 sulle pagine misurate; dati strutturati validi come JSON | ✓ |
| 11 | Console | Nessun errore JavaScript o di rete su tutte le pagine | ✓ |
| 12 | Immagini mancanti | Tutte le immagini decodificate, comprese quelle nelle gallerie orizzontali e caricate in differita | ✓ |
| 13 | Performance | Lighthouse (sotto) | ✓ |
| 14 | Metadati e social | OG e Twitter su ogni pagina, immagine 1200×630 presente | ✓ |
| 15 | Sitemap e indicizzazione | Tutte le pagine pubbliche in sitemap; 404 e prototipo IPM `noindex` | ✓ |
| — | Testi provvisori | Ricerca automatica di "da inserire", "da completare", "TODO", "placeholder", "P.IVA da…": nessuna occorrenza | ✓ |
| — | Movimento ridotto | Con `prefers-reduced-motion` tutti i contenuti sono visibili subito | ✓ |

## Lighthouse (simulazione, server locale)

| Pagina | Dispositivo | Performance | Accessibilità | Best practice | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 98 | 100 | 100 | 100 | 1,8 s | 0 | 120 ms |
| `/` | desktop | 100 | 100 | 100 | 100 | 0,5 s | 0 | 0 ms |
| `/lavori/brut-merate/` | mobile | 95 | 100 | 100 | 100 | 2,9 s | 0 | 0 ms |
| `/lavori/brut-merate/` | desktop | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms |
| `/contatti/` | mobile | 99 | 100 | 100 | 100 | 1,7 s | 0 | 0 ms |
| `/contatti/` | desktop | 100 | 100 | 100 | 100 | 0,4 s | 0 | 0 ms |
| `/servizi/` | mobile | 99 | 100 | 100 | 100 | 1,8 s | 0 | 0 ms |
| `/servizi/` | desktop | 100 | 100 | 100 | 100 | 0,4 s | 0 | 0 ms |

Limiti di questi numeri:
- Sono misure di laboratorio da server locale, senza CDN né rete reale. I Core Web Vitals reali (75° percentile) andranno letti in Search Console o Vercel Speed Insights dopo la pubblicazione.
- LCP mobile del caso BRUT (2,9 s simulati) è sopra la soglia di 2,5 s: l'elemento LCP è la foto di copertina sotto il testo. Possibile intervento: versione più leggera della copertina per mobile.
- Il vecchio sito non è stato misurabile in questo ambiente: la pagina attende Google Fonts, bloccato dalla rete della sandbox, e Lighthouse non registra alcun rendering. È anche il motivo per cui i font ora sono ospitati sul sito.

Peso: HTML 21–24 KB per pagina (prima ~60 KB con CSS e JS copiati in ogni pagina), CSS condiviso 31 KB, JS condiviso 11 KB, font 88 KB in totale.

## Problemi trovati e risolti durante la QA

| Problema | Correzione |
|---|---|
| Al cambio di campo l'errore del messaggio spariva e spostava il layout: il clic sulla casella privacy andava a vuoto | Gli errori si aggiornano mentre si scrive |
| La sfumatura della hero superava il bordo a 375 px su tre pagine | `overflow-x: clip` sulla radice |
| Etichetta blu a contrasto insufficiente nella pagina Chi sono | Token `--blue-link` |
| Salto H1 → H3 nella pagina Servizi | H2 nascosto per le card dei percorsi |
| Didascalie della galleria P.Stop non corrispondenti alle foto (ereditate dal sito precedente) | Riscritte guardando ogni immagine |
| Copertina dei casi piccola e allineata a sinistra su desktop | Copertina affiancata al testo |

## Non verificato

- Invio reale del modulo via Resend (servono le credenziali).
- Comportamento su dispositivi fisici iOS/Android e lettori di schermo reali (VoiceOver, TalkBack): i test automatici non sostituiscono una prova manuale.
- Header di sicurezza di `vercel.json` in produzione (non c'è un deploy da qui).
- Sito pubblico su Vercel: non raggiungibile dalla rete della sandbox.
