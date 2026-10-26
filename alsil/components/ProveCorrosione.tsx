import { features, proveCorrosione, type ProvaCorrosione } from "@/config/features";

const fmt = (d: string) => new Date(d).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });

/**
 * Blocco "Prove di corrosione". Non viene mostrato finché:
 * 1) features.proveCorrosione è true, e 2) esiste almeno un rapporto compilato in config/features.ts.
 */
export default function ProveCorrosione({ items = proveCorrosione, enabled = features.proveCorrosione }: { items?: ProvaCorrosione[]; enabled?: boolean }) {
  if (!enabled || items.length === 0) return null;
  return (
    <section className="section section-alt" aria-labelledby="prove-corrosione-title">
      <div className="wrap">
        <p className="eyebrow">Rapporti di prova</p>
        <h2 id="prove-corrosione-title">Prove di corrosione</h2>
        <div className="table-scroll">
          <table className="proof-table">
            <thead>
              <tr>
                <th scope="col">Prova</th>
                <th scope="col">Durata</th>
                <th scope="col">Norma</th>
                <th scope="col">Laboratorio</th>
                <th scope="col">Data</th>
                <th scope="col">Esito</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={`${p.norma}-${p.data}-${p.ore}`}>
                  <td>{p.tipoProva}{p.ciclo && <><br /><span className="muted">{p.ciclo}</span></>}</td>
                  <td className="mono">{p.ore} h</td>
                  <td>{p.norma}</td>
                  <td>{p.laboratorio}</td>
                  <td className="mono">{fmt(p.data)}</td>
                  <td>
                    {p.esito}
                    {p.rapportoUrl && <><br /><a href={p.rapportoUrl}>Scarica il rapporto (PDF)</a></>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
