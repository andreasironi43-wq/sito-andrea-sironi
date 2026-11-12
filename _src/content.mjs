// Fonte unica dei contenuti condivisi: contatti, servizi, progetti, FAQ.
// Dopo ogni modifica: node _src/build.mjs

export const site = {
  name: 'Andrea Sironi',
  // Indirizzo pubblico in canonical, Open Graph, dati strutturati e sitemap.
  // Finché il dominio www.andreasironi.it non è acquistato e collegato, è l'indirizzo
  // di produzione Vercel. Quando il dominio è attivo: cambiarlo qui e rigenerare.
  url: 'https://sito-andrea-sironi.vercel.app',
  role: 'Marketing strategist e art director',
  email: 'andreasironi43@gmail.com',
  phone: '+393421625917',
  phoneLabel: '+39 342 162 5917',
  whatsapp: 'https://wa.me/393421625917',
  city: 'Merate',
  province: 'LC',
  region: 'Lombardia',
  education: 'NABA Milano, Art Direction & Graphic Design',
  // Dati amministrativi: lasciati vuoti finché non vengono forniti.
  // Compaiono nel footer e nella privacy solo quando sono compilati.
  vat: null,
  // Analytics: null = nessuno strumento caricato. Vedi docs/growth-roadmap.md.
  // 'vercel' carica Vercel Web Analytics (senza cookie) solo se attivato nel progetto Vercel.
  analytics: null,
  areas: ['Merate', 'Lecco', 'Monza e Brianza', 'Como', 'Bergamo', 'Milano'],
};

export const nav = [
  { href: '/servizi/', label: 'Servizi' },
  { href: '/lavori/', label: 'Lavori' },
  { href: '/chi-sono/', label: 'Chi sono' },
  { href: '/contatti/', label: 'Contatti' },
];

// I tre percorsi: ciò che il cliente può acquistare.
export const paths = [
  {
    id: 'direzione',
    key: 'A',
    name: 'Direzione',
    title: 'Strategia e posizionamento',
    problem: 'Investi in comunicazione ma non sai dire cosa ti distingue, né cosa ti ha portato clienti.',
    who: 'Aziende che stanno per investire, cambiare offerta o ripartire dopo anni di comunicazione fatta "un po\' alla volta".',
    goal: 'Decidere cosa dire, a chi e in che ordine, prima di spendere.',
    includes: ['Analisi del settore e dei concorrenti', 'Chi sono davvero i tuoi clienti', 'Cosa ti rende diverso, in una frase', 'Priorità di canali e budget', 'Tono di voce'],
    outputs: ['Documento di analisi e direzione', 'Posizionamento messo per iscritto', 'Piano delle priorità con i tempi'],
    mode: 'Progetto di tre-sei settimane, con possibile affiancamento continuativo.',
    link: '/servizi/strategie-marketing/',
    linkLabel: 'Strategie di marketing',
    cta: 'Parliamo della tua direzione',
    color: 'cyan',
  },
  {
    id: 'identita',
    key: 'B',
    name: 'Identità e strumenti',
    title: 'Brand, sito, foto e video',
    problem: 'Logo, sito e materiali sono stati fatti in momenti diversi da persone diverse, e si vede.',
    who: 'Attività che aprono, cambiano pelle o hanno un sito e un\'immagine che non le rappresentano più.',
    goal: 'Avere strumenti coerenti, belli e utili: che si usano davvero.',
    includes: ['Art direction e identità visiva', 'Sito web su WordPress, modificabile da te', 'Fotografia di prodotti, piatti e ambienti', 'Video brevi verticali', 'Brochure, menu e materiali stampati'],
    outputs: ['Sito online con accessi tuoi', 'Archivio foto e video pronto all\'uso', 'Materiali grafici e linee guida'],
    mode: 'Progetto definito, con inizio, fine e consegne.',
    link: '/servizi/sito-web/',
    linkLabel: 'Sito web',
    link2: '/servizi/content-creator/',
    link2Label: 'Foto e video',
    cta: 'Raccontami cosa ti serve',
    color: 'indigo',
  },
  {
    id: 'regia',
    key: 'C',
    name: 'Regia continuativa',
    title: 'Marketing e comunicazione nel tempo',
    problem: 'I social li aggiorna chi ha cinque minuti, le campagne partono all\'ultimo e nessuno tiene il filo.',
    who: 'Aziende e locali senza un ufficio marketing interno, che vogliono un referente unico.',
    goal: 'Una comunicazione costante e coerente, che migliora mese dopo mese.',
    includes: ['Piano editoriale mensile condiviso', 'Gestione di Instagram e Facebook', 'Newsletter e campagne Meta', 'Produzione dei contenuti', 'Lettura dei risultati e correzioni'],
    outputs: ['Calendario condiviso', 'Post, storie e campagne pubblicati', 'Report semplice di cosa ha funzionato'],
    mode: 'Collaborazione continuativa, interrompibile quando vuoi.',
    link: '/servizi/social-media-manager/',
    linkLabel: 'Social media manager',
    cta: 'Parliamo di una collaborazione',
    color: 'purple',
  },
];

