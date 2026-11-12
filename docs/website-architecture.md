# Architettura del sito

Percorso: **Scoperta → Comprensione → Fiducia → Dimostrazione → Contatto**.

## Mappa

| URL | Ruolo nel percorso | Stato precedente | Indicizzata |
|---|---|---|---|
| `/` | Tutto il percorso in sintesi | Esisteva, riscritta | Sì |
| `/servizi/` | Comprensione: tre percorsi e tre modi di iniziare | Esisteva (4 servizi), riscritta | Sì |
| `/servizi/strategie-marketing/` | Percorso A — pagina SEO | Esisteva, riscritta | Sì |
| `/servizi/sito-web/` | Percorso B — pagina SEO | Esisteva, riscritta | Sì |
| `/servizi/content-creator/` | Percorso B — foto e video | Esisteva, riscritta | Sì |
| `/servizi/social-media-manager/` | Percorso C — pagina SEO | Esisteva, riscritta | Sì |
| `/lavori/` | Dimostrazione: archivio | **Nuova** (prima il link "Tutti i lavori" portava alla home) | Sì |
| `/lavori/carlambroeus/` | Caso studio | Esisteva, uniformata | Sì |
| `/lavori/brut-merate/` | Caso studio | Esisteva, uniformata | Sì |
| `/lavori/p-stop/` | Caso studio | Esisteva, uniformata | Sì |
| `/chi-sono/` | Fiducia: profilo, formazione, metodo | **Nuova** | Sì |
| `/ristoranti/` | Landing per acquisire clienti nella ristorazione (ristoranti, bar, locali) | **Nuova** (novembre 2026) | Sì |
| `/pmi/` | Landing per acquisire PMI e aziende senza ufficio marketing | **Nuova** (novembre 2026) | Sì |
| `/ristoranti/check-up/` | Destinazione degli annunci Meta per ristoratori: offerta check-up gratuito | **Nuova** (novembre 2026) | No (`noindex`, fuori sitemap) |
| `/ristoranti/check-up/grazie/` | Conferma dopo l'invio, misura le conversioni | **Nuova** | No |
| `/contatti/` | Contatto: rapido e guidato | **Nuova** | Sì |
| `/privacy-policy/` | Legale | Era "da completare" | Sì |
| `/cookie-policy/` | Legale | Era "da completare" | Sì |
| `/404.html` | Errore | Senza navigazione | No |
| `/ipm-multiservice/` | Prototipo per un cliente, linkato da `/lavori/` | Invariato | No (già `noindex`) |

## Navigazione

- Principale: **Servizi · Lavori · Chi sono · Contatti** + pulsante "Raccontami il progetto".
- Su mobile: menu a tutto schermo con le stesse voci, telefono e WhatsApp in basso.
- "Metodo" non è una pagina: è una sezione della home e di Chi sono (`/chi-sono/#metodo`). Una pagina dedicata ripeterebbe gli stessi cinque passi.
- **Insights / blog: non creato.** Non esistono articoli o materiali editoriali. Un blog vuoto o riempito di testi generici danneggerebbe credibilità e SEO. Le idee editoriali sono in `growth-roadmap.md`.

## Homepage — ordine delle sezioni

Aggiornato il 10 novembre 2026: **una schermata intera per ogni punto**, nessun carosello orizzontale. Ogni sezione ha una schermata di introduzione, poi un punto per schermata con testo esteso.

1. **Hero** — headline, descrizione, CTA, composizione in vetro, riga di credibilità.
2. **Fascia tipografica** a colori.
3. **Il punto di partenza** — introduzione + 3 schermate (situazione, "come si riconosce", "cosa cambia").
4. **Tre percorsi** — introduzione + 3 schermate (problema, per chi, obiettivo, cosa comprende, modalità, link alla pagina servizio).
5. **Metodo** — introduzione + sezione fissata (prototipo "Sezione Metodo, scroll v2"): cinque fasi una dopo l'altra durante lo scorrimento, sfondo che cambia colore, numeri a contorno che scorrono, una parola chiave accesa alla volta, link "Salta" verso "Perché nel tempo". Uguale su telefono e desktop.
6. **Perché nel tempo** — sezione fissata durante lo scorrimento.
7. **La differenza** — fornitori separati / una regia sola.
8. **Chi sono**.
9. **Lavori selezionati** — introduzione + 3 schermate (immagine grande, settore, periodo, ruolo, link al caso) + accesso all'archivio.
10. **Come si inizia** — introduzione + 3 schermate ("ideale se").
11. **Contatto**.

