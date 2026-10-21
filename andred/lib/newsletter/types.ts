export type Subscription = {
  email: string;
  locale: string;
  /** Momento in cui è stato dato il consenso (ISO 8601). Da conservare come prova GDPR. */
  consentAt: string;
  /** Testo del consenso mostrato all'utente, per tracciabilità. */
  consentText: string;
};

export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "provider_error" };

/** Contratto che ogni servizio newsletter deve rispettare. */
export interface NewsletterAdapter {
  name: string;
  subscribe(sub: Subscription): Promise<SubscribeResult>;
}
