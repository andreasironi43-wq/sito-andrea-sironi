/** Riga d'apertura di sezione: etichetta mono a sinistra, indice a destra. */
export default function SectionHead({
  label,
  index,
  onInk = false,
}: {
  label: string;
  index: string;
  onInk?: boolean;
}) {
  return (
    <div
      className={`grid-12 border-t py-3 ${onInk ? "border-stone-dim/40 text-stone-dim" : "border-ink text-muted"}`}
    >
      <p className="mono col-span-8">{label}</p>
      <p className="mono col-span-4 text-right">{index} / 06</p>
    </div>
  );
}
