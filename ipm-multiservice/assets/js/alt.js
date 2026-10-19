/* Animazioni leggere delle homepage alternative. Senza GSAP o con "riduci movimento" tutto resta visibile. */
(function () {
  'use strict';
  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  if (!window.gsap || !window.ScrollTrigger) { root.classList.remove('motion'); return; }
  gsap.registerPlugin(ScrollTrigger);
  root.classList.add('motion-ready');

  // Comparse dal basso
  ScrollTrigger.batch('[data-up]', {
    start: 'top 92%', once: true,
    onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .08 }); }
  });

  // A — righe del titolo e strisce colore
  var lines = document.querySelectorAll('.a-title .ln > span');
  if (lines.length) gsap.to(lines, { y: 0, duration: 1.2, ease: 'power4.out', stagger: .1, delay: .15 });
  var stripes = document.querySelectorAll('.a-stripes span');
  if (stripes.length) gsap.to(stripes, { scaleY: 1, duration: 1, ease: 'expo.out', stagger: .07, delay: .7 });
  var year = document.querySelector('.a-year');
  if (year) gsap.fromTo(year, { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: year, start: 'top bottom', end: 'bottom top', scrub: true } });

  // B — i rombi ruotano leggermente con lo scroll
  var dms = document.querySelector('.b-diamonds');
  if (dms) gsap.to(dms, { rotate: 90, ease: 'none', scrollTrigger: { trigger: '.b-hero', start: 'top top', end: 'bottom top', scrub: true } });

  // C — l'arco si apre dal basso
  var arch = document.querySelector('[data-arch]');
  if (arch) {
    gsap.to(arch, { clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)', duration: 1.6, ease: 'expo.inOut', delay: .3 });
    gsap.fromTo(arch.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 2.2, ease: 'expo.out', delay: .3 });
  }
})();
