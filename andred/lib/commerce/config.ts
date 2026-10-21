// Scelte di negozio ancora aperte: si cambiano qui, non nei componenti.
export const commerceConfig = {
  /**
   * Mostrare il numero reale di pezzi rimasti ("12 pezzi rimasti")
   * o solo Disponibile / Esaurito. Decisione da prendere: per ora false.
   * Con Shopify richiede lo scope unauthenticated_read_product_inventory.
   */
  showStockCount: process.env.SHOW_STOCK_COUNT === "1",
  /** Paese per prezzi e disponibilità (Shopify Markets). Mercati da definire: default Italia. */
  country: process.env.SHOPIFY_COUNTRY ?? "IT",
  /** Ricaricamento del catalogo dalla cache (secondi). Il webhook lo forza prima. */
  revalidate: 60,
};
