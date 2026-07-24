/* Click-to-reveal email: the address is split across data attributes
   and only assembled in JS on click, so it never sits in the page
   source as plain text for scrapers. Swaps the button for a real
   mailto link once revealed. */
(function () {
  var trigger = document.querySelector('.reveal-email');
  if (!trigger) return;

  trigger.addEventListener('click', function () {
    var addr = trigger.dataset.u + '@' + trigger.dataset.d + '.' + trigger.dataset.t;

    var link = document.createElement('a');
    link.href = 'mailto:' + addr;
    link.className = 'contact-value';
    link.textContent = addr;

    trigger.replaceWith(link);
  }, { once: true });
})();

/* Contact form → Formspree, submitted with fetch so the visitor
   stays on the page and sees an inline success / error message. */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var label = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        status.textContent = 'Thanks, your message is on its way.';
        status.className = 'form-status is-ok';
      } else {
        return res.json().then(function (data) {
          var msg = (data && data.errors)
            ? data.errors.map(function (err) { return err.message; }).join(', ')
            : 'Something went wrong. Please email me directly.';
          status.textContent = msg;
          status.className = 'form-status is-err';
        });
      }
    }).catch(function () {
      status.textContent = 'Network error. Please email me directly.';
      status.className = 'form-status is-err';
    }).then(function () {
      btn.disabled = false;
      btn.innerHTML = label;
    });
  });
})();
