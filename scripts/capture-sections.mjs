import { chromium } from "playwright";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "qa");
const browser = await chromium.launch();

// desktop section captures
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(4200);

for (const [sel, name] of [["#about", "sec-skills-about"], ["#services", "sec-services"], ["#work", "sec-work"]]) {
  const el = await page.$(sel);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await el.screenshot({ path: path.join(outDir, `${name}.png`) });
  console.log("captured", name);
}

// the static skills cluster section (between hero and about) — second <section>
const skills = await page.$("main > section:nth-of-type(2)");
if (skills) {
  await skills.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await skills.screenshot({ path: path.join(outDir, "sec-skills.png") });
  console.log("captured sec-skills");
}

// mobile web-work to verify mobile screenshot swap
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 90000 });
await m.waitForTimeout(4200);
const ww = await m.$("#web-work");
await ww.scrollIntoViewIfNeeded();
await m.waitForTimeout(1200);
await ww.screenshot({ path: path.join(outDir, "sec-webwork-mobile.png") });
console.log("captured sec-webwork-mobile");

await browser.close();
