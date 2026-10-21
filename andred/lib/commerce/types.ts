// Modello dati del negozio, indipendente da Shopify.
// Il sito parla solo con questi tipi: cambiare piattaforma = scrivere un nuovo provider.

import type { Locale } from "@/lib/i18n";

export type Money = { amount: string; currencyCode: string };

export type ProductImage = { url: string; alt: string; width: number; height: number };

export type Variant = {
  id: string;
  title: string;
  available: boolean;
  /** null se la piattaforma non lo espone o se non vogliamo mostrarlo. */
  quantityAvailable: number | null;
  price: Money | null;
  options: { name: string; value: string }[];
};

/** Stato del drop: annunciato, aperto (in vendita), chiuso (archivio). */
export type DropStatus = "announced" | "open" | "closed" | "unknown";

export type Product = {
  id: string;
  handle: string;
  /** Nome del capo, es. "PEDER". */
  title: string;
  /** Tipo + codice, es. "Shirt 001". */
  model: string;
  code: string;
  description: string;
  images: ProductImage[];
  /** Disegno SVG di riserva quando mancano le foto. */
  drawing: "shirt" | "hoodie" | null;
  drawingAlt: string;
  variants: Variant[];
  /** Righe tecniche [etichetta, valore]. */
  specs: [string, string][];
  footnote: string;
  /** Testo sul prezzo quando non è ancora definitivo. */
  priceNote: string;
  priceFrom: Money | null;
  editionSize: number | null;
  dropStatus: DropStatus;
  dropDate: string | null;
  available: boolean;
};

export type CartLine = {
  id: string;
  quantity: number;
  variantId: string;
  variantTitle: string;
  productTitle: string;
  productModel: string;
  handle: string;
  price: Money | null;
  total: Money | null;
};

export type Cart = {
  id: string;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: Money | null;
  /** URL del checkout ospitato da Shopify. null finché il negozio non è collegato. */
  checkoutUrl: string | null;
};

export type CartLineInput = { variantId: string; quantity: number };

export interface CommerceProvider {
  name: "shopify" | "mock";
  getProducts(locale: Locale): Promise<Product[]>;
  getProduct(handle: string, locale: Locale): Promise<Product | null>;
  getCart(cartId: string, locale: Locale): Promise<Cart | null>;
  createCart(lines: CartLineInput[], locale: Locale): Promise<Cart>;
  addLines(cartId: string, lines: CartLineInput[], locale: Locale): Promise<Cart>;
  updateLine(cartId: string, lineId: string, quantity: number, locale: Locale): Promise<Cart>;
  removeLine(cartId: string, lineId: string, locale: Locale): Promise<Cart>;
}

export class CommerceError extends Error {
  constructor(
    message: string,
    public code: "unavailable" | "not_found" | "provider" = "provider",
  ) {
    super(message);
  }
}
