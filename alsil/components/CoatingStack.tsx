/** Schema della stratigrafia del rivestimento (illustrativo, non in scala). */
const layers = [
  { h: 64, fill: "#0b4f8a", label: "Verniciatura a polvere", sub: "poliestere o epossidica", text: "#ffffff", sub2: "#d7e6f5" },
  { h: 48, fill: "#cfe0f0", label: "Primer o fondo anticorrosivo", sub: "su richiesta", text: "#15181c", sub2: "#3b4148", dashed: true },
  { h: 40, fill: "#e6edf4", label: "Sigillatura", sub: "ambienti molto o poco aggressivi", text: "#15181c", sub2: "#3b4148" },
  { h: 40, fill: "#f1f4f7", label: "Passivazione", sub: "cromo trivalente", text: "#15181c", sub2: "#3b4148" },
];

export default function CoatingStack() {
  let y = 20;
  return (
    <figure className="stack-figure">
      <svg viewBox="0 0 400 300" role="img" aria-labelledby="stack-t stack-d">
        <title id="stack-t">Stratigrafia del rivestimento su alluminio pressofuso</title>
        <desc id="stack-d">
          Dal basso: alluminio pressofuso, passivazione al cromo trivalente, sigillatura, primer o fondo anticorrosivo su
          richiesta, verniciatura a polvere.
        </desc>
        <defs>
          <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#b3b8bd" strokeWidth="3" />
          </pattern>
        </defs>
        <rect x="0.5" y="0.5" width="399" height="299" fill="#ffffff" stroke="#d6d7d1" />
        {layers.map((l) => {
          const top = y;
          y += l.h;
          return (
            <g key={l.label}>
              <rect x="20" y={top} width="360" height={l.h} fill={l.fill} stroke={l.dashed ? "#0b4f8a" : "#d6d7d1"} strokeDasharray={l.dashed ? "6 4" : undefined} />
              <text x="34" y={top + l.h / 2 - 2} fontSize="15" fontWeight="650" fill={l.text} fontFamily="system-ui, sans-serif">{l.label}</text>
              <text x="34" y={top + l.h / 2 + 14} fontSize="12" fill={l.sub2} fontFamily="system-ui, sans-serif">{l.sub}</text>
            </g>
          );
        })}
        <rect x="20" y={y} width="360" height={280 - y} fill="#9aa0a6" />
        <rect x="20" y={y} width="360" height={280 - y} fill="url(#hatch)" />
        <rect x="30" y={y + (280 - y) / 2 - 14} width="170" height="26" fill="#ffffff" opacity=".9" />
        <text x="38" y={y + (280 - y) / 2 + 4} fontSize="15" fontWeight="700" fill="#15181c" fontFamily="system-ui, sans-serif">Alluminio pressofuso</text>
      </svg>
      <figcaption>Schema illustrativo, non in scala. Il primer o fondo si applica solo su richiesta del cliente.</figcaption>
    </figure>
  );
}
