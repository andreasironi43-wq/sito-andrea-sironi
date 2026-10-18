/* IPM Multiservice — storytelling della homepage (GSAP + ScrollTrigger).
   Nessuno scroll hijacking: ogni animazione segue lo scroll nativo.
   Senza JS o con "riduci movimento" le sezioni restano statiche e complete. */
(function () {
  'use strict';
  if (!window.IPM || !window.IPM.motion) return;
  var mm = gsap.matchMedia();
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 01 · Hero: ingresso cinematico ---------- */
  var hero = $('[data-hero]');
  if (hero) {
    var media = $('[data-hero-media]', hero);
    var title = $('[data-split="hero"]', hero);
    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(media, { scale: 1.14, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4, ease: 'expo.out' }, 0)
      .fromTo($$('.guide-v', hero), { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: 'expo.inOut', stagger: .12 }, .1)
      .to($$('.hero .ckey i'), { scaleX: 1, duration: .5, stagger: .07, ease: 'power2.out' }, .35)
      .to($$('[data-hero-fade]', hero).slice(0, 1), { opacity: 1, y: 0, duration: .9 }, .3)
      .add(window.IPM.revealWords(title, { duration: 1.2, stagger: .07 }), .45)
      .to($$('[data-hero-fade]', hero).slice(1), { opacity: 1, y: 0, duration: 1, stagger: .12 }, 1.0);

    // In uscita la visual si restringe in una "cornice" e il testo sale: transizione verso il capitolo 02
    gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
      .to(media, { clipPath: 'inset(0% 4% 12% 4%)', scale: .96, ease: 'none' }, 0)
      .to($('.hero-content', hero), { yPercent: -18, opacity: 0, ease: 'none' }, 0)
      .to($('.hero-meta', hero), { opacity: 0, ease: 'none' }, 0);
  }

  /* ---------- 02 · Il mondo industriale: scene che si svelano con lo scroll ---------- */
  var statement = $('[data-words]');
  if (statement) {
    gsap.to($$('[data-w]', statement), {
      opacity: 1, stagger: .1, ease: 'none',
      scrollTrigger: { trigger: statement, start: 'top 82%', end: 'bottom 45%', scrub: true }
    });
  }
  var stage = $('[data-world]');
  if (stage) {
    var scenes = $$('[data-scene]', stage);
    var items = $$('[data-world-item]', stage);
    var counter = $('[data-world-n]', stage);
    var barEl = $('[data-world-bar]', stage);
    var current = -1;
    var setScene = function (i) {
      if (i === current) return;
      current = i;
      items.forEach(function (el, k) { el.classList.toggle('is-active', k === i); });
      if (counter) counter.textContent = String(i + 1).padStart(2, '0');
    };
    setScene(0);
    var wtl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage, start: 'top top', end: 'bottom bottom', scrub: .6,
        onUpdate: function (self) {
          var n = scenes.length;
          setScene(Math.min(n - 1, Math.floor(self.progress * n * 0.999 + 0.12)));
          if (barEl) barEl.style.transform = 'scaleX(' + self.progress.toFixed(4) + ')';
        }
      }
    });
    // Prima scena: da dettaglio ravvicinato a panoramica
    wtl.fromTo($('img', scenes[0]), { scale: 1.3 }, { scale: 1, duration: 1 }, 0);
    scenes.slice(1).forEach(function (sc, k) {
      var at = k + 1;
      wtl.to(sc, { clipPath: 'inset(0% 0% 0% 0%)', duration: .7, ease: 'power2.inOut' }, at - .35)
         .fromTo($('img', sc), { scale: 1.35 }, { scale: 1, duration: 1.2 }, at - .35)
         .to($('img', scenes[k]), { scale: .94, opacity: .5, duration: .7 }, at - .35);
    });
  }

  /* ---------- 03 · Servizi: pannello sticky che cambia con l'area attiva ---------- */
  var explorer = $('[data-explorer]');
  if (explorer) {
    var exItems = $$('[data-ex-item]', explorer);
    var exImgs = $$('[data-ex-img]', explorer);
    var exTicks = $$('[data-ex-tick]', explorer);
    var exNum = $('[data-ex-num]', explorer);
    var active = 0;
    var setArea = function (i) {
      if (i === active && exItems[i].classList.contains('is-active')) return;
      exImgs.forEach(function (el, k) { el.classList.toggle('was-active', k === active && k !== i); el.classList.toggle('is-active', k === i); });
      exItems.forEach(function (el, k) { el.classList.toggle('is-active', k === i); });
      exTicks.forEach(function (el, k) { el.classList.toggle('is-active', k <= i); });
      if (exNum) {
        gsap.fromTo(exNum, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .7, ease: 'power3.out' });
        exNum.textContent = String(i + 1).padStart(2, '0');
      }
      active = i;
    };
    mm.add('(min-width: 1000px)', function () {
      exItems[0].classList.add('is-active');
      exItems.forEach(function (item, i) {
        ScrollTrigger.create({
          trigger: item, start: 'top 55%', end: 'bottom 55%',
          onToggle: function (self) { if (self.isActive) setArea(i); }
        });
      });
      return function () { exItems.forEach(function (el) { el.classList.remove('is-active'); }); };
    });
  }

  /* ---------- 04 · Metodo: la linea di avanzamento si estende ---------- */
  var steps = $('[data-steps]');
  if (steps) {
    var fill = $('[data-steps-fill]', steps);
    var stepEls = $$('[data-step]', steps);
    mm.add({ desk: '(min-width: 900px)', mob: '(max-width: 899px)' }, function (ctx) {
      var prop = ctx.conditions.desk ? 'scaleX' : 'scaleY';
      var from = {}; from[prop] = 0;
      var to = { ease: 'none', scrollTrigger: {
        trigger: steps, start: ctx.conditions.desk ? 'top 70%' : 'top 75%', end: ctx.conditions.desk ? 'bottom 55%' : 'bottom 60%', scrub: .4,
        onUpdate: function (self) {
          stepEls.forEach(function (el, k) { el.classList.toggle('is-on', self.progress >= (k / stepEls.length) + .02); });
        }
      } };
      to[prop] = 1;
      gsap.fromTo(fill, from, to);
      gsap.fromTo(stepEls, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .14,
        scrollTrigger: { trigger: steps, start: 'top 78%', once: true }
      });
    });
  }

  /* ---------- 05 · Esperienza: cronologia orizzontale guidata dallo scroll (desktop) ---------- */
  var trackWrap = $('[data-htrack-wrap]');
  var track = $('[data-htrack]');
  if (trackWrap && track) {
    mm.add('(min-width: 900px)', function () {
      trackWrap.classList.add('is-pinned');
      var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
      gsap.to(track, {
        x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: { trigger: trackWrap, start: 'center 55%', end: function () { return '+=' + dist(); }, pin: true, scrub: .5, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      gsap.fromTo($$('.hstop-rule', track), { scaleX: 0, transformOrigin: 'left' }, {
        scaleX: 1, duration: 1, ease: 'expo.out', stagger: .08,
        scrollTrigger: { trigger: trackWrap, start: 'top 80%', once: true }
      });
      return function () { trackWrap.classList.remove('is-pinned'); };
    });
  }

  /* ---------- 06 · Progetti: leggera profondità sulle immagini ---------- */
  mm.add('(min-width: 800px)', function () {
    $$('[data-case] .ph img').forEach(function (img) {
      gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: img.closest('[data-case]'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  });
})();
