import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const sites = [
  { slug: "nexapath", url: "https://nexapath.netlify.app/" },
  { slug: "t-aura", url: "https://t-aura.netlify.app/" },
  { slug: "t-dataforge", url: "https://t-dataforge.netlify.app/" },
  { slug: "t-paperlift", url: "https://t-paperlift.netlify.app/" },
  { slug: "t-veritas", url: "https://t-veritas.netlify.app/" },
  { slug: "demo-project-web", url: "https://demo-project-web.netlify.app/" },
  { slug: "aura-w", url: "https://aura-w.netlify.app/" },
  { slug: "noir-web", url: "https://noir-web.netlify.app/" },
  { slug: "zenith-s", url: "https://zenith-s.netlify.app/" },
  { slug: "zenith-w", url: "https://zenith-w.netlify.app/" },
  { slug: "nexa-dev", url: "https://nexa-dev.netlify.app/" },
  { slug: "nexa-folio", url: "https://nexa-folio.netlify.app/" },
  { slug: "nexa-scan", url: "https://nexa-scan.netlify.app/" },
  { slug: "nexa-vault", url: "https://nexa-vault.netlify.app/" },
];

const outDir = path.resolve(import.meta.dirname, "../public/assets/screenshots");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const meta = [];

for (const site of sites) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try {
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500); // let entrance animations settle
    await page.screenshot({ path: path.join(outDir, `${site.slug}.png`) });
    const title = await page.title();
    const description = await page
      .$eval('meta[name="description"]', (el) => el.content)
      .catch(() => "");
    meta.push({ ...site, ok: true, title, description });
    console.log(`OK   ${site.slug} — ${title}`);
  } catch (err) {
    meta.push({ ...site, ok: false, error: String(err).slice(0, 200) });
    console.log(`FAIL ${site.slug} — ${err}`);
  } finally {
    await page.close();
  }
}

await browser.close();
writeFileSync(path.resolve(import.meta.dirname, "projects-meta.json"), JSON.stringify(meta, null, 2));
console.log(`\nDone: ${meta.filter((m) => m.ok).length}/${sites.length} captured`);
