/** Dato mancante, reso visibile di proposito: [PREZZO], [EMAIL], … */
export function Token({ children, onInk = false }: { children: React.ReactNode; onInk?: boolean }) {
  return (
    <span
      className={`mono inline-block border border-dashed px-1 normal-case ${
        onInk ? "border-stone-dim text-stone" : "border-muted text-muted"
      }`}
    >
      {children}
    </span>
  );
}

export const isToken = (v: string) => v.startsWith("[") && v.endsWith("]");

/** Link che, finché l'URL è un token, punta a "#" e mostra il token. */
export function TokenLink({
  href,
  children,
  className = "",
  onInk = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onInk?: boolean;
}) {
  if (!isToken(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <a href="#" className={className} data-todo={href}>
      {children} <Token onInk={onInk}>{href}</Token>
    </a>
  );
}
