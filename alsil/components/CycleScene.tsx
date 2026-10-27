import Link from "next/link";
import { ciclo, type Fase } from "@/lib/content";
import CycleSceneDriver from "./CycleSceneDriver";

/*
 * Scena a scroll "Il ciclo" della home.
 * Markup e SVG sono renderizzati sul server; CycleSceneDriver (client) imposta solo variabili CSS e disegna le particelle.
 * Senza JS o con prefers-reduced-motion la scena non è "pinned": le tre fasi sono in colonna e il pezzo è finito.
 */

type Step = { block: (typeof ciclo)[number]; fase: Fase; i: number };
const steps: Step[] = ciclo.flatMap((block) => block.fasi.map((fase) => ({ block, fase })) ).map((s, i) => ({ ...s, i }));

function faseLabel(f: Fase) {
  if (!f.n) return "";
  const [a, b] = f.n;
  const p = (n: number) => String(n).padStart(2, "0");
  return b ? `Fasi ${p(a)}–${p(b)}` : `Fase ${p(a)}`;
}

/* Geometria del pezzo (coordinate 0–300 × 0–400, inquadratura viewBox 24 0 252 372): staffa in pressofuso con quattro alette forate,
   nervature verticali e un boss centrale. Usata sia per il disegno sia come clipPath degli strati. */
const LUGS: [number, number][] = [[58, 104], [242, 104], [58, 316], [242, 316]];
const RIBS = [104, 150, 196];

function BodyShapes() {
  return (
    <>
      <rect x="64" y="62" width="172" height="296" rx="24" />
      {LUGS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="25" />)}
      <rect x="40" y="96" width="220" height="16" rx="8" />
      <rect x="40" y="308" width="220" height="16" rx="8" />
    </>
  );
}

