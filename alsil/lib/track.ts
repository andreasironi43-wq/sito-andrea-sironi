/* Eventi di analytics. Non fanno nulla se gli script non sono stati caricati (nessun consenso). */
type Win = Window & {
  plausible?: (name: string, opts?: { props?: Record<string, string> }) => void;
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

export type EventName = "Click telefono" | "Click email" | "Preventivo inviato";

const GA4_NAMES: Record<EventName, string> = {
  "Click telefono": "click_phone",
  "Click email": "click_email",
  "Preventivo inviato": "generate_lead",
};

export function track(name: EventName, props: Record<string, string> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as Win;
  w.plausible?.(name, { props });
  w.gtag?.("event", GA4_NAMES[name], props);

  if (name === "Preventivo inviato") {
    w.fbq?.("track", "Lead");
    const adsConversion = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION;
    if (adsConversion) w.gtag?.("event", "conversion", { send_to: adsConversion });
  }
}
