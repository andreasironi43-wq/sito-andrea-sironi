"use client";

import { useActionState, useEffect, useState } from "react";
import { addToCart, type AddState } from "@/lib/commerce/actions";
import type { Variant } from "@/lib/commerce";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function AddToCart({
  variants,
  available,
  t,
  lang,
}: {
  variants: Variant[];
  available: boolean;
  t: Dictionary["shop"];
  lang: Locale;
}) {
  const [state, action, pending] = useActionState<AddState, FormData>(addToCart, { status: "idle" });
  const single = variants.length === 1;
  const [chosen, setChosen] = useState(single ? variants[0].id : "");

  useEffect(() => {
    if (state.status === "ok") window.dispatchEvent(new Event("cart:changed"));
  }, [state]);

  const message =
    state.status === "ok" ? t.added : state.status === "error" ? t.errors[state.code ?? "generic"] : "";

  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="lang" value={lang} />
      {single ? (
        <input type="hidden" name="variantId" value={variants[0].id} />
      ) : null}

      <fieldset>
        <legend className="mono text-muted">{t.size}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {variants.map((v) => {
            const label = v.options.map((o) => o.value).join(" / ") || v.title;
            // Barrata solo se il drop è aperto e quella taglia è finita.
            const soldOut = available && !v.available;
            return (
              <label
                key={v.id}
                className={`mono relative inline-flex min-h-11 min-w-14 items-center justify-center border px-3 ${
                  !soldOut && v.available
                    ? chosen === v.id
                      ? "border-ink bg-ink text-paper"
                      : "cursor-pointer border-ink hover:border-signal hover:text-signal"
                    : soldOut
                      ? "border-stone text-muted line-through"
                      : "border-stone text-muted"
                } has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal`}
              >
                <input
                  type="radio"
                  name={single ? undefined : "variantId"}
                  value={v.id}
                  disabled={!v.available || single}
                  checked={chosen === v.id}
                  onChange={() => setChosen(v.id)}
                  className="sr-only"
                />
                {label}
                {soldOut ? <span className="sr-only"> — {t.soldOut}</span> : null}
                {v.available && v.quantityAvailable !== null ? (
                  <span className="ml-2 text-muted">
                    {v.quantityAvailable} {t.left}
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
      </fieldset>

      {available ? (
        <button
          type="submit"
          disabled={pending}
          className="h-14 w-full bg-ink px-8 text-base font-bold tracking-[-0.01em] text-paper uppercase hover:bg-signal disabled:opacity-60"
        >
          {pending ? t.adding : t.add}
        </button>
      ) : (
        <div className="grid gap-3">
          <a
            href={`/${lang}#drop`}
            className="inline-flex h-14 items-center justify-center border border-ink px-8 text-base font-bold uppercase hover:border-signal hover:text-signal"
          >
            {t.notify}
          </a>
        </div>
      )}

      <p role="status" aria-live="polite" className="mono min-h-[1.5em]">
        {state.status === "ok" ? (
          <span className="inline-flex flex-wrap items-center gap-3 text-signal">
            <span aria-hidden="true" className="inline-block size-1.5 bg-signal" />
            {message}
            <a href={`/${lang}/carrello`} className="inline-flex min-h-11 items-center text-ink underline underline-offset-4">
              {t.viewCart}
            </a>
          </span>
        ) : (
          <span className="text-[#b3261e]">{message}</span>
        )}
      </p>
    </form>
  );
}
