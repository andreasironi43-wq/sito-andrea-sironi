# IPM Multiservice — prototipo di redesign

Prototipo frontend ad alta fedeltà del nuovo sito di IPM Multiservice (pulizie industriali e multiservizi, Paderno d'Adda). Multipagina, responsive, animato, senza build obbligatoria: è HTML statico generato da contenuti separati dalla presentazione, pensato come base per un tema WordPress custom.

> Prototipo: tutte le pagine hanno `noindex`. Le immagini sono illustrazioni tecniche segnaposto etichettate "Foto da fornire"; i casi studio sono slot vuoti dichiarati. Nessun dato aziendale è stato inventato (vedi `docs/01-strategia.md`).

## Documentazione

| File | Contenuto |
|---|---|
| `docs/01-strategia.md` | Analisi del business, target, posizionamento, benchmark, 3 direzioni creative, design system, fonti e dati da verificare |
| `docs/02-ux-storyboard.md` | Sitemap, funnel, storyboard della homepage sezione per sezione, regole di movimento |
| `docs/03-seo-redirect.md` | URL mantenuti, redirect 301, checklist SEO |
| `docs/04-wordpress.md` | Mappatura componenti → tema WordPress, checklist di produzione |

## Struttura

```
ipm-multiservice/
├── _src/
│   ├── content/site.mjs      ← tutti i contenuti e i dati aziendali (fonte unica)
│   ├── templates/            ← layout, homepage, pagine interne, componenti
│   ├── build.mjs             ← genera le pagine HTML
│   └── placeholders.mjs      ← genera le illustrazioni segnaposto SVG
├── assets/
│   ├── css/main.css          ← design system (token, componenti, sezioni)
│   ├── js/main.js            ← navigazione, reveal, contatori, form
│   ├── js/home.js            ← storytelling della homepage
│   ├── js/vendor/            ← GSAP 3.13 + ScrollTrigger (locali)
│   ├── fonts/                ← Archivo variabile, JetBrains Mono (self-hosted)
│   └── img/                  ← logo, favicon, ph/*.svg
├── index.html, servizi/, azienda/, progetti/, contatti/, …   ← pagine generate
└── docs/
```

## Avvio e anteprima

Requisiti: Node.js 18+ (solo per rigenerare) e un server statico qualsiasi.

```bash
# dalla radice del repository
python3 -m http.server 8080
# apri http://localhost:8080/ipm-multiservice/
```

Dopo aver modificato contenuti o template:

```bash
cd ipm-multiservice
node _src/build.mjs          # rigenera le pagine
node _src/placeholders.mjs   # (facoltativo) rigenera le illustrazioni
```

Non modificare a mano gli `index.html` generati: si sovrascrivono alla build.

## Sostituire le immagini

Ogni slot è un `<figure class="ph">` generato dalla funzione `ph()` in `_src/templates/layout.mjs`, con codice (es. `PH-00`) e descrizione della foto richiesta. Per usare una foto reale basta passare il nome del file e togliere l'etichetta; in WordPress diventa `wp_get_attachment_image()` con `srcset`.

## Distribuzione

La cartella è statica: funziona così com'è su GitHub Pages, Netlify, Vercel o qualunque hosting, nel percorso `/ipm-multiservice/`. Per la messa online come sito ufficiale seguire `docs/04-wordpress.md` (rimozione `noindex`, form collegato, redirect).

## Tecnologie e scelte

- **HTML semantico + CSS custom**, nessun framework: il markup si porta 1:1 nei template PHP di WordPress.
- **GSAP + ScrollTrigger** per lo scrollytelling, sempre su scroll nativo (niente scroll hijacking, niente Lenis).
- **View Transitions API** per le transizioni tra pagine (miglioramento progressivo).
- **Accessibilità**: skip link, focus visibile, menu e mega menu da tastiera con Esc, `aria-expanded`, errori del form annunciati, `prefers-reduced-motion` rispettato, contenuto completo senza JS, contrasti AA.
- **Performance**: font e librerie locali con `preload`, immagini SVG leggere e `loading="lazy"`, animazioni solo su `transform`, `opacity` e `clip-path`.
- **Form**: validazione in linea, honeypot e tempo minimo di compilazione; da collegare a un endpoint (`data-endpoint`).

## Verifiche eseguite

Chromium headless (Playwright) a 1440×900 e 390×844: nessun errore JS, nessuno scroll orizzontale, menu mobile, mega menu, navigazione da tastiera, validazione e preselezione del form, versione con movimento ridotto e senza JavaScript.
