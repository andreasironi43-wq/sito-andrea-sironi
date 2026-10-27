/** Dati aziendali verificati (Manuale della Qualità, op. 05, rev. 19.02.24). Unica fonte. */
export const company = {
  name: "AL.SIL. S.r.l.",
  shortName: "AL.SIL.",
  street: "Via Torre snc",
  postalCode: "24030",
  city: "Medolago",
  province: "BG",
  region: "Lombardia",
  country: "IT",
  phone: "035 901915",
  phoneHref: "tel:+39035901915",
  phoneE164: "+39 035 901915",
  email: "amministrazione@alsil.it",
  pec: "mail@pec.alsil.it",
  vat: "02772120966",
  sdi: "T04ZHR3",
  // Fax: escluso finché non è confermato (vedi docs/claims-da-confermare.md).
} as const;

export function siteUrl(): string {
  const raw = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/ciclo", label: "Ciclo" },
  { href: "/per-ambiente", label: "Per ambiente" },
  { href: "/azienda", label: "Azienda" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
] as const;
