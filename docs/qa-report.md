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

## Aggiornamento 4 novembre 2026 — grafica e parallasse

Aggiunti collage nella hero, fascia tipografica scorrevole, parallasse di immagini ed elementi, grana, firma nel footer, barra di lettura (dettagli in `design-system.md`).

Lighthouse mobile dopo l'intervento: home 99 (LCP 2,0 s, CLS 0); Carlambroeus 99 (2,0 s); P.Stop 99 (2,1 s); BRUT 98 (2,4 s). Desktop home 99 (0,9 s). Accessibilità, best practice e SEO 100.

Correzioni nate dalle misure:
- le copertine dei casi avevano priorità di download alta e rallentavano la comparsa del testo: ora priorità bassa (LCP BRUT da 3,0 a 2,4 s);
- WebP della copertina Carlambroeus ricodificato (da 181 a 116 KB);
- il collage della hero veniva scaricato anche su telefono dove è nascosto: ora in caricamento differito (2 immagini scaricate in apertura invece di 5);
- sottolineature dei link nella riga "Ha lavorato con" staccate dal testo su telefono: corrette.

`tests/qa.mjs`: tutti i controlli superati, compresi quelli a 390 px. Nessun errore in console.

## Aggiornamento 5 novembre 2026 — nuova home, liquid glass, più parallasse

- Home riscritta: lavori spostati in basso, materiale "liquid glass", luci colorate, fascia tipografica a colori, sezione "Perché nel tempo" fissata durante lo scorrimento.
- `tests/qa.mjs`: tutti i controlli superati (15 pagine, 6 larghezze, axe a 1280 e 390 px, aree di tocco, caroselli, barra fissa, modulo, movimento ridotto).
- Lighthouse home: mobile 99 (LCP 2,0 s, CLS 0, TBT 50 ms), desktop 100 (LCP 0,4 s). Accessibilità, best practice, SEO 100.
- Fluidità: ~60 fps medi, 95° percentile 16,7 ms, nessun fotogramma oltre 50 ms scorrendo tutta la home con CPU rallentata 4×. Misura in Chromium senza GPU reale: va confermata su un iPhone vero.
- Verificato che la sezione fissata stia nello schermo su iPhone 13 e iPhone SE e che la barra contatto non la copra.

## Aggiornamento 5 novembre 2026 (sera) — stile esteso a tutto il sito

- Stile della home portato su servizi, pagine servizio, lavori, casi studio, chi sono, contatti.
- Vetro solo sugli elementi principali; superficie `.soft` per i secondari.
- Hero senza dissolvenza del testo; sezione "Perché nel tempo" più corta (200vh desktop, 165vh telefono).
- `tests/qa.mjs`: tutti i controlli superati. Funzione modulo 7/7.
- Lighthouse mobile: home 98, servizi 99, P.Stop 98, chi sono 99, contatti 99 (LCP 1,8–2,3 s, CLS ≤ 0,006). Accessibilità, best practice, SEO 100.
- Fluidità home con CPU 4×: 16,7 ms medi, nessun fotogramma oltre 50 ms.

## Aggiornamento 10 novembre 2026 — una schermata per punto, correzioni di scorrimento

Segnalazioni dal telefono e correzioni:
1. **Lettere solo contorno nella fascia**: in Safari comparivano linee dentro le lettere (contorni sovrapposti del font variabile). Sostituite con lettere piene traslucide colorate.
2. **Più spazio**: ogni punto della home ha ora una schermata intera, con testi aggiuntivi; caroselli orizzontali eliminati dalla home e dalla pagina Servizi.
3. **Sezione "Perché nel tempo" tagliata in alto su iPhone**: le altezze usavano `vh`, che in Safari include le barre del browser. Ora `svh` (altezza realmente visibile). Verificato su iPhone 13 e SE.
4. **Card tagliate durante lo scorrimento**: la parallasse verticale dentro un carosello orizzontale faceva uscire le card dal contenitore, che le tagliava. Risolto eliminando i caroselli.
5. **Card che "inseguivano" lo scorrimento**: gli elementi con entrata animata e parallasse avevano una transizione di 1,1 s sul transform, quindi ogni movimento arrivava in ritardo. Ora la transizione riguarda solo l'opacità.

