// Tipografia italiana per il testo delle pagine generate.
// Agisce solo sul testo visibile dentro <body> (mai su tag, attributi, script, stili):
// 1. le parole brevi (articoli, preposizioni, congiunzioni) restano attaccate alla parola che segue;
// 2. un numero resta attaccato a ciò che segue ("30 minuti");
// 3. l'ultima parola di un blocco di testo non resta da sola sull'ultima riga.
const NBSP = ' ';
const SHORT = 'e|è|a|o|i|il|lo|la|le|gli|un|uno|una|un’|di|da|in|con|per|su|tra|fra|non|che|al|allo|alla|ai|agli|alle|del|dello|della|dei|degli|delle|nel|nello|nella|nei|negli|nelle|sul|sulla|dal|dalla|ed|ad|ho|ha|ti|mi|si|ci|vi|se|ma|né|più|poi';
const shortRe = new RegExp(`(^|[\\s(\\u00ab"\\u201c\\u2014\\u2013])(${SHORT})[ \\t]+(?=\\S)`, 'giu');
const numRe = /(\d)[ \t]+(?=[\p{L}%€])/gu;
const SKIP = /^<(script|style|textarea|title)\b/i;

const shortEndRe = new RegExp(`(^|[\\s(\\u00ab"\\u201c])(${SHORT})[ \\t]+$`, 'iu');
const INLINE = /^<(strong|em|b|i|a|span)\b/i;

function fixText(t, beforeInline) {
  if (!/\S/.test(t)) return t;
  let out = t;
  // due passaggi: copre sequenze come "e il", "di un"
  for (let i = 0; i < 2; i++) out = out.replace(shortRe, (m, pre, w) => pre + w + NBSP);
  out = out.replace(numRe, '$1' + NBSP);
  // parola breve subito prima di un grassetto, corsivo o link: "verso la <strong>consulenza</strong>"
  if (beforeInline) out = out.replace(shortEndRe, (m, pre, w) => pre + w + NBSP);
  // vedova: se il blocco ha almeno 4 parole e l'ultima è corta, la lego alla precedente
  const words = out.trim().split(/\s+/u); // \s comprende anche gli spazi non divisibili appena aggiunti
  if (words.length >= 4) {
    out = out.replace(/[ \t\n]+([^\s]{1,15})(\s*)$/u, (m, last, tail) => NBSP + last + tail);
  }
  return out;
}

export function typeset(html) {
  const start = html.indexOf('<body');
  if (start < 0) return html;
  const head = html.slice(0, start), body = html.slice(start);
  const parts = body.split(/(<[^>]+>)/);
  let skipUntil = null;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (!p) continue;
    if (p[0] === '<') {
      if (skipUntil) { if (new RegExp(`^</${skipUntil}\\b`, 'i').test(p)) skipUntil = null; continue; }
      const m = p.match(SKIP); if (m) skipUntil = m[1];
      continue;
    }
    if (!skipUntil) parts[i] = fixText(p, INLINE.test(parts[i + 1] || ''));
  }
  return head + parts.join('');
}
