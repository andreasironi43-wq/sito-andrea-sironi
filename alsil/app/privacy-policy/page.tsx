import Breadcrumb from "@/components/Breadcrumb";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Informativa sulla privacy",
  description: "Informativa sul trattamento dei dati personali raccolti dal sito di AL.SIL. S.r.l. ai sensi del Regolamento UE 2016/679.",
  path: "/privacy-policy",
});

// TESTO DA FAR VALIDARE AL CONSULENTE PRIVACY DI AL.SIL. PRIMA DELLA PUBBLICAZIONE.
export default function PrivacyPage() {
  return (
    <section className="hero">
      <div className="wrap prose">
        <Breadcrumb items={[{ name: "Privacy policy", path: "/privacy-policy" }]} />
        <h1>Informativa sulla privacy</h1>
        <p className="lead">Ai sensi degli articoli 13 e 14 del Regolamento UE 2016/679 (GDPR).</p>

        <h2>Titolare del trattamento</h2>
        <p>
          {company.name}, {company.street}, {company.postalCode} {company.city} ({company.province}). P.IVA {company.vat}.
          Email <a href={`mailto:${company.email}`}>{company.email}</a>, PEC {company.pec}.
        </p>

        <h2>Dati trattati</h2>
        <ul>
          <li>Dati inviati con il modulo di preventivo: azienda, nome, email, telefono, informazioni tecniche sul pezzo ed eventuale allegato.</li>
          <li>Parametri di provenienza della visita (ad esempio utm_source, utm_campaign, gclid, fbclid), inviati insieme al modulo.</li>
          <li>Dati di navigazione raccolti dai servizi di statistica e marketing, solo con il consenso espresso nel banner cookie.</li>
        </ul>

        <h2>Finalità e base giuridica</h2>
        <ul>
          <li>Rispondere alla richiesta di preventivo: misure precontrattuali su richiesta dell&apos;interessato (art. 6.1.b GDPR).</li>
          <li>Misurare le visite e l&apos;efficacia delle campagne: consenso (art. 6.1.a GDPR), revocabile in ogni momento dal link &quot;Preferenze cookie&quot; nel piè di pagina.</li>
        </ul>

        <h2>Conservazione</h2>
        <p>
          I dati delle richieste di preventivo sono conservati per il tempo necessario a gestire la richiesta e l&apos;eventuale
          rapporto commerciale. [Periodo da definire a cura del titolare.]
        </p>

        <h2>Destinatari e fornitori</h2>
        <p>
          I dati sono trattati da personale autorizzato e da fornitori che agiscono come responsabili del trattamento:
          hosting del sito (Vercel Inc.), invio delle email (Resend), archiviazione degli allegati (Vercel Blob) e, se
          autorizzati, servizi di statistica e marketing. Alcuni fornitori possono trattare dati fuori dall&apos;UE con le
          garanzie previste dagli articoli 44 e seguenti del GDPR.
        </p>

        <h2>Diritti</h2>
        <p>
          Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità e opposizione scrivendo a{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>. Puoi proporre reclamo al Garante per la protezione dei
          dati personali.
        </p>
      </div>
    </section>
  );
}
