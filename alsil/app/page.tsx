import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Photo, { type Slot } from "@/components/Photo";
import ProveCorrosione from "@/components/ProveCorrosione";
import ProveCertificazioni from "@/components/ProveCertificazioni";
import { ambienti, ciclo, keyFacts, polveri } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AL.SIL. – Verniciatura a polvere di alluminio pressofuso | Medolago (BG)",
  description:
    "Pretrattamento e verniciatura a polvere di alluminio pressofuso: ciclo di 19 fasi, 4 cabine, forno da 100 m, controlli su 3 pezzi per lotto. Medolago (BG).",
  path: "/",
  absoluteTitle: true,
});

const cardSlot: Record<string, Slot> = {
  pretrattamento: "vasche-pretrattamento",
  applicazione: "cabina-verniciatura",
  "cottura-controlli": "forno",
};
const cardKicker: Record<string, string> = {
  pretrattamento: "Fasi 01–15",
  applicazione: "4 cabine",
  "cottura-controlli": "Forno da 100 m",
};

export default function Home() {
  return (
    <>
      <header className="hero">
        <Photo slot="linea-aerea" priority />
        <div className="scrim" />
        <div className="hero-copy">
          <div className="rule" />
          <p className="eyebrow">Medolago (BG) · Più di vent&apos;anni di esperienza</p>
          <h1>Pretrattamento e verniciatura a polvere dell&apos;alluminio pressofuso.</h1>
          <p className="lead">
            Un ciclo di 19 fasi, dal telaio ai controlli finali, studiato per dare ai pezzi in pressofuso un&apos;alta
            resistenza alla corrosione.
          </p>
          <div className="meta">
            <span>Passivazione al cromo trivalente</span>
            <span>Controlli su 3 pezzi per lotto</span>
            <span>Dossier di prodotto per ogni pezzo</span>
          </div>
          <div className="links">
            <Link className="btn" href="/contatti#preventivo">Richiedi un preventivo</Link>
          </div>
        </div>
      </header>

      <section className="band" aria-labelledby="ciclo-title">
        <div className="wrap rv">
          <p className="eyebrow">Il ciclo</p>
          <h2 id="ciclo-title">Diciannove fasi.<br /><em>Dal telaio ai controlli.</em></h2>
          <p className="lead mt" style={{ maxWidth: "60ch" }}>
            Sgrassaggio alcalino, disossidazione acida, passivazione al cromo trivalente e sigillatura, con risciacqui
            finali in acqua demineralizzata. Poi verniciatura, cottura e controlli.
          </p>
          <div className="cards">
            {ciclo.map((b) => (
              <Link key={b.id} href={`/ciclo#${b.id}`} className="card">
                <Photo slot={cardSlot[b.id]} sizes="(max-width: 860px) 100vw, 360px" />
                <div className="txt">
                  <span className="k">{cardKicker[b.id]}</span>
                  <h3>{b.title}</h3>
                  <p>{b.intro}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="links"><Link href="/ciclo">Tutte le fasi&nbsp;&rsaquo;</Link></div>
        </div>
      </section>

      <div className="full">
        <Photo slot="stabilimento" />
        <div className="scrim" />
        <div className="txt rv">
          <div className="rule" />
          <h2>Bagni controllati.<br />Acqua distillata.</h2>
          <p>
            Le concentrazioni dei bagni sono controllate in automatico da una centralina. L&apos;acqua demineralizzata
            dei risciacqui è ottenuta da un impianto sottovuoto che distilla l&apos;acqua di processo.
          </p>
        </div>
      </div>

      <section aria-labelledby="numeri-title">
        <div className="wrap rv">
          <p className="eyebrow">L&apos;impianto</p>
          <h2 id="numeri-title">Quattro cabine.<br /><em>Un forno da cento metri.</em></h2>
          <p className="lead mt" style={{ maxWidth: "62ch" }}>
            Due cabine traslabili per i cambi rapidi di colore, una per primer e fondi anticorrosivi, una per
            campionature e piccoli lotti. Dal 2015 un forno di gelificazione da 30 m permette la doppia mano in linea.
          </p>
          <ul className="grid4">
            {keyFacts.map((f) => (
              <li key={f.unit} className="cell">
                <span className="num">{f.value}<small>{f.unit}</small></span>
                <span className="lbl">{f.label}</span>
              </li>
            ))}
          </ul>
          <div className="links"><Link href="/azienda">L&apos;azienda&nbsp;&rsaquo;</Link></div>
        </div>
      </section>

      <section className="band" aria-labelledby="ambienti-title">
        <div className="wrap rv">
          <p className="eyebrow">Per ambiente</p>
          <h2 id="ambienti-title">Dove andrà il pezzo<br /><em>decide il ciclo.</em></h2>
          <p className="lead mt" style={{ maxWidth: "60ch" }}>
            Sigillatura, primer e finitura cambiano tra un ambiente poco aggressivo, il mare, il contatto con terreno o
            cemento e il cloro delle piscine coperte.
          </p>
          <div className="tiles">
            {ambienti.map((a) => (
              <Link key={a.id} href={`/per-ambiente#${a.id}`} className="tile">
                <div className="txt">
                  <h3>{a.title}</h3>
                  <p>{a.where}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="links"><Link href="/per-ambiente">Cicli per ambiente&nbsp;&rsaquo;</Link></div>
        </div>
      </section>

      <section aria-labelledby="polveri-title">
        <div className="wrap cols top rv">
          <div>
            <p className="eyebrow">Polveri</p>
            <h2 id="polveri-title">Poliestere o epossidica.<br /><em>Decidono i tecnici.</em></h2>
            <div className="steps">
              {polveri.map((p) => (
                <div key={p.title} className="step">
                  <span className="n">{p.use.toUpperCase()}</span>
                  <div><h3>{p.title}</h3><p>{p.detail}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Controlli</p>
            <h2>Primo, centrale, ultimo.<br /><em>Su ogni lotto.</em></h2>
            <div className="steps">
              <div className="step"><span className="n">ADERENZA</span><div><h3>ISO 2409</h3><p>Prova di aderenza del film.</p></div></div>
              <div className="step"><span className="n">SPESSORE</span><div><h3>ISO 2360</h3><p>Misura dello spessore del rivestimento.</p></div></div>
              <div className="step"><span className="n">GLOSS</span><div><h3>Glossmetro</h3><p>Brillantezza, dove richiesta.</p></div></div>
              <div className="step"><span className="n">DOSSIER</span><div><h3>Check-list delle fasi</h3><p>Ogni pezzo ha un dossier di prodotto.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <ProveCorrosione />
      <ProveCertificazioni />
      <CtaBand />
    </>
  );
}
