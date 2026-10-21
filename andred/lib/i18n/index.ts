import it, { type Dictionary } from "./it";
import en from "./en";

export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

const dictionaries: Record<Locale, Dictionary> = { it, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const SITE_URL = "https://andred.shop";

export type { Dictionary };
