# Claude per il sito ANDRED — guida di lavoro

Adattamento della guida "Claude for Web Design" al progetto ANDRED. I passi 1–5 sono già fatti nel repo: qui servono come mappa. I prompt sono pronti da copiare.

```
Claude Code
  ↓ skill ANDRED (taste, typography, spacing, layout, animation)
  ↓ brief + design system + CLAUDE.md
  ↓ (Figma, facoltativo)
  ↓ Playwright (script in andred/scripts)
Design → Codice → Test nel browser → Screenshot → Correzioni
```

---

## 1. Aprire il progetto
```bash
git clone https://github.com/andreasironi43-wq/sito-andrea-sironi.git
cd sito-andrea-sironi
git checkout claude/andred-homepage-1xm3aq
claude
```
All'avvio Claude legge `CLAUDE.md` e carica le skill in `.claude/skills/`.

## 2. Il progetto
Il sito ANDRED è in `andred/` (Next.js + Tailwind + Shopify headless). Nella cartella principale c'è anche il sito di andreasironi.it, da non toccare.
```bash
cd andred && npm install && ./scripts/serve.sh   # http://localhost:3123/it
```

## 3–4. Skill di design (già presenti)
```
.claude/skills/
├── taste/          direzione del brand, cosa evitare, precedenze
├── typography/     Inter Tight + IBM Plex Mono, scala con clamp(), righe leggibili
├── spacing/        margini 16/24/40, ritmo tra sezioni, target 44px
├── layout/         griglia a 12 colonne, composizioni, proporzioni 4:5 · 3:2 · 16:9
├── animation/      wordmark, reveal allo scroll, hover, reduced motion
└── design-taste-frontend/   critica generale; dove contraddice il brand vince il brand
```
I principi della guida, versione ANDRED:
- gerarchia forte: una cosa enorme per schermo (wordmark, "100", nome del capo);
- tipografia intenzionale: maiuscolo stretto per i titoli, mono piccolo solo per i dati veri;
- spazio che serve a leggere, non vuoto;
- composizione riconoscibile, mai a card;
- **zero** gradienti (la guida dice "pochi": per ANDRED sono vietati);
- spaziatura coerente, un'azione principale per schermo, movimento con uno scopo.

## 5. Il brief
È in `andred/docs/brief.md`. Quando chiedi una pagina nuova, usa questo schema:

```
Crea [la pagina] del sito ANDRED.

Che cos'è: [es. la pagina del Journal / la pagina Drop 01 / la scheda di un nuovo capo].
Per chi: persone che comprano pochi capi e li tengono a lungo, leggono i dati tecnici,
diffidano dell'urgenza da marketing.
Compito della pagina: [es. far iscrivere al drop / far leggere un articolo / far comprare].

Direzione: Nordic × Streetwear × Editorial. Big information, small annotations.
Segui CLAUDE.md, docs/brief.md, docs/design-system.md e le skill ANDRED.

Evita: card arrotondate, gradienti, glassmorphism, ombre, 3D, estetica heritage,
layout da template, animazioni inutili, urgenza finta.

Contenuti: [elenco delle sezioni].
Dati mancanti: non inventarli, usa token visibili o "Da definire".
```

## 6–7. Figma (facoltativo)
Serve solo se disegnate le pagine in Figma prima del codice. Per collegarlo: impostazioni dei connettori su claude.ai → Figma. Poi verifica con:
```
Controlla se il collegamento a Figma è disponibile.
```
Prompt per una pagina in Figma:
```
Disegna in Figma la homepage di ANDRED seguendo docs/design-system.md:
griglia a 12 colonne, carta #F4F5F1, inchiostro #14171A, pietra #D0D3D0,
blu #3B58E8 solo per accenti, Inter Tight e IBM Plex Mono, angoli vivi, bordi 1px.
Ordine: navigazione, apertura con foto e wordmark, intro, oggetti, iscrizione al drop,
processo, edizioni limitate, footer. Versione desktop 1440 e mobile 390.
```

## 8–9. Playwright e server
Il repo ha già i suoi script con Playwright (non serve il collegamento MCP):

| Script | Cosa controlla |
|---|---|
| `scripts/screenshots.mjs` | screenshot a 390, 768, 1280 e 1440; overflow, testi fuori dal box, target sotto 44px, contrasto AA |
| `scripts/qa.mjs` | tutte le pagine raggiungibili: link, immagini rotte, errori in console, un solo h1 |
| `scripts/form-test.mjs` | iscrizione al drop: errori, focus, messaggio, endpoint |
| `scripts/shop-test.mjs` | carrello (con `COMMERCE_DEMO=1`) |

