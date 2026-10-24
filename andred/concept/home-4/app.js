// ANDRED concept 4 — anello di foto, titolo che sale, provino, strisce, form di prova.
(function () {
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hero = document.querySelector(".hero");
  var ring = document.querySelector(".ring");
  var frames = [].slice.call(ring.querySelectorAll(".ring__f"));

  // ---------- L'anello: le foto su un'ellisse, più grandi in basso e ai lati ----------
  function place() {
    var W = hero.clientWidth, H = hero.clientHeight, phone = W < 720;
    var list = phone ? frames.slice(0, 12) : frames;
    var rx = phone ? W * 0.66 : Math.min(560 / 1440 * W, 620);
    var ry = phone ? W * 0.66 : Math.min(310 / 900 * H, 360);
    var cx = W / 2, cy = H / 2 + (phone ? 0 : 10);
    list.forEach(function (f, n) {
      var a = -Math.PI / 2 + (n / list.length) * Math.PI * 2;
      var x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
      var s = Math.sin(a); // -1 in alto, +1 in basso
      var w = phone ? 64 + 24 * (s + 1) / 2 : 100 + 50 * Math.min(1, 1 + s);
      var tan = Math.atan2(ry * Math.cos(a), -rx * Math.sin(a)) * 180 / Math.PI;
      if (tan > 90) tan -= 180; if (tan < -90) tan += 180;
      var r = Math.max(-30, Math.min(30, tan));
      f.style.left = x + "px"; f.style.top = y + "px";
      f.style.setProperty("--w", Math.round(w) + "px");
      f.style.setProperty("--r", r.toFixed(1) + "deg");
    });
  }
  place();
  addEventListener("resize", place);

  // Indicare una foto la accende e mette il nome del capo al posto della frase
  var line = document.querySelector(".core__line");
  var base = line.textContent;
  function on(f) {
    ring.classList.add("is-pointing");
    frames.forEach(function (g) { g.classList.toggle("is-on", g === f); });
    line.textContent = f.dataset.name; line.classList.add("is-name");
  }
  function off() {
    ring.classList.remove("is-pointing");
    frames.forEach(function (g) { g.classList.remove("is-on"); });
    line.textContent = base; line.classList.remove("is-name");
  }
  frames.forEach(function (f) {
    f.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") on(f); });
    f.addEventListener("pointerleave", off);
    f.addEventListener("focus", function () { on(f); });
    f.addEventListener("blur", off);
  });

  // Il titolo sale dalla sua maschera
  requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("is-ready"); }); });

  // ---------- Strisce: frecce da tastiera ----------
  [].forEach.call(document.querySelectorAll(".strip"), function (s) {
    // parte dalla seconda foto, così si vedono le due vicine
    var sl = s.querySelectorAll(".slide");
    if (sl.length > 2) s.scrollLeft = sl[1].offsetLeft - (s.clientWidth - sl[1].offsetWidth) / 2;
    s.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      s.scrollBy({ left: d * s.querySelector(".slide").offsetWidth, behavior: reduce ? "auto" : "smooth" });
    });
  });

  // ---------- Entrate ----------
  var rv = [].slice.call(document.querySelectorAll(".rv, .tile, .garment, .head, .cta__t"));
  rv.forEach(function (el) { el.classList.add("rv"); });
  if ("IntersectionObserver" in window && !reduce) {
    document.querySelectorAll(".sheet__cols, .intro__text").forEach(function (g) {
      [].forEach.call(g.children, function (el, n) { el.style.setProperty("--d", (n % 6) * 60 + "ms"); });
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
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
