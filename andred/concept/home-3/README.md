# Concept 3 — "Nebbia" (split stage)

Terza homepage da zero: metà schermo ferma con una foto, l'altra metà è una colonna di lettura bianca. Pagina statica: si apre con `index.html`; `img/` è un collegamento a `../../public/img`.

## Ricerca (ottobre 2026)
- Il negozio-rivista: contenuto editoriale accanto ai prodotti (Net-A-Porter, citato nelle rassegne 2026 dei siti di moda).
- Fotografia editoriale dominante e griglia bianca severa (SSENSE).
- Una boutique digitale minimale e "intima", guidata dall'editoriale (Lemaire, casi studio AKQA e Studio Blanco).

Limite: dal container non era possibile aprire i siti; la ricerca si basa su risultati e articoli.

## Direzione (skill design-taste-frontend)
- **split-stage**, tono quiet, seed 1035050067.
- **Palette:** bianco `#FFFFFF`, blu notte `#1F2B4D` (dalla Peder blu), nero `#070A12` per la cornice della foto. Mandarino `#F7941D` solo sui pulsanti "Avvisami".
- **Carattere:** Work Sans 300/400/500, cinque misure.
- **Idea:** "Different perspective" diventa la pagina: la foto ferma cambia quando arriva la sua sezione, e nella sezione "Due lati" fronte e retro dello stesso capo si dividono sulla cucitura dello schermo, con il nome strappato a metà che si ricompone quando il capo è al centro.
- **Elementi interattivi:** pulsanti Fronte/Retro su Peder (cambiano la foto ferma); fila di foto da trascinare; il nome "andred" attraversa il bordo della foto con un inchiostro diverso per ogni fondo.

## Sezioni
1. Foto ferma a sinistra, frase e nome a destra.
2. Colonna stretta: chi è ANDRED.
3. Fila di 11 foto da trascinare.
4. Oggetti: Peder, Rain, felpa (nome e codice da definire), come elenchi di fatti.
5. "100" come ipotesi, con la tabella delle quattro condizioni.
6. Come nasce un capo: la foto ferma segue i passi.
7. Due lati: Peder blu, Peder western, Rain, a tutta larghezza.
8. Ultima foto con l'iscrizione accanto.
9. Footer in una riga.

## Controlli
- Lint e inspector della skill: 0 errori. Quattro avvisi difesi:
  - nessun video: non esiste un filmato vero del brand;
  - fila che scorre di lato: è la fila da trascinare, voluta;
  - carattere diverso da quello della scheda: Work Sans è quello della direzione split-stage;
  - titolo fisso sopra le foto in "Due lati": è l'idea della sezione (il nome sulla cucitura), su una fascia bianca.
- Playwright: nessuno scroll orizzontale a 390/768/1280/1440.

## Da sostituire prima di usarlo
- Rain non ha retro né packshot: in "Due lati" il secondo lato è un ingrandimento delle spalle.
- Token: `[LINK PRIVACY]`, `[LINK]`, `[EMAIL]`, `[RAGIONE SOCIALE · P.IVA]`.
- Il form non invia nulla.
- Blu notte e mandarino cambiano la palette del brand: se si sceglie questo concept vanno aggiornati brief, design system e skill.
