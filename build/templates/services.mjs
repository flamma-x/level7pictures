// /services
import { SERVICES, STEPS } from "../../data/services.js";
import { layout } from "./layout.mjs";
import { secTitle } from "./components.mjs";
import { esc, picture, clean, cleanList } from "../lib.mjs";

const block = (s, i) => `<article id="${s.id}" class="surface split svc-block" aria-labelledby="${s.id}-title">
<div class="svc-block-img"><div class="clip">${picture(s.image.src, { alt: s.image.alt, sizes: "(max-width: 820px) 88vw, 44vw", lazy: i > 0, style: `object-position:${s.image.pos}` })}</div></div>
<div class="svc-block-text">
<span class="un svc-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
<h2 id="${s.id}-title" class="h2">${esc(s.title)}</h2>
${clean(s.long) ? `<p class="lead">${esc(clean(s.long))}</p>` : ""}
<ul class="tags" aria-label="Includes">
${cleanList(s.tags).map((t) => `<li class="pill tag">${esc(t)}</li>`).join("")}
</ul>
</div>
</article>`;

export default () => ({
  path: "services.html",
  html: layout({
    page: "/services",
    title: "Services · Level 7 Pictures",
    description: "One team carries a project through every stage, so platforms and co-producers work with a single partner.",
    image: SERVICES[0].image.src,
    body: `<section class="page-head">
<div class="wrap page-head-in">
<span class="kick">Services · <span lang="ar" dir="rtl">خدماتنا</span></span>
<h1 class="h1">From first draft to final delivery file.</h1>
<p class="lead page-lead">One team carries a project through every stage, so platforms and co-producers work with a single partner.</p>
</div>
</section>

<section aria-label="Services">
<div class="wrap svc-blocks">
${SERVICES.map(block).join("\n")}
</div>
</section>

<section class="section" aria-labelledby="steps">
<div class="wrap">
${secTitle("steps", "How we work with platforms", "Four steps, one team")}
<ol class="g4 steps">
${STEPS.map((s, i) => `<li class="surface step"><span class="un step-n" aria-hidden="true">${i + 1}</span><span class="un step-t">${esc(s.t)}</span><span class="muted step-d">${esc(s.d)}</span></li>`).join("\n")}
</ol>
<a href="/contact?route=co-production" class="btn btn-b mt-28">Start a co-production →</a>
</div>
</section>`,
  }),
});
