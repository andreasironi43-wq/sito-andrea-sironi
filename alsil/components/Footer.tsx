import Link from "next/link";
import { company } from "@/lib/site";
import CookiePrefsButton from "./CookiePrefsButton";

export default function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h2>{company.name}</h2>
            <p className="muted">
              Pretrattamento e verniciatura a polvere di alluminio pressofuso. Più di vent&apos;anni di esperienza.
            </p>
            <address>
              {company.street}
              <br />
              {company.postalCode} {company.city} ({company.province})
            </address>
          </div>
          <div>
            <h2>Contatti</h2>
            <ul>
              <li>
                Tel. <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                PEC <a href={`mailto:${company.pec}`}>{company.pec}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Sito</h2>
            <ul>
              <li><Link href="/ciclo">Il ciclo in 19 fasi</Link></li>
              <li><Link href="/per-ambiente">Cicli per ambiente</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/preventivo">Richiedi un preventivo</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <span>
            © {new Date().getFullYear()} {company.name} · P.IVA e C.F. {company.vat} · Codice SDI {company.sdi}
          </span>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/cookie-policy">Cookie policy</Link>
          <CookiePrefsButton />
        </div>
      </div>
    </footer>
  );
}