// Tre modi di iniziare.
export const models = [
  { n: '01', title: 'Prima lettura', text: 'Mezz\'ora, di persona o in videochiamata. Mi racconti l\'azienda e il problema; io ti dico cosa vedo e cosa farei. Non si paga e non impegna.' },
  { n: '02', title: 'Progetto definito', text: 'Un lavoro con inizio, fine e consegne scritte: un posizionamento, un sito, un servizio fotografico, un\'identità.' },
  { n: '03', title: 'Collaborazione continuativa', text: 'Divento il referente della tua comunicazione: decido con te le priorità e seguo la produzione mese per mese.' },
];

export const method = [
  { n: '01', title: 'Analisi', text: 'Settore, concorrenti, pubblico, obiettivi. E i numeri che hai già.' },
  { n: '02', title: 'Strategia', text: 'Posizionamento, messaggi chiave, priorità. Messi per iscritto.' },
  { n: '03', title: 'Identità', text: 'Linguaggio visivo e verbale: come appari e come parli.' },
  { n: '04', title: 'Produzione', text: 'Sito, foto, video, contenuti, materiali e campagne.' },
  { n: '05', title: 'Ottimizzazione', text: 'Si guarda cosa funziona e si corregge. La strategia si aggiorna.' },
];

// Servizi con pagina SEO dedicata.
export const services = {
  'strategie-marketing': {
    path: 'direzione',
    seoTitle: 'Consulente marketing e posizionamento in Brianza | Andrea Sironi',
    description: 'Strategia di marketing e posizionamento per PMI, ristoranti e hotel tra Lecco, Monza e Milano: analisi, differenziazione, priorità di investimento.',
    h1: 'Strategie di marketing',
    lead: 'Prima si capisce. Poi si spende.',
    intro: 'Guardo com\'è messo il tuo settore, chi sono i concorrenti e chi sono davvero i tuoi clienti. Da lì capiamo cosa ti rende diverso e dove conviene investire — e, altrettanto importante, dove non conviene.',
    when: [
      'Investi in comunicazione ma non sai dire cosa ti ha portato',
      'Ti confondono con gli altri e l\'unica leva che ti resta è lo sconto',
      'Stai per lanciare un\'offerta nuova e vuoi partire nella direzione giusta',
    ],
    items: [
      ['Analisi del settore', 'Chi c\'è già, come comunica, quali spazi ha lasciato liberi.'],
      ['Chi sono i tuoi clienti', 'Non "tutti": chi paga davvero e perché torna.'],
      ['Cosa ti rende diverso', 'La ragione per cui scegliere te, detta in una frase.'],
      ['Dove investire', 'Quali canali, in che ordine, con quale budget.'],
      ['Come parlare', 'Le parole che usi e quelle che non userai mai.'],
      ['Affiancamento', 'Un interlocutore quando c\'è da decidere qualcosa.'],
    ],
    outputs: ['Documento con analisi e direzione', 'Posizionamento messo per iscritto', 'Piano delle priorità con i tempi', 'Confronto periodico, se serve'],
    proof: 'carlambroeus',
    faq: [
      ['Quanto dura?', 'Il lavoro di analisi richiede di solito tra le tre e le sei settimane. L\'affiancamento continuativo si concorda insieme e si può interrompere quando vuoi.'],
      ['Serve anche se ho già un logo e un sito?', 'Spesso serve proprio allora. Logo e sito sono strumenti: senza una direzione restano oggetti curati che non portano clienti.'],
      ['Vale anche per un\'attività piccola?', 'Soprattutto. Chi ha un budget limitato non può permettersi di sbagliare direzione.'],
      ['Segui aziende fuori Lombardia?', 'Sì. Analisi e posizionamento si fanno soprattutto a tavolino e in videochiamata: seguo aziende in tutto il Nord Italia.'],
    ],
  },
  'sito-web': {
    path: 'identita',
    seoTitle: 'Realizzazione siti web per aziende e locali | Lecco, Monza, Brianza',
    description: 'Siti web su WordPress per ristoranti, hotel e PMI in Brianza: struttura, testi, immagini, prenotazioni e SEO di base. Modificabili da te.',
    h1: 'Sito web',
    lead: 'Non un volantino online. Un sito che lavora.',
    intro: 'Progetto e realizzo il sito da capo: come è organizzato, cosa c\'è scritto, come si arriva a prenotare o a chiamarti. Lo costruisco su WordPress, così resta modificabile anche da te.',
    when: [
      'Il sito è fermo da anni e le informazioni non sono più quelle',
      'Da telefono si legge male e nessuno riesce a prenotare',
      'Chi ti cerca su Google non ti trova, o trova un\'immagine che non ti somiglia',
    ],
    items: [
      ['Struttura e contenuti', 'Quali pagine servono davvero, e cosa ci va dentro.'],
      ['Testi', 'Scritti da me sul tuo posizionamento, non copiati dal vecchio sito.'],
      ['Design e immagini', 'Costruito attorno alle tue foto, non a un modello preconfezionato.'],
      ['Prenotazioni e contatti', 'Collegamento ai sistemi che già usi per tavoli, camere o preventivi.'],
      ['Visibilità su Google', 'Titoli, descrizioni e struttura impostati bene fin da subito.'],
      ['Formazione', 'Ti mostro come aggiornarlo, finché non sei autonomo.'],
    ],
    outputs: ['Sito online e funzionante', 'Testi e immagini a posto', 'Accessi e password intestati a te', 'Una sessione di formazione'],
    proof: 'carlambroeus',
    faq: [
      ['In quanto tempo è pronto?', 'Di norma tra le quattro e le otto settimane, a seconda di quante pagine servono e di quanto velocemente arrivano i materiali.'],
      ['Posso modificarlo da solo?', 'Sì, ed è il punto. Uso WordPress con Elementor: cambi testi, prezzi e foto senza chiamare nessuno.'],
      ['E se ho già un sito?', 'Si valuta insieme: a volte conviene rifarlo, a volte basta sistemare quello che c\'è. Te lo dico dopo averlo guardato.'],
      ['Lo realizzi anche fuori Lombardia?', 'Sì. Testi, struttura e sviluppo si seguono interamente a distanza.'],
    ],
  },
  'content-creator': {
    path: 'identita',
    seoTitle: 'Foto e video per ristoranti, hotel e aziende | Content creator in Brianza',
    description: 'Fotografia e video brevi per locali, hotel e aziende tra Lecco, Monza e Milano: piatti, ambienti, persone ed eventi, pronti per social, sito e menu.',
    h1: 'Foto e video',
    lead: 'Il tuo posto merita di essere visto com\'è.',
    intro: 'Vengo sul posto e produco il materiale: piatti, ambienti, dettagli, persone al lavoro. Foto e video pensati per essere usati davvero — sui social, sul sito, sul menu — e coerenti con l\'identità del brand.',
    when: [
      'Le foto le fa chi ha tempo, con il telefono, quando capita',
      'Dal vivo il locale colpisce, in fotografia no',
      'Ogni volta che serve un\'immagine devi cercarla e non la trovi',
    ],
    items: [
      ['Piatti e prodotti', 'Ripresi nel loro ambiente, non su fondo bianco.'],
      ['Ambienti', 'Gli spazi come li vede chi entra, con la luce giusta.'],
      ['Video brevi', 'Reel e formati verticali per social e sito.'],
      ['Persone e dietro le quinte', 'Chi c\'è dietro il lavoro: è quello che si ricorda.'],
      ['Eventi', 'Prima, durante e dopo la serata.'],
      ['Archivio ordinato', 'Tutto il materiale consegnato pronto all\'uso, catalogato.'],
    ],
    outputs: ['Servizio fotografico sul posto', 'Foto ritoccate e pronte all\'uso', 'Video brevi in formato verticale', 'Archivio consultabile nel tempo'],
    proof: 'brut-merate',
    faq: [
      ['Quanto dura un servizio?', 'Di solito mezza giornata sul posto. Per attività grandi o con più ambienti può servire una giornata intera.'],
      ['Devo chiudere durante le riprese?', 'No. Si lavora negli orari morti o durante il servizio, a seconda di cosa serve raccontare.'],
      ['Le foto restano mie?', 'Sì, le puoi usare su qualsiasi canale. Te le consegno anche nei formati per la stampa.'],
      ['Vieni anche fuori dalla Brianza?', 'Sì, per servizi di una giornata mi sposto nel Nord Italia. La trasferta si quantifica nel preventivo.'],
    ],
  },
  'social-media-manager': {
    path: 'regia',
    seoTitle: 'Social media manager per ristoranti e aziende | Lecco, Monza, Brianza',
    description: 'Gestione di Instagram e Facebook per ristoranti, hotel e PMI in Brianza: piano editoriale, contenuti, testi, campagne Meta e report. Seguito da una sola persona.',
    h1: 'Social media manager',
    lead: 'I social non sono un secondo lavoro. Sono il mio.',
    intro: 'Gestisco Instagram e Facebook della tua attività: decido con te cosa pubblicare e quando, scrivo i testi, preparo i contenuti e tengo d\'occhio i messaggi. Con un filo logico, legato agli obiettivi, non a caso quando c\'è tempo.',
    when: [
      'Pubblichi quando ti ricordi, e si vede',
      'Non sai se quello che fai porta clienti oppure no',
      'I messaggi restano senza risposta per giorni',
    ],
    items: [
      ['Piano dei contenuti', 'Cosa esce, quando e perché. Deciso prima, non la sera stessa.'],
      ['Format ricorrenti', 'Schemi riconoscibili che rendono il profilo tuo a colpo d\'occhio.'],
      ['Testi e didascalie', 'Scritti con la tua voce, non con quella di tutti gli altri.'],
      ['Pubblicazione', 'I post escono agli orari giusti anche quando sei in servizio.'],
      ['Messaggi', 'Chi scrive trova qualcuno, non il vuoto.'],
      ['Campagne a pagamento', 'Quando serve spingere, con un budget deciso insieme.'],
    ],
    outputs: ['Calendario mensile condiviso', 'Post e storie pubblicati', 'Report semplice di cosa ha funzionato'],
    proof: 'p-stop',
    faq: [
      ['Ogni quanto pubblichi?', 'Dipende dall\'attività: di solito tra due e quattro contenuti alla settimana, più le storie. Meglio pochi contenuti buoni che tanti riempitivi.'],
      ['Le foto le fai tu?', 'Posso occuparmene io, oppure lavorare con il materiale che hai già, se è utilizzabile.'],
      ['Posso vedere prima cosa esce?', 'Sì. Il calendario è condiviso: vedi tutto in anticipo e puoi dire la tua prima della pubblicazione.'],
      ['Segui attività fuori Lombardia?', 'Sì. La gestione social si fa quasi tutta a distanza. Un paio di incontri di persona all\'inizio aiutano, ma non sono indispensabili.'],
    ],
  },
};

