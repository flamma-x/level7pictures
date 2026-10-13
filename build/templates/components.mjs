// Components shared by several pages.
import { PROJECTS, statusOf, timeLeft, COUNTDOWN_LABELS, SLOT_TEXT, textOf } from "../../data/projects.js";
import { esc, picture } from "../lib.mjs";

export const NOW = Date.now(); // build time; the browser re-renders every time-based slot on load

/* Stat tile: big Anton value + label (Home, About, Said) */
export const statTile = ({ v, l, blue }) =>
  `<div class="surface stat"><div class="un stat-v${blue ? " stat-blue" : ""}">${esc(v)}</div><div class="muted stat-l">${esc(l)}</div></div>`;

/* Row of stat tiles; tiles whose value is null (placeholder removed under PRUNE) drop out and the grid adapts */
export const statsRow = (tiles) => {
  const t = tiles.filter((x) => x.v != null && x.v !== "");
  return `<div class="wrap ${t.length >= 4 ? "g4" : t.length === 3 ? "g3" : "g2"}">\n${t.map(statTile).join("\n")}\n</div>`;
};

/* Section title: kicker + h2 (spacing as designed) */
export const secTitle = (id, kick, title, cls = "") =>
  `<span class="kick">${esc(kick)}</span>\n<h2 id="${id}" class="h2 sec-title ${cls}">${esc(title)}</h2>`;

/* Countdown: .cd-sm in panels, .cd-lg over footage; hidden once the title is out */
export const countdown = (slug, size) => {
  const p = PROJECTS[slug], t = timeLeft(p.premiere, NOW);
  return `<div class="cd cd-${size}" data-project="${slug}" data-countdown aria-label="Time until ${esc(p.titleEn)} premieres"${statusOf(p, NOW) === "coming" ? "" : " hidden"}>
${Object.entries(COUNTDOWN_LABELS).map(([k, l]) => `<div class="cd-u"><span class="un" data-u="${k}">${String(t[k]).padStart(2, "0")}</span><span class="cd-l">${l}</span></div>`).join("\n")}
</div>`;
};

/* Launch-switch text slot rendered with today's value */
export const slot = (name, slug) => {
  const p = PROJECTS[slug];
  return `<span data-project="${slug}" data-slot="${name}">${esc(SLOT_TEXT[name](p, statusOf(p, NOW), NOW))}</span>`;
};

/* Work card: 4:5 image, English + Arabic title, one fact line. Optional link and "Level 7" pill. */
export const workCard = ({ slug, line, lineHtml, alt = "", pos, href, pill, sizes = "(max-width: 1060px) 46vw, 24vw" }) => {
  const p = PROJECTS[slug];
  const tag = href ? "a" : "div";
  return `<${tag}${href ? ` href="${href}"` : ""} class="scard zoom">
<div class="scard-img"><div class="clip">${picture(p.image.src, { alt, sizes, style: `object-position:${pos || p.image.pos}` })}</div>${pill ? `<span class="pill scard-pill">${esc(pill)}</span>` : ""}</div>
<div class="scard-title"><h3 class="un scard-en">${esc(p.titleEn)}</h3><span lang="ar" dir="rtl" class="ar scard-ar">${esc(p.titleAr)}</span></div>
${lineHtml || `<span class="muted scard-meta">${esc(textOf(line))}</span>`}
</${tag}>`;
};
