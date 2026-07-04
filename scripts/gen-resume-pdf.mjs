import { chromium } from "playwright";
import path from "node:path";

const PAGE_URL = "http://localhost:3000/resume";
const OUT = path.resolve(process.cwd(), "public/Mahroos-Mahthie-Resume.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(PAGE_URL, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });

// Measure the printable resume card height (CSS px) under print layout.
const heightPx = await page.evaluate(() => {
  const el = document.querySelector(".bg-res-panel");
  return el ? el.scrollHeight : document.body.scrollHeight;
});

// A4 printable height at 96dpi ≈ 1123px. Target ~88% fill so a near-boundary
// block (with break-inside-avoid) never gets pushed to a 2nd page.
const A4_PX = 1123;
const scale = Math.min(1, (A4_PX * 0.88) / heightPx);

await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  scale: Math.max(0.5, Number(scale.toFixed(3))),
});

await browser.close();
console.log(`Generated PDF — content height ${heightPx}px, scale ${scale.toFixed(3)} -> ${OUT}`);
