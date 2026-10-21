import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import PageHead from "@/components/shop/PageHead";
import { Token } from "@/components/Token";

const SLUGS = ["privacy", "cookie", "termini", "recesso"] as const;
type Slug = (typeof SLUGS)[number];
const isSlug = (s: string): s is Slug => (SLUGS as readonly string[]).includes(s);

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSlug(slug)) return {};
  return {
    title: `${getDictionary(lang).legal.pages[slug]} — ANDRED`,
    // Niente indicizzazione finché il testo non c'è.
    robots: { index: false },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSlug(slug)) notFound();
  const t = getDictionary(lang);
  return (
    <div className="wrap pb-24 md:pb-36">
      <PageHead label={t.legal.label} title={t.legal.pages[slug]} />
      <div className="grid-12 border-t border-ink pt-6">
        <div className="col-span-12 grid max-w-[65ch] gap-4 text-lg leading-snug md:col-span-8 md:col-start-5">
          <p>{t.legal.pending}</p>
          <p>
            <Token>{`[TESTO ${t.legal.pages[slug].toUpperCase()}]`}</Token>
          </p>
          <p>
            <Token>{t.footer.company}</Token>
          </p>
        </div>
      </div>
    </div>
  );
}
