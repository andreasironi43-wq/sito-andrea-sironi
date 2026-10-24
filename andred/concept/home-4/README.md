# Concept 4 — "Archivio" (contact sheet)

Quarta homepage da zero: tutte le foto insieme, piccole e in ordine, come il provino di un fotografo. Pagina statica: si apre con `index.html`; `img/` è un collegamento a `../../public/img`. L'HTML si rigenera con lo script descritto in fondo.

## Ricerca (ottobre 2026)
- Fotografia che rompe le regole e cura "da museo" (SSENSE, critiche di design e rassegne 2025).
- Il drop streetwear nasconde quasi sempre i numeri: ANDRED li dice, e mostra tutto quello che ha.

Limite: dal container non era possibile aprire i siti; la ricerca si basa su risultati e articoli.

## Direzione (skill design-taste-frontend)
- **contact-sheet**, tono bold, seed 1210992305.
- **Palette:** nero morbido `#111111`, pannelli `#1C1C1C`, bianco `#F2F2F2`. L'accento bronzo della scheda è stato sostituito con un rosso `#F02E45`, il RED di ANDRED, solo sui pulsanti (contrasto 4,7:1 con il testo nero).
- **Carattere:** Familjen Grotesk (grottesco svedese, su Google Fonts) al posto di General Sans, che è servito da Fontshare e non si carica nell'anteprima.
- **Idea:** pochi capi, quindi si può mostrare tutto: tre capi, il processo, venti foto. Nessuna foto è in evidenza; sceglie chi guarda.
- **Elemento interattivo:** nell'anello d'apertura, indicare una foto la accende, spegne le altre e mette il nome del capo al posto della frase; ogni foto porta alla striscia del suo capo.

## Sezioni
1. Anello di 18 foto attorno al titolo "Pochi capi, tutte le foto."
2. Provino: 20 foto in sei colonne con didascalia.
3. "100" come ipotesi e come lavoriamo, in una colonna stretta.
4. I capi: una foto al centro e le vicine ai lati, con i fatti su una riga (prezzo, edizione, origine).
5. Una frase e l'iscrizione.
6. Footer in una riga.

## Controlli
- Lint e inspector della skill: 0 errori. Quattro avvisi difesi:
  - nessun video: non esiste un filmato vero del brand;
  - strisce che scorrono di lato e "vuoto in mezzo": sono le strisce dei capi, che il programma misura per tutta la loro lunghezza;
  - carattere diverso da quello della scheda: vedi sopra.
- Playwright: nessuno scroll orizzontale a 390/768/1280/1440.

## Da sostituire prima di usarlo
- Rain ha una sola foto vera: la striscia la affianca ai tessuti.
- La felpa ha la stampa ARTEBECCO sul petto; nome e codice sono da definire.
- Token: `[LINK PRIVACY]`, `[LINK]`, `[EMAIL]`, `[RAGIONE SOCIALE · P.IVA]`.
- Il form non invia nulla.
- Il rosso e il nero cambiano la palette del brand: se si sceglie questo concept vanno aggiornati brief, design system e skill.
