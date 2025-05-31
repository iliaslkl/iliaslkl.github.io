const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll('nav a');
function highlightNav() {
  const path = window.location.pathname.split('/').pop();
  navLinks.forEach(l=>{
    const href = l.getAttribute('href');
    l.classList.toggle('active', href === path);
  });
}
highlightNav();

const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const stored = localStorage.getItem('theme');
if (stored) root.setAttribute('data-theme', stored);

function setIcon() {
  toggleBtn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
}
setIcon();

toggleBtn?.addEventListener('click', ()=>{
  const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  setIcon();
});

AOS.init({ duration: 600, once: true });
