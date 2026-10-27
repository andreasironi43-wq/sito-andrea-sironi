import Link from "next/link";
import CookiePrefsButton from "@/components/CookiePrefsButton";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cookie policy",
  description: "Come il sito di AL.SIL. S.r.l. usa cookie e tecnologie equivalenti, e come gestire il consenso.",
  path: "/cookie",
});

// Testo base dal sito originale, aggiornato ai nuovi strumenti. DA FAR VALIDARE AL CONSULENTE PRIVACY.
export default function CookiePage() {
  return (
    <section className="page-head legal-page">
      <div className="narrow">
        <p className="updated">Ultimo aggiornamento: ottobre 2026</p>
        <h1>Cookie policy</h1>
        <div className="prose">
          <p className="lead mt">Come questo sito usa i cookie e le tecnologie equivalenti, e cosa potete decidere voi.</p>

          <h2>In breve</h2>
          <p>All&apos;apertura il sito non carica nulla da domini esterni: niente font remoti, niente statistiche, niente pixel. Statistiche e strumenti di misura delle campagne si attivano solo se li accettate nel banner. La mappa nella pagina Contatti si carica solo se premete il pulsante.</p>

          <h2>Cosa sono</h2>
          <p>I cookie sono piccoli file che un sito salva sul vostro dispositivo. Tecnologie simili, come il local storage e il session storage del browser, hanno la stessa funzione.</p>

          <h2>Cosa usiamo</h2>
          <h3>Tecnici necessari (senza consenso)</h3>
          <ul>
            <li><strong>alsil-consent-v1</strong> (local storage): registra la scelta fatta sul banner, per non riproporlo a ogni pagina.</li>
            <li><strong>alsil-attribution</strong> (session storage): conserva per la sola sessione i parametri di provenienza della visita (utm_*, gclid, fbclid, pagina di arrivo), inviati solo insieme al modulo di preventivo.</li>
            <li><strong>alsil-lead</strong> (session storage): segnala per pochi secondi che il modulo è stato inviato, per registrare la conversione una sola volta.</li>
          </ul>
          <h3>Statistiche (con consenso)</h3>
          <p>Misurano in forma aggregata le visite e tre azioni: click sul numero di telefono, click sull&apos;indirizzo email, invio del modulo. Servizio usato: Plausible Analytics oppure Google Analytics 4, secondo la configurazione attiva.</p>
          <h3>Marketing (con consenso)</h3>
          <p>Misurano le conversioni delle campagne pubblicitarie: tag di conversione di Google Ads e Meta Pixel. Questi servizi possono impostare cookie propri e trattare i dati secondo le loro informative.</p>
          <h3>Contenuti di terze parti</h3>
          <p>La mappa nella pagina Contatti è fornita da OpenStreetMap Foundation e si carica solo se premete «Carica la mappa». In quel momento il vostro indirizzo IP viene comunicato ai server di OpenStreetMap.</p>

          <h2>Come cambiare idea</h2>
          <p>Potete modificare o revocare la scelta in qualsiasi momento.</p>
          <p><CookiePrefsButton className="btn ghost" label="Apri le preferenze cookie" /></p>

          <h2>Contatti</h2>
          <p>Per domande su questa pagina scrivete a <a href={`mailto:${company.email}`}>{company.email}</a>. Il trattamento dei dati personali è descritto nell&apos;<Link href="/privacy">informativa privacy</Link>.</p>
        </div>
      </div>
    </section>
  );
}
