import { certificazioni, features, type Certificazione } from "@/config/features";

/** Blocco "Prove e certificazioni": spento finché il flag è false o l'elenco è vuoto. */
export default function ProveCertificazioni({ items = certificazioni, enabled = features.proveCertificazioni }: { items?: Certificazione[]; enabled?: boolean }) {
  if (!enabled || items.length === 0) return null;
  return (
    <section className="band" aria-labelledby="certificazioni-title">
      <div className="wrap">
        <p className="eyebrow">Documenti</p>
        <h2 id="certificazioni-title">Prove e certificazioni</h2>
        <ul className="cards">
          {items.map((c) => (
            <li key={c.nome} className="card">
              <div className="txt">
                <span className="k">{c.ente}</span>
                <h3>{c.nome}</h3>
                <p>
                  {c.numero && <>N. {c.numero}<br /></>}
                  {c.scadenza && <>Scadenza {new Date(c.scadenza).toLocaleDateString("it-IT")}</>}
                </p>
                {c.documentoUrl && <p style={{ marginTop: 10 }}><a href={c.documentoUrl}>Vedi il documento&nbsp;&rsaquo;</a></p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
