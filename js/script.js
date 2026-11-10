document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-menu').classList.toggle('active');
});

const compare = document.getElementById('compare');
const line = document.getElementById('compareLine');
const before = document.querySelector('.compare-before');
if (compare && line && before) {
  let isDragging = false;
  const update = (x) => {
    const rect = compare.getBoundingClientRect();
    let pos = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    line.style.left = pos + '%';
    before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
  };
  line.addEventListener('mousedown', () => isDragging = true);
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('mousemove', (e) => { if (isDragging) update(e.clientX); });
  compare.addEventListener('click', (e) => update(e.clientX));
  line.addEventListener('touchstart', () => isDragging = true, {passive:true});
  document.addEventListener('touchend', () => isDragging = false);
  document.addEventListener('touchmove', (e) => { if (isDragging) update(e.touches[0].clientX); }, {passive:true});
}
