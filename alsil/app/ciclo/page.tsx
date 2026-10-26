import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
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
      <section className="hero" style={{ paddingBottom: 32 }}>
        <div className="wrap">
          <Breadcrumb items={[{ name: "Ciclo", path: "/ciclo" }]} />
          <p className="eyebrow">19 fasi · 3 stadi</p>
          <h1>Il ciclo, fase per fase</h1>
          <p className="lead">
            Dal posizionamento sul telaio ai controlli finali. Tempi e temperature sono quelli del nostro Manuale della
            Qualità.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap">
          <Timeline />
        </div>
      </section>
      <CtaBand title="Vuoi sapere quale variante del ciclo serve al tuo pezzo?" />
    </>
  );
}
