import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Webhook Shopify (products/update, products/create, products/delete, inventory_levels/update):
 * svuota la cache del catalogo così stato e disponibilità si aggiornano subito.
 * Impostare SHOPIFY_WEBHOOK_SECRET con la chiave mostrata in Shopify > Notifiche > Webhook.
 */
export async function POST(req: Request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: false }, { status: 501 });

  const body = await req.text();
  const given = req.headers.get("x-shopify-hmac-sha256") ?? "";
  const expected = createHmac("sha256", secret).update(body, "utf8").digest("base64");
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag("products", "max");
  return NextResponse.json({ ok: true });
}
