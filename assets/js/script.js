/* Header behaviour: mobile menu toggle, sticky header, scroll-to-top.
   Vanilla, the site ships no runtime dependencies.
   Scroll work is throttled through requestAnimationFrame so it runs
   at most once per frame rather than on every scroll event. */
(function () {
  // Inline icons for the open/closed states (bars / times, FA 5.12.1).
  var ICON_BARS = '<svg class="icon icon-bars" viewBox="0 0 448 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>';
  var ICON_TIMES = '<svg class="icon icon-times" viewBox="0 0 352 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>';

  var menuBtn = document.getElementById('menu-btn');
  var navbar = document.querySelector('.navbar');
  var header = document.querySelector('.header');
  var scrollTopBtn = document.querySelector('.scroll-top');

  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', function () {
      var open = navbar.classList.toggle('active');
      menuBtn.innerHTML = open ? ICON_TIMES : ICON_BARS;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  function closeMenu() {
    if (!menuBtn || !navbar) return;
    if (navbar.classList.contains('active')) menuBtn.innerHTML = ICON_BARS;
    navbar.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop;

    if (header) header.classList.toggle('sticky', y > 0);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('is-visible', y > 100);
    closeMenu();

    ticking = false;
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
})();