Prestazioni: il motore di parallasse ora legge tutte le misure prima di scrivere (niente ricalcoli forzati del layout). La scala delle card (zoom legato allo scorrimento) è stata tolta: era la causa principale dei rallentamenti. Home con CPU 4×: 16,8 ms medi, 1 fotogramma oltre 50 ms su 948.

Test: `tests/qa.mjs` tutti superati, con due controlli nuovi (almeno 10 schermate a tutta altezza in home, nessuna card tagliata ai lati). Lighthouse home: mobile 99, desktop 100; accessibilità 100.

## Aggiornamento 11 novembre 2026 — home compatta su telefono

Vedi `website-architecture.md` per analisi e interventi. Corretto anche un difetto trovato durante l'analisi: su telefono una luce colorata della sezione "Perché nel tempo" usciva dallo schermo e allargava la pagina a 449 px (il contenitore era passato a `position: static`).

Test aggiornati: su telefono la home deve stare entro 22 schermate (viewport di prova 390×844: 14,6), primo esempio reale entro la schermata 7 (3,9), prima lettura gratuita entro la 9 (5,6), larghezza esatta dello schermo; su desktop almeno 10 schermate a tutta altezza (19). Tutti superati. Lighthouse mobile 98, accessibilità 100. Fluidità con CPU 4×: 16,7 ms medi, nessun fotogramma oltre 50 ms.

## Correzione 12 novembre 2026 — sovrapposizione su telefono

Segnalata dal telefono: la scheda di "Perché nel tempo" finiva sopra la citazione "Un posizionamento che resta su carta…". Causa: su telefono la sezione non è più fissata (`position: relative`), ma aveva conservato `top: var(--nav)` della versione fissata, quindi era spostata di 60 px verso il basso. Corretto con `top: auto`.

Nuovo controllo in `tests/qa.mjs` ("telefono con animazioni attive"): scorre tutta la home a 390×664 con le animazioni attive e verifica che nessun blocco visibile si sovrapponga a un altro. Verificato che il controllo fallisce sulla versione con l'errore e passa con la correzione. Il controllo precedente non poteva vederlo perché girava con "movimento ridotto", che disattiva proprio quel codice.

## 12 novembre 2026 — "Perché nel tempo" a passi

Richiesta dal telefono: un elemento per ogni scorrimento, pallini animati nei loro colori, testo esteso. Implementato come componente `.story` (le vecchie regole `.scrub`, sparse in quattro punti del CSS e causa della sovrapposizione precedente, sono state rimosse). Verificato su iPhone 13, iPhone SE e desktop 1440 px: sequenza corretta dei sei passi e contenuto sempre dentro lo schermo. Nuovo controllo automatico in `tests/qa.mjs`. Tutti i test superati; Lighthouse mobile 99, accessibilità 100; fluidità con CPU 4× 16,8 ms medi, nessun fotogramma oltre 50 ms.

## 12 novembre 2026 — tremolio di "Perché nel tempo" e revisione completa

**Tremolio**, misurato scorrendo la sezione fotogramma per fotogramma (posizione di titolo, scheda e lista mentre la sezione è fissata):

| | Versione precedente | Ora |
|---|---|---|
| iPhone 13 | fino a 21,7 px | 0 px |
| iPhone SE | fino a 18,9 px | 0 px |
| Desktop 1440 | fino a 84 px | 0 px |

