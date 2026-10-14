// /careers
import { SITE } from "../../data/projects.js";
import { CAREERS as K } from "../../data/contact.js";
import { layout } from "./layout.mjs";
import { field, form } from "./form.mjs";
import { esc, picture, orPh, FLAGS } from "../lib.mjs";

const call = (c) => `<div class="surface call">
<span class="pill pill-o call-pill">${esc(c.pill)}</span>
<h2 class="un call-title">${esc(c.title)}</h2>
<span class="muted call-text">${esc(c.text)}</span>
</div>`;

/* The open call only appears when one exists (decided 13 Oct) */
const openCall = () => K.openCall
  ? call({ pill: "Next production", title: `${K.openCall.role} · ${K.openCall.department}`, text: K.openCall.details })
  : "";

const signup = () => form({
  kind: "careers",
  fields: `<div class="g2 gap-14">
${field({ id: "cn", name: "name", label: "Full name", required: true, autocomplete: "name" })}
${field({ id: "ce", name: "email", label: "Email", type: "email", required: true, autocomplete: "email" })}
</div>
<div class="g2 gap-14">
${field({ id: "cd", name: "department", label: "Department", required: true, options: ["Choose…", ...K.departments] })}
${field({ id: "cc", name: "based_in", label: "Based in", placeholder: "City, country", autocomplete: "address-level2" })}
</div>
${field({ id: "cl", name: "link", label: "Reel, CV or portfolio link", type: "url", placeholder: "https://", autocomplete: "url" })}
${field({ id: "cm", name: "message", label: "Anything else", type: "textarea" })}`,
  submit: "Send to Level 7",
  note: [esc(K.privacyNote), SITE.privacy ? `<a href="${esc(SITE.privacy)}">Privacy notice</a>` : esc(orPh(null, "[Privacy note]") || "")].filter(Boolean).join(" "),
});

/* Until the form is switched on: the same route by email */
const byEmail = () => `<div class="surface form-off">
<div class="kick">Sign up by email</div>
<p class="form-off-text">Send your name, department, where you're based and a link to your reel or CV.</p>
<a href="mailto:${SITE.email}?subject=${encodeURIComponent("Crew and talent sign-up")}" class="btn btn-w">${SITE.email}</a>
</div>`;

export default () => ({
  path: "careers.html",
  html: layout({
    page: "/careers",
    title: "Careers · Level 7 Pictures",
    description: "We crew up for every production in Lebanon and the Gulf. Leave your details and we will reach out when a project fits.",
    image: "/assets/img/svc-management.jpg",
    body: `<section class="page-head">
<div class="wrap page-head-in">
<span class="kick">Careers · <span lang="ar" dir="rtl">انضم إلينا</span></span>
<h1 class="h1">Join the crew.</h1>
<p class="lead page-lead">We crew up for every production in Lebanon and the Gulf. Leave your details and we will reach out when a project fits.</p>
</div>
</section>

<section aria-label="Open calls">
<div class="wrap ${K.openCall ? "g3" : "g2"}">
${openCall()}
${K.calls.map(call).join("\n")}
</div>
</section>

<section class="section" aria-labelledby="signup">
<div class="wrap split bio">
<div class="stack-16">
<span class="kick">Crew and talent sign-up</span>
<h2 id="signup" class="h2">Tell us what you do.</h2>
<p class="lead">Actors and writers: send a reel or a script. Crew: tell us your department and where you're based.</p>
${picture("/assets/img/svc-management.jpg", { alt: "Cast and crew on set", sizes: "(max-width: 820px) 92vw, 46vw", cls: "signup-img" })}
</div>
${FLAGS.forms ? signup() : byEmail()}
</div>
</section>`,
  }),
});