function Piece() {
  return (
    <svg className="sc-svg" viewBox="24 0 252 372" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="sc-body"><BodyShapes /></clipPath>
        <linearGradient id="sc-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b6168" />
          <stop offset=".22" stopColor="#c7ccd2" />
          <stop offset=".42" stopColor="#868c94" />
          <stop offset=".6" stopColor="#dde1e5" />
          <stop offset=".8" stopColor="#6c727a" />
          <stop offset="1" stopColor="#3b4047" />
        </linearGradient>
        <linearGradient id="sc-rib" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#eef1f4" stopOpacity=".55" />
          <stop offset=".55" stopColor="#9aa0a7" stopOpacity=".2" />
          <stop offset="1" stopColor="#1b1e22" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id="sc-boss" cx=".38" cy=".34" r=".75">
          <stop offset="0" stopColor="#f2f4f6" />
          <stop offset=".45" stopColor="#9da3aa" />
          <stop offset="1" stopColor="#3f444a" />
        </radialGradient>
        <radialGradient id="sc-hole" cx=".5" cy=".42" r=".6">
          <stop offset="0" stopColor="#000" />
          <stop offset=".8" stopColor="#0b0c0e" />
          <stop offset="1" stopColor="#30343a" />
        </radialGradient>
        <linearGradient id="sc-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9ecff" stopOpacity="0" />
          <stop offset=".5" stopColor="#e6f3ff" stopOpacity=".5" />
          <stop offset="1" stopColor="#d9ecff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sc-iri" x1="0" y1="0" x2="1" y2=".3">
          <stop offset="0" stopColor="#7cc8ff" stopOpacity=".2" />
          <stop offset=".35" stopColor="#b79cff" stopOpacity=".16" />
          <stop offset=".65" stopColor="#ffd59a" stopOpacity=".14" />
          <stop offset="1" stopColor="#7fe0cc" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id="sc-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="sc-cure" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0c2f5c" />
          <stop offset=".35" stopColor="#1d5aa6" />
          <stop offset=".55" stopColor="#2c6fc2" />
          <stop offset=".8" stopColor="#174a8a" />
          <stop offset="1" stopColor="#0a2548" />
        </linearGradient>
        <linearGradient id="sc-gloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gancio del telaio: continua la linea aerea dell'hero */}
      <g className="sc-hanger">
        <line x1="150" y1="0" x2="150" y2="34" stroke="#8a8f96" strokeWidth="2" />
        <path d="M150 34 q0 16 -12 18" fill="none" stroke="#8a8f96" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <g className="sc-piece">
        {/* metallo grezzo */}
        <g fill="url(#sc-metal)"><BodyShapes /></g>
        <g clipPath="url(#sc-body)">
          <rect className="sc-bright" x="0" y="0" width="300" height="400" fill="url(#sc-front)" opacity="0" />
          {RIBS.map((x) => (
            <g key={x}>
              <rect x={x - 6} y="128" width="12" height="54" rx="6" fill="url(#sc-rib)" />
              <rect x={x - 6} y="238" width="12" height="54" rx="6" fill="url(#sc-rib)" />
            </g>
          ))}
          <rect x="88" y="203" width="124" height="14" rx="7" fill="url(#sc-rib)" />
        </g>
        <circle cx="150" cy="210" r="34" fill="url(#sc-boss)" />
        <circle cx="150" cy="210" r="34" fill="none" stroke="#1d2024" strokeOpacity=".5" />
        {/* spigoli raccordati */}
        <rect x="66" y="64" width="168" height="292" rx="22" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="2" />

        {/* 01 · sporco da pressofusione (oli, distaccanti) */}
        <g className="sc-grime" clipPath="url(#sc-body)">
          <rect x="0" y="0" width="300" height="400" fill="#3b352c" opacity=".55" />
          <ellipse cx="110" cy="150" rx="48" ry="26" fill="#2a251e" opacity=".55" />
          <ellipse cx="196" cy="282" rx="40" ry="30" fill="#2a251e" opacity=".5" />
          <ellipse cx="128" cy="330" rx="34" ry="14" fill="#4b4235" opacity=".6" />
          <ellipse cx="214" cy="120" rx="22" ry="12" fill="#4b4235" opacity=".5" />
        </g>
        {/* rame in superficie, asportato dalla disossidazione */}
        <g className="sc-copper" fill="#c07a3e">
          {[[96, 120], [182, 140], [120, 262], [206, 236], [90, 300], [170, 330], [212, 182], [108, 196], [160, 96], [196, 314], [132, 168], [224, 286]].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r={k % 3 === 0 ? 2.6 : 1.7} />
          ))}
        </g>

        {/* acqua: veli che scorrono e gocce */}
        <g className="sc-wet" clipPath="url(#sc-body)">
          <g className="sc-flow">
            {[0, 1].map((k) => (
              <g key={k} transform={`translate(0 ${k * 200})`}>
                <path d="M40 0 C90 30 70 70 120 100 S160 160 140 200 L190 200 C210 150 170 120 200 80 S240 30 230 0 Z" fill="url(#sc-water)" />
                <path d="M70 0 C80 40 110 60 100 110 S120 170 150 200 L162 200 C140 160 132 120 120 90 S96 40 96 0 Z" fill="#fff" opacity=".18" />
                <path d="M200 0 C190 50 230 80 220 130 S236 180 246 200 L262 200 C248 160 250 120 238 80 S226 30 222 0 Z" fill="#fff" opacity=".14" />
              </g>
            ))}
          </g>
        </g>
        <g className="sc-drops" fill="#e8f3ff">
          {[[92, 352, 3.2], [140, 359, 2.6], [176, 356, 3.6], [212, 350, 2.4], [62, 337, 2.2], [238, 338, 2.6], [150, 248, 2]].map(([x, y, r], k) => (
            <g key={k} className="sc-drop" style={{ transformOrigin: `${x}px ${y}px` }}>
              <ellipse cx={x} cy={y} rx={r} ry={r * 1.35} fillOpacity=".8" />
              <circle cx={x - r * 0.35} cy={y - r * 0.5} r={r * 0.3} fill="#fff" />
            </g>
          ))}
        </g>

        {/* passivazione al cromo trivalente: fronte che avanza e si lega alla superficie */}
        <g clipPath="url(#sc-body)">
          <g className="sc-passiv">
            <rect x="0" y="0" width="300" height="400" fill="url(#sc-iri)" />
            <rect className="sc-edge" x="0" y="392" width="300" height="8" fill="url(#sc-front)" />
          </g>
          <g className="sc-seal">
            <rect x="0" y="0" width="300" height="400" fill="#cfe2ff" opacity=".09" />
            <rect className="sc-edge" x="0" y="394" width="300" height="6" fill="url(#sc-front)" opacity=".7" />
          </g>
        </g>

        {/* polvere depositata (strato opaco) e film polimerizzato */}
        <g className="sc-powder" clipPath="url(#sc-body)"><rect width="300" height="400" fill="#2b5c98" /></g>
        <g className="sc-cure" clipPath="url(#sc-body)">
          <rect width="300" height="400" fill="url(#sc-cure)" />
        </g>
        {/* rilievo del pezzo sotto il rivestimento: nervature e boss restano leggibili */}
        <g className="sc-relief" clipPath="url(#sc-body)">
          {RIBS.map((x) => (
            <g key={x}>
              {[128, 238].map((y) => (
                <g key={y}>
                  <rect x={x - 6} y={y} width="12" height="54" rx="6" fill="#fff" opacity=".1" />
                  <rect x={x + 3} y={y + 3} width="3" height="50" rx="1.5" fill="#000" opacity=".28" />
                  <rect x={x - 6} y={y} width="2.5" height="54" rx="1.25" fill="#fff" opacity=".22" />
                </g>
              ))}
            </g>
          ))}
          <rect x="88" y="203" width="124" height="14" rx="7" fill="#fff" opacity=".08" />
          <rect x="88" y="214" width="124" height="3" rx="1.5" fill="#000" opacity=".25" />
          <circle cx="150" cy="210" r="34" fill="#fff" opacity=".08" />
          <path d="M120 196 A34 34 0 0 1 176 186" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="2" />
          <path d="M180 226 A34 34 0 0 1 130 238" fill="none" stroke="#000" strokeOpacity=".35" strokeWidth="2.5" />
          <rect x="66" y="64" width="168" height="292" rx="22" fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="2" />
        </g>
        <g clipPath="url(#sc-body)">
          <rect className="sc-gloss" x="-120" y="-40" width="90" height="480" fill="url(#sc-gloss)" transform="rotate(14 150 200)" />
        </g>

        {/* fori: sempre passanti, sopra ogni strato */}
        {LUGS.map(([x, y]) => <circle key={`h${x}-${y}`} cx={x} cy={y} r="10" fill="url(#sc-hole)" />)}
        <circle cx="150" cy="210" r="13" fill="url(#sc-hole)" />

        {/* controlli: quadrettatura (aderenza) e punto di misura dello spessore */}
        <g className="sc-check1" stroke="#e8eef6" strokeWidth=".9" strokeOpacity=".85">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <g key={k}>
              <line x1={92 + k * 6} y1="322" x2={92 + k * 6} y2="352" />
              <line x1="92" y1={322 + k * 6} x2="122" y2={322 + k * 6} />
            </g>
          ))}
        </g>
        <g className="sc-check2" fill="none" stroke="#e8eef6">
          <circle cx="206" cy="150" r="7" strokeOpacity=".9" />
          <circle cx="206" cy="150" r="2" fill="#e8eef6" />
        </g>
      </g>

      {/* cartellino del dossier di prodotto, appeso al gancio */}
      <g className="sc-tag">
        <path d="M150 40 L176 52" stroke="#8a8f96" strokeWidth="1" />
        <rect x="172" y="48" width="44" height="30" rx="3" fill="#e9ecef" />
        <rect x="178" y="55" width="26" height="2.4" rx="1" fill="#2f3337" />
        <rect x="178" y="61" width="32" height="2.4" rx="1" fill="#8a8f96" />
        <rect x="178" y="67" width="20" height="2.4" rx="1" fill="#8a8f96" />
      </g>
    </svg>
  );
}

