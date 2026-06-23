import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "qa");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);

// 1. role word rotation — sample twice ~3s apart
const role1 = await page.$eval("[aria-label*='AI Data Specialist'] .role-swap", (e) => e.textContent.trim());
await page.waitForTimeout(3000);
const role2 = await page.$eval("[aria-label*='AI Data Specialist'] .role-swap", (e) => e.textContent.trim());
console.log(`role rotation: "${role1}" -> "${role2}"`, role1 !== role2 ? "OK (changed)" : "FAIL (stuck)");

// 2. stats count
const statCount = await page.$$eval("#about [data-counter]", (els) => els.length);
console.log("stats count (expect 3):", statCount, statCount === 3 ? "OK" : "FAIL");

// 3. services subtitle
const servicesText = await page.$eval("#services", (e) => e.textContent);
console.log("services subtitle 'Seven':", servicesText.includes("Seven service areas") ? "OK" : "FAIL");
const serviceCount = await page.$$eval("#services li h3", (els) => els.length);
console.log("service cards (expect 7):", serviceCount, serviceCount === 7 ? "OK" : "FAIL");

// 4. footer icons + plain text
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(800);
const footerIconLinks = await page.$$eval("footer a[target='_blank']", (els) => els.length);
const footerText = await page.$eval("footer", (e) => e.textContent);
console.log("footer icon links (expect 3):", footerIconLinks, footerIconLinks === 3 ? "OK" : "FAIL");
console.log("footer has plain labels:", ["LinkedIn", "GitHub", "Upwork"].every((l) => footerText.includes(l)) ? "OK" : "FAIL");

// 5. contact line no hrs/week
const contactText = await page.$eval("#contact", (e) => e.textContent);
console.log("contact removed 'hrs/week':", !contactText.toLowerCase().includes("hrs/week") ? "OK" : "FAIL");

// 6. remotelink connected image present
const rlImg = await page.$eval("img[alt*='Android device connected']", (e) => e.getAttribute("src")).catch(() => null);
console.log("RemoteLink connected image:", rlImg ? `OK (${rlImg})` : "FAIL");

console.log("\npage errors:", errors.length ? errors.slice(0, 4) : "none");

// captures
await page.evaluate(() => document.querySelector("#work").scrollIntoView());
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(outDir, "rev3-work.png"), fullPage: false });

// hover first featured card main image -> should raise above overlays
const firstCard = await page.$("#work .card-media");
await firstCard.hover();
await page.waitForTimeout(700);
await page.screenshot({ path: path.join(outDir, "rev3-work-hover.png"), fullPage: false });
console.log("captured work + hover");

for (const [w, name] of [[1440, "rev3-desktop"], [390, "rev3-mobile"]]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
  console.log("captured", name);
}

await browser.close();
