/* ═══ Level 7 Pictures · site behaviour (loaded as a module on every page) ═══ */
import { PROJECTS, statusOf, shortDate } from "/data/projects.js";

export const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Local preview only: ?now=2026-10-31 simulates a date (ignored on the live site). */
const NOW_OVERRIDE = (() => {
  if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return 0;
  const q = new URLSearchParams(location.search).get("now");
  return q ? new Date(q).getTime() - Date.now() : 0;
})();
export const now = () => Date.now() + NOW_OVERRIDE;

/* ── Launch switch: every [data-project] element re-renders its [data-slot]s from the data ── */
const SLOTS = {
  "nav-cta": (p, s) => (s === "streaming" ? `Obsess · Now on ${p.platform}` : `Obsess · ${shortDate(p.premiere)}`),
};
export function renderStatus() {
  document.querySelectorAll("[data-project]").forEach((el) => {
    const p = PROJECTS[el.dataset.project]; if (!p) return;
    const s = statusOf(p, now());
    const slots = el.matches("[data-slot]") ? [el] : el.querySelectorAll("[data-slot]");
    slots.forEach((x) => { const f = SLOTS[x.dataset.slot]; if (f) x.textContent = f(p, s); });
  });
}
renderStatus();
/* flip live at the premiere if the page is open */
const premiere = new Date(PROJECTS.obsess.premiere).getTime();
if (now() < premiere && premiere - now() < 2 ** 31 - 1) setTimeout(renderStatus, premiere - now() + 50);

/* ── Menu: modal <dialog> (focus stays inside, Esc closes, focus returns to the ٧ button) ── */
const menu = document.getElementById("menu");
const openBtn = document.querySelector(".nav-dock .menu-btn");
if (menu && openBtn && menu.showModal) {
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
  // following a link (including same-page anchors) closes the menu first
  menu.querySelectorAll("a[href]").forEach((a) => a.addEventListener("click", close));
  // the menu only exists below 1100px; widening the window closes it
  matchMedia("(min-width: 1101px)").addEventListener("change", (e) => { if (e.matches) close(); });
}
