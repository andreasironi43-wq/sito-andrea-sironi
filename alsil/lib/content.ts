/**
 * Contenuti tecnici. Fonte: Manuale della Qualità AL.SIL., operazione 05, rev. 19.02.24.
 * Non aggiungere dati che non siano nel manuale: vedi docs/claims-da-confermare.md.
 */

export type Fase = {
  /** Numeri di fase del manuale (es. [3, 5] = fasi da 3 a 5). Assente se la numerazione non è confermata. */
  n?: [number, number?];
  title: string;
  detail?: string;
  params?: string[];
};

export type Blocco = {
  id: string;
  label: string;
  title: string;
  intro: string;
  fasi: Fase[];
  facts?: string[];
};

export const keyFacts = [
  { value: "19", unit: "fasi", label: "nel ciclo, dal telaio ai controlli" },
  { value: "4", unit: "cabine", label: "di verniciatura a polvere" },
  { value: "100", unit: "m", label: "di forno di cottura, 190 °C per 40 min" },
  { value: "3", unit: "pezzi per lotto", label: "controllati: primo, centrale, ultimo" },
] as const;

export const ciclo: Blocco[] = [
  {
    id: "pretrattamento",
    label: "01",
    title: "Pretrattamento",
    intro:
      "Prepara la superficie del pressofuso alla verniciatura. Le concentrazioni dei bagni sono controllate in automatico da una centralina.",
    fasi: [
      { n: [1], title: "Posizionamento sul telaio" },
      {
        n: [2],
        title: "Sgrassaggio alcalino",
        detail: "Rimuove oli e residui di lavorazione.",
        params: ["4 min", "55 °C"],
      },
      { n: [3, 5], title: "3 risciacqui in acqua di rete", params: ["1,5 min ciascuno"] },
      {
        n: [6],
        title: "Disossidazione acida",
        detail: "Asporta il rame presente in superficie, causa di ossidazione dell'alluminio.",
        params: ["4 min"],
      },
      { n: [7, 8], title: "2 risciacqui" },
      {
        n: [9],
        title: "Passivazione con cromo trivalente",
        params: ["4 min", "45–50 °C"],
      },
      {
        n: [10, 13],
        title: "4 risciacqui in acqua demineralizzata",
        detail:
          "L'acqua demineralizzata è ottenuta da un impianto sottovuoto che distilla l'acqua di processo.",
      },
      {
        n: [14],
        title: "Sigillatura della passivazione",
        detail:
          "In due varianti: sigillatura per ambienti molto aggressivi (es. marino) e sigillatura per ambienti poco aggressivi.",
      },
      { n: [15], title: "Asciugatura", params: ["20 min", "130 °C"] },
    ],
  },
  {
    id: "applicazione",
    label: "02",
    title: "Applicazione",
    intro: "Verniciatura a polvere in 4 cabine, ciascuna con un compito preciso.",
    fasi: [
      {
        title: "2 cabine traslabili",
        detail: "Per cambi rapidi di colore, separate tra tinte chiare e tinte scure.",
      },
      {
        title: "1 cabina per primer e fondi",
        detail: "Dedicata a primer epossidici e fondi anticorrosivi.",
      },
      {
        title: "1 cabina per campionature e piccoli lotti",
      },
    ],
    facts: [
      "Doppia mano in linea possibile grazie al forno di gelificazione da 30 m, in funzione dal 2015.",
      "Primer impermeabilizzanti o fondi epossidici anticorrosione conduttivi su richiesta del cliente.",
    ],
  },
  {
    id: "cottura-controlli",
    label: "03",
    title: "Cottura e controlli",
    intro: "Polimerizzazione in forno e verifica del rivestimento su ogni lotto.",
    fasi: [
      {
        title: "Cottura in forno da 100 m",
        params: ["40 min", "190 °C"],
        detail: "Raffreddamento forzato per i pezzi con alti spessori.",
      },
      {
        title: "Controlli su 3 pezzi per lotto",
        detail: "Primo, centrale e ultimo pezzo del lotto.",
        params: ["Aderenza ISO 2409", "Spessore ISO 2360", "Brillantezza con glossmetro, dove richiesta"],
      },
      {
        title: "Dossier di prodotto",
        detail: "Ogni pezzo ha un dossier con la check-list delle fasi eseguite.",
      },
    ],
  },
];

export type Ambiente = {
  id: string;
  title: string;
  where: string;
  ciclo: string[];
  note?: string;
};

export const ambienti: Ambiente[] = [
  {
    id: "poco-aggressivo",
    title: "Ambienti poco aggressivi",
    where: "Interni ed esterni senza particolari agenti corrosivi.",
    ciclo: [
      "Ciclo di pretrattamento completo.",
      "Sigillatura per ambienti poco aggressivi.",
      "Polvere poliestere per esterni, resistente ai raggi UV, se il pezzo è esposto alla luce solare.",
    ],
  },
  {
    id: "marino",
    title: "Ambiente marino e zone ad alta salinità",
    where: "Località costiere, aree esposte a salsedine.",
    ciclo: [
      "Ciclo di pretrattamento completo.",
      "Sigillatura per ambienti molto aggressivi.",
      "Su richiesta: primer impermeabilizzanti o fondi epossidici anticorrosione conduttivi.",
    ],
  },
  {
    id: "terreno-cemento",
    title: "Contatto con terreno o cemento",
    where: "Pezzi interrati, annegati o appoggiati su calcestruzzo; pezzi con spigoli vivi.",
    ciclo: [
      "Ciclo di pretrattamento completo.",
      "Su richiesta: fondi epossidici anticorrosione conduttivi prima della finitura.",
    ],
  },
  {
    id: "piscine-cloro",
    title: "Ambienti saturi di cloro",
    where: "Ad esempio piscine coperte.",
    ciclo: [
      "Ciclo di pretrattamento completo.",
      "Fondi impermeabilizzanti.",
      "Finitura poliuretanica antigraffiti a facile pulizia.",
    ],
  },
];

export const polveri = [
  {
    title: "Poliestere",
    use: "Per esterni",
    detail: "Resiste ai raggi UV: adatta ai pezzi esposti alla luce solare.",
  },
  {
    title: "Epossidica",
    use: "Contro gli agenti chimici",
    detail: "Resiste agli agenti chimici, ma va valutata con attenzione se il pezzo è esposto ai raggi UV.",
  },
] as const;
