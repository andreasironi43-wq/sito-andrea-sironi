// Uso: node scripts/screenshots.mjs [baseUrl] [path]
// Screenshot a 390/768/1280/1440, controllo overflow orizzontale,
// target touch < 44px e contrasto testo (WCAG AA).
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3123";
const path = process.argv[3] ?? "/it";
const prefix = process.env.SHOT_PREFIX ?? "shot";
const widths = [390, 768, 1280, 1440];
mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
let problems = 0;

for (const width of widths) {
  const ctx = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const report = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = { scrollWidth: document.documentElement.scrollWidth, vw, wide: [], small: [], contrast: [] };
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || el.closest("[hidden],.sr-only")) continue;
      if (el.matches("h1,h2,h3,p,dd,dt,li > a") && el.scrollWidth > el.clientWidth + 1 && cs.overflow === "visible") {
        out.wide.push(`testo fuori dal box: ${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${el.scrollWidth}/${el.clientWidth}`);
      }
      if (r.right > vw + 0.5 || r.left < -0.5) {
        out.wide.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} ${Math.round(r.left)}→${Math.round(r.right)}`);
      }
      if (el.matches("a, button, input, select, textarea, summary") && (r.height < 44 || r.width < 24)) {
        // le checkbox stanno dentro una label grande: controlla la label
        const target = el.closest("label") ?? el;
        const tr = target.getBoundingClientRect();
        if (tr.height < 44) out.small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(tr.width)}x${Math.round(tr.height)}`);
      }
    }
    // Contrasto: elementi con testo diretto
    const parse = (c) => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p[3] ?? 1 };
    };
    const lum = ({ r, g, b }) => {
      const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const bgOf = (el) => {
      for (let n = el; n; n = n.parentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c && c.a > 0.9) return c;
      }
      return { r: 244, g: 245, b: 241, a: 1 };
    };
    for (const el of document.querySelectorAll("body *")) {
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!hasText || el.closest(".sr-only,[hidden],[aria-hidden=true]")) continue;
      const cs = getComputedStyle(el);
      const fg = parse(cs.color);
      if (!fg) continue;
      const bg = bgOf(el);
      const L1 = lum(fg), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      if (ratio * (fg.a ?? 1) < (large ? 3 : 4.5)) {
        out.contrast.push(`${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${ratio.toFixed(2)}`);
      }
    }
    return out;
  });

  const overflow = report.scrollWidth > report.vw;
  console.log(`\n[${width}px] scrollWidth=${report.scrollWidth} vw=${report.vw} ${overflow ? "OVERFLOW" : "ok"}`);
  for (const w of report.wide.slice(0, 10)) console.log("  wide:", w);
  for (const s of report.small.slice(0, 20)) console.log("  touch<44:", s);
  for (const c of [...new Set(report.contrast)].slice(0, 20)) console.log("  contrast:", c);
  for (const e of errors) console.log("  console:", e);
  problems += (overflow ? 1 : 0) + report.wide.length + report.small.length + report.contrast.length + errors.length;

  await page.screenshot({ path: `screenshots/${prefix}-${width}.png`, fullPage: true });
  await ctx.close();
}

await browser.close();
console.log(`\nproblemi: ${problems}`);
process.exitCode = problems ? 1 : 0;
