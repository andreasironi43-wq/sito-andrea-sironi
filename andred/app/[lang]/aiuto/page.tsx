import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import PageHead from "@/components/shop/PageHead";
import { Token, isToken } from "@/components/Token";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: `${t.help.title} — ANDRED`,
    alternates: { canonical: `/${lang}/aiuto`, languages: { it: "/it/aiuto", en: "/en/aiuto" } },
  };
}

export default async function Help({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <div className="wrap pb-24 md:pb-36">
      <PageHead label={t.help.label} title={t.help.title} />
      <dl className="border-t border-ink">
        {t.help.items.map(([k, v]) => (
          <div key={k} className="grid-12 gap-y-2 border-b border-ink py-6">
            <dt className="col-span-12 text-2xl font-bold tracking-[-0.03em] uppercase md:col-span-4">{k}</dt>
            <dd className="col-span-12 max-w-[60ch] text-lg leading-snug md:col-span-8">
              {isToken(v) ? <Token>{v}</Token> : v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
