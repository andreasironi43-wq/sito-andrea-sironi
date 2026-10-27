import Link from "next/link";
import ConversionPing from "@/components/ConversionPing";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Richiesta inviata",
  description: "Abbiamo ricevuto la vostra richiesta di preventivo.",
  path: "/contatti/grazie",
  noindex: true,
});

export default function GraziePage() {
  return (
    <section className="page-head" style={{ minHeight: "60vh" }}>
      <div className="narrow">
        <div className="rule" />
        <p className="eyebrow">Richiesta inviata</p>
        <h1>Grazie.<br /><em>Abbiamo ricevuto la richiesta.</em></h1>
        <p className="lead mt">
          I nostri tecnici la esaminano e vi ricontattano all&apos;indirizzo email o al numero che avete indicato.
        </p>
        <p className="lead mt">
          Per aggiungere informazioni o allegati scrivete a <a href={`mailto:${company.email}`}>{company.email}</a> o
          chiamate lo <a href={company.phoneHref}>{company.phone}</a>.
        </p>
        <div className="links"><Link href="/ciclo">Il ciclo in 19 fasi&nbsp;&rsaquo;</Link><Link href="/">Torna alla home&nbsp;&rsaquo;</Link></div>
        <ConversionPing />
      </div>
    </section>
  );
}
