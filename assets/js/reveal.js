/* Fade-and-rise on scroll, 400ms, 16px travel, 60ms stagger.
   Travel/opacity live in CSS (.reveal); this only toggles
   .is-visible and applies the per-group stagger. Disabled for
   reduced-motion users (they never get .has-reveal, and we reveal
   everything immediately below). */
(function () {
  // Signals to the failsafe in <head> that this script ran. Without it,
  // a failed load would leave every .reveal element hidden forever.
  document.documentElement.classList.add('reveal-ready');

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!items.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;

      // Stagger relative to the reveal siblings in the same container.
      var group = Array.prototype.filter.call(el.parentNode.children, function (c) {
        return c.classList.contains('reveal');
      });
      var idx = group.indexOf(el);
      el.style.transitionDelay = (idx > 0 ? idx * 60 : 0) + 'ms';

      el.classList.add('is-visible');
      obs.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el) { io.observe(el); });
})();
