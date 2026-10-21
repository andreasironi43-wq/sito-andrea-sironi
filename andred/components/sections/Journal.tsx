import type { Dictionary } from "@/lib/i18n";
import SectionHead from "../SectionHead";

export default function Journal({ t }: { t: Dictionary }) {
  const j = t.journal;
  return (
    <section id="journal" aria-labelledby="journal-title" className="wrap pt-6 pb-24 md:pb-36">
      <SectionHead label={j.label} index="05" />
      <h2 id="journal-title" className="display mt-10 mb-10 text-[clamp(2.75rem,9.5vw,9.5rem)] md:mt-16 md:mb-16">
        {j.title}
      </h2>

      {/* Nessun articolo pubblicato: le righe non sono link finché non esistono. */}
      <ol className="border-t border-ink">
        {j.entries.map((e) => (
          <li key={e.n} className="journal-row reveal relative border-b border-ink">
            <article className="grid-12 items-baseline gap-y-2 py-5 md:py-7">
              <p className="mono col-span-6 text-muted md:col-span-1">{e.n}</p>
              <p className="mono col-span-6 text-right text-muted md:order-3 md:col-span-2 md:text-left">{e.tag}</p>
              <h3 className="col-span-12 text-[clamp(1.75rem,5.2vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.04em] uppercase md:order-2 md:col-span-7">
                {e.title}
              </h3>
              <p className="mono col-span-12 flex items-center gap-2 md:order-4 md:col-span-2 md:justify-end">
                <span aria-hidden="true" className="inline-block size-1.5 bg-signal" />
                {j.status}
              </p>
            </article>
            <span aria-hidden="true" className="journal-line absolute inset-x-0 -bottom-px h-px bg-signal" />
          </li>
        ))}
      </ol>
    </section>
  );
}
