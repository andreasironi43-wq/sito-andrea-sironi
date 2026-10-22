const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Riga d'apertura di sezione: etichetta mono a sinistra, indice a destra.
 * Il numero viene dalla posizione reale della sezione nella pagina, non dal testo.
 */
export default function SectionHead({
  label,
  n,
  total,
  onInk = false,
}: {
  label: string;
  n: number;
  total: number;
  onInk?: boolean;
}) {
  const text = label.replace(/^\d+\s*—\s*/, "");
  return (
    <div
      className={`grid-12 border-t py-3 ${onInk ? "border-stone-dim/40 text-stone-dim" : "border-ink text-muted"}`}
    >
      <p className="mono col-span-8">
        {pad(n)} — {text}
      </p>
      <p className="mono col-span-4 text-right">
        {pad(n)} / {pad(total)}
      </p>
    </div>
  );
}
