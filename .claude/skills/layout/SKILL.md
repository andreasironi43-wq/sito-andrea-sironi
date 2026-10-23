---
name: andred-layout
description: Regole di layout del sito ANDRED (andred/): griglia a 12 colonne, allineamenti, struttura responsive, proporzioni delle immagini. Usala quando crei o modifichi pagine, sezioni o la disposizione degli elementi nel sito ANDRED.
---

# Layout ANDRED

## Griglia
- **12 colonne a tutte le larghezze** (`grid-12`, gap = `--gutter`). Su telefono gli elementi occupano di solito `col-span-12`.
- Allineamento a sinistra. Al massimo un momento centrato per pagina.
- Asimmetria dentro la griglia, mai nella cornice: se un testo sta a sinistra, a destra c'è la sua foto, una seconda colonna o un elenco.
- Elementi di griglia con testo: `min-w-0`, così una parola lunga non allarga la colonna.

## Larghezze da verificare
390, 768, 1280, 1440px. Mai scroll orizzontale. Lo script `andred/scripts/screenshots.mjs` controlla tutte e quattro.

## Composizioni in uso
- **Apertura** (`components/sections/Hero.tsx`): telefono = foto 4:5 da bordo a bordo, wordmark, frase, pulsante; desktop = testo a sinistra (4 colonne), foto a destra (8), wordmark a tutta larghezza in basso, tutto nel primo schermo.
- **Oggetti**: 3 schede in colonna su telefono, 3 colonne da `lg`, separate da bordi 1px. Stessa altezza di immagine, codice sotto il nome.
- **Processo**: righe alternate foto/testo (6 + 5 colonne).
- **Edizioni**: sezione su fondo inchiostro, "100" gigante.
- Sezioni vicine non hanno mai la stessa composizione.

## Immagini
- Proporzioni fisse per ruolo: prodotti e indossate **4:5**, processo **3:2**, fasce homepage **16:9** (4:3 su telefono).
- Dove manca una foto: `<Placeholder ratio="…" label="Immagine da inserire">`, così la foto vera entra senza toccare il layout. Senza foto del capo: disegno SVG in `components/Drawings.tsx`.
- Angoli vivi, nessuna ombra, nessun testo sopra le foto.
- Foto in `andred/public/img/`, WebP, lato lungo massimo 1600px, con `next/image`. Solo la foto dell'apertura ha `priority`.

## Navigazione
Wordmark, 3–4 link, un'azione. In pre-lancio (`lib/site.ts`): Oggetti, Processo, About e il pulsante "Iscriviti".

## Non fare
Card arrotondate, griglie di card identiche con icona, glassmorphism, barre di navigazione flottanti, 3D.
