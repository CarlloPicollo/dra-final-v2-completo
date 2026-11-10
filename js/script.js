document.addEventListener('DOMContentLoaded',()=>{
  const t=document.querySelector('.nav-toggle'), m=document.querySelector('.nav-menu');
  if(t) t.addEventListener('click',()=>m.classList.toggle('active'));

  const compare = document.getElementById('compare');
  if(compare){
    const before = compare.querySelector('.compare-before');
    const line = document.getElementById('compareLine');
    let dragging = false;
    function update(x){
      const rect = compare.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      before.style.clipPath = `inset(0 ${100-pos}% 0 0)`;
      line.style.left = pos + '%';
    }
    compare.addEventListener('mousedown', e => { dragging = true; update(e.clientX); });
    compare.addEventListener('touchstart', e => { dragging = true; update(e.touches[0].clientX); });
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('touchend', () => dragging = false);
    window.addEventListener('mousemove', e => { if(dragging) update(e.clientX); });
    window.addEventListener('touchmove', e => { if(dragging) update(e.touches[0].clientX); });
  }
});
