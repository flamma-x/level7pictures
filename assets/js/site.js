/* ═══ Level 7 Pictures · site behaviour (loaded as a module on every page) ═══ */
import { PROJECTS, statusOf, SLOT_TEXT, timeLeft } from "/data/projects.js";

export const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Local preview only: ?now=2026-10-31 simulates a date (ignored on the live site). */
const NOW_OVERRIDE = (() => {
  if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return 0;
  const q = new URLSearchParams(location.search).get("now");
  return q ? new Date(q).getTime() - Date.now() : 0;
})();
export const now = () => Date.now() + NOW_OVERRIDE;

/* ── Launch switch: every [data-project] re-renders its [data-slot]s and countdowns from the data ── */
export function renderStatus() {
  const t = now();
  document.querySelectorAll("[data-project]").forEach((el) => {
    const p = PROJECTS[el.dataset.project]; if (!p) return;
    const s = statusOf(p, t);
    const slots = el.matches("[data-slot]") ? [el] : el.querySelectorAll("[data-slot]");
    slots.forEach((x) => { const f = SLOT_TEXT[x.dataset.slot]; if (f) x.textContent = f(p, s, t); });
    if (el.hasAttribute("data-countdown")) el.hidden = s !== "coming";
  });
}
const countdowns = [...document.querySelectorAll("[data-countdown]")];
const tick = () => {
  const t = now();
  countdowns.forEach((c) => {
    const p = PROJECTS[c.dataset.project]; if (!p) return;
    const v = timeLeft(p.premiere, t);
    c.querySelectorAll("[data-u]").forEach((b) => { b.textContent = String(v[b.dataset.u]).padStart(2, "0"); });
  });
};
let launched = statusOf(PROJECTS.obsess, now()) === "streaming";
renderStatus(); tick();
setInterval(() => {
  tick();
  if (!launched && statusOf(PROJECTS.obsess, now()) === "streaming") { launched = true; renderStatus(); } // flips live at the premiere
  else if (!launched && new Date().getSeconds() === 0) renderStatus(); // keep "N days" lines fresh
}, 1000);

/* ── Focus trap for modal dialogs: guards at both ends send Tab focus back inside, even after it has been
   inside an embedded iframe (where the browser's own modal trap no longer applies). ── */
export function trapFocus(dialog) {
  const focusables = () => [...dialog.querySelectorAll("a[href], button, iframe, [tabindex]:not([tabindex='-1']):not([data-guard])")].filter((e) => e.getClientRects().length);
  const guard = (where) => {
    const g = document.createElement("span");
    g.tabIndex = 0; g.dataset.guard = where; g.className = "sr-only";
    g.addEventListener("focus", () => { const f = focusables(); (where === "end" ? f[0] : f[f.length - 1])?.focus(); });
    return g;
  };
  dialog.prepend(guard("start")); dialog.append(guard("end"));
}

/* ── Menu: modal <dialog> (focus stays inside, Esc closes, focus returns to the ٧ button) ── */
const menu = document.getElementById("menu");
const openBtn = document.querySelector(".nav-dock .menu-btn");
if (menu && openBtn && menu.showModal) {
  trapFocus(menu);
  const open = () => {
    menu.showModal();
    document.documentElement.classList.add("menu-open");
    openBtn.setAttribute("aria-expanded", "true");
    menu.querySelector(".menu-close").focus();
  };
  const close = () => { if (menu.open) menu.close(); };
  openBtn.addEventListener("click", open);
  menu.querySelector(".menu-close").addEventListener("click", close);
  menu.addEventListener("close", () => {
    document.documentElement.classList.remove("menu-open");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.focus();
  });
  menu.querySelectorAll("a[href]").forEach((a) => a.addEventListener("click", close));
  matchMedia("(min-width: 1101px)").addEventListener("change", (e) => { if (e.matches) close(); });
}

/* ── Video that plays only while on screen (and never under reduced motion) ── */
const playWhenVisible = (v, threshold = 0.25) => {
  if (reduce || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
  }, { threshold }).observe(v);
};
document.querySelectorAll("video[data-autoplay-visible]").forEach((v) => playWhenVisible(v));

