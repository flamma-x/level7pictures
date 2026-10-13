// Form component shared by /careers and /contact. Rendered only when FLAGS.forms is on (build/config.json).
// Posts to /api/contact (a Vercel function sending through Resend, to be added); site.js validates and submits.
import { esc } from "../lib.mjs";

/* One field: visible label, "(required)" in words, inline error slot tied with aria-describedby */
export const field = ({ id, name = id, label, type = "text", required = false, autocomplete, placeholder, options, rows }) => {
  const err = `${id}-err`;
  const common = `id="${id}" name="${name}"${required ? " required aria-required=\"true\"" : ""}${autocomplete ? ` autocomplete="${autocomplete}"` : ""} aria-describedby="${err}"`;
  const control = options
    ? `<select ${common}>${options.map((o, i) => `<option value="${i === 0 && o.endsWith("…") ? "" : esc(o)}">${esc(o)}</option>`).join("")}</select>`
    : type === "textarea"
      ? `<textarea ${common}${rows ? ` rows="${rows}"` : ""}></textarea>`
      : `<input ${common} type="${type}"${placeholder ? ` placeholder="${esc(placeholder)}"` : ""}>`;
  return `<div class="field">
<label for="${id}">${esc(label)}${required ? ` <span class="req">(required)</span>` : ""}</label>
${control}
<p class="field-error" id="${err}" hidden></p>
</div>`;
};

/* The form shell: error summary, honeypot, status line */
export const form = ({ kind, title, fields, submit, note }) => `<form class="surface form" action="/api/contact" method="post" novalidate data-form="${kind}">
${title ? `<h2 class="h3 form-title" id="${kind}-form-title">${esc(title)}</h2>` : ""}
<div class="form-summary" role="alert" tabindex="-1" hidden></div>
${fields}
<div class="hp" aria-hidden="true"><label for="${kind}-website">Leave this field empty</label><input id="${kind}-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
<input type="hidden" name="form" value="${kind}">
<button type="submit" class="btn btn-b form-submit">${esc(submit)}</button>
<p class="form-status" role="status" aria-live="polite"></p>
${note ? `<p class="muted form-note">${note}</p>` : ""}
</form>`;
