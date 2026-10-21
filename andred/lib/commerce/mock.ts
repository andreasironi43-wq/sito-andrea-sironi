// Catalogo di prova, usato finché Shopify non è collegato.
// Usa solo i dati già presenti nei dizionari: niente taglie, prezzi o scorte inventati.
// Con COMMERCE_DEMO=1 i capi risultano acquistabili, per provare carrello e flusso.

import { getDictionary, type Locale } from "@/lib/i18n";
import { CommerceError, type Cart, type CartLineInput, type CommerceProvider, type Product } from "./types";

const demo = () => process.env.COMMERCE_DEMO === "1";

function buildProducts(locale: Locale): Product[] {
  const t = getDictionary(locale);
  return t.objects.items.map((o) => {
    const code = o.model.split(" ")[1] ?? "";
    const priceRow = o.specs.find(([k]) => k === "Prezzo" || k === "Price");
    const available = demo();
    return {
      id: `mock-${o.id}`,
      handle: `${o.id}-${code}`,
      title: o.name,
      model: o.model,
      code,
      description: "",
      images: [],
      drawing: o.drawing === "shirt" ? "shirt" : "hoodie",
      drawingAlt: o.drawingAlt,
      variants: [
        {
          id: `mock-${o.id}-tbd`,
          title: t.shop.sizeTbd,
          available,
          quantityAvailable: null,
          price: null,
          options: [{ name: t.shop.size, value: t.shop.sizeTbd }],
        },
      ],
      specs: o.specs as [string, string][],
      footnote: o.footnote,
      priceNote: priceRow?.[1] ?? "",
      priceFrom: null,
      editionSize: null,
      dropStatus: available ? "open" : "unknown",
      dropDate: null,
      available,
    };
  });
}

// Carrelli in memoria: bastano per lo sviluppo, si perdono al riavvio.
type StoredLine = { id: string; variantId: string; quantity: number };
const g = globalThis as unknown as { __andredCarts?: Map<string, StoredLine[]> };
const carts: Map<string, StoredLine[]> = (g.__andredCarts ??= new Map());

function toCart(id: string, locale: Locale): Cart {
  const products = buildProducts(locale);
  const lines = (carts.get(id) ?? []).flatMap((l) => {
    const p = products.find((p) => p.variants.some((v) => v.id === l.variantId));
    const v = p?.variants.find((v) => v.id === l.variantId);
    if (!p || !v) return [];
    return [
      {
        id: l.id,
        quantity: l.quantity,
        variantId: v.id,
        variantTitle: v.title,
        productTitle: p.title,
        productModel: p.model,
        handle: p.handle,
        price: null,
        total: null,
      },
    ];
  });
  return {
    id,
    lines,
    totalQuantity: lines.reduce((n, l) => n + l.quantity, 0),
    subtotal: null,
    checkoutUrl: null,
  };
}

function assertAvailable(lines: CartLineInput[], locale: Locale) {
  const variants = buildProducts(locale).flatMap((p) => p.variants);
  for (const l of lines) {
    const v = variants.find((v) => v.id === l.variantId);
    if (!v) throw new CommerceError("Variante inesistente", "not_found");
    if (!v.available) throw new CommerceError("Non disponibile", "unavailable");
  }
}

export const mockProvider: CommerceProvider = {
  name: "mock",
  async getProducts(locale) {
    return buildProducts(locale);
  },
  async getProduct(handle, locale) {
    return buildProducts(locale).find((p) => p.handle === handle) ?? null;
  },
  async getCart(id, locale) {
    return carts.has(id) ? toCart(id, locale) : null;
  },
  async createCart(lines, locale) {
    assertAvailable(lines, locale);
    const id = `mock-cart-${crypto.randomUUID()}`;
    carts.set(id, []);
    return this.addLines(id, lines, locale);
  },
  async addLines(id, lines, locale) {
    assertAvailable(lines, locale);
    const stored = carts.get(id) ?? [];
    for (const l of lines) {
      const existing = stored.find((s) => s.variantId === l.variantId);
      if (existing) existing.quantity += l.quantity;
      else stored.push({ id: `line-${crypto.randomUUID()}`, variantId: l.variantId, quantity: l.quantity });
    }
    carts.set(id, stored);
    return toCart(id, locale);
  },
  async updateLine(id, lineId, quantity, locale) {
    const stored = (carts.get(id) ?? []).map((l) => (l.id === lineId ? { ...l, quantity } : l));
    carts.set(id, stored.filter((l) => l.quantity > 0));
    return toCart(id, locale);
  },
  async removeLine(id, lineId, locale) {
    carts.set(id, (carts.get(id) ?? []).filter((l) => l.id !== lineId));
    return toCart(id, locale);
  },
};
