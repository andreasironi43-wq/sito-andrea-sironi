import type { Dictionary } from "@/lib/i18n";
import Wordmark from "../Wordmark";

export default function Hero({ t }: { t: Dictionary }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="wrap flex min-h-[calc(100svh-3.5rem)] flex-col justify-between pt-4"
    >
      <div className="grid-12 mono text-muted">
        <p className="col-span-6">{t.hero.index}</p>
        <p className="col-span-6 text-right">{t.hero.domain}</p>
      </div>

      <ol className="mono my-10 grid-12 gap-y-1 text-muted" aria-label={t.objects.title}>
        {t.objects.items.map((o) => (
          <li key={o.id} className="col-span-12 md:col-span-4 md:col-start-9">
            <a href={`#${o.id}`} className="inline-flex min-h-11 w-full items-center justify-between border-b border-stone hover:text-signal">
              <span>{o.model.split(" ")[1]}</span>
              <span className="text-ink">{o.name}</span>
              <span>{o.model.split(" ")[0]}</span>
            </a>
          </li>
        ))}
      </ol>

      <div>
        <h1 id="hero-title" className="-ml-[0.04em] text-[clamp(3rem,calc((min(100vw,1600px)-2*var(--gutter))/3.85),26rem)]">
          <Wordmark animate />
        </h1>

        <div className="grid-12 mt-4 gap-y-6 border-t border-ink pt-4 pb-6 md:pb-8">
          <div className="col-span-12 md:col-span-7">
            <p className="mono flex items-center gap-2 text-muted">
              <span aria-hidden="true" className="inline-block size-2 bg-signal" />
              {t.hero.kicker}
            </p>
            <p className="mt-3 max-w-[18ch] text-[clamp(1.75rem,4.6vw,3.5rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em]">
              {t.hero.claim}
            </p>
          </div>
          <div className="col-span-12 flex items-end md:col-span-5 md:justify-end">
            <a href="#about" className="group inline-flex min-h-11 items-center gap-3">
              <span aria-hidden="true" className="scroll-line block h-10 w-px bg-stone" />
              <span className="mono group-hover:text-signal">{t.hero.scroll} ↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