### Telefono: versione compatta orientata al contatto (11 novembre 2026)

Analisi della versione "una schermata per punto" su iPhone 13 (664 px visibili):

| Misura | Prima | Dopo |
|---|---|---|
| Lunghezza home | 35,3 schermate | 18,5 schermate |
| Parole | 1.561 | 1.097 |
| Primo percorso | schermata 7,9 | 4,5 |
| Primo esempio reale (caso cliente) | 24,0 | 5,0 |
| Prima lettura gratuita (il gancio più forte) | 29,7 | 7,1 |
| Sezione contatto | 32,4 | 15,7 |

Problemi trovati: le prove arrivavano dopo 24 schermate; il primo passo gratuito era quasi in fondo; il metodo occupava da solo 5,5 schermate; tre sezioni (punto di partenza, "Perché nel tempo", "La differenza") ripetevano lo stesso concetto; la composizione in vetro della hero occupava spazio senza informare.

Interventi (solo sotto i 900 px; il desktop mantiene una schermata per punto):
- hero: frase di rassicurazione sotto i pulsanti ("La prima conversazione è gratuita e non impegna. Parli direttamente con me."), composizione decorativa nascosta;
- ogni percorso mostra un caso reale collegato (Direzione → Carlambroeus, Identità e strumenti → BRUT, Regia continuativa → P.Stop);
- riquadro "Non sai da quale percorso partire?" con la prima lettura gratuita subito dopo i percorsi (anche su desktop);
- punti compatti: situazione + "cosa cambia"; percorso + cosa comprende; metodo: titolo + cosa ottieni;
- "La differenza" nascosta (ripete "Perché nel tempo"), che su telefono diventa un blocco statico;
- immagini dei lavori in 16:10; niente parallasse sulle card compatte (evita sovrapposizioni).

Eliminati: la sezione "Cliente ideale" con nove settori alla pari (sostituita da una gerarchia), la frase-manifesto "La comunicazione non è un insieme di grafiche" ripetuta (assorbita nel metodo), il pop-up newsletter e il banner cookie (vedi `final-report.md`).

## Case study — struttura comune

1. Intestazione: settore, luogo, titolo, sintesi
2. Scheda: cliente, settore, periodo, ruolo
3. Immagine principale
4. Situazione iniziale e problema
5. Obiettivo
6. Intuizione strategica
7. Lavoro realizzato (voci numerate)
8. Materiali (gallerie per tema)
9. Cosa è cambiato — solo evidenze qualitative, deliverable effettivi, stato del progetto
10. Servizi collegati + caso successivo + CTA

## Struttura dei dati

Tutti i contenuti condivisi stanno in `_src/content.mjs`: contatti, navigazione, servizi, progetti, FAQ. Le pagine si rigenerano con `node _src/build.mjs`. Vedi README.

## Landing `/ristoranti/` (14 novembre 2026)

Obiettivo: richieste da ristoranti, bar e locali. Pensata come destinazione per il link in bio di Instagram, le campagne Meta e le ricerche locali ("social media manager ristoranti Brianza", "foto per ristoranti Lecco").

Percorso: **hero** (problema riconoscibile + promessa + prima lettura gratuita + WhatsApp) → **Ti riconosci?** (quattro situazioni tipiche di un locale) → **Cosa faccio per il tuo locale** (social, foto e video, sito e prenotazioni, menu/eventi/clienti, ognuno con link alla pagina servizio) → **un esempio concreto** (format grafico di P.Stop con le due foto reali) → **tre casi** (Carlambroeus, BRUT, P.Stop) → **come si parte** (tre passi) → **FAQ dei ristoratori** → **modulo** con "Nome del locale" e tipo già impostato su "Comunicazione continuativa", più contatti rapidi.

Regole rispettate: solo lavori e dati documentati; nessun numero di risultato, nessuna testimonianza, nessun prezzo. La barra contatto in basso su telefono porta al modulo della pagina ("Prima lettura gratuita").

Collegamenti: footer di tutte le pagine ("Per ristoranti e locali") e pagina Chi sono (riga "Specializzazione"). Non è nella navigazione principale, che resta a quattro voci.

Il modulo è lo stesso componente della pagina Contatti (`contactForm()`), con etichette e preselezione configurabili.

## Landing `/pmi/` (14 novembre 2026)

