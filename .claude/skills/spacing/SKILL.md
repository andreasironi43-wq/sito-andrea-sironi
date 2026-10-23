---
name: andred-spacing
description: Regole di spaziatura del sito ANDRED (andred/): margini, padding, distanza tra sezioni, target touch. Usala quando aggiungi o modifichi sezioni, componenti o spazi nel sito ANDRED.
---

# Spaziatura ANDRED

## Margini della pagina
- Un solo margine laterale, `--gutter`: **16px** fino a 767px, **24px** da 768px, **40px** da 1280px.
- Contenuto dentro `wrap` (padding `--gutter`, larghezza massima 1600px, centrato).
- Le foto possono andare da bordo a bordo solo su telefono e tablet (l'apertura); su desktop restano nella griglia.

## Ritmo verticale
- Tra le sezioni: `pb-24 md:pb-36` (96px / 144px). La distanza tra sezioni è sempre maggiore di qualsiasi spazio interno.
- Ogni sezione si apre con `SectionHead` (bordo superiore 1px, etichetta mono, indice "01 / 05" calcolato in `app/[lang]/page.tsx`), poi `mt-10 md:mt-16` prima del titolo.
- Dentro una sezione: `gap-y-6` tra blocchi vicini, `gap-y-10` tra gruppi.
- Tra titolo e testo di supporto: 16–32px.

## Elementi interattivi
- Target touch **almeno 44px** (`min-h-11`, `h-11`, `size-11`). Pulsanti principali `h-14`.
- Le checkbox stanno in una `label` alta almeno 44px.

## Righe e bordi
- Righe di separazione: 1px, `border-ink` su carta, `border-stone` per le righe interne (dati tecnici), `border-stone-dim/40` su inchiostro.
- Padding delle righe dati: `py-2.5`; righe editoriali (journal, processo): `py-5 md:py-7` o `py-8 md:py-12`.

## Non fare
- Niente margini diversi a destra e a sinistra.
- Niente spazi vuoti più alti di mezzo schermo, tranne una pausa voluta per pagina.
- Niente `margin` tra fratelli quando basta `gap`.
