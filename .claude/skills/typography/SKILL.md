---
name: andred-typography
description: Regole tipografiche del sito ANDRED (andred/). Usala quando scrivi o modifichi titoli, testi, didascalie, dimensioni dei caratteri, interlinea o larghezza delle righe in qualsiasi pagina o componente del sito ANDRED.
---

# Tipografia ANDRED

Principio del brand: **BIG INFORMATION. SMALL ANNOTATIONS.** Due misure fanno il lavoro: una enorme, una piccola. Niente di intermedio senza motivo.

## Caratteri
- **Inter Tight** (variabile, un solo file) per tutto: titoli e testo. Caricato con `next/font` in `app/[lang]/layout.tsx`, `display: swap`.
- **IBM Plex Mono 400** solo per le annotazioni: dati tecnici, codici capo, etichette di sezione, stato. Mai per frasi da leggere.
- Mai un terzo carattere. Mai corsivo decorativo o parole evidenziate in colore dentro un titolo.

## Utility già pronte (`app/globals.css`)
- `display`: maiuscolo, peso 700, tracking `-0.045em`, interlinea `0.86`. Per tutti i titoli grandi.
- `mono`: 12px (`--text-mono`, minimo leggibile su mobile), maiuscolo, tracking `0.04em`, interlinea 1.45.

## Scala in uso (riusala, non inventarne una nuova)
| Ruolo | Classe |
|---|---|
| Wordmark ANDRED (hero e footer) | `text-[clamp(3rem,calc((min(100vw,1600px)-2*var(--gutter))/3.85),26rem)]`: riempie la larghezza senza uscire |
| Titolo di sezione (h2) | `text-[clamp(2.75rem,9.5vw,9.5rem)]` |
| Nome oggetto in griglia a 3 | `text-[clamp(3rem,13vw,7rem)] lg:text-[clamp(2.5rem,5.6vw,6rem)]` |
| Titolo fase / riga journal | `text-[clamp(2rem,10vw,3.5rem)] md:text-[clamp(2rem,4.5vw,5rem)]` |
| Frase dell'hero | `text-[clamp(1.25rem,2vw,2rem)]`, peso 500, sentence case |
| Testo corrente | `text-lg` (18px), `leading-snug`; mai sotto i 16px |
| Annotazioni | `mono` |

## Regole
- Ogni titolo usa `clamp()` e **non esce mai dal suo box**. Una parola lunga ("CAMPIONATURA", "INFORMATIVA") decide la misura massima della colonna: calcola circa 0,63em per lettera in `display`.
- Titoli al massimo su due o tre righe; `[text-wrap:balance]` sui titoli lunghi.
- Righe di testo tra 38 e 65 caratteri: `max-w-[38ch]` … `max-w-[65ch]`.
- Testo corrente nell'inchiostro pieno (`text-ink`); `text-muted` solo per note secondarie e annotazioni.
- Gli statement di brand restano in inglese ("Familiar forms. Different perspective."); il resto è nei dizionari `lib/i18n/it.ts` ed `en.ts`, mai scritto nei componenti.
- Un solo `h1` per pagina: il wordmark in homepage, il nome del capo nella scheda.

## Controllo
`node andred/scripts/screenshots.mjs http://localhost:3123 /it` segnala i testi fuori dal box, l'overflow e il contrasto sotto AA alle 4 larghezze.
