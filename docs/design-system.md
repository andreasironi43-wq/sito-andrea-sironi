# Design system

Fonte: `assets/css/site.css`. Tutti i valori sono token in `:root`: nei template non ci sono colori sparsi.

## Cosa è stato mantenuto del sito originale

- Fondo nero, testo `#F5F5F7`, superfici `#1C1C1E`, filetti bianchi al 10–11%.
- Accenti cyan → blue → indigo → purple e la sfumatura "aurora" della hero.
- Etichette in monospazio maiuscolo con trattino colorato (`.tag`).
- Titoli in due toni: frase principale bianca + seconda frase grigia (`<em>`).
- Il diagramma "sistema" (sito → social → foto → brand → marketing → business) che si accende allo scroll.
- Pulsanti a pillola.

## Cosa è cambiato e perché

| Prima | Ora | Motivo |
|---|---|---|
| Inter Tight e JetBrains Mono da Google Fonts | Gli stessi font, ospitati sul sito (`assets/fonts`, licenza OFL inclusa) | Nessuna chiamata a Google all'apertura della pagina (privacy), un dominio in meno da contattare (velocità) |
| Grigio secondario `#86868B` | `#98989F` | Contrasto ≥ 4.5:1 anche su superfici grigie (WCAG AA) |
| Pulsante primario `#0A84FF` con testo bianco (3.6:1) | `#0071E3` (4.7:1) | Contrasto AA del testo nel pulsante |
| Link in `#0A84FF` | `#4DA3FF` | Leggibilità su nero |
| Etichette a 11px | 12px | Leggibilità |
| CSS e JS copiati in ogni pagina (60 KB per pagina) | Un CSS e un JS condivisi, in cache | Peso e manutenzione |
| Animazioni applicate da script a qualsiasi elemento, con transizione bloccante di 240 ms tra le pagine | Reveal dichiarato con `data-rv`, nessun ritardo sui link | Ogni animazione ha una funzione; la navigazione resta immediata |
| Logotipo con "· Studio" | "Andrea Sironi" con punto in sfumatura | "Studio" suggeriva una struttura non documentata |

## Token

| Gruppo | Token |
|---|---|
| Superfici | `--ink #000` · `--surface #0E0E10` · `--surface-2 #1C1C1E` · `--surface-3 #26262A` · `--hairline` · `--hairline-strong` |
| Testo | `--text #F5F5F7` · `--text-2 #D1D1D6` · `--muted #98989F` |
| Accenti | `--cyan` · `--blue` · `--blue-link` · `--blue-cta` · `--indigo` · `--purple` · `--pink` · `--mint` · `--grad` |
| Raggi | `--r 20px` · `--r-lg 28px` |
| Movimento | `--ease cubic-bezier(.16,1,.3,1)` · `--ease-soft` |

Regola d'uso del colore: gli accenti identificano i tre percorsi (A cyan, B indigo, C purple) e le etichette di sezione. Mai come fondo di grandi aree. La sfumatura compare una sola volta per schermata, sulla parola chiave.

## Scala tipografica

Fluida con `clamp()`, testata a 375, 390, 768, 1024, 1280 e 1440 px.

| Ruolo | Token | Mobile → desktop | Peso / interlinea / spaziatura |
|---|---|---|---|
| Display (solo home) | `--fs-display` | 41 → 102 px | 680 / 0.98 / -0.045em |
| H1 pagine | `--fs-h1` | 38 → 76 px | 650 / 1.0 / -0.042em |
| H2 sezione | `--fs-h2` | 32 → 56 px | 650 / 1.06 / -0.03em |
| H3 | `--fs-h3` | 20 → 24 px | 650 / 1.2 / -0.022em |
| Lead | `--fs-lead` | 18 → 22 px | 400 / 1.5 |
| Testo | `--fs-body` | 17 px | 400 / 1.6 |
| Piccolo | `--fs-small` | 15 px | 400 / 1.55 |
| Etichetta | `--fs-label` | 12 px mono | 500 / maiuscolo / +0.14em |

## Griglia e spazi

- Contenitore massimo 1240 px; margini laterali 20 → 32 → 48 px.
- Spazio tra sezioni `--gap`: 88 → 160 px.
- `.split`: colonna sinistra con titolo che resta fermo durante lo scroll (5/12) e colonna destra di contenuto (7/12). Usato per alternare sezioni dense (liste, FAQ) a sezioni aperte (hero, intuizione, banda "Perché nel tempo").
- Lavori in home: composizione asimmetrica 7 + 4 colonne; nell'archivio griglia regolare a 3.

## Componenti

`btn-primary`, `btn-ghost`, `more` (link in maiuscoletto con freccia), `tag`, `problem`, `path` (card percorso), `work` (card caso), `card` (scheda essenziale), `steps`, `system`, `compare`, `pull` (citazione), `facts` (lista definizioni), `models`, `faq` (`<details>` nativi), `checks`, `items`, `outputs`, `related`, `gal` (galleria a scorrimento con frecce), `insight`, `work-list`, `next-case`, `contact-cta`, `quick` (contatti rapidi), `form` / `field` / `input` / `form-status`.

## Movimento

| Animazione | Funzione | Durata |
|---|---|---|
| Reveal in ingresso (`data-rv`) | Accompagna la lettura sezione per sezione | 0.9–1.1 s, ritardi a scalare di 60–80 ms |
| Linea del "sistema" che si accende | Mostra che gli elementi sono collegati | 1.6 s |
| Zoom leggero delle immagini al passaggio | Indica che la card è cliccabile | 1.1 s |
| Freccia che avanza | Indica la direzione del link | 0.35 s |
| Aurora che deriva | Profondità della hero | 24 s, solo `transform` |

- Solo `transform` e `opacity`: nessun ricalcolo di layout (CLS misurato: 0).
- Con `prefers-reduced-motion: reduce` tutte le animazioni e le transizioni si azzerano e i contenuti sono subito visibili (verificato dai test).
- Senza JavaScript i contenuti sono visibili: le classi di animazione si attivano solo se lo script aggiunge `.js`.

## Accessibilità

- Link "Vai al contenuto", focus visibile ciano su tutti gli elementi.
- Menu mobile con `aria-expanded`, `inert` quando chiuso, chiusura con Esc.
- Gallerie scorrevoli da tastiera (`tabindex=0`, `role=region`) e con pulsanti etichettati.
- Modulo: etichette esplicite, errori collegati con `aria-describedby`, annunciati con `aria-live`, focus sul primo campo errato.
- Target tattili ≥ 44 px.
