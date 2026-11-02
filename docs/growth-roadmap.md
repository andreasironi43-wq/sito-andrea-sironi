# Il sito come strumento commerciale

Obiettivo del sito: **richieste pertinenti**, non tante richieste. Una buona richiesta arriva da un'azienda che ha letto almeno un caso o una pagina servizio e scrive con un problema concreto.

## Da dove arrivano le persone

| Canale | Ruolo | Cosa deve trovare |
|---|---|---|
| Passaparola e referral | Il canale più probabile per un professionista locale | Conferma rapida: home chiara, casi, contatto |
| Ricerca del nome | Chi ha già sentito parlare di Andrea | Pagina Chi sono, coerenza con LinkedIn e Instagram |
| LinkedIn | Imprenditori e responsabili marketing di PMI | Link diretto ai casi studio, non alla home |
| Instagram | Ristoratori e albergatori | Link in bio alla pagina social media manager o a `/lavori/` |
| Ricerca locale | Chi cerca un servizio in Brianza | Pagine servizio con FAQ e caso collegato |

## Eventi da misurare

Già predisposti in `assets/js/site.js` (funzione `track`), **inattivi** finché non viene attivato uno strumento di analisi.

| Evento | Quando | Dati registrati |
|---|---|---|
| `click_email` | clic su un link email | pagina o posizione del link |
| `click_whatsapp` | clic su WhatsApp | pagina o posizione |
| `click_phone` | clic sul telefono | pagina o posizione |
| `contact_sent` | invio del modulo **confermato dal server** | tipo di progetto |
| `contact_fallback` | modulo non inviabile, ripiego su email/WhatsApp | tipo di progetto |
| `open_case` | apertura di un caso studio | slug del caso |
| `open_service` | apertura di una pagina servizio | percorso |

Nessun nome, email o testo del messaggio viene mai inviato allo strumento di analisi. Newsletter: non esiste, quindi nessun evento.

### Strumento consigliato

**Vercel Web Analytics**: non usa cookie, non richiede banner di consenso, è nello stesso fornitore dell'hosting. Attivazione:
1. Vercel → progetto → Analytics → Enable.
2. In `_src/content.mjs` impostare `analytics: 'vercel'`, poi `node _src/build.mjs`.
3. Aggiornare la cookie policy e l'informativa privacy (sezione "Dati tecnici").
Gli eventi personalizzati richiedono un piano Vercel che li includa: verificare prima di attivare.

Alternativa: Plausible (a pagamento, senza cookie). Il codice supporta già entrambi.

## Lancio

- [ ] Collegare il dominio `www.andreasironi.it` e i reindirizzamenti (vedi `seo-strategy.md`).
- [ ] Configurare Resend e le variabili `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`; fare un invio di prova dal sito.
- [ ] Inserire partita IVA in `_src/content.mjs` (`vat`) e far rileggere l'informativa privacy.
- [ ] Search Console + sitemap.
- [ ] Aggiornare il link del sito su LinkedIn, Instagram, Google Business Profile (se esiste) con lo stesso nome e ruolo usati sul sito.

## Primi 30 giorni

1. Aggiungere una **foto professionale di Andrea** nella pagina Chi sono (oggi c'è una citazione al posto del ritratto).
2. Chiedere ai tre clienti dei casi studio **una frase di testimonianza** e l'autorizzazione a pubblicarla con nome e ruolo.
3. Condividere un caso studio a settimana su LinkedIn, con link diretto alla pagina del caso.
4. Raccogliere i materiali mancanti per AL.SIL. e Flytech (contesto, periodo, obiettivo) per trasformarli in casi completi.

## 60 giorni

1. Leggere Search Console: per quali query compaiono le pagine servizio? Riscrivere title e description delle pagine con impressioni ma pochi clic.
2. Verificare quale percorso viene scelto più spesso nel modulo: se "Non lo so ancora" prevale, rendere più chiara la pagina Servizi.
3. Se un cliente autorizza dati reali (es. prenotazioni dirette prima/dopo), aggiungerli al caso con fonte e periodo.

## 90 giorni

1. Valutare una sezione editoriale solo se ci sono almeno 4–6 contenuti pronti, originali e utili ai clienti ideali.
2. Valutare una pagina dedicata all'ospitalità ("Comunicazione per hotel e locande") se i dati mostrano domanda e se esiste un secondo caso nel settore.
3. Completare il caso IPM Multiservice se il prototipo diventa il sito ufficiale.

## Idee editoriali (per i clienti ideali, non per riempire un blog)

- Il menù è il pretesto: come una locanda può smettere di competere sul piatto.
- Un piatto si dimentica, un format si riconosce: costruire format social ripetibili per un locale.
- Mezza giornata di riprese, tre mesi di contenuti: come si organizza un servizio fotografico in un ristorante.
- Cosa chiedere prima di rifare il sito: cinque domande che fanno risparmiare.
- Comunicare un processo industriale a chi non è tecnico: il caso della brochure AL.SIL.
- Regola 80/20: identità prima della promozione nel piano editoriale.

## KPI

| KPI | Come si misura | Soglia iniziale |
|---|---|---|
| Richieste pertinenti al mese | Modulo + email + WhatsApp, classificate a mano | Da stabilire dopo 3 mesi di dati |
| Tasso di contatto dalle pagine caso | `open_case` seguito da evento di contatto | Da stabilire |
| Pagine servizio indicizzate e con impressioni | Search Console | Tutte e 4 entro 8 settimane |
| Richieste da ricerca organica | Domanda "Come mi hai trovato?" nella prima call | — |
| Prime conversazioni → proposte → contratti | Registro personale | — |

## Metriche da non confondere con risultati economici

- Visite, follower, impressioni, tempo sulla pagina: indicano attenzione, non clienti.
- Clic su WhatsApp o email: indicano intenzione, non una richiesta inviata.
- Posizione su Google per una keyword: conta solo se porta richieste pertinenti.
- Il risultato economico del sito si misura con le collaborazioni avviate e il loro valore, da un registro tenuto da Andrea.
