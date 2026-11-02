// Funzione Vercel: riceve il modulo di contatto e lo inoltra via email con Resend.
// Variabili d'ambiente (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  chiave API di Resend (https://resend.com)
//   CONTACT_TO      indirizzo che riceve le richieste
//   CONTACT_FROM    mittente verificato su Resend, es. "Sito <sito@andreasironi.it>"
// Se mancano, risponde 503 e la pagina offre l'invio via email/WhatsApp: nessun falso successo.

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

  const { data, error } = validate(body);
  if (error) return res.status(400).json({ ok: false, ...error });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
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
module.exports.TYPES = TYPES;
module.exports.BUDGETS = BUDGETS;
