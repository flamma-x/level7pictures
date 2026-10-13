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
    if (el.dataset.labelSlot && SLOT_TEXT[el.dataset.labelSlot]) el.setAttribute("aria-label", SLOT_TEXT[el.dataset.labelSlot](p, s, t));
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
  let closeTimer = 0;
  /* open: circle grows from the ٧ button (CSS clip-path, 450 ms), links stagger in, ٧ turns into × */
  const open = () => {
    clearTimeout(closeTimer); menu.classList.remove("is-closing");
    const r = openBtn.getBoundingClientRect();
    menu.style.setProperty("--cx", `${r.left + r.width / 2}px`);
    menu.style.setProperty("--cy", `${r.top + r.height / 2}px`);
    menu.showModal();
    document.documentElement.classList.add("menu-open");
    openBtn.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("is-open")));
    menu.querySelector(".menu-close").focus();
  };
  /* close: the reverse, faster (250 ms), then the dialog actually closes */
  const close = (instant = false) => {
    if (!menu.open || menu.classList.contains("is-closing")) return;
    if (instant) { menu.classList.remove("is-open"); menu.close(); return; }
    menu.classList.add("is-closing"); menu.classList.remove("is-open");
    closeTimer = setTimeout(() => { menu.classList.remove("is-closing"); menu.close(); }, 250);
  };
  openBtn.addEventListener("click", open);
  menu.querySelector(".menu-close").addEventListener("click", () => close());
  menu.addEventListener("cancel", (e) => { e.preventDefault(); close(); }); // Esc: animate instead of vanishing
  menu.addEventListener("close", () => {
    menu.classList.remove("is-open", "is-closing");
    document.documentElement.classList.remove("menu-open");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.focus();
  });
  menu.querySelectorAll("a[href]").forEach((a) => a.addEventListener("click", () => close(true)));
  matchMedia("(min-width: 1101px)").addEventListener("change", (e) => { if (e.matches) close(true); });
}

/* ── Bar below 1100px: solid after 24px; hides on scroll down, returns on scroll up.
   Never hides while the menu is open or something in the bar has focus; no hiding under reduced motion. ── */
const navBar = document.querySelector(".nav-dock .nav");
if (navBar) {
  const small = matchMedia("(max-width: 1100px)");
  let lastY = scrollY, rafNav = 0;
  const onScroll = () => {
    const y = Math.max(0, scrollY);
    navBar.classList.toggle("is-solid", y > 24);
    const pinned = reduce || !small.matches || menu?.open || navBar.contains(document.activeElement) || y < 80;
    if (pinned) navBar.classList.remove("is-hidden");
    else if (y > lastY + 4) navBar.classList.add("is-hidden");
    else if (y < lastY - 4) navBar.classList.remove("is-hidden");
    lastY = y;
  };
  addEventListener("scroll", () => { cancelAnimationFrame(rafNav); rafNav = requestAnimationFrame(onScroll); }, { passive: true });
  navBar.addEventListener("focusin", () => navBar.classList.remove("is-hidden"));
  onScroll();
}

/* ── Deferred video: the HTML carries only the poster (LCP). The source is chosen here — first entry whose
   media query matches and whose codec plays — and only after the page has loaded. ── */
const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r, { once: true })));
export const ensureSource = (v) => {
  if (v.src || !v.dataset.sources) return;
  const pick = JSON.parse(v.dataset.sources).find((s) => (!s.media || matchMedia(s.media).matches) && v.canPlayType(s.type) !== "");
  if (pick) { v.src = pick.src; v.preload = "auto"; }
};
const play = async (v) => { if (reduce) return; await loaded; ensureSource(v); v.play().catch(() => {}); };

/* Video that plays only while on screen (and never under reduced motion) */
const playWhenVisible = (v, threshold = 0.25) => {
  if (reduce || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(([e]) => { if (e.isIntersecting) play(v); else v.pause(); }, { threshold }).observe(v);
};
document.querySelectorAll("video[data-autoplay-visible]").forEach((v) => playWhenVisible(v));

/* ── Home hero (V8.1): a title every 6 s, footage crossfades (1.2 s, CSS) inside the ٧ window ── */
const hero = document.querySelector("[data-hero]");
if (hero) {
  const titles = JSON.parse(hero.dataset.hero);
  const layers = [...hero.querySelectorAll(".hero-layer")];
  const dots = [...hero.querySelectorAll(".hero-dot")];
  const nowText = hero.querySelector("[data-hero-now]");
  const INTERVAL = 6000;
  let cur = 0, timer = 0, hovered = false, focused = false, visible = true;

  const video = (i) => layers[i]?.querySelector("video");
  const syncVideos = () => layers.forEach((_, i) => {
    const v = video(i); if (!v) return;
    if (i === cur && visible) play(v); else v.pause(); // only the visible layer's video plays
  });
  const warm = (i) => { const v = video(i); if (v && !reduce) loaded.then(() => ensureSource(v)); }; // fetch the next clip before its turn
  const show = (i) => {
    cur = (i + titles.length) % titles.length;
    layers.forEach((l, k) => l.classList.toggle("on", k === cur));
    dots.forEach((d, k) => d.setAttribute("aria-pressed", String(k === cur)));
    nowText.textContent = titles[cur];
    syncVideos();
  };
  const running = () => !reduce && !hovered && !focused && visible && !document.hidden;
  const schedule = () => {
    clearTimeout(timer);
    if (!running()) return;
    timer = setTimeout(() => { show(cur + 1); schedule(); }, INTERVAL);
    setTimeout(() => warm((cur + 1) % titles.length), INTERVAL - 2500);
  };

  dots.forEach((d, i) => d.addEventListener("click", () => { show(i); schedule(); }));
  hero.addEventListener("mouseenter", () => { hovered = true; schedule(); });
  hero.addEventListener("mouseleave", () => { hovered = false; schedule(); });
  hero.addEventListener("focusin", () => { focused = true; schedule(); });
  hero.addEventListener("focusout", (e) => { if (!hero.contains(e.relatedTarget)) { focused = false; schedule(); } });
  document.addEventListener("visibilitychange", schedule);
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; syncVideos(); schedule(); }).observe(hero);

  show(0); schedule(); // reduced motion: first title, poster only, no cycling
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

