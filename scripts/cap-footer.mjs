import { chromium } from "playwright";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "qa");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(800);

const footer = await page.$("footer");
await footer.screenshot({ path: path.join(outDir, "rev3-footer.png") });

// measure center text position vs page center
const info = await page.evaluate(() => {
  const labels = Array.from(document.querySelectorAll("footer div span")).map((s) => s.textContent.trim()).filter(Boolean);
  const mid = document.querySelector("footer > div > div");
  const r = mid.getBoundingClientRect();
  return {
    labels: labels.join(" "),
    midCenter: Math.round(r.left + r.width / 2),
    pageCenter: Math.round(window.innerWidth / 2),
  };
});
console.log(JSON.stringify(info));
console.log("offset from page center:", Math.abs(info.midCenter - info.pageCenter), "px");
await browser.close();
