# Architettura del sito

Percorso: **Scoperta → Comprensione → Fiducia → Dimostrazione → Contatto**.

## Mappa

| URL | Ruolo nel percorso | Stato precedente | Indicizzata |
|---|---|---|---|
| `/` | Tutto il percorso in sintesi | Esisteva, riscritta | Sì |
| `/servizi/` | Comprensione: tre percorsi e tre modi di iniziare | Esisteva (4 servizi), riscritta | Sì |
| `/servizi/strategie-marketing/` | Percorso A — pagina SEO | Esisteva, riscritta | Sì |
| `/servizi/sito-web/` | Percorso B — pagina SEO | Esisteva, riscritta | Sì |
| `/servizi/content-creator/` | Percorso B — foto e video | Esisteva, riscritta | Sì |
| `/servizi/social-media-manager/` | Percorso C — pagina SEO | Esisteva, riscritta | Sì |
| `/lavori/` | Dimostrazione: archivio | **Nuova** (prima il link "Tutti i lavori" portava alla home) | Sì |
| `/lavori/carlambroeus/` | Caso studio | Esisteva, uniformata | Sì |
| `/lavori/brut-merate/` | Caso studio | Esisteva, uniformata | Sì |
| `/lavori/p-stop/` | Caso studio | Esisteva, uniformata | Sì |
| `/chi-sono/` | Fiducia: profilo, formazione, metodo | **Nuova** | Sì |
| `/contatti/` | Contatto: rapido e guidato | **Nuova** | Sì |
| `/privacy-policy/` | Legale | Era "da completare" | Sì |
| `/cookie-policy/` | Legale | Era "da completare" | Sì |
| `/404.html` | Errore | Senza navigazione | No |
| `/ipm-multiservice/` | Prototipo per un cliente, linkato da `/lavori/` | Invariato | No (già `noindex`) |

## Navigazione

- Principale: **Servizi · Lavori · Chi sono · Contatti** + pulsante "Raccontami il progetto".
- Su mobile: menu a tutto schermo con le stesse voci, telefono e WhatsApp in basso.
- "Metodo" non è una pagina: è una sezione della home e di Chi sono (`/chi-sono/#metodo`). Una pagina dedicata ripeterebbe gli stessi cinque passi.
- **Insights / blog: non creato.** Non esistono articoli o materiali editoriali. Un blog vuoto o riempito di testi generici danneggerebbe credibilità e SEO. Le idee editoriali sono in `growth-roadmap.md`.

## Homepage — ordine delle sezioni

1. **Hero** — headline, descrizione, ruolo, CTA "Raccontami il progetto" + "Guarda i lavori", area geografica, elemento di autorevolezza (NABA + nomi dei clienti).
2. **Il problema** — tre situazioni tipiche in cui un'azienda si riconosce.
3. **Tre percorsi** — Direzione, Identità e strumenti, Regia continuativa.
4. **Lavori selezionati** — tre casi + accesso all'archivio.
5. **Metodo** — cinque fasi, con il diagramma del "sistema" (elemento originale del sito, mantenuto).
6. **Perché una collaborazione continuativa** — il valore della regia nel tempo.
7. **Profilo** — chi è, formazione, dove lavora.
8. **Contatto** — tre modi di iniziare + canali rapidi.

Eliminati: la sezione "Cliente ideale" con nove settori alla pari (sostituita da una gerarchia), la frase-manifesto "La comunicazione non è un insieme di grafiche" ripetuta (assorbita nel metodo), il pop-up newsletter e il banner cookie (vedi `final-report.md`).

## Case study — struttura comune

1. Intestazione: settore, luogo, titolo, sintesi
2. Scheda: cliente, settore, periodo, ruolo
3. Immagine principale
4. Situazione iniziale e problema
5. Obiettivo
6. Intuizione strategica
7. Lavoro realizzato (voci numerate)
8. Materiali (gallerie per tema)
9. Cosa è cambiato — solo evidenze qualitative, deliverable effettivi, stato del progetto
10. Servizi collegati + caso successivo + CTA

## Struttura dei dati

Tutti i contenuti condivisi stanno in `_src/content.mjs`: contatti, navigazione, servizi, progetti, FAQ. Le pagine si rigenerano con `node _src/build.mjs`. Vedi README.
