"use client";

import { useId, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { TokenLink } from "../Token";

type Errors = { email?: string; consent?: string };
type State = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function SignupForm({ t, lang }: { t: Dictionary["signup"]; lang: Locale }) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>("idle");
  const [status, setStatus] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  function check(email: string, consent: boolean): Errors {
    const e: Errors = {};
    if (!email) e.email = t.errors.emailRequired;
    else if (!EMAIL_RE.test(email)) e.email = t.errors.emailInvalid;
    if (!consent) e.consent = t.errors.consentRequired;
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (state === "sending") return;
    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const consent = form.get("consent") === "on";
    const found = check(email, consent);
    setErrors(found);

    if (found.email || found.consent) {
      setState("error");
      setStatus([found.email, found.consent].filter(Boolean).join(" "));
      (found.email ? emailRef : consentRef).current?.focus();
      return;
    }

    setState("sending");
    setStatus(t.sending);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, consent, locale: lang, website: form.get("website") ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const server: Errors = {};
        if (data.errors?.email) server.email = data.errors.email === "required" ? t.errors.emailRequired : t.errors.emailInvalid;
        if (data.errors?.consent) server.consent = t.errors.consentRequired;
        setErrors(server);
        setState("error");
        setStatus(server.email || server.consent ? [server.email, server.consent].filter(Boolean).join(" ") : t.errors.generic);
        return;
      }
      setState("success");
      setStatus(t.success);
    } catch {
      setState("error");
      setStatus(t.errors.generic);
    }
  }

  const emailErr = `${id}-email-error`;
  const consentErr = `${id}-consent-error`;

  return (
    <div>
      {/* Regione annunciata ai lettori di schermo: errori, invio, successo. */}
      <p
        role="status"
        aria-live="polite"
        className={`mono mb-6 min-h-[1.5em] ${state === "success" ? "text-ink" : state === "error" ? "text-[#b3261e]" : "text-muted"}`}
      >
        {state === "success" ? (
          <span className="inline-flex items-center gap-2 border border-signal px-2 py-1 text-signal">
            <span aria-hidden="true" className="inline-block size-1.5 bg-signal" />
            {status}
          </span>
        ) : (
          status
        )}
      </p>

      {state !== "success" && (
        <form action="/api/subscribe" method="post" noValidate onSubmit={onSubmit} className="grid gap-6">
          <input type="hidden" name="locale" value={lang} />
          <div aria-hidden="true" className="sr-only">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div>
            <label htmlFor={`${id}-email`} className="mono block text-muted">
              {t.emailLabel}
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                ref={emailRef}
                id={`${id}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                required
                placeholder={t.emailPlaceholder}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? emailErr : undefined}
                onChange={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
                className={`h-14 w-full min-w-0 border-0 sm:flex-1 border-b-2 bg-transparent px-0 text-xl outline-none placeholder:text-muted/70 focus-visible:border-signal focus-visible:outline-none md:text-2xl ${
                  errors.email ? "border-[#b3261e]" : "border-ink"
                }`}
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="h-14 shrink-0 bg-ink px-8 text-base font-bold tracking-[-0.01em] text-paper uppercase hover:bg-signal disabled:opacity-60"
              >
                {state === "sending" ? t.sending : t.submit}
              </button>
            </div>
            {errors.email ? (
              <p id={emailErr} className="mono mt-2 text-[#b3261e]">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-snug">
              <input
                ref={consentRef}
                type="checkbox"
                name="consent"
                required
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? consentErr : undefined}
                onChange={() => errors.consent && setErrors((e) => ({ ...e, consent: undefined }))}
                className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none border border-ink bg-paper checked:border-signal checked:bg-signal checked:[background-image:url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2020%2020%22><path%20d=%22M5%2010.5l3%203%207-7%22%20fill=%22none%22%20stroke=%22%23f4f5f1%22%20stroke-width=%222%22/></svg>')]"
              />
              <span>
                {t.consentPre}
                <TokenLink href={t.consentHref} className="underline underline-offset-2 hover:text-signal">
                  {t.consentLink}
                </TokenLink>
                {t.consentPost}
              </span>
            </label>
            {errors.consent ? (
              <p id={consentErr} className="mono mt-2 text-[#b3261e]">
                {errors.consent}
              </p>
            ) : null}
          </div>
          <p className="mono text-muted">{t.note}</p>
        </form>
      )}
    </div>
  );
}
