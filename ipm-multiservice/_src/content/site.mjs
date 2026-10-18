// ============================================================================
// CONTENUTI — unica fonte di verità del prototipo.
// Ogni dato aziendale qui sotto proviene dal sito attuale ipmmultiservice.it
// (vedi docs/01-strategia.md → "Fonti e verifica"). I punti marcati
// VERIFY vanno confermati con IPM prima della messa online.
// In WordPress questi oggetti diventano: Opzioni tema (company), CPT "servizio"
// (services), CPT "progetto" (projects), campi ACF / blocchi (timeline, method).
// ============================================================================

export const company = {
  brand: 'IPM Multiservice',
  legalName: 'I.P.M. S.r.l.',
  vat: '02142530134', // VERIFY: dato da registro camerale pubblico, non dal sito
  founded: 1981,
  founder: 'Diego Castelli',
  address: { street: 'Strada delle Brigole 18/20', zip: '23877', city: "Paderno d'Adda", province: 'LC', region: 'Lombardia' },
  geo: { lat: 45.6785, lng: 9.4436, label: "45°40′N · 9°26′E" }, // VERIFY: coordinate approssimate della sede
  phone: '039 513 469',
  phoneHref: '+39039513469',
  fax: '039 512 793',
  email: 'commerciale@ipmmultiservice.it',
  area: ['Monza e Brianza', 'Lecco', 'Como', 'Bergamo', 'Milano'],
  hours: null, // VERIFY: orari ufficio non indicati sul sito attuale
};

// Le aree operative raccolgono i servizi per la navigazione in homepage.
// Il colore di ciascuna area deriva da un "petalo" del marchio IPM.
export const areas = [
  {
    id: 'pulizie',
    n: '01',
    color: 'blue',
    title: 'Pulizie industriali e tecniche',
    short: 'Pulizie industriali',
    lead: 'Linee di produzione, camere bianche, macchine utensili, vasche di processo e grandi pavimentazioni. Pulizie di fondo e manutentive, anche in quota.',
    detail: 'Lavaggio vetrate fino a 12 m senza piattaforma',
    tags: ['Linee produttive', 'Camere bianche', 'Lavori in quota'],
    ph: 'capannone',
    phNote: 'Operatore IPM al lavoro su una linea produttiva, luce naturale da lucernari',
    links: ['pulizie-industriali', 'pulizia-impianti-industriali', 'sabbiatura-criogenica'],
  },
  {
    id: 'impianti',
    n: '02',
    color: 'teal',
    title: 'Impianti e sabbiatura criogenica',
    short: 'Pulizia impianti',
    lead: 'Generatori di vapore, microsabbiatura, idropulitrici da 250 bar in su. Ghiaccio secco e bicarbonato per pulire impianti, anche alimentari, senza solventi.',
    detail: 'Sabbiatura criogenica: nessun residuo secondario',
    tags: ['Ghiaccio secco', 'Soda blasting', '250+ bar'],
    ph: 'impianto',
    phNote: 'Dettaglio ravvicinato di una pulizia criogenica su un macchinario',
    links: ['pulizia-impianti-industriali', 'sabbiatura-criogenica'],
  },
  {
    id: 'resina',
    n: '03',
    color: 'yellow',
    title: 'Pavimenti in resina e segnaletica',
    short: 'Pavimenti in resina',
    lead: 'Resinatura di grandi superfici industriali e commerciali e tracciatura dei percorsi interni per mezzi e pedoni, come richiesto dal D.Lgs. 81/2008.',
    detail: 'Segnaletica orizzontale interna su richiesta',
    tags: ['Resinatura', 'Corsie pedonali', 'Aree di carico'],
    ph: 'pavimento-resina',
    phNote: 'Pavimento in resina appena completato in un magazzino logistico, corsie tracciate',
    links: ['pavimenti-in-resina', 'segnaletica-orizzontale'],
  },
  {
    id: 'imbiancature',
    n: '04',
    color: 'orange',
    title: 'Verniciature e imbiancature industriali',
    short: 'Imbiancature industriali',
    lead: 'Capannoni, facciate, uffici e aree commerciali. Tecnologia airless per le grandi superfici, verniciatura a bassa pressione e polifusione.',
    detail: 'Personale abilitato alle piattaforme aeree, mezzi di proprietà',
    tags: ['Airless', 'Facciate', 'Bassa pressione'],
    ph: 'facciata',
    phNote: 'Piattaforma a pantografo IPM durante la tinteggiatura di un capannone',
    links: ['imbiancature-industriali'],
  },
  {
    id: 'disinfestazione',
    n: '05',
    color: 'green',
    title: 'Disinfestazione e derattizzazione',
    short: 'Disinfestazione',
    lead: 'Roditori, mosche, zanzare, vespe, cimici, piccioni. Un protocollo per aziende e allevamenti: ricerca delle tracce, esche protette, monitoraggio periodico.',
    detail: 'Mappa delle postazioni e controlli programmati',
    tags: ['Derattizzazione', 'Allevamenti', 'Monitoraggio'],
    ph: 'disinfestazione',
    phNote: 'Tecnico che ispeziona una postazione di monitoraggio lungo il perimetro',
    links: ['disinfestazione-deratizzazione'],
  },
  {
    id: 'sanificazione',
    n: '06',
    color: 'purple',
    title: 'Sanificazione e servizi complementari',
    short: 'Sanificazione e altri servizi',
    lead: 'Sanificazione con atomizzatori elettrostatici, pulizie civili e commerciali, pulizie post cantiere e fornitura di consumabili igienico-sanitari.',
    detail: 'Un solo referente per più servizi',
    tags: ['Atomizzatori', 'Post cantiere', 'Consumabili'],
    ph: 'sanificazione',
    phNote: 'Sanificazione di una mensa aziendale con atomizzatore elettrostatico',
    links: ['sanificazione-ambienti', 'pulizie-civili-e-commerciali', 'pulizie-in-cantiere', 'fornitura-consumabili'],
  },
];

