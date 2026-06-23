import { chromium } from "playwright";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "qa");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3500);

const arts = await page.$$("#work article");
for (let i = 0; i < Math.min(2, arts.length); i++) {
  await arts[i].scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await arts[i].screenshot({ path: path.join(outDir, `rev3-card-${i + 1}.png`) });
  console.log("captured card", i + 1);
}
await browser.close();
