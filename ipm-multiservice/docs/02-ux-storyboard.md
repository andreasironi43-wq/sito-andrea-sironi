# 02 — Architettura UX e storyboard della homepage

## Sitemap

```
Home
├── Azienda (/azienda/)
├── Servizi (/servizi/)  — hub delle 6 aree
│   ├── 01 Pulizie industriali ............ /pulizie-industriali/
│   ├── 02 Pulizia impianti industriali ... /pulizia-impianti-industriali/
│   │      Sabbiatura criogenica .......... /sabbiatura-criogenica/
│   ├── 03 Pavimenti in resina ............ /pavimenti-in-resina/
│   │      Segnaletica orizzontale ........ /segnaletica-orizzontale/
│   ├── 04 Imbiancature industriali ....... /imbiancature-industriali/
│   ├── 05 Disinfestazione ................ /disinfestazione-deratizzazione/
│   └── 06 Sanificazione ambienti ......... /sanificazione-ambienti/
│          Pulizie civili e commerciali ... /pulizie-civili-e-commerciali/
│          Pulizie post cantiere .......... /pulizie-in-cantiere/
│          Fornitura consumabili .......... /fornitura-consumabili/
├── Progetti e interventi (/progetti/)
├── Approfondimenti (/blog/) — da migrare in WordPress, non prototipato
├── Lavora con noi (/lavora-con-noi/)
├── Contatti e preventivo (/contatti/)
└── Privacy · Cookie
```

Le pagine servizio restano al primo livello come oggi, per non perdere posizionamento. Nessuna pagina SEO "per città" creata artificialmente: l'area servita è indicata in ogni pagina e nei dati strutturati.

## Funnel di conversione

1. **Riconoscimento** (hero): chi è IPM, per chi lavora, prova di solidità (dal 1981, mezzi propri).
2. **Identificazione del problema** (mondo industriale): il visitatore ritrova il proprio ambiente.
3. **Soluzione** (servizi): l'area giusta in un colpo d'occhio, un clic verso la pagina dedicata.
4. **Fiducia** (metodo, esperienza, progetti): come si lavora, da quanto, con quali risultati.
5. **Azione** (contatto): form breve con servizio e luogo, telefono cliccabile.

CTA "Richiedi preventivo" sempre visibile nell'header (si nasconde scorrendo verso il basso e riappare risalendo), ripetuta a fine di ogni pagina e nella barra laterale delle pagine servizio con il servizio preselezionato.

## Storyboard homepage

| # | Messaggio | Visual | Interazione / animazione | Transizione |
|---|---|---|---|---|
| 01 Hero | "Ambienti industriali pronti a produrre." Un interlocutore, squadre interne, mezzi propri, dal 1981 | Pieno schermo scuro, ripresa industriale (prov.: prospettiva tecnica di capannone), guide verticali A/B, coordinate della sede | Visual da scala 1.14 a 1; guide che si disegnano; chiave colore che si compone segmento per segmento; titolo rivelato parola per parola da maschera; testi e CTA in sequenza | Allo scroll la visual si chiude in una cornice (clip-path) e il testo sale e svanisce |
| 02 Mondo IPM | "Dove si produce, si sporca." | 5 scene: linee, impianti, capannoni, pavimenti, uffici | La frase si "accende" parola per parola con lo scroll; poi pannello sticky: ogni scena si svela dal basso passando da dettaglio ravvicinato (scala 1.35) a panoramica, la precedente arretra; contatore 01/05 e barra di avanzamento | L'ultima scena lascia il posto al fondo chiaro dei servizi |
| 03 Servizi | "Sei aree operative, un solo interlocutore." | Pannello immagine sticky + elenco aree con colore del petalo | Desktop: l'area al centro dello schermo si attiva, l'immagine cambia con un reveal a tendina, numero grande e indicatori 01–06. Mobile: elenco semplice con immagine per area, nessuna animazione obbligatoria | Fine elenco → blocco scuro del metodo |
| 04 Metodo | "Prima si guarda. Poi si interviene." | Griglia tecnica di fondo, 4 fasi | Linea arancio che si estende con lo scroll (orizzontale su desktop, verticale su mobile); i nodi a rombo si accendono al passaggio; le fasi precedenti restano illuminate | Ritorno al chiaro |
| 05 Esperienza | "45 anni dentro le aziende lombarde" | Numero gigante, cronologia 1981→oggi, numeri chiave | Anni calcolati in automatico; cronologia che scorre in orizzontale seguendo lo scroll verticale (desktop), scorrimento touch con snap (mobile); contatori | Link alla pagina Azienda |
| 06 Progetti | "Il lavoro, raccontato dai cantieri." | Griglia editoriale asimmetrica | Parallasse leggera delle immagini, zoom all'hover. Schede dichiaratamente segnaposto | → contatto |
| 07 Conversione | "Partiamo dal tuo prossimo intervento." | Fondo scuro, contatti + form | Validazione in linea accessibile, honeypot e controllo del tempo di compilazione | Footer |

## Regole di movimento

- GSAP + ScrollTrigger (scrub) su scroll nativo: nessuno smooth scrolling artificiale (Lenis scartato: altera la percezione dello scroll, problemi con tastiera, trackpad e tecnologie assistive).
- Sezioni sticky in CSS (`position: sticky`); unico pin GSAP sulla cronologia orizzontale desktop.
- `prefers-reduced-motion`: nessuna animazione, layout statico completo (scene in griglia, servizi con immagini in linea).
- Senza JavaScript: tutto il contenuto è visibile (le classi di stato si attivano solo via JS, con timeout di sicurezza).
- Transizioni tra pagine con View Transitions API (dissolvenza breve), ignorate dai browser che non la supportano.
- Pagine interne: solo reveal tipografici, comparse e maschere, per non rallentare la consultazione.
