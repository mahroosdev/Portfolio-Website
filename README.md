# Mahroos Mahthie — Portfolio Website

High-end animated portfolio for **MFM Mahroos Mahthie** — AI Data Specialist · Front-End Developer · Virtual Assistant.

Dark + gold editorial design with smooth scrolling (Lenis), scroll-triggered animations (GSAP ScrollTrigger), a preloader, custom cursor, rotating role words, animated stat counters, and live previews of all deployed projects.

## Tech stack

- **Next.js 16** (App Router, static export) + **TypeScript**
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** — reveals, counters, parallax
- **Lenis** — smooth scrolling
- Fonts: **Clash Display** + **Satoshi** (Fontshare CDN)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
```

The static site is exported to the **`out/`** folder (configured via `output: "export"` in [next.config.ts](next.config.ts)). No server needed — it is plain HTML/CSS/JS.

## Deploy to Netlify

**Option A — drag & drop (fastest):**
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the **`out`** folder onto the page — done.

**Option B — connect a Git repository (auto-deploys):**
1. Push this folder to a GitHub repository
2. In Netlify: *Add new site → Import an existing project* → pick the repo
3. Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. Deploy. Every push re-deploys automatically.

**Vercel** also works out of the box: *Import project* → framework auto-detected as Next.js → deploy (Vercel handles the static export automatically).

## Editing content

All text, projects, links, stats, and experience live in one file: [data/portfolio.ts](data/portfolio.ts).
Edit that file to update the site — no component changes needed.

Images live in:
- `public/assets/screenshots/` — live-site screenshots (one per Netlify project)
- `public/assets/apps/` — NexaFlow / RemoteLink app screenshots

## Maintenance scripts (`scripts/`)

- `capture-sites.mjs` — re-captures homepage screenshots of all live Netlify sites via Playwright
  (`node scripts/capture-sites.mjs` — refresh these whenever the live sites change)
- `qa-breakpoints.mjs` — full-page screenshots at desktop/tablet/mobile widths for visual QA
- `verify-motion.mjs` — automated check that the preloader, hero reveal, and counters animate correctly

## Notes

- `t-aura.netlify.app` currently returns **404 at its root URL** and is intentionally not listed on the site. Fix the deploy and add it back in `data/portfolio.ts` if desired.
- Résumé PDFs are intentionally **not** included on the site — only a curated summary appears.
