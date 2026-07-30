/* slides the nav underline to the active link */
(function () {
  var navbar = document.querySelector('.header .navbar');
  var indicator = navbar && navbar.querySelector('.nav-indicator');
  if (!navbar || !indicator) return;

  function update() {
    // no underline on the mobile dropdown
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

  // fonts load after paint and shift link widths
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(update);
  }

  // read the current active state on load
  update();
})();
