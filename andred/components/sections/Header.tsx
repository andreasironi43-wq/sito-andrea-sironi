import type { Dictionary, Locale } from "@/lib/i18n";
import { prelaunch } from "@/lib/site";
import CartCount from "../CartCount";
import LangSwitch from "../LangSwitch";
import MobileMenu from "./MobileMenu";

export type NavItem = { href: string; label: string };

export function navItems(t: Dictionary, lang: Locale): NavItem[] {
  // Pre-lancio: solo la homepage; Journal e Archivio tornano quando hanno contenuti.
  if (prelaunch) {
    return [
      { href: `/${lang}#oggetti`, label: t.nav.objects },
      { href: `/${lang}#processo`, label: t.nav.process },
      { href: `/${lang}#about`, label: t.nav.about },
    ];
  }
  return [
    { href: `/${lang}/oggetti`, label: t.nav.objects },
    { href: `/${lang}#journal`, label: t.nav.journal },
    { href: `/${lang}#about`, label: t.nav.about },
    { href: `/${lang}/archivio`, label: t.nav.archive },
  ];
}

export default function Header({ lang, t }: { lang: Locale; t: Dictionary }) {
  const items = navItems(t, lang);
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <a
          href={`/${lang}`}
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
          <LangSwitch lang={lang} label={t.a11y.lang} className="hidden md:flex" />
          {prelaunch ? (
            <a
              href={`/${lang}#drop`}
              className="inline-flex h-11 items-center bg-ink px-3 text-sm font-bold uppercase text-paper hover:bg-signal md:px-4"
            >
              {t.nav.signup}
            </a>
          ) : (
            <a
              href={`/${lang}/carrello`}
              className="inline-flex h-11 items-center text-sm font-medium uppercase hover:text-signal"
            >
              {t.nav.cart}
              <span className="mono ml-1 text-signal">
                (<CartCount />)
              </span>
            </a>
          )}
          <MobileMenu items={items} lang={lang} t={t} />
        </div>
      </div>
    </header>
  );
}
