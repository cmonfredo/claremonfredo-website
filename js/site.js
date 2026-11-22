// Turns <div class="video" data-youtube="VIDEO_ID"> into a YouTube player.
// To add a video, paste its ID (the part after "v=" or after "youtu.be/") into data-youtube.
document.querySelectorAll('.video[data-youtube]').forEach(function (box) {
  var id = box.getAttribute('data-youtube').trim();
  if (!id) return;
  var start = box.getAttribute('data-start');
  var frame = document.createElement('iframe');
  frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
    '?rel=0' + (start ? '&start=' + parseInt(start, 10) : '');
  frame.title = box.getAttribute('data-title') || 'Video';
  frame.loading = 'lazy';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  frame.allowFullscreen = true;
  box.innerHTML = '';
  box.appendChild(frame);
});

// Turns <div class="video" data-vimeo="VIDEO_ID" data-start="42m17s"> into a Vimeo player.
document.querySelectorAll('.video[data-vimeo]').forEach(function (box) {
  var id = box.getAttribute('data-vimeo').trim();
  if (!id) return;
  var start = box.getAttribute('data-start');
  var frame = document.createElement('iframe');
  frame.src = 'https://player.vimeo.com/video/' + encodeURIComponent(id) + '?dnt=1' + (start ? '#t=' + start : '');
  frame.title = box.getAttribute('data-title') || 'Video';
  frame.loading = 'lazy';
  frame.allow = 'autoplay; fullscreen; picture-in-picture';
  frame.allowFullscreen = true;
  box.innerHTML = '';
  box.appendChild(frame);
});

// "Copy bio" buttons on the About page.
document.querySelectorAll('.copy-button[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var el = document.getElementById(btn.getAttribute('data-copy'));
    if (!el || !navigator.clipboard) return;
    navigator.clipboard.writeText(el.textContent.trim()).then(function () {
      var label = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = label; }, 1800);
    });
  });
});

// Day/night switch in the header.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var label = btn.querySelector('.theme-label');
  function sync() {
    var dark = root.getAttribute('data-theme') === 'dark';
    label.textContent = dark ? 'Day' : 'Night';
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
  sync();
})();
