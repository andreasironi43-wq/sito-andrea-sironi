"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";

const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const META = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION?.split("/")[0];

type W = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  plausible?: ((...args: unknown[]) => void) & { q?: unknown[] };
  fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; callMethod?: (...a: unknown[]) => void; loaded?: boolean; version?: string; push?: unknown };
  _fbq?: unknown;
};

const loaded = new Set<string>();

function addScript(src: string, attrs: Record<string, string> = {}) {
  if (loaded.has(src)) return;
  loaded.add(src);
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

function ensureGtag(id: string, config: Record<string, unknown> = {}) {
  const w = window as W;
  if (!w.gtag) {
    w.dataLayer = w.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag("js", new Date());
  }
  if (loaded.has("cfg:" + id)) return;
  loaded.add("cfg:" + id);
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
  w.gtag("config", id, config);
}

function apply(c: Consent | null) {
  if (!c) return;
  const w = window as W;
  if (c.statistiche) {
    if (PLAUSIBLE) {
      w.plausible = w.plausible || Object.assign((...a: unknown[]) => { (w.plausible!.q = w.plausible!.q || []).push(a); }, {});
      addScript("https://plausible.io/js/script.tagged-events.outbound-links.js", { "data-domain": PLAUSIBLE, defer: "" });
    } else if (GA4) {
      ensureGtag(GA4, { anonymize_ip: true });
    }
  }
  if (c.marketing) {
    if (ADS) ensureGtag(ADS);
    if (META && !w.fbq) {
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue.push(args);
      } as ((...a: unknown[]) => void) & { queue: unknown[]; callMethod?: (...a: unknown[]) => void; loaded: boolean; version: string; push: unknown };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.push = fbq;
      w.fbq = fbq;
      w._fbq = fbq;
      addScript("https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", META);
      fbq("track", "PageView");
    }
  }
}

/** Carica analytics e pixel solo dopo il consenso registrato nel banner. */
export default function Analytics() {
  useEffect(() => {
    apply(readConsent());
    const on = (e: Event) => apply((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, on);
    return () => window.removeEventListener(CONSENT_EVENT, on);
  }, []);
  return null;
}
