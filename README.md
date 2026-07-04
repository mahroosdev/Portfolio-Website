# Mahroos Mahthie Portfolio

Personal portfolio website for **MFM Mahroos Mahthie**, a Junior Software Engineer and AI-assisted developer. The site presents selected web projects, desktop/mobile prototypes, education, certifications, resume details, and contact information.

## Tech Stack

- Next.js 16 App Router with static export
- TypeScript and React
- Tailwind CSS v4
- GSAP, Framer Motion, and Lenis for motion and scrolling
- Static assets served from `public/`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

The static production site is generated in the `out/` folder.

## Deploy With Netlify

When connecting this GitHub repository to Netlify, use:

- Build command: `npm run build`
- Publish directory: `out`

Netlify will rebuild the static site automatically on each push.

## Project Content

Main editable content is stored in:

- `data/portfolio.ts` - profile details, links, skills, projects, education, certifications, and contact information
- `public/assets/` - screenshots, certificates, and app images
- `public/RESUME.pdf` and `public/RESUME.docx` - downloadable resume files

## Repository Notes

Generated folders and local-only files are ignored, including `node_modules/`, `.next/`, `out/`, logs, scratch files, and `out.zip`. Commit the source files and public assets, then let Netlify build the final hosted version.
