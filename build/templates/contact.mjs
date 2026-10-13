// /contact
import { SITE } from "../../data/projects.js";
import { COMPANY } from "../../data/company.js";
import { ROUTES, INQUIRIES } from "../../data/contact.js";
import { layout } from "./layout.mjs";
import { field, form } from "./form.mjs";
import { esc, picture, orPh, FLAGS } from "../lib.mjs";

const route = (r) => `<a href="${r.href}" class="surface croute">
<span class="kick croute-k">Route ${r.k}</span>
<span class="croute-body"><span class="un croute-t">${esc(r.title)}</span><span class="muted croute-s">${esc(r.sub)}</span></span>
</a>`;

/* Inquiry type is pre-selected from ?route= (site.js), e.g. /contact?route=co-production */
const message = () => form({
  kind: "contact",
  title: "Send a message",
  fields: `<div class="g2 gap-14">
${field({ id: "n", name: "name", label: "Name", required: true, autocomplete: "name" })}
${field({ id: "co", name: "company", label: "Company", autocomplete: "organization" })}
</div>
${field({ id: "e", name: "email", label: "Email", type: "email", required: true, autocomplete: "email" })}
${field({ id: "t", name: "inquiry", label: "Inquiry type", required: true, options: INQUIRIES })}
${field({ id: "m", name: "message", label: "Message", type: "textarea", required: true })}`,
  submit: "Send message",
});

const phones = () => {
  const v = SITE.phones?.length ? SITE.phones.join(" · ") : orPh(null, "[+971 …] · [+961 …]");
  return v ? `<div class="surface tile"><div class="kick">Phone / WhatsApp</div><div class="tile-phone">${esc(v)}</div></div>` : "";
};

const info = () => `<div class="where-col">
<div class="surface tile"><div class="kick">Email</div><a href="mailto:${SITE.email}" class="un contact-mail">${SITE.email}</a></div>
<div class="g2">
${COMPANY.offices.map((o) => `<div class="surface tile"><div class="kick">${esc(o.city)}</div>${orPh(o.address, "[Address]") ? `<div class="muted tile-note">${esc(orPh(o.address, "[Address]"))}</div>` : ""}</div>`).join("\n")}
</div>
${phones()}
${FLAGS.forms ? `<div class="contact-img"><div class="clip">${picture("/assets/img/on-set-desert.jpg", { alt: "Level 7 crew on location", sizes: "(max-width: 820px) 92vw, 46vw" })}</div></div>` : ""}
</div>`;

export default () => ({
  path: "contact.html",
  html: layout({
    page: "/contact",
    title: "Contact · Level 7 Pictures",
    description: `Work with Level 7 Pictures. Every message reaches ${SITE.email}.`,
    body: `<section class="page-head">
<div class="wrap page-head-in">
<span class="kick">Contact · <span lang="ar" dir="rtl">تواصل معنا</span></span>
<h1 class="h1">Work with us.</h1>
<p class="lead page-lead">Pick the route that fits. Every message reaches ${SITE.email}.</p>
</div>
</section>

<section aria-label="Routes">
<div class="wrap g4">
${ROUTES.map(route).join("\n")}
</div>
</section>

<section class="contact-sec" aria-label="${FLAGS.forms ? "Send a message" : "Contact details"}">
<div class="wrap split bio">
${FLAGS.forms ? message() : info()}
${FLAGS.forms ? info() : `<div class="contact-img"><div class="clip">${picture("/assets/img/on-set-desert.jpg", { alt: "Level 7 crew on location", sizes: "(max-width: 820px) 92vw, 46vw" })}</div></div>`}
</div>
</section>`,
  }),
});
