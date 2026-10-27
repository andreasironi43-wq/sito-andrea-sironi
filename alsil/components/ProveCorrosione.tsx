import { features, proveCorrosione, type ProvaCorrosione } from "@/config/features";
import Image from "next/image";

const fmt = (d: string) => new Date(d).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });

/**
 * Blocco "Prove di corrosione". Non viene mostrato finché:
 * 1) features.proveCorrosione è true, e 2) esiste almeno un rapporto compilato in config/features.ts.
 */
export default function ProveCorrosione({ items = proveCorrosione, enabled = features.proveCorrosione }: { items?: ProvaCorrosione[]; enabled?: boolean }) {
  if (!enabled || items.length === 0) return null;
  const top = [...items].sort((a, b) => b.ore - a.ore)[0];
  return (
    <>
      <div className="full">
        <div className="photo"><Image src="/img/slot/camera-prova.svg" alt="Illustrazione: provini in camera di prova" fill unoptimized style={{ objectFit: "cover" }} /></div>
        <div className="scrim" />
        <div className="txt">
          <div className="rule" />
          <p className="eyebrow">{top.tipoProva} · {top.norma}</p>
          <h2>{top.ore.toLocaleString("it-IT")} ore in camera di prova.</h2>
          <p>{top.esito} Rapporto {top.laboratorio}, {fmt(top.data)}.</p>
        </div>
      </div>
      <section aria-labelledby="prove-corrosione-title">
        <div className="wrap">
          <p className="eyebrow">Rapporti di prova</p>
          <h2 id="prove-corrosione-title">Prove di corrosione</h2>
          <div className="table-scroll">
            <table className="proof-table">
              <thead>
                <tr><th scope="col">Prova</th><th scope="col">Durata</th><th scope="col">Norma</th><th scope="col">Laboratorio</th><th scope="col">Data</th><th scope="col">Esito</th></tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={`${p.norma}-${p.data}-${p.ore}`}>
                    <td>{p.tipoProva}{p.ciclo && <><br /><span className="muted">{p.ciclo}</span></>}</td>
                    <td>{p.ore} h</td>
                    <td>{p.norma}</td>
                    <td>{p.laboratorio}</td>
                    <td>{fmt(p.data)}</td>
                    <td>{p.esito}{p.rapportoUrl && <><br /><a href={p.rapportoUrl}>Scarica il rapporto (PDF)&nbsp;&rsaquo;</a></>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
