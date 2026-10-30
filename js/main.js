/**
 * Portfólio João Vítor Alves
 * 1. Entrada da abertura (título sobe, capas abrem em leque).
 * 2. Troca de tema: cada seção com data-theme pinta a página com as cores
 *    do projeto enquanto está no meio da tela.
 * 3. Prévia das páginas: a captura rola dentro da janela no hover.
 * 4. Rolagem suave nas âncoras e link ativo no menu.
 */
const { gsap, ScrollTrigger, ScrollToPlugin } = window;
const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const THEMES = {
  base:     { bg: "#F2F2F0", ink: "#14161A", muted: "#565A62", line: "#CFD0CC", surface: "#E6E6E3", accent: "#2443E0", accentInk: "#FFFFFF" },
  regina:   { bg: "#FBF4E4", ink: "#2E2B28", muted: "#6B6158", line: "#E6D6B6", surface: "#F3E6CB", accent: "#B8462F", accentInk: "#FFFFFF" },
  navalha:  { bg: "#000000", ink: "#F2F2F2", muted: "#A6A6A6", line: "#2A2A2A", surface: "#141414", accent: "#E0241B", accentInk: "#FFFFFF" },
  corredor: { bg: "#0B1622", ink: "#E7EDF3", muted: "#A7B6C4", line: "#26384A", surface: "#122232", accent: "#2E5B80", accentInk: "#FFFFFF" },
  contato:  { bg: "#14161A", ink: "#F2F2F0", muted: "#A3A7AE", line: "#2C2F35", surface: "#1E2126", accent: "#3D5BFF", accentInk: "#FFFFFF" },
};

/* ---------- 2. troca de tema ---------- */
let current = "base";
const themeMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(name) {
  if (name === current || !THEMES[name]) return;
  current = name;
  const t = THEMES[name];
  const vars = {
    "--bg": t.bg, "--ink": t.ink, "--muted": t.muted, "--line": t.line,
    "--surface": t.surface, "--accent": t.accent, "--accent-ink": t.accentInk,
  };
  if (reduce || !gsap) Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  else gsap.to(root, { ...vars, duration: 0.7, ease: "power2.inOut", overwrite: true });
  themeMeta && themeMeta.setAttribute("content", t.bg);
}

function initThemes() {
  document.querySelectorAll("[data-theme]").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 55%",
      onEnter: () => applyTheme(el.dataset.theme),
      onEnterBack: () => applyTheme(el.dataset.theme),
    });
  });
}

/* ---------- 1. entrada ---------- */
function intro() {
  const fan = document.querySelector(".fan");
  if (reduce) return;
  fan.classList.add("is-entering");
  gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
    .to(".hero__title .line > span", { y: 0, duration: 1.2, stagger: 0.1 })
    .to(".hero__where", { opacity: 1, duration: 0.6 }, 0.2)
    .to([".hero__lead", ".hero__actions"], { opacity: 1, duration: 0.8, stagger: 0.1 }, 0.45)
    .fromTo(".fan__card", { opacity: 0, "--lift": "90px" }, {
      opacity: 1, "--lift": "0px", duration: 1.3, stagger: 0.12,
      onComplete: () => fan.classList.remove("is-entering"),
    }, 0.35);
}

/* ---------- 3. prévia das páginas ---------- */
function initPreviews() {
  const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!hover) return; // no toque, a janela rola nativamente
  document.querySelectorAll("[data-scroll-preview]").forEach((fig) => {
    const view = fig.querySelector(".browser__view");
    const img = view.querySelector("img");
    let tween;
    const distance = () => Math.max(0, img.offsetHeight - view.clientHeight);
    const down = () => {
      const d = distance();
      tween && tween.kill();
      tween = gsap.to(img, { y: -d, duration: reduce ? 0 : d / 520, ease: "power1.inOut" });
    };
    const up = () => {
      tween && tween.kill();
      tween = gsap.to(img, { y: 0, duration: reduce ? 0 : 0.9, ease: "power3.out" });
    };
    view.addEventListener("pointerenter", down);
    view.addEventListener("pointerleave", up);
    view.addEventListener("focus", down);
    view.addEventListener("blur", up);
    // roda do mouse dentro da janela também anda pela página
    view.addEventListener("wheel", (e) => {
      const d = distance();
      const y = gsap.getProperty(img, "y");
      const next = Math.min(0, Math.max(-d, y - e.deltaY));
      if (next === y) return; // chegou ao fim: deixa a página rolar
      e.preventDefault();
      tween && tween.kill();
      tween = gsap.to(img, { y: next, duration: 0.4, ease: "power2.out" });
    }, { passive: false });
  });
}

/* ---------- 4. âncoras e menu ---------- */
function initAnchors() {
  const headerH = () => document.getElementById("header").offsetHeight;
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    gsap.to(window, {
      scrollTo: { y: id === "#topo" ? 0 : target, offsetY: headerH(), autoKill: true },
      duration: reduce ? 0 : 1.1,
      ease: "power3.inOut",
      onComplete: () => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      },
    });
  });

  document.querySelectorAll(".header__nav a").forEach((link) => {
    const sec = document.querySelector(link.getAttribute("href"));
    ScrollTrigger.create({
      trigger: sec, start: "top 50%", end: "bottom 50%",
      onToggle: (self) => self.isActive ? link.setAttribute("aria-current", "true") : link.removeAttribute("aria-current"),
    });
  });
}

function start() {
  if (!gsap) { root.classList.remove("js"); return; }
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  intro();
  initThemes();
  initPreviews();
  initAnchors();
  // imagens com lazy load mudam a altura: recalcula os gatilhos
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

start();
