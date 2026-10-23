// Test del sito nel browser: visita le pagine raggiungibili da /it e /en,
// controlla link interni, immagini rotte ed errori in console.
// Uso: node scripts/qa.mjs [baseUrl]
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3123";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
const queue = ["/it", "/en"], seen = new Set(), problems = [];
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  p.on("pageerror", (e) => errs.push(e.message));
  const res = await p.goto(base + path, { waitUntil: "networkidle" });
  const status = res?.status() ?? 0;
  // scorre tutta la pagina per caricare le immagini differite
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
  await p.waitForTimeout(500);
  const info = await p.evaluate(() => ({
    finalPath: location.pathname,
    links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
    broken: [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.alt || i.src),
    h1: document.querySelectorAll("h1").length,
    emptyLinks: [...document.querySelectorAll('a[href="#"]')].map((a) => a.textContent.trim()).filter(Boolean),
  }));
  const line = [];
  if (status >= 400) line.push(`HTTP ${status}`);
  if (info.h1 !== 1) line.push(`${info.h1} h1`);
  if (info.broken.length) line.push(`immagini rotte: ${info.broken.join(", ")}`);
  if (errs.length) line.push(`console: ${errs.join(" | ").slice(0, 200)}`);
  if (info.emptyLinks.length) line.push(`link "#": ${info.emptyLinks.join(", ")}`);
  console.log(`${path.padEnd(28)} ${status} ${info.finalPath !== path ? "→ " + info.finalPath + " " : ""}${line.join(" · ") || "ok"}`);
  if (line.length) problems.push(path);
  for (const h of info.links) {
    if (!h || !h.startsWith("/") || h.startsWith("//")) continue;
    const clean = h.split("#")[0].split("?")[0];
    if (clean && !seen.has(clean) && !clean.startsWith("/api")) queue.push(clean);
  }
  await p.close();
}
await b.close();
console.log(`\n${seen.size} pagine, ${problems.length} con problemi`);
process.exitCode = problems.length ? 1 : 0;
