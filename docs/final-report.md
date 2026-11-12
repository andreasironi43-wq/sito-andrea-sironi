# Report finale

Branch: `claude/sironi-website-transformation-ce3rrj`. Punto di ripristino del sito originale: tag `pre-transformation`.

## Cosa ho trovato

**Tecnica**
- Sito statico con CSS e JavaScript copiati dentro ogni pagina (~60 KB di codice ripetuto) e font caricati da Google Fonts.
- Un commento HTML rotto mostrava **testo visibile in fondo a ogni pagina**: "su ogni pagina del sito. Nessuna libreria esterna. ====== -->".
- **Newsletter finta**: il pop-up dichiarava "Ti ho mandato una mail" senza alcun servizio collegato (`// TODO: collega qui il tuo servizio`).
- Banner cookie per statistiche e marketing che non esistevano.
- Privacy e cookie policy "Da completare".
- Immagine social (`/og/andrea-sironi-sito.jpg`) e favicon referenziate ma assenti.
- Il link "Tutti i lavori" dei casi portava alla home; "Progetto successivo AL.SIL." non aveva una pagina; quattro card della home su sei puntavano alla stessa pagina servizio.

**Contenuti**
- Segnaposto pubblici: "Immagine da inserire" (IPM), "P.IVA da inserire" nel footer.
- Sei competenze, quattro servizi e cinque fasi in parallelo: nessuna porta d'ingresso chiara.
- Nove settori presentati alla pari; nessuna specializzazione percepita.
- Uso di "noi" e "abbiamo" in un sito personale.
- Affermazioni di risultato non documentate nei casi (es. "il brand ha smesso di competere sul piatto").
- Incoerenza: "Sei format ricorrenti" ma i format elencati sono cinque.
- Didascalie della galleria P.Stop sfasate rispetto alle foto.
- Dati strutturati gonfiati: 20 città e 5 regioni come area servita, `priceRange`, "Studio Andrea Sironi".

## Cosa ho cambiato e perché

| Area | Intervento | Perché |
|---|---|---|
| Posizionamento | "Do una direzione alla comunicazione della tua azienda. Poi la realizzo." Tre target in gerarchia | Risponde in una riga a chi è, cosa fa e cosa lo distingue; vedi `positioning-strategy.md` |
| Offerta | Tre percorsi (Direzione, Identità e strumenti, Regia continuativa) + tre modi di iniziare | Il cliente compra soluzioni, non competenze |
| Architettura | Nuove pagine `/lavori/`, `/chi-sono/`, `/contatti/`; URL dei servizi mantenuti | Percorso scoperta → fiducia → prova → contatto; nessuna perdita SEO |
| Casi studio | Struttura comune (partenza, obiettivo, intuizione, lavoro, materiali, cosa è cambiato, stato, servizi collegati) | Mostrare il ragionamento; separare deliverable da risultati |
| Altri lavori | Schede essenziali per AL.SIL., Flytech, BlackMood; IPM con screenshot reale del prototipo e link | Mostrare l'ampiezza senza inventare contesto o risultati |
| Contatto | Percorso rapido (email, WhatsApp, telefono) + modulo guidato con funzione server reale e ripiego onesto | Nessuna CTA finta, nessun falso successo |
| Legale | Informativa privacy e cookie policy scritte sui trattamenti reali; rimossi banner cookie e newsletter | Il sito non usa cookie: non serve chiedere consensi |
| Design | DNA mantenuto (nero, sfumatura, monospazio, sistema), scala tipografica fluida, contrasti AA, font ospitati | `design-system.md` |
| Codice | Generatore statico senza dipendenze, CSS/JS condivisi, test automatici | Manutenzione e verificabilità |
| SEO | Title/description per intento, dati strutturati coerenti, sitemap generata, OG e favicon | `seo-strategy.md` |

## Pagine complete

Home, Servizi, Strategie di marketing, Sito web, Foto e video (`/servizi/content-creator/`), Social media manager, Lavori, Carlambroeus, BRUT Merate, P.Stop, Chi sono, Contatti, Privacy, Cookie, 404. Il prototipo IPM è rimasto invariato.

