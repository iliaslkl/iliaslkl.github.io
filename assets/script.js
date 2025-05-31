/* Dark-mode toggle */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
  });
  /* Initialise icon & theme */
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
  themeBtn.textContent = root.dataset.theme === 'dark' ? '☀️' : '🌙';
}

/* Year in footer */
document.getElementById('year')?.textContent = new Date().getFullYear();

/* Active nav link */
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href') === location.pathname.split('/').pop() || (location.pathname.endsWith('/') && a.getAttribute('href') === 'index.html')) {
    a.classList.add('active');
  }
});

/* Portfolio filter */
const filterBtns = document.querySelectorAll('#filters .filter-btn');
filterBtns.forEach(btn =>
  btn.addEventListener('click', () => {
    const tag = btn.dataset.tag;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.card').forEach(card => {
      card.style.display = tag === 'all' || card.dataset.tags.includes(tag) ? 'block' : 'none';
    });
  })
);

/* AOS init */
AOS.init({ duration: 600, once: true });