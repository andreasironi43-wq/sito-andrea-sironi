// Funzione Vercel: riceve il modulo di contatto e lo inoltra via email con Resend.
// Variabili d'ambiente (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  chiave API di Resend (https://resend.com)
//   CONTACT_TO      indirizzo che riceve le richieste
//   CONTACT_FROM    mittente verificato su Resend, es. "Sito <sito@andreasironi.it>"
// Se mancano, risponde 503 e la pagina offre l'invio via email/WhatsApp: nessun falso successo.
//
// Richieste di check-up (body.form === 'checkup', pagina /ristoranti/check-up/):
//   - nel registro della funzione (Vercel → Logs) una riga "lead" SENZA dati personali,
//     con l'origine dell'annuncio: è il conteggio lato server delle conversioni;
//   - invio facoltativo dell'evento Lead alla Conversions API di Meta, SPENTO di default.
//     Si accende solo con META_CAPI_ENABLED=1 più META_PIXEL_ID, META_CAPI_TOKEN e
//     META_API_VERSION (es. "v21.0": verificare la versione corrente nella documentazione
//     Meta prima di attivare). Da attivare solo dopo aver aggiornato l'informativa privacy.

'use strict';

const TYPES = [
  'Strategia e posizionamento',
  'Identità, sito, foto e video',
  'Comunicazione continuativa',
  'Non lo so ancora',
];
const BUDGETS = ['', 'Fino a 3.000 €', '3.000 – 8.000 €', '8.000 – 20.000 €', 'Oltre 20.000 €', 'Preferisco parlarne'];
const MIN_ELAPSED_MS = 3000;
const hits = new Map(); // limite di frequenza best-effort per istanza

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}

function validate(body) {
  const d = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 200),
    type: clean(body.type, 80),
    budget: clean(body.budget, 60),
    message: clean(body.message, 5000),
  };
  if (!d.name) return { error: { field: 'name', message: 'Scrivi il tuo nome.' } };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) return { error: { field: 'email', message: 'Controlla l\'indirizzo email.' } };
  if (!TYPES.includes(d.type)) return { error: { field: 'type', message: 'Scegli il tipo di progetto.' } };
  if (!BUDGETS.includes(d.budget)) d.budget = '';
  if (d.message.length < 20) return { error: { field: 'message', message: 'Il messaggio è troppo breve.' } };
  return { data: d };
}

const SRC_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'landed'];

function cleanSrc(src) {
  const out = {};
  if (!src || typeof src !== 'object') return out;
  for (const k of SRC_KEYS) { const v = clean(src[k], 200); if (v) out[k] = v; }
  return out;
}

function validateCheckup(body) {
  const d = {
    name: clean(body.name, 120),
    venue: clean(body.venue, 160),
    phone: clean(body.phone, 24),
    link: clean(body.link, 200),
    page: clean(body.page, 120),
    src: cleanSrc(body.src),
  };
  if (d.name.length < 2) return { error: { field: 'name', message: 'Scrivi il tuo nome.' } };
  if (d.venue.length < 2) return { error: { field: 'venue', message: 'Scrivi il nome del locale e la città.' } };
  if (!/^\+?[\d\s.\-()/]{8,24}$/.test(d.phone) || d.phone.replace(/\D/g, '').length < 8) return { error: { field: 'phone', message: 'Controlla il numero di cellulare.' } };
  return { data: d };
}

// Numero in formato internazionale senza simboli, come lo chiede Meta per l'hash (prefisso 39 se manca).
function normPhone(p) {
  let n = p.replace(/\D/g, '');
  if (p.trim().startsWith('+')) return n;
  if (n.startsWith('00')) return n.slice(2);
  return n.startsWith('39') && n.length > 11 ? n : '39' + n;
}

