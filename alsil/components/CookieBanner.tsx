"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OPEN_PREFS_EVENT, readConsent, saveConsent } from "@/lib/consent";

/** Banner cookie nello stile della barra originale, con scelta per categoria. */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [stats, setStats] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
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
    <div ref={ref} className="cookiebar" role="region" aria-labelledby="ck-title" tabIndex={-1}>
      <div className="in">
        <div className="txt">
          <h2 id="ck-title">Cookie</h2>
          <p>
            Usiamo strumenti tecnici necessari al funzionamento del sito. Con il vostro consenso attiviamo statistiche di
            visita e la misura delle campagne pubblicitarie. <Link href="/cookie">Cookie policy</Link> ·{" "}
            <Link href="/privacy">Privacy</Link>
          </p>
          {showPrefs && (
            <div className="prefs">
              <label><input type="checkbox" checked disabled /> Tecnici necessari (sempre attivi)</label>
              <label><input type="checkbox" checked={stats} onChange={(e) => setStats(e.target.checked)} /> Statistiche di visita</label>
              <label><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /> Marketing (Google Ads, Meta)</label>
            </div>
          )}
        </div>
        <div className="acts">
          <button type="button" onClick={() => done(false, false)}>Solo necessari</button>
          {showPrefs ? (
            <button type="button" onClick={() => done(stats, marketing)}>Salva scelte</button>
          ) : (
            <button type="button" onClick={() => setShowPrefs(true)}>Personalizza</button>
          )}
          <button type="button" className="primary" onClick={() => done(true, true)}>Accetta tutto</button>
        </div>
      </div>
    </div>
  );
}
