"use client";

import { useEffect } from "react";

/** Allinea il contatore dell'header al carrello reale (es. carrello scaduto su Shopify). */
export default function CartSync({ qty }: { qty: number }) {
  useEffect(() => {
    document.cookie = `andred_cart_qty=${qty}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
    window.dispatchEvent(new Event("cart:changed"));
  }, [qty]);
  return null;
}
