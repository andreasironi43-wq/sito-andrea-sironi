# Sito AL.SIL. S.r.l. — v2

Next.js 15 (App Router) + TypeScript. Pretrattamento e verniciatura a polvere di alluminio pressofuso, Medolago (BG).

- `docs/audit.md` — cosa ho trovato e scelte fatte
- `docs/claims-da-confermare.md` — **da far verificare ad AL.SIL. prima della pubblicazione**

## Avvio

```bash
cd alsil
npm install
cp .env.example .env.local   # compila le variabili
npm run dev                  # http://localhost:3000
npm test                     # test della route del modulo
npm run lint && npm run typecheck && npm run build
```

## Deploy su Vercel

1. Nuovo progetto Vercel collegato a questo repo, **Root Directory: `alsil`** (framework Next.js, rilevato in automatico).
2. Variabili d'ambiente (vedi `.env.example`): `SITE_URL`, `RESEND_API_KEY`, `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL`, facoltative `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` o `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION`.
3. Resend: verificare il dominio del mittente (`QUOTE_FROM_EMAIL`).
4. Vercel Blob (Storage → Blob): necessario per allegati tra 4 e 10 MB (le funzioni Vercel accettano body fino a ~4,5 MB).
5. Sulle preview (`VERCEL_ENV=preview`) `robots.txt` blocca l'indicizzazione.

## Dove modificare

| Cosa | File |
|---|---|
| Dati aziendali | `lib/site.ts` |
| Ciclo, ambienti, polveri, dati chiave | `lib/content.ts` |
| Articoli e categorie del blog | `lib/blog.ts` |
| Colori e tipografia | `app/globals.css` (`:root`) |
| Logo | `components/Logo.tsx`, `app/icon.svg`, `lib/og.tsx` |
| Prove di corrosione / certificazioni (nascosti) | `config/features.ts` |

## Analytics e consenso

Nessuno script di terze parti parte prima del consenso nel banner. Con "statistiche": Plausible (se `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) altrimenti GA4. Con "marketing": tag Google Ads e Meta Pixel.

Eventi: `Click telefono` / `click_phone`, `Click email` / `click_email`, `Preventivo inviato` / `generate_lead` (+ conversione Google Ads e `Lead` Meta). La conversione parte sulla pagina `/preventivo/grazie` solo dopo un invio reale. In Plausible creare i goal con gli stessi nomi.

UTM (`utm_*`, `gclid`, `fbclid`), pagina di atterraggio e referrer sono salvati in `sessionStorage` e allegati all'email del preventivo.

## Lighthouse (mobile, build di produzione locale)

| Pagina | Prestazioni | Accessibilità | Best practice | SEO |
|---|---|---|---|---|
| Home | 96–99 | 100 | 100 | 100 |
| Ciclo | 95–96 | 100 | 100 | 100 |
| Per ambiente | 98 | 100 | 100 | 100 |
| Preventivo | 96 | 100 | 100 | 100 |
| Articolo blog | 97 | 100 | 100 | 100 |

Report completi in `docs/lighthouse/`. Screenshot in `docs/screenshots/`.
