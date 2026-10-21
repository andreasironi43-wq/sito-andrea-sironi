import { NextResponse } from "next/server";
import { EMAIL_RE, getNewsletterAdapter } from "@/lib/newsletter";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

type FieldErrors = { email?: "required" | "invalid"; consent?: "required" };

type Payload = { email: string; consent: boolean; locale: Locale; website: string };

async function readPayload(req: Request): Promise<{ data: Payload; isForm: boolean }> {
  const type = req.headers.get("content-type") ?? "";
  let raw: Record<string, unknown> = {};
  const isForm = type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data");
  if (type.includes("application/json")) {
    raw = await req.json().catch(() => ({}));
  } else if (isForm) {
    raw = Object.fromEntries((await req.formData()).entries());
  }
  const locale = String(raw.locale ?? "it");
  return {
    isForm,
    data: {
      email: String(raw.email ?? "").trim().toLowerCase(),
      consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
      locale: isLocale(locale) ? locale : "it",
      website: String(raw.website ?? ""), // honeypot: gli umani lo lasciano vuoto
    },
  };
}

function validate({ email, consent }: Payload): FieldErrors {
  const errors: FieldErrors = {};
  if (!email) errors.email = "required";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "invalid";
  if (!consent) errors.consent = "required";
  return errors;
}

/** Risposta per l'invio senza JavaScript: una pagina minima, poi si torna al sito. */
function htmlResponse(locale: Locale, ok: boolean, status: number) {
  const t = getDictionary(locale).signup;
  const msg = ok ? t.success : t.errors.generic;
  const back = locale === "it" ? "Torna al sito" : "Back to the site";
  const body = `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>ANDRED</title><body style="font:16px system-ui;background:#f4f5f1;color:#14171a;padding:24px"><p>${msg}</p><p><a href="/${locale}#drop">${back}</a></p></body></html>`;
  return new NextResponse(body, { status, headers: { "content-type": "text/html; charset=utf-8" } });
}

export async function POST(req: Request) {
  const { data, isForm } = await readPayload(req);

  if (data.website) {
    // Bot: rispondiamo come se fosse andata bene, senza registrare nulla.
    return isForm ? htmlResponse(data.locale, true, 200) : NextResponse.json({ ok: true });
  }

  const errors = validate(data);
  if (Object.keys(errors).length) {
    return isForm ? htmlResponse(data.locale, false, 400) : NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const t = getDictionary(data.locale).signup;
  const result = await getNewsletterAdapter().subscribe({
    email: data.email,
    locale: data.locale,
    consentAt: new Date().toISOString(),
    consentText: `${t.consentPre}${t.consentLink}${t.consentPost}`,
  });

  if (!result.ok) {
    return isForm ? htmlResponse(data.locale, false, 502) : NextResponse.json({ ok: false }, { status: 502 });
  }
  return isForm ? htmlResponse(data.locale, true, 200) : NextResponse.json({ ok: true });
}
