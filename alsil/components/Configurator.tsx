"use client";

import { useEffect, useState } from "react";
import { ambienti } from "@/lib/content";

/* Resa del disco in alluminio per ciascun ambiente (solo effetto visivo, come nel sito originale). */
const LOOK: Record<string, { noise: string; contrast: string; bright: string; sweep: string }> = {
  "poco-aggressivo": { noise: ".18", contrast: ".85", bright: "1", sweep: ".35" },
  marino: { noise: ".30", contrast: ".72", bright: ".94", sweep: ".20" },
  "terreno-cemento": { noise: ".52", contrast: ".66", bright: ".90", sweep: ".14" },
  "piscine-cloro": { noise: ".10", contrast: "1.05", bright: "1.04", sweep: ".62" },
};

export default function Configurator() {
  const [sel, setSel] = useState(ambienti[0].id);

  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (ambienti.some((a) => a.id === h)) {
        setSel(h);
        document.getElementById("configuratore")?.scrollIntoView({ block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const look = LOOK[sel];
  const style = { "--noise": look.noise, "--contrast": look.contrast, "--bright": look.bright, "--sweep": look.sweep } as React.CSSProperties;

  return (
    <div className="cols" id="configuratore" style={style}>
      <div className="stage" aria-hidden="true">
        <div className="glow" />
        <div className="disc"><div className="grain" /></div>
        <div className="bore" />
      </div>
      <div className="config">
        <div>
          <p className="caption" id="amb-label">Destinazione del pezzo</p>
          <div className="row" role="group" aria-labelledby="amb-label">
            {ambienti.map((a) => (
              <button key={a.id} type="button" className="chip" aria-pressed={sel === a.id} aria-controls={`spec-${a.id}`} onClick={() => setSel(a.id)}>
                {a.short}
              </button>
            ))}
          </div>
        </div>
        {ambienti.map((a) => (
          <div key={a.id} id={`spec-${a.id}`} className="spec" hidden={sel !== a.id} aria-live="polite">
            <span className="k">Ambiente</span>
            <h3 className="v" style={{ fontSize: 18 }}>{a.title}</h3>
            <p style={{ marginTop: 4 }}>{a.where}</p>
            <hr />
            <span className="k">Come cambia il ciclo</span>
            <ul>{a.ciclo.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        ))}
        <p className="note">Primer e fondi si applicano su richiesta del cliente. La scelta finale della polvere spetta ai nostri tecnici.</p>
      </div>
    </div>
  );
}
