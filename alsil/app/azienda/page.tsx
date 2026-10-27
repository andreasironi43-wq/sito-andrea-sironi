import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Photo from "@/components/Photo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Azienda: verniciatura a polvere di alluminio pressofuso a Medolago",
  description:
    "AL.SIL. S.r.l., Medolago (BG): pretrattamento e verniciatura a polvere di alluminio pressofuso, con più di vent'anni di esperienza.",
  path: "/azienda",
});

export default function AziendaPage() {
  return (
    <>
      <header className="hero small">
        <Photo name="operatore-pezzo" priority />
        <div className="scrim" />
        <div className="hero-copy">
          <Breadcrumb items={[{ name: "Azienda", path: "/azienda" }]} />
          <div className="rule" />
          <p className="eyebrow">Medolago (BG) · Più di vent&apos;anni di esperienza</p>
          <h1>Una specializzazione: l&apos;alluminio pressofuso.</h1>
          <p className="lead">Pretrattamento e verniciatura a polvere, con un ciclo studiato per dare ai pezzi in pressofuso un&apos;alta resistenza alla corrosione.</p>
        </div>
      </header>

      <section aria-labelledby="impianto-title">
        <div className="wrap rv">
          <p className="eyebrow">L&apos;impianto</p>
          <h2 id="impianto-title">Una linea completa.<br /><em>Dal pretrattamento ai controlli.</em></h2>
          <div className="steps">
            <div className="step"><span className="n">BAGNI</span><div><h3>Concentrazioni controllate in automatico</h3><p>Una centralina controlla le concentrazioni dei bagni di pretrattamento.</p></div></div>
            <div className="step"><span className="n">ACQUA</span><div><h3>Acqua demineralizzata per distillazione</h3><p>Un impianto sottovuoto distilla l&apos;acqua di processo per i risciacqui finali.</p></div></div>
            <div className="step"><span className="n">CABINE</span><div><h3>4 cabine di verniciatura a polvere</h3><p>Due traslabili per i cambi rapidi di colore (chiari e scuri), una per primer epossidici e fondi anticorrosivi, una per campionature e piccoli lotti.</p></div></div>
            <div className="step"><span className="n">FORNI</span><div><h3>Forno di cottura da 100 m</h3><p>190 °C per 40 minuti, con raffreddamento forzato per i pezzi ad alto spessore. Dal 2015 un forno di gelificazione da 30 m per la doppia mano in linea.</p></div></div>
            <div className="step"><span className="n">QUALITÀ</span><div><h3>Controlli e dossier</h3><p>Tre pezzi controllati per lotto (primo, centrale, ultimo): aderenza ISO 2409, spessore ISO 2360, brillantezza con glossmetro dove richiesta. Ogni pezzo ha un dossier di prodotto con la check-list delle fasi.</p></div></div>
          </div>
          <div className="links"><Link href="/ciclo">Il ciclo in 19 fasi&nbsp;&rsaquo;</Link></div>
        </div>
      </section>

      <section className="band" aria-labelledby="foto-title">
        <div className="wrap rv">
          <h2 id="foto-title">Il reparto.<br /><em>Dal grezzo al pezzo verniciato.</em></h2>
          <div className="cards">
            {([
              ["pezzi-grezzi-appesi", "Grezzo", "Pezzi appesi alla linea"],
              ["cabina-pezzi-grigi", "Applicazione", "Pezzi in cabina"],
              ["pezzi-neri-finiti", "Verniciato", "Pezzi finiti sul telaio"],
            ] as const).map(([n, k, t]) => (
              <figure key={n} className="card">
                <Photo name={n} className="photo tall" sizes="(max-width: 860px) 100vw, 360px" />
                <figcaption className="txt"><span className="k">{k}</span><h3>{t}</h3></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Parliamo del vostro pezzo." sub="Siamo a Medolago (BG)." />
    </>
  );
}