// Progetti. "case: true" = caso studio con pagina dedicata.
// Gli altri sono schede essenziali: solo ciò che è documentato.
export const projects = [
  {
    slug: 'carlambroeus',
    case: true,
    name: 'Locanda Moderna Carlambroeus',
    short: 'Carlambroeus',
    sector: 'Ospitalità',
    place: 'Montevecchia (LC)',
    period: '2025 — in corso',
    role: 'Strategia, direzione creativa, contenuti',
    services: ['direzione', 'identita', 'regia'],
    line: 'Da destinazione gastronomica a rifugio tra le colline: il riposizionamento di una locanda.',
    img: '/img/indexhtml-01-555be03776',
    imgAlt: 'Erba e muschio in primo piano: l\'immagine guida del racconto della Locanda Carlambroeus',
    w: 880, h: 1100,
  },
  {
    slug: 'brut-merate',
    case: true,
    name: 'BRUT Merate',
    short: 'BRUT',
    sector: 'Ristorazione',
    place: 'Merate (LC)',
    period: 'Progetto continuativo',
    role: 'Direzione creativa e comunicazione',
    services: ['identita', 'regia'],
    line: 'Un universo riconoscibile tra cucina, vino e musica, fino al format evento BRUTLAND.',
    img: '/img/indexhtml-03-ed362df92f',
    imgAlt: 'Il bancone di BRUT sotto i lampadari di cristallo, con le bottiglie sugli scaffali',
    w: 880, h: 1100,
  },
  {
    slug: 'p-stop',
    case: true,
    name: 'P.Stop',
    short: 'P.Stop',
    sector: 'Bar e ristorazione',
    place: null,
    period: 'Progetto continuativo',
    role: 'Art direction e contenuti',
    services: ['identita', 'regia'],
    line: 'Un bar con quattro momenti della giornata e un solo profilo: il sistema dei format.',
    img: '/img/indexhtml-02-db955eec7e',
    imgAlt: 'Il dehors di P.Stop: tavoli, sedie gialle e una botte di legno in luce naturale',
    w: 880, h: 1100,
  },
  {
    slug: 'al-sil',
    name: 'AL.SIL.',
    sector: 'Industria',
    kind: 'Brochure aziendale',
    text: 'Brochure pieghevole per un\'azienda di pretrattamento e verniciatura a polvere su alluminio: il processo tecnico — powder coating, doppia mano in linea, test in nebbia salina, controllo qualità — organizzato in una lettura chiara per i clienti industriali.',
    img: '/img/indexhtml-04-3d91c219c8',
    imgAlt: 'Brochure pieghevole AL.SIL. su fondo nero, con le sezioni Powder Coating System, Controllo qualità e Test in nebbia salina',
    w: 880, h: 1100,
  },
  {
    slug: 'flytech',
    name: 'Flytech',
    sector: 'Tecnologia',
    kind: 'Logo e identità',
    text: 'Marchio e logotipo per una realtà tecnologica: un simbolo geometrico e un lettering largo e tecnico su un blu saturo.',
    img: '/img/indexhtml-05-a7a4baa865',
    imgAlt: 'Logo Flytech bianco su fondo blu: simbolo geometrico a quattro bracci e logotipo',
    w: 880, h: 1100,
  },
  {
    slug: 'blackmood',
    name: 'BlackMood',
    sector: 'Eventi',
    kind: 'Art direction evento',
    text: 'Locandina per "Smile", festa privata open air ad Arcore: un\'immagine scultorea in nero lucido su fondo chiaro, con tipografia ridotta all\'essenziale.',
    img: '/img/indexhtml-06-f74fc4e774',
    imgAlt: 'Locandina Smile di BlackMood: mani nere lucide che emergono da una corona liquida su fondo bianco',
    w: 880, h: 1100,
  },
  {
    slug: 'ipm-multiservice',
    name: 'IPM Multiservice',
    sector: 'Servizi industriali',
    kind: 'Prototipo di redesign del sito',
    text: 'Prototipo ad alta fedeltà del nuovo sito per un\'impresa di pulizie industriali e multiservizi di Paderno d\'Adda: analisi, architettura, testi e design system. Non ancora pubblicato come sito ufficiale.',
    img: '/img/ipm-multiservice-prototipo',
    imgAlt: 'Homepage del prototipo di redesign del sito IPM Multiservice',
    w: 1200, h: 1500,
    href: '/ipm-multiservice/',
    hrefLabel: 'Apri il prototipo',
  },
];