// Pagine servizio. Gli slug coincidono con gli URL del sito attuale
// per preservare l'indicizzazione (vedi docs/03-seo-redirect.md).
export const services = [
  {
    slug: 'pulizie-industriali',
    area: 'pulizie',
    title: 'Pulizie industriali',
    h1: 'Pulizie industriali e tecniche per stabilimenti e capannoni',
    metaTitle: 'Pulizie industriali Milano, Monza, Lecco | IPM Multiservice',
    metaDesc: 'Pulizie tecniche di linee produttive, camere bianche, macchine utensili e grandi pavimentazioni industriali. Personale interno e mezzi di proprietà dal 1981.',
    intro: "Polveri, oli, trucioli, residui di lavorazione: in uno stabilimento lo sporco è parte del processo. Lo gestiamo con squadre interne e un parco attrezzature di proprietà, su superfici e impianti di ogni dimensione.",
    ph: 'capannone',
    phNote: 'Squadra IPM con lavasciuga industriale in un capannone produttivo',
    scope: [
      ['Linee di produzione', 'Pulizie tecniche di linee, nastri e postazioni di lavoro.'],
      ['Camere bianche', 'Interventi in ambienti a contaminazione controllata.'],
      ['Macchine utensili e vasche di processo', 'Pulizia e manutenzione di macchinari e vasche.'],
      ['Pavimentazioni industriali', 'Pulizie di fondo e manutentive con macchinari specifici per grandi superfici.'],
      ['Lavori in quota', 'Interventi con piattaforme aeree di proprietà e personale interno.'],
      ['Vetrate', 'Lavaggio vetrate fino a 12 metri di altezza senza piattaforma.'],
      ['Uffici e spazi del personale', 'Pulizia e sanificazione di uffici, spogliatoi e servizi.'],
    ],
    facts: [['Dal', '1981'], ['Vetrate', 'fino a 12 m'], ['Mezzi', 'di proprietà']],
    related: ['pulizia-impianti-industriali', 'sabbiatura-criogenica', 'pavimenti-in-resina'],
  },
  {
    slug: 'pulizia-impianti-industriali',
    area: 'impianti',
    title: 'Pulizia impianti industriali',
    h1: 'Pulizia di impianti, macchinari e linee produttive',
    metaTitle: 'Pulizia impianti industriali Milano, Lecco, Monza | IPM Multiservice',
    metaDesc: 'Pulizia di impianti e macchinari con generatori di vapore, microsabbiatura, idropulitrici da 250 bar e sabbiatura criogenica. Interventi in Lombardia.',
    intro: "Ogni impianto ha materiali, depositi e vincoli diversi. Scegliamo la tecnica in base alla superficie e al tipo di residuo: vapore, acqua ad alta pressione, microsabbiatura o ghiaccio secco.",
    ph: 'impianto',
    phNote: 'Pulizia ad alta pressione di un impianto, dettaglio del getto',
    scope: [
      ['Generatori di vapore', 'Per sgrassare e igienizzare senza aggredire le superfici.'],
      ['Microsabbiatura', 'Per rimuovere incrostazioni e depositi tenaci.'],
      ['Alta pressione', 'Idropulitrici professionali da 250 bar in su.'],
      ['Sabbiatura criogenica', 'Pellet di ghiaccio secco: nessun residuo secondario, nessun solvente.'],
      ['Soda blasting', 'Bicarbonato di sodio idrosolubile, indicato anche per impianti alimentari.'],
    ],
    facts: [['Pressione', '250+ bar'], ['Tecniche', '5'], ['Solventi', 'non necessari*']],
    factsNote: '* con sabbiatura criogenica e soda blasting',
    related: ['sabbiatura-criogenica', 'pulizie-industriali', 'sanificazione-ambienti'],
  },
  {
    slug: 'sabbiatura-criogenica',
    area: 'impianti',
    title: 'Sabbiatura criogenica e soda blasting',
    h1: 'Sabbiatura criogenica e soda blasting',
    metaTitle: 'Sabbiatura criogenica e soda blasting | IPM Multiservice',
    metaDesc: 'Pulizia con ghiaccio secco e bicarbonato di sodio per impianti industriali e alimentari: rimozione di grassi, carbonizzazioni e calcare senza residui.',
    intro: "Due tecniche a secco per pulire impianti delicati o difficili da smontare. Il ghiaccio secco sublima a contatto con la superficie; il bicarbonato è idrosolubile. In entrambi i casi non resta un abrasivo da smaltire.",
    ph: 'linea-produttiva',
    phNote: 'Operatore con pistola criogenica su una linea, nube di CO₂ visibile',
    scope: [
      ['Sabbiatura criogenica', 'Pellet di ghiaccio secco proiettati ad alta velocità: il materiale sublima, senza residui secondari e senza solventi.'],
      ['Soda blasting', 'Bicarbonato di sodio: rimuove grassi, carbonizzazioni e calcare ed è idrosolubile, quindi non lascia residui.'],
      ['Impianti alimentari', 'Il soda blasting è indicato per gli impianti dell’industria alimentare.'],
      ['Componenti delicati', 'Pulizia di attrezzature industriali senza abrasivi aggressivi.'],
    ],
    facts: [['Residui secondari', 'nessuno*'], ['Solventi', 'nessuno'], ['Abrasivo', 'idrosolubile**']],
    factsNote: '* sabbiatura criogenica · ** soda blasting',
    related: ['pulizia-impianti-industriali', 'pulizie-industriali', 'sanificazione-ambienti'],
  },
  {
    slug: 'pavimenti-in-resina',
    area: 'resina',
    title: 'Pavimenti in resina',
    h1: 'Pavimenti industriali in resina',
    metaTitle: 'Pavimenti industriali in resina, resinatura | IPM Multiservice',
    metaDesc: 'Resinatura di grandi pavimentazioni industriali e commerciali, con segnaletica orizzontale interna su richiesta. Province di Milano, Monza, Lecco, Bergamo, Como.',
    intro: "Un pavimento industriale lavora tutto il giorno: carrelli, carichi, lavaggi, sostanze. La resinatura rinnova grandi superfici e, se serve, le completa con la segnaletica dei percorsi.",
    ph: 'pavimento-resina',
    phNote: 'Pavimento in resina lucido in un reparto produttivo, ripresa radente',
    scope: [
      ['Resinatura di grandi superfici', 'Per ambienti industriali e commerciali.'],
      ['Rifacimento e ripristino', 'Rinnovo di pavimentazioni esistenti.'],
      ['Segnaletica orizzontale', 'Corsie, aree di sosta e percorsi pedonali tracciati sul nuovo pavimento.'],
    ],
    facts: [['Superfici', 'grandi aree'], ['Segnaletica', 'su richiesta'], ['Ambiti', 'industria e retail']],
    related: ['segnaletica-orizzontale', 'pulizie-industriali', 'imbiancature-industriali'],
  },
  {
    slug: 'segnaletica-orizzontale',
    area: 'resina',
    title: 'Segnaletica orizzontale interna',
    h1: 'Segnaletica orizzontale aziendale interna',
    metaTitle: 'Segnaletica orizzontale aziendale interna | IPM Multiservice',
    metaDesc: 'Tracciature a pavimento per stabilimenti e magazzini logistici: corsie per mezzi e pedoni, aree di carico e di sosta, secondo il D.Lgs. 81/2008.',
    intro: "Negli impianti industriali e logistici le tracciature a pavimento rendono leggibili i percorsi di operatori, mezzi e visitatori. Il D.Lgs. 81/2008 prevede che le vie di circolazione dei veicoli siano adeguatamente segnalate.",
    ph: 'magazzino',
    phNote: 'Corsie gialle e zebrature in un magazzino logistico, vista dall’alto',
    scope: [
      ['Corsie per mezzi', 'Percorsi di carrelli e transpallet separati e riconoscibili.'],
      ['Percorsi pedonali', 'Attraversamenti e camminamenti protetti.'],
      ['Aree di carico e sosta', 'Delimitazioni, zebrature e aree di stoccaggio.'],
    ],
    facts: [['Riferimento', 'D.Lgs. 81/2008'], ['Ambiti', 'industria e logistica'], ['Abbinabile a', 'resinatura']],
    related: ['pavimenti-in-resina', 'pulizie-industriali', 'imbiancature-industriali'],
  },
  {
    slug: 'imbiancature-industriali',
    area: 'imbiancature',
    title: 'Verniciature e imbiancature industriali',
    h1: 'Verniciature e imbiancature industriali e commerciali',
    metaTitle: 'Imbiancature e verniciature industriali, capannoni | IPM Multiservice',
    metaDesc: 'Tinteggiatura di capannoni, facciate, uffici e aree commerciali con tecnologia airless, verniciatura a bassa pressione e polifusione. Personale abilitato PLE.',
    intro: "Capannoni, facciate, uffici, aree commerciali. Il team dedicato è formato da personale qualificato e aggiornato; per le grandi superfici usiamo la tecnologia airless e, in quota, piattaforme aeree di proprietà.",
    ph: 'facciata',
    phNote: 'Tinteggiatura airless di una facciata industriale da piattaforma aerea',
    scope: [
      ['Capannoni industriali', 'Imbiancatura, tinteggiatura e verniciatura di interni ed esterni.'],
      ['Facciate', 'Interventi su facciate di edifici produttivi e commerciali.'],
      ['Uffici e aree commerciali', 'Tinteggiature per spazi di lavoro e vendita.'],
      ['Airless', 'Applicazione a spruzzo per coprire grandi superfici in tempi ridotti.'],
      ['Bassa pressione e polifusione', 'Tecniche di verniciatura dedicate.'], // VERIFY: descrizione tecnica da far confermare a IPM
      ['Lavori in quota', 'Personale abilitato all’uso delle piattaforme aeree.'],
    ],
    facts: [['Tecnologia', 'airless'], ['Quota', 'personale PLE'], ['Mezzi', 'di proprietà']],
    related: ['pavimenti-in-resina', 'pulizie-in-cantiere', 'pulizie-industriali'],
  },
  {
    slug: 'disinfestazione-deratizzazione',
    area: 'disinfestazione',
    title: 'Disinfestazione e derattizzazione',
    h1: 'Disinfestazione e derattizzazione per aziende',
    metaTitle: 'Disinfestazione e derattizzazione Milano, Monza, Lecco | IPM Multiservice',
    metaDesc: 'Disinfestazione da zanzare, mosche, vespe e cimici, derattizzazione e allontanamento piccioni per aziende, allevamenti e abitazioni. Tecnici certificati.',
    intro: "Un'infestazione in azienda è un problema di igiene, di sicurezza e di immagine. Interveniamo con tecnici certificati, attrezzature professionali e protocolli definiti, nelle province di Lecco, Monza, Bergamo e Milano.",
    ph: 'disinfestazione',
    phNote: 'Tecnico che posiziona una postazione di esca protetta lungo il perimetro',
    scope: [
      ['Derattizzazione', 'Ricerca delle tracce, posizionamento delle esche, protezione dei contenitori e monitoraggio periodico.'],
      ['Insetti', 'Zanzare, mosche, vespe e cimici.'],
      ['Allontanamento piccioni', 'Sistemi per proteggere coperture, cornicioni e aree di carico.'],
      ['Aziende, allevamenti e abitazioni', 'Protocolli adeguati al tipo di ambiente.'],
    ],
    facts: [['Tecnici', 'certificati'], ['Metodo', 'monitoraggio periodico'], ['Ambiti', 'aziende e allevamenti']],
    related: ['sanificazione-ambienti', 'pulizie-industriali', 'pulizie-civili-e-commerciali'],
  },
  {
    slug: 'sanificazione-ambienti',
    area: 'sanificazione',
    title: 'Sanificazione ambienti',
    h1: 'Sanificazione e igienizzazione degli ambienti di lavoro',
    metaTitle: 'Sanificazione e igienizzazione ambienti di lavoro | IPM Multiservice',
    metaDesc: 'Sanificazione di uffici, servizi igienici, mense e camere bianche con atomizzatori elettrostatici, anche per ambienti industriali di grandi dimensioni.',
    intro: "Uffici, servizi igienici, mense, camere bianche: gli spazi condivisi richiedono un'igiene verificabile. Per gli ambienti più ampi usiamo atomizzatori elettrostatici, che distribuiscono il prodotto in modo uniforme.",
    ph: 'sanificazione',
    phNote: 'Atomizzatore elettrostatico in funzione in una mensa aziendale',
    scope: [
      ['Uffici e servizi igienici', 'Sanificazione periodica o straordinaria.'],
      ['Mense e spogliatoi', 'Spazi del personale ad alta frequentazione.'],
      ['Camere bianche', 'Ambienti a contaminazione controllata.'],
      ['Grandi superfici', 'Atomizzatori elettrostatici per ambienti industriali e commerciali di grandi dimensioni.'],
    ],
    facts: [['Tecnologia', 'atomizzatori elettrostatici'], ['Ambiti', 'industria e uffici'], ['Preventivo', 'gratuito']],
    related: ['pulizie-industriali', 'disinfestazione-deratizzazione', 'pulizie-civili-e-commerciali'],
  },
  {
    slug: 'pulizie-civili-e-commerciali',
    area: 'sanificazione',
    title: 'Pulizie civili e commerciali',
    h1: 'Pulizie civili e commerciali',
    metaTitle: 'Impresa di pulizie civili e commerciali | IPM Multiservice',
    metaDesc: 'Pulizie di uffici, negozi e spazi commerciali nelle province di Monza e Brianza, Lecco, Como, Bergamo e Milano. Preventivo gratuito.',
    intro: "Uffici, negozi, showroom e aree comuni. Pulizie programmate con la stessa organizzazione che usiamo negli stabilimenti, nelle province di Monza e Brianza, Lecco, Como, Bergamo e Milano.",
    ph: 'uffici',
    phNote: 'Open space di uffici pulito, luce del mattino',
    scope: [
      ['Uffici', 'Pulizie ordinarie e periodiche.'],
      ['Spazi commerciali', 'Negozi, showroom, aree aperte al pubblico.'],
      ['Aree comuni', 'Ingressi, scale, servizi.'],
    ],
    facts: [['Province', '5'], ['Programmazione', 'su misura'], ['Preventivo', 'gratuito']],
    related: ['sanificazione-ambienti', 'pulizie-in-cantiere', 'fornitura-consumabili'],
  },
  {
    slug: 'pulizie-in-cantiere',
    area: 'sanificazione',
    title: 'Pulizie post cantiere',
    h1: 'Pulizie post cantiere e di primo intervento',
    metaTitle: 'Pulizie post cantiere e primo intervento | IPM Multiservice',
    metaDesc: 'Pulizie finali dopo nuove costruzioni o ristrutturazioni, per consegnare ambienti pronti all’uso. Monza e Brianza, Lecco, Como, Bergamo, Milano.',
    intro: "Dopo una costruzione o una ristrutturazione restano polveri fini, residui di materiali, imballi. La pulizia finale rende gli spazi pronti per essere consegnati e utilizzati.",
    ph: 'cantiere',
    phNote: 'Ambiente appena ristrutturato prima e dopo la pulizia finale',
    scope: [
      ['Pulizia finale', 'Dopo nuove costruzioni e ristrutturazioni.'],
      ['Primo intervento', 'Rimozione di residui e polveri di cantiere.'],
      ['Consegna', 'Spazi pronti per l’uso o la consegna al cliente.'],
    ],
    facts: [['Ambiti', 'nuove costruzioni'], ['Anche', 'ristrutturazioni'], ['Province', '5']],
    related: ['pulizie-civili-e-commerciali', 'imbiancature-industriali', 'pavimenti-in-resina'],
  },
  {
    slug: 'fornitura-consumabili',
    area: 'sanificazione',
    title: 'Fornitura consumabili',
    h1: 'Fornitura di consumabili igienico-sanitari',
    metaTitle: 'Fornitura consumabili igienico-sanitari per aziende | IPM Multiservice',
    metaDesc: 'Carta igienica, asciugamani, bobine per officina, distributori, saponi, paste lavamani, prodotti professionali e tappeti asciugapasso e raccogli olio.',
    intro: "Dal 1991 forniamo anche il materiale che serve ogni giorno: carta, saponi, distributori e prodotti professionali. Un fornitore in meno da gestire, nello stesso rapporto di servizio.",
    ph: 'forniture',
    phNote: 'Magazzino consumabili IPM, bancali e bobine',
    scope: [
      ['Carta', 'Igienica, asciugamani, bobine per officina.'],
      ['Distributori', 'Per carta, sapone e asciugamani.'],
      ['Saponi e paste lavamani', 'Anche per le officine.'],
      ['Prodotti professionali', 'Per le pulizie professionali.'],
      ['Tappeti', 'Asciugapasso e raccogli olio.'],
    ],
    facts: [['Dal', '1991'], ['Categorie', '5'], ['Abbinabile a', 'servizi di pulizia']],
    related: ['pulizie-industriali', 'pulizie-civili-e-commerciali', 'sanificazione-ambienti'],
  },
];

