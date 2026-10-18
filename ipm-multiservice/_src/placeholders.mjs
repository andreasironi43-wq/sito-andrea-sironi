// Genera le illustrazioni tecniche segnaposto (SVG) in assets/img/ph/.
// Sono disegni "da progetto" che occupano gli spazi delle future fotografie reali:
// ogni slot nel sito riporta anche un'etichetta "FOTO DA FORNIRE".
// Uso: node _src/placeholders.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets/img/ph');
mkdirSync(OUT, { recursive: true });

const W = 1600, H = 1000;
const C = {
  bg1: '#0E1828', bg2: '#1A2C48', line: 'rgba(214,226,245,.20)', line2: 'rgba(214,226,245,.38)',
  faint: 'rgba(214,226,245,.08)', orange: '#DA8B45', blue: '#5C82C4',
  teal: '#62B8C9', green: '#71B184', yellow: '#D8DA68', red: '#C94B4C', purple: '#8A5A9A',
};
const r = (n) => Math.round(n * 10) / 10;
const L = (x1, y1, x2, y2, s = C.line, w = 1.4, extra = '') =>
  `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" stroke="${s}" stroke-width="${w}" ${extra}/>`;
const P = (pts, s = C.line, w = 1.4, fill = 'none', extra = '') =>
  `<polygon points="${pts.map((p) => p.map(r).join(',')).join(' ')}" stroke="${s}" stroke-width="${w}" fill="${fill}" ${extra}/>`;
const PL = (pts, s = C.line, w = 1.4, extra = '') =>
  `<polyline points="${pts.map((p) => p.map(r).join(',')).join(' ')}" stroke="${s}" stroke-width="${w}" fill="none" ${extra}/>`;

function frame(body, { accent = C.orange, glow = [0.5, 0.45] } = {}) {
  // micro griglia + crocini d'angolo + coordinate: il linguaggio grafico del sito
  let grid = '';
  for (let x = 0; x <= W; x += 80) grid += L(x, 0, x, H, C.faint, 1);
  for (let y = 0; y <= H; y += 80) grid += L(0, y, W, y, C.faint, 1);
  const tick = (x, y, dx, dy) => L(x, y, x + dx, y, C.line2, 1.5) + L(x, y, x, y + dy, C.line2, 1.5);
  const ticks = tick(40, 40, 40, 40) + tick(W - 40, 40, -40, 40) + tick(40, H - 40, 40, -40) + tick(W - 40, H - 40, -40, -40);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.bg1}"/><stop offset="1" stop-color="${C.bg2}"/></linearGradient>
