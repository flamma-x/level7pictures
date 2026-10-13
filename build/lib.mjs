// Small helpers shared by the templates.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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