/* ── Forms (Careers, Contact): validate on leave + on submit, error summary, post JSON to /api/contact ── */
const MESSAGES = {
  valueMissing: (label) => `Enter your ${label.toLowerCase()}.`,
  selectMissing: (label) => `Choose ${/^[aeiou]/i.test(label) ? "an" : "a"} ${label.toLowerCase()}.`,
  typeMismatch: { email: "Enter an email address, like name@example.com.", url: "Enter a full link that starts with https://" },
};
const labelOf = (el) => document.querySelector(`label[for="${el.id}"]`)?.firstChild.textContent.trim() || el.name;
const check = (el) => {
  const v = el.validity, label = labelOf(el);
  const msg = v.valueMissing ? (el.tagName === "SELECT" ? MESSAGES.selectMissing(label) : MESSAGES.valueMissing(label))
    : v.typeMismatch ? MESSAGES.typeMismatch[el.type] : "";
  const err = document.getElementById(`${el.id}-err`);
  el.setAttribute("aria-invalid", String(Boolean(msg)));
  if (err) { err.textContent = msg; err.hidden = !msg; }
  return msg ? { el, msg } : null;
};
document.querySelectorAll("form[data-form]").forEach((f) => {
  const fields = [...f.querySelectorAll("input:not([type=hidden]):not([name=website]), select, textarea")];
  const summary = f.querySelector(".form-summary"), status = f.querySelector(".form-status"), submit = f.querySelector(".form-submit");
  fields.forEach((el) => {
    el.addEventListener("blur", () => { if (el.dataset.touched || el.value) { el.dataset.touched = "1"; check(el); } });
    el.addEventListener("input", () => { if (el.getAttribute("aria-invalid") === "true") check(el); });
  });
  // /contact?route=co-production pre-selects the matching inquiry type
  const route = new URLSearchParams(location.search).get("route");
  const inquiry = f.querySelector("select[name=inquiry]");
  const ROUTE_INQUIRY = { "co-production": "Co-production / commission", talent: "Talent submission", crew: "Crew", press: "Press" };
  if (inquiry && ROUTE_INQUIRY[route]) inquiry.value = ROUTE_INQUIRY[route];

  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errors = fields.map(check).filter(Boolean);
    if (errors.length) {
      summary.innerHTML = `<strong>${errors.length === 1 ? "There is a problem" : `There are ${errors.length} problems`}</strong><ul>${errors.map((x) => `<li><a href="#${x.el.id}">${x.msg}</a></li>`).join("")}</ul>`;
      summary.hidden = false; summary.focus();
      summary.querySelectorAll("a").forEach((a) => a.addEventListener("click", (ev) => { ev.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); }));
      return;
    }
    summary.hidden = true;
    if (f.querySelector("[name=website]").value) return; // spam trap filled: drop silently
    submit.disabled = true; status.textContent = "Sending…";
    try {
      const res = await fetch(f.action, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(f))) });
      if (!res.ok) throw new Error(res.status);
      f.reset(); fields.forEach((el) => { el.removeAttribute("aria-invalid"); delete el.dataset.touched; });
      status.textContent = "Thank you. Your message has reached Level 7.";
    } catch {
      status.textContent = `Sending isn't available right now. Please email info@level7p.com instead.`;
    } finally { submit.disabled = false; }
  });
});

/* ── Said timeline: ← 01 / 13 → steps one card; counter + progress bar follow the scroll; arrow keys on the track ── */
const tl = document.querySelector("[data-tl]");
if (tl) {
  const cards = [...tl.querySelectorAll(".tl-card")];
  const curEl = document.querySelector("[data-tl-cur]"), bar = document.querySelector("[data-tl-bar]");
  const [prev, next] = [-1, 1].map((d) => document.querySelector(`[data-tl-step="${d}"]`));
  const step = () => cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : tl.clientWidth;
  const atEnd = () => tl.scrollLeft >= tl.scrollWidth - tl.clientWidth - 2;
  let index = -1;
  const update = () => {
    const i = atEnd() ? cards.length - 1 : Math.min(cards.length - 1, Math.max(0, Math.round(tl.scrollLeft / step())));
    if (i === index) return;
    index = i;
    curEl.textContent = String(i + 1).padStart(2, "0");
    bar.style.width = `${((i + 1) / cards.length) * 100}%`;
    prev.disabled = i === 0; next.disabled = atEnd();
  };
  const go = (d) => tl.scrollBy({ left: d * step(), behavior: reduce ? "auto" : "smooth" });
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  tl.addEventListener("keydown", (e) => {
    const d = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
    if (d) { e.preventDefault(); go(d); }
    if (e.key === "Home" || e.key === "End") { e.preventDefault(); tl.scrollTo({ left: e.key === "Home" ? 0 : tl.scrollWidth, behavior: reduce ? "auto" : "smooth" }); }
  });
  let raf = 0;
  tl.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener("resize", () => { index = -1; update(); });
  update();
}