<radialGradient id="glow" cx="${glow[0]}" cy="${glow[1]}" r=".6"><stop offset="0" stop-color="${accent}" stop-opacity=".22"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<g>${grid}</g>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">${body}</g>
<g>${ticks}</g>
</svg>`;
}

// ---------- prospettiva centrale ----------
function hall({ vx = 800, vy = 430, depth = 9, trusses = true, racks = true, lane = C.orange } = {}) {
  let s = '';
  const left = 0, right = W, floor = H, ceil = 0;
  // linee di fuga pavimento
  for (let i = -6; i <= 22; i++) {
    const x = (W / 16) * i;
    s += L(x, floor, vx, vy, C.line, 1.1);
  }
  // profondità
  for (let k = 1; k <= depth; k++) {
    const z = Math.pow(1.45, k);
    const y = vy + (floor - vy) / z;
    const yc = vy - (vy - ceil) / z;
    const xl = vx - (vx - left) / z, xr = vx + (right - vx) / z;
    s += L(xl, y, xr, y, C.line, 1);
    // colonne
    s += L(xl, y, xl, yc, C.line2, 1.6) + L(xr, y, xr, yc, C.line2, 1.6);
    if (trusses) {
      const mid = (xl + xr) / 2;
      s += PL([[xl, yc], [mid, yc - (yc - ceil) * 0.0 - 30 / z], [xr, yc]], C.line2, 1.3);
      for (let t = 1; t < 6; t++) {
        const tx = xl + ((xr - xl) * t) / 6;
        s += L(tx, yc, mid, yc - 30 / z, C.line, 0.8);
      }
    }
    if (racks && k > 1) {
      // scaffalature laterali
      const rw = (vx - xl) * 0.28;
      for (let lv = 1; lv <= 4; lv++) {
        const ly = y - ((y - yc) * lv) / 6;
        s += L(xl, ly, xl + rw, ly + (vy - ly) * 0.08, C.line, 0.9);
        s += L(xr, ly, xr - rw, ly + (vy - ly) * 0.08, C.line, 0.9);
      }
    }
  }
  // corsia centrale (segnaletica orizzontale)
  const lw = 150;
  s += L(vx - lw, floor, vx - 6, vy + 6, lane, 3);
  s += L(vx + lw, floor, vx + 6, vy + 6, lane, 3);
  for (let k = 1; k <= 12; k++) {
    const z1 = Math.pow(1.35, k), z2 = Math.pow(1.35, k + 0.5);
    s += L(vx, vy + (floor - vy) / z1, vx, vy + (floor - vy) / z2, lane, 3, 'opacity=".7"');
  }
  s += `<circle cx="${vx}" cy="${vy}" r="5" fill="${lane}"/>`;
  return s;
}

function productionLine() {
  let s = '';
  // nastro trasportatore in diagonale (proiezione obliqua)
  const ox = 120, oy = 820, dx = 1.0, dy = -0.42;
  const seg = (t) => [ox + t * dx, oy + t * dy];
  const len = 1500;
  const [ex, ey] = seg(len);
  const wv = 120; // larghezza nastro
  s += P([[ox, oy], [ex, ey], [ex + 40, ey + wv * 0.55], [ox + 40, oy + wv * 0.55]], C.line2, 1.6);
  s += L(ox + 40, oy + wv * 0.55 + 40, ex + 40, ey + wv * 0.55 + 40, C.line, 1.2);
  for (let t = 0; t <= len; t += 60) {
    const [x, y] = seg(t);
    s += L(x, y, x + 40, y + wv * 0.55, C.line, 0.8);
  }
  // gambe
  for (let t = 60; t <= len; t += 300) {
    const [x, y] = seg(t);
    s += L(x + 40, y + wv * 0.55, x + 40, y + wv * 0.55 + 170, C.line2, 1.4);
    s += L(x + 4, y, x + 4, y + 140, C.line, 1.1);
  }
  // macchine / stazioni
  const box = (t, w, h, d, col = C.line2) => {
    const [x, y] = seg(t);
    const a = [x, y - h], b = [x + w * dx, y + w * dy - h], c = [b[0] + d, b[1] + d * 0.55], e = [a[0] + d, a[1] + d * 0.55];
    return P([[x, y], [x + w * dx, y + w * dy], b, a], col, 1.6) + P([a, b, c, e], col, 1.2) +
      P([[x + w * dx, y + w * dy], [x + w * dx + d, y + w * dy + d * 0.55], c, b], col, 1.2);
  };
  s += box(180, 230, 260, 70);
  s += box(620, 180, 340, 70, C.teal);
  s += box(1050, 260, 220, 70);
  // prodotti sul nastro
  for (let t = 450; t < 1450; t += 95) {
    if (t > 600 && t < 820) continue;
    const [x, y] = seg(t);
    s += P([[x + 10, y + 14], [x + 50, y - 3], [x + 50, y - 38], [x + 10, y - 21]], C.line2, 1.1);
  }
  // tramoggia
  const [hx, hy] = seg(700);
  s += PL([[hx - 40, hy - 470], [hx + 160, hy - 540], [hx + 120, hy - 410], [hx + 40, hy - 380], [hx - 40, hy - 470]], C.line2, 1.4);
  s += L(hx + 80, hy - 400, hx + 80, hy - 340, C.teal, 2);
  // quote tecniche
  s += L(ox, oy + 230, ex, ey + 230, C.orange, 1.2, 'stroke-dasharray="6 8"');
  s += `<circle cx="${ox}" cy="${oy + 230}" r="4" fill="${C.orange}"/><circle cx="${ex}" cy="${ey + 230}" r="4" fill="${C.orange}"/>`;
  return s;
}

function resinFloor() {
  let s = '';
  const vx = 820, vy = 300;
  // pavimento lucido: fasce di riflesso
  s += `<defs><linearGradient id="refl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9DB5DD" stop-opacity="0"/><stop offset=".5" stop-color="#9DB5DD" stop-opacity=".10"/><stop offset="1" stop-color="#9DB5DD" stop-opacity="0"/></linearGradient></defs>`;
  s += `<polygon points="${vx},${vy} ${W + 900},${H} ${-900},${H}" fill="url(#refl)" stroke="none"/>`;
  for (let i = -10; i <= 26; i++) s += L((W / 16) * i, H, vx, vy, C.line, 0.9);
  for (let k = 1; k <= 12; k++) {
    const y = vy + (H - vy) / Math.pow(1.38, k);
    s += L(0, y, W, y, C.line, 0.8);
  }
  // corsie pedonali gialle e zone tratteggiate (segnaletica)
  const laneAt = (u, col, w) => L(vx + (u - vx) * 1, H, vx + (u - vx) * 0.04, vy + 8, col, w);
  s += laneAt(380, C.yellow, 4) + laneAt(520, C.yellow, 4);
  s += laneAt(1180, C.orange, 4) + laneAt(1320, C.orange, 4);
  // zebratura
  for (let k = 0; k < 9; k++) {
    const y1 = 760 + k * 26;
    const f = (y) => (y - vy) / (H - vy);
    const xa = vx + (380 - vx) * f(y1), xb = vx + (520 - vx) * f(y1);
    s += L(xa, y1, xb, y1 + 18, C.yellow, 3, 'opacity=".75"');
  }
  // simbolo freccia a terra
  const ax = 1250, ay = 860;
  s += P([[ax - 20, ay + 60], [ax + 20, ay + 60], [ax + 16, ay], [ax + 40, ay], [ax, ay - 50], [ax - 40, ay], [ax - 16, ay]], C.orange, 2.2);
  // quota spessore strato
  s += L(80, 600, 80, 940, C.line2, 1.2) + L(70, 600, 90, 600, C.line2, 1.2) + L(70, 940, 90, 940, C.line2, 1.2);
  return s;
}

function facade() {
  let s = '';
  // capannone in prospetto con lamiera grecata
  const x0 = 120, x1 = 1480, yb = 900, yt = 360, ridge = 240;
  s += P([[x0, yb], [x0, yt], [800, ridge], [x1, yt], [x1, yb]], C.line2, 1.8);
  for (let x = x0 + 24; x < x1; x += 24) {
    const top = x < 800 ? yt - ((x - x0) / (800 - x0)) * (yt - ridge) : yt - ((x1 - x) / (x1 - 800)) * (yt - ridge);
    s += L(x, yb, x, top, C.line, x % 96 === 0 ? 1.1 : 0.7);
  }
  // porte sezionali
  for (const dx of [260, 560]) {
    s += P([[dx, yb], [dx, 620], [dx + 220, 620], [dx + 220, yb]], C.line2, 1.6, C.bg1);
    for (let y = 650; y < yb; y += 40) s += L(dx, y, dx + 220, y, C.line, 0.9);
  }
  // fascia già tinteggiata (prima/dopo)
  s += `<rect x="${1010}" y="${430}" width="${470}" height="${470}" fill="${C.orange}" opacity=".10"/>`;
  s += L(1010, 380, 1010, 930, C.orange, 2, 'stroke-dasharray="10 8"');
  // piattaforma a pantografo
  const px = 1080, base = 900;
  s += P([[px - 90, base], [px + 150, base], [px + 150, base - 40], [px - 90, base - 40]], C.line2, 1.8, C.bg1);
  s += `<circle cx="${px - 50}" cy="${base + 8}" r="16" stroke="${C.line2}" stroke-width="1.6" fill="${C.bg1}"/><circle cx="${px + 110}" cy="${base + 8}" r="16" stroke="${C.line2}" stroke-width="1.6" fill="${C.bg1}"/>`;
  const bt = 470;
  for (let i = 0; i < 4; i++) {
    const ya = base - 40 - ((base - 40 - bt) * i) / 4, yb2 = base - 40 - ((base - 40 - bt) * (i + 1)) / 4;
    s += L(px - 70, ya, px + 130, yb2, C.teal, 2) + L(px + 130, ya, px - 70, yb2, C.teal, 2);
  }
  s += P([[px - 110, bt], [px + 170, bt], [px + 170, bt - 70], [px - 110, bt - 70]], C.teal, 2);
  for (let x = px - 110; x <= px + 170; x += 35) s += L(x, bt, x, bt - 70, C.teal, 1);
  // getto airless
  s += P([[px + 170, bt - 40], [px + 330, bt - 140], [px + 330, bt + 60]], C.orange, 1.2, C.orange, 'fill-opacity=".14"');
  return s;
}

function plant() {
  let s = '';
  const tank = (cx, top, rx, h, col = C.line2) => {
    const ry = rx * 0.28;
    return `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" stroke="${col}" stroke-width="1.6"/>` +
      L(cx - rx, top, cx - rx, top + h, col, 1.6) + L(cx + rx, top, cx + rx, top + h, col, 1.6) +
      `<path d="M ${cx - rx} ${top + h} A ${rx} ${ry} 0 0 0 ${cx + rx} ${top + h}" stroke="${col}" stroke-width="1.6"/>` +
      [0.25, 0.5, 0.75].map((f) => `<path d="M ${cx - rx} ${top + h * f} A ${rx} ${ry} 0 0 0 ${cx + rx} ${top + h * f}" stroke="${C.line}" stroke-width="1"/>`).join('');
  };
  s += tank(330, 260, 150, 520);
  s += tank(720, 340, 120, 440, C.teal);
  s += tank(1080, 220, 170, 560);
  // tubazioni
  const pipe = (pts, col = C.line2) => PL(pts, col, 7, 'opacity=".9"') + PL(pts, C.bg1, 3);
  s += pipe([[480, 420], [600, 420], [600, 560]]);
  s += pipe([[840, 500], [910, 500], [910, 330], [910, 330], [930, 330]]);
  s += pipe([[1250, 640], [1420, 640], [1420, 200]]);
  s += pipe([[180, 700], [60, 700]]);
  s += pipe([[330, 860], [330, 930], [1080, 930], [1080, 860]], C.orange);
  // manometri
  for (const [x, y] of [[600, 470], [1420, 420], [910, 420]]) {
    s += `<circle cx="${x}" cy="${y}" r="24" stroke="${C.orange}" stroke-width="2" fill="${C.bg1}"/>` + L(x, y, x + 13, y - 12, C.orange, 2);
  }
  // passerella
  s += L(160, 250, 1300, 250, C.line2, 1.4) + L(160, 210, 1300, 210, C.line, 1);
  for (let x = 160; x <= 1300; x += 60) s += L(x, 210, x, 250, C.line, 1);
  return s;
}

