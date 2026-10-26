import Link from "next/link";
import ConversionPing from "@/components/ConversionPing";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Richiesta inviata",
  description: "Abbiamo ricevuto la tua richiesta di preventivo.",
  path: "/preventivo/grazie",
  noindex: true,
});

export default function GraziePage() {
  return (
    <section className="hero">
      <div className="wrap prose">
        <p className="eyebrow">Richiesta inviata</p>
        <h1>Grazie, abbiamo ricevuto la tua richiesta</h1>
        <p className="lead">
          I nostri tecnici la esaminano e ti ricontattano all&apos;indirizzo email o al numero che hai indicato.
        </p>
        <p>
          Per aggiungere informazioni o allegati scrivi a <a href={`mailto:${company.email}`}>{company.email}</a> o chiama
          il <a href={company.phoneHref}>{company.phone}</a>.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link href="/ciclo" className="btn btn-ghost btn-arrow">Scopri il ciclo in 19 fasi</Link>
        </p>
        <ConversionPing />
      </div>
    </section>
  );
}
