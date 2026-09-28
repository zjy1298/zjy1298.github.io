const root = document.documentElement;
const header = document.querySelector(".site-header");
const progress = document.querySelector(".reading-progress span");
const langButtons = document.querySelectorAll("[data-set-lang]");
const themeButton = document.querySelector(".theme-toggle");
const copyButton = document.querySelector(".copy-email");
const toast = document.querySelector(".toast");

function setLanguage(lang) {
  root.dataset.lang = lang;
  root.lang = lang === "en" ? "en" : "zh-CN";
  localStorage.setItem("lang", lang);
  langButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
  });
  document.title = lang === "en" ? "Jinyang Zhang | Academic Homepage" : "章锦阳 | 个人主页";
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.setLang));
});
setLanguage(root.dataset.lang || "zh");

themeButton.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  document.querySelector('meta[name="theme-color"]').content = next === "dark" ? "#171816" : "#f7f6f2";
});

function updateScrollUI() {
  const top = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height > 0 ? (top / height) * 100 : 0}%`;
  header.classList.toggle("scrolled", top > 8);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

let toastTimer;
copyButton.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = email;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
});

const navLinks = [...document.querySelectorAll(".site-nav a")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const active = entries.find((entry) => entry.isIntersecting);
    if (!active) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${active.target.id}`);
    });
  },
  { rootMargin: "-25% 0px -65%", threshold: 0 }
);
navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute("href"));
  if (section) sectionObserver.observe(section);
});
