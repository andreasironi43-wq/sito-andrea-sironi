/*
 * Runtime del prototipo statico (nessun React): riproduce i comportamenti del sito Next.js.
 * Bundle con esbuild in scripts/build-prototype.mjs.
 */
import { initCycleScene } from "../lib/cycleScene";

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* storage non disponibile */ } },
};

/* menu mobile */
function nav() {
  const b = $("button.burger"), m = $("#menu");
  if (!b || !m) return;
  const set = (o: boolean) => { m.classList.toggle("open", o); b.setAttribute("aria-expanded", String(o)); b.setAttribute("aria-label", o ? "Chiudi il menu" : "Apri il menu"); };
  b.addEventListener("click", () => set(!m.classList.contains("open")));
  addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
}

/* comparsa delle sezioni */
function reveal() {
  const els = $$(".rv");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  els.forEach((e) => io.observe(e));
}

/* scena del ciclo */
function scene() {
  const root = $(".act");
  if (!root) return;
  initCycleScene(root, $$(".act-tg", root).map((g) => g.children.length));
}

/* configuratore per ambiente */
const LOOK: Record<string, [string, string, string, string]> = {
  "poco-aggressivo": [".18", ".85", "1", ".35"], marino: [".30", ".72", ".94", ".20"],
  "terreno-cemento": [".52", ".66", ".90", ".14"], "piscine-cloro": [".10", "1.05", "1.04", ".62"],
};
function configurator() {
  const box = $("#configuratore");
  if (!box) return;
  const chips = $$<HTMLButtonElement>("button.chip[aria-controls]", box);
  const select = (id: string) => {
    chips.forEach((c) => {
      const on = c.getAttribute("aria-controls") === `spec-${id}`;
      c.setAttribute("aria-pressed", String(on));
      const spec = document.getElementById(c.getAttribute("aria-controls")!);
      if (spec) spec.hidden = !on;
    });
    const l = LOOK[id];
    if (l) ["--noise", "--contrast", "--bright", "--sweep"].forEach((k, i) => box.style.setProperty(k, l[i]));
  };
  chips.forEach((c) => c.addEventListener("click", () => select(c.getAttribute("aria-controls")!.slice(5))));
  const fromHash = () => { const h = location.hash.slice(1); if (LOOK[h]) { select(h); box.scrollIntoView({ block: "start" }); } };
  fromHash(); addEventListener("hashchange", fromHash);
}

/* banner cookie (nel prototipo registra solo la scelta: non carica analytics) */
function cookies() {
  const KEY = "alsil-consent-v1";
  const bar = document.createElement("div");
  bar.className = "cookiebar"; bar.setAttribute("role", "region"); bar.setAttribute("aria-labelledby", "ck-title"); bar.tabIndex = -1;
  bar.innerHTML = `<div class="in"><div class="txt"><h2 id="ck-title">Cookie</h2><p>Usiamo strumenti tecnici necessari al funzionamento del sito. Con il vostro consenso attiviamo statistiche di visita e la misura delle campagne pubblicitarie. <a href="cookie.html">Cookie policy</a> · <a href="privacy.html">Privacy</a></p>
<div class="prefs" hidden><label><input type="checkbox" checked disabled> Tecnici necessari (sempre attivi)</label><label><input type="checkbox" id="ck-stats"> Statistiche di visita</label><label><input type="checkbox" id="ck-mkt"> Marketing (Google Ads, Meta)</label></div></div>
<div class="acts"><button type="button" data-a="no">Solo necessari</button><button type="button" data-a="pref">Personalizza</button><button type="button" class="primary" data-a="yes">Accetta tutto</button></div></div>`;
  const prefs = $(".prefs", bar)!, pref = $<HTMLButtonElement>('[data-a="pref"]', bar)!;
  const save = (s: boolean, m: boolean) => { store.set(KEY, JSON.stringify({ statistiche: s, marketing: m, ts: Date.now(), v: 1 })); bar.remove(); };
  bar.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest("button")?.dataset.a;
    if (a === "no") save(false, false);
    else if (a === "yes") save(true, true);
    else if (a === "pref") {
      if (prefs.hidden) { prefs.hidden = false; pref.textContent = "Salva scelte"; }
      else save($<HTMLInputElement>("#ck-stats", bar)!.checked, $<HTMLInputElement>("#ck-mkt", bar)!.checked);
    }
  });
  const show = () => { document.body.appendChild(bar); };
  if (!store.get(KEY)) show();
  $$("button").filter((b) => /Preferenze cookie|preferenze cookie/.test(b.textContent || "")).forEach((b) =>
    b.addEventListener("click", () => { prefs.hidden = false; pref.textContent = "Salva scelte"; show(); bar.focus(); }));
}

/* modulo preventivo: validazione e pagina di conferma, nessun invio */
function form() {
  const f = $<HTMLFormElement>("form.form");
  if (!f) return;
  const note = document.createElement("p");
  note.className = "formstate"; note.style.borderColor = "var(--line)"; note.style.color = "var(--muted)";
  note.textContent = "Prototipo: il modulo controlla i campi e mostra la pagina di conferma, ma non invia dati.";
  f.prepend(note);
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const req = ["azienda", "nome", "email", "telefono", "materiale"];
    let first: HTMLElement | null = null;
    $$(".field-error.proto", f).forEach((x) => x.remove());
    const err = (el: HTMLElement, msg: string) => {
      el.setAttribute("aria-invalid", "true");
      const s = document.createElement("span"); s.className = "field-error proto"; s.textContent = msg;
      (el.closest(".field") || el.parentElement)!.appendChild(s);
      first = first || el;
    };
    $$<HTMLInputElement>("input, textarea", f).forEach((el) => el.removeAttribute("aria-invalid"));
    req.forEach((n) => { const el = f.elements.namedItem(n) as HTMLInputElement; if (el && !el.value.trim()) err(el, "Campo obbligatorio."); });
    const em = f.elements.namedItem("email") as HTMLInputElement;
    if (em.value.trim() && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(em.value.trim())) err(em, "Indirizzo email non valido.");
    const pv = f.elements.namedItem("privacy") as HTMLInputElement;
    if (!pv.checked) err(pv, "Per inviare la richiesta serve il consenso al trattamento dei dati.");
    if (first) { (first as HTMLElement).focus(); return; }
    location.href = "contatti-grazie.html";
  });
}

/* mappa: i riquadri esterni non si caricano nel prototipo */
function map() {
  const ask = $(".mapask");
  if (!ask) return;
  $("button", ask)?.remove();
  const p = $("p", ask);
  if (p) p.textContent = "Nel prototipo la mappa non viene incorporata. Apritela su OpenStreetMap.";
}

nav(); reveal(); scene(); configurator(); cookies(); form(); map();
