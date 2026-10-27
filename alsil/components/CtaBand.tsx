import Link from "next/link";
import { company } from "@/lib/site";

export default function CtaBand({
  title = "Mandateci il disegno.",
  sub = "Vi diciamo quale ciclo serve.",
  text = "Indicate materiale, quantità annua, colore e ambiente di destinazione: i nostri tecnici valutano il ciclo adatto.",
}: { title?: string; sub?: string; text?: string }) {
  return (
    <section className="band center" aria-labelledby="cta-title">
      <div className="narrow rv">
        <h2 id="cta-title">
          {title}
          {sub && <><br /><em>{sub}</em></>}
        </h2>
        <p className="lead mt">{text}</p>
        <div className="links" style={{ justifyContent: "center" }}>
          <Link className="btn" href="/contatti#preventivo">Richiedi un preventivo</Link>
          <a className="btn ghost" href={company.phoneHref}>{company.phone}</a>
        </div>
      </div>
    </section>
  );
}
