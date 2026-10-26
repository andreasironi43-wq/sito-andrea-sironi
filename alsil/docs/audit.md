# Audit iniziale — sito AL.SIL. S.r.l.

Data: 26.10.2026 · Branch: `alsil-redesign-v2`

## 1. Cosa ho trovato

### Codice sorgente
- Il repository disponibile in questa sessione è `andreasironi43-wq/sito-andrea-sironi`: contiene il sito portfolio di Andrea Sironi (HTML statico) e il prototipo IPM Multiservice. **Il codice del sito AL.SIL non è presente.** AL.SIL compare solo come logo cliente nel portfolio (`index.html`, `lavori/brut-merate`).
- `https://alsil.vercel.app` e `https://www.alsil.it` non sono raggiungibili dall'ambiente (bloccati dalla policy di rete; il DNS di `alsil.vercel.app` non risponde).
- Di conseguenza **non ho potuto leggere framework, componenti, colori, font e logo esistenti**. Su indicazione del committente, il sito è ricostruito da zero in `/alsil`.

### Contenuti del sito attuale (da brief)
Dal brief risultano presenti sul sito attuale questi claim non verificati: titolo "Mille ore in nebbia salina. Nessuna alterazione" con contatore "0 ore" (ISO 9227 NSS); "media del settore: 6 stadi di pretrattamento"; "2 mani di polvere su ogni pezzo"; marchio del prodotto di sigillatura della fase 14 diverso dal manuale; settori serviti (illuminazione, arredamento, trasporti); numero di fax; termine "lavaggio" al posto di "pretrattamento"; contatto tramite `mailto`.

## 2. Decisioni

### Stack
- **Next.js 15 (App Router) + TypeScript + React 19**, CSS puro con token (nessun framework CSS), deploy su Vercel. Progetto Vercel separato con *Root Directory* = `alsil`.
- Font self-hosted con `next/font/local` e `display: swap`: **Archivo** (variabile, testi e titoli) e **JetBrains Mono** (dati tecnici, numeri di fase). Entrambi OFL, già presenti nel repo.
- Nessuna dipendenza runtime oltre a Next/React e `@vercel/blob` (upload allegati > 4 MB, vedi §3).

### Identità visiva
Non avendo accesso a quella esistente, ho scelto un sistema neutro e tecnico, facile da riallineare:
- tutti i colori sono token in `app/globals.css` (`:root`), da sostituire con i valori del brand;
- il logo è un segnaposto testuale "AL.SIL." in `components/Logo.tsx`, da sostituire con il file vettoriale originale;
- nessuna foto: non ho immagini dell'impianto né dei pezzi. Uso solo schemi SVG (stratigrafia del rivestimento, timeline). Gli slot per le foto sono indicati in `docs/claims-da-confermare.md`.

### Contenuti
- Solo fatti del Manuale della Qualità (op. 05, rev. 19.02.24) riportati nel brief, centralizzati in `lib/content.ts`.
- Claim non verificati rimossi o neutralizzati; elenco in `docs/claims-da-confermare.md`.
- Blocchi "Prove di corrosione" e "Prove e certificazioni" pronti ma spenti da flag in `config/features.ts`.

### Pagine
| URL | Contenuto |
|---|---|
| `/` | Hero, dati verificati, sintesi ciclo, ambienti, polveri, controlli, CTA |
| `/ciclo` | Timeline verticale in 3 blocchi |
| `/per-ambiente` | Varianti del ciclo per destinazione d'uso |
| `/preventivo` → `/preventivo/grazie` | Modulo e pagina di conferma |
| `/blog`, `/blog/categoria/[slug]`, `/blog/[slug]` | Blog con categorie, indice, correlati, CTA |
| `/privacy-policy`, `/cookie-policy` | Informative (testo da far validare) |

## 3. Note tecniche importanti
- **Allegato fino a 10 MB su Vercel.** Le funzioni Vercel accettano al massimo ~4,5 MB di body. Allegati ≤ 4 MB passano direttamente alla route; quelli più grandi vengono caricati su **Vercel Blob** (richiede `BLOB_READ_WRITE_TOKEN`) e allegati all'email via URL. Senza Blob configurato, il modulo chiede di inviare i file grandi per email.
- **Email** con Resend (API REST, nessuna chiave nel codice; variabili in `.env.example`).
- **Analytics** (Plausible o GA4) e pixel marketing (Meta, Google Ads) caricati solo dopo consenso nel banner cookie. Eventi: click telefono, click email, invio modulo (conversione).
- **UTM/gclid/fbclid** salvati in `sessionStorage` al primo atterraggio e inviati con il modulo.
- **SEO**: `SITE_URL` governa canonical, og:url, sitemap, robots e JSON-LD.
