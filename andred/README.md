# ANDRED — homepage

Next.js (App Router) + TypeScript + Tailwind 4. Sito e negozio di andred.shop in italiano (`/it`) e inglese (`/en`); `/` reindirizza a `/it`. Il negozio usa Shopify in modalità headless: Shopify gestisce prodotti, magazzino, pagamento e ordini; il sito mostra i capi e manda al checkout di Shopify.

```bash
npm install
npm run dev          # sviluppo su http://localhost:3000
npm run build && npm start
```

Verifica (con il server avviato sulla porta 3123: `./scripts/serve.sh`):

```bash
node scripts/screenshots.mjs            # 390/768/1280/1440: overflow, touch target, contrasto AA
node scripts/form-test.mjs              # stati del form e API
COMMERCE_DEMO=1 ./scripts/serve.sh && node scripts/shop-test.mjs   # flusso carrello
```

## Pagine

| Rotta | Contenuto |
|---|---|
| `/it` | homepage |
| `/it/oggetti` | catalogo (drop non chiusi) |
| `/it/oggetti/[handle]` | scheda prodotto: foto, taglie, aggiunta al carrello, dati tecnici |
| `/it/archivio` | drop chiusi, consultabili e non acquistabili |
| `/it/carrello` | carrello, poi checkout Shopify |
| `/it/aiuto` | taglie, spedizioni, resi e recesso, pagamenti, cura |
| `/it/legale/[privacy, cookie, termini, recesso]` | testi legali (da fornire) |

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
lib/commerce/                negozio: tipi, provider Shopify, catalogo di prova, azioni carrello
components/shop/             scheda, carrello, stato del drop
app/api/revalidate/          webhook Shopify per aggiornare il catalogo
```

## Token da compilare

Tutti i testi stanno in `lib/i18n/it.ts` e `lib/i18n/en.ts`. Cerca `[` e `Da definire` / `To be defined`.

| Token | Dove |
|---|---|
| Testi legali | `/legale/privacy`, `cookie`, `termini`, `recesso` |
| Pagina Aiuto | taglie, spedizioni, resi, pagamenti, cura |
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
| Prodotti, taglie, prezzi, scorte | si inseriscono in Shopify |


## Foto

Le foto stanno in `public/img/` (WebP, lato lungo massimo 1600 px), scelte e ridimensionate dal pacchetto `ANDRED_PHOTO_PACK`:

| Cartella | Uso |
|---|---|
| `img/peder/` | Peder in due colori (blu a quadri, western rossa): fronte, retro, indossata, tavole dettaglio |
| `img/artebecco/` | felpa ARTEBECCO (terzo oggetto, nome e codice da definire): fronte, indossata, tavola dettaglio |
| `img/home/` | due foto a tutta larghezza in homepage |
| `img/processo/` | ritagli 3:2 per le fasi Materiali e Dettaglio |

Rain resta con il disegno SVG: nelle foto non c'è una felpa con le gocce. Nel catalogo di prova le foto e i colori arrivano da `objects.items` nei dizionari (`images`, `colors`); con Shopify vanno caricate sui prodotti.

Il pacchetto dichiara che le foto editoriali e i dettagli sono generati digitalmente: prima del lancio vanno verificati capi, etichette, tessuti e finiture, o sostituiti con scatti reali.

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

## Collegare Shopify

Finché mancano le credenziali, il sito usa un **catalogo di prova** costruito solo con i dati dei dizionari (niente taglie, prezzi o scorte inventati) e mostra l'avviso "Catalogo di prova". Con `COMMERCE_DEMO=1` i capi di prova diventano acquistabili, per provare il carrello.

1. **Negozio.** Crea il negozio Shopify (piano Basic basta). In *Impostazioni → Mercati* scegli dove vendi; in *Lingue* aggiungi l'inglese; in *Pagamenti* attiva Shopify Payments.
2. **Canale headless.** Installa l'app *Headless* di Shopify, crea uno storefront e copia il **token pubblico della Storefront API**. Permessi necessari: prodotti, carrello; per mostrare i pezzi rimasti anche `unauthenticated_read_product_inventory`.
3. **Variabili.** Imposta `SHOPIFY_STORE_DOMAIN` e `SHOPIFY_STOREFRONT_TOKEN` (vedi `.env.example`), poi rifai il deploy.
4. **Prodotti.** Per ogni capo: titolo (es. `PEDER`), handle (es. `peder-001`, diventa l'URL), descrizione, foto, varianti per taglia con SKU e scorta. Poi i metafield nel namespace `custom` (*Impostazioni → Dati personalizzati → Prodotti*):

   | Chiave | Tipo | Esempio |
   |---|---|---|
   | `code` | testo | `001` |
   | `model` | testo | `Shirt 001` |
   | `specs` | JSON | `[["Tipo","Camicia"],["Origine","Brianza*"]]` |
   | `footnote` | testo | `* Da confermare con la produzione reale.` |
   | `price_note` | testo | nota mostrata solo se il prezzo non è impostato |
   | `edition_size` | intero | `100` |
   | `drop_status` | testo | `announced`, `open` o `closed` |
   | `drop_date` | data e ora | apertura del drop |
   | `drawing` | testo | `shirt` o `hoodie`: disegno SVG finché mancano le foto |

   Testi e metafield si traducono in inglese con l'app *Translate & Adapt*.
5. **Webhook.** In *Impostazioni → Notifiche → Webhook* crea `products/update`, `products/create`, `products/delete` e `inventory_levels/update` verso `https://andred.shop/api/revalidate`, e metti la chiave di firma in `SHOPIFY_WEBHOOK_SECRET`. Senza webhook il catalogo si aggiorna comunque ogni 60 secondi.
6. **Checkout.** Il pagamento avviene sul checkout di Shopify. Personalizzalo con i colori del sito in *Impostazioni → Checkout* e collega il dominio (es. `checkout.andred.shop`).

### Regole del drop nel codice
- Un capo con `drop_status = closed` va in Archivio e non si vende, anche se resta scorta.
- Pezzi rimasti: per ora si mostra solo Disponibile / Esaurito. Per mostrare il numero, `SHOW_STOCK_COUNT=1`.
- Nessun conto alla rovescia: la data del drop si mostra come data.

### Cambiare piattaforma
Il sito usa solo i tipi in `lib/commerce/types.ts`. Per passare ad altro, scrivi un nuovo provider che implementa `CommerceProvider` e selezionalo in `lib/commerce/index.ts`.
