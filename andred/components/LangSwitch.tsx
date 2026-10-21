"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

/** IT / EN che resta sulla stessa pagina (/it/oggetti ↔ /en/oggetti). */
export default function LangSwitch({
  lang,
  label,
  className = "",
  onInk = false,
}: {
  lang: Locale;
  label: string;
  className?: string;
  onInk?: boolean;
}) {
  const path = usePathname() ?? `/${lang}`;
  const rest = path.replace(/^\/(it|en)(?=\/|$)/, "");
  // Su fondo scuro il blu segnale non passa AA: si usa la variante chiara.
  const active = onInk ? "text-signal-light" : "text-signal";
  const hover = onInk ? "hover:text-signal-light" : "hover:text-signal";
  return (
    <ul aria-label={label} className={`mono flex ${className}`}>
      {(["it", "en"] as const).map((l) => (
        <li key={l}>
          <a
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "page" : undefined}
            className={`inline-flex h-11 min-w-11 items-center justify-center px-1 ${
              l === lang ? `${active} underline underline-offset-4` : hover
            }`}
          >
            {l.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
  );
}
