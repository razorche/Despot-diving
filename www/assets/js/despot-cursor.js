(function () {
  'use strict';

  if (typeof window.matchMedia !== 'function') return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var FISH_SRC = 'assets/cursors/despot-fish-cursor.png';
  var HOTSPOT_X = 9;
  var HOTSPOT_Y = 16;

  document.documentElement.classList.add('despot-custom-cursor');

  var fish = document.createElement('div');
  fish.id = 'despot-cursor-fish';
  fish.setAttribute('aria-hidden', 'true');
  fish.innerHTML =
    '<img src="' +
    FISH_SRC +
    '" alt="" width="32" height="32" draggable="false" decoding="async">';
  document.body.appendChild(fish);

  var img = fish.querySelector('img');
  var visible = true;
  var px = window.innerWidth / 2;
  var py = window.innerHeight / 2;
  var tx = px;
  var ty = py;
  var raf = 0;

  function paint() {
    raf = 0;
    px += (tx - px) * 0.35;
    py += (ty - py) * 0.35;
    fish.style.transform =
      'translate3d(' + (px - HOTSPOT_X) + 'px,' + (py - HOTSPOT_Y) + 'px,0)';
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(paint);
  }

  document.addEventListener(
    'mousemove',
    function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        fish.classList.remove('is-hidden');
      }
      var dx = e.movementX || 0;
      if (Math.abs(dx) > 0.1) {
        img.style.transform = dx > 0 ? 'scaleX(-1)' : 'scaleX(1)';
      }
      schedule();
    },
    { passive: true },
  );

  document.addEventListener('mouseleave', function () {
    visible = false;
    fish.classList.add('is-hidden');
  });

  document.addEventListener('mouseover', function (e) {
    var interactive = e.target.closest(
      'a, button, input, textarea, select, label, [role="button"], .theme-btn, .sidebar__toggle',
    );
    fish.classList.toggle('is-pointer', !!interactive);
  });

  paint();
})();
