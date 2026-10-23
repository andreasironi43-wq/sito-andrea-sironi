# Repository

Due siti in questo repo:
- **Root**: sito statico di andreasironi.it (`index.html`, `servizi/`, `lavori/`, `ipm-multiservice/`…). Non toccarlo per lavori su ANDRED.
- **`andred/`**: sito e negozio di ANDRED, label di abbigliamento indipendente (andred.shop). Next.js App Router + TypeScript + Tailwind 4, Shopify headless.

# ANDRED — regole di progetto

Prima di qualsiasi lavoro di design o contenuto su ANDRED leggi:
1. `andred/docs/brief.md`: cosa è il sito, per chi, sezioni, dati noti. Come lavorare passo passo: `andred/docs/guida-claude-andred.md`.
2. `andred/docs/design-system.md`: colori, tipografia, spaziatura, componenti.
3. Le skill in `.claude/skills/`: `taste` (priorità e direzione del brand), `typography`, `spacing`, `layout`, `animation`. `design-taste-frontend` vale solo come critica: dove contraddice il brand (mono, bordi 1px, numerazione) vince il brand.

Ordine di precedenza: richieste dell'utente → brand book (quando sarà in `docs/`) e brief → skill ANDRED → design-taste-frontend.

## Regole che non si negoziano
- Non inventare dati: colori, taglie, scorte, prezzi, produzione, spedizioni, recensioni, dati legali. Dove manca, token visibile o "Da definire".
- "100 pezzi per modello" è un'ipotesi da validare. Niente conti alla rovescia, niente urgenza finta.
- Nessun marchio di terzi nelle foto (solo l'etichetta ANDRED).
- Testi solo in `andred/lib/i18n/it.ts` ed `en.ts`.
- Vietati: angoli arrotondati, gradienti, glassmorphism, ombre pesanti, 3D, estetica heritage.

## Comandi (dalla cartella `andred/`)
```bash
./scripts/serve.sh                                   # build + server su :3123
node scripts/screenshots.mjs http://localhost:3123 /it   # 390/768/1280/1440: overflow, touch, contrasto
node scripts/qa.mjs                                  # tutte le pagine: link, immagini, console, h1
node scripts/form-test.mjs                           # iscrizione al drop
COMMERCE_DEMO=1 ./scripts/serve.sh && node scripts/shop-test.mjs   # carrello
npx tsc --noEmit
```
Modalità pre-lancio attiva per default (`andred/lib/site.ts`); `PRELAUNCH=0` apre il negozio.

## Il ciclo di lavoro
Costruisci → apri nel browser → screenshot alle 4 larghezze → guarda gli screenshot → correggi → ripeti. Prima di consegnare: 0 problemi negli script, Lighthouse mobile ≥ 95 sulle quattro categorie.