async function sendMetaLead(d, req) {
  const env = process.env;
  if (env.META_CAPI_ENABLED !== '1' || !env.META_PIXEL_ID || !env.META_CAPI_TOKEN || !env.META_API_VERSION) return 'off';
  const crypto = require('node:crypto');
  const sha = (v) => crypto.createHash('sha256').update(v).digest('hex');
  const user = {
    ph: [sha(normPhone(d.phone))],
    client_user_agent: String(req.headers['user-agent'] || '').slice(0, 400) || undefined,
    client_ip_address: String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined,
  };
  if (d.src.fbclid) user.fbc = `fb.1.${Number(d.src.landed) || Date.now()}.${d.src.fbclid}`;
  const event = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: (env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + env.VERCEL_PROJECT_PRODUCTION_URL : 'https://www.andreasironi.it')) + (d.page || '/ristoranti/check-up/'),
    event_id: crypto.randomUUID(),
    user_data: user,
  };
  const url = `https://graph.facebook.com/${env.META_API_VERSION}/${encodeURIComponent(env.META_PIXEL_ID)}/events?access_token=${encodeURIComponent(env.META_CAPI_TOKEN)}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 3000);
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: [event] }), signal: ctrl.signal });
    return r.ok ? 'sent' : 'error';
  } catch (e) {
    return 'error';
  } finally {
    clearTimeout(t);
  }
}

function esc(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, reason: 'method' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, message: 'Richiesta non valida.' });

  // Antispam: campo trappola compilato o invio troppo rapido → si finge l'accettazione senza inviare nulla.
  if (body.website || Number(body.elapsed) < MIN_ELAPSED_MS) return res.status(200).json({ ok: true });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ ok: false, message: 'Troppi invii ravvicinati. Riprova tra qualche minuto.' });
  recent.push(now); hits.set(ip, recent);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (body.form === 'checkup') {
    const { data, error } = validateCheckup(body);
    if (error) return res.status(400).json({ ok: false, ...error });
    if (!key || !to || !from) return res.status(503).json({ ok: false, reason: 'not_configured' });
    const s = data.src;
    const origin = s.utm_source ? [s.utm_source, s.utm_medium, s.utm_campaign, s.utm_content].filter(Boolean).join(' / ') : 'Diretto o non tracciato';
    const rows = [
      ['Nome', data.name], ['Locale', data.venue], ['Cellulare', data.phone],
      ['Instagram o sito', data.link || '—'], ['Origine', origin], ['Pagina', data.page || '—'],
    ];
    const text = 'Nuova richiesta di check-up gratuito. Consegna promessa: video entro 3 giorni lavorativi.\n\n' + rows.map(([k, v]) => `${k}: ${v}`).join('\n');
    const html = '<p>Nuova richiesta di <b>check-up gratuito</b>. Consegna promessa: video entro 3 giorni lavorativi.</p>'
      + `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join('')}</table>`;
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], subject: `Check-up — ${data.venue}`, text, html }),
      });
      if (!r.ok) return res.status(502).json({ ok: false, reason: 'provider' });
    } catch (e) {
      return res.status(502).json({ ok: false, reason: 'provider' });
    }
    const meta = await sendMetaLead(data, req);
    // conteggio lato server: nessun nome, numero o locale nel registro
    console.log(JSON.stringify({ event: 'lead', form: 'checkup', source: s.utm_source || 'direct', medium: s.utm_medium || '', campaign: s.utm_campaign || '', content: s.utm_content || '', fbclid: Boolean(s.fbclid), meta }));
    return res.status(200).json({ ok: true });
  }

  const { data, error } = validate(body);
  if (error) return res.status(400).json({ ok: false, ...error });
  if (!key || !to || !from) return res.status(503).json({ ok: false, reason: 'not_configured' });

  const subject = `Nuovo progetto — ${data.type}${data.company ? ' — ' + data.company : ''}`;
  const rows = [
    ['Nome', data.name], ['Azienda', data.company || '—'], ['Email', data.email],
    ['Tipo di progetto', data.type], ['Investimento indicativo', data.budget || '—'],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${data.message}`;
  const html = `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join('')}</table>`
    + `<p style="white-space:pre-wrap">${esc(data.message)}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, text, html }),
    });
    if (!r.ok) return res.status(502).json({ ok: false, reason: 'provider' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, reason: 'provider' });
  }
}

module.exports = handler;
module.exports.validate = validate;
module.exports.validateCheckup = validateCheckup;
module.exports.normPhone = normPhone;
module.exports.TYPES = TYPES;
module.exports.BUDGETS = BUDGETS;