// Sezione 02 della homepage: gli ambienti in cui IPM interviene.
export const environments = [
  { n: '01', title: 'Linee di produzione', text: 'Residui di lavorazione, oli e polveri su nastri, postazioni e macchinari.', ph: 'linea-produttiva' },
  { n: '02', title: 'Impianti e macchinari', text: 'Depositi, grassi e incrostazioni su superfici che non si possono smontare.', ph: 'impianto' },
  { n: '03', title: 'Capannoni e magazzini', text: 'Grandi volumi, scaffalature, lavori in quota e percorsi di mezzi.', ph: 'capannone' },
  { n: '04', title: 'Pavimentazioni', text: 'Superfici che si consumano sotto carrelli, carichi e lavaggi.', ph: 'pavimento-resina' },
  { n: '05', title: 'Uffici, mense e spazi comuni', text: 'Gli ambienti del personale, dove l’igiene si vede e si misura.', ph: 'uffici' },
];

// Metodo: proposta di storytelling coerente con quanto dichiarato dal sito
// (preventivo gratuito, personale interno, mezzi di proprietà, monitoraggio).
// VERIFY: far validare a IPM le fasi e la possibilità di sopralluogo.
export const method = [
  { n: '01', title: 'Sopralluogo e analisi', text: 'Vediamo l’ambiente, i materiali, i vincoli di sicurezza e gli orari dell’attività. Il preventivo è gratuito e senza impegno.' },
  { n: '02', title: 'Pianificazione', text: 'Definiamo tecniche, attrezzature, squadra e finestre di intervento in funzione dei tuoi turni e delle aree da liberare.' },
  { n: '03', title: 'Intervento', text: 'Operano persone IPM con mezzi e attrezzature di proprietà, mantenuti nella nostra officina interna.' },
  { n: '04', title: 'Verifica e continuità', text: 'Controlliamo il risultato e, dove serve, programmiamo interventi ricorrenti e monitoraggi periodici.' },
];

