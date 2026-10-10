// Свечение за курсором
let mx = 50, my = 50;
document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});

// Spotlight на карточках
function bindSpotlight(){
  document.querySelectorAll('.card').forEach(el => {
    if(el._spot) return;
    el._spot = true;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--sy', (e.clientY - r.top) + 'px');
    });
  });
}

// Копирование кода
function bindCopy(){
  document.querySelectorAll('.code-copy').forEach(btn => {
    if(btn._bound) return;
    btn._bound = true;
    btn.onclick = async () => {
      const block = btn.closest('.code-block');
      const code = block.querySelector('code').innerText;
      try { await navigator.clipboard.writeText(code); } catch(e){}
      btn.classList.add('copied');
      const old = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>Скопировано';
      showToast('Код скопирован');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = old;
      }, 1500);
    };
  });
}

// Тост
let toastTimer;
function showToast(text){
  const toast = document.getElementById('toast');
  if(!toast) return;
  document.getElementById('toastText').textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  bindSpotlight();
  bindCopy();
});