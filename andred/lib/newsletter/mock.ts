import type { NewsletterAdapter } from "./types";

/** Adapter di prova: registra la richiesta nei log del server, non invia nulla. */
export const mockAdapter: NewsletterAdapter = {
  name: "mock",
  async subscribe(sub) {
    const masked = sub.email.replace(/^(.).*(@.*)$/, "$1***$2");
    console.info("[newsletter:mock] iscrizione ricevuta", {
      email: masked,
      locale: sub.locale,
      consentAt: sub.consentAt,
    });
    return { ok: true };
  },
};
