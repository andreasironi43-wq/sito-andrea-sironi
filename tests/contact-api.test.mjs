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
