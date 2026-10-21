// Verifica stati del form: errori, aria-invalid, focus, aria-live, successo.
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3123";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(base + "/it#drop");
const form = p.locator("#drop form");
const status = p.locator("#drop [role=status]");
const email = form.locator("input[name=email]");
const consent = form.locator("input[name=consent]");
const submit = form.locator("button[type=submit]");
const log = (k, v) => console.log(k.padEnd(28), v);

await submit.click();
log("vuoto → status", await status.textContent());
log("vuoto → aria-invalid email", await email.getAttribute("aria-invalid"));
log("vuoto → focus su", await p.evaluate(() => document.activeElement?.getAttribute("name")));

await email.fill("nome@dominio");
await submit.click();
log("email errata → status", await status.textContent());

await email.fill("nome@dominio.it");
await submit.click();
log("senza consenso → status", await status.textContent());
log("senza consenso → focus su", await p.evaluate(() => document.activeElement?.getAttribute("name")));
await p.screenshot({ path: "screenshots/form-error-390.png", clip: { x: 0, y: 0, width: 390, height: 844 } });

await consent.check();
await submit.click();
await p.waitForFunction(() => document.querySelector("#drop [role=status]")?.textContent?.includes("Fatto"));
log("ok → status", await status.textContent());
log("ok → form visibile", await form.count());
await p.locator("#drop").screenshot({ path: "screenshots/form-success-390.png" });

for (const body of [{}, { email: "x@y.it" }, { email: "x@y.it", consent: true, locale: "en" }, { email: "a@b.it", consent: true, website: "bot" }]) {
  const r = await fetch(base + "/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  log("API " + JSON.stringify(body).slice(0, 22), r.status + " " + (await r.text()));
}
const r = await fetch(base + "/api/subscribe", { method: "POST", body: new URLSearchParams({ email: "c@d.it", consent: "on", locale: "it" }) });
log("API form (no JS)", r.status + " " + r.headers.get("content-type"));
await b.close();
