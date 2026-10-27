import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Configurator from "@/components/Configurator";
import CtaBand from "@/components/CtaBand";
import Photo from "@/components/Photo";
import { polveri } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cicli di verniciatura per ambiente: marino, terreno, cloro",
  description:
    "Come cambia il ciclo secondo la destinazione del pezzo: ambienti poco aggressivi, marino e alta salinità, contatto con terreno o cemento, ambienti saturi di cloro.",
  path: "/per-ambiente",
});

export default function PerAmbientePage() {
  return (
    <>
      <header className="hero small">
        <Photo name="rivestimento-macro" priority />
        <div className="scrim" />
        <div className="hero-copy">
          <Breadcrumb items={[{ name: "Per ambiente", path: "/per-ambiente" }]} />
          <div className="rule" />
          <p className="eyebrow">Cicli per ambiente</p>
          <h1>Il ciclo giusto per dove finisce il pezzo.</h1>
          <p className="lead">
            Il pretrattamento è sempre completo. Cambiano la sigillatura della passivazione, l&apos;eventuale primer o
            fondo e la finitura.
          </p>
        </div>
      </header>

      <section aria-labelledby="config-title">
        <div className="wrap">
          <h2 id="config-title" className="sr-only">Scegli l&apos;ambiente di destinazione</h2>
          <Configurator />
        </div>
      </section>

      <section className="band" aria-labelledby="polveri-title">
        <div className="wrap rv">
          <p className="eyebrow">Polveri</p>
          <h2 id="polveri-title">Due famiglie di polveri.<br /><em>La scelta finale è dei tecnici.</em></h2>
          <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {polveri.map((p) => (
              <div key={p.title} className="card">
                <div className="txt">
                  <span className="k">{p.use}</span>
                  <h3>{p.title}</h3>
                  <p>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="links"><Link href="/ciclo">Le 19 fasi del ciclo&nbsp;&rsaquo;</Link></div>
        </div>
      </section>

      <CtaBand title="Indicateci l'ambiente." sub="Il ciclo lo proponiamo noi." text="Nel modulo potete scegliere l'ambiente di destinazione e descrivere le specifiche da rispettare." />
    </>
  );
}
