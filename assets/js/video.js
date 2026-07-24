/* Play/pause toggle for the PlatOS promo video. Keeps the button
   icon and labels in sync with the actual playback state, and
   respects prefers-reduced-motion by not autoplaying. */
(function () {
  var video = document.getElementById('platos-video');
  var toggle = document.getElementById('platos-toggle');
  if (!video || !toggle) return;

  // Inline icons for the play/pause states (FA 5.12.1).
  var ICON_PLAY = '<svg class="icon icon-play" viewBox="0 0 448 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>';
  var ICON_PAUSE = '<svg class="icon icon-pause" viewBox="0 0 448 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/></svg>';

  function sync() {
    var paused = video.paused;
    toggle.innerHTML = paused ? ICON_PLAY : ICON_PAUSE;
    toggle.setAttribute('aria-label', paused ? 'Play video' : 'Pause video');
    toggle.setAttribute('aria-pressed', String(!paused));
  }

  toggle.addEventListener('click', function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);

  // Don't autoplay for people who asked for reduced motion.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.pause();
  }

  sync();
})();
