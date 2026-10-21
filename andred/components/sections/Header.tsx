import type { Dictionary, Locale } from "@/lib/i18n";
import MobileMenu from "./MobileMenu";

export type NavItem = { href: string; label: string };

export function navItems(t: Dictionary): NavItem[] {
  return [
    { href: "#oggetti", label: t.nav.objects },
    { href: "#journal", label: t.nav.journal },
    { href: "#about", label: t.nav.about },
    { href: "#archivio", label: t.nav.archive },
  ];
}

export function LangSwitch({ lang, t, className = "" }: { lang: Locale; t: Dictionary; className?: string }) {
  return (
    <ul aria-label={t.a11y.lang} className={`mono flex ${className}`}>
      {(["it", "en"] as const).map((l) => (
        <li key={l}>
          <a
            href={`/${l}`}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "page" : undefined}
            className={`inline-flex h-11 min-w-11 items-center justify-center px-1 ${
              l === lang ? "text-signal underline underline-offset-4" : "hover:text-signal"
            }`}
          >
            {l.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Header({ lang, t }: { lang: Locale; t: Dictionary }) {
  const items = navItems(t);
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <a
          href="#top"
          className="inline-flex h-11 items-center text-[1.0625rem] font-bold uppercase tracking-[-0.03em]"
        >
          ANDRED
        </a>

        <nav aria-label={t.a11y.nav} className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-4">
            {items.map((it) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  className="inline-flex h-11 items-center px-2 text-sm font-medium uppercase tracking-[-0.01em] hover:text-signal"
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <LangSwitch lang={lang} t={t} className="hidden md:flex" />
          {/* Carrello non ancora collegato a un e-commerce: stato informativo. */}
          <p className="inline-flex h-11 items-center text-sm font-medium uppercase" aria-label={t.a11y.cartLabel}>
            <span aria-hidden="true">
              {t.nav.cart}
              <span className="mono ml-1 text-signal">(0)</span>
            </span>
          </p>
          <MobileMenu items={items} lang={lang} t={t} />
        </div>
      </div>
    </header>
  );
}
