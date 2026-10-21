import type { Dictionary } from "@/lib/i18n";
import SectionHead from "../SectionHead";
import Placeholder from "../Placeholder";

export default function Process({ t }: { t: Dictionary }) {
  return (
    <section id="processo" aria-labelledby="processo-title" className="wrap pb-24 md:pb-36">
      <SectionHead label={t.process.label} index="03" />
      <div className="grid-12 mt-10 mb-10 gap-y-4 md:mt-16 md:mb-16">
        <h2 id="processo-title" className="display col-span-12 text-[clamp(2.75rem,9.5vw,9.5rem)] md:col-span-8">
          {t.process.title}
        </h2>
        <p className="col-span-12 self-end text-lg leading-snug md:col-span-4">{t.process.intro}</p>
      </div>

      <ol className="border-t border-ink">
        {t.process.steps.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={s.n} className="grid-12 reveal gap-y-6 border-b border-ink py-8 md:items-center md:py-12">
              <div
                className={`min-w-0 col-span-12 md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}
              >
                <Placeholder
                  ratio="3/2"
                  label={t.a11y.placeholder}
                  caption={s.image}
                  src={s.src || undefined}
                  alt={s.alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div
                className={`min-w-0 col-span-12 md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}
              >
                <p className="mono text-signal">{s.n} / 05</p>
                <h3 className="display mt-3 text-[clamp(2rem,10vw,3.5rem)] md:text-[clamp(2rem,4.5vw,5rem)]">{s.title}</h3>
                <p className="mt-5 max-w-[38ch] text-lg leading-snug">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
