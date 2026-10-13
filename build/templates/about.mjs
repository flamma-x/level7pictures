// /about
import { PROJECTS } from "../../data/projects.js";
import { COMPANY as C } from "../../data/company.js";
import { layout } from "./layout.mjs";
import { statsRow, secTitle } from "./components.mjs";
import { esc, picture, clean, orPh } from "../lib.mjs";

const level7Count = Object.values(PROJECTS).filter((p) => p.house === "level7").length;

const leader = (l) => `<article class="leader">
<div class="leader-img"><div class="clip">${picture(l.image.src, { alt: l.image.alt, sizes: "(max-width: 600px) 92vw, 46vw", style: `object-position:${l.image.pos}` })}</div></div>
<div class="leader-name"><h3 class="un">${esc(l.name)}</h3>${clean(l.nameAr) ? `<span lang="ar" dir="rtl" class="ar leader-ar">${esc(clean(l.nameAr))}</span>` : ""}</div>
<span class="kick leader-role">${esc(l.role)}</span>
${clean(l.bio) ? `<p class="lead">${esc(clean(l.bio))}</p>` : ""}
${l.link ? `<a href="${l.link}" class="tlink">${esc(l.linkText)}</a>` : ""}
</article>`;

export default () => ({
  path: "about.html",
  html: layout({
    page: "/about",
    title: "About · Level 7 Pictures",
    description: C.intro,
    body: `<section class="page-head">
<div class="wrap page-head-in">
<span class="kick">About · <span lang="ar" dir="rtl">${C.kickAr}</span></span>
<h1 class="h1">${esc(C.title)}</h1>
<p class="lead page-lead">${esc(C.intro)}</p>
</div>
</section>

<section aria-label="Numbers">
${statsRow(C.stats.map((s) => ({ ...s, v: s.v === "level7-count" ? level7Count : orPh(s.v, s.ph) })))}
</section>

<section class="section" aria-labelledby="story">
<div class="wrap">
${secTitle("story", "Our story so far", C.storyTitle, "sec-title-32")}
<ol class="story">
${C.story.map((s) => `<li><span class="un story-when">${esc(s.when)}</span><span class="un story-what">${esc(s.what)}</span><span class="muted story-text">${esc(s.text)}</span></li>`).join("\n")}
</ol>
</div>
</section>

<section class="section" aria-labelledby="leadership">
<div class="wrap">
${secTitle("leadership", "Leadership", "Who runs Level 7", "sec-title-32")}
<div class="g2 leaders">
${C.leaders.map(leader).join("\n")}
</div>
</div>
</section>

<section class="section" aria-labelledby="where">
<div class="wrap split bio">
<div class="where-col"><span class="kick">Where we work</span><h2 id="where" class="h2">${esc(C.whereTitle)}</h2></div>
<div class="where-col">
<div class="g2">
${C.offices.map((o) => `<div class="surface tile"><div class="kick">Office</div><div class="un tile-big">${esc(o.city)}</div>${orPh(o.address, "[Address]") ? `<div class="muted tile-note">${esc(orPh(o.address, "[Address]"))}</div>` : ""}</div>`).join("\n")}
</div>
<div class="surface tile"><div class="kick">We've shot in</div><div class="un tile-mid">${esc(clean(C.shotIn))}</div></div>
<div class="surface tile"><div class="kick">Our work streams on</div><div class="un tile-mid">${esc(C.platforms)}</div></div>
</div>
</div>
</section>`,
  }),
});
