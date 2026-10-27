"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoSvg from "./LogoSvg";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <nav className="nav" aria-label="Principale">
      <div className="nav-in">
        <Link href="/" className="wordmark" aria-label="AL.SIL. – home">
          <LogoSvg title="AL.SIL." />
        </Link>
        <ul id="menu" className={open ? "open" : undefined}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={current(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contatti#preventivo" className="quote">
              Preventivo&nbsp;&rsaquo;
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
