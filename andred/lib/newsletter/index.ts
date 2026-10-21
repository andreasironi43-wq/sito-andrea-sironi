import { mockAdapter } from "./mock";
import type { NewsletterAdapter } from "./types";

// Per collegare un servizio reale: crea un file accanto a mock.ts che
// implementa NewsletterAdapter, aggiungilo qui e imposta NEWSLETTER_PROVIDER.
const adapters: Record<string, NewsletterAdapter> = {
  mock: mockAdapter,
};

export function getNewsletterAdapter(): NewsletterAdapter {
  const key = process.env.NEWSLETTER_PROVIDER ?? "mock";
  return adapters[key] ?? mockAdapter;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type { NewsletterAdapter, Subscription, SubscribeResult } from "./types";