## Test superati

Vedi `qa-report.md`: QA end-to-end su 15 pagine e 6 larghezze, axe WCAG 2.2 AA senza violazioni, 7/7 test della funzione del modulo, Lighthouse 95–100 performance e 100 nelle altre categorie sulle pagine misurate.

## Dipendenze esterne rimaste

| Cosa | Perché non l'ho fatto | Chi / come |
|---|---|---|
| Invio email del modulo | Servono credenziali Resend e un dominio mittente verificato | Variabili `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` in Vercel (README) |
| Dominio `www.andreasironi.it` | Non verificabile da qui; modifiche DNS escluse | Vercel → Domains, poi reindirizzamenti (`seo-strategy.md`) |
| Search Console | Richiede accesso all'account Google | `seo-strategy.md` |
| Analytics | Nessuno strumento attivo; il codice è pronto | `growth-roadmap.md` |
| Deploy | Nessun deploy eseguito da qui | Merge del branch con il flusso Git ↔ Vercel esistente |

## Dati mancanti (non inventati)

- **Partita IVA** e indirizzo completo del titolare: campo `vat` in `_src/content.mjs`, compare in footer e privacy solo quando compilato.
- **Anni di esperienza**: il brief indica "oltre sei anni, da verificare": non pubblicato.
- **Foto di Andrea**: al suo posto una citazione tipografica.
- **Testimonianze**: nessuna disponibile, nessuna pubblicata.
- **Risultati numerici** dei progetti: nessuno documentato.
- **AL.SIL., Flytech, BlackMood**: periodo, contesto e ruolo esatto. Le schede descrivono solo ciò che si vede nei materiali.
- **IPM Multiservice**: non è documentato se il prototipo sia stato commissionato; è presentato come "prototipo, non ancora pubblicato come sito ufficiale".
- **Località di P.Stop**: non indicata nei materiali, quindi omessa.
- **Carlambroeus "sei format"**: ne sono elencati cinque; ho tolto il numero.

## Prossimi interventi non automatizzabili

1. Configurare Resend e fare un invio di prova dal sito pubblicato.
2. Far verificare informativa privacy e cookie policy da un consulente privacy: sono scritte sui trattamenti reali ma non sostituiscono una verifica legale.
3. Inserire partita IVA e foto professionale.
4. Raccogliere testimonianze autorizzate e, se possibile, un dato verificabile per caso.
5. Collegare dominio, Search Console e uno strumento di analisi senza cookie.
6. Provare il sito su iPhone e Android reali e con VoiceOver.

## Limiti di questo lavoro

- Il sito pubblico su Vercel e i siti dei concorrenti non erano raggiungibili dalla rete dell'ambiente: ho usato il repository come fonte primaria e la ricerca web (estratti indicizzati) per il mercato.
- Nessuna stima di volume per le keyword: le priorità SEO sono ipotesi da validare.

## Pubblicazione (novembre 2026)

Decisioni di Andrea prima della messa online:
- **Dominio**: `www.andreasironi.it` non è ancora di proprietà. Il sito va online sull'indirizzo `.vercel.app` di produzione del progetto. Per non dichiarare come ufficiale un dominio non posseduto, canonical, Open Graph, dati strutturati e sitemap usano l'indirizzo di produzione ricavato da Vercel in fase di build (`_src/vercel-build.mjs`). Quando il dominio sarà acquistato e collegato, basterà impostarlo come principale su Vercel.
- **Partita IVA**: si pubblica senza, da aggiungere appena possibile in `_src/content.mjs` (`vat`). Compare da sola nel footer e nell'informativa privacy.
- **Modulo**: per ora senza invio automatico. Il modulo di contatto e quello del check-up preparano il messaggio WhatsApp o email già compilato e lo dicono chiaramente. Prima di avviare campagne a pagamento configurare Resend: senza, le richieste dagli annunci non vengono contate dal server.
- **Ancora da fornire**: foto professionale per Chi sono, testimonianze autorizzate.
