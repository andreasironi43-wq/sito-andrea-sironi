import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head" style={{ minHeight: "60vh" }}>
      <div className="narrow">
        <div className="rule" />
        <p className="eyebrow">Errore 404</p>
        <h1>Pagina non trovata.<br /><em>Forse è stata spostata.</em></h1>
        <div className="links"><Link className="btn" href="/">Torna alla home</Link><Link href="/contatti">Contatti&nbsp;&rsaquo;</Link></div>
      </div>
    </section>
  );
}
