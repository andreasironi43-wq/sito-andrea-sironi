import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Informativa privacy",
  description: "Informativa sul trattamento dei dati personali di chi visita il sito di AL.SIL. S.r.l. o la contatta, ai sensi del Regolamento UE 2016/679.",
  path: "/privacy",
});

// Testo base dal sito originale, aggiornato ai nuovi trattamenti. DA FAR VALIDARE AL CONSULENTE PRIVACY.
export default function PrivacyPage() {
  return (
    <section className="page-head legal-page">
      <div className="narrow">
        <p className="updated">Ultimo aggiornamento: ottobre 2026</p>
        <h1>Informativa privacy</h1>
        <div className="prose">
          <p className="lead mt">Informativa resa ai sensi degli articoli 13 e 14 del Regolamento UE 2016/679 (GDPR) a chi visita questo sito o ci contatta.</p>

          <h2>Titolare del trattamento</h2>
          <p>{company.name}, {company.street}, {company.postalCode} {company.city} ({company.province}), Italia. P.IVA e C.F. {company.vat}. Telefono {company.phone} · Email <a href={`mailto:${company.email}`}>{company.email}</a> · PEC {company.pec}.</p>

          <h2>Quali dati raccogliamo</h2>
          <h3>Dati forniti volontariamente</h3>
          <p>Quando compilate il modulo di richiesta preventivo o ci scrivete, raccogliamo i dati che inserite: ragione sociale, nome e cognome, email, telefono, materiale, dimensioni, quantità annua, colore, ambiente di destinazione, specifiche ed eventuale disegno allegato. Vi chiediamo di non inserire dati particolari (art. 9 GDPR): non ci servono e non li trattiamo.</p>
          <h3>Provenienza della visita</h3>
          <p>Se arrivate al sito da una campagna (ad esempio Google Ads o Meta), il browser conserva per la sola sessione i parametri del link (utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid), la pagina di arrivo e il sito di provenienza. Questi dati ci vengono inviati soltanto se compilate il modulo, insieme alla richiesta.</p>
          <h3>Dati di navigazione</h3>
          <p>I sistemi del sito acquisiscono, nel normale esercizio, dati la cui trasmissione è implicita nei protocolli di comunicazione: indirizzo IP, browser, sistema operativo, orario e pagina richiesta. Sono usati per la sicurezza e il funzionamento del sito e conservati per il tempo tecnico necessario.</p>
          <h3>Statistiche e marketing</h3>
          <p>Solo con il vostro consenso, espresso nel banner cookie, usiamo strumenti di statistica e di misura delle campagne. I dettagli sono nella <Link href="/cookie">cookie policy</Link>.</p>

          <h2>Perché li trattiamo e su quale base</h2>
          <ul>
            <li>Rispondere alle richieste e formulare preventivi: misure precontrattuali su vostra richiesta (art. 6.1.b GDPR).</li>
            <li>Gestire il rapporto commerciale se la richiesta diventa una fornitura: esecuzione del contratto (art. 6.1.b).</li>
            <li>Sapere da quale campagna arriva una richiesta, per valutare l&apos;efficacia della pubblicità: legittimo interesse del titolare (art. 6.1.f), limitato ai parametri del link elencati sopra.</li>
            <li>Statistiche di visita e misura delle conversioni pubblicitarie: consenso (art. 6.1.a), revocabile in ogni momento.</li>
            <li>Sicurezza e funzionamento del sito: legittimo interesse (art. 6.1.f).</li>
            <li>Adempimenti fiscali e contabili: obbligo legale (art. 6.1.c).</li>
          </ul>
          <p>I dati contrassegnati come obbligatori nel modulo sono necessari per rispondere: senza, non possiamo elaborare il preventivo.</p>

          <h2>Per quanto tempo li conserviamo</h2>
          <ul>
            <li>Richieste che non danno luogo a un rapporto commerciale: 24 mesi dall&apos;ultimo contatto.</li>
            <li>Dati di rapporti commerciali: per la durata del rapporto e poi 10 anni, per gli obblighi civilistici e fiscali.</li>
            <li>Disegni caricati tramite il modulo oltre 4 MB: conservati nello spazio di archiviazione del sito per il tempo necessario a gestire la richiesta.</li>
            <li>Log di sistema: per il tempo tecnico necessario.</li>
          </ul>

          <h2>A chi possono essere comunicati</h2>
          <p>I dati sono trattati dal personale autorizzato del titolare e da fornitori nominati responsabili del trattamento (art. 28 GDPR): hosting e archiviazione del sito (Vercel Inc.), invio delle email del modulo (Resend), consulente fiscale e contabile, fornitori informatici e, solo con il vostro consenso, i servizi di statistica e di misura delle campagne indicati nella cookie policy. I dati non sono diffusi né ceduti a terzi per finalità di marketing.</p>

          <h2>Trasferimenti fuori dall&apos;Unione Europea</h2>
          <p>Alcuni fornitori hanno sede negli Stati Uniti. Il trasferimento avviene sulla base della decisione di adeguatezza della Commissione europea (EU-US Data Privacy Framework), per i fornitori aderenti, o delle clausole contrattuali standard (art. 46 GDPR).</p>

          <h2>I vostri diritti</h2>
          <p>Potete chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione, portabilità e opposizione al trattamento fondato sul legittimo interesse. Il consenso si revoca dal link «Preferenze cookie» in fondo a ogni pagina, senza pregiudicare il trattamento svolto prima della revoca. Per esercitare i diritti scrivete a <a href={`mailto:${company.email}`}>{company.email}</a>. Potete proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).</p>

          <h2>Processi automatizzati</h2>
          <p>Non effettuiamo processi decisionali automatizzati né profilazione ai sensi dell&apos;art. 22 GDPR.</p>

          <h2>Modifiche</h2>
          <p>Questa informativa può essere aggiornata. La versione pubblicata su questa pagina, con la data indicata in alto, è quella vigente.</p>
          <div className="links"><Link href="/cookie">Cookie policy&nbsp;&rsaquo;</Link><Link href="/contatti">Contatti&nbsp;&rsaquo;</Link></div>
        </div>
      </div>
    </section>
  );
}
