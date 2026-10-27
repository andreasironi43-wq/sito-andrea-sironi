import Breadcrumb from "@/components/Breadcrumb";
import MapEmbed from "@/components/MapEmbed";
import QuoteForm from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contatti e richiesta di preventivo",
  description:
    "AL.SIL. S.r.l., Via Torre snc, 24030 Medolago (BG). Tel. 035 901915. Inviate disegno, materiale, quantità e colore per un preventivo di verniciatura a polvere.",
  path: "/contatti",
});

export default function ContattiPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumb items={[{ name: "Contatti", path: "/contatti" }]} />
          <p className="eyebrow">Contatti</p>
          <h1>Mandateci il disegno.<br /><em>Valutiamo il ciclo.</em></h1>
          <p className="lead mt" style={{ maxWidth: "56ch" }}>
            Più dati ci date sul pezzo e sull&apos;ambiente in cui lavorerà, più preciso sarà il preventivo.
          </p>
          <div className="info">
            <div>
              <span className="k">Sede e stabilimento</span>
              <p className="v">{company.street}<br />{company.postalCode} {company.city} ({company.province})<br />Italia</p>
            </div>
            <div>
              <span className="k">Telefono</span>
              <p className="v"><a href={company.phoneHref}>{company.phone}</a></p>
            </div>
            <div>
              <span className="k">Email</span>
              <p className="v"><a href={`mailto:${company.email}`}>{company.email}</a><br />PEC <a href={`mailto:${company.pec}`}>{company.pec}</a></p>
            </div>
          </div>
        </div>
      </section>

      <section id="preventivo" className="band" aria-labelledby="preventivo-title">
        <div className="wrap">
          <h2 id="preventivo-title">Richiedi un preventivo</h2>
          <p className="lead mt" style={{ maxWidth: "60ch" }}>
            Disegno, lega, quantità annua, colore e ambiente di destinazione: con questi dati i tecnici propongono il ciclo.
          </p>
          <div style={{ maxWidth: 820 }}>
            <QuoteForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="dove-title">
        <div className="wrap">
          <h2 id="dove-title">Dove siamo</h2>
          <p className="lead mt">Medolago, provincia di Bergamo.</p>
          <MapEmbed />
          <div className="info">
            <div><span className="k">Ragione sociale</span><p className="v">{company.name}</p></div>
            <div><span className="k">P.IVA e C.F.</span><p className="v">{company.vat}</p></div>
            <div><span className="k">Fatturazione elettronica</span><p className="v">Codice destinatario {company.sdi}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