Obiettivo: richieste da PMI e aziende senza un ufficio marketing, in particolare tecniche e industriali. Destinazione per LinkedIn, messaggi diretti, passaparola e ricerche come "consulente marketing PMI Brianza".

Percorso: **hero** ("Fate un ottimo lavoro. La vostra comunicazione lo dice?" + prima lettura gratuita + email) → **Vi riconoscete?** (sito che non rappresenta, fornitori scollegati, materiali commerciali inadeguati, nessuno che se ne occupa) → **Cosa faccio** (posizionamento, identità e materiali, sito web, comunicazione continuativa) → **esempio concreto** (brochure AL.SIL.: un processo tecnico spiegato a chi deve scegliere) → **lavori per aziende** (Flytech, prototipo IPM Multiservice dichiarato come prototipo, riposizionamento Carlambroeus) → **come si parte** → **FAQ delle aziende** (costo, tempi documentati: analisi 3–6 settimane, sito 4–8; aziende tecniche; logo e sito già presenti; chi segue il lavoro; area) → **modulo** con tipo preselezionato "Strategia e posizionamento".

Tono: "voi" rivolto all'azienda, prima persona singolare per Andrea. Stesse regole della landing ristoranti: niente risultati, testimonianze o prezzi non documentati. AL.SIL. compare una sola volta (esempio), per non ripetere la stessa immagine. Collegamenti: footer di tutte le pagine ("Per PMI e aziende") e Chi sono (riga "Anche"). Le due landing condividono gli stili `.lp-*`.

### `/pmi/` in stile chiaro (15 novembre 2026)

Su richiesta: meno testo, comunicazione più diretta, sfondo bianco pulito in stile Apple. Solo questa pagina; il resto del sito resta scuro.

- Testo ridotto da circa 1.000 a 350 parole (modulo compreso); su telefono la pagina passa da 16,7 a 12 schermate e il modulo arriva alla schermata 8 invece che alla 12.
- Struttura: titolo ("Fate un ottimo lavoro. Fatelo capire.") → tre problemi in una riga ciascuno → quattro servizi con una frase → esempio AL.SIL. → tre lavori → tre passi → quattro domande → modulo.
- Tema chiaro attivabile per pagina (`page({ light: true })` → `body.theme-light`): sfondo bianco, grigio #f5f5f7 per le sezioni alterne, testo #1d1d1f, blu #0071e3 per pulsanti e #0066cc per i link; nessuna luce colorata, vetro o grana. Navigazione, menu, barra in basso, modulo e footer hanno la loro versione chiara.
- Componenti `.a-*` (titolo grande centrato, sezioni alterne bianco/grigio, tessere arrotondate) riutilizzabili per altre pagine chiare.

## Pagina per le campagne `/ristoranti/check-up/` (novembre 2026)

Nata dalla valutazione di `/ristoranti/` come destinazione di annunci: 15,6 schermate su telefono, modulo alla schermata 11,6, 817 parole, 17 link in uscita, modulo a 7 campi senza telefono, nessuna misurazione. `/ristoranti/` resta per il traffico organico e il link in bio.

| Misura (iPhone 13) | /ristoranti/ | /ristoranti/check-up/ |
|---|---|---|
| Lunghezza | 15,6 schermate | 7,7 |
| Modulo | schermata 11,6 | 5,2 (pulsante nella prima schermata e barra in basso sempre visibile) |
| Parole | 817 | 355 |
| Link in uscita | 17 | 0 nel contenuto (restano privacy, cookie, email e WhatsApp nel piede) |
| Campi obbligatori | 5 + consenso | 3 + consenso |

**Offerta** (scelta da Andrea): check-up gratuito della presenza online del locale. Instagram, scheda Google e sito visti da un cliente; entro 3 giorni lavorativi un video di circa 10 minuti con le 3 cose da sistemare per prime. Nessuna call obbligatoria.

**Struttura**: testata con solo nome e pulsante (nessun menu) → titolo + offerta + pulsante + 3 foto reali (BRUT, BRUT cucina, P.Stop) → cosa guardo (Instagram, Google, sito) → chi sono + tre locali, senza link → modulo (nome, locale e città, cellulare WhatsApp, Instagram/sito facoltativo) → quattro domande → piede minimo.

**Dopo l'invio**: pagina `grazie/`. Se l'invio automatico non è configurato, il modulo prepara il messaggio WhatsApp con i dati, senza fingere il successo.
