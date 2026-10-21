// Provider Shopify: Storefront API (GraphQL), in modalità headless.
// Shopify gestisce catalogo, magazzino, IVA e checkout; il sito mostra e manda al checkout.
//
// Variabili d'ambiente:
//   SHOPIFY_STORE_DOMAIN       es. andred.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN   token pubblico della Storefront API (app "Headless")
//   SHOPIFY_API_VERSION        es. 2026-07 (facoltativo)
//   SHOPIFY_COUNTRY            paese di default per prezzi e disponibilità (facoltativo, IT)
//
// Metafield prodotto usati (namespace "custom"), tutti facoltativi:
//   code (testo)         "001"
//   model (testo)        "Shirt 001"
//   specs (JSON)         [["Tipo","Camicia"],["Origine","Brianza*"]]  — traducibile
//   footnote (testo)     "* Da confermare con la produzione reale."
//   price_note (testo)   "Indicativo €180–200, da confermare"
//   edition_size (intero) 100
//   drop_status (testo)  announced | open | closed
//   drop_date (data/ora)
//   drawing (testo)      shirt | hoodie   (disegno SVG quando mancano le foto)

import type { Locale } from "@/lib/i18n";
import { commerceConfig } from "./config";
import {
  CommerceError,
  type Cart,
  type CartLineInput,
  type CommerceProvider,
  type DropStatus,
  type Money,
  type Product,
} from "./types";

const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2026-07";

type GqlOptions = { cache?: "products" | "none" };

async function gql<T>(query: string, variables: Record<string, unknown>, opts: GqlOptions = {}): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) throw new CommerceError("Shopify non configurato");

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    ...(opts.cache === "products"
      ? { next: { revalidate: commerceConfig.revalidate, tags: ["products"] } }
      : { cache: "no-store" as const }),
  });
  if (!res.ok) throw new CommerceError(`Shopify ${res.status}`);
  const body = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (body.errors?.length) throw new CommerceError(body.errors.map((e) => e.message).join("; "));
  return body.data as T;
}

const ctx = (locale: Locale) => ({ language: locale.toUpperCase(), country: commerceConfig.country });

// ---------- Prodotti ----------

const METAFIELDS = ["code", "model", "specs", "footnote", "price_note", "edition_size", "drop_status", "drop_date", "drawing"];

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    availableForSale
    priceRange { minVariantPrice { amount currencyCode } }
    images(first: 12) { nodes { url altText width height } }
    variants(first: 50) {
      nodes {
        id
        title
        availableForSale
        quantityAvailable
        price { amount currencyCode }
        selectedOptions { name value }
      }
    }
    metafields(identifiers: [${METAFIELDS.map((k) => `{namespace: "custom", key: "${k}"}`).join(", ")}]) {
      key
      value
    }
  }
`;

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: Money };
  images: { nodes: { url: string; altText: string | null; width: number; height: number }[] };
  variants: {
    nodes: {
      id: string;
      title: string;
      availableForSale: boolean;
      quantityAvailable: number | null;
      price: Money;
      selectedOptions: { name: string; value: string }[];
    }[];
  };
  metafields: ({ key: string; value: string } | null)[];
};

function parseSpecs(raw: string | undefined): [string, string][] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((r) => Array.isArray(r) && r.length === 2).map((r) => [String(r[0]), String(r[1])]) : [];
  } catch {
    return [];
  }
}

function mapProduct(p: ShopifyProduct): Product {
  const mf = Object.fromEntries(p.metafields.filter(Boolean).map((m) => [m!.key, m!.value]));
  const status = (["announced", "open", "closed"].includes(mf.drop_status) ? mf.drop_status : "unknown") as DropStatus;
  const drawing = mf.drawing === "shirt" || mf.drawing === "hoodie" ? mf.drawing : null;
  const edition = Number(mf.edition_size);
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    model: mf.model ?? "",
    code: mf.code ?? "",
    description: p.description,
    images: p.images.nodes.map((i) => ({ url: i.url, alt: i.altText ?? p.title, width: i.width, height: i.height })),
    drawing,
    drawingAlt: p.title,
    variants: p.variants.nodes.map((v) => ({
      id: v.id,
      title: v.title,
      available: v.availableForSale,
      quantityAvailable: commerceConfig.showStockCount ? v.quantityAvailable : null,
      price: v.price,
      options: v.selectedOptions,
    })),
    specs: parseSpecs(mf.specs),
    footnote: mf.footnote ?? "",
    priceNote: mf.price_note ?? "",
    priceFrom: p.priceRange.minVariantPrice,
    editionSize: Number.isFinite(edition) && edition > 0 ? edition : null,
    dropStatus: status,
    dropDate: mf.drop_date ?? null,
    // Un drop chiuso non si vende anche se è rimasta scorta.
    available: p.availableForSale && status !== "closed",
  };
}

// ---------- Carrello ----------

const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost { subtotalAmount { amount currencyCode } }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { amountPerQuantity { amount currencyCode } totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              handle
              title
              model: metafield(namespace: "custom", key: "model") { value }
            }
          }
        }
      }
    }
  }
`;

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { amountPerQuantity: Money; totalAmount: Money };
      merchandise: {
        id: string;
        title: string;
        product: { handle: string; title: string; model: { value: string } | null };
      };
    }[];
  };
};

