// Not part of the site build: needs puppeteer-core + Chrome, and the dev server on :8085 serving this repo.
// Run from the repo root: node build/og.mjs .   (add --guides to draw the WhatsApp square-crop area, written beside the repo)
import puppeteer from "puppeteer-core";
import fs from "fs";
const repo = process.argv[2], guides = process.argv.includes("--guides");
const out = guides ? `${repo}/../shots-og` : `${repo}/assets/img/og`; fs.mkdirSync(out, { recursive: true });
const BASE = "http://localhost:8085";
const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Lalezar&display=block"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alexandria:wght@900&text=%D9%A7&display=block">`;
const page0 = (body, css = "") => `<!doctype html><html><head><base href="${BASE}/">${FONTS}<style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#030c16}
${css}</style></head><body>${body}</body></html>`;

/* General card. Text block lives inside the centre square (x 285–915) so WhatsApp's square crop keeps it whole. */
const general = page0(`
<div class="v">٧</div>

<img class="logo" src="/assets/brand/l7-mark-light.png" alt="">
<div class="txt">
  <div class="en">STORIES MADE<br>FOR EVERY<br>SCREEN.</div>
  <div class="ar" lang="ar" dir="rtl">حكايات لكل الشاشات</div>
</div>
${guides ? `<div class="safe"></div>` : ""}`, `
.v{position:absolute;right:-6px;top:-118px;font:900 780px/1 Alexandria;color:transparent;
   background:url(/assets/img/bhd-still.jpg) 50% 30%/480px auto no-repeat;-webkit-background-clip:text;background-clip:text}
.logo{position:absolute;left:305px;top:56px;height:44px}
.txt{position:absolute;left:305px;top:178px;width:600px}
.en{font:400 60px/1.02 Anton;color:#fff;letter-spacing:.005em}
.ar{margin-top:20px;font:400 36px/1.35 Lalezar;color:#9fcbee;text-align:left}
.safe{position:absolute;left:285px;top:0;width:630px;height:630px;outline:2px dashed #e50914}`);

/* Crops: one image, 1200×630 cover at a given focus */
const crop = (src, pos) => page0(`<img src="${src}" style="width:1200px;height:630px;object-fit:cover;object-position:${pos};display:block">`);

const jobs = [
  ["level7-og", general],
  ["beit-hadam", crop("/assets/img/bhd-still.jpg", "50% 38%")],
  ["djinn-wedding", crop("/assets/posters/djinn-wedding.jpg", "50% 22%")],
  ["deep-state", crop("/assets/img/deep-state-key.jpg", "50% 22%")],
  ["said-el-marouk", crop("/assets/img/said-portrait.jpg", "50% 12%")],
];
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const [name, html] of jobs) {
  const p = await b.newPage(); await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await p.setContent(html, { waitUntil: "networkidle0" });
  await p.evaluate(() => document.fonts.ready);
  let q = 88, file = `${out}/${name}${guides ? "-guides" : ""}.jpg`;
  do { await p.screenshot({ path: file, type: "jpeg", quality: q }); q -= 4; } while (fs.statSync(file).size > 300 * 1024 && q > 50);
  console.log(`${name}: ${Math.round(fs.statSync(file).size / 1024)} KB (q${q + 4})`);
  await p.close();
}
await b.close();