Cause e correzioni:
1. Ogni passo apriva un punto e chiudeva il precedente: la scheda cambiava altezza e, centrata in verticale, tutto si spostava. Ora la lista ha righe ad altezza fissa (cambiano solo colori e opacità) e il testo del punto attuale compare in un'area di altezza fissa con una dissolvenza.
2. Le luci colorate nella sezione si muovevano con l'altezza della finestra, che in Safari su iPhone cambia mentre la barra si allarga o si stringe. Nella sezione ora sono ferme; in tutto il sito la parallasse usa un'altezza "stabile", aggiornata solo se cambia la larghezza (rotazione) o se l'altezza cambia molto.
3. A ogni fotogramma veniva riscritta una variabile CSS sull'intera sezione, non più usata: rimossa (evita ricalcoli degli stili).
4. La linea colorata si misura su righe fisse e non si ricalcola durante le transizioni.

Nuovo controllo automatico: la sezione non deve muoversi di più di 0,5 px mentre è fissata (verificato che fallisce sulla versione precedente).

**Revisione completa** (tutte le pagine):
- larghezze controllate dai test: 320, 375, 390, 768, 1024, 1280, 1440, 1920 px, nessun overflow;
- schermi da 1600 px in su: contenuto più largo (1380 px) per non lasciare troppo vuoto ai lati;
- immagini grandi con versione da 480 px per i telefoni (`srcset`), scelta dal browser;
- archivio lavori: prima immagine caricata con priorità e senza entrata animata; su telefono e tablet immagini orizzontali come in home.

Lighthouse (simulazione locale), tutte le 14 pagine pubbliche: desktop 99–100; mobile 96–99 tranne `/lavori/` (89–90: LCP stimato 3,6 s sulla prima foto, mentre primo contenuto e Speed Index sono a 1,4 s e la foto arriva in 0,2 s; il ritardo è nella stima di resa dell'immagine della simulazione, non riprodotto bloccando script, font o altre immagini). Accessibilità, best practice e SEO 100 ovunque. Fluidità home con CPU 4×: 16,7 ms medi, nessun fotogramma oltre 50 ms.

## 13 novembre 2026 — sezione Metodo dal prototipo

Implementata la sezione dal file "Andrea_Sironi___Sezione_Metodo_scroll_v2.html" (dettagli in `design-system.md`). Verificata su iPhone 13, iPhone SE e desktop 1440 px: fasi nell'ordine giusto, parola chiave accesa, contatore, contenuto dentro lo schermo, barra contatto nascosta.

Corretti durante i test: fotogramma vecchio dopo un salto da lontano (ora la sezione si aggiorna a ogni scorrimento), link "Salta" troppo piccolo al tocco (36 → 44 px), barra contatto nascosta per tutto l'elenco con movimento ridotto. Nuovo controllo automatico: sequenza delle cinque fasi, sezione ferma durante lo scorrimento, destinazione del link "Salta". Tutti i test superati. Lighthouse home: mobile 99, desktop 100, accessibilità 100. Fluidità con CPU 4×: 16,7 ms medi, nessun fotogramma oltre 50 ms.

## 13 novembre 2026 — una sola versione del Metodo, ottimizzazione desktop

- La pagina Chi sono mostrava ancora la versione precedente delle cinque fasi (schede in vetro 01–05) e il vecchio diagramma statico "il sito dialoga con i social…". Sostituiti con la stessa sezione Metodo della home: ora esiste una sola versione, generata da `methodStage()` in `_src/pages.mjs`. Il link "Salta" porta alla sezione successiva di ogni pagina.
- Rimossi codice e stili delle versioni precedenti (`.steps`, `.step`, `.system`, `.node`, `.loop`, `.gsteps`, `.gstep`, `.gnum`).
- Desktop: da 1200 px di larghezza e 760 px di altezza la sezione Metodo si ingrandisce (numeri 136 px, titolo fino a 96 px, testo 24 px). Verificato che stia nello schermo a 1024×768, 1366×768, 1440×900 e 1920×1080.
