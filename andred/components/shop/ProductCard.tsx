import type { Product } from "@/lib/commerce";
import type { Dictionary, Locale } from "@/lib/i18n";
import ProductVisual from "./ProductVisual";
import StatusTag from "./StatusTag";
import { priceText } from "./price";

export default function ProductCard({ product, t, lang }: { product: Product; t: Dictionary; lang: Locale }) {
  return (
    <article className="object-card reveal relative flex flex-col gap-4">
      <ProductVisual product={product} placeholderLabel={t.a11y.placeholder} sizes="(min-width: 768px) 50vw, 100vw" />
      <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-3">
        <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)]">
          {/* Il link copre tutta la scheda. */}
          <a href={`/${lang}/oggetti/${product.handle}`} className="after:absolute after:inset-0 hover:text-signal">
            {product.title}
          </a>
        </h2>
        <p className="mono shrink-0 text-muted">{product.model}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusTag status={product.dropStatus} label={t.shop.status[product.dropStatus]} />
        <p className="mono">{priceText(product, t, lang)}</p>
      </div>
    </article>
  );
}
