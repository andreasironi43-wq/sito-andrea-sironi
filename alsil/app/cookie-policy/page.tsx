import Breadcrumb from "@/components/Breadcrumb";
import CookiePrefsButton from "@/components/CookiePrefsButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie policy",
  description: "Cookie e strumenti di tracciamento usati dal sito di AL.SIL. S.r.l. e come gestire il consenso.",
  path: "/cookie-policy",
});

// TESTO DA FAR VALIDARE AL CONSULENTE PRIVACY DI AL.SIL. PRIMA DELLA PUBBLICAZIONE.
export default function CookiePage() {
  return (
    <section className="hero">
      <div className="wrap prose">
        <Breadcrumb items={[{ name: "Cookie policy", path: "/cookie-policy" }]} />
        <h1>Cookie policy</h1>
        <p className="lead">Quali strumenti usa il sito e come gestire le tue scelte.</p>

        <h2>Strumenti tecnici (sempre attivi)</h2>
        <ul>
          <li><strong>alsil-consent-v1</strong> (memoria locale del browser): ricorda le tue scelte sui cookie.</li>
          <li><strong>alsil-attribution</strong> (memoria di sessione): conserva per la sola sessione i parametri di provenienza della visita, inviati solo se compili il modulo.</li>
        </ul>

        <h2>Statistiche (con consenso)</h2>
        <p>Misurano in forma aggregata le visite e alcune azioni: click sul telefono, click sull&apos;email, invio del modulo. Servizio usato: Plausible Analytics oppure Google Analytics 4, secondo la configurazione attiva.</p>

        <h2>Marketing (con consenso)</h2>
        <p>Misurano le conversioni delle campagne pubblicitarie: Google Ads (tag di conversione) e Meta Pixel.</p>

        <h2>Gestire il consenso</h2>
        <p>Puoi cambiare idea in qualsiasi momento.</p>
        <CookiePrefsButton className="btn btn-ghost" label="Apri le preferenze cookie" />
      </div>
    </section>
  );
}
