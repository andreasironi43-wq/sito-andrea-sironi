"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { INLINE_FILE_MAX_BYTES, extOf, validateFile, validateQuote, type FieldErrors } from "@/lib/quote";
import { readAttribution } from "@/lib/utm";
import { company } from "@/lib/site";
import { ambienti } from "@/lib/content";

type Status = "idle" | "uploading" | "sending" | "error";

const DWG_TYPE = "application/acad";

function Field({
  id, label, required, hint, error, full, children,
}: { id: string; label: string; required?: boolean; hint?: string; error?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "field field-full" : "field"}>
      <label htmlFor={id}>
        {label} {required && <span className="req" aria-hidden="true">*</span>}
      </label>
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
      {children}
      {error && <span className="field-error" id={`${id}-err`}>{error}</span>}
    </div>
  );
}

export default function QuoteForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [renderedAt, setRenderedAt] = useState("");

  useEffect(() => setRenderedAt(String(Date.now())), []);

  const describedBy = (id: keyof FieldErrors, hint = false) =>
    [hint ? `${id}-hint` : "", errors[id] ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
  const inv = (id: keyof FieldErrors) => (errors[id] ? true : undefined);

  function fail(errs: FieldErrors, msg = "Controlla i campi evidenziati.") {
    setErrors(errs);
    setMessage(msg);
    setStatus("error");
    requestAnimationFrame(() => {
      const first = Object.keys(errs)[0];
      const el = first ? formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null;
      (el || alertRef.current)?.focus();
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "uploading" || status === "sending") return;
    const fd = new FormData(e.currentTarget);
    fd.set("attribution", JSON.stringify(readAttribution()));

    // Validazione lato browser con le stesse regole del server (senza il controllo sui tempi).
    fd.set("t", "");
    const pre = validateQuote(fd);
    fd.set("t", renderedAt);
    if (!pre.ok && !pre.spam) return fail(pre.errors);

    const file = fd.get("allegato");
    if (file instanceof File && file.size > INLINE_FILE_MAX_BYTES) {
      const err = validateFile({ name: file.name, size: file.size });
      if (err) return fail({ allegato: err });
      setStatus("uploading");
      try {
        const { upload } = await import("@vercel/blob/client");
        const blob = await upload(`preventivi/${file.name.replace(/[^\w.-]+/g, "_")}`, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          contentType: file.type || (extOf(file.name) === "dwg" ? DWG_TYPE : "application/octet-stream"),
        });
        fd.delete("allegato");
        fd.set("allegato_url", blob.url);
        fd.set("allegato_nome", file.name);
        fd.set("allegato_dimensione", String(file.size));
      } catch {
        return fail(
          { allegato: "Caricamento non riuscito." },
          `Non è stato possibile caricare l'allegato. Invia la richiesta senza file e manda il disegno a ${company.email}.`,
        );
      }
    } else if (file instanceof File && file.size === 0) {
      fd.delete("allegato");
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/preventivo", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors; message?: string };
      if (res.ok && json.ok) {
        try {
          sessionStorage.setItem("alsil-lead", "1");
        } catch {
          /* ignorato */
        }
        router.push("/contatti/grazie");
        return;
      }
      fail(json.errors || {}, json.message || "Controlla i campi evidenziati.");
    } catch {
      fail({}, `Invio non riuscito. Controlla la connessione o scrivi a ${company.email}.`);
    }
  }

  const busy = status === "uploading" || status === "sending";

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-describedby="form-note">
      <p id="form-note" className="form-note" style={{ gridColumn: "1/-1", fontSize: 13, color: "var(--muted)" }}>
        I campi con <span className="req">*</span> sono obbligatori.
      </p>

      {status === "error" && (
        <div ref={alertRef} className="formstate" role="alert" tabIndex={-1}>
          {message}
        </div>
      )}

      <fieldset>
        <legend>Chi sei</legend>
          <Field id="azienda" label="Azienda" required error={errors.azienda}>
            <input id="azienda" name="azienda" autoComplete="organization" required maxLength={120} aria-invalid={inv("azienda")} aria-describedby={describedBy("azienda")} />
          </Field>
          <Field id="nome" label="Nome e cognome" required error={errors.nome}>
            <input id="nome" name="nome" autoComplete="name" required maxLength={120} aria-invalid={inv("nome")} aria-describedby={describedBy("nome")} />
          </Field>
          <Field id="email" label="Email" required error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={160} aria-invalid={inv("email")} aria-describedby={describedBy("email")} />
          </Field>
          <Field id="telefono" label="Telefono" required error={errors.telefono}>
            <input id="telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" required maxLength={40} aria-invalid={inv("telefono")} aria-describedby={describedBy("telefono")} />
          </Field>
      </fieldset>

      <fieldset>
        <legend>Il pezzo</legend>
          <Field id="materiale" label="Materiale / lega" required hint="Es. alluminio pressofuso, lega se nota" error={errors.materiale}>
            <input id="materiale" name="materiale" required maxLength={160} aria-invalid={inv("materiale")} aria-describedby={describedBy("materiale", true)} />
          </Field>
          <Field id="dimensioni" label="Dimensioni" hint="Ingombro massimo, es. 400 × 250 × 80 mm" error={errors.dimensioni}>
            <input id="dimensioni" name="dimensioni" maxLength={200} aria-invalid={inv("dimensioni")} aria-describedby={describedBy("dimensioni", true)} />
          </Field>
          <Field id="quantita" label="Quantità annua" hint="Numero di pezzi all'anno, anche indicativo" error={errors.quantita}>
            <input id="quantita" name="quantita" maxLength={120} aria-invalid={inv("quantita")} aria-describedby={describedBy("quantita", true)} />
          </Field>
          <Field id="colore" label="Colore RAL / richiesto" hint="Es. RAL 9005 opaco" error={errors.colore}>
            <input id="colore" name="colore" maxLength={120} aria-invalid={inv("colore")} aria-describedby={describedBy("colore", true)} />
          </Field>
        <Field id="ambiente" label="Ambiente di destinazione" hint="Dove lavorerà il pezzo" error={errors.ambiente}>
          <select id="ambiente" name="ambiente" defaultValue="" aria-invalid={inv("ambiente")} aria-describedby={describedBy("ambiente", true)}>
            <option value="">Da indicare</option>
            {ambienti.map((a) => <option key={a.id} value={a.title}>{a.title}</option>)}
            <option value="Altro / da valutare">Altro / da valutare</option>
          </select>
        </Field>
        <Field id="specifiche" full label="Specifiche da rispettare" hint="Capitolato, norme, spessori, finitura" error={errors.specifiche}>
          <textarea id="specifiche" name="specifiche" maxLength={4000} aria-invalid={inv("specifiche")} aria-describedby={describedBy("specifiche", true)} />
        </Field>
        <Field id="allegato" full label="Disegno" hint="PDF, DWG o JPG, massimo 10 MB" error={errors.allegato}>
          <input id="allegato" name="allegato" type="file" accept=".pdf,.dwg,.jpg,.jpeg,application/pdf,image/jpeg" aria-invalid={inv("allegato")} aria-describedby={describedBy("allegato", true)} />
        </Field>
      </fieldset>

      {/* Honeypot: nascosto agli utenti e alle tecnologie assistive */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Sito web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="t" value={renderedAt} />

      <div className="field field-full">
        <div className="consent">
          <input id="privacy" name="privacy" type="checkbox" required aria-invalid={inv("privacy")} aria-describedby={describedBy("privacy")} />
          <label htmlFor="privacy">
            Ho letto l&apos;<Link href="/privacy" target="_blank">informativa sulla privacy</Link> e acconsento al
            trattamento dei dati per ricevere il preventivo. <span className="req" aria-hidden="true">*</span>
          </label>
        </div>
        {errors.privacy && <span className="field-error" id="privacy-err">{errors.privacy}</span>}
      </div>

      <div className="actions">
        <button type="submit" className="btn" disabled={busy} aria-disabled={busy}>
          {status === "uploading" ? "Caricamento allegato…" : status === "sending" ? "Invio in corso…" : "Invia la richiesta"}
        </button>
        <small>Disegni oltre 10 MB potete inviarli a <a href={`mailto:${company.email}`}>{company.email}</a>.</small>
        <p className="sr-only" aria-live="polite">
          {status === "uploading" ? "Caricamento allegato in corso" : status === "sending" ? "Invio in corso" : ""}
        </p>
      </div>
    </form>
  );
}
