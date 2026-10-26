import type { QuoteInput } from "./quote";
import { company } from "./site";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const LABELS: [keyof QuoteInput["fields"], string][] = [
  ["azienda", "Azienda"],
  ["nome", "Nome e cognome"],
  ["email", "Email"],
  ["telefono", "Telefono"],
  ["materiale", "Materiale / lega"],
  ["dimensioni", "Dimensioni"],
  ["quantita", "Quantità annua"],
  ["colore", "Colore RAL / richiesto"],
  ["specifiche", "Specifiche da rispettare"],
];

export function buildQuoteEmail(input: QuoteInput) {
  const f = input.fields;
  const rows = LABELS.map(([k, label]) => [label, String(f[k] || "—")] as const);
  const attr = Object.entries(input.attribution);
  const fileLine = input.attachment
    ? `${input.attachment.name} (${(input.attachment.size / 1024 / 1024).toFixed(2)} MB)${input.attachment.kind === "url" ? ` – ${input.attachment.url}` : ""}`
    : "Nessuno";

  const text = [
    "Nuova richiesta di preventivo dal sito",
    "",
    ...rows.map(([l, v]) => `${l}: ${v}`),
    `Allegato: ${fileLine}`,
    "Consenso privacy: sì",
    "",
    "Provenienza:",
    ...(attr.length ? attr.map(([k, v]) => `  ${k}: ${v}`) : ["  diretta / non disponibile"]),
  ].join("\n");

  const tr = (l: string, v: string) =>
    `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;color:#4f555c;font-weight:600">${esc(l)}</th><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`;
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#15181c">
<h2 style="margin:0 0 12px">Nuova richiesta di preventivo</h2>
<table cellpadding="0" cellspacing="0">${rows.map(([l, v]) => tr(l, v)).join("")}${tr("Allegato", fileLine)}${tr("Consenso privacy", "sì")}</table>
<h3 style="margin:20px 0 6px;font-size:14px">Provenienza</h3>
<table cellpadding="0" cellspacing="0">${attr.length ? attr.map(([k, v]) => tr(k, v)).join("") : tr("origine", "diretta / non disponibile")}</table>
</div>`;

  return {
    subject: `Richiesta preventivo – ${f.azienda}`.slice(0, 150),
    text,
    html,
  };
}

export type SendArgs = { input: QuoteInput; file?: File };

/** Invia la richiesta con Resend. Chiave e indirizzi solo da variabili d'ambiente. */
export async function sendQuoteEmail({ input, file }: SendArgs): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY non configurata");
  const from = process.env.QUOTE_FROM_EMAIL || `Sito ${company.shortName} <onboarding@resend.dev>`;
  const to = (process.env.QUOTE_TO_EMAIL || company.email).split(",").map((s) => s.trim()).filter(Boolean);
  const { subject, text, html } = buildQuoteEmail(input);

  const attachments: { filename: string; content?: string; path?: string }[] = [];
  if (input.attachment?.kind === "inline" && file) {
    attachments.push({ filename: input.attachment.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") });
  } else if (input.attachment?.kind === "url") {
    attachments.push({ filename: input.attachment.name, path: input.attachment.url });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, reply_to: input.fields.email, subject, text, html, attachments: attachments.length ? attachments : undefined }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}
