import type { Dictionary, Locale } from "@/lib/i18n";
import SectionHead from "../SectionHead";

export default function Editions({ t, lang }: { t: Dictionary; lang: Locale }) {
  const e = t.editions;
  return (
    <section id="edizioni" aria-labelledby="edizioni-title" className="on-ink bg-ink text-paper">
      <div className="wrap pt-6 pb-24 md:pb-36">
        <SectionHead label={e.label} index="04" onInk />

        <div className="grid-12 mt-8 items-end gap-y-6 md:mt-12">
          <p
            className="display col-span-12 text-[clamp(10rem,56vw,46rem)] md:text-[clamp(10rem,43vw,40rem)] leading-[0.78] tracking-[-0.07em] md:col-span-9"
            aria-describedby="edizioni-caption"
          >
            {e.number}
          </p>
          <div id="edizioni-caption" className="col-span-12 md:col-span-3 md:pb-6">
            <p className="mono text-stone">{e.numberCaption}</p>
            <p className="mono mt-2 inline-flex items-center gap-2 border border-signal-light px-2 py-1 text-signal-light">
              <span aria-hidden="true" className="inline-block size-1.5 bg-signal-light" />
              {e.status}
            </p>
          </div>
        </div>

        <div className="grid-12 mt-16 gap-y-8 border-t border-stone-dim/40 pt-8 md:mt-24">
          <h2 id="edizioni-title" className="display col-span-12 text-[clamp(2.5rem,7vw,7rem)] md:col-span-7">
            {e.title}
          </h2>
          <p className="col-span-12 self-end text-lg leading-snug text-stone md:col-span-4 md:col-start-9">
            {e.body}
          </p>
        </div>

        <ol className="mt-10 grid border-t border-stone-dim/40 sm:grid-cols-2 lg:grid-cols-4">
          {e.checks.map(([k, v], i) => (
            <li
              key={k}
              className="reveal border-b border-stone-dim/40 py-5 sm:odd:border-r sm:odd:pr-[var(--gutter)] sm:even:pl-[var(--gutter)] lg:border-r lg:px-[var(--gutter)] lg:first:pl-0 lg:last:border-r-0"
            >
              <p className="mono text-stone-dim">0{i + 1}</p>
              <h3 className="mt-3 text-2xl font-bold uppercase tracking-[-0.03em]">{k}</h3>
              <p className="mt-2 leading-snug text-stone">{v}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 overflow-x-auto md:mt-24">
          <table className="w-full border-collapse text-left">
            <caption className="mono pb-4 text-left text-stone-dim">{e.compareCaption}</caption>
            <thead>
              <tr className="mono border-b border-paper">
                <th scope="col" className="w-[30%] py-3 pr-3 font-normal text-stone-dim">
                  <span className="sr-only">—</span>
                </th>
                <th scope="col" className="py-3 pr-3 font-normal text-signal-light">
                  {e.compareHead[1]}
                </th>
                <th scope="col" className="py-3 font-normal text-stone-dim">
                  {e.compareHead[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {e.compare.map(([k, a, b]) => (
                <tr key={k} className="border-b border-stone-dim/40 align-top">
                  <th scope="row" className="mono py-4 pr-3 font-normal text-stone-dim">
                    {k}
                  </th>
                  <td className="py-4 pr-3 text-base leading-snug font-medium md:text-2xl md:tracking-[-0.02em]">{a}</td>
                  <td className="py-4 text-base leading-snug text-stone-dim line-through decoration-1 md:text-2xl md:tracking-[-0.02em]">
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-12 mt-16 gap-y-2 border-t border-stone-dim/40 pt-4 md:mt-24">
          <h3 className="mono col-span-12 text-stone-dim md:col-span-3">{e.archiveLabel}</h3>
          <p className="col-span-12 text-lg md:col-span-9">
            <a href={`/${lang}/archivio`} className="underline underline-offset-4 hover:text-signal-light">
              {e.archiveBody}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
