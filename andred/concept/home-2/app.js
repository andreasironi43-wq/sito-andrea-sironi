// ANDRED concept 2 — rullo dell'apertura, fronte/retro di Peder, reveal, form di prova.
(function () {
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Rullo: le foto passano tra AND e RED mentre il nome resta fermo ----------
  var hero = document.querySelector(".hero");
  var reel = document.querySelector(".reel");
  var track = document.querySelector(".reel__track");
  var frames = track.querySelectorAll(".reel__frame");
  function placeReel() {
    var fh = frames[0].getBoundingClientRect().height;
    var gap = 24;
    var wh = reel.getBoundingClientRect().height;
    var p = 0;
    if (!reduce) {
      var r = hero.getBoundingClientRect();
      var run = hero.offsetHeight - window.innerHeight;
      p = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
    }
    var i = p * (frames.length - 1);
    var y = wh / 2 - (i * (fh + gap) + fh / 2);
    track.style.transform = "translateY(" + y.toFixed(1) + "px)";
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { placeReel(); moveBackgrounds(); ticking = false; });
  }

  // ---------- Le foto a tutto schermo si muovono piano con lo scroll ----------
  var bgs = [].slice.call(document.querySelectorAll(".item__bg"));
  function moveBackgrounds() {
    if (reduce) return;
    bgs.forEach(function (img) {
      var r = img.parentElement.getBoundingClientRect();
      var p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
      var base = img.parentElement.classList.contains("item--peder") ? 1.6 : 1.06;
      img.style.transform = "translateY(" + (p * 5).toFixed(2) + "%) scale(" + (base - Math.abs(p) * 0.04).toFixed(3) + ")";
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  addEventListener("load", onScroll);
  placeReel(); moveBackgrounds();

  // ---------- Fronte / retro: "Different perspective" ----------
  var flip = document.querySelector(".flip");
  var range = document.getElementById("flip");
  if (flip && range) {
    var set = function () { flip.style.setProperty("--x", range.value + "%"); };
    range.addEventListener("input", set);
    set();
  }

  // ---------- Reveal per parti ----------
  var rv = [].slice.call(document.querySelectorAll(".rv"));
  if ("IntersectionObserver" in window && !reduce) {
    document.querySelectorAll("section, footer").forEach(function (s) {
      s.querySelectorAll(".rv").forEach(function (el, n) { el.style.setProperty("--d", Math.min(n, 5) * 80 + "ms"); });
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
