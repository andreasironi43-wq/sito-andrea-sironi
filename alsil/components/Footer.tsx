import Link from "next/link";
import { company } from "@/lib/site";
import CookiePrefsButton from "./CookiePrefsButton";
import LogoSvg from "./LogoSvg";

export default function Footer() {
  return (
    <footer>
      <div className="foot">
        <div>
          <LogoSvg className="foot-logo" />
          <address>
            {company.street}
            <br />
            {company.postalCode} {company.city} ({company.province})
            <br />
            Italia
          </address>
        </div>
        <div>
          <h2>Lavorazioni</h2>
          <Link href="/ciclo">Ciclo in 19 fasi</Link>
          <Link href="/per-ambiente">Cicli per ambiente</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div>
          <h2>Azienda</h2>
          <Link href="/azienda">Chi siamo</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookie">Cookie</Link>
        </div>
        <div>
          <h2>Contatti</h2>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <Link href="/contatti#preventivo">Richiedi un preventivo</Link>
        </div>
      </div>
      <div className="legal">
        <span>
          {company.name} — {company.street}, {company.postalCode} {company.city} ({company.province}) · Tel {company.phone} ·
          PEC {company.pec} · Codice destinatario {company.sdi} · P.IVA e C.F. {company.vat}
        </span>
        <Link href="/privacy">Privacy policy</Link>
        <Link href="/cookie">Cookie policy</Link>
        <CookiePrefsButton />
      </div>
    </footer>
  );
}
