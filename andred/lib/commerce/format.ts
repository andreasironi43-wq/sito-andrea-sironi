import type { Money } from "./types";

export function formatMoney(m: Money | null, locale: string): string | null {
  if (!m) return null;
  return new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: m.currencyCode,
    minimumFractionDigits: Number(m.amount) % 1 === 0 ? 0 : 2,
  }).format(Number(m.amount));
}