function pestPlan() {
  // pianta tecnica (vista dall'alto) con postazioni di monitoraggio numerate
  let s = '';
  const x0 = 200, y0 = 160, x1 = 1400, y1 = 840;
  s += P([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], C.line2, 3);
  s += P([[x0 + 30, y0 + 30], [x1 - 30, y0 + 30], [x1 - 30, y1 - 30], [x0 + 30, y1 - 30]], C.line, 1);
  // partizioni interne
  s += L(760, y0, 760, 560, C.line2, 2) + L(760, 640, 760, y1, C.line2, 2);
  s += L(x0, 520, 560, 520, C.line2, 2) + L(640, 520, 760, 520, C.line2, 2);
  s += L(1060, y0, 1060, 420, C.line2, 2) + L(1060, 420, x1, 420, C.line2, 2);
  // scaffali
  for (let x = 820; x < 1360; x += 70) s += P([[x, 480], [x + 34, 480], [x + 34, 800], [x, 800]], C.line, 1);
  // postazioni perimetrali
  let n = 1;
  const stn = (x, y, col = C.orange) => {
    const id = String(n++).padStart(2, '0');
    return P([[x - 14, y - 14], [x + 14, y - 14], [x + 14, y + 14], [x - 14, y + 14]], col, 2, C.bg1) +
      `<circle cx="${x}" cy="${y}" r="4" fill="${col}"/>` +
      `<text x="${x + 22}" y="${y - 18}" fill="${col}" font-family="monospace" font-size="20">${id}</text>`;
  };
  for (let x = x0 + 100; x < x1; x += 220) s += stn(x, y0 - 50);
  for (let x = x0 + 100; x < x1; x += 220) s += stn(x, y1 + 50);
  for (let y = y0 + 120; y < y1; y += 240) { s += stn(x0 - 60, y); s += stn(x1 + 60, y); }
  s += stn(400, 380, C.green) + stn(950, 300, C.green) + stn(1250, 300, C.green);
  // percorso ispezione
  s += PL([[x0 - 100, y1 + 110], [x0 - 100, y0 - 110], [x1 + 100, y0 - 110], [x1 + 100, y1 + 110], [x0 - 100, y1 + 110]], C.line2, 1.2, 'stroke-dasharray="4 10"');
  return s;
}

