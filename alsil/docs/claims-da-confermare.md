# Claim da confermare prima della pubblicazione

Ogni voce va verificata da AL.SIL. S.r.l. Fonte dei fatti già usati nel sito: Manuale della Qualità, operazione 05, rev. 19.02.24.

## A. Claim rimossi o neutralizzati

| # | Claim nel sito precedente | Cosa ho fatto | Cosa serve per reintrodurlo |
|---|---|---|---|
| a | Titolo hero "Mille ore in nebbia salina. Nessuna alterazione" (ISO 9227 NSS) e contatore "0 ore" | Rimossi. Nuovo hero: "Pretrattamento e verniciatura a polvere dell'alluminio pressofuso". Il blocco `components/ProveCorrosione.tsx` è pronto e spento (`config/features.ts` → `proveCorrosione: false`) | Rapporto di prova con: tipo di prova, ore, norma, laboratorio, data, esito, ciclo/substrato provato. Compilare `proveCorrosione` in `config/features.ts` e mettere il flag a `true` |
| b | "Media del settore: 6 stadi di pretrattamento" | Rimosso. Nessun confronto con i concorrenti | Fonte pubblicabile del dato di settore |
| c | "2 mani di polvere su ogni pezzo" | Sostituito con: "Doppia mano in linea possibile grazie al forno di gelificazione da 30 m, in funzione dal 2015" | — (resta la formulazione del manuale) |
| d | Marchio del prodotto di sigillatura della fase 14 (diverso da quello del manuale 19.02.24) | Nessun marchio citato. Testo: "sigillatura per ambienti molto aggressivi (es. marino) / poco aggressivi" | Decidere se citare i prodotti. Se sì, prodotto corretto confermato per iscritto |
| e1 | Settori serviti: illuminazione, arredamento, trasporti | Esclusi dal testo | Conferma dei settori ed eventuale autorizzazione a citarli |
| e2 | Numero di fax | Escluso da footer, pagine e dati strutturati | Numero confermato (e se va ancora pubblicato) |
| f | Termine "lavaggio" | Sostituito ovunque con "pretrattamento" | — |
| g | Certificazioni | Nessuna citata. Il blocco `components/ProveCertificazioni.tsx` è pronto e spento (`proveCertificazioni: false`) | Certificati validi: nome, ente, numero, scadenza, PDF |

## B. Affermazioni presenti nel nuovo sito da verificare

| # | Testo nel sito | Dove | Dubbio |
|---|---|---|---|
| 1 | "19 fasi" | Hero, dati chiave, pagina Ciclo | Il manuale (come riportato nel brief) elenca con numero le fasi 1–15 (fino all'asciugatura), poi verniciatura, cottura e controlli: sono 18 voci. **Manca una fase o la numerazione 16–19.** Nel sito le fasi 16–19 non sono numerate. Serve l'elenco esatto |
| 2 | Numerazione fasi 1–15 (es. "Fasi 3–5: 3 risciacqui in acqua di rete", "Fase 14: sigillatura") | Pagina Ciclo | Ricostruita dall'ordine delle operazioni; verificare con il manuale |
| 3 | "Più di vent'anni di esperienza" | Hero, footer | Dato del brief; confermare se va indicato l'anno di fondazione |
| 4 | "Alta resistenza alla corrosione" | Hero | Formulato come obiettivo del ciclo ("studiato per dare"), senza dati di prova. Confermare la formulazione |
| 5 | "Finitura poliuretanica antigraffiti a facile pulizia" | Per ambiente, blog | Il manuale dice "Easy Clean": non citato come marchio. Confermare se "Easy Clean" è un nome commerciale e se va citato |
| 6 | Descrizioni degli ambienti ("Interni ed esterni senza particolari agenti corrosivi", "Località costiere, aree esposte a salsedine", "Pezzi interrati, annegati o appoggiati su calcestruzzo") | Per ambiente, home | Esempi di uso scritti da me per spiegare le categorie del manuale. Verificare che siano corretti |
| 7 | Ambiente poco aggressivo: "Polvere poliestere per esterni […] se il pezzo è esposto alla luce solare" | Per ambiente | Abbinamento dedotto dalle schede polveri, da confermare |
| 8 | "Disossidazione acida: asporta il rame presente in superficie" | Ciclo | Formulazione del manuale; confermare |
| 9 | Durata 2 risciacqui dopo disossidazione e 4 risciacqui in demineralizzata | Ciclo | Non indicata (non presente nel brief) |
| 10 | Schema stratigrafia (passivazione → sigillatura → primer opzionale → polvere) | Home | Schema illustrativo da far validare ai tecnici |

## C. Contenuti mancanti

| # | Cosa | Dove | Note |
|---|---|---|---|
| 1 | **Testo originale dell'articolo** "Personalizzazione delle tinte: varie tipologie di polveri in base alla destinazione dei materiali" | `lib/blog.ts` | Non era accessibile durante il lavoro. L'articolo attuale è scritto **solo con i fatti del manuale** e va sostituito con il testo originale (correggendo solo la forma) prima della pubblicazione |
| 2 | Data di pubblicazione dell'articolo | `lib/blog.ts` (`date`) | Lasciata vuota: non viene mostrata né inserita nei dati strutturati |
| 3 | Logo vettoriale originale | `components/Logo.tsx`, `app/icon.svg`, `lib/og.tsx` | Ora segnaposto testuale "AL.SIL." |
| 4 | Colori e font del brand | `app/globals.css` (`:root`) | Il sito precedente non era accessibile: palette e font sono provvisori |
| 5 | Foto dell'impianto (cabine, forno, linea di pretrattamento, controlli) e dei pezzi | Home, Ciclo | Nessuna foto inventata o di stock. Da inserire con `next/image` |
| 6 | Privacy policy e cookie policy | `app/privacy-policy`, `app/cookie-policy` | Testi base da far validare al consulente privacy; manca il periodo di conservazione |
| 7 | Dominio finale | `SITE_URL` | Ipotizzato `https://www.alsil.it` in `.env.example` |
| 8 | Codice ATECO, REA, capitale sociale | Footer | Non presenti nel brief; valutare se obbligatori nel footer |
