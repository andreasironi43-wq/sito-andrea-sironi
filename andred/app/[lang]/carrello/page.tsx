import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatMoney, getCommerce } from "@/lib/commerce";
import { getCartId, removeLine, updateLine } from "@/lib/commerce/actions";
import { getDictionary, isLocale } from "@/lib/i18n";
import PageHead from "@/components/shop/PageHead";
import CartSync from "@/components/shop/CartSync";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: `${getDictionary(lang).shop.cartTitle} — ANDRED`, robots: { index: false } };
}

export default async function CartPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const s = t.shop;
  const commerce = getCommerce();
  const id = await getCartId();
  const cart = id ? await commerce.getCart(id, lang).catch(() => null) : null;
  const lines = cart?.lines ?? [];
  const subtotal = formatMoney(cart?.subtotal ?? null, lang);

  return (
    <div className="wrap pb-24 md:pb-36">
      <CartSync qty={cart?.totalQuantity ?? 0} />
      <PageHead label={s.cartLabel} title={s.cartTitle} aside={`${cart?.totalQuantity ?? 0}`} />

      {lines.length === 0 ? (
        <div className="border-t border-ink pt-4">
          <p className="text-lg">{s.cartEmpty}</p>
          <a
            href={`/${lang}/oggetti`}
            className="mt-6 inline-flex h-14 items-center border border-ink px-8 font-bold uppercase hover:border-signal hover:text-signal"
          >
            {s.continue}
          </a>
        </div>
      ) : (
        <div className="grid-12 gap-y-12">
          <ul className="col-span-12 border-t border-ink lg:col-span-8">
            {lines.map((l) => (
              <li key={l.id} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-3 border-b border-ink py-5">
                <div className="min-w-0">
                  <p className="mono text-muted">{l.productModel}</p>
                  <h2 className="display mt-1 text-[clamp(2rem,6vw,3.5rem)]">
                    <a href={`/${lang}/oggetti/${l.handle}`} className="hover:text-signal">
                      {l.productTitle}
                    </a>
                  </h2>
                  <p className="mono mt-2">
                    {s.size}: {l.variantTitle}
                  </p>
                </div>
                <p className="mono text-right">{formatMoney(l.total, lang) ?? s.priceTbd}</p>

                <div className="col-span-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center border border-ink" role="group" aria-label={`${s.quantity}: ${l.productTitle}`}>
                    <form action={updateLine}>
                      <input type="hidden" name="lang" value={lang} />
                      <input type="hidden" name="lineId" value={l.id} />
                      <input type="hidden" name="quantity" value={l.quantity - 1} />
                      <button type="submit" aria-label={s.decrease} className="mono inline-flex size-11 items-center justify-center hover:text-signal">
                        −
                      </button>
                    </form>
                    <output className="mono inline-flex min-w-10 justify-center" aria-label={s.quantity}>
                      {l.quantity}
                    </output>
                    <form action={updateLine}>
                      <input type="hidden" name="lang" value={lang} />
                      <input type="hidden" name="lineId" value={l.id} />
                      <input type="hidden" name="quantity" value={l.quantity + 1} />
                      <button type="submit" aria-label={s.increase} className="mono inline-flex size-11 items-center justify-center hover:text-signal">
                        +
                      </button>
                    </form>
                  </div>
                  <form action={removeLine}>
                    <input type="hidden" name="lang" value={lang} />
                    <input type="hidden" name="lineId" value={l.id} />
                    <button type="submit" className="mono inline-flex min-h-11 items-center underline underline-offset-4 hover:text-signal">
                      {s.remove}
                      <span className="sr-only"> {l.productTitle}</span>
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>

          <aside aria-label={s.subtotal} className="col-span-12 lg:col-span-4">
            <div className="border-t border-ink pt-4 lg:sticky lg:top-20">
              <div className="flex items-baseline justify-between gap-4">
                <p className="mono text-muted">{s.subtotal}</p>
                <p className="text-2xl font-medium tracking-[-0.02em]">{subtotal ?? s.priceTbd}</p>
              </div>
              <p className="mono mt-2 text-muted">{s.taxNote}</p>
              {cart?.checkoutUrl ? (
                <>
                  <a
                    href={cart.checkoutUrl}
                    className="mt-6 inline-flex h-14 w-full items-center justify-center bg-ink px-8 font-bold tracking-[-0.01em] text-paper uppercase hover:bg-signal"
                  >
                    {s.checkout}
                  </a>
                  <p className="mono mt-3 text-muted">{s.secure}</p>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    disabled
                    className="mt-6 inline-flex h-14 w-full items-center justify-center bg-ink px-8 font-bold text-paper uppercase opacity-40"
                  >
                    {s.checkout}
                  </button>
                  <p className="mono mt-3 text-muted">{s.checkoutOff}</p>
                </>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
