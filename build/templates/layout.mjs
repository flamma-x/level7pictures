// Shared page shell: <head>, floating pill nav, full-screen menu, footer.
import { SITE, PROJECTS, SLOT_TEXT, statusOf } from "../../data/projects.js";
import { esc } from "../lib.mjs";

export const NAV = [
  { href: "/productions", label: "Productions" },
  { href: "/about", label: "About" },
  { href: "/said-el-marouk", label: "Said El Marouk" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];
const FOOT_SITE = [...NAV.slice(0, 4), { href: "/news", label: "News & Press" }, { href: "/careers", label: "Careers" }];

const cur = (href, page) => (href === page ? ' aria-current="page"' : "");
const obsess = PROJECTS.obsess;

// The Obsess button. Text is rewritten by the launch switch (site.js) from the same data.
const navCta = () =>
  `<a class="nav-cta" href="/said-el-marouk#obsess" data-project="obsess"><span class="dot" aria-hidden="true"></span><span data-slot="nav-cta">${esc(SLOT_TEXT["nav-cta"](obsess, statusOf(obsess)))}</span></a>`;
const arabic = () => (SITE.arabicSite ? `<a href="${esc(SITE.arabicSite)}" lang="ar" class="ar" hreflang="ar">عربي</a>` : "");

const nav = (page) => `<div class="nav-dock">
<nav class="nav" aria-label="Main">
<a class="nav-logo" href="/" aria-label="Level 7 Pictures home"><img src="/assets/brand/l7-mark-light.png" alt="" width="390" height="168"></a>
<div class="nav-links">
${NAV.map((l) => `<a href="${l.href}"${cur(l.href, page)}>${esc(l.label)}</a>`).join("\n")}
${arabic()}
</div>
<button type="button" class="menu-btn" aria-label="Open menu" aria-haspopup="dialog" aria-expanded="false" aria-controls="menu">٧</button>
${navCta()}
</nav>
</div>`;

const menu = (page) => `<dialog class="menu" id="menu" aria-label="Menu">
<span class="menu-glyph" aria-hidden="true">٧</span>
<div class="menu-bar">
<div class="nav">
<a class="nav-logo" href="/" aria-label="Level 7 Pictures home"><img src="/assets/brand/l7-mark-light.png" alt="" width="390" height="168"></a>
<button type="button" class="menu-btn menu-close" aria-label="Close menu">✕</button>
${navCta()}
</div>
</div>
<div class="menu-body">
<nav aria-label="Menu">
<ul class="menu-list">
<li><a href="/"${cur("/", page)}>Home</a></li>
${NAV.map((l) => `<li><a href="${l.href}"${cur(l.href, page)}>${esc(l.label)}</a></li>`).join("\n")}
${SITE.arabicSite ? `<li><a href="${esc(SITE.arabicSite)}" lang="ar" class="ar" hreflang="ar">عربي</a></li>` : ""}
</ul>
</nav>
<div class="menu-foot">
<a href="mailto:${SITE.email}">${SITE.email}</a>
<span>${SITE.offices.join(" · ")}</span>
<span lang="ar" dir="rtl" class="ar">${SITE.taglineAr}</span>
</div>
</div>
</dialog>`;

const ph = (url, label) => (url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>` : `<a href="#">[${label}]</a>`);

const footer = () => `<footer class="footer">
<div class="wrap foot">
<div class="foot-brand">
<img src="/assets/brand/l7-mark-light.png" alt="Level 7 Pictures" width="390" height="168">
<p>Film and television production. Founded in ${SITE.founded.country} in ${SITE.founded.year}, registered in ${SITE.registered.join(" and ")}.</p>
<span lang="ar" dir="rtl" class="ar">${SITE.taglineAr}</span>
</div>
<div class="foot-col">
<span class="kick">Site</span>
${FOOT_SITE.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join("\n")}
</div>
<div class="foot-col">
<span class="kick">Contact</span>
<a href="mailto:${SITE.email}">${SITE.email}</a>
<span>${SITE.offices.join(" · ")}</span>
<a href="/contact">Work with us →</a>
</div>
<div class="foot-col">
<span class="kick">Follow</span>
${ph(SITE.instagram, "Instagram")}
${ph(SITE.linkedin, "LinkedIn")}
<a href="${SITE.vimeo}" target="_blank" rel="noopener">Vimeo</a>
</div>
</div>
<div class="wrap foot-legal">
<span>© 2026 Level 7 Pictures</span><span>[Privacy] · [Terms]</span>
</div>
</footer>`;

export const FONTS = "https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700;800;900&family=Hanken+Grotesk:wght@400;500;600;700&family=Alexandria:wght@500;700;800;900&display=swap";

/* Shared trailer player (one per page, only where a trailer exists): modal, Esc closes, focus returns. */
const player = () => `<dialog class="player" id="player" aria-label="Trailer">
<button type="button" class="menu-btn player-close" aria-label="Close trailer">✕</button>
<div class="player-frame"></div>
</dialog>`;

export function layout({ page, title, description, body, head = "", image = "/assets/img/crime-of-love-still.jpg", withPlayer = false }) {
  const url = SITE.url + (page === "/" ? "/" : page);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#030c16">
<link rel="icon" href="/l7-mark-light.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS.replace(/&/g, "&amp;")}">
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/site.css">
<script type="module" src="/assets/js/site.js"></script>
${head}
</head>
<body>
<a href="#main" class="skip">Skip to content</a>
${nav(page)}
${menu(page)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${withPlayer ? player() : ""}
</body>
</html>
`;
}
