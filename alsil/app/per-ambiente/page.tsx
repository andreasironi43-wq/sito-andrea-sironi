import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import { ambienti } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cicli di verniciatura per ambiente: marino, terreno, piscine",
  description:
    "Come cambia il ciclo secondo la destinazione del pezzo: ambienti poco aggressivi, marino e alta salinità, contatto con terreno o cemento, ambienti con cloro.",
  path: "/per-ambiente",
});

export default function PerAmbientePage() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: 32 }}>
        <div className="wrap">
          <Breadcrumb items={[{ name: "Per ambiente", path: "/per-ambiente" }]} />
          <p className="eyebrow">Per ambiente</p>
          <h1>Il ciclo giusto per dove andrà il pezzo</h1>
          <p className="lead">
            Il pretrattamento è sempre completo. Cambiano la sigillatura della passivazione, l&apos;eventuale primer o
            fondo e la finitura. Primer e fondi si applicano su richiesta del cliente.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap" style={{ display: "grid", gap: 20 }}>
          {ambienti.map((a, i) => (
            <article key={a.id} id={a.id} className="card reveal" aria-labelledby={`${a.id}-t`}>
              <span className="tag">Caso {String(i + 1).padStart(2, "0")}</span>
              <h2 id={`${a.id}-t`} style={{ fontSize: "1.5rem" }}>{a.title}</h2>
              <p className="muted">{a.where}</p>
              <h3 style={{ fontSize: "1rem", marginTop: 16 }}>Come cambia il ciclo</h3>
              <ul>
                {a.ciclo.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </article>
          ))}
          <p className="muted" style={{ marginTop: 12 }}>
            Polvere poliestere per esterni (resistenza ai raggi UV) o epossidica per gli agenti chimici: la scelta finale
            spetta ai nostri tecnici. Le fasi del pretrattamento sono descritte nella pagina{" "}
            <Link href="/ciclo">Ciclo</Link>.
          </p>
        </div>
      </section>
      <CtaBand title="Indicaci l'ambiente di destinazione" text="Nel modulo puoi descrivere dove lavorerà il pezzo e le specifiche da rispettare." />
    </>
  );
}
