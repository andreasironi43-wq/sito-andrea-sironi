import Link from "next/link";
import CoatingStack from "@/components/CoatingStack";
import CtaBand from "@/components/CtaBand";
import ProveCorrosione from "@/components/ProveCorrosione";
import ProveCertificazioni from "@/components/ProveCertificazioni";
import { ambienti, ciclo, keyFacts, polveri } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Verniciatura a polvere di alluminio pressofuso | AL.SIL. Medolago (BG)",
  description:
    "Pretrattamento e verniciatura a polvere di alluminio pressofuso: ciclo di 19 fasi, 4 cabine, forno da 100 m e controlli su 3 pezzi per lotto. Medolago (BG).",
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Medolago (BG) · Più di vent&apos;anni di esperienza</p>
            <h1>Pretrattamento e verniciatura a polvere dell&apos;alluminio pressofuso</h1>
            <p className="lead">
              Un ciclo di 19 fasi, dal telaio ai controlli finali, studiato per dare ai pezzi in pressofuso un&apos;alta
              resistenza alla corrosione.
            </p>
            <Link href="/preventivo" className="btn btn-arrow">
              Richiedi un preventivo
            </Link>
          </div>
          <CoatingStack />
        </div>
      </section>

      <section className="section" aria-labelledby="dati-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 id="dati-title" className="sr-only">L&apos;impianto in numeri</h2>
          <ul className="facts">
            {keyFacts.map((f) => (
              <li key={f.unit}>
                <span className="fact-value">{f.value}</span>
                <span className="fact-unit">{f.unit}</span>
                <span className="fact-label">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="ciclo-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Il ciclo</p>
              <h2 id="ciclo-title">Tre stadi, 19 fasi</h2>
              <p className="muted">
                Le concentrazioni dei bagni sono controllate in automatico da una centralina. I risciacqui finali usano
                acqua demineralizzata, ottenuta distillando sottovuoto l&apos;acqua di processo.
              </p>
            </div>
            <Link href="/ciclo" className="btn btn-ghost btn-arrow">
              Vedi il ciclo completo
            </Link>
          </div>
          <div className="grid-3">
            {ciclo.map((b) => (
              <Link key={b.id} href={`/ciclo#${b.id}`} className="card card-link reveal">
                <span className="tag">{b.label}</span>
                <h3>{b.title}</h3>
                <p className="muted">{b.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ambienti-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Per ambiente</p>
              <h2 id="ambienti-title">Il ciclo cambia in base a dove andrà il pezzo</h2>
              <p className="muted">
                Sigillatura, primer e finitura si scelgono in funzione dell&apos;ambiente di esercizio.
              </p>
            </div>
            <Link href="/per-ambiente" className="btn btn-ghost btn-arrow">
              Cicli per ambiente
            </Link>
          </div>
          <div className="grid-2">
            {ambienti.map((a) => (
              <Link key={a.id} href={`/per-ambiente#${a.id}`} className="card card-link reveal">
                <h3>{a.title}</h3>
                <p className="muted" style={{ margin: 0 }}>{a.where}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="polveri-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Polveri</p>
              <h2 id="polveri-title">Poliestere o epossidica</h2>
              <p className="muted">La scelta finale della polvere spetta ai nostri tecnici, in base all&apos;uso del pezzo.</p>
            </div>
          </div>
          <div className="grid-2">
            {polveri.map((p) => (
              <div key={p.title} className="card reveal">
                <span className="tag">{p.use}</span>
                <h3>{p.title}</h3>
                <p className="muted" style={{ margin: 0 }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="controlli-title">
        <div className="wrap grid-2" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">Controlli</p>
            <h2 id="controlli-title">Primo, centrale, ultimo</h2>
            <p className="muted">
              Su ogni lotto controlliamo tre pezzi: il primo, quello centrale e l&apos;ultimo. Ogni pezzo ha un dossier di
              prodotto con la check-list delle fasi eseguite.
            </p>
          </div>
          <ul className="card" style={{ margin: 0, paddingLeft: 40 }}>
            <li>Aderenza secondo ISO 2409</li>
            <li>Spessore secondo ISO 2360</li>
            <li>Brillantezza con glossmetro, dove richiesta</li>
          </ul>
        </div>
      </section>

      <ProveCorrosione />
      <ProveCertificazioni />
      <CtaBand />
    </>
  );
}
