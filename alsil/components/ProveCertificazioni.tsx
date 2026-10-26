import { certificazioni, features, type Certificazione } from "@/config/features";

/** Blocco "Prove e certificazioni": spento finché il flag è false o l'elenco è vuoto. */
export default function ProveCertificazioni({ items = certificazioni, enabled = features.proveCertificazioni }: { items?: Certificazione[]; enabled?: boolean }) {
  if (!enabled || items.length === 0) return null;
  return (
    <section className="section" aria-labelledby="certificazioni-title">
      <div className="wrap">
        <p className="eyebrow">Documenti</p>
        <h2 id="certificazioni-title">Prove e certificazioni</h2>
        <ul className="grid-3" style={{ listStyle: "none", padding: 0 }}>
          {items.map((c) => (
            <li key={c.nome} className="card">
              <h3>{c.nome}</h3>
              <p className="muted">
                Ente: {c.ente}
                {c.numero && <><br />N. {c.numero}</>}
                {c.scadenza && <><br />Scadenza: {new Date(c.scadenza).toLocaleDateString("it-IT")}</>}
              </p>
              {c.documentoUrl && <a href={c.documentoUrl}>Vedi il documento</a>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
