/* Andrea Sironi — script condiviso. Nessuna libreria esterna. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (motion) doc.classList.add('motion');

  /* ---------- eventi di conversione ----------
     Registra solo azioni, mai dati personali. Funziona solo se uno strumento
     di analisi senza cookie è stato attivato (vedi docs/growth-roadmap.md). */
  function track(name, props) {
    try {
      if (typeof window.va === 'function') window.va('event', { name: name, data: props || {} });
      if (typeof window.plausible === 'function') window.plausible(name, { props: props || {} });
    } catch (e) { /* lo strumento non è presente: nessuna azione */ }
  }
  window.asTrack = track;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var where = a.getAttribute('data-where') || location.pathname;
    if (href.indexOf('mailto:') === 0) track('click_email', { where: where });
    else if (href.indexOf('https://wa.me/') === 0) track('click_whatsapp', { where: where });
    else if (href.indexOf('tel:') === 0) track('click_phone', { where: where });
    else if (/^\/lavori\/[^/]+\/$/.test(href)) track('open_case', { slug: href.split('/')[2] });
    else if (/^\/servizi\//.test(href)) track('open_service', { path: href });
  });

  /* ---------- navigazione ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  var burger = document.querySelector('.burger');
  var sheet = document.getElementById('menu-mobile');
  if (burger && sheet) {
    var setOpen = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
      sheet.classList.toggle('open', open);
      sheet.toggleAttribute('inert', !open);
      document.body.classList.toggle('menu-open', open);
      if (open) { var first = sheet.querySelector('a'); if (first) first.focus(); }
    };
    sheet.setAttribute('inert', '');
    burger.addEventListener('click', function () { setOpen(burger.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setOpen(false); burger.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 900) setOpen(false); });
  }

  /* ---------- reveal ---------- */
  var rv = document.querySelectorAll('[data-rv]');
  var systems = document.querySelectorAll('.system');
  if ('IntersectionObserver' in window && motion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('lit'); io2.unobserve(en.target); }
      });
    }, { threshold: 0.3 });
    systems.forEach(function (s) { io2.observe(s); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
    systems.forEach(function (s) { s.classList.add('lit'); });
  }

  /* ---------- gallerie ---------- */
  document.querySelectorAll('[data-gal]').forEach(function (block) {
    var track_ = block.querySelector('.gal');
    var prev = block.querySelector('[data-prev]');
    var next = block.querySelector('[data-next]');
    if (!track_ || !prev || !next) return;
    var step = function () { var f = track_.querySelector('figure'); return f ? f.offsetWidth + 12 : 300; };
    var sync = function () {
      prev.disabled = track_.scrollLeft < 8;
      next.disabled = track_.scrollLeft > track_.scrollWidth - track_.clientWidth - 8;
    };
    var beh = motion ? 'smooth' : 'auto';
    prev.addEventListener('click', function () { track_.scrollBy({ left: -step(), behavior: beh }); });
    next.addEventListener('click', function () { track_.scrollBy({ left: step(), behavior: beh }); });
    track_.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });

  /* ---------- caroselli su telefono ----------
     Su schermi stretti alcune griglie scorrono in orizzontale (vedi .rail nel CSS).
     Qui aggiungo l'indicatore di posizione e rendo il carosello raggiungibile da tastiera. */
  var narrow = window.matchMedia('(max-width: 639px)');
  document.querySelectorAll('[data-rail]').forEach(function (rail) {
    var items = rail.children;
    if (items.length < 2) return;
    var dots = document.createElement('div');
    dots.className = 'rail-dots';
    dots.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < items.length; i++) dots.appendChild(document.createElement('i'));
    rail.parentNode.insertBefore(dots, rail.nextSibling);
    var current = -1;
    var sync = function () {
      var w = items[0].offsetWidth + 12;
      var idx = Math.min(items.length - 1, Math.round(rail.scrollLeft / w));
      if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4) idx = items.length - 1;
      if (idx === current) return;
      current = idx;
      for (var j = 0; j < dots.children.length; j++) dots.children[j].classList.toggle('on', j === idx);
    };
    var setMode = function () {
      if (narrow.matches) { rail.setAttribute('tabindex', '0'); rail.setAttribute('role', 'region'); }
      else { rail.removeAttribute('tabindex'); rail.removeAttribute('role'); }
      current = -1; sync();
    };
    rail.addEventListener('scroll', sync, { passive: true });
    if (narrow.addEventListener) narrow.addEventListener('change', setMode);
    setMode();
  });

  /* ---------- barra contatto fissa (telefono) ----------
     Compare dopo la prima schermata, sparisce quando sono già visibili i contatti o il footer. */
  var dock = document.getElementById('dock');
  if (dock && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.contact-cta, .foot, .hero .actions, .page-hero .actions');
    var visible = new Set();
    var pastHero = false;
    var update = function () {
      var on = pastHero && visible.size === 0;
      dock.classList.toggle('on', on);
      dock.setAttribute('aria-hidden', on ? 'false' : 'true');
      dock.querySelectorAll('a').forEach(function (a) { a.tabIndex = on ? 0 : -1; });
    };
    var io3 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
      update();
    });
    targets.forEach(function (t) { io3.observe(t); });
    window.addEventListener('scroll', function () {
      var p = window.scrollY > window.innerHeight * 0.6;
      if (p !== pastHero) { pastHero = p; update(); }
    }, { passive: true });
  }

  /* ---------- modulo di contatto ----------
     1. Prova l'invio al server (/api/contact).
     2. Se il servizio di invio non è configurato o non risponde, NON mostra un falso successo:
        prepara l'email (o il messaggio WhatsApp) già compilata e lo dice chiaramente. */
  var form = document.getElementById('contact-form');
  if (form) {
    var started = Date.now();
    var status = document.getElementById('form-status');
    var submit = form.querySelector('button[type="submit"]');
    var EMAIL = form.getAttribute('data-email');
    var WA = form.getAttribute('data-wa');

    var fields = {
      name: { el: form.elements.name, msg: 'Scrivi il tuo nome.' },
      email: { el: form.elements.email, msg: 'Controlla l\'indirizzo email: sembra incompleto.' },
      type: { el: form.elements.type, msg: 'Scegli il tipo di progetto, anche "Non lo so ancora".' },
      message: { el: form.elements.message, msg: 'Raccontami in qualche riga di cosa hai bisogno (almeno 20 caratteri).' },
      privacy: { el: form.elements.privacy, msg: 'Serve il consenso al trattamento dei dati per poterti rispondere.' }
    };
    var valid = function (k) {
      var el = fields[k].el;
      if (k === 'privacy') return el.checked;
      var v = (el.value || '').trim();
      if (k === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (k === 'message') return v.length >= 20;
      return v.length > 0;
    };
    var show = function (k, ok) {
      var el = fields[k].el;
      var err = document.getElementById('err-' + k);
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) err.textContent = ok ? '' : fields[k].msg;
    };
    Object.keys(fields).forEach(function (k) {
      var el = fields[k].el;
      el.addEventListener(k === 'privacy' || k === 'type' ? 'change' : 'blur', function () {
        if (el.getAttribute('aria-invalid') === 'true' || (el.value && k !== 'privacy')) show(k, valid(k));
      });
      // l'errore sparisce mentre si scrive: niente spostamenti di layout al cambio di campo
      el.addEventListener('input', function () {
        if (el.getAttribute('aria-invalid') === 'true' && valid(k)) show(k, true);
      });
    });

    var setStatus = function (kind, html) {
      status.setAttribute('data-kind', kind);
      status.innerHTML = html;
      status.focus();
    };
    var compose = function (d) {
      var lines = [
        'Ciao Andrea,', '',
        d.message, '',
        '— ' + d.name + (d.company ? ' (' + d.company + ')' : ''),
        'Tipo di progetto: ' + d.type,
        d.budget ? 'Investimento indicativo: ' + d.budget : '',
        'Email: ' + d.email
      ].filter(function (l, i, a) { return !(l === '' && a[i - 1] === ''); });
      return lines.join('\n');
    };
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

    var fallback = function (d) {
      var body = compose(d);
      var subject = 'Nuovo progetto — ' + d.type + (d.company ? ' — ' + d.company : '');
      var mailto = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var wa = WA + '?text=' + encodeURIComponent(body);
      setStatus('info',
        '<b>Il messaggio non è ancora stato inviato.</b> L\'invio automatico non è disponibile in questo momento: ' +
        'ho preparato il testo, ti basta un tocco per mandarlo da email o da WhatsApp.' +
        '<div class="actions"><a class="btn btn-primary" data-where="form-fallback" href="' + esc(mailto) + '">Invia via email</a>' +
        '<a class="btn btn-ghost" data-where="form-fallback" target="_blank" rel="noopener" href="' + esc(wa) + '">Invia su WhatsApp</a></div>');
      track('contact_fallback', { type: d.type });
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(fields).forEach(function (k) {
        var ok = valid(k); show(k, ok);
        if (!ok && !firstBad) firstBad = fields[k].el;
      });
      if (firstBad) {
        setStatus('error', 'Ci sono alcuni campi da sistemare: li ho evidenziati qui sopra.');
        firstBad.focus();
        return;
      }
      var d = {
        name: form.elements.name.value.trim(),
        company: form.elements.company.value.trim(),
        email: form.elements.email.value.trim(),
        type: form.elements.type.value,
        budget: form.elements.budget.value,
        message: form.elements.message.value.trim(),
        website: form.elements.website.value, // campo trappola per i bot
        elapsed: Date.now() - started
      };
      submit.setAttribute('aria-busy', 'true');
      submit.textContent = 'Invio in corso…';
      status.removeAttribute('data-kind'); status.innerHTML = '';

      var ctrl = 'AbortController' in window ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d),
        signal: ctrl ? ctrl.signal : undefined
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, j: j }; });
      }).then(function (res) {
        if (res.status === 200 && res.j.ok) {
          form.reset();
          setStatus('ok', '<b>Messaggio inviato.</b> L\'ho ricevuto e ti rispondo all\'indirizzo ' + esc(d.email) + '. Se è urgente, scrivimi anche su WhatsApp.');
          track('contact_sent', { type: d.type });
        } else if (res.status === 400 && res.j.field && fields[res.j.field]) {
          show(res.j.field, false);
          setStatus('error', res.j.message || 'Controlla i campi evidenziati.');
        } else {
          fallback(d);
        }
      }).catch(function () {
        fallback(d);
      }).then(function () {
        clearTimeout(timer);
        submit.removeAttribute('aria-busy');
        submit.textContent = 'Invia la richiesta';
      });
    });
  }
})();
