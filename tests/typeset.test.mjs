// Test delle regole tipografiche. Uso: node --test tests/typeset.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { typeset } from '../_src/typeset.mjs';

const N = ' ';
const run = (inner) => typeset(`<html><head><title>Una prova di titolo</title></head><body>${inner}</body></html>`);

test('parole brevi attaccate alla successiva', () => {
  assert.ok(run('<p>Strategia e posizionamento per le aziende di Lecco</p>').includes(`e${N}posizionamento per${N}le${N}aziende di${N}Lecco`));
});
test('numero attaccato a ciò che segue', () => {
  assert.ok(run('<p>Bastano 30 minuti in azienda.</p>').includes(`30${N}minuti`));
});
test('ultima parola mai da sola', () => {
  assert.ok(run('<p>Un solo referente dalla strategia alla consegna.</p>').includes(`${N}consegna.`));
});
test('parola breve prima di un grassetto', () => {
  assert.ok(run('<p>Si è spostato verso la <strong>consulenza</strong>.</p>').includes(`la${N}<strong>`));
});
test('testa, script e attributi non toccati', () => {
  const out = run('<p title="e di la">testo</p><script>var a = "e il di";</script>');
  assert.ok(out.includes('<title>Una prova di titolo</title>'));
  assert.ok(out.includes('title="e di la"'));
  assert.ok(out.includes('var a = "e il di";'));
});
