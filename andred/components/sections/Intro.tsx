import type { Dictionary } from "@/lib/i18n";
import SectionHead from "../SectionHead";

export default function Intro({ t, n, total }: { t: Dictionary; n: number; total: number }) {
  return (
    <section id="about" aria-labelledby="about-title" className="wrap pt-16 pb-24 md:pt-24 md:pb-36">
      <SectionHead label={t.intro.label} n={n} total={total} />
      <div className="grid-12 mt-10 gap-y-10 md:mt-16">
        <h2
          id="about-title"
          className="reveal display col-span-12 text-[clamp(2.75rem,9.5vw,9.5rem)] lg:col-span-11"
        >
          {t.intro.title}
        </h2>

        <p className="mono col-span-12 flex items-start gap-2 text-muted md:col-span-3">
          <span aria-hidden="true" className="mt-1 inline-block size-2 shrink-0 bg-signal" />
          {t.intro.statement}
        </p>
        <div className="col-span-12 grid gap-6 md:col-span-9 md:grid-cols-3 md:gap-x-[var(--gutter)]">
          {t.intro.body.map((p, i) => (
            <p key={i} className="reveal border-t border-stone pt-3 text-lg leading-snug md:text-xl">
              <span className="mono mb-3 block text-muted">0{i + 1}</span>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
