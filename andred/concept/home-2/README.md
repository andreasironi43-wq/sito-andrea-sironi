# Concept 2 — "Cobalto" (pinned poster)

Seconda homepage da zero, con colori e stile completamente diversi dal sito attuale e dal concept 1. Pagina statica: si apre con `index.html`; `img/` è un collegamento a `../../public/img`.

## Ricerca (ottobre 2026)
- Foto a tutta pagina che dominano dall'alto in basso (Rains, nella lista 2026 dei migliori siti streetwear di My Codeless Website).
- Intreccio stretto tra immagini e testo (Personal Effects, stessa lista).
- Tipografia enorme in movimento e colori pieni e saturi per lo streetwear (articoli sulle tendenze 2026).
- Interazione costruita sul capo stesso (Max Mara "Jacket Circle", Awwwards Site of the Day, 16 aprile 2026).

Limite: dal container non era possibile aprire i siti; la ricerca si basa su risultati e articoli.

## Direzione (skill design-taste-frontend)
- **pinned-poster**, tono bold, seed 256528794.
- **Palette:** quella assegnata (verde bottiglia e oro) è stata sostituita perché tira verso l'heritage. I colori vengono dai capi:
  - cobalto `#1E3DC8`, dai puntini di Rain;
  - senape `#E9B83C`, dalle righe di Peder;
  - bianco freddo `#F1F3F6` e nero `#121417`.
  - Contrasti: bianco su cobalto 7,4:1, nero su senape 10:1.
- **Carattere:** Epilogue 900 e 400/500, cinque misure.
- **Idea:** il nome si divide in **AND** e **RED**, fissati ai due lati, e i capi passano in mezzo in un rullo verticale. Funziona solo con questo nome.
- **Elemento interattivo:** nella scheda di Peder un cursore gira la camicia dal fronte al retro ("Different perspective").

## Sezioni
1. AND | rullo di foto | RED, fisso per poco più di uno schermo.
2. Frase e tre foto.
3. Peder e Rain: dettaglio a tutto schermo con la scheda in una colonna.
4. "100" su campo senape, con le quattro condizioni che decidono il numero.
5. Scegli, Taglia, Cuci, Rifinisci: un verbo enorme sopra ogni foto del processo.
6. Fascia senape: tutta la fascia è il link "AVVISAMI".
7. Footer bianco con iscrizione e il nome tagliato in basso.

## Controlli
- Inspector della skill: 0 errori. Tre avvisi difesi:
  - nessun video: non esiste un filmato vero del brand;
  - "lato vuoto" nella sezione Rain: è occupato dalla foto a tutto schermo;
  - "testo fisso sopra le foto" su telefono: il rullo è ritagliato dalla sua finestra e non tocca AND e RED (verificato a occhio).
- Playwright: nessuno scroll orizzontale a 390/768/1280/1440, cursore fronte/retro e form funzionanti, tutte le sezioni compaiono.

## Da sostituire prima di usarlo
- Il packshot di Rain manca: nella scheda c'è un ritaglio della foto indossata.
- Token: `[LINK PRIVACY]`, `[LINK]`, `[EMAIL]`, `[RAGIONE SOCIALE · P.IVA]`.
- Il form non invia nulla.
- Il cobalto e il senape cambiano la palette del brand: se si sceglie questo concept vanno aggiornati brief, design system e skill.
