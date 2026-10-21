# ANDRED — homepage

Next.js (App Router) + TypeScript + Tailwind 4. Homepage di andred.shop in italiano (`/it`) e inglese (`/en`); `/` reindirizza a `/it`.

```bash
npm install
npm run dev          # sviluppo su http://localhost:3000
npm run build && npm start
```

Verifica (con il server avviato sulla porta 3123: `./scripts/serve.sh`):

```bash
node scripts/screenshots.mjs            # 390/768/1280/1440: overflow, touch target, contrasto AA
node scripts/form-test.mjs              # stati del form e API
```

## Struttura

```
app/[lang]/layout.tsx        font, metadata, hreflang, JSON-LD
app/[lang]/page.tsx          ordine delle 8 sezioni
app/[lang]/opengraph-image   immagine OG segnaposto
app/api/subscribe/route.ts   endpoint iscrizione
components/sections/         una sezione per file
components/Placeholder.tsx   riquadro immagine
components/Drawings.tsx      disegni SVG di camicia e felpa
lib/i18n/it.ts, en.ts        tutti i testi
lib/newsletter/              adapter newsletter
```

## Token da compilare

Tutti i testi stanno in `lib/i18n/it.ts` e `lib/i18n/en.ts`. Cerca `[` e `Da definire` / `To be defined`.

| Token | Dove |
|---|---|
| `[LINK PRIVACY]` | consenso del form, footer |
| `[LINK COOKIE]`, `[LINK TERMINI]` | footer |
| `[EMAIL]` | footer, contatti |
| `[RAGIONE SOCIALE · P.IVA]` | footer |
| Peder: materiale, colori, taglie, stato | scheda oggetto |
| Peder: prezzo "indicativo €180–200, da confermare" | scheda oggetto |
| Peder: origine "Brianza*" | da confermare con la produzione reale |
| Rain: grammatura (g/m²), colori, taglie, origine, prezzo | scheda oggetto |
| 100 pezzi per modello | ipotesi: campione, minimi, margine, domanda |
| Fornitori e laboratori | processo, fasi 02 e 04 |
| Spedizioni e resi | footer |
| Archivio (edizioni chiuse) | sezione edizioni |
| Journal: 4 titoli provvisori, stato "In arrivo" | sezione journal |
| Carrello (0) | testo statico, nessun e-commerce collegato |

Un link il cui `href` è un token (es. `"[LINK PRIVACY]"`) punta a `#` e mostra il token. Quando metti l'URL vero, il token sparisce da solo.

## Sostituire le immagini

`<Placeholder>` accetta `src`: il riquadro mantiene lo stesso rapporto d'aspetto, quindi il layout non cambia.

```tsx
<Placeholder ratio="3/2" label="…" src="/img/processo-ricerca.jpg" alt="Descrizione della foto" />
```

1. Metti la foto in `public/img/` (JPG/WebP, lato lungo circa 2000 px).
2. Passa `src` e `alt` in `components/sections/Process.tsx`. Se le foto cambiano per fase, aggiungi un campo `src` agli `steps` nei dizionari.
3. Immagine OG: metti `opengraph-image.jpg` (1200×630) in `app/[lang]/` e cancella `opengraph-image.tsx`.
4. Schede oggetto: per ora sono disegni SVG (`components/Drawings.tsx`). Per le foto, sostituisci il disegno in `Objects.tsx` con `<Placeholder ratio="4/5" src=… />`.

## Collegare un servizio newsletter

L'endpoint valida i dati e chiama un adapter. Oggi c'è solo `mock`, che scrive nei log e non invia nulla.

1. Crea `lib/newsletter/<servizio>.ts` che implementa `NewsletterAdapter`:

   ```ts
   import type { NewsletterAdapter } from "./types";

   export const buttondownAdapter: NewsletterAdapter = {
     name: "buttondown",
     async subscribe(sub) {
       const res = await fetch("https://api.buttondown.com/v1/subscribers", {
         method: "POST",
         headers: {
           Authorization: `Token ${process.env.NEWSLETTER_API_KEY}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email_address: sub.email, tags: [sub.locale] }),
       });
       return res.ok ? { ok: true } : { ok: false, reason: "provider_error" };
     },
   };
   ```

   (Vale lo stesso schema per Mailchimp, Brevo, Klaviyo, Resend: cambiano solo URL e body.)
2. Registralo in `lib/newsletter/index.ts` dentro `adapters`.
3. Imposta `NEWSLETTER_PROVIDER` e `NEWSLETTER_API_KEY` nelle variabili d'ambiente (vedi `.env.example`).
4. GDPR: `sub.consentAt` e `sub.consentText` vanno salvati come prova del consenso. Usa il double opt-in del servizio, se c'è. Togli la riga "Nessun invio reale" (`signup.note`) dai dizionari.
