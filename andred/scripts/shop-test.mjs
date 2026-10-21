// Flusso carrello sul catalogo di prova. Avviare il server con COMMERCE_DEMO=1.
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3123";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
const log = (k, v) => console.log(k.padEnd(30), v);
const count = () => p.locator("header a[href$='/carrello'] .mono").textContent();

await p.goto(base + "/it/oggetti/peder-001");
log("contatore iniziale", await count());
await p.getByRole("button", { name: "Aggiungi al carrello" }).click();
await p.getByRole("status").filter({ hasText: "Scegli" }).waitFor();
log("senza colore", (await p.getByRole("status").textContent()).trim());
await p.getByText("Western rossa a quadri", { exact: true }).click();
await p.getByRole("button", { name: "Aggiungi al carrello" }).click();
await p.getByRole("status").filter({ hasText: "Aggiunto" }).waitFor();
log("dopo aggiunta: status", (await p.getByRole("status").filter({ hasText: "Aggiunto" }).textContent()).trim());
log("dopo aggiunta: contatore", await count());
await p.screenshot({ path: "screenshots/flow-added-390.png" });

await p.goto(base + "/en/oggetti/rain-002");
await p.getByRole("button", { name: "Add to cart" }).click();
await p.getByRole("status").filter({ hasText: "Added" }).waitFor();
log("2 prodotti: contatore", await count());

await p.goto(base + "/it/carrello");
log("righe nel carrello", await p.locator("main ul > li").count());
await p.getByRole("button", { name: "Aumenta quantità" }).first().click();
await p.locator("main output").first().filter({ hasText: "2" }).waitFor();
log("dopo +: quantità riga 1", await p.locator("main output").first().textContent());
log("dopo +: contatore", await count());
await p.screenshot({ path: "screenshots/flow-cart-390.png", fullPage: true });
await p.getByRole("button", { name: /Rimuovi/ }).first().click();
await p.waitForFunction(() => document.querySelectorAll("main ul > li").length === 1);
log("dopo rimuovi: righe", await p.locator("main ul > li").count());
await p.getByRole("button", { name: /Rimuovi/ }).first().click();
await p.getByText("Il carrello è vuoto.").waitFor();
await p.waitForTimeout(300);
log("carrello vuoto", (await p.locator("main").textContent()).includes("Il carrello è vuoto."));
log("contatore finale", await count());
await b.close();
