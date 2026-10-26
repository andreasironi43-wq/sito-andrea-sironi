export type Block =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type Category = { slug: string; name: string; description: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Data di pubblicazione ISO (yyyy-mm-dd). Vuota se non nota: in quel caso non viene mostrata. */
  date: string;
  body: Block[];
};

export const categories: Category[] = [
  {
    slug: "polveri-e-finiture",
    name: "Polveri e finiture",
    description: "Tipi di polvere, colori e finiture in base all'uso del pezzo.",
  },
  {
    slug: "pretrattamento",
    name: "Pretrattamento",
    description: "Le fasi che preparano l'alluminio pressofuso alla verniciatura.",
  },
  {
    slug: "corrosione",
    name: "Corrosione",
    description: "Cicli e scelte tecniche per gli ambienti aggressivi.",
  },
];

/*
 * ATTENZIONE: il testo originale dell'articolo non era disponibile durante il rifacimento.
 * Il contenuto qui sotto usa solo i fatti del Manuale della Qualità. Va sostituito con il testo
 * originale (correggendo solo la forma) prima della pubblicazione. Vedi docs/claims-da-confermare.md.
 */
export const posts: Post[] = [
  {
    slug: "personalizzazione-tinte-tipologie-polveri-destinazione-materiali",
    title: "Personalizzazione delle tinte: varie tipologie di polveri in base alla destinazione dei materiali",
    description:
      "Poliestere per esterni o epossidica per gli agenti chimici: come si sceglie la polvere in base a dove lavorerà il pezzo, e come si gestiscono colori e piccoli lotti.",
    category: "polveri-e-finiture",
    date: "", // da confermare: data dell'articolo originale
    body: [
      {
        type: "p",
        text: "Il colore è la parte visibile della verniciatura a polvere, ma non è l'unico criterio di scelta. Il tipo di polvere si decide in base alla destinazione del pezzo: luce solare, agenti chimici, umidità e sale cambiano il comportamento del rivestimento nel tempo.",
      },
      { type: "h2", id: "poliestere", text: "Polveri poliestere: per gli esterni" },
      {
        type: "p",
        text: "Le polveri poliestere resistono ai raggi UV. Sono la scelta indicata per i pezzi esposti alla luce solare, perché mantengono colore e aspetto della superficie.",
      },
      { type: "h2", id: "epossidiche", text: "Polveri epossidiche: contro gli agenti chimici" },
      {
        type: "p",
        text: "Le polveri epossidiche resistono agli agenti chimici. Vanno però valutate con attenzione quando il pezzo è esposto ai raggi UV.",
      },
      { type: "h2", id: "ambienti-aggressivi", text: "Quando l'ambiente è aggressivo" },
      {
        type: "p",
        text: "Per i pezzi che richiedono un'alta resistenza alla corrosione, su richiesta del cliente si applicano strati aggiuntivi sotto la finitura:",
      },
      {
        type: "ul",
        items: [
          "primer impermeabilizzanti o fondi epossidici anticorrosione conduttivi, per pezzi a contatto con terreno o cemento, zone ad alta salinità e pezzi con spigoli vivi;",
          "fondi impermeabilizzanti e finitura poliuretanica antigraffiti a facile pulizia, per ambienti saturi di cloro come le piscine coperte.",
        ],
      },
      { type: "h2", id: "colori", text: "Colori, cambi tinta e campionature" },
      {
        type: "p",
        text: "Le tinte si indicano con il codice RAL o con il colore richiesto dal cliente. Delle 4 cabine di verniciatura, due sono traslabili e permettono cambi rapidi di colore, separando le tinte chiare da quelle scure. Una cabina è dedicata alle campionature e ai piccoli lotti.",
      },
      { type: "h2", id: "chi-sceglie", text: "Chi sceglie la polvere" },
      {
        type: "p",
        text: "La scelta finale del tipo di polvere spetta ai nostri tecnici, sulla base delle informazioni sul pezzo e sull'ambiente in cui lavorerà. Per questo, nella richiesta di preventivo, è utile indicare la destinazione d'uso e le specifiche da rispettare.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function categoriesWithPosts() {
  return categories.filter((c) => posts.some((p) => p.category === c.slug));
}
export function postsIn(category: string) {
  return posts.filter((p) => p.category === category).sort((a, b) => b.date.localeCompare(a.date));
}
export function relatedPosts(post: Post, n = 3) {
  return posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || b.date.localeCompare(a.date))
    .slice(0, n);
}
export const formatDate = (d: string) =>
  new Date(d + "T12:00:00Z").toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
