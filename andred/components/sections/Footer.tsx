import type { Dictionary, Locale } from "@/lib/i18n";
import Wordmark from "../Wordmark";
import { Token } from "../Token";
import LangSwitch from "../LangSwitch";

export default function Footer({ t, lang }: { t: Dictionary; lang: Locale }) {
  const f = t.footer;
  const year = new Date().getFullYear();
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="wrap pt-6">
        <div className="grid-12 gap-y-10 border-t border-stone-dim/40 pt-6 pb-16 md:pb-24">
          <nav aria-label={f.legalTitle} className="col-span-12 sm:col-span-6 lg:col-span-3">
            <h2 className="mono text-stone-dim">{f.legalTitle}</h2>
            <ul className="mt-3">
              {f.links.map(([label, slug]) => (
                <li key={label}>
                  <a href={`/${lang}/${slug}`} className="inline-flex min-h-11 items-center hover:text-signal-light">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <h2 className="mono text-stone-dim">{f.contactTitle}</h2>
            <p className="mt-3 flex min-h-11 items-center">
              <Token onInk>{f.email}</Token>
            </p>
            <p className="mt-1 text-stone">{f.shipping}</p>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <h2 className="mono text-stone-dim">ANDRED</h2>
            <p className="mt-3 flex min-h-11 items-center">
              <Token onInk>{f.company}</Token>
            </p>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-2 lg:text-right">
            <h2 className="mono text-stone-dim">{t.a11y.lang}</h2>
            <LangSwitch lang={lang} label={t.a11y.lang} onInk className="mt-3 -ml-1 text-paper lg:justify-end" />
          </div>
        </div>

        <p aria-hidden="true" className="-ml-[0.04em] text-[clamp(3rem,calc((min(100vw,1600px)-2*var(--gutter))/3.85),26rem)] text-paper">
          <Wordmark />
        </p>

        <div className="mono flex flex-wrap justify-between gap-2 border-t border-stone-dim/40 py-4 text-stone-dim">
          <p>
            © {year} ANDRED. {f.rights}
          </p>
          <p>Familiar forms. Different perspective.</p>
        </div>
      </div>
    </footer>
  );
}
