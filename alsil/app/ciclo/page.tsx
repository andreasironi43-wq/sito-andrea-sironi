import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Photo from "@/components/Photo";
import Timeline from "@/components/Timeline";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Il ciclo di pretrattamento e verniciatura in 19 fasi",
  description:
    "Sgrassaggio, disossidazione, passivazione al cromo trivalente, sigillatura, verniciatura in 4 cabine, cottura a 190 °C e controlli ISO 2409 e ISO 2360.",
  path: "/ciclo",
});

export default function CicloPage() {
  return (
    <>
      <header className="hero small">
        <Photo name="pezzo-grezzo-telaio" priority />
        <div className="scrim" />
        <div className="hero-copy">
          <Breadcrumb items={[{ name: "Ciclo", path: "/ciclo" }]} />
          <div className="rule" />
          <p className="eyebrow">Il ciclo applicativo · 19 fasi</p>
          <h1>Il ciclo, fase per fase.</h1>
          <p className="lead">
            Dal posizionamento sul telaio ai controlli finali. Tempi e temperature sono quelli del nostro Manuale della
            Qualità.
          </p>
        </div>
      </header>
      <section aria-label="Fasi del ciclo">
        <div className="wrap">
          <Timeline />
        </div>
      </section>
      <CtaBand title="Un dubbio sul vostro pezzo?" sub="Mandateci il disegno." text="Vi diciamo quale variante del ciclo serve e perché." />
    </>
  );
}
