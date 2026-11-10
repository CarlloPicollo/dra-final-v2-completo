document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', () => {
  /* Menu mobile */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('active');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* Header com sombra ao rolar */
  const header = document.querySelector('.header');
  const onScroll = () => { if (header) header.classList.toggle('scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Slider antes / depois (arrastar, toque e controle deslizante) */
  const compare = document.getElementById('compare');
  if (compare) {
    const before = compare.querySelector('.compare-before');
    const line = document.getElementById('compareLine');
    const range = document.getElementById('compareRange');
    let dragging = false;
    const setPos = (pos) => {
      pos = Math.max(0, Math.min(100, pos));
      before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      line.style.left = pos + '%';
      if (range) { range.value = pos; range.style.setProperty('--pos', pos + '%'); }
    };
    const fromX = (x) => {
      const rect = compare.getBoundingClientRect();
      setPos(((x - rect.left) / rect.width) * 100);
    };
    const start = (x) => { dragging = true; compare.classList.add('dragging'); fromX(x); };
    const stop = () => { dragging = false; compare.classList.remove('dragging'); };
    compare.addEventListener('mousedown', e => { e.preventDefault(); start(e.clientX); });
    window.addEventListener('mousemove', e => { if (dragging) fromX(e.clientX); });
    window.addEventListener('mouseup', stop);
    compare.addEventListener('touchstart', e => start(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', e => { if (dragging) fromX(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', stop);
    window.addEventListener('touchcancel', stop);
    if (range) range.addEventListener('input', () => setPos(parseFloat(range.value)));
    setPos(50);
  }

  /* Perguntas frequentes */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const open = btn.parentElement.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* Animação suave ao rolar */
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }
});
