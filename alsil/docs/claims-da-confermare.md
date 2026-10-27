# Claim da confermare prima della pubblicazione

Ogni voce va verificata da AL.SIL. S.r.l. Fonte dei fatti usati nel nuovo sito: Manuale della Qualità, operazione 05, rev. 19.02.24.
Sito precedente analizzato: `alsil-vercel` (alsil.vercel.app).

## A. Claim del brief: rimossi o neutralizzati

| # | Claim nel sito precedente | Cosa ho fatto | Cosa serve per reintrodurlo |
|---|---|---|---|
| a | Hero "Mille ore in nebbia salina." con contatore animato fino a 1.000 ore, badge "Nessuna alterazione", "Camera di prova · ISO 9227 NSS" | Rimossi. Nuovo hero: "Pretrattamento e verniciatura a polvere dell'alluminio pressofuso." Il blocco `components/ProveCorrosione.tsx` è pronto e spento (`config/features.ts` → `proveCorrosione: false`), con l'illustrazione della camera di prova | Rapporto di prova: tipo di prova, ore, norma, laboratorio, data, esito, ciclo/substrato provato. Compilare `proveCorrosione` e mettere il flag a `true` |
| b | "Tredici stadi. La media del settore è sei." (home, ciclo, 3 articoli) | Rimosso ogni confronto con il settore | Fonte pubblicabile del dato di settore |
| c | "2× mani di polvere su ogni pezzo", "Doppia mano, sempre", "Due passaggi di polvere su ogni pezzo" | Sostituito con: "Doppia mano in linea possibile grazie al forno di gelificazione da 30 m, in funzione dal 2015" | — |
| d | Prodotto della fase di sigillatura / "conversione nanotecnologica" | Nessun marchio. Testo: "sigillatura per ambienti molto aggressivi (es. marino) / poco aggressivi" | Decidere se citare i prodotti; se sì, prodotto confermato per iscritto |
| e1 | Settori: illuminazione, arredamento, trasporti, ferroviario, automotive; "aziende leader del settore"; "molte con marchi noti" | Esclusi. Pagina `/settori` tolta (redirect temporaneo a `/azienda`) | Conferma dei settori e autorizzazione a citarli |
| e2 | Fax 035 4931922 (footer e contatti) | Rimosso ovunque | Numero confermato e decisione se pubblicarlo |
| f | "Lavaggio" | Sostituito con "pretrattamento" | — |

## B. Altri claim del sito precedente non verificati (trovati nell'audit)

| # | Claim | Dove era | Cosa ho fatto |
|---|---|---|---|
| 1 | **"13 stadi di pretrattamento"** e la loro descrizione (carico e controllo in ingresso, secondo sgrassaggio, controllo conducibilità, controllo dello strato…) | Home, ciclo, azienda, footer, articoli | Sostituito dal ciclo di 19 fasi del manuale |
| 2 | **"Conversione nanotecnologica… senza cromo esavalente", "in alternativa alla cromatazione"** | Home, ciclo, articoli | **In contrasto con il manuale**, che indica passivazione con cromo trivalente. Rimosso |
| 3 | "Nasce a Medolago nel 1998", "1998 – Anno di fondazione" | Home, azienda | Sostituito con "più di vent'anni di esperienza" (dato del brief) |
| 4 | "Un solo passaggio, dal grezzo all'imballo. I pezzi non escono mai dallo stabilimento" | Home | Rimosso |
| 5 | "Prove periodiche su ogni ciclo", "Report per lotto", "Report di controllo per lotto" | Home, settori | Rimossi. Resta solo il dato del manuale: dossier di prodotto con check-list delle fasi per ogni pezzo |
| 6 | "Prove in camera secondo ISO 9227 NSS sui provini di riferimento del ciclo" | Ciclo | Rimosso (vedi A.a) |
| 7 | Configuratore: "Superdurabile con primer zincante", "Epossipoliestere per interni", "Siliconica resistente al calore", gloss 30–50 / 10–25 / fino a 90, "resistenza in nebbia salina più alta della gamma" | Finiture | Rimossi. Il configuratore ora mostra i 4 ambienti del manuale |
| 8 | "Lavoriamo con i principali produttori di vernici in polvere", riquadri loghi produttori | Finiture | Rimossi |
| 9 | "Tutta la gamma RAL, cartelle NCS, strutturati, martellati, metallizzati", "tinta su campione", "costanza tra i lotti: nessuno scarto visibile" | Finiture | Rimossi. Resta solo "codice RAL o colore richiesto" nel modulo e nell'articolo |
| 10 | "Ritiro e consegna in tutta Italia", "Il servizio copre tutta l'Italia", "Dal prototipo alla produzione" | Settori, azienda | Rimossi |
| 11 | "La data promessa: se diciamo una data, quella è" | Azienda | Rimosso |
| 12 | "Ricerca continua: testiamo nuove polveri e nuovi cicli…" | Azienda | Rimosso |
| 13 | "Visite allo stabilimento su appuntamento" | Azienda, contatti | Rimosso |
| 14 | "Vicino all'uscita di Capriate della A4", "a metà strada tra Bergamo e Milano" | Contatti, azienda | Rimosso; resta "Medolago, provincia di Bergamo" |
| 15 | "Intaglio a croce ISO 2409" | Home | Mantenuto come "aderenza ISO 2409" (dato del manuale) |

