import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCommerce } from "@/lib/commerce";
import { getDictionary, isLocale, SITE_URL } from "@/lib/i18n";
import { prelaunch } from "@/lib/site";
import AddToCart from "@/components/shop/AddToCart";
import DemoNote from "@/components/shop/DemoNote";
import Placeholder from "@/components/Placeholder";
import ProductVisual from "@/components/shop/ProductVisual";
import StatusTag from "@/components/shop/StatusTag";
import { priceText } from "@/components/shop/price";

export const revalidate = 60;

type Params = { params: Promise<{ lang: string; handle: string }> };

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) return [];
  const products = await getCommerce().getProducts(params.lang);
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, handle } = await params;
  if (!isLocale(lang)) return {};
  const p = await getCommerce().getProduct(handle, lang);
  if (!p) return {};
  const title = `${p.title} — ${p.model} · ANDRED`;
  const description = p.description || `${p.title}, ${p.model}. ANDRED — Independent clothing label.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/oggetti/${handle}`,
      languages: { it: `/it/oggetti/${handle}`, en: `/en/oggetti/${handle}` },
    },
    openGraph: {
      title,
      description,
      ...(p.images[0] ? { images: [{ url: p.images[0].url, alt: p.images[0].alt }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { lang, handle } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const commerce = getCommerce();
  const p = await commerce.getProduct(handle, lang);
  if (!p) notFound();

  // Foto oltre la prima; dove mancano, riquadri con il rapporto giusto da riempire.
  const extra = p.images.slice(1);
  // Senza foto: due riquadri da riempire con il rapporto giusto.
  const missing = extra.length ? [] : t.shop.gallery;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.title} ${p.model}`.trim(),
    sku: p.code || undefined,
    brand: { "@type": "Brand", name: "ANDRED" },
    description: p.description || undefined,
    image: p.images.map((i) => i.url),
    url: `${SITE_URL}/${lang}/oggetti/${p.handle}`,
    // Offerta solo quando il prezzo è reale.
    ...(p.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            price: p.priceFrom.amount,
            priceCurrency: p.priceFrom.currencyCode,
            availability: p.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${SITE_URL}/${lang}/oggetti/${p.handle}`,
          },
        }
      : {}),
  };

  return (
    <article className="wrap pb-24 md:pb-36">
      <nav aria-label="Breadcrumb" className="mono border-b border-stone py-3 text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <a href={`/${lang}/oggetti`} className="inline-flex min-h-11 items-center hover:text-signal">
              {t.shop.breadcrumb}
            </a>
          </li>
          <li aria-hidden="true" className="inline-flex min-h-11 items-center">
            /
          </li>
          <li aria-current="page" className="inline-flex min-h-11 items-center text-ink">
            {p.title}
          </li>
        </ol>
      </nav>

      <div className="grid-12 mt-6 gap-y-10 md:mt-10">
        {/* Mobile: foto, acquisto, altre foto. Desktop: foto a sinistra, acquisto fisso a destra. */}
        <div className="col-span-12 min-w-0 md:col-span-7 md:row-start-1">
          <ProductVisual product={p} placeholderLabel={t.a11y.placeholder} priority sizes="(min-width: 768px) 58vw, 100vw" />
        </div>
        <div className="col-span-12 min-w-0 md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1">
          <div className="md:sticky md:top-20">
            {commerce.name === "mock" ? <DemoNote text={t.shop.demo} /> : null}
            <p className="mono text-muted">{p.model}</p>
            <h1 className="display mt-2 text-[clamp(3.5rem,13vw,7.5rem)] md:text-[clamp(3rem,7vw,7.5rem)]">{p.title}</h1>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink pt-4">
              <p className="text-xl font-medium tracking-[-0.02em]">{priceText(p, t, lang)}</p>
              <StatusTag status={p.dropStatus} label={t.shop.status[p.dropStatus]} />
            </div>

            {p.editionSize || p.dropDate ? (
              <dl className="mono mt-4 grid gap-1 text-muted">
                {p.editionSize ? (
                  <div className="flex gap-2">
                    <dt>{t.shop.edition}:</dt>
                    <dd className="text-ink">
                      {p.editionSize} {t.shop.editionOf}
                    </dd>
                  </div>
                ) : null}
                {p.dropDate ? (
                  <div className="flex gap-2">
                    <dt>{t.shop.dropDate}:</dt>
                    <dd className="text-ink">
                      {new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", {
                        dateStyle: "long",
                        timeStyle: "short",
                        timeZone: "Europe/Rome",
                      }).format(new Date(p.dropDate))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            <div className="mt-8">
              <AddToCart variants={p.variants} available={p.available && !prelaunch} t={t.shop} lang={lang} />
            </div>

            {p.description ? <p className="mt-8 text-lg leading-snug">{p.description}</p> : null}

            {p.specs.length ? (
              <section aria-labelledby="specs-title" className="mt-10">
                <h2 id="specs-title" className="mono text-muted">
                  {t.shop.specs}
                </h2>
                <dl className="mt-3 border-t border-ink">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="mono grid grid-cols-[minmax(6.5rem,35%)_1fr] gap-4 border-b border-stone py-2.5">
                      <dt className="text-muted">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                {p.footnote ? <p className="mono mt-3 text-muted">{p.footnote}</p> : null}
              </section>
            ) : null}

            <p className="mono mt-8 text-muted">
              <a href={`/${lang}/aiuto`} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-signal">
                {t.help.items[0][0]} · {t.help.items[1][0]} · {t.help.items[2][0]}
              </a>
            </p>
          </div>
        </div>
        <div className="col-span-12 min-w-0 md:col-span-7 md:row-start-2">
          <div className="grid grid-cols-2 gap-[var(--gutter)] [&>*:last-child:nth-child(odd)]:col-span-2">
            {extra.map((img) => (
              <div key={img.url} className="relative aspect-[4/5] overflow-hidden border border-stone bg-stone/25">
                <Image src={img.url} alt={img.alt} fill sizes="(min-width: 768px) 29vw, 50vw" className="object-cover" />
              </div>
            ))}
            {missing.map((caption) => (
              <Placeholder key={caption} ratio="4/5" label={t.a11y.placeholder} caption={caption} />
            ))}
          </div>
        </div>

      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
