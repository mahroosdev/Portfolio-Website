import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "qa");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(4200); // preloader + intro

// ---- audits ----
const navText = await page.$eval("header nav a[aria-label='Back to top']", (e) => e.textContent.trim());
console.log("nav logo:", JSON.stringify(navText), navText.startsWith("PORTFOLIO") ? "OK" : "FAIL");

const heroSocialCount = await page.$$eval("section:first-of-type a[target='_blank']", (els) => els.length);
console.log("hero social links (expect 0):", heroSocialCount, heroSocialCount === 0 ? "OK" : "FAIL");

const hasMarqueeTrack = await page.$(".marquee-track");
console.log("scrolling marquee removed:", hasMarqueeTrack ? "FAIL (still present)" : "OK");

// services count + 3rd title
const services = await page.$$eval("#services li h3", (els) => els.map((e) => e.textContent.trim()));
console.log("services count (expect 7):", services.length, services.length === 7 ? "OK" : "FAIL");
console.log("3rd service (expect Software Development):", services[2]);

// nexa tools order
await page.evaluate(() => document.querySelector("#web-work").scrollIntoView());
await page.waitForTimeout(800);
const nexaOrder = await page.evaluate(() => {
  const groups = Array.from(document.querySelectorAll("#web-work h3"));
  const nexa = groups.find((h) => h.textContent.includes("Nexa Tools"));
  const grid = nexa.parentElement.parentElement.querySelectorAll("a h4");
  return Array.from(grid).map((e) => e.textContent.trim());
});
console.log("Nexa Tools order:", nexaOrder.join(" → "));

// new sites present
const allLinks = await page.$$eval("#web-work a[target='_blank']", (els) => els.map((e) => e.getAttribute("href")));
["ultra-theme-forge", "chroma-forge", "obsidian-xpro"].forEach((s) => {
  console.log(`  ${s}:`, allLinks.some((h) => h.includes(s)) ? "present" : "MISSING");
});
const noopenerOk = await page.$$eval("a[target='_blank']", (els) => els.every((e) => (e.getAttribute("rel") || "").includes("noopener")));
console.log("all _blank links have rel=noopener:", noopenerOk ? "OK" : "FAIL");

// stat 4
await page.evaluate(() => document.querySelector("#about").scrollIntoView());
await page.waitForTimeout(2400);
const stats = await page.$$eval("#about [data-counter]", (els) => els.map((e) => e.textContent));
const statLabels = await page.$$eval("#about [data-counter]", (els) => els.map((e) => e.closest("div").querySelector("p")?.textContent.trim()));
console.log("stats:", stats.map((v, i) => `${v} ${statLabels[i]}`).join(" | "));

console.log("\nconsole errors:", errors.length ? errors.slice(0, 5) : "none");

// ---- breakpoint screenshots ----
for (const [w, name] of [[1440, "rev2-desktop"], [768, "rev2-tablet"], [390, "rev2-mobile"]]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
  console.log("captured", name);
}

await browser.close();
