# Concept homepage ANDRED (da zero)

Homepage rifatta da zero tenendo solo il nome ANDRED e le foto. Pagina statica (HTML, CSS, poco JavaScript), separata dal sito Next.js: si apre con `index.html`. `img/` è un collegamento a `../../public/img`.

## Ricerca
- **Il minimal nordico** (COS, Arket, Our Legacy, Norse Projects) mette il capo su fondo bianco con poco testo. Lo fanno tutti, quindi da solo non distingue.
- **Il drop streetwear** punta su nero, conto alla rovescia e "limited". I numeri di produzione raramente sono dichiarati (FashionUnited, "Small batch, big numbers", 2026).
- **Lo spazio libero per ANDRED:** scarsità dichiarata con numeri veri e nessuna fretta, insieme al dettaglio del capo.

Limite: dal container non era possibile aprire i siti dei brand; la ricerca si basa su articoli e casi studio.

## Direzione (skill design-taste-frontend)
- Direzione **specimen-catalogue**, seed 298539368: ogni capo è un esemplare su un campo piatto, alla stessa scala, con i suoi dati.
- Carattere ridistribuito una volta: da Chillax (tondo, amichevole, servito da Fontshare) a **Hanken Grotesk**.
- Palette ANDRED mantenuta: carta, inchiostro, pietra, blu segnale.
- **Idea:** i punti di pioggia del cappuccio di Rain diventano l'unico segno della pagina: il punto blu del capo selezionato, i 100 punti dell'edizione.
- **Elemento interattivo:** scegli l'esemplare (Peder blu, Peder western, Rain); Peder blu passa lentamente da fronte a retro ("Different perspective").

## Sezioni
1. Esemplare con elenco dei nomi.
2. Una frase con le foto dentro le parole.
3. Peder da ogni lato.
4. "Un numero detto prima": 100 pezzi come ipotesi, 0 conti alla rovescia.
5. Come nasce un capo, con riquadri che crescono.
6. L'oggetto torna, con l'iscrizione.
7. Il nome costruito a blocchi.

## Controlli
- Inspector della skill: 0 errori. Quattro avvisi difesi:
  - nessun video: non esiste un filmato vero del brand;
  - la sezione dell'iscrizione e la "pausa" segnalata: la foto di Rain è posizionata in assoluto e lo strumento non la conta;
  - striscia orizzontale su telefono: scelta del layout.
- 5 misure di carattere, nessuno scroll orizzontale a 390/768/1280/1440, form e selettore verificati con Playwright.

## Da sostituire prima di usarlo
- Rain usa il disegno: manca il packshot.
- Peder western ha solo il retro, dal primo pacchetto foto.
- Token: `[LINK PRIVACY]`, `[LINK]`, `[EMAIL]`, `[RAGIONE SOCIALE · P.IVA]`.
- Il form non invia nulla.
