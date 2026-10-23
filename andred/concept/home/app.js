// ANDRED concept — esemplari, dissolvenza fronte/retro, reveal, form di prova.
(function () {
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Esemplari ----------
  var items = {
    "peder-blu": {
      field: "1",
      a: { src: "img/peder/blu-fronte.webp", alt: "Peder blu a quadri, fronte" },
      b: { src: "img/peder/blu-retro.webp", alt: "Peder blu a quadri, retro" },
      fact: "Shirt 001 · flanella a quadri blu · prezzo indicativo €180–200, da confermare",
    },
    "peder-western": {
      field: "2",
      a: { src: "img/peder/rossa-retro.webp", alt: "Peder western rossa a quadri, retro" },
      b: null,
      fact: "Shirt 001 · western a quadri rossa · carré a punta, automatici perlati",
    },
    rain: {
      field: "3",
      draw: true,
      fact: "Sweatshirt 002 · felpa a grammatura alta · gocce a puntini su cappuccio e spalle",
    },
  };
  var spec = document.querySelector(".specimen");
  var imgA = spec.querySelector(".specimen__img--a");
  var imgB = spec.querySelector(".specimen__img--b");
  var draw = spec.querySelector(".specimen__draw");
  var side = spec.querySelector(".specimen__side");
  var fact = document.querySelector(".specimen__fact");
  var current = "peder-blu";
  var showBack = false;
  var timer = null;

  function setSide(back) {
    showBack = back;
    imgA.classList.toggle("is-on", !back);
    imgB.classList.toggle("is-on", back);
    side.textContent = back ? "Retro" : "Fronte";
  }
  // Dissolvenza lenta fronte → retro: "Familiar forms. Different perspective."
  function startCycle() {
    clearInterval(timer);
    if (reduce || !items[current].b) return;
    timer = setInterval(function () { if (!document.hidden) setSide(!showBack); }, 5500);
  }
  function choose(key) {
    var it = items[key];
    current = key;
    spec.dataset.field = it.field;
    fact.textContent = it.fact;
    document.querySelectorAll(".name").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.item === key)); });
    if (it.draw) {
      imgA.classList.remove("is-on"); imgB.classList.remove("is-on");
      draw.hidden = false; side.textContent = "Disegno · foto in arrivo";
    } else {
      draw.hidden = true;
      imgA.src = it.a.src; imgA.alt = it.a.alt;
      if (it.b) { imgB.src = it.b.src; imgB.alt = it.b.alt; } else { imgB.removeAttribute("src"); imgB.alt = ""; }
      setSide(false);
      side.textContent = it.b ? "Fronte" : "Retro";
    }
    startCycle();
  }
  document.querySelectorAll(".name").forEach(function (b) {
    b.addEventListener("click", function () { choose(b.dataset.item); b.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" }); });
  });
  startCycle();

  // ---------- 100 punti = 100 pezzi ----------
  var dots = document.querySelector(".dots");
  if (dots) for (var i = 0; i < 100; i++) { var d = document.createElement("i"); d.style.setProperty("--i", i); dots.appendChild(d); }

  // ---------- Reveal per parti, una volta sola ----------
  var revealables = [].slice.call(document.querySelectorAll(".reveal, .dots"));
  if ("IntersectionObserver" in window && !reduce) {
    // ritardo a cascata tra fratelli della stessa sezione
    document.querySelectorAll("section").forEach(function (s) {
      s.querySelectorAll(".reveal").forEach(function (el, n) { el.style.setProperty("--d", Math.min(n, 6) * 80 + "ms"); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ---------- La foto di chiusura si muove con lo scroll ----------
  var obj = document.querySelector(".return__object img");
  if (obj && !reduce) {
    var tick = function () {
      var r = obj.parentElement.getBoundingClientRect();
      var p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
      obj.style.transform = "translateY(" + (p * 4).toFixed(2) + "%) scale(" + (1.04 - Math.abs(p) * 0.03).toFixed(3) + ")";
    };
    addEventListener("scroll", function () { requestAnimationFrame(tick); }, { passive: true });
    tick();
  }

  // ---------- Iscrizione (prova: nessun invio reale) ----------
  var form = document.querySelector(".signup");
  var status = form.querySelector(".signup__status");
  var email = form.querySelector("#email");
  var consent = form.querySelector("#consent");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = email.value.trim();
    var msg = !v ? "Inserisci un indirizzo email." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "L'indirizzo email non è valido." : !consent.checked ? "Serve il consenso per inviarti le email." : "";
    email.setAttribute("aria-invalid", String(!v || /valido/.test(msg)));
    status.className = "signup__status " + (msg ? "is-error" : "is-ok");
    status.textContent = msg || "Fatto. Ti scriviamo al prossimo drop.";
    if (msg) (msg.indexOf("consenso") > -1 ? consent : email).focus();
    else form.querySelector("button").disabled = true;
  });
})();