function corridor() {
  let s = '';
  const vx = 800, vy = 460;
  // stanza in prospettiva: pareti vetrate
  const z = [1, 1.6, 2.6, 4.2, 7];
  const rect = (k) => {
    const f = 1 / k;
    return [vx - vx * f, vy - vy * f, vx + (W - vx) * f, vy + (H - vy) * f];
  };
  for (const k of z) {
    const [a, b, c, d] = rect(k);
    s += P([[a, b], [c, b], [c, d], [a, d]], k === 7 ? C.line2 : C.line, 1.2);
  }
  for (const [x, y] of [[0, 0], [W, 0], [0, H], [W, H]]) s += L(x, y, vx + (x - vx) / 7, vy + (y - vy) / 7, C.line2, 1.4);
  // montanti vetrate laterali
  for (let i = 1; i < 12; i++) {
    const k = 1 + i * 0.5;
    const [a, b, , d] = rect(k);
    const [, , c2, d2] = rect(k);
    s += L(a, b, a, d, C.line, 0.9) + L(c2, b, c2, d2, C.line, 0.9);
  }
  // lampade a soffitto
  for (let i = 1; i < 6; i++) {
    const k = 1.2 + i * 0.9;
    const y = vy - vy / k * 0.95, w = 220 / k;
    s += L(vx - w, y, vx + w, y, C.yellow, 3, 'opacity=".8"');
  }
  // riflesso pavimento
  s += L(vx, vy + (H - vy) / 7, vx, H, C.blue, 2, 'opacity=".5"');
  return s;
}