type UserError = { message: string; code?: string };

function mapCart(c: ShopifyCart): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: c.cost.subtotalAmount,
    lines: c.lines.nodes.map((l) => ({
      id: l.id,
      quantity: l.quantity,
      variantId: l.merchandise.id,
      variantTitle: l.merchandise.title,
      productTitle: l.merchandise.product.title,
      productModel: l.merchandise.product.model?.value ?? "",
      handle: l.merchandise.product.handle,
      price: l.cost.amountPerQuantity,
      total: l.cost.totalAmount,
    })),
  };
}

function unwrap(result: { cart: ShopifyCart | null; userErrors: UserError[] }): Cart {
  if (result.userErrors.length || !result.cart) {
    const unavailable = result.userErrors.some((e) => /stock|available|disponib/i.test(e.message + (e.code ?? "")));
    throw new CommerceError(result.userErrors.map((e) => e.message).join("; "), unavailable ? "unavailable" : "provider");
  }
  return mapCart(result.cart);
}

const toLines = (lines: CartLineInput[]) => lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity }));

export const shopifyProvider: CommerceProvider = {
  name: "shopify",

  async getProducts(locale) {
    const data = await gql<{ products: { nodes: ShopifyProduct[] } }>(
      `${PRODUCT_FIELDS}
      query Products($language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
        products(first: 50, sortKey: CREATED_AT) { nodes { ...ProductFields } }
      }`,
      ctx(locale),
      { cache: "products" },
    );
    return data.products.nodes.map(mapProduct);
  },

  async getProduct(handle, locale) {
    const data = await gql<{ product: ShopifyProduct | null }>(
      `${PRODUCT_FIELDS}
      query Product($handle: String!, $language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
        product(handle: $handle) { ...ProductFields }
      }`,
      { handle, ...ctx(locale) },
      { cache: "products" },
    );
    return data.product ? mapProduct(data.product) : null;
  },

  async getCart(cartId, locale) {
    const data = await gql<{ cart: ShopifyCart | null }>(
      `${CART_FIELDS}
      query Cart($id: ID!, $language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
        cart(id: $id) { ...CartFields }
      }`,
      { id: cartId, ...ctx(locale) },
    );
    return data.cart ? mapCart(data.cart) : null;
  },

  async createCart(lines, locale) {
    const data = await gql<{ cartCreate: { cart: ShopifyCart | null; userErrors: UserError[] } }>(
      `${CART_FIELDS}
      mutation CartCreate($input: CartInput!, $language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
        cartCreate(input: $input) { cart { ...CartFields } userErrors { message code } }
      }`,
      { input: { lines: toLines(lines), buyerIdentity: { countryCode: commerceConfig.country } }, ...ctx(locale) },
    );
    return unwrap(data.cartCreate);
  },

  async addLines(cartId, lines, locale) {
    const data = await gql<{ cartLinesAdd: { cart: ShopifyCart | null; userErrors: UserError[] } }>(
      `${CART_FIELDS}
      mutation Add($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
        cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } userErrors { message code } }
      }`,
      { cartId, lines: toLines(lines), ...ctx(locale) },
    );
    return unwrap(data.cartLinesAdd);
  },

  async updateLine(cartId, lineId, quantity, locale) {
    const data = await gql<{ cartLinesUpdate: { cart: ShopifyCart | null; userErrors: UserError[] } }>(
      `${CART_FIELDS}
      mutation Update($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } userErrors { message code } }
      }`,
      { cartId, lines: [{ id: lineId, quantity }], ...ctx(locale) },
    );
    return unwrap(data.cartLinesUpdate);
  },

  async removeLine(cartId, lineId, locale) {
    const data = await gql<{ cartLinesRemove: { cart: ShopifyCart | null; userErrors: UserError[] } }>(
      `${CART_FIELDS}
      mutation Remove($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } userErrors { message code } }
      }`,
      { cartId, lineIds: [lineId], ...ctx(locale) },
    );
    return unwrap(data.cartLinesRemove);
  },
};
