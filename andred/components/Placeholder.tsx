import Image from "next/image";

type Props = {
  /** Rapporto d'aspetto CSS, es. "3/2" o "4/5". Resta uguale quando arriva la foto vera. */
  ratio: string;
  /** Etichetta visibile: "Immagine da inserire". */
  label: string;
  /** Cosa andrà in questo riquadro (aiuta chi scatta e chi carica). */
  caption?: string;
  /** Quando c'è la foto: path in /public o URL. Il layout non cambia. */
  src?: string;
  alt?: string;
  sizes?: string;
  className?: string;
};

/**
 * Riquadro immagine. Senza `src` mostra un segnaposto con etichetta;
 * con `src` mostra la foto nello stesso spazio.
 */
export default function Placeholder({
  ratio,
  label,
  caption,
  src,
  alt = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: Props) {
  return (
    <figure
      className={`relative w-full overflow-hidden border border-stone bg-stone/25 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <>
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full text-stone"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          </svg>
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 p-3">
            <span className="mono bg-paper px-1.5 py-0.5 text-ink">
              {label}
              {caption ? <span className="text-muted"> — {caption}</span> : null}
            </span>
            <span className="mono bg-paper px-1.5 py-0.5 text-muted">{ratio.replace("/", ":")}</span>
          </figcaption>
        </>
      )}
    </figure>
  );
}
