// Disegni tecnici schematici (flat sketch). Non sono foto del prodotto:
// servono a dare forma alla scheda finché non arrivano gli scatti veri.

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function ShirtDrawing({ title }: { title: string }) {
  const buttons = [128, 178, 228, 278, 328, 378];
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={title} className="h-full w-full text-ink">
      <title>{title}</title>
      {/* corpo + maniche */}
      <path
        {...stroke}
        d="M170 70 L100 94 L46 300 L82 312 L116 178 L116 440 Q160 468 200 452 Q240 468 284 440 L284 178 L318 312 L354 300 L300 94 L230 70"
        fill="var(--color-paper)"
      />
      {/* polsini */}
      <path {...stroke} d="M52 278 L88 289 M348 278 L312 289" />
      {/* carré */}
      <path {...stroke} strokeDasharray="3 4" d="M108 124 Q200 138 292 124" />
      {/* colletto */}
      <path {...stroke} d="M170 70 Q200 58 230 70" />
      <path {...stroke} fill="var(--color-paper)" d="M170 70 L184 110 L200 90 L216 110 L230 70 Q200 80 170 70 Z" />
      {/* abbottonatura */}
      <path {...stroke} d="M193 92 L193 456 M207 92 L207 456" />
      {buttons.map((y, i) => (
        <circle
          key={y}
          cx="200"
          cy={y}
          r="3.2"
          fill={i === 0 ? "var(--color-signal)" : "none"}
          stroke={i === 0 ? "var(--color-signal)" : "currentColor"}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

function Drop({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -7 C3 -2 5 1 5 3.5 A5 5 0 0 1 -5 3.5 C-5 1 -3 -2 0 -7 Z"
      fill="var(--color-signal)"
    />
  );
}

export function HoodieDrawing({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={title} className="h-full w-full text-ink">
      <title>{title}</title>
      {/* corpo + maniche */}
      <path
        {...stroke}
        fill="var(--color-paper)"
        d="M144 116 L96 134 L44 382 L86 394 L120 222 L120 432 L280 432 L280 222 L314 394 L356 382 L304 134 L256 116"
      />
      {/* polsini e fondo a costine */}
      <path {...stroke} d="M48 364 L90 376 M352 364 L310 376" />
      <path {...stroke} fill="var(--color-paper)" d="M120 432 L120 458 L280 458 L280 432" />
      <path {...stroke} strokeDasharray="2 5" d="M120 445 L280 445" />
      {/* cappuccio */}
      <path {...stroke} fill="var(--color-paper)" d="M144 116 C112 4 288 4 256 116 Q200 136 144 116 Z" />
      <path {...stroke} d="M166 118 C156 44 244 44 234 118" />
      {/* gocce: cappuccio e spalle (posizione indicativa) */}
      <Drop x={176} y={36} />
      <Drop x={214} y={28} s={0.8} />
      <Drop x={246} y={64} s={0.9} />
      <Drop x={152} y={74} s={0.75} />
      <Drop x={118} y={150} s={0.85} />
      <Drop x={138} y={166} s={0.7} />
      <Drop x={282} y={150} s={0.85} />
      <Drop x={262} y={166} s={0.7} />
    </svg>
  );
}
