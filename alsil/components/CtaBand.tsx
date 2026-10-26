import Link from "next/link";
import { company } from "@/lib/site";

export default function CtaBand({
  title = "Hai un pezzo in pressofuso da verniciare?",
  text = "Invia disegno, quantità e ambiente di destinazione: i nostri tecnici valutano il ciclo adatto.",
}: { title?: string; text?: string }) {
  return (
    <section className="cta-band on-dark" aria-labelledby="cta-title">
      <div className="wrap">
        <div>
          <h2 id="cta-title">{title}</h2>
          <p className="muted">
            {text} Oppure chiama il <a href={company.phoneHref}>{company.phone}</a>.
          </p>
        </div>
        <Link href="/preventivo" className="btn btn-arrow">
          Richiedi un preventivo
        </Link>
      </div>
    </section>
  );
}
