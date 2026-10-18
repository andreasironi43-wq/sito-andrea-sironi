// Componenti riusabili tra più pagine.
import { company, services, areas } from '../content/site.mjs';
import { esc, icon } from './layout.mjs';

// Modulo richiesta preventivo.
// Antispam: honeypot + tempo minimo di compilazione (lato client) — in WordPress
// affiancare verifica lato server (nonce + honeypot + rate limit / Turnstile).
export function quoteForm(p, { id = 'preventivo', compact = false, jobs = false } = {}) {
  const opts = jobs
    ? ['Tecnico pulizie industriali', 'Addetto pulizie industriali', 'Imbianchino', 'Candidatura spontanea']
    : [...services.map((s) => s.title), 'Più servizi / non so ancora'];
  return `<form class="qform${compact ? ' qform-compact' : ''}" id="${id}" action="#" method="post" novalidate data-form data-endpoint="">
  <div class="qform-grid">
    <div class="field">
      <label for="${id}-nome">Nome e cognome <span aria-hidden="true">*</span></label>
      <input id="${id}-nome" name="nome" type="text" autocomplete="name" required>
      <p class="field-err" id="${id}-nome-err" hidden>Inserisci nome e cognome.</p>
    </div>
    <div class="field">
      <label for="${id}-azienda">${jobs ? 'Città di residenza' : 'Azienda'} <span aria-hidden="true">*</span></label>
      <input id="${id}-azienda" name="${jobs ? 'citta' : 'azienda'}" type="text" autocomplete="${jobs ? 'address-level2' : 'organization'}" required>
      <p class="field-err" id="${id}-azienda-err" hidden>Campo obbligatorio.</p>
    </div>
    <div class="field">
      <label for="${id}-email">Email <span aria-hidden="true">*</span></label>
      <input id="${id}-email" name="email" type="email" autocomplete="email" inputmode="email" required>
      <p class="field-err" id="${id}-email-err" hidden>Inserisci un indirizzo email valido.</p>
    </div>
    <div class="field">
      <label for="${id}-tel">Telefono</label>
      <input id="${id}-tel" name="telefono" type="tel" autocomplete="tel" inputmode="tel">
    </div>
    <div class="field">
      <label for="${id}-servizio">${jobs ? 'Posizione' : 'Servizio di interesse'}</label>
      <select id="${id}-servizio" name="servizio">
        <option value="">Seleziona…</option>
        ${opts.map((o) => `<option>${esc(o)}</option>`).join('')}
      </select>
    </div>
    ${jobs ? '' : `<div class="field">
      <label for="${id}-luogo">Luogo dell’intervento</label>
      <input id="${id}-luogo" name="luogo" type="text" placeholder="Comune o provincia" autocomplete="off">
    </div>`}
    <div class="field field-full">
      <label for="${id}-msg">${jobs ? 'Presentati in poche righe' : 'Descrivi l’intervento'} <span aria-hidden="true">*</span></label>
      <textarea id="${id}-msg" name="messaggio" rows="${compact ? 3 : 5}" required placeholder="${jobs ? 'Esperienza, disponibilità, patenti o abilitazioni (es. PLE)…' : 'Tipo di ambiente, superfici in m², tempi, vincoli di produzione…'}"></textarea>
      <p class="field-err" id="${id}-msg-err" hidden>Scrivi qualche riga di descrizione.</p>
    </div>
    <div class="hp" aria-hidden="true">
      <label for="${id}-website">Lascia vuoto questo campo</label>
      <input id="${id}-website" name="website" type="text" tabindex="-1" autocomplete="off">
    </div>
    <input type="hidden" name="t0" value="">
    <div class="field field-full field-check">
      <input id="${id}-privacy" name="privacy" type="checkbox" required>
      <label for="${id}-privacy">Ho letto l’<a href="${p}privacy-policy/">informativa privacy</a> e acconsento al trattamento dei dati per ricevere una risposta. <span aria-hidden="true">*</span></label>
      <p class="field-err" id="${id}-privacy-err" hidden>Serve il consenso per inviare la richiesta.</p>
    </div>
  </div>
  <div class="qform-foot">
    <button class="btn btn-primary" type="submit"><span class="btn-label">${jobs ? 'Invia candidatura' : 'Invia la richiesta'}</span><span class="btn-icon">${icon.arrow}</span></button>
    <p class="qform-note mono">* Campi obbligatori · Preventivo gratuito</p>
  </div>
  <div class="qform-status" role="status" aria-live="polite" hidden></div>
</form>`;
}

export function contactCards() {
  const a = company.address;
  return `<ul class="contact-cards">
  <li><span class="cc-k mono">Telefono</span><a class="cc-v" href="tel:${company.phoneHref}">${icon.phone}${company.phone}</a></li>
  <li><span class="cc-k mono">Email commerciale</span><a class="cc-v" href="mailto:${company.email}">${icon.mail}${company.email}</a></li>
  <li><span class="cc-k mono">Sede</span><a class="cc-v" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.zip} ${a.city}`)}" target="_blank" rel="noopener">${icon.pin}${esc(a.street)}, ${esc(a.city)} (${a.province})</a></li>
</ul>`;
}

// Barra a cinque segmenti: i colori dei "petali" del marchio, usati come chiave colore.
export const colorKey = (cls = '') => `<span class="ckey ${cls}" aria-hidden="true"><i style="--c:var(--petal-purple)"></i><i style="--c:var(--petal-teal)"></i><i style="--c:var(--petal-green)"></i><i style="--c:var(--petal-yellow)"></i><i style="--c:var(--petal-red)"></i></span>`;

export const areaColor = (id) => `var(--petal-${areas.find((a) => a.id === id).color})`;
