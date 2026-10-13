// node build/images.mjs  (needs ffmpeg + ffprobe on PATH)
// For every JPEG in assets/img and assets/posters: AVIF + WebP at 480/960/1600/2400w (never above the original),
// skipping variants that already exist. Writes build/images.json, which picture() in build/lib.mjs reads.
import { execFileSync, execFile } from "child_process";
import fs from "fs";
import path from "path";
import { ROOT } from "./lib-root.mjs";

const STEPS = [480, 960, 1600, 2400];
const probe = (f) => execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", f]).toString().trim().split(",").map(Number);
const widthsFor = (w) => { const ws = STEPS.filter((s) => s <= w); if (!ws.length || w / ws[ws.length - 1] > 1.15) ws.push(w); return ws; };
const run = (args) => new Promise((res, rej) => execFile("ffmpeg", ["-v", "error", "-y", ...args], (e) => (e ? rej(e) : res())));

const jobs = [], manifest = {};
for (const dir of ["assets/img", "assets/posters"]) {
  for (const f of fs.readdirSync(path.join(ROOT, dir)).filter((x) => x.endsWith(".jpg"))) {
    const src = path.join(ROOT, dir, f), base = src.slice(0, -4);
    const [w, h] = probe(src), widths = widthsFor(w);
    manifest[`${dir}/${f}`] = { w, h, widths };
    for (const ww of widths) {
      const scale = `scale=${ww}:-2:flags=lanczos`;
      if (!fs.existsSync(`${base}-${ww}.avif`)) jobs.push(() => run(["-i", src, "-vf", `${scale}:out_range=full,format=yuv420p`, "-c:v", "libaom-av1", "-still-picture", "1", "-crf", "26", "-cpu-used", "4", `${base}-${ww}.avif`]));
      if (!fs.existsSync(`${base}-${ww}.webp`)) jobs.push(() => run(["-i", src, "-vf", scale, "-c:v", "libwebp", "-quality", "82", `${base}-${ww}.webp`]));
    }
  }
}
let i = 0;
await Promise.all(Array.from({ length: 6 }, async () => { while (i < jobs.length) await jobs[i++](); }));
fs.writeFileSync(path.join(ROOT, "build/images.json"), JSON.stringify(manifest, null, 1) + "\n");
console.log(`${Object.keys(manifest).length} images in manifest, ${jobs.length} new variant files`);
