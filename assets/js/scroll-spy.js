/* Highlights the nav link for whichever section is in view.
   Vanilla, rAF-throttled. Emits `navspy:change` when the active
   section changes so nav-indicator.js can react without duplicating
   the section maths or depending on script execution order. */
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.navbar a[href^="#"]'));
  if (!sections.length || !links.length) return;

  var currentId = null;
  var ticking = false;

  function update() {
    ticking = false;

    var y = window.pageYOffset || document.documentElement.scrollTop;
    var found = null;

    sections.forEach(function (section) {
      var top = section.offsetTop - 200;
      if (y >= top && y < top + section.offsetHeight) found = section.id;
    });

    if (found === currentId) return;
    currentId = found;

    links.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + found);
    });

    window.dispatchEvent(new CustomEvent('navspy:change', { detail: { id: found } }));
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener('resize', update);

  update();
})();
