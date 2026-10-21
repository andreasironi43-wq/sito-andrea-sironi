"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { NavItem } from "./Header";
import LangSwitch from "../LangSwitch";

export default function MobileMenu({ items, lang, t }: { items: NavItem[]; lang: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="mono inline-flex h-11 min-w-11 items-center justify-center border border-ink px-3"
      >
        <span className="sr-only">{open ? t.a11y.menuClose : t.a11y.menuOpen}</span>
        <span aria-hidden="true">{open ? "×" : "Menu"}</span>
      </button>

      <nav
        id="mobile-menu"
        aria-label={t.a11y.nav}
        hidden={!open}
        className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto border-t border-ink bg-paper"
      >
        <ul className="wrap">
          {items.map((it, i) => (
            <li key={it.href} className="border-b border-ink">
              <a
                href={it.href}
                onClick={() => setOpen(false)}
                className="display flex min-h-16 items-baseline justify-between py-4 text-[clamp(2.25rem,12vw,4rem)]"
              >
                {it.label}
                <span className="mono font-normal tracking-normal text-muted">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="wrap mt-4 flex items-center justify-between">
          <p className="mono text-muted">{t.a11y.lang}</p>
          <LangSwitch lang={lang} label={t.a11y.lang} />
        </div>
      </nav>
    </div>
  );
}
