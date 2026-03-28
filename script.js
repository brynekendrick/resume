/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  ring.style.left   = rx + 'px';
  ring.style.top    = ry + 'px';
  requestAnimationFrame(tick);
})();

document.querySelectorAll('a, button, .skill-tag, .tool-item, .service-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '18px';
    cursor.style.height = '18px';
    ring.style.width    = '56px';
    ring.style.height   = '56px';
    ring.style.opacity  = '.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
    ring.style.opacity  = '.6';
  });
});

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

/* ── NAV ON SCROLL ── */
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background    = 'rgba(245,240,232,0.96)';
    nav.style.backdropFilter = 'blur(14px)';
    nav.style.borderBottom  = '1px solid rgba(13,13,13,0.08)';
    nav.style.mixBlendMode  = 'normal';
  } else {
    nav.style.background    = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.borderBottom  = 'none';
    nav.style.mixBlendMode  = 'multiply';
  }
});

/* ── BEFORE / AFTER SLIDERS ── */
function initSlider(sliderId, handleId) {
  const sl = document.getElementById(sliderId);
  const h  = document.getElementById(handleId);
  if (!sl || !h) return;

  const before = sl.querySelector('.ba-before');
  let drag = false;

  function setPos(x) {
    const r = sl.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
    h.style.left = p + '%';
    before.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
  }

  h.addEventListener('mousedown', e => { drag = true; e.preventDefault(); });
  window.addEventListener('mousemove', e => { if (drag) setPos(e.clientX); });
  window.addEventListener('mouseup', () => { drag = false; });

  h.addEventListener('touchstart', e => { drag = true; e.preventDefault(); }, { passive: false });
  window.addEventListener('touchmove', e => { if (drag) setPos(e.touches[0].clientX); });
  window.addEventListener('touchend', () => { drag = false; });
}

initSlider('s1', 'h1');
initSlider('s2', 'h2');
initSlider('s3', 'h3');
initSlider('s4', 'h4');