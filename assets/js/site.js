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

  /* ---------- comparse allo scorrimento ----------
     Ogni sezione (tranne aperture, Metodo e "Perché nel tempo", che hanno la loro
     animazione) compare quando entra nello schermo: prima il titolo, poi immagini,
     poi testi, in una sequenza breve. Una volta sola; lo scorrimento resta normale.
     Sicurezza: si nasconde qualcosa solo se tutto è pronto (classe .sr sull'html);
     senza JavaScript, con errori o con movimento ridotto il contenuto è subito visibile.
     Le sezioni già visibili all'apertura non vengono nascoste. */
  var systems = document.querySelectorAll('.system');
  if ('IntersectionObserver' in window && motion) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('lit'); io2.unobserve(en.target); }
      });
    }, { threshold: 0.3 });
    systems.forEach(function (s) { io2.observe(s); });
  } else {
    systems.forEach(function (s) { s.classList.add('lit'); });
  }

  (function () {
    if (!motion || !('IntersectionObserver' in window)) return;
    try {
      var narrow = window.matchMedia('(max-width: 699px)').matches;
      var SKIP_SEC = '.hero,.page-hero,.a-hero,.method,.story,.mq-wrap';
      var CARD = 'a,li,form,details,blockquote,table,figure,dl,.soft,.glass,.glass-lite,.btn,.actions,.faq';
      var MEDIA = 'figure,picture,img,video,.ph,.lp-pair,.lp-single,.ck-photos,.gal,[data-gal]';
      var vh = window.innerHeight;
      var visible = function (el) {
        if (el.matches('.orb,script,style,template,[aria-hidden="true"],[data-dots],.rail,.marquee')) return false;
        return el.getClientRects().length > 0;
      };
      var units = function (sec) {
        var head = null, lab = sec.getAttribute('aria-labelledby');
        if (lab) head = document.getElementById(lab);
        if (!head || !sec.contains(head)) head = sec.querySelector('h2,h3');
        var out = [];
        var walk = function (el, depth) {
          var kids = [].filter.call(el.children, visible);
          kids.forEach(function (k) {
            if (head && k !== head && k.contains(head) && depth < 6) { walk(k, depth + 1); return; }
            // griglia di elementi uguali (schede, domande, passi): ciascuno in sequenza
            var gk = [].filter.call(k.children, visible);
            if (!k.matches(CARD) && gk.length > 1 && depth < 6 && gk.every(function (g) { return g.tagName === gk[0].tagName && g.className === gk[0].className; })) {
              gk.forEach(function (g) { out.push(g); }); return;
            }
            if (!k.matches(CARD) && !k.textContent.trim() && !k.querySelector('img,video,picture')) return;
            out.push(k);
          });
        };
        walk(sec, 0);
        return out.map(function (u, i) {
          var cat = 2;
          if (u === head || u.matches('h1,h2,h3,h4')) cat = 0;
          else if (head && u.matches('.label,.tag,.a-eyebrow') && (u.compareDocumentPosition(head) & Node.DOCUMENT_POSITION_FOLLOWING)) cat = 0;
          else if (u.matches(MEDIA) || u.querySelector('img,video,picture')) cat = 1;
          return { el: u, cat: cat, i: i };
        });
      };
      var STEP = narrow ? [50, 70, 50] : [80, 110, 80];
      var CAP = narrow ? 350 : 700;
      var play = function (list) {
        list.sort(function (a, b) { return a.cat - b.cat || a.i - b.i; });
        var t = 0;
        list.forEach(function (u) {
          var el = u.el;
          el.style.setProperty('--sd', Math.min(t, CAP) + 'ms');
          t += STEP[u.cat];
          el.classList.add('sr-in');
          // a comparsa finita l'elemento torna esattamente com'era (stili e transizioni propri)
          setTimeout(function () { el.classList.remove('sr-i', 'sr-px', 'sr-in'); el.style.removeProperty('--sd'); }, Math.min(t, CAP) + 1100);
        });
      };
      var single = new IntersectionObserver(function (entries) {
        var batch = [];
        entries.forEach(function (en) {
          if (en.isIntersecting) { single.unobserve(en.target); batch.push(en.target.__sr); }
        });
        if (batch.length) play(batch);
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      var secIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          secIO.unobserve(en.target);
          var h = window.innerHeight, now = [];
          en.target.__srUnits.forEach(function (u) {
            if (u.el.getBoundingClientRect().top < h * 1.15) { single.unobserve(u.el); now.push(u); }
          });
          if (now.length) play(now);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

      var sections = [].filter.call(document.querySelectorAll('main section, main > div.insight'), function (s) {
        return !s.matches(SKIP_SEC) && !s.closest(SKIP_SEC.split(',').map(function (x) { return x + ' *'; }).join(','))
          && s.getBoundingClientRect().bottom > vh; // sezioni del tutto visibili all'apertura: ferme
      });
      var all = [];
      sections.forEach(function (sec) {
        if (sec.parentElement.closest('main section')) return; // solo sezioni di primo livello
        var list = units(sec);
        // ciò che è già sullo schermo all'apertura non viene mai nascosto
        list = list.filter(function (u) { return u.el.getBoundingClientRect().top > vh; });
        if (!list.length) return;
        sec.__srUnits = list;
        list.forEach(function (u) {
          u.el.__sr = u;
          all.push(u.el);
        });
      });
      all.forEach(function (el) {
        el.classList.add('sr-i');
        if (el.matches('[data-px],[data-px-x],[data-px-s]')) el.classList.add('sr-px');
        single.observe(el);
      });
      sections.forEach(function (sec) { if (sec.__srUnits) secIO.observe(sec); });
      doc.classList.add('sr');
      // stampa: tutto visibile
      window.addEventListener('beforeprint', function () { doc.classList.remove('sr'); });
    } catch (e) {
      doc.classList.remove('sr');
    }
  })();

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

  /* ---------- parallasse ----------
     [data-px="v"]       spostamento verticale: v × metà altezza schermo, in base alla posizione
     [data-px-x="v"]     spostamento orizzontale (stessa scala): gli elementi scivolano dai lati
     [data-px-r="gradi"] rotazione leggera
     [data-px-o="v"]     dissolvenza mentre l'elemento sale oltre il centro
     [data-px-s="v"]     l'elemento cresce fino alla sua misura piena al centro dello schermo
     [data-px-img]       l'immagine scorre dentro la sua cornice (±9%)
     [data-marquee="d"]  riga di testo che scorre in orizzontale, d = direzione
     Si misura sempre il genitore, che non viene trasformato. Un solo ciclo rAF,
     solo per gli elementi visibili; niente di tutto questo con movimento ridotto. */
  if (motion) {
    var items = [];
    document.querySelectorAll('[data-px],[data-px-x],[data-px-s],[data-px-img],[data-marquee]').forEach(function (el) {
      var num = function (a) { return parseFloat(el.getAttribute(a)) || 0; };
      items.push({
        el: el, ref: el.parentElement, on: false,
        img: el.hasAttribute('data-px-img'), mq: el.hasAttribute('data-marquee') ? num('data-marquee') : null,
        y: num('data-px'), x: num('data-px-x'), r: num('data-px-r'), o: num('data-px-o'), s: num('data-px-s')
      });
    });
    var k = 1;
    var setK = function () { k = window.innerWidth < 640 ? 0.75 : 1; };
    // altezza dello schermo "ferma": si aggiorna solo se cambia la larghezza (rotazione)
    // o se l'altezza cambia molto, non quando la barra di Safari si allarga o si stringe
    var stableVh = window.innerHeight, lastW = window.innerWidth;
    var syncVh = function () {
      if (window.innerWidth !== lastW || Math.abs(window.innerHeight - stableVh) > 160) { stableVh = window.innerHeight; lastW = window.innerWidth; }
    };
    setK();
    var ticking = false;
    var render = function () {
      ticking = false;
      var vh = stableVh, half = vh / 2;
      // 1) prima tutte le misure (una sola rilettura del layout)...
      var rects = new Map(), i, it;
      for (i = 0; i < items.length; i++) {
        it = items[i];
        if (it.on && !rects.has(it.ref)) rects.set(it.ref, it.ref.getBoundingClientRect());
      }
      // 2) ...poi tutte le scritture: niente ricalcoli forzati del layout a ogni elemento
      for (i = 0; i < items.length; i++) {
        it = items[i];
        if (!it.on) continue;
        var r = rects.get(it.ref);
        // -1 quando il riferimento entra dal basso, 0 al centro, 1 quando esce dall'alto
        var p = (half - (r.top + r.height / 2)) / (half + r.height / 2);
        p = Math.max(-1, Math.min(1, p));
        var t;
        if (it.img) t = 'translate3d(0,' + (p * r.height * 0.09).toFixed(1) + 'px,0)';
        else if (it.mq !== null) t = 'translate3d(' + (it.mq * p * 14 - 14).toFixed(2) + '%,0,0)';
        else {
          t = 'translate3d(' + (p * it.x * half * k).toFixed(1) + 'px,' + (-p * it.y * half * k).toFixed(1) + 'px,0)';
          if (it.r) t += ' rotate(' + (p * it.r).toFixed(2) + 'deg)';
          if (it.s) t += ' scale(' + (1 - Math.abs(p) * it.s).toFixed(4) + ')';
          if (it.o) it.el.style.opacity = Math.max(0, 1 - Math.max(0, p) * it.o).toFixed(3);
        }
        if (it.last !== t) { it.el.style.transform = t; it.last = t; }
      }
    };
    var request = function () { if (!ticking) { ticking = true; requestAnimationFrame(render); } };
    if ('IntersectionObserver' in window) {
      var byRef = new Map();
      items.forEach(function (it) { if (!byRef.has(it.ref)) byRef.set(it.ref, []); byRef.get(it.ref).push(it); });
      var io4 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { (byRef.get(en.target) || []).forEach(function (it) { it.on = en.isIntersecting; }); });
        request();
      }, { rootMargin: '30% 0px 30% 0px' });
      byRef.forEach(function (_, ref) { io4.observe(ref); });
    } else {
      items.forEach(function (it) { it.on = true; });
    }
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', function () {
      syncVh(); setK();
      request();
    });
    request();

    // barra di lettura
    var bar = document.querySelector('.read-progress i');
    if (bar) {
      var syncBar = function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0).toFixed(4) + ')';
      };
      window.addEventListener('scroll', function () { requestAnimationFrame(syncBar); }, { passive: true });
      syncBar();
    }
  } else {

  }

  /* ---------- Metodo: cinque fasi fissate (prototipo "Sezione Metodo, scroll v2") ----------
     Sfondo che cambia colore tra le fasi, numeri a contorno che scorrono, una parola chiave
     accesa alla volta. Lavora solo mentre la sezione è vicina allo schermo e scrive
     i colori solo quando cambiano. */
  var method = document.querySelector('[data-method]');
  if (method && motion) (function () {
    var stage = method.querySelector('.m-stage');
    var steps = [].slice.call(stage.querySelectorAll('.m-step'));
    var dots = [].slice.call(stage.querySelectorAll('.m-tl i'));
    var col = stage.querySelector('.m-col'), count = stage.querySelector('.m-count'), tl = stage.querySelector('.m-tl');
    var chips = steps.map(function (st) { return [].slice.call(st.querySelectorAll('.m-chips span')); });
    var N = steps.length;
    var clamp = function (v, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a || 0, v)); };
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    var bgs = [].slice.call(stage.querySelectorAll('.m-bg i'));
    var last = {}, busy = false;
    var set = function (el, prop, val) { var key = prop + (el === stage ? 's' : 't'); if (last[key] !== val) { last[key] = val; el.style.setProperty(prop, val); } };
    function frame() {
      busy = false;
      var r = method.getBoundingClientRect();
      // lontana dallo schermo: niente da aggiornare
      if (r.bottom < -window.innerHeight || r.top > window.innerHeight * 2) return;
      var p = clamp(-r.top / (method.offsetHeight - window.innerHeight));
      var f = p * (N - 0.001), i = Math.floor(f), t = f - i;
      var k = i < N - 1 ? ease(clamp((t - 0.75) / 0.25)) : 0, j = Math.min(N - 1, i + 1);
      // sfondo: la fase attuale piena, la successiva che compare in dissolvenza sopra
      for (var b = 0; b < bgs.length; b++) {
        var op = b === i ? 1 : (b === j && j !== i ? k : 0);
        var ov = op.toFixed(3);
        if (bgs[b].__o !== ov) { bgs[b].__o = ov; bgs[b].style.opacity = ov; }
      }
      set(tl, '--p', p.toFixed(4));
      dots.forEach(function (d, n) { d.classList.toggle('on', n <= i); });
      var numH = col.parentNode.offsetHeight || 84;
      col.style.transform = 'translate3d(0,' + (-(i + k) * numH).toFixed(1) + 'px,0)';
      var label = '0' + (i + 1) + ' / 0' + N;
      if (count.textContent !== label) count.textContent = label;
      steps.forEach(function (el, n) {
        var u = f - n;
        var inA = n === 0 ? 1 : ease(clamp((u + 0.1) / 0.22)), out = n === N - 1 ? 0 : ease(clamp((u - 0.76) / 0.2));
        var o = inA * (1 - out);
        el.style.opacity = o.toFixed(3);
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
        el.style.transform = 'translate3d(0,' + ((1 - inA) * 50 - out * 40).toFixed(1) + 'px,0)';
        // una parola chiave accesa alla volta, scandita dallo scorrimento
        var cs = chips[n], a = Math.min(cs.length - 1, Math.floor(clamp((u - 0.05) / 0.7) * cs.length));
        cs.forEach(function (c, m) { c.classList.toggle('on', n === i && m === a); });
      });
    }
    // aggiornata a ogni scorrimento (anche dopo un salto da lontano: niente fotogrammi vecchi)
    var req = function () { if (!busy) { busy = true; requestAnimationFrame(frame); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(req);
    frame();
  })();

  /* "Perché nel tempo": i pallini si accendono in sequenza quando la lista entra nello schermo */
  document.querySelectorAll('[data-dots]').forEach(function (list) {
    if (!motion || !('IntersectionObserver' in window)) { list.classList.add('play'); return; }
    var io5 = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { list.classList.add('play'); io5.disconnect(); }
    }, { threshold: 0.35 });
    io5.observe(list);
  });

  /* luce che segue il cursore sulle card (solo mouse) */
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('pointermove', function (e) {
      var c = e.target.closest && e.target.closest('.glass,.card');
      if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

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
    var targets = document.querySelectorAll('.contact-cta, .foot, .hero .actions, .page-hero .actions' + (motion ? ', .m-stage' : ''));
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
  /* ---------- modulo check-up (pagine delle campagne) ----------
     Niente cookie: l'origine dell'annuncio (parametri UTM, fbclid) si legge
     dall'indirizzo, resta in sessionStorage durante la visita e parte con la richiesta.
     Se l'invio automatico non è disponibile: messaggio WhatsApp già compilato, nessun falso successo. */
  var ck = document.getElementById('checkup-form');
  if (ck) {
    var ckStarted = Date.now();
    var SRC_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
    var src = {};
    try { src = JSON.parse(sessionStorage.getItem('as_src') || '{}') || {}; } catch (e) { src = {}; }
    var qs = new URLSearchParams(location.search);
    SRC_KEYS.forEach(function (k) { var v = qs.get(k); if (v) src[k] = v.slice(0, 200); });
    if (Object.keys(src).length && !src.landed) src.landed = String(Date.now());
    try { sessionStorage.setItem('as_src', JSON.stringify(src)); } catch (e) { /* storage non disponibile */ }

    var ckStatus = document.getElementById('form-status');
    var ckSubmit = ck.querySelector('button[type="submit"]');
    var ckLabel = ckSubmit.textContent;
    var ckFields = {
      name: { el: ck.elements.name, msg: 'Scrivi il tuo nome.' },
      venue: { el: ck.elements.venue, msg: 'Scrivi il nome del locale e la città.' },
      phone: { el: ck.elements.phone, msg: 'Controlla il numero: servono almeno 8 cifre.' },
      privacy: { el: ck.elements.privacy, msg: 'Serve il consenso per poterti mandare il check-up.' }
    };
    var ckValid = function (k) {
      var el = ckFields[k].el;
      if (k === 'privacy') return el.checked;
      var v = (el.value || '').trim();
      if (k === 'phone') return /^\+?[\d\s.\-()\/]{8,24}$/.test(v) && v.replace(/\D/g, '').length >= 8;
      return v.length >= 2;
    };
    var ckShow = function (k, ok) {
      var el = ckFields[k].el;
      var err = document.getElementById('err-c-' + k);
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) err.textContent = ok ? '' : ckFields[k].msg;
    };
    Object.keys(ckFields).forEach(function (k) {
      var el = ckFields[k].el;
      el.addEventListener(k === 'privacy' ? 'change' : 'blur', function () {
        if (el.getAttribute('aria-invalid') === 'true' || (el.value && k !== 'privacy')) ckShow(k, ckValid(k));
      });
      el.addEventListener('input', function () {
        if (el.getAttribute('aria-invalid') === 'true' && ckValid(k)) ckShow(k, true);
      });
    });
    var ckEsc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var ckSet = function (kind, html) { ckStatus.setAttribute('data-kind', kind); ckStatus.innerHTML = html; ckStatus.focus(); };
    var ckFallback = function (d) {
      var text = 'Ciao Andrea, vorrei il check-up gratuito per il mio locale.\n\n' +
        'Locale: ' + d.venue + '\n' + (d.link ? 'Instagram/sito: ' + d.link + '\n' : '') + 'Nome: ' + d.name + '\nCellulare: ' + d.phone;
      var wa = ck.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
      var mail = 'mailto:' + ck.getAttribute('data-email') + '?subject=' + encodeURIComponent('Check-up — ' + d.venue) + '&body=' + encodeURIComponent(text);
      ckSet('info', '<b>La richiesta non è ancora partita.</b> L\'invio automatico non è disponibile in questo momento: ' +
        'ho preparato il messaggio, ti basta un tocco per mandarlo.' +
        '<div class="actions"><a class="btn btn-primary" data-where="ck-fallback" target="_blank" rel="noopener" href="' + ckEsc(wa) + '">Invia su WhatsApp</a>' +
        '<a class="btn btn-ghost" data-where="ck-fallback" href="' + ckEsc(mail) + '">Invia via email</a></div>');
      track('checkup_fallback', { source: src.utm_source || 'diretto' });
    };
    ck.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = null;
      Object.keys(ckFields).forEach(function (k) { var ok = ckValid(k); ckShow(k, ok); if (!ok && !bad) bad = ckFields[k].el; });
      if (bad) { ckSet('error', 'Ci sono alcuni campi da sistemare: li ho evidenziati qui sopra.'); bad.focus(); return; }
      var d = {
        form: 'checkup',
        name: ck.elements.name.value.trim(),
        venue: ck.elements.venue.value.trim(),
        phone: ck.elements.phone.value.trim(),
        link: ck.elements.link.value.trim(),
        website: ck.elements.website.value,
        elapsed: Date.now() - ckStarted,
        page: location.pathname,
        src: src
      };
      ckSubmit.setAttribute('aria-busy', 'true');
      ckSubmit.textContent = 'Invio in corso…';
      ckStatus.removeAttribute('data-kind'); ckStatus.innerHTML = '';
      var ctrl = 'AbortController' in window ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
      fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d), signal: ctrl ? ctrl.signal : undefined
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, j: j }; });
      }).then(function (res) {
        if (res.status === 200 && res.j.ok) {
          track('checkup_sent', { source: src.utm_source || 'diretto' });
          location.assign(ck.getAttribute('data-thanks'));
          return;
        } else if (res.status === 400 && res.j.field && ckFields[res.j.field]) {
          ckShow(res.j.field, false);
          ckSet('error', res.j.message || 'Controlla i campi evidenziati.');
        } else {
          ckFallback(d);
        }
      }).catch(function () { ckFallback(d); }).then(function () {
        clearTimeout(timer);
        ckSubmit.removeAttribute('aria-busy');
        ckSubmit.textContent = ckLabel;
      });
    });
  }
})();