function cleanroom() {
  let s = '';
  // pannellature + flussi d'aria laminari
  for (let x = 120; x <= 1480; x += 170) s += P([[x, 140], [x + 150, 140], [x + 150, 860], [x, 860]], C.line, 1.1);
  for (let x = 140; x <= 1480; x += 85) {
    for (let y = 200; y < 820; y += 140) {
      s += L(x, y, x, y + 70, C.teal, 1.6, 'opacity=".7"') + PL([[x - 7, y + 58], [x, y + 72], [x + 7, y + 58]], C.teal, 1.6, 'opacity=".7"');
    }
  }
  // filtri a soffitto
  for (let x = 120; x <= 1480; x += 340) s += P([[x, 90], [x + 300, 90], [x + 300, 130], [x, 130]], C.line2, 1.6);
  // atomizzatore elettrostatico (nebulizzazione)
  for (let i = 0; i < 70; i++) {
    const a = (i * 137.5) % 360, d = 40 + ((i * 53) % 220);
    const x = 800 + Math.cos((a * Math.PI) / 180) * d * 1.4, y = 640 + Math.sin((a * Math.PI) / 180) * d * 0.6;
    s += `<circle cx="${r(x)}" cy="${r(y)}" r="${2 + (i % 3)}" fill="${C.green}" opacity=".55"/>`;
  }
  s += P([[760, 700], [840, 700], [840, 860], [760, 860]], C.green, 2, C.bg1);
  return s;
}

function scaffold() {
  let s = '';
  // cantiere: ponteggio e piano di lavoro
  for (let x = 200; x <= 1400; x += 200) s += L(x, 120, x, 900, C.line2, 2);
  for (let y = 180; y <= 900; y += 180) {
    s += L(160, y, 1440, y, C.line2, 2);
    s += P([[200, y - 12], [1400, y - 12], [1400, y], [200, y]], C.orange, 1, C.orange, 'fill-opacity=".14"');
  }
  for (let x = 200; x < 1400; x += 200) for (let y = 180; y < 900; y += 180) s += L(x, y + 180, x + 200, y, C.line, 1);
  // calcinacci / detriti stilizzati
  for (let i = 0; i < 30; i++) {
    const x = 220 + ((i * 97) % 1160), y = 930 + ((i * 31) % 40);
    s += P([[x, y], [x + 18, y - 6], [x + 26, y + 8], [x + 6, y + 14]], C.line2, 1);
  }
  return s;
}