/* ── Home hero: the ٧ cycles through the titles every 3 s; footage crossfades behind it ── */
const hero = document.querySelector("[data-hero]");
if (hero) {
  const slides = JSON.parse(hero.dataset.hero);
  const layers = [...hero.querySelectorAll(".hero-layer")];
  const dots = [...hero.querySelectorAll(".hero-dot")];
  const glyph = hero.querySelector(".glyph");
  const nowText = hero.querySelector("[data-hero-now]");
  const INTERVAL = 3000;
  let cur = 0, timer = 0, hovered = false, focused = false, visible = true;

  const video = (i) => layers[i]?.querySelector("video");
  const syncVideos = () => layers.forEach((_, i) => {
    const v = video(i); if (!v) return;
    if (i === cur && !reduce && visible) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
  });
  const warm = (i) => { // fetch the next title's fill and footage before its turn
    new Image().src = slides[i].f;
    const v = video(i); if (v && !reduce && v.preload === "none") v.preload = "auto";
  };
  const show = (i) => {
    cur = (i + slides.length) % slides.length;
    glyph.style.setProperty("--fill", `url(${slides[cur].f})`);
    glyph.style.setProperty("--pos", slides[cur].p);
    layers.forEach((l, k) => l.classList.toggle("on", k === cur));
    dots.forEach((d, k) => d.setAttribute("aria-pressed", String(k === cur)));
    nowText.textContent = slides[cur].t;
    syncVideos();
  };
  const running = () => !reduce && !hovered && !focused && visible && !document.hidden;
  const schedule = () => {
    clearTimeout(timer);
    if (!running()) return;
    timer = setTimeout(() => { show(cur + 1); schedule(); }, INTERVAL);
    setTimeout(() => warm((cur + 1) % slides.length), INTERVAL - 1500);
  };

  dots.forEach((d, i) => d.addEventListener("click", () => { show(i); schedule(); }));
  hero.addEventListener("mouseenter", () => { hovered = true; schedule(); });
  hero.addEventListener("mouseleave", () => { hovered = false; schedule(); });
  hero.addEventListener("focusin", () => { focused = true; schedule(); });
  hero.addEventListener("focusout", (e) => { if (!hero.contains(e.relatedTarget)) { focused = false; schedule(); } });
  document.addEventListener("visibilitychange", schedule);
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; syncVideos(); schedule(); }).observe(hero);

  if (reduce) { const v = video(0); if (v) { v.removeAttribute("autoplay"); v.pause(); } }
  show(0); schedule();
}

/* ── Productions filter: toggle buttons; hidden without JS so every title still shows ── */
const filter = document.querySelector("[data-filter]");
const list = document.querySelector("[data-filter-list]");
if (filter && list) {
  const chips = [...filter.querySelectorAll("[data-filter-key]")];
  const status = filter.querySelector("[data-filter-status]");
  const apply = (key) => {
    let shown = 0;
    list.querySelectorAll("[data-group]").forEach((c) => { c.hidden = key !== "all" && c.dataset.group !== key; if (!c.hidden) shown++; });
    chips.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filterKey === key)));
    status.textContent = `${shown} ${shown === 1 ? "production" : "productions"} shown`;
  };
  chips.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filterKey)));
  filter.hidden = false;
}

/* ── Shared trailer player: any [data-trailer] button opens it (YouTube or Vimeo, sound on, captions on) ── */
const player = document.getElementById("player");
const embedUrl = (url) => {
  const yt = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&cc_load_policy=1&playsinline=1`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1&texttrack=en&dnt=1`;
  return null;
};
if (player && player.showModal) {
  trapFocus(player);
  const frame = player.querySelector(".player-frame");
  let opener = null;
  document.querySelectorAll("[data-trailer]").forEach((b) => b.addEventListener("click", () => {
    const src = embedUrl(b.dataset.trailer);
    if (!src) { window.open(b.dataset.trailer, "_blank", "noopener"); return; } // unknown host: open it directly
    opener = b;
    frame.innerHTML = `<iframe src="${src}" title="${b.dataset.trailerTitle || "Trailer"}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    player.showModal();
    document.documentElement.classList.add("menu-open");
    player.querySelector(".player-close").focus();
  }));
  player.querySelector(".player-close").addEventListener("click", () => player.close());
  player.addEventListener("click", (e) => { if (e.target === player) player.close(); }); // click outside the video
  player.addEventListener("close", () => {
    frame.innerHTML = ""; // stops playback
    document.documentElement.classList.remove("menu-open");
    opener?.focus();
  });
}
