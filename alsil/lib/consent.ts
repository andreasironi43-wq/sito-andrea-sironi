export type Consent = { statistiche: boolean; marketing: boolean; ts: number; v: 1 };

const KEY = "alsil-consent-v1";
export const CONSENT_EVENT = "alsil:consent";
export const OPEN_PREFS_EVENT = "alsil:open-cookie-prefs";

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    return c && c.v === 1 ? c : null;
  } catch {
    return null;
  }
}

export function saveConsent(statistiche: boolean, marketing: boolean): Consent {
  const c: Consent = { statistiche, marketing, ts: Date.now(), v: 1 };
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* storage non disponibile: il consenso vale solo per questa pagina */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  return c;
}
