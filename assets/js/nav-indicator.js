/* Slides the nav underline to whichever link scroll-spy marked active.
   Listens for scroll-spy's `navspy:change` rather than the scroll event,
   so it only does layout work when the section actually changes.
   Hidden on mobile, where the navbar becomes a stacked dropdown panel. */
(function () {
  var navbar = document.querySelector('.header .navbar');
  var indicator = navbar && navbar.querySelector('.nav-indicator');
  if (!navbar || !indicator) return;

  function update() {
    // Mobile: the panel is a vertical dropdown, an underline makes no sense.
    if (window.innerWidth <= 768) {
      indicator.style.opacity = '0';
      return;
    }

    var active = navbar.querySelector('a.active');
    if (!active) {
      indicator.style.opacity = '0';
      return;
    }

    indicator.style.width = active.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + active.offsetLeft + 'px)';
    indicator.style.opacity = '1';
  }

  window.addEventListener('navspy:change', update);
  window.addEventListener('resize', update);
  window.addEventListener('load', update);

  // Webfonts land after first paint and change link widths.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(update);
  }

  // scroll-spy runs its first pass before this file is parsed, so read
  // the current .active state directly rather than waiting for an event.
  update();
})();