export default function CycleScene() {
  const groups = ciclo.map((b) => ({ b, n: b.fasi.length }));
  return (
    <section id="ciclo" className="act" aria-labelledby="ciclo-title">
      <div className="act-head">
        <div className="wrap">
          <h2 id="ciclo-title">Diciannove fasi.<br /><em>Dal telaio ai controlli.</em></h2>
          <p className="lead mt" style={{ maxWidth: "60ch" }}>
            Sgrassaggio alcalino, disossidazione acida, passivazione al cromo trivalente e sigillatura, con risciacqui
            finali in acqua demineralizzata. Poi verniciatura, cottura e controlli.
          </p>
        </div>
      </div>

      <div className="act-track">
        <div className="act-sticky">
          <div className="act-grid">
            {/* Didascalie visive (decorative): il testo per screen reader è nell'elenco qui sotto */}
            <div className="act-copy" aria-hidden="true">
              <div className="act-meta">
                <span className="act-count">
                  {ciclo.map((b, k) => <span key={b.id} className="act-num" data-block={k}>{b.label}</span>)}
                </span>
                <span className="act-blocks">
                  {ciclo.map((b, k) => <span key={b.id} className="act-block" data-block={k}>{b.title}</span>)}
                </span>
              </div>
              <div className="act-caps">
                {steps.map((s) => (
                  <div key={s.i} className="act-cap" data-step={s.i}>
                    {faseLabel(s.fase) && <span className="k">{faseLabel(s.fase)}</span>}
                    <p className="act-title">{s.fase.title}</p>
                    {s.fase.detail && <p className="act-detail">{s.fase.detail}</p>}
                    {s.fase.params && <ul className="params">{s.fase.params.map((p) => <li key={p}>{p}</li>)}</ul>}
                  </div>
                ))}
              </div>
              <div className="act-ticks">
                {groups.map(({ b, n }, g) => (
                  <span key={b.id} className="act-tg">
                    {Array.from({ length: n }, (_, k) => {
                      const idx = groups.slice(0, g).reduce((a, x) => a + x.n, 0) + k;
                      return <i key={k} data-step={idx} />;
                    })}
                  </span>
                ))}
              </div>
            </div>

            <div className="act-stage">
              <div className="act-piece">
                <Piece />
                <canvas className="act-canvas" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Contenuto testuale completo, nell'ordine del ciclo. Visibile nella versione statica, sr-only nella scena animata. */}
        <ol className="act-list">
          {ciclo.map((b) => (
            <li key={b.id} className="act-phase">
              <h3><span className="act-phase-n">{b.label}</span> {b.title}</h3>
              <p className="muted">{b.intro}</p>
              <ol>
                {b.fasi.map((f) => (
                  <li key={f.title}>
                    {faseLabel(f) && <span className="k">{faseLabel(f)} </span>}
                    <strong>{f.title}</strong>
                    {f.detail && <> — {f.detail}</>}
                    {f.params && <> ({f.params.join(", ")})</>}
                  </li>
                ))}
              </ol>
              {b.facts && b.facts.map((x) => <p key={x} className="muted">{x}</p>)}
            </li>
          ))}
        </ol>
      </div>

      <div className="act-foot">
        <div className="wrap links"><Link href="/ciclo">Tutte le fasi&nbsp;&rsaquo;</Link></div>
      </div>
      <CycleSceneDriver counts={groups.map((g) => g.n)} />
    </section>
  );
}
