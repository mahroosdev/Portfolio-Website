import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "qa");
mkdirSync(outDir, { recursive: true });

const breakpoints = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const bp of breakpoints) {
  const page = await browser.newPage({ viewport: { width: bp.width, height: bp.height } });
  await page.emulateMedia({ reducedMotion: "reduce" }); // skip preloader/reveal animations for stable full-page shots
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  // force-load all lazy images
  await page.evaluate(async () => {
    document.querySelectorAll("img[loading=lazy]").forEach((img) => img.setAttribute("loading", "eager"));
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map((img) => new Promise((res) => { img.onload = img.onerror = res; }))
    );
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, `${bp.name}.png`), fullPage: true });
  console.log(`captured ${bp.name}`);
  await page.close();
}

await browser.close();
console.log("QA screenshots done:", outDir);
