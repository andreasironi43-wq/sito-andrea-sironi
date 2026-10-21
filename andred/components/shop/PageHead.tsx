/** Apertura delle pagine interne: etichetta mono, titolo grande, testo breve. */
export default function PageHead({
  label,
  title,
  intro,
  aside,
}: {
  label: string;
  title: string;
  intro?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="pt-6">
      <div className="grid-12 border-t border-ink py-3 text-muted">
        <p className="mono col-span-8">{label}</p>
        <div className="mono col-span-4 text-right">{aside}</div>
      </div>
      <div className="grid-12 mt-8 mb-10 gap-y-4 md:mt-12 md:mb-16">
        <h1 className="display col-span-12 text-[clamp(2.75rem,9.5vw,9.5rem)] [text-wrap:balance]">{title}</h1>
        {intro ? <p className="col-span-12 max-w-[40ch] text-lg leading-snug md:col-span-6">{intro}</p> : null}
      </div>
    </header>
  );
}
