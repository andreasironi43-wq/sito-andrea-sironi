/**
 * Validazione del modulo preventivo. Funzioni pure, usate sia dal browser sia dalla route API.
 */
import { UTM_KEYS } from "./utm";

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
/** Oltre questa soglia il browser carica l'allegato su Vercel Blob (limite body funzioni Vercel ~4,5 MB). */
export const INLINE_FILE_MAX_BYTES = 4 * 1024 * 1024;
export const ALLOWED_EXT = ["pdf", "dwg", "jpg", "jpeg"] as const;
export const ALLOWED_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/pjpeg",
  "application/acad",
  "application/x-acad",
  "application/autocad_dwg",
  "application/dwg",
  "application/x-dwg",
  "application/x-autocad",
  "image/vnd.dwg",
  "image/x-dwg",
  "drawing/dwg",
  "application/octet-stream",
  "", // alcuni browser non indicano il tipo per i .dwg
];
export const MIN_FILL_MS = 2500; // invii più rapidi di così sono quasi certamente bot

const LIMITS = {
  azienda: 120,
  nome: 120,
  email: 160,
  telefono: 40,
  materiale: 160,
  dimensioni: 200,
  quantita: 120,
  colore: 120,
  ambiente: 80,
  specifiche: 4000,
} as const;

export type QuoteFields = {
  azienda: string;
  nome: string;
  email: string;
  telefono: string;
  materiale: string;
  dimensioni: string;
  quantita: string;
  colore: string;
  ambiente: string;
  specifiche: string;
  privacy: boolean;
};

export type AttachmentMeta =
  | { kind: "inline"; name: string; size: number; type: string }
  | { kind: "url"; name: string; size: number; url: string };

export type Attribution = Record<string, string>;

export type QuoteInput = {
  fields: QuoteFields;
  attachment?: AttachmentMeta;
  attribution: Attribution;
};

export type FieldErrors = Partial<Record<keyof QuoteFields | "allegato", string>>;

export type ValidationResult =
  | { ok: true; spam: false; data: QuoteInput }
  | { ok: false; spam: true }
  | { ok: false; spam: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+()\d\s./-]{6,40}$/;

export function extOf(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name.trim());
  return m ? m[1].toLowerCase() : "";
}

export function validateFile(meta: { name: string; size: number; type?: string }): string | null {
  if (!meta.name || meta.size <= 0) return "Il file allegato è vuoto.";
  if (!(ALLOWED_EXT as readonly string[]).includes(extOf(meta.name))) return "Formato non ammesso: carica un file PDF, DWG o JPG.";
  if (meta.type !== undefined && !ALLOWED_MIME.includes(meta.type.toLowerCase())) return "Formato non ammesso: carica un file PDF, DWG o JPG.";
  if (meta.size > MAX_FILE_BYTES) return "Il file supera i 10 MB.";
  return null;
}

/** Solo URL di Vercel Blob generati dalla nostra route di upload. */
export function isAllowedBlobUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && /\.public\.blob\.vercel-storage\.com$/.test(u.hostname);
  } catch {
    return false;
  }
}

function str(v: FormDataEntryValue | null | undefined): string {
  return typeof v === "string" ? v.trim() : "";
}

export function parseAttribution(raw: string): Attribution {
  const allowed = new Set<string>([...UTM_KEYS, "landing_page", "referrer"]);
  const out: Attribution = {};
  try {
    const obj = JSON.parse(raw || "{}");
    if (obj && typeof obj === "object") {
      for (const [k, v] of Object.entries(obj)) {
        if (allowed.has(k) && typeof v === "string" && v) out[k] = v.slice(0, 300);
      }
    }
  } catch {
    /* attribuzione non valida: ignorata */
  }
  return out;
}

/**
 * Valida i dati del modulo.
 * `now` e il campo `t` (timestamp di rendering del modulo) servono per scartare gli invii automatici.
 */
export function validateQuote(fd: FormData, now = Date.now()): ValidationResult {
  // Honeypot: campo invisibile che un utente reale lascia vuoto.
  if (str(fd.get("website")) !== "") return { ok: false, spam: true };
  const t = Number(str(fd.get("t")));
  if (Number.isFinite(t) && t > 0 && now - t < MIN_FILL_MS) return { ok: false, spam: true };

  const fields: QuoteFields = {
    azienda: str(fd.get("azienda")),
    nome: str(fd.get("nome")),
    email: str(fd.get("email")),
    telefono: str(fd.get("telefono")),
    materiale: str(fd.get("materiale")),
    dimensioni: str(fd.get("dimensioni")),
    quantita: str(fd.get("quantita")),
    colore: str(fd.get("colore")),
    ambiente: str(fd.get("ambiente")),
    specifiche: str(fd.get("specifiche")),
    privacy: str(fd.get("privacy")) === "on" || str(fd.get("privacy")) === "true",
  };

  const errors: FieldErrors = {};
  const required: (keyof typeof LIMITS)[] = ["azienda", "nome", "email", "telefono", "materiale"];
  for (const k of required) if (!fields[k]) errors[k] = "Campo obbligatorio.";
  for (const [k, max] of Object.entries(LIMITS) as [keyof typeof LIMITS, number][]) {
    if (fields[k].length > max) errors[k] = `Massimo ${max} caratteri.`;
  }
  if (fields.email && !errors.email && !EMAIL_RE.test(fields.email)) errors.email = "Indirizzo email non valido.";
  if (fields.telefono && !errors.telefono && !PHONE_RE.test(fields.telefono)) errors.telefono = "Numero di telefono non valido.";
  if (!fields.privacy) errors.privacy = "Per inviare la richiesta serve il consenso al trattamento dei dati.";

  let attachment: AttachmentMeta | undefined;
  const file = fd.get("allegato");
  const blobUrl = str(fd.get("allegato_url"));
  if (file && typeof file === "object" && "size" in file && file.size > 0) {
    const err = validateFile({ name: file.name, size: file.size, type: file.type });
    if (err) errors.allegato = err;
    else attachment = { kind: "inline", name: file.name, size: file.size, type: file.type };
  } else if (blobUrl) {
    const name = str(fd.get("allegato_nome"));
    const size = Number(str(fd.get("allegato_dimensione")));
    if (!isAllowedBlobUrl(blobUrl)) errors.allegato = "Allegato non valido.";
    else {
      const err = validateFile({ name, size });
      if (err) errors.allegato = err;
      else attachment = { kind: "url", name, size, url: blobUrl };
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, spam: false, errors };
  return { ok: true, spam: false, data: { fields, attachment, attribution: parseAttribution(str(fd.get("attribution"))) } };
}
