import { ciclo, type Fase } from "@/lib/content";
import Photo from "./Photo";
import type { FotoKey } from "@/lib/foto";

const FOTO: Record<string, FotoKey> = {
  pretrattamento: "gancio-telaio",
  applicazione: "applicazione-polvere",
  "cottura-controlli": "pezzi-finiti-rack",
};

function faseLabel(f: Fase) {
  if (!f.n) return null;
  const [a, b] = f.n;
  return b ? `Fasi ${a}–${b}` : `Fase ${a}`;
}

export default function Timeline() {
  return (
    <ol className="tl">
      {ciclo.map((b) => (
        <li key={b.id} className="tl-block" id={b.id}>
          <div className="tl-head rv">
            <span className="tl-num" aria-hidden="true">{b.label}</span>
            <div>
              <h2>{b.title}</h2>
              <p>{b.intro}</p>
            </div>
          </div>
          {FOTO[b.id] && <Photo name={FOTO[b.id]} className="photo tl-photo rv" sizes="(max-width: 760px) 100vw, 640px" />}
          <ol className="tl-steps">
            {b.fasi.map((f) => (
              <li key={f.title} className="tl-step rv">
                {faseLabel(f) && <span className="k">{faseLabel(f)}</span>}
                <h3>{f.title}</h3>
                {f.detail && <p>{f.detail}</p>}
                {f.params && (
                  <ul className="params" aria-label="Parametri">
                    {f.params.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          {b.facts && (
            <div className="tl-facts rv">
              {b.facts.map((f) => <p key={f}>{f}</p>)}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
