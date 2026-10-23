---
name: andred-taste
description: Direzione di gusto e di brand per il sito ANDRED (andred/): cosa rende il sito ANDRED e non un sito generato. Usala prima di ogni lavoro di design, redesign, revisione o contenuto sul sito ANDRED; ha la precedenza sulle regole generiche di design-taste-frontend quando sono in conflitto.
---

# Gusto ANDRED

ANDRED è una label di abbigliamento indipendente. Direzione: **Nordic × Streetwear × Editorial**. "Familiar forms. Different perspective."

## Priorità quando le regole si contraddicono
1. Le richieste dell'utente.
2. Il brand book ANDRED (quando sarà in `docs/`) e il brief in `andred/docs/brief.md`.
3. Questa skill e le skill `andred-typography`, `andred-spacing`, `andred-layout`, `andred-animation`.
4. `design-taste-frontend`, come critica. Le sue regole contro didascalie mono, bordi da 1px e numerazione delle sezioni **non valgono qui**: sono scelte del brand. Valgono invece: foto grande in apertura, titolo chiaro, un solo pulsante principale, niente card con icone, niente gradienti.

## Evitare il sito generico
- Niente layout medi: titolo centrato su tre righe, righe di card con icone, gradienti morbidi, angoli arrotondati ovunque, ombre.
- Ogni sezione ha un motivo per esistere e una composizione diversa dalla vicina.
- Le annotazioni mono danno **dati veri** (codice capo, composizione, edizione, stato), non decorazioni come "Indice 00".

## Priorità
- Gerarchia forte: una cosa enorme per schermo.
- Tipografia intenzionale: Inter Tight in maiuscolo stretto per i titoli, mono piccolo per i dati.
- Spazio bianco che serve a leggere, non vuoto da riempire.
- Composizione riconoscibile: wordmark da bordo a bordo, "100" gigante, righe dati.
- Spaziature coerenti (vedi `andred-spacing`).
- Interazioni chiare: un'azione principale per schermo, stati di focus visibili.
- Movimento con uno scopo (vedi `andred-animation`).

## Colore
- Carta `#F4F5F1`, inchiostro `#14171A`, pietra `#D0D3D0`.
- Blu segnale `#3B58E8` solo per accenti, stati attivi e micro-dettagli: il **3–7% della superficie**. Su fondo inchiostro usa `#8196F2` (`signal-light`): il blu pieno lì non passa AA.
- Rosso `#B3261E` solo per gli errori dei form.
- **Vietati:** gradienti, glassmorphism, ombre pesanti, 3D, finto lusso, estetica heritage / old money (campagna, ranch, golden hour).

## Fotografia
- Luce nordica diffusa, cemento e pietra chiara, toni freddi e neutri.
- Etichetta tessuta solo "ANDRED". **Mai marchi di terzi** (niente FORTELA, niente stanley/stella).
- Rain: gocce come piccoli punti tondi blu di misure diverse su cappuccio e spalle, mai a forma di lacrima.
- Foto generate solo come provvisorie; per vendere servono scatti dei capi reali.

## Contenuti (non negoziabili)
- Italiano con struttura per l'inglese; testi solo nei dizionari.
- **Non inventare** colori, taglie, scorte, prezzi, stato di produzione, spedizioni, recensioni, dati legali, press. Dove manca un dato: token visibile (`[PREZZO]`, `[EMAIL]`, `[RAGIONE SOCIALE · P.IVA]`) o "Da definire".
- "100 pezzi per modello" è un'ipotesi da validare: dichiararlo sempre.
- Niente conti alla rovescia, "ultimi pezzi" o urgenza finta.
- Tono: diretto, asciutto, frasi corte, nessun aggettivo da brochure.

## Prima di consegnare
- `node andred/scripts/screenshots.mjs` con 0 problemi alle 4 larghezze.
- Lighthouse mobile ≥ 95 su Performance, Accessibility, Best Practices, SEO.
- Guarda gli screenshot: se una cosa sembra sbagliata nell'immagine, è sbagliata.
