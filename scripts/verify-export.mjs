import { chromium } from "playwright";
import path from "node:path";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(4500); // let preloader finish
await page.screenshot({ path: path.resolve(import.meta.dirname, "qa/export-hero.png") });

const cssLoaded = await page.evaluate(() => {
  const bg = getComputedStyle(document.body).backgroundColor;
  const font = getComputedStyle(document.body).fontFamily;
  return { bg, font: font.slice(0, 40), stylesheets: document.styleSheets.length };
});
console.log("export check:", JSON.stringify(cssLoaded));

await browser.close();
