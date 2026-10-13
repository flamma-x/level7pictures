// Small helpers shared by the templates.
import fs from "fs";
import path from "path";
import { ROOT } from "./lib-root.mjs";
import { FLAGS } from "./flags.mjs";
export { ROOT, FLAGS };

/* ── Placeholders and pending copy ──
   clean(v): the text to show for a data value, or null when there is nothing to show.
   • pending(text, pruneText) → text normally; under PRUNE the approved fallback (pruneText) or nothing
   • strings → unchanged normally; under PRUNE every [bracket] segment is removed and the separators tidied,
     e.g. "Series · [N] episodes" → "Series", "Lebanon · Kuwait · Cuba · [more]" → "Lebanon · Kuwait · Cuba"
   Templates skip any element whose value comes back null, so nothing ever renders empty. */
export const isPending = (v) => Boolean(v && typeof v === "object" && v.pending);
export function clean(v) {
  if (v == null) return null;
  if (isPending(v)) return FLAGS.prune ? v.prune ?? null : v.text;
  if (typeof v !== "string") return v;
  if (!FLAGS.prune) return v;
  const s = v.replace(/\[[^\]]*\]/g, "")
    .replace(/\s*[·,]\s*(?=[·,]|$)/g, "")   // separators left dangling before another separator or the end
    .replace(/^\s*[·,]\s*/, "")              // …or at the start
    .replace(/\s{2,}/g, " ").trim();
  return s || null;
}
/* A list with placeholder entries dropped under PRUNE */
export const cleanList = (arr) => (arr || []).map(clean).filter(Boolean);
/* A value that only exists as a placeholder until real data arrives: `real` if set, else the placeholder (or null under PRUNE) */
export const orPh = (real, placeholder) => (real != null && real !== "" ? real : FLAGS.prune ? null : placeholder);

export const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/* Escaped text with every Arabic run isolated (<bdi lang=ar dir=rtl>), so mixed English/Arabic keeps its punctuation in place */
export const bidi = (s) => esc(s).replace(/[؀-ۿ][؀-ۿ\s]*[؀-ۿ]|[؀-ۿ]/g, (m) => `<bdi lang="ar" dir="rtl">${m}</bdi>`);

/* Responsive image: <picture> AVIF → WebP → JPEG from the variants in build/images.json (Section 6 pattern).
   sizes: the slot's rendered width. lazy: false only for images in the first screen. */
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, "build/images.json"), "utf8"));
export function picture(src, { alt = "", sizes = "100vw", lazy = true, cls = "", style = "", priority = false } = {}) {
  const key = src.replace(/^\//, "");
  const m = MANIFEST[key];
  if (!m) throw new Error(`picture(): no variants for ${src} (run build/images.mjs)`);
  const base = "/" + key.replace(/\.jpg$/, "");
  const set = (ext) => m.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const attrs = [
    `src="${src}"`, `alt="${esc(alt)}"`, `width="${m.w}"`, `height="${m.h}"`, `sizes="${sizes}"`, `decoding="async"`,
    lazy ? `loading="lazy"` : "", priority ? `fetchpriority="high"` : "", cls ? `class="${cls}"` : "", style ? `style="${style}"` : "",
    alt ? "" : `aria-hidden="true"`,
  ].filter(Boolean).join(" ");
  return `<picture><source type="image/avif" srcset="${set("avif")}" sizes="${sizes}"><source type="image/webp" srcset="${set("webp")}" sizes="${sizes}"><img ${attrs}></picture>`;
}
/* Largest WebP variant up to `max` px wide, for CSS backgrounds (glyph fill, blurred layers). */
export function webp(src, max = 960) {
  const key = src.replace(/^\//, "");
  const m = MANIFEST[key];
  if (!m) throw new Error(`webp(): no variants for ${src}`);
  const w = m.widths.filter((x) => x <= max).pop() || m.widths[0];
  return "/" + key.replace(/\.jpg$/, `-${w}.webp`);
}
