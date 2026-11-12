// Test della funzione /api/contact. Uso: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const handler = require('../api/contact.js');

function call(body, { method = 'POST', ip = '1.1.1.' + Math.floor(Math.random() * 250) } = {}) {
  return new Promise((resolve) => {
    const res = {
      headers: {}, code: 0,
      setHeader(k, v) { this.headers[k] = v; },
      status(c) { this.code = c; return this; },
      json(j) { resolve({ status: this.code, body: j }); },
    };
    handler({ method, body, headers: { 'x-forwarded-for': ip } }, res);
  });
}
const valid = {
  name: 'Mario Rossi', email: 'mario@example.com', type: 'Comunicazione continuativa',
  message: 'Vorremmo rifare sito e social del ristorante.', elapsed: 5000,
};

test('rifiuta metodi diversi da POST', async () => {
  assert.equal((await call(null, { method: 'GET' })).status, 405);
});

test('valida i campi', async () => {
  assert.deepEqual((await call({ ...valid, email: 'x' })).body.field, 'email');
  assert.deepEqual((await call({ ...valid, type: 'altro' })).body.field, 'type');
  assert.deepEqual((await call({ ...valid, message: 'corto' })).body.field, 'message');
  assert.deepEqual((await call({ ...valid, name: ' ' })).body.field, 'name');
});

test('antispam: campo trappola e invio troppo rapido non inviano nulla', async () => {
  let sent = false;
  global.fetch = async () => { sent = true; return { ok: true }; };
  process.env.RESEND_API_KEY = 'k'; process.env.CONTACT_TO = 'a@b.it'; process.env.CONTACT_FROM = 'c@d.it';
  assert.equal((await call({ ...valid, website: 'http://spam' })).status, 200);
  assert.equal((await call({ ...valid, elapsed: 500 })).status, 200);
  assert.equal(sent, false);
});

test('senza configurazione risponde 503 (nessun falso successo)', async () => {
  delete process.env.RESEND_API_KEY;
  const r = await call(valid);
  assert.equal(r.status, 503);
  assert.equal(r.body.ok, false);
});

test('con configurazione invia a Resend con reply_to del mittente', async () => {
  process.env.RESEND_API_KEY = 'k'; process.env.CONTACT_TO = 'a@b.it'; process.env.CONTACT_FROM = 'Sito <c@d.it>';
  let payload;
  global.fetch = async (url, opt) => { payload = { url, body: JSON.parse(opt.body), auth: opt.headers.Authorization }; return { ok: true }; };
  const r = await call({ ...valid, message: valid.message + ' <script>' });
  assert.equal(r.status, 200);
  assert.equal(payload.url, 'https://api.resend.com/emails');
  assert.equal(payload.auth, 'Bearer k');
  assert.equal(payload.body.reply_to, 'mario@example.com');
  assert.ok(!payload.body.html.includes('<script>'));
});

test('errore del fornitore → 502, la pagina offre il ripiego', async () => {
  global.fetch = async () => ({ ok: false });
  assert.equal((await call(valid)).status, 502);
});

test('limite di frequenza per IP', async () => {
  global.fetch = async () => ({ ok: true });
  const ip = '9.9.9.9';
  for (let i = 0; i < 5; i++) await call(valid, { ip });
  assert.equal((await call(valid, { ip })).status, 429);
});

/* ---------- check-up (pagina per le campagne) ---------- */
const ck = { form: 'checkup', name: 'Mario', venue: 'Trattoria Da Mario, Merate', phone: '333 123 4567', elapsed: 5000,
  page: '/ristoranti/check-up/', src: { utm_source: 'meta', utm_medium: 'paid', utm_campaign: 'checkup-nov', utm_content: 'video-a', fbclid: 'abc', landed: '1700000000000', evil: 'x' } };

test('check-up: valida nome, locale e cellulare', async () => {
  assert.equal((await call({ ...ck, name: '' })).body.field, 'name');
  assert.equal((await call({ ...ck, venue: ' ' })).body.field, 'venue');
  assert.equal((await call({ ...ck, phone: '12345' })).body.field, 'phone');
  assert.equal((await call({ ...ck, phone: 'chiamami' })).body.field, 'phone');
});

test('check-up: senza configurazione 503, nessun falso successo', async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await call(ck)).status, 503);
});

test('check-up: email con origine dell\'annuncio, registro senza dati personali, Meta spento', async () => {
  process.env.RESEND_API_KEY = 'k'; process.env.CONTACT_TO = 'a@b.it'; process.env.CONTACT_FROM = 'c@d.it';
  delete process.env.META_CAPI_ENABLED;
  const urls = []; let mail;
  global.fetch = async (url, opt) => { urls.push(url); if (url.includes('resend')) mail = JSON.parse(opt.body); return { ok: true }; };
  const logs = []; const orig = console.log; console.log = (l) => logs.push(l);
  const r = await call(ck);
  console.log = orig;
  assert.equal(r.status, 200);
  assert.deepEqual(urls, ['https://api.resend.com/emails']);
  assert.match(mail.subject, /Trattoria Da Mario/);
  assert.match(mail.text, /Origine: meta \/ paid \/ checkup-nov \/ video-a/);
  assert.ok(!mail.text.includes('evil'));
  const line = JSON.parse(logs.find((l) => l.includes('"lead"')));
  assert.equal(line.source, 'meta'); assert.equal(line.meta, 'off');
  assert.ok(!JSON.stringify(line).match(/Mario|333|Merate/));
});

test('check-up: con Meta attivo invia Lead con telefono cifrato (sha256) e fbc', async () => {
  Object.assign(process.env, { RESEND_API_KEY: 'k', CONTACT_TO: 'a@b.it', CONTACT_FROM: 'c@d.it', META_CAPI_ENABLED: '1', META_PIXEL_ID: '123', META_CAPI_TOKEN: 'tok', META_API_VERSION: 'v99.0' });
  let meta;
  global.fetch = async (url, opt) => { if (url.includes('graph.facebook.com')) meta = { url, body: JSON.parse(opt.body) }; return { ok: true }; };
  const orig = console.log; console.log = () => {};
  const r = await call(ck);
  console.log = orig;
  assert.equal(r.status, 200);
  assert.ok(meta.url.startsWith('https://graph.facebook.com/v99.0/123/events?access_token=tok'));
  const ev = meta.body.data[0];
  assert.equal(ev.event_name, 'Lead'); assert.equal(ev.action_source, 'website');
  const { createHash } = await import('node:crypto');
  assert.equal(ev.user_data.ph[0], createHash('sha256').update('393331234567').digest('hex'));
  assert.equal(ev.user_data.fbc, 'fb.1.1700000000000.abc');
  assert.ok(!JSON.stringify(meta.body).includes('Mario'));
  delete process.env.META_CAPI_ENABLED;
});

test('check-up: normalizzazione del numero', () => {
  assert.equal(handler.normPhone('333 123 4567'), '393331234567');
  assert.equal(handler.normPhone('+39 333 1234567'), '393331234567');
  assert.equal(handler.normPhone('0041 79 123 45 67'), '41791234567');
});
