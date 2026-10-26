/** Parametri di campagna salvati al primo atterraggio della sessione e inviati con il modulo. */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type Attribution = Partial<Record<UtmKey | "landing_page" | "referrer", string>>;

const KEY = "alsil-attribution";

export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    const existing = sessionStorage.getItem(KEY);
    if (Object.keys(found).length > 0) {
      found.landing_page = window.location.pathname;
      if (document.referrer) found.referrer = document.referrer.slice(0, 300);
      sessionStorage.setItem(KEY, JSON.stringify(found));
    } else if (!existing) {
      const base: Attribution = { landing_page: window.location.pathname };
      if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
        base.referrer = document.referrer.slice(0, 300);
      }
      sessionStorage.setItem(KEY, JSON.stringify(base));
    }
  } catch {
    /* sessionStorage non disponibile */
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}
