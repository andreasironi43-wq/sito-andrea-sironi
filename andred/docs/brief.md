# Brief — sito ANDRED (andred.shop)

Ricostruito dalle indicazioni del progetto. Il brief originale (`attachment.txt`) e il brand book PDF non sono mai stati caricati nel repo: quando arrivano, vanno in `docs/` e hanno la precedenza su questo file.

## Cosa
Sito e negozio di ANDRED, label di abbigliamento indipendente. Pochi oggetti, edizioni limitate, nessuna stagione.

## Per chi
Persone che comprano pochi capi e li tengono a lungo. Leggono i dati tecnici, diffidano dell'urgenza da marketing.

## Il compito della pagina
Oggi (pre-lancio): far iscrivere al prossimo drop. Al drop: far comprare Peder e Rain.

## Direzione visiva
Nordic × Streetwear × Editorial. Titoli enormi in maiuscolo, annotazioni piccole in mono: "BIG INFORMATION. SMALL ANNOTATIONS." Griglia a 12 colonne, bordi 1px, angoli vivi.
Palette: carta #F4F5F1, inchiostro #14171A, pietra #D0D3D0, blu segnale #3B58E8 solo per accenti (3–7%).
Wordmark ANDRED come firma tipografica, nessun logo inventato.

## Evitare
Card arrotondate, gradienti, glassmorphism, ombre pesanti, 3D, finto lusso, estetica heritage / old money, layout da template, animazioni inutili, urgenza finta.

## Sezioni della homepage
1. Apertura: foto del capo, wordmark, "Independent clothing label. Familiar forms. Different perspective.", iscrizione.
2. Intro: "Non pensata per una stagione."
3. Oggetti: PEDER — Shirt 001 (blu a quadri e western rossa), RAIN — Sweatshirt 002, felpa ARTEBECCO (nome e codice da definire).
4. Processo in 5 fasi: ricerca, materiali, campionatura, produzione, dettaglio.
5. Edizioni limitate: "100" come ipotesi da validare (campione, minimi, margine, domanda); scarsità autentica contro scarsità da marketing.
6. Journal (nascosto in pre-lancio).
7. Iscrizione al drop: "Niente di superfluo. Solo il prossimo drop."
8. Footer con wordmark gigante e link legali.

## Dati noti
- Peder: prezzo indicativo €180–200, da confermare; origine Brianza*, da confermare con la produzione reale.
- Rain: felpa a grammatura alta; gocce come piccoli punti tondi di misure diverse su cappuccio e spalle; prezzo da definire.
- Tutto il resto (taglie, materiali, scorte, spedizioni, resi, dati legali) è da definire e resta visibile come token.

## Tecnica
Next.js (App Router) + TypeScript + Tailwind 4, Shopify headless, italiano e inglese (`/it`, `/en`). Mobile-first, controlli a 390/768/1280/1440, Lighthouse mobile ≥ 95, contrasto AA, prefers-reduced-motion.
