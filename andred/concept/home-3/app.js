// ANDRED concept 3 — foto ferma che cambia, nome su due fondi, cucitura, fila da trascinare, form di prova.
(function () {
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- La foto ferma: cambia quando arriva la sua sezione ----------
  var imgs = {};
  [].forEach.call(document.querySelectorAll(".stage__img"), function (img) { imgs[img.dataset.key] = img; });
  var current = "rain";
  function show(key) {
    if (!imgs[key] || key === current) return;
    imgs[current].classList.remove("is-on");
    imgs[key].classList.add("is-on");
    current = key;
    syncTurn();
  }
  var marks = [].slice.call(document.querySelectorAll("[data-photo]"));
  function pickPhoto() {
    var mid = innerHeight * 0.5, best = null;
    marks.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top <= mid && r.bottom > 0) best = el; // l'ultimo che ha superato la metà
    });
    if (best) show(best.dataset.photo);
  }

  // Fronte / retro di Peder
  var turns = [].slice.call(document.querySelectorAll(".turn__b"));
  function syncTurn() {
    turns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.show === current)); });
  }
  turns.forEach(function (b) {
    b.addEventListener("click", function () {
      show(b.dataset.show);
      var m = b.closest(".obj").querySelector(".m-photo");
      if (m && getComputedStyle(m).display !== "none") m.src = imgs[b.dataset.show].src;
    });
  });

  // ---------- Il nome: la parte sulla foto è blu notte, quella sul fondo scuro è chiara ----------
  var photoInk = document.querySelector(".name__ink--photo");
  var fieldInk = document.querySelector(".name__ink--field");
  var frame = document.querySelector(".stage__frame");
  function clipName() {
    var n = fieldInk.getBoundingClientRect(), f = frame.getBoundingClientRect();
    var w = n.width, h = n.height;
    if (f.bottom >= n.bottom - 1) { // il nome esce a destra della foto
      var cut = Math.max(0, Math.min(w, f.right - n.left));
      photoInk.style.clipPath = "inset(0 " + (w - cut) + "px 0 0)";
      fieldInk.style.clipPath = "inset(0 0 0 " + cut + "px)";
    } else { // il nome esce sotto la foto
      var cv = Math.max(0, Math.min(h, f.bottom - n.top));
      photoInk.style.clipPath = "inset(0 0 " + (h - cv) + "px 0)";
      fieldInk.style.clipPath = "inset(" + cv + "px 0 0 0)";
    }
  }

  // ---------- La cucitura: le due metà si muovono in senso opposto e si allineano al centro ----------
  var seam = document.querySelector(".seam");
  var pjs = [].slice.call(seam.querySelectorAll(".pj"));
  function moveSeam() {
    var r = seam.getBoundingClientRect();
    var step = innerHeight * 0.95;
    var y = -r.top; // quanto è scorsa la sezione
    var f = Math.max(0, Math.min(pjs.length - 0.001, y / step));
    var i = Math.floor(f), t = f - i; // t: 0 → 1 mentre il progetto attraversa
    pjs.forEach(function (pj, k) {
      pj.classList.toggle("is-on", k === i);
      var d = reduce ? 0 : (k === i ? (t - 0.5) * 2 : 0);
      var p = 0;
      if (Math.abs(d) >= 0.45) p = (d - Math.sign(d) * 0.45) / 0.55; // fermo nel tratto centrale
      pj.style.setProperty("--pl", (-p * 20).toFixed(2) + "svh");
      pj.style.setProperty("--pr", (p * 20).toFixed(2) + "svh");
      pj.style.setProperty("--tl", (-Math.abs(p) * 12).toFixed(2) + "svh");
      pj.style.setProperty("--tr", "0svh"); // la metà destra resta, la sinistra si stacca verso l'alto
    });
  }

  var ticking = false;
  function frameTick() { pickPhoto(); moveSeam(); ticking = false; }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frameTick); } }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", function () { clipName(); onScroll(); });
  addEventListener("load", function () { clipName(); onScroll(); });
  if (document.fonts) document.fonts.ready.then(clipName);
  clipName(); frameTick();

  // ---------- Fila da trascinare ----------
  var row = document.querySelector(".row");
  var down = false, sx = 0, sl = 0, moved = false;
  row.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse") return;
    down = true; moved = false; sx = e.clientX; sl = row.scrollLeft; row.classList.add("is-drag");
  });
  addEventListener("pointermove", function (e) {
    if (!down) return;
    var dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true;
    row.scrollLeft = sl - dx;
  });
  addEventListener("pointerup", function () { down = false; row.classList.remove("is-drag"); });
  row.addEventListener("click", function (e) { if (moved) e.preventDefault(); }, true);
  row.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { row.scrollBy({ left: 240, behavior: reduce ? "auto" : "smooth" }); e.preventDefault(); }
    if (e.key === "ArrowLeft") { row.scrollBy({ left: -240, behavior: reduce ? "auto" : "smooth" }); e.preventDefault(); }
  });

  // ---------- Entrate ----------
  var rv = [].slice.call(document.querySelectorAll(".rv"));
  if ("IntersectionObserver" in window && !reduce) {
    document.querySelectorAll("section, article").forEach(function (s) {
      s.querySelectorAll(":scope > .rv, :scope > div > .rv").forEach(function (el, n) { el.style.setProperty("--d", Math.min(n, 5) * 90 + "ms"); });
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ---------- Iscrizione (prova: nessun invio reale) ----------
  var form = document.querySelector(".signup");
  var status = form.querySelector(".signup__status");
  var email = form.querySelector("#email");
  var consent = form.querySelector("#consent");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = email.value.trim();
    var bad = !v || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    var msg = !v ? "Inserisci un indirizzo email." : bad ? "L'indirizzo email non è valido." : !consent.checked ? "Serve il consenso per inviarti le email." : "";
    email.setAttribute("aria-invalid", String(bad));
    status.className = "signup__status " + (msg ? "is-error" : "is-ok");
    status.textContent = msg || "Fatto. Ti scriviamo al prossimo drop.";
    if (msg) (bad ? email : consent).focus();
    else form.querySelector("button").disabled = true;
  });
})();
