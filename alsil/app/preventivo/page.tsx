import Breadcrumb from "@/components/Breadcrumb";
import QuoteForm from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Richiedi un preventivo per la verniciatura a polvere",
  description:
    "Invia disegno, materiale, quantità annua, colore RAL e specifiche: i tecnici AL.SIL. valutano il ciclo di pretrattamento e verniciatura adatto al tuo pezzo.",
  path: "/preventivo",
});

export default function PreventivoPage() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <Breadcrumb items={[{ name: "Preventivo", path: "/preventivo" }]} />
          <h1>Richiedi un preventivo</h1>
          <p className="lead">
            Più dati ci dai sul pezzo e sull&apos;ambiente in cui lavorerà, più precisa sarà la proposta di ciclo.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap layout-form">
          <QuoteForm />
          <aside className="form-aside" aria-label="Altri contatti">
            <div className="card">
              <h2 style={{ fontSize: "1.1rem" }}>Preferisci parlarne?</h2>
              <p className="muted" style={{ marginBottom: 8 }}>Chiamaci o scrivici.</p>
              <p style={{ margin: 0 }}>
                Tel. <a href={company.phoneHref}>{company.phone}</a>
                <br />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
            </div>
            <div className="card">
              <h2 style={{ fontSize: "1.1rem" }}>Cosa serve per valutare</h2>
              <ul className="muted" style={{ margin: 0 }}>
                <li>Disegno o foto del pezzo</li>
                <li>Lega, se nota</li>
                <li>Quantità annua indicativa</li>
                <li>Colore e finitura</li>
                <li>Ambiente di destinazione</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
