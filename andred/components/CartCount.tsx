"use client";

import { useEffect, useState } from "react";

const read = () => {
  const m = document.cookie.match(/(?:^|; )andred_cart_qty=(\d+)/);
  return m ? Number(m[1]) : 0;
};

/**
 * Numero di pezzi nel carrello. Legge un cookie, così le pagine restano statiche.
 * Si aggiorna con l'evento "cart:changed" e quando la finestra torna in primo piano.
 */
export default function CartCount() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const update = () => setN(read());
    update();
    window.addEventListener("cart:changed", update);
    window.addEventListener("focus", update);
    return () => {
      window.removeEventListener("cart:changed", update);
      window.removeEventListener("focus", update);
    };
  }, []);
  return <>{n}</>;
}
