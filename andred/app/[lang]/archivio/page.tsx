import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prelaunch } from "@/lib/site";
import { getCommerce } from "@/lib/commerce";
import { getDictionary, isLocale } from "@/lib/i18n";
import PageHead from "@/components/shop/PageHead";
import ProductCard from "@/components/shop/ProductCard";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: `${t.shop.archiveTitle} — ANDRED`,
    description: t.shop.archiveIntro,
    alternates: { canonical: `/${lang}/archivio`, languages: { it: "/it/archivio", en: "/en/archivio" } },
  };
}

export default async function Archive({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  // Pre-lancio: la pagina non esiste ancora, si torna all'iscrizione.
  if (prelaunch) redirect(`/${lang}#drop`);
  const t = getDictionary(lang);
  const closed = (await getCommerce().getProducts(lang)).filter((p) => p.dropStatus === "closed");

  return (
    <div className="wrap pb-24 md:pb-36">
      <PageHead label={t.shop.archiveLabel} title={t.shop.archiveTitle} intro={t.shop.archiveIntro} aside={`${closed.length}`} />
      {closed.length ? (
        <div className="grid gap-x-[var(--gutter)] gap-y-16 md:grid-cols-2">
          {closed.map((p) => (
            <ProductCard key={p.id} product={p} t={t} lang={lang} />
          ))}
        </div>
      ) : (
        <p className="border-t border-ink pt-4 text-lg">{t.shop.archiveEmpty}</p>
      )}
    </div>
  );
}
