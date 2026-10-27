/*
 * Prototipo navigabile statico (per anteprime senza server): legge le pagine dal sito in esecuzione,
 * toglie il runtime di Next/React, rende relativi link e asset e inserisce un runtime vanilla (prototype/entry.ts).
 * Uso: npm run build && npm start (in un altro terminale), poi: node scripts/build-prototype.mjs [origine] [cartella]
 * Il modulo non invia dati; la mappa non viene incorporata.
 */
import { build } from "esbuild";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const ORIGIN = process.argv[2] || "http://localhost:3000";
const OUT = path.resolve(process.argv[3] || "prototype/dist");

const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>[^<]*?\/\/[^/]+(\/[^<]*)?<\/loc>/g)].map((m) => m[1] || "/");
routes.push("/contatti/grazie");
const fileOf = (route) => (route === "/" ? "home.html" : route.slice(1).replace(/\/categoria\//, "/categoria-").replace(/\//g, "-") + ".html");
const map = new Map(routes.map((r) => [r, fileOf(r)]));

const bundle = (await build({ entryPoints: [path.resolve("prototype/entry.ts")], bundle: true, minify: true, format: "iife", write: false, target: "es2019" })).outputFiles[0].text;

await rm(OUT, { recursive: true, force: true });
await mkdir(path.join(OUT, "assets/fonts"), { recursive: true });
await mkdir(path.join(OUT, "assets/img"), { recursive: true });
const assets = new Map(); // percorso remoto → percorso locale

function asset(remote) {
  const clean = remote.split("?")[0];
  const local = clean.startsWith("/_next/static/media/") ? `assets/fonts/${path.basename(clean)}` : `assets/img/${path.basename(clean)}`;
  assets.set(clean, local);
  return local;
}

const images = new Map(); // url ottimizzata di next/image → file locale

function nextImage(encodedUrl) {
  const original = decodeURIComponent(encodedUrl);
  const local = `assets/img/${path.basename(original).replace(/\.[a-z]+$/i, "")}.webp`;
  images.set(`/_next/image?url=${encodeURIComponent(original)}&w=1920&q=70`, local);
  return local;
}

function transform(html) {
  let h = html;
  // next/image: una sola versione WebP 1920 px per foto (il prototipo non ha l'ottimizzatore di Next)
  h = h.replace(/<link rel="preload"[^>]*as="image"[^>]*\/?>/g, "");
  h = h.replace(/ srcSet="[^"]*"/g, "").replace(/ sizes="[^"]*"/g, "");
  h = h.replace(/src="\/_next\/image\?url=([^&"]+)[^"]*"/g, (m, u) => `src="${nextImage(u)}"`);
  h = h.replace(/<script[^>]*\bsrc="[^"]*"[^>]*><\/script>/g, "");
  h = h.replace(/<script>(?:(?!<\/script>)[\s\S])*?__next_f(?:(?!<\/script>)[\s\S])*?<\/script>/g, "");
  h = h.replace(/ data-href="\/_next[^"]*"/g, "");
  h = h.replace(/<link[^>]+(?:as="script"|rel="modulepreload")[^>]*\/?>/g, "");
  h = h.replace(/(?:url\(|href="|src=")(\/(?:_next\/static\/media|img|logo\.svg|icon\.svg)[^")\s]*)/g, (m, p) => m.replace(p, asset(p)));
  h = h.replace(/href="(\/[^"#]*)(#[^"]*)?"/g, (m, p, hash = "") => {
    const f = map.get(p.replace(/\/$/, "") || "/");
    return f ? `href="${f}${hash}"` : m;
  });
  h = h.replace("</head>", '<meta name="robots" content="noindex"><style>:root{color-scheme:dark}</style></head>');
  h = h.replace("</body>", `<script>${bundle}</script></body>`);
  return h;
}

const pages = {};
for (const [route, file] of map) {
  const res = await fetch(ORIGIN + route);
  if (!res.ok) throw new Error(`${route}: ${res.status}`);
  pages[file] = transform(await res.text());
  await writeFile(path.join(OUT, file), pages[file]);
}

for (const [remote, local] of assets) {
  const res = await fetch(ORIGIN + remote);
  if (!res.ok) throw new Error(`${remote}: ${res.status}`);
  await writeFile(path.join(OUT, local), Buffer.from(await res.arrayBuffer()));
}

for (const [remote, local] of images) {
  const res = await fetch(ORIGIN + remote, { headers: { Accept: "image/webp" } });
  if (!res.ok) throw new Error(`${remote}: ${res.status}`);
  await writeFile(path.join(OUT, local), Buffer.from(await res.arrayBuffer()));
}

// Pagina d'ingresso dell'artifact: contenuto della home senza scheletro html/head/body.
const home = pages["home.html"];
const htmlClass = (home.match(/<html[^>]*class="([^"]*)"/) || [])[1] || "";
const head = home.match(/<head>([\s\S]*?)<\/head>/)[1]
  .replace(/<meta charSet="utf-8"\/?>|<meta name="viewport"[^>]*>/g, "")
  .replace(/<title>[^<]*<\/title>/, "<title>Sito AL.SIL.</title>");
const body = home.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
await writeFile(path.join(OUT, "index.html"), `${head}\n<script>document.documentElement.className+=" ${htmlClass}"</script>\n${body}`);

console.log(JSON.stringify({ pagine: [...map.values()], asset: [...assets.values(), ...images.values()], runtimeKB: +(bundle.length / 1024).toFixed(1) }, null, 1));
