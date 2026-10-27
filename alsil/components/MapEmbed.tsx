"use client";

import { useState } from "react";

const EMBED = "https://www.openstreetmap.org/export/embed.html?bbox=9.4863%2C45.6603%2C9.5263%2C45.6803&layer=mapnik&marker=45.6703%2C9.5063";
const LINK = "https://www.openstreetmap.org/?mlat=45.6703&mlon=9.5063#map=16/45.6703/9.5063";

/** Mappa OpenStreetMap caricata solo su richiesta esplicita (trasferisce l'IP a un server esterno). */
export default function MapEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="mapbox">
      {on ? (
        <iframe src={EMBED} title="Mappa: AL.SIL., Via Torre snc, Medolago (BG)" loading="lazy" referrerPolicy="no-referrer" />
      ) : (
        <div className="mapask">
          <p>La mappa è fornita da OpenStreetMap. Caricandola, il vostro indirizzo IP viene comunicato al server esterno.</p>
          <button type="button" className="btn ghost" onClick={() => setOn(true)}>Carica la mappa</button>
          <p style={{ marginTop: 14, marginBottom: 0 }}>
            <a href={LINK} target="_blank" rel="noopener noreferrer">Apri in una nuova scheda&nbsp;&rsaquo;</a>
          </p>
        </div>
      )}
    </div>
  );
}
