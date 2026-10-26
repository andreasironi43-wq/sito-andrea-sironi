import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero">
      <div className="wrap prose">
        <p className="eyebrow">Errore 404</p>
        <h1>Pagina non trovata</h1>
        <p className="lead">La pagina che cerchi non esiste o è stata spostata.</p>
        <Link href="/" className="btn btn-arrow">Torna alla home</Link>
      </div>
    </section>
  );
}
