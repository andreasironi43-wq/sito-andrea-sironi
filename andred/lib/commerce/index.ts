import { mockProvider } from "./mock";
import { shopifyProvider } from "./shopify";
import type { CommerceProvider } from "./types";

/** Shopify se sono impostate le credenziali, altrimenti il catalogo di prova. */
export function getCommerce(): CommerceProvider {
  const hasShopify = Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_TOKEN);
  return hasShopify ? shopifyProvider : mockProvider;
}

export * from "./types";
export { formatMoney } from "./format";
export { commerceConfig } from "./config";
