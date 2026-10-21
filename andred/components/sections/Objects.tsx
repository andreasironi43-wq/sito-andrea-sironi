import type { Dictionary, Locale } from "@/lib/i18n";
import SectionHead from "../SectionHead";
import { HoodieDrawing, ShirtDrawing } from "../Drawings";

export default function Objects({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section id="oggetti" aria-labelledby="oggetti-title" className="wrap pb-24 md:pb-36">
      <SectionHead label={t.objects.label} index="02" />
      <div className="grid-12 mt-10 mb-10 gap-y-4 md:mt-16 md:mb-16">
        <h2 id="oggetti-title" className="display col-span-12 text-[clamp(2.75rem,9.5vw,9.5rem)] md:col-span-8">
          {t.objects.title}
        </h2>
        <p className="mono col-span-12 self-end text-muted md:col-span-4 md:text-right">{t.objects.note}</p>
      </div>

      <div className="grid border-t border-ink md:grid-cols-2">
        {t.objects.items.map((o, idx) => (
          <article
            key={o.id}
            id={o.id}
            aria-labelledby={`${o.id}-title`}
            className={`object-card reveal flex flex-col border-b border-ink py-6 md:py-8 ${
              idx === 0 ? "md:border-r md:pr-[var(--gutter)]" : "md:pl-[var(--gutter)]"
            }`}
          >
            <header className="flex items-baseline justify-between gap-4">
              <h3 id={`${o.id}-title`} className="display text-[clamp(3rem,10vw,8.5rem)]">
                <a href={`/${lang}/oggetti/${o.id}-${o.model.split(" ")[1]}`} className="hover:text-signal">
                  {o.name}
                </a>
              </h3>
              <p className="mono shrink-0 text-right text-muted">{o.model}</p>
            </header>

            <div className="relative mt-6 aspect-[4/5] overflow-hidden border border-stone">
              <div className="object-drawing absolute inset-[8%]">
                {o.drawing === "shirt" ? (
                  <ShirtDrawing title={o.drawingAlt} />
                ) : (
                  <HoodieDrawing title={o.drawingAlt} />
                )}
              </div>
              <p aria-hidden="true" className="mono absolute top-3 left-3 text-muted">
                Fig. {o.model.split(" ")[1]}
              </p>
              <p aria-hidden="true" className="mono absolute top-3 right-3 text-muted">
                {o.model.split(" ")[0]}
              </p>
            </div>

            <dl className="mt-6 border-t border-ink">
              {o.specs.map(([k, v]) => (
                <div key={k} className="mono grid grid-cols-[minmax(6.5rem,35%)_1fr] gap-4 border-b border-stone py-2.5">
                  <dt className="text-muted">{k}</dt>
                  <dd className={v.startsWith("Da definire") || v.startsWith("To be defined") ? "text-muted italic" : ""}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            {o.footnote ? <p className="mono mt-3 text-muted">{o.footnote}</p> : null}

            <a href="#drop" className="group mt-auto inline-flex min-h-11 items-center justify-between gap-4 pt-6">
              <span className="text-lg font-medium uppercase tracking-[-0.02em] group-hover:text-signal">
                {t.objects.cta}
                <span className="sr-only"> — {o.name}</span>
              </span>
              <span aria-hidden="true" className="relative block h-px flex-1 bg-stone">
                <span className="object-tick absolute inset-0 bg-signal" />
              </span>
              <span aria-hidden="true" className="group-hover:text-signal">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
