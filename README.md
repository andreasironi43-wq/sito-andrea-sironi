# Sito di Andrea Sironi

Sito statico (HTML, CSS, JS senza librerie) generato da contenuti separati dalla presentazione. Ospitato su Vercel, con una funzione serverless per il modulo di contatto.

## Struttura

```
_src/
  content.mjs      ← contatti, servizi, progetti, FAQ: fonte unica dei contenuti
  cases.mjs        ← testi dei tre casi studio
  pages.mjs        ← template delle pagine
  layout.mjs       ← testata, navigazione, footer, metadati, componenti comuni
  build.mjs        ← genera le pagine HTML, sitemap.xml e robots.txt
  tools/media.py   ← crea le versioni WebP delle immagini
  tools/media.mjs  ← genera immagine social, favicon e screenshot del prototipo IPM
assets/css/site.css, assets/js/site.js, assets/fonts/
api/contact.js     ← funzione Vercel del modulo di contatto
img/, video/, og/  ← media
ipm-multiservice/  ← prototipo di redesign per un cliente (progetto separato, noindex)
tests/             ← test automatici
docs/              ← strategia, design system, SEO, QA, report finale
```

Le pagine `index.html` nelle cartelle sono **generate**: non modificarle a mano.

## Modificare i contenuti

1. Cambia testi o dati in `_src/content.mjs` (o `_src/cases.mjs` per i casi studio).
2. Rigenera: `node _src/build.mjs` (Node 18+, nessuna dipendenza).
3. Controlla in locale: `npx http-server -p 8080 -s` e apri http://localhost:8080.

Aggiungere un progetto: nuovo elemento in `projects` dentro `content.mjs`. Se è un caso studio completo (`case: true`), aggiungi anche il testo in `cases.mjs`.

Nuove immagini: copia il `.jpg` in `img/` e lancia `python3 _src/tools/media.py` per creare il `.webp`.

## Modulo di contatto

Il modulo prova a inviare a `/api/contact`. La funzione invia l'email tramite [Resend](https://resend.com) solo se sono impostate in Vercel le variabili:

| Variabile | Esempio |
|---|---|
| `RESEND_API_KEY` | chiave API di Resend |
| `CONTACT_TO` | `andreasironi43@gmail.com` |
| `CONTACT_FROM` | `Sito <sito@andreasironi.it>` (dominio verificato su Resend) |

Se mancano, o se l'invio fallisce, la pagina **non** mostra un falso successo: prepara il messaggio già scritto da inviare con un tocco via email o WhatsApp. Antispam: campo trappola, tempo minimo di compilazione, limite di invii per IP.

## Test

```bash
npx http-server -p 8080 -s &              # server statico
node tests/qa.mjs http://localhost:8080   # pagine, link, immagini, overflow, menu, modulo
node --test tests/contact-api.test.mjs    # funzione del modulo
```

`tests/qa.mjs` usa Playwright. Per il controllo di accessibilità passa il percorso di `axe.min.js` (pacchetto `axe-core`) nella variabile `AXE`.

## Pubblicazione

Il deploy avviene con il normale collegamento Git ↔ Vercel. `vercel.json` imposta header di sicurezza, cache e slash finale; `.vercelignore` esclude sorgenti, documenti e test.
