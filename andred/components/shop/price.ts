import { formatMoney, type Product } from "@/lib/commerce";
import type { Dictionary, Locale } from "@/lib/i18n";

/** Prezzo reale se c'è; altrimenti la nota sul prezzo; altrimenti "Prezzo da definire". */
export function priceText(p: Product, t: Dictionary, lang: Locale) {
  const varies = new Set(p.variants.map((v) => v.price?.amount)).size > 1;
  const money = formatMoney(p.priceFrom, lang);
  if (money) return varies ? `${lang === "it" ? "da" : "from"} ${money}` : money;
  return p.priceNote || t.shop.priceTbd;
}
