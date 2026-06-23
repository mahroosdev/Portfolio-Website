import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });

// preloader should complete and hide itself (~3.2s timeline)
await page.waitForTimeout(4000);
const preloaderGone = await page.evaluate(() => {
  const overlays = Array.from(document.querySelectorAll("div")).filter((d) =>
    d.className.includes?.("z-[120]")
  );
  return overlays.every((o) => getComputedStyle(o).display === "none");
});
console.log("preloader hidden:", preloaderGone);

// hero name lines should be visible (yPercent animated to 0)
const heroVisible = await page.evaluate(() => {
  const line = document.querySelector(".hero-line > *");
  if (!line) return false;
  const r = line.getBoundingClientRect();
  return r.height > 50 && getComputedStyle(line).opacity === "1";
});
console.log("hero lines visible:", heroVisible);

// scroll to about — counters should animate to final values
await page.evaluate(() => document.querySelector("#about").scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(2600);
const counters = await page.$$eval("[data-counter]", (els) => els.map((e) => e.textContent));
console.log("counters:", counters.join(", "), "(expected 13, 2, 100, 35)");

// role word rotation: exactly one role word visible
const roleState = await page.evaluate(() => {
  const c = document.querySelector('[aria-label*="AI Data Specialist"]');
  if (!c) return "missing";
  const visible = Array.from(c.querySelectorAll("span span")).filter((w) => {
    const cs = getComputedStyle(w);
    return parseFloat(cs.opacity) > 0.5;
  });
  return visible.map((v) => v.textContent).join("|") || "none-visible-midswap";
});
console.log("visible role word:", roleState);

await browser.close();