export const faqGeneral = [
  ['Quanto costa?', 'Dipende da cosa serve: un posizionamento, un sito o la gestione di un anno sono lavori diversi. Dopo la prima conversazione ricevi una proposta scritta con attività, tempi e costo. Il budget per le campagne a pagamento resta separato dal mio compenso.'],
  ['Devo firmare un contratto lungo?', 'No. Si può partire da un lavoro singolo, con inizio e fine. Le collaborazioni continuative si fanno quando conviene a entrambi e si possono interrompere.'],
  ['In quanto tempo si vedono i risultati?', 'Le campagne a pagamento danno segnali in qualche settimana. Farsi riconoscere richiede mesi. Prima di iniziare decidiamo insieme cosa misurare.'],
  ['Lavori da solo?', 'Sì: strategia, art direction e produzione le seguo io. Se un progetto richiede competenze che non ho, te lo dico prima di iniziare, non a lavoro avviato.'],
  ['Lavori solo con ristoranti e hotel?', 'È il settore in cui ho più casi, non l\'unico. Ho lavorato anche con aziende industriali e tecnologiche. Serve avere qualcosa da dire e la voglia di dirlo bene.'],
  ['Devo seguire tutto io?', 'No. Ti servono un\'ora all\'inizio per raccontarmi l\'azienda e pochi minuti per approvare. Il resto lo seguo io.'],
];
