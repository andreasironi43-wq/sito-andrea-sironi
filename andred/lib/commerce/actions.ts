"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale, type Locale } from "@/lib/i18n";
import { getCommerce } from "./index";
import { CommerceError, type Cart } from "./types";

const CART_COOKIE = "andred_cart";
/** Copia leggibile dal browser, solo per il contatore nell'header. */
const QTY_COOKIE = "andred_cart_qty";
const MAX_AGE = 60 * 60 * 24 * 30;

export type AddState = { status: "idle" | "ok" | "error"; code?: "unavailable" | "generic" | "choose"; at?: number };

function localeOf(form: FormData): Locale {
  const l = String(form.get("lang") ?? "it");
  return isLocale(l) ? l : "it";
}

async function saveCart(cart: Cart) {
  const jar = await cookies();
  const secure = process.env.NODE_ENV === "production";
  jar.set(CART_COOKIE, cart.id, { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: MAX_AGE });
  jar.set(QTY_COOKIE, String(cart.totalQuantity), { httpOnly: false, sameSite: "lax", secure, path: "/", maxAge: MAX_AGE });
}

export async function getCartId() {
  return (await cookies()).get(CART_COOKIE)?.value ?? null;
}

export async function addToCart(_prev: AddState, form: FormData): Promise<AddState> {
  const lang = localeOf(form);
  const variantId = String(form.get("variantId") ?? "");
  if (!variantId) return { status: "error", code: "choose", at: Date.now() };

  const commerce = getCommerce();
  const lines = [{ variantId, quantity: 1 }];
  try {
    const id = await getCartId();
    const existing = id ? await commerce.getCart(id, lang) : null;
    const cart = existing ? await commerce.addLines(existing.id, lines, lang) : await commerce.createCart(lines, lang);
    await saveCart(cart);
    revalidatePath(`/${lang}/carrello`);
    return { status: "ok", at: Date.now() };
  } catch (e) {
    const code = e instanceof CommerceError && e.code === "unavailable" ? "unavailable" : "generic";
    if (code === "generic") console.error("[commerce] addToCart", e);
    return { status: "error", code, at: Date.now() };
  }
}

async function mutateLine(form: FormData, quantity: number | null) {
  const lang = localeOf(form);
  const lineId = String(form.get("lineId") ?? "");
  const id = await getCartId();
  if (!id || !lineId) return;
  const commerce = getCommerce();
  try {
    const cart =
      quantity === null || quantity <= 0
        ? await commerce.removeLine(id, lineId, lang)
        : await commerce.updateLine(id, lineId, quantity, lang);
    await saveCart(cart);
  } catch (e) {
    console.error("[commerce] update", e);
  }
  revalidatePath(`/${lang}/carrello`);
}

export async function updateLine(form: FormData) {
  await mutateLine(form, Math.max(0, Math.min(10, Number(form.get("quantity") ?? 1))));
}

export async function removeLine(form: FormData) {
  await mutateLine(form, null);
}
