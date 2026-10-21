/**
 * Wordmark ANDRED: firma tipografica, non un logo.
 * Le lettere sono separate solo per l'animazione; i lettori di schermo leggono "ANDRED".
 */
export default function Wordmark({
  animate = false,
  className = "",
}: {
  animate?: boolean;
  className?: string;
}) {
  const letters = "ANDRED".split("");
  return (
    <span className={`display block whitespace-nowrap ${className}`}>
      <span className="sr-only">ANDRED</span>
      <span aria-hidden="true">
        {letters.map((l, i) => (
          <span
            key={i}
            className={animate ? "wm-letter" : "inline-block"}
            style={animate ? ({ "--i": i } as React.CSSProperties) : undefined}
          >
            {l}
          </span>
        ))}
      </span>
    </span>
  );
}
