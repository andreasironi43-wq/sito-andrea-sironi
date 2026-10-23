---
name: andred-animation
description: Regole di movimento del sito ANDRED (andred/): transizioni, hover, animazioni allo scroll, prefers-reduced-motion. Usala quando aggiungi o modifichi animazioni, stati hover/focus o effetti allo scroll nel sito ANDRED.
---

# Movimento ANDRED

Sobrio. Il movimento accompagna, non decora. **Nessuna libreria di animazione**: solo CSS, più al massimo un piccolo IntersectionObserver.

## Movimenti esistenti (`app/globals.css`)
- **Wordmark lettera per lettera**: `.wm-letter`, 0,7s, ritardo 60ms per lettera. Solo all'apertura.
- **Reveal allo scroll**: classe `.reveal`. Dove il browser lo supporta usa `animation-timeline: view()`; altrove `components/RevealObserver.tsx` aggiunge `.io` / `.is-in`. Sale di 24px con opacità.
- **Indicatore di scroll**: `.scroll-line`, linea blu che scorre.
- **Schede oggetto**: `.object-card`, il disegno o la foto salgono di 6px, la linea blu del link cresce (`.object-tick`).
- **Righe journal**: `.journal-line`, linea blu che cresce sotto la riga.

## Regole
- Solo `transform` e `opacity`. Mai animare layout, colori di sfondo di intere sezioni o dimensioni.
- Durate 0,4–0,7s, curva `cubic-bezier(0.2, 0.7, 0.1, 1)`.
- **Il contenuto è visibile senza JavaScript e senza animazioni.** Il reveal parte da uno stato visibile; con `.io` nasconde solo ciò che non è ancora in vista.
- `prefers-reduced-motion: reduce`: niente spostamenti, transizioni a 0,01ms, tutto subito visibile. Ogni nuova animazione va dentro `@media (prefers-reduced-motion: no-preference)`.
- Hover solo con `@media (hover: hover)`; ogni hover ha anche uno stato `:focus-visible` (contorno blu 2px, `outline-offset: 3px`; su fondo scuro `signal-light`).
- Niente parallax pesante, niente conti alla rovescia o effetti di urgenza.
- Il blu segnale nel movimento resta un dettaglio (linee, puntini), mai un riempimento di grandi superfici.

## Controllo
Prova con `reducedMotion: "reduce"` in Playwright (come fa `scripts/screenshots.mjs`) e senza: a fine scroll nessun elemento `.reveal` deve restare con opacità sotto 1.
