"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OPEN_PREFS_EVENT, readConsent, saveConsent } from "@/lib/consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [stats, setStats] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = readConsent();
    if (!c) setVisible(true);
    const open = () => {
      const cur = readConsent();
      setStats(!!cur?.statistiche);
      setMarketing(!!cur?.marketing);
      setShowPrefs(true);
      setVisible(true);
      setTimeout(() => ref.current?.focus(), 0);
    };
    window.addEventListener(OPEN_PREFS_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, open);
  }, []);

  if (!visible) return null;

  const done = (s: boolean, m: boolean) => {
    saveConsent(s, m);
    setVisible(false);
  };

  return (
    <div
      ref={ref}
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      tabIndex={-1}
    >
      <h2 id="cookie-title">Cookie e statistiche</h2>
      <p>
        Usiamo solo cookie tecnici. Con il tuo consenso attiviamo statistiche di visita e strumenti di misura delle
        campagne pubblicitarie. Dettagli nella <Link href="/cookie-policy">cookie policy</Link>.
      </p>
      {showPrefs && (
        <div className="cookie-prefs">
          <label className="check">
            <input type="checkbox" checked disabled />
            <span>Tecnici (sempre attivi)</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={stats} onChange={(e) => setStats(e.target.checked)} />
            <span>Statistiche di visita</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span>Marketing (misura delle campagne Google Ads e Meta)</span>
          </label>
        </div>
      )}
      <div className="cookie-actions">
        <button type="button" className="btn btn-ghost" onClick={() => done(false, false)}>
          Rifiuta
        </button>
        {showPrefs ? (
          <button type="button" className="btn btn-ghost" onClick={() => done(stats, marketing)}>
            Salva scelte
          </button>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={() => setShowPrefs(true)}>
            Personalizza
          </button>
        )}
        <button type="button" className="btn" onClick={() => done(true, true)}>
          Accetta tutti
        </button>
      </div>
    </div>
  );
}
