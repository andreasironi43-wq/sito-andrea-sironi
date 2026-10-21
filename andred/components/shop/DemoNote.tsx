/** Avviso visibile finché il negozio gira sul catalogo di prova. */
export default function DemoNote({ text }: { text: string }) {
  return (
    <p className="mono mb-10 inline-flex items-center gap-2 border border-dashed border-muted px-2 py-1 text-muted">
      <span aria-hidden="true" className="inline-block size-1.5 bg-muted" />
      {text}
    </p>
  );
}
