import Link from "next/link";

/** Segnaposto testuale: sostituire con il logo vettoriale originale AL.SIL. */
export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="AL.SIL. – home page">
      <span className="logo-mark" aria-hidden="true">
        AL<span>.</span>SIL<span>.</span>
      </span>
      <span className="logo-sub" aria-hidden="true">
        Pretrattamento e verniciatura a polvere
      </span>
    </Link>
  );
}