function supplies() {
  let s = '';
  // isometrico: bobine di carta, dispenser, colli
  const iso = (x, y, z) => [800 + (x - y) * 0.866, 640 + (x + y) * 0.5 - z];
  const cube = (x, y, z, a, b, h, col = C.line2) => {
    const p = (dx, dy, dz) => iso(x + dx, y + dy, z + dz);
    return P([p(0, 0, h), p(a, 0, h), p(a, b, h), p(0, b, h)], col, 1.5) +
      P([p(a, 0, 0), p(a, b, 0), p(a, b, h), p(a, 0, h)], col, 1.3) +
      P([p(0, b, 0), p(a, b, 0), p(a, b, h), p(0, b, h)], col, 1.3);
  };
  // pallet
  s += cube(-420, -260, 0, 640, 520, 30, C.line);
  s += cube(-400, -240, 30, 280, 220, 200);
  s += cube(-90, -240, 30, 280, 220, 200);
  s += cube(-400, 0, 30, 280, 220, 200);
  s += cube(-90, 0, 30, 280, 220, 200, C.orange);
  s += cube(-400, -240, 230, 280, 220, 170);
  s += cube(-90, -240, 230, 280, 220, 170, C.teal);
  // bobine
  for (let i = 0; i < 3; i++) {
    const [cx, cy] = iso(320 + i * 0, 120 + i * 170, 0);
    s += `<ellipse cx="${r(cx)}" cy="${r(cy - 220)}" rx="70" ry="40" stroke="${C.line2}" stroke-width="1.5"/>` +
      `<ellipse cx="${r(cx)}" cy="${r(cy - 220)}" rx="18" ry="10" stroke="${C.line2}" stroke-width="1.3"/>` +
      L(cx - 70, cy - 220, cx - 70, cy, C.line2, 1.5) + L(cx + 70, cy - 220, cx + 70, cy, C.line2, 1.5) +
      `<path d="M ${r(cx - 70)} ${r(cy)} A 70 40 0 0 0 ${r(cx + 70)} ${r(cy)}" stroke="${C.line2}" stroke-width="1.5"/>`;
  }
  return s;
}

function heroMacro() {
  // hero: superficie industriale a scala ravvicinata — tracce di lavaggio ad alta pressione
  let s = hall({ vx: 960, vy: 400, depth: 10 });
  for (let i = 0; i < 14; i++) {
    const y = 620 + i * 26;
    s += `<path d="M ${-50 + i * 30} ${y} C 400 ${y - 60}, 900 ${y + 40}, ${1700} ${y - 30}" stroke="rgba(160,190,235,${0.05 + (i % 3) * 0.03})" stroke-width="${8 + (i % 4) * 4}"/>`;
  }
  return s;
}

const scenes = {
  'hero': [heroMacro(), { accent: C.orange, glow: [0.6, 0.4] }],
  'capannone': [hall(), { accent: C.orange }],
  'magazzino': [hall({ vx: 560, vy: 470, lane: C.yellow }), { accent: C.yellow, glow: [0.35, 0.5] }],
  'linea-produttiva': [productionLine(), { accent: C.teal, glow: [0.45, 0.35] }],
  'pavimento-resina': [resinFloor(), { accent: C.yellow, glow: [0.5, 0.3] }],
  'facciata': [facade(), { accent: C.orange, glow: [0.7, 0.5] }],
  'impianto': [plant(), { accent: C.teal, glow: [0.5, 0.4] }],
  'disinfestazione': [pestPlan(), { accent: C.green, glow: [0.5, 0.5] }],
  'uffici': [corridor(), { accent: C.blue, glow: [0.5, 0.45] }],
  'sanificazione': [cleanroom(), { accent: C.green, glow: [0.5, 0.6] }],
  'cantiere': [scaffold(), { accent: C.orange, glow: [0.5, 0.5] }],
  'forniture': [supplies(), { accent: C.purple, glow: [0.5, 0.45] }],
};

for (const [name, [body, opts]] of Object.entries(scenes)) {
  const svg = frame(body, opts).replace(/\s+\n/g, '\n');
  writeFileSync(join(OUT, `${name}.svg`), svg);
  console.log('ph', name, (svg.length / 1024).toFixed(1) + 'kB');
}