## C. Affermazioni del nuovo sito da verificare

| # | Testo | Dove | Dubbio |
|---|---|---|---|
| 1 | "19 fasi" | Ovunque | Dal brief le fasi numerate sono 1–15 (fino all'asciugatura), poi verniciatura, cottura e controlli: 18 voci. **Manca una fase o la numerazione 16–19.** Nel sito le fasi dopo la 15 non sono numerate |
| 2 | Numerazione 1–15 (es. "Fasi 3–5", "Fase 14") | Ciclo | Ricostruita dall'ordine delle operazioni |
| 3 | "Più di vent'anni di esperienza" | Hero, azienda | Confermare; eventualmente indicare l'anno di fondazione |
| 4 | "Studiato per dare ai pezzi in pressofuso un'alta resistenza alla corrosione" | Hero, azienda | Formulato come obiettivo del ciclo, senza dati di prova |
| 5 | "Finitura poliuretanica antigraffiti a facile pulizia" | Per ambiente, blog | Il manuale dice "Easy Clean": non citato come marchio |
| 6 | Esempi di ambiente ("Interni ed esterni senza particolari agenti corrosivi", "Località costiere, aree esposte a salsedine", "Pezzi interrati, annegati o appoggiati su calcestruzzo") | Per ambiente, home | Scritti per spiegare le categorie del manuale |
| 7 | Ambiente poco aggressivo → "polvere poliestere per esterni se il pezzo è esposto alla luce solare" | Per ambiente | Abbinamento dedotto dalle schede polveri |
| 8 | Durata dei 2 risciacqui dopo la disossidazione e dei 4 in acqua demineralizzata | Ciclo | Non indicata |
| 9 | Posizione sulla mappa (lat 45.6703, lon 9.5063) | Contatti | Coordinate prese dal sito precedente: verificare che il segnaposto sia sullo stabilimento |
| 10 | Tempi di conservazione: 24 mesi per le richieste, 10 anni per i rapporti commerciali | Privacy | Valori del sito precedente, "usuali": confermare con il consulente privacy |

## D. Contenuti mancanti o in bozza

| # | Cosa | Dove | Note |
|---|---|---|---|
| 1 | **Testo originale** dell'articolo "Personalizzazione delle tinte: varie tipologie di polveri in base alla destinazione dei materiali" | `lib/blog.ts` | Non presente nemmeno nello zip. L'articolo pubblicato usa solo i fatti del manuale: sostituirlo con il testo originale (correggendo solo la forma) |
| 2 | Data dell'articolo sulle tinte | `lib/blog.ts` | Vuota: non viene mostrata |
| 3 | **4 articoli in bozza** (2, 11, 11 e 13 aprile 2024): "Verniciatura industriale a polvere su alluminio pressofuso", "Resistenza dell'alluminio alle intemperie", "Verniciatura alluminio pressofuso: settori automotive e ferroviario", "Verniciatura dell'alluminio pressofuso per i componenti dei treni" | `lib/blog-drafts.ts` | Titoli e date reali, testi del concept con i claim B.1, B.2, A.b, A.c, A.a. Non pubblicati. I vecchi URL WordPress puntano a `/blog` con redirect temporaneo. Per pubblicarne uno: sostituire il testo, togliere `draft: true`, cambiare il redirect in `next.config.ts` verso `/blog/<slug>` e renderlo permanente |
| 4 | Foto | `public/img/foto/`, `lib/foto.ts` | Inserite 14 foto dell'impianto (cartella Drive "foto"). Da confermare: **diritti d'uso** e credito del fotografo; **liberatoria** delle persone presenti (operatori in `linea-carico`, `cabina-automatica`, `cabina-pezzi-grigi`, `operatore-pezzo`); che i pezzi ritratti siano mostrabili (pezzi di clienti). Non usate: imballaggio (l'imballo non è un dato verificato) e la foto con due operatori riconoscibili in primo piano. Mancano foto di vasche di pretrattamento e forno |
| 5 | Privacy e cookie policy | `app/privacy`, `app/cookie` | Testi del sito precedente aggiornati (modulo con allegato, UTM, analytics e pixel con consenso, fornitori USA). Da far validare |
| 6 | Elenco completo dei vecchi URL WordPress | `next.config.ts` | Estrarlo da Search Console e aggiungere i redirect |
| 7 | REA, capitale sociale | Footer | Non presenti nel brief; valutare se obbligatori |
