/** Schema della stratigrafia del rivestimento (illustrativo, non in scala). */
export default function CoatingStack() {
  const layers = [
    { y: 40, h: 46, fill: "#0b4f8a", label: "Verniciatura a polvere", sub: "poliestere o epossidica", text: "#fff" },
    { y: 86, h: 30, fill: "#7fa7cc", label: "Primer o fondo anticorrosivo", sub: "su richiesta", text: "#15181c", dashed: true },
    { y: 116, h: 22, fill: "#c9d6e2", label: "Sigillatura", sub: "ambienti molto o poco aggressivi", text: "#15181c" },
    { y: 138, h: 18, fill: "#e8edf2", label: "Passivazione al cromo trivalente", sub: "", text: "#15181c" },
  ];
  return (
    <figure className="stack-figure">
      <svg viewBox="0 0 520 260" role="img" aria-labelledby="stack-t stack-d">
        <title id="stack-t">Stratigrafia del rivestimento su alluminio pressofuso</title>
        <desc id="stack-d">
          Dal basso: alluminio pressofuso, passivazione al cromo trivalente, sigillatura, primer o fondo anticorrosivo su
          richiesta, verniciatura a polvere.
        </desc>
        <rect x="0" y="0" width="520" height="260" fill="#ffffff" stroke="#d6d7d1" />
        {layers.map((l) => (
          <g key={l.label}>
            <rect x="24" y={l.y} width="472" height={l.h} fill={l.fill} stroke={l.dashed ? "#0b4f8a" : "none"} strokeDasharray={l.dashed ? "6 4" : undefined} />
            <text x="40" y={l.y + l.h / 2 + 5} fontSize="14" fontWeight="600" fill={l.text} fontFamily="system-ui, sans-serif">
              {l.label}
              {l.sub && (
                <tspan fontWeight="400" fontSize="12" dx="8">
                  {l.sub}
                </tspan>
              )}
            </text>
          </g>
        ))}
        <path d="M24 156 H496 V236 H24 Z" fill="#9aa0a6" />
        <path d="M24 156 H496 V236 H24 Z" fill="url(#hatch)" />
        <text x="40" y="202" fontSize="15" fontWeight="700" fill="#15181c" fontFamily="system-ui, sans-serif">
          Alluminio pressofuso
        </text>
        <defs>
          <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#b9bec3" strokeWidth="3" />
          </pattern>
        </defs>
      </svg>
      <figcaption>Schema illustrativo, non in scala. Il primer o fondo si applica solo su richiesta del cliente.</figcaption>
    </figure>
  );
}
