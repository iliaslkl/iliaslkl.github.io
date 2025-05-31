const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

// Minimal translation dictionary (expand as needed)
const translations = {
  en: {
    menu: "menu",
    home: "Home",
    projects: "Projects",
    skills: "My Toolkit",
    contact: "Contact",
    greeting: "Hi, I'm Ilias Laoukili",
    student: "Student at ESIEE Paris",
    intro: "I am a student passionate about cybersecurity, artificial intelligence, and software development. I am proficient in Java, C++, C, Bash, Python, and the Office suite.",
    contactMe: "Contact me",
    seeProjects: "See my projects",
    javaGameTitle: "Java Video Game",
    javaGameDesc: "A text-based adventure game developed in Java as part of an academic project. This project helped me strengthen my programming fundamentals, object-oriented design, and problem-solving skills while creating an engaging interactive experience.",
    oop: "Object-Oriented Programming",
    available: "Available for internship",
    contactText: "Interested in collaborating, discussing a project, or just want to connect? Send me a message and I'll get back to you as soon as possible!",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "How can I help you?",
    send: "Send",
    explore: "Explore this project",
    darkTheme: "Dark Theme",
    footerText: "Portfolio of Ilias Laoukili.",
    templateBy: "Template by",
  },
  fr: {
    menu: "menu",
    home: "Accueil",
    projects: "Projets",
    skills: "Mes Outils",
    contact: "Contact",
    greeting: "Bonjour, je suis Ilias Laoukili",
    student: "Étudiant à l'ESIEE Paris",
    intro: "Je suis un étudiant passionné par la cybersécurité, l'intelligence artificielle et le développement logiciel. Je maîtrise Java, C++, C, Bash, Python et la suite Office.",
    contactMe: "Contactez-moi",
    seeProjects: "Voir mes projets",
    javaGameTitle: "Jeu vidéo Java",
    javaGameDesc: "Un jeu d'aventure textuel développé en Java dans le cadre d'un projet académique. Ce projet m'a permis de renforcer mes bases en programmation, la conception orientée objet et la résolution de problèmes tout en créant une expérience interactive.",
    oop: "Programmation Orientée Objet",
    available: "Disponible pour un stage",
    contactText: "Intéressé par une collaboration, discuter d'un projet ou simplement envie de me contacter ? Envoyez-moi un message et je vous répondrai dès que possible !",
    nameLabel: "Nom",
    emailLabel: "E-mail",
    messageLabel: "Comment puis-je vous aider ?",
    send: "Envoyer",
    explore: "Voir ce projet",
    darkTheme: "Thème Sombre",
    footerText: "Portfolio de Ilias Laoukili.",
    templateBy: "Template par",
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  const langFlag = document.getElementById('lang-flag');
  if (lang === 'en') {
    langFlag.src = 'assets/images/french-button.png';
    langFlag.alt = 'Français';
  } else {
    langFlag.src = 'assets/images/english-button.png';
    langFlag.alt = 'English';
  }
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.innerHTML = translations[lang][key];
  });
}

function toggleLanguage() {
  const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
  const current = localStorage.getItem('lang') || browserLang;
  setLanguage(current === 'en' ? 'fr' : 'en');
}

document.addEventListener('DOMContentLoaded', () => {
  // Language initialization
  const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
  const savedLang = localStorage.getItem('lang') || browserLang;
  setLanguage(savedLang);

  // Make the flag clickable and keyboard accessible
  const langFlag = document.getElementById('lang-flag');
  if (langFlag) {
    langFlag.addEventListener('click', toggleLanguage);
    langFlag.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleLanguage();
      }
    });
  }

  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Toggle navigation menu
const toggleNav = () => {
  nav.classList.toggle("hidden");

  // Prevent screen from scrolling when menu is opened
  document.body.classList.toggle("lock-screen");

  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    // When menu is opened after transition change text respectively
    setTimeout(() => {
      btnToggleNav.textContent = "close";
    }, 475);
  }
};

btnToggleNav.addEventListener("click", toggleNav);

navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Toggle theme and store user preferred theme for future

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// Trap the tab when menu is opened

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

// Rotating logos animation

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

yearEl.textContent = new Date().getFullYear();