## 10. Chiedere il test
```
Avvia il sito ANDRED e testalo nel browser con gli script in andred/scripts.
Controlla:
- tutte le pagine in /it e /en, link, immagini, errori in console
- apertura su telefono: foto, wordmark, frase e pulsante visibili senza scorrere
- navigazione e menu mobile, pulsante "Iscriviti"
- form di iscrizione: campi vuoti, email sbagliata, senza consenso, invio riuscito
- schede prodotto: foto, dati tecnici, "Avvisami al drop" in pre-lancio
- overflow orizzontale, testi fuori dal box, target touch, contrasto AA
- blu segnale solo come accento; su fondo scuro la variante chiara
- nessun marchio di terzi nelle foto, nessun dato inventato
Riportami cosa non va, poi correggilo e ripeti il test.
```

## 11. Screenshot per il controllo visivo
```
Fai gli screenshot della homepage e delle schede prodotto a 390, 768, 1280 e 1440.
Guardali e controlla:
- gerarchia: una cosa enorme per schermo
- wordmark e titoli che non escono dalla larghezza
- margini uguali a destra e a sinistra, ritmo tra le sezioni
- allineamenti sulla griglia a 12 colonne
- foto con le proporzioni giuste (4:5, 3:2, 16:9), senza marchi di terzi
- componenti coerenti tra le pagine
Dimmi i tre problemi più visibili e correggili.
```

## 12. Il ciclo
```
DESIGN → CODICE → TEST NEL BROWSER → SCREENSHOT → REVISIONE → CORREZIONE → DI NUOVO TEST
```
Esempi di correzione utili per ANDRED:
```
Su telefono la frase dell'apertura va a capo male. Mettila su due righe pulite e riprova.
La scheda di Rain ha troppo spazio vuoto sotto la foto. Riduci del 20% e riprova.
Il blu segnale si vede troppo nella sezione Journal. Riducilo a un solo dettaglio.
```

## 13. Design system
È in `andred/docs/design-system.md` (valori veri in `app/globals.css`). A differenza dell'esempio della guida: **raggio 0**, niente card, niente modali.

## 14. Regole del brand
Sono in `CLAUDE.md` (letto a ogni sessione) e nella skill `taste`. In breve:
- Brand: label di abbigliamento indipendente, pochi capi, edizioni limitate.
- Design: Nordic × Streetwear × Editorial.
- Tipografia: titoli enormi in maiuscolo, annotazioni mono piccole.
- Spaziatura: margini 16/24/40, ritmo costante.
- Movimento: sobrio, sempre con reduced motion.
- Evita: gradienti, glassmorphism, card arrotondate, animazioni casuali, spazi incoerenti, dati inventati, urgenza finta.

## 15. Il prompt finale per ANDRED
```
Lavora sul sito ANDRED in andred/.

Prima leggi CLAUDE.md, docs/brief.md, docs/design-system.md e usa le skill ANDRED
(taste, typography, spacing, layout, animation). design-taste-frontend vale solo come
critica: dove contraddice il brand vince il brand.

Compito: [cosa fare, es. "costruisci la pagina Drop 01" / "rifai la scheda di Rain con le foto nuove"].

Implementa nel codice esistente, con i componenti e i token che ci sono già.
Testi solo nei dizionari it/en. Non inventare dati: usa token visibili.

Poi avvia il server ed esegui:
- scripts/screenshots.mjs sulle pagine toccate (390, 768, 1280, 1440)
- scripts/qa.mjs
- Lighthouse mobile sulla homepage (obiettivo ≥ 95 su tutte e quattro le categorie)

Guarda gli screenshot, trova i problemi visivi, correggili e ripeti finché gli script
danno 0 problemi. Poi fai il commit, il push e aggiorna l'anteprima.
Non fermarti al codice: completa il ciclo design → codice → test → screenshot.
```

## 16. In dieci righe
1. Apri il repo con Claude Code (legge `CLAUDE.md`).
2. Le skill ANDRED sono già in `.claude/skills/`.
3. `taste` decide le precedenze e cosa evitare.
4. Figma solo se serve.
5. Playwright è già negli script.
6. Dai a Claude il compito con lo schema del passo 5.
7. Claude costruisce nel codice esistente.
8. Gli script testano le pagine.
9. Gli screenshot mostrano il risultato vero.
10. Revisione → correzione → nuovo test, finché è a 0 problemi.