// Storia: cronologia pubblicata sul sito attuale.
export const timeline = [
  { y: '1981', title: 'La fondazione', text: 'Diego Castelli avvia un’impresa individuale di pulizie civili e industriali.' },
  { y: '1985', title: 'Una sede propria', text: 'Acquisto del fabbricato che ospita sede amministrativa e magazzino.' },
  { y: '1991', title: 'Le forniture', text: 'L’offerta si amplia a materiale igienico-sanitario, saponi e carte.' },
  { y: '1996', title: 'I servizi specialistici', text: 'Derattizzazione, disinfestazione, resine, imbiancature industriali e segnaletica orizzontale.' },
  { y: '2009', title: 'IPM 2.0', text: 'L’azienda si riorganizza attorno al multiservizio e all’outsourcing.' },
  { y: '2016', title: 'Il consolidamento', text: 'Si consolida la presenza sul mercato industriale lombardo.' },
  { y: 'Oggi', title: 'Paderno d’Adda', text: 'Squadre interne, mezzi di proprietà e officina interna, tra Brianza, Lecco, Como, Bergamo e Milano.' },
];

// Numeri: solo dati pubblicati da IPM.
export const figures = [
  { v: 1981, label: 'anno di fondazione', count: true },
  { v: 5, label: 'province servite in Lombardia', count: true },
  { v: 250, suffix: '+', unit: 'bar', label: 'pressione dei lavaggi tecnici', count: true },
  { v: 12, unit: 'm', label: 'vetrate lavate senza piattaforma', count: true },
];

// Progetti: NESSUN caso reale disponibile. Slot strutturati da compilare.
export const projects = [
  { code: 'CS-01', type: 'Pulizia tecnica', sector: 'Settore da indicare', ph: 'linea-produttiva', size: 'wide' },
  { code: 'CS-02', type: 'Pavimento in resina', sector: 'Settore da indicare', ph: 'pavimento-resina', size: 'tall' },
  { code: 'CS-03', type: 'Imbiancatura capannone', sector: 'Settore da indicare', ph: 'facciata', size: 'std' },
  { code: 'CS-04', type: 'Derattizzazione', sector: 'Settore da indicare', ph: 'disinfestazione', size: 'std' },
  { code: 'CS-05', type: 'Sabbiatura criogenica', sector: 'Settore da indicare', ph: 'impianto', size: 'std' },
  { code: 'CS-06', type: 'Segnaletica orizzontale', sector: 'Settore da indicare', ph: 'magazzino', size: 'wide' },
];

export const nav = [
  { label: 'Azienda', href: 'azienda/' },
  { label: 'Servizi', href: 'servizi/', mega: true },
  { label: 'Progetti', href: 'progetti/' },
  { label: 'Contatti', href: 'contatti/' },
];
