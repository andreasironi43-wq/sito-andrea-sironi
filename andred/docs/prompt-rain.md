# Prompt per ChatGPT — RAIN (gocce a puntini) e apertura homepage

Allega prima `public/img/home/peder-blu.webp` (riferimento per modello, luce e luogo), poi incolla il prompt.
Non allegare le vecchie foto di Rain: hanno le gocce sbagliate.
Scrivi "avanti" dopo ogni immagine.

```
Sei il fotografo di ANDRED, label di abbigliamento indipendente. Ti ho allegato una foto approvata: usala come riferimento per il modello, la luce e il tipo di luogo. Genera 10 fotografie, una per messaggio, nell'ordine dell'elenco. Dopo ogni immagine scrivi solo il nome file e aspetta "avanti".

CONSEGNA
- Ogni immagine è una generazione nuova e singola, alla massima risoluzione. Mai collage, griglie, provini o ritagli da un'altra immagine.
- Formato indicato per ogni immagine: VERTICALE 2:3 (1024×1536) oppure ORIZZONTALE 3:2 (1536×1024).

IL CAPO — RAIN (identico in tutte le foto)
- Felpa con cappuccio in cotone a grammatura alta, mano compatta e strutturata, grigio chiaro melange.
- Vestibilità ampia, spalle scese, tasca a marsupio, coulisse bianche piatte, costine a polsi e fondo.
- IL DETTAGLIO DI RAIN SONO LE GOCCE, rese come PICCOLI PUNTI TONDI PERFETTAMENTE CIRCOLARI, blu (#3B58E8):
  - cerchi pieni, piatti, ricamati a filo del tessuto, senza rilievo e senza ombra;
  - MISURE DIVERSE: dal più piccolo di circa 3 mm al più grande di circa 10 mm, mescolati in modo irregolare;
  - SOLO sulla parte alta del cappuccio e sulle spalle, più fitti in alto e sempre più radi scendendo, come pioggia appena caduta;
  - circa 15–25 punti sul cappuccio e 12–20 per spalla; nessun punto su petto, maniche, tasca o schiena bassa;
  - NON a forma di goccia, NON lacrime, NON allungati, NON lucidi, NON in 3D.
- All'interno del collo: etichetta tessuta color carta con scritto solo "ANDRED", maiuscolo, sans-serif nera.
- Nessun'altra grafica, scritta o logo. Nessun marchio di terzi.

STILE
- Fotografia realistica, full frame, 50 mm o 85 mm.
- Luce nordica diffusa, cielo coperto, toni freddi e neutri. Niente golden hour, niente filtri vintage.
- Luoghi: cemento chiaro, pietra chiara, portici, pensiline, scale, marciapiedi, asfalto bagnato dopo la pioggia.
- Modello: lo stesso uomo della foto allegata (capelli castani ricci corti, barba leggera, espressione neutra). Jeans dritti lavaggio medio, t-shirt bianca sotto, sneakers bianche senza logo.

PACKSHOT
- Felpa intera, centrata, su manichino invisibile, sfondo uniforme color carta #F4F5F1, luce morbida, ombra lieve, nient'altro.

ELENCO

APERTURA HOMEPAGE
1. home/hero-verticale.webp — VERTICALE 2:3 — il modello con Rain, cappuccio abbassato, in piedi sotto un portico di cemento chiaro, figura dalle ginocchia in su, leggermente a destra del centro. Punti blu ben leggibili su cappuccio e spalle. Spazio di sfondo pulito sopra la testa.
2. home/hero-orizzontale.webp — ORIZZONTALE 3:2 — stessa scena e stessa luce della 1, inquadratura larga: il modello nel terzo destro, figura intera, a sinistra cemento e luce vuoti.

RAIN
3. rain/fronte.webp — VERTICALE 2:3 — packshot, fronte, cappuccio appoggiato sulle spalle, etichetta ANDRED visibile nel collo.
4. rain/retro.webp — VERTICALE 2:3 — packshot, retro, punti sul cappuccio e sulla parte alta delle spalle, schiena libera.
5. rain/indossata-1.webp — VERTICALE 2:3 — mezzo busto, cappuccio alzato, sotto una pensilina di cemento, asfalto bagnato sullo sfondo, sguardo laterale.
6. rain/indossata-2.webp — VERTICALE 2:3 — figura intera, seduto su scale in pietra chiara, cappuccio abbassato.
7. rain/dettaglio-cappuccio.webp — VERTICALE 2:3 — macro del cappuccio: punti tondi di misure diverse, la trama della felpa, il bordo del cappuccio e le coulisse.
8. rain/dettaglio-spalla.webp — VERTICALE 2:3 — macro della spalla: i punti che si diradano verso il basso e la cucitura della spalla scesa.

ALTRE
9. home/rain-fascia.webp — ORIZZONTALE 3:2 — il modello con Rain cammina su un marciapiede bagnato in città, figura intera, molto spazio intorno.
10. processo/ricerca.webp — ORIZZONTALE 3:2 — tavolo bianco visto dall'alto: schizzi a matita di una camicia e di una felpa con cappuccio con i punti tondi disegnati su cappuccio e spalle, un campione di felpa grigia con alcuni punti blu ricamati, campioni di flanella a quadri blu e rossa, metro da sarta. Nessuna scritta leggibile.

CONTROLLO PRIMA DI OGNI CONSEGNA
- Immagine singola, formato giusto, alta risoluzione.
- I punti sono cerchi perfetti, piatti, blu, di misure diverse, solo su cappuccio e spalle. Nessuna forma a goccia.
- Etichetta esattamente "ANDRED", nessun'altra scritta.
- Stesso grigio melange e stesse coulisse bianche in tutte le foto.

Inizia dall'immagine 1.
```

## Dove vanno nel sito

| File | Dove |
|---|---|
| `home/hero-verticale` | apertura homepage su telefono e tablet |
| `home/hero-orizzontale` | apertura homepage su desktop |
| `rain/*` | scheda Rain, homepage, catalogo |
| `home/rain-fascia` | fascia foto dopo il processo |
| `processo/ricerca` | fase Ricerca (sostituisce lo schizzo con le gocce vecchie) |
