/* IPM Multiservice — script comuni a tutte le pagine.
   Navigazione, progress, split del testo, reveal, contatori, modulo preventivo.
   Il sito funziona interamente anche senza JS e con "riduci movimento". */
(function () {
  'use strict';
  var root = document.documentElement;
  var motion = root.classList.contains('motion');
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (motion && !hasGsap) { root.classList.remove('motion'); motion = false; }
  if (motion) { gsap.registerPlugin(ScrollTrigger); root.classList.add('motion-ready'); }
  window.IPM = { motion: motion };

  /* ---------- Header: nascondi scorrendo in giù, progress di lettura ---------- */
  var header = document.querySelector('[data-header]');
  var bar = document.querySelector('[data-progress]');
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    if (header && !header.classList.contains('menu-open') && !header.classList.contains('mega-open')) {
      if (y > 160 && y > lastY + 4) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 160) header.classList.remove('is-hidden');
    }
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  // Il focus da tastiera dentro l'header lo rende sempre visibile
  if (header) header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });

  /* ---------- Mega menu servizi ---------- */
  var megaBtn = document.querySelector('.mega-toggle');
  var mega = document.getElementById('mega-servizi');
  var megaLi = document.querySelector('.has-mega');
  var megaTimer;
  function setMega(open) {
    if (!mega) return;
    clearTimeout(megaTimer);
    mega.hidden = !open;
    megaBtn.setAttribute('aria-expanded', String(open));
    header.classList.toggle('mega-open', open);
  }
  if (megaBtn && mega) {
    megaBtn.addEventListener('click', function () { setMega(mega.hidden); });
    var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
    [megaLi, mega].forEach(function (el) {
      el.addEventListener('mouseenter', function () { if (hoverable.matches) setMega(true); });
      el.addEventListener('mouseleave', function () { if (hoverable.matches) megaTimer = setTimeout(function () { setMega(false); }, 180); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mega.hidden) { setMega(false); megaBtn.focus(); } });
    document.addEventListener('click', function (e) { if (!mega.hidden && !mega.contains(e.target) && !megaLi.contains(e.target)) setMega(false); });
    mega.addEventListener('focusout', function (e) { if (!mega.contains(e.relatedTarget) && !megaLi.contains(e.relatedTarget)) setMega(false); });
  }

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var mm = document.getElementById('mobile-menu');
  function setMenu(open) {
    mm.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('no-scroll', open);
    if (open) { var first = mm.querySelector('a'); if (first) first.focus({ preventScroll: true }); }
  }
  if (burger && mm) {
    burger.addEventListener('click', function () { setMenu(mm.hidden); });
    mm.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mm.hidden) { setMenu(false); burger.focus(); } });
    window.matchMedia('(min-width: 1060px)').addEventListener('change', function (e) { if (e.matches && !mm.hidden) setMenu(false); });
  }

  /* ---------- Anni di attività (sempre aggiornati) ---------- */
  document.querySelectorAll('[data-years]').forEach(function (el) {
    var from = parseInt(el.getAttribute('data-from'), 10);
    if (from) { el.textContent = String(new Date().getFullYear() - from); el.setAttribute('data-count', el.textContent); }
  });

  /* ---------- Split del testo in parole (per il reveal tipografico) ---------- */
  function splitWords(el, wrapInner) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/( +)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (part) {
            if (!part) return;
            if (/^ +$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            if (wrapInner) {
              w.className = 'w';
              var wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = part; w.appendChild(wi);
            } else { w.setAttribute('data-w', ''); w.textContent = part; }
            w.setAttribute('aria-hidden', 'true');
            frag.appendChild(w);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') { walk(child); }
      });
    })(el);
  }
  if (motion) {
    document.querySelectorAll('[data-split]').forEach(function (el) { splitWords(el, true); });
    document.querySelectorAll('[data-words]').forEach(function (el) { splitWords(el, false); });
  }
  window.IPM.splitWords = splitWords;

  /* ---------- Animazioni di ingresso (tutte le pagine) ---------- */
  // Le parole partono traslate via CSS (.wi): il tween le riporta in posizione.
  function revealWords(el, opts) {
    return gsap.to(el.querySelectorAll('.wi'), Object.assign({
      y: 0, duration: 1.05, ease: 'power4.out', stagger: .045
    }, opts || {}));
  }
  window.IPM.revealWords = revealWords;

  if (motion) {
    gsap.to('.brand img', { opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: .1 });

    document.querySelectorAll('[data-split]:not([data-split="hero"])').forEach(function (el) {
      revealWords(el, { scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });

    ScrollTrigger.batch('[data-reveal]:not([data-reveal="mask"])', {
      start: 'top 90%', once: true,
      onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .08 }); }
    });
    document.querySelectorAll('[data-reveal="mask"]').forEach(function (el) {
      gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      var img = el.querySelector('img');
      if (img) gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
    // Contatori numerici
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var to = parseFloat(el.getAttribute('data-count'));
      if (!isFinite(to)) return;
      var from = to > 1000 ? to - 45 : 0;
      var obj = { v: from };
      el.textContent = String(Math.round(from));
      gsap.to(obj, {
        v: to, duration: to > 1000 ? 1.6 : 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: function () { el.textContent = String(Math.round(obj.v)); }
      });
    });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* ---------- Modulo preventivo: validazione + antispam ---------- */
  var params = new URLSearchParams(location.search);
  document.querySelectorAll('[data-form]').forEach(function (form) {
    var t0 = form.querySelector('input[name="t0"]');
    if (t0) t0.value = String(Date.now());
    var pre = params.get('servizio');
    var sel = form.querySelector('select[name="servizio"]');
    if (pre && sel) Array.prototype.forEach.call(sel.options, function (o) { if (o.text === pre) sel.value = o.text; });

    var status = form.querySelector('.qform-status');
    var rules = {
      nome: function (v) { return v.trim().length >= 2; },
      azienda: function (v) { return v.trim().length >= 2; },
      citta: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      messaggio: function (v) { return v.trim().length >= 10; },
      privacy: function (v, el) { return el.checked; }
    };
    function check(el) {
      var rule = rules[el.name];
      if (!rule) return true;
      var ok = rule(el.value, el);
      var err = document.getElementById(el.id + '-err');
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) { err.hidden = ok; if (!ok) el.setAttribute('aria-describedby', err.id); else el.removeAttribute('aria-describedby'); }
      return ok;
    }
    form.addEventListener('blur', function (e) { if (e.target.name && e.target.getAttribute('aria-invalid')) check(e.target); }, true);
    form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') check(e.target); });
    form.addEventListener('change', function (e) { if (e.target.type === 'checkbox') check(e.target); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll('input[name], select[name], textarea[name]');
      var firstBad = null;
      fields.forEach(function (f) { if (!check(f) && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); return; }
      var hp = form.querySelector('input[name="website"]');
      var tooFast = t0 && Date.now() - parseInt(t0.value, 10) < 3000;
      if ((hp && hp.value) || tooFast) { showStatus('Grazie, la richiesta è stata registrata.'); return; } // bot: risposta neutra
      var endpoint = form.getAttribute('data-endpoint');
      if (!endpoint) {
        showStatus('Prototipo: il modulo è valido ma non è collegato a un server. In produzione la richiesta verrà inviata a ' +
          'IPM (es. endpoint WordPress / Contact Form 7). Nel frattempo scrivi a commerciale@ipmmultiservice.it.');
        return;
      }
      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); showStatus('Grazie! Ti ricontatteremo al più presto.'); })
        .catch(function () { showStatus('Invio non riuscito. Riprova o chiama lo 039 513 469.', true); })
        .then(function () { btn.disabled = false; });
    });
    function showStatus(msg, isErr) {
      status.hidden = false; status.textContent = msg;
      status.classList.toggle('is-error', !!isErr);
    }
  });
})();
