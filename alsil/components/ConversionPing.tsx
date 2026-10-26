"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";
import { readConsent } from "@/lib/consent";

/** Registra la conversione una sola volta, solo dopo un invio reale del modulo. */
export default function ConversionPing() {
  useEffect(() => {
    let flagged = false;
    try {
      flagged = sessionStorage.getItem("alsil-lead") === "1";
      if (flagged) sessionStorage.removeItem("alsil-lead");
    } catch {
      /* ignorato */
    }
    if (!flagged) return;
    const c = readConsent();
    if (!c?.statistiche && !c?.marketing) return;
    // Gli script sono asincroni: attendiamo che siano disponibili.
    let tries = 0;
    const id = setInterval(() => {
      const w = window as Window & { plausible?: unknown; gtag?: unknown; fbq?: unknown };
      if (w.plausible || w.gtag || w.fbq || ++tries > 20) {
        clearInterval(id);
        track("Preventivo inviato", { page: "/preventivo/grazie" });
      }
    }, 250);
    return () => clearInterval(id);
  }, []);
  return null;
}
