import { NextResponse } from "next/server";
import { MAX_FILE_BYTES, validateQuote } from "@/lib/quote";
import { sendQuoteEmail } from "@/lib/mailer";

export const runtime = "nodejs";

/** Margine per i campi di testo oltre all'allegato. */
const MAX_BODY_BYTES = MAX_FILE_BYTES + 512 * 1024;

// Limite di frequenza minimale per istanza (best effort, la difesa principale è l'honeypot).
const hits = new Map<string, number[]>();
function rateLimited(ip: string, now = Date.now()) {
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > 8;
}

export async function POST(req: Request) {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, errors: { allegato: "Il file supera i 10 MB." } }, { status: 413 });
  }
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Troppe richieste. Riprova tra qualche minuto." }, { status: 429 });
  }

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Richiesta non valida." }, { status: 400 });
  }

  const result = validateQuote(fd);
  // Agli invii automatici rispondiamo come a un invio riuscito, senza inviare nulla.
  if (result.spam) return NextResponse.json({ ok: true });
  if (!result.ok) return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });

  const file = result.data.attachment?.kind === "inline" ? (fd.get("allegato") as File) : undefined;
  try {
    await sendQuoteEmail({ input: result.data, file });
  } catch (err) {
    console.error("[preventivo] invio fallito:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { ok: false, message: "Invio non riuscito. Riprova o scrivi ad amministrazione@alsil.it." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
