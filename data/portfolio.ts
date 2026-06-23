/* Single source of truth for all portfolio content. */

export const person = {
  name: "Mahroos Mahthie",
  fullName: "MFM Mahroos Mahthie",
  roles: ["AI Data Specialist", "Front-End Developer", "Virtual Assistant", "Automation Builder"],
  tagline:
    "I combine AI-powered data operations, front-end development, and Python automation to ship fast, accurate, high-quality work — across web, desktop, and data.",
  location: "Sri Lanka · Remote worldwide",
  availability: "Ready to start immediately",
  email: "mahroosmahthie7@gmail.com",
};

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahroos-mahthie-b707a73a5",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/mahroos27", icon: "github" },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01cafe3e73de4fe3fe",
    icon: "upwork",
  },
] as const;

export const stats = [
  { value: 16, suffix: "+", label: "Live sites & tools shipped" },
  { value: 2, suffix: "", label: "Desktop products built" },
  { value: 100, suffix: "%", label: "Accuracy standard on data work" },
];

export const skillGroups = [
  {
    title: "Data & Automation",
    skills: ["Data Entry", "Data Cleaning", "Data Mining", "Python", "PDF → Excel/CSV", "Workflow Automation"],
  },
  {
    title: "AI & Quality",
    skills: ["AI Tools", "Prompt Engineering", "Content QA", "Fact-Checking", "ML Basics", "Data Annotation"],
  },
  {
    title: "Front-End Development",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO Optimization"],
  },
  {
    title: "VA, HR & Research",
    skills: ["Email Management", "Scheduling", "HR Management", "Recruitment", "Market Research", "Social Media"],
  },
];

export const services = [
  {
    title: "Web Development",
    description:
      "Responsive websites, portfolios, landing pages, dashboards, and internal tools — clean builds with SEO-optimized pages.",
  },
  {
    title: "AI & Data Operations",
    description:
      "High-accuracy data entry and management, PDF to Excel/CSV conversion, AI data labeling and annotation, Python scripting.",
  },
  {
    title: "Software Development",
    description:
      "Desktop and web applications, automation tools, and internal dashboards built end-to-end — from Python desktop software to responsive front-ends.",
  },
  {
    title: "Automation & Tooling",
    description:
      "Python workflow automation and purpose-built desktop or browser tools that remove repetitive work.",
  },
  {
    title: "Virtual Assistance & Admin",
    description:
      "Full virtual assistant services: email management, scheduling, research, and admin coordination.",
  },
  {
    title: "HR & Recruitment Support",
    description:
      "End-to-end recruitment support: sourcing, applicant tracking, HR data management, and admin operations.",
  },
  {
    title: "Content, SEO & Research",
    description:
      "AI content fact-checking and QA, SEO-optimized content, social media management, and deep web/market research.",
  },
];

export const marqueeItems = [
  "Python",
  "JavaScript",
  "AI Data Ops",
  "HTML5 / CSS3",
  "Automation",
  "Prompt Engineering",
  "Responsive Design",
  "Data Annotation",
  "SEO",
  "Electron",
  "Flutter",
  "FastAPI",
];

export type FeaturedProject = {
  id: string;
  name: string;
  category: string;
  status?: string;
  description: string;
  highlights: string[];
  tech: string[];
  role: string;
  link?: { label: string; href: string };
  media: { src: string; alt: string }[];
  mobileShot?: { src: string; alt: string };
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "nexaflow",
    name: "NexaFlow",
    category: "Personal · Desktop Product",
    status: "v1.0 — Windows, Android & Chrome",
    description:
      "A local-first desktop automation suite. NexaFlow records and replays mouse/keyboard workflows with a smart capture mode, scheduling, session stats, and consent-based remote control from an Android companion app or Chrome extension.",
    highlights: [
      "Workflow recorder with Smart and Full capture modes, playback speed control, and repeat/loop scheduling",
      "Compact Focus Mode overlay with global hotkeys (F9 record, F10 play, F11 stop)",
      "Android companion and Chrome MV3 extension pair over local Wi-Fi with expiring codes — remote access only when the desktop allows it",
      "Packaged as a Windows installer with checksummed releases, user guide, and store-ready Android AAB",
    ],
    tech: ["Python", "Tkinter", "WebSockets", "Android", "Chrome Extension (MV3)", "PyInstaller", "Inno Setup"],
    role: "Sole developer & product designer",
    media: [
      { src: "/assets/apps/nexaflow-desktop-1.png", alt: "NexaFlow desktop recorder — workflow capture screen" },
      { src: "/assets/apps/nexaflow-desktop-2.png", alt: "NexaFlow Focus Mode overlay with record and playback controls" },
    ],
    mobileShot: { src: "/assets/apps/nexaflow-mobile-1.jpg", alt: "NexaFlow Android companion — playback screen" },
  },
  {
    id: "remotelink",
    name: "RemoteLink",
    category: "Personal · Desktop + Mobile",
    status: "Working build — Windows + Android",
    description:
      "A cross-platform remote control system: an Electron desktop engine streams the PC to a Flutter Android client over a custom WebSocket protocol, with pairing codes, multi-monitor support, and a full remote touchpad/keyboard.",
    highlights: [
      "Desktop engine dashboard with live connection state, pairing hub, host IP detection, and event stream",
      "Multi-monitor configuration with per-screen quality and FPS controls via the Desktop Duplication API",
      "Android client with screen viewer, touchpad area, click/scroll controls, text-to-PC, and full modifier/function key support",
      "Custom JSON message schema shared between desktop and mobile via a TypeScript package",
    ],
    tech: ["Electron", "React", "TypeScript", "Flutter", "WebSockets", "Vite"],
    role: "Sole developer",
    media: [
      { src: "/assets/apps/remotelink-desktop-1.png", alt: "RemoteLink desktop engine — Android device connected with live latency and bitrate metrics" },
      { src: "/assets/apps/remotelink-desktop-2.png", alt: "RemoteLink monitor configuration with hardware interface preview" },
    ],
    mobileShot: { src: "/assets/apps/remotelink-mobile-1.jpg", alt: "RemoteLink Android client — remote touchpad and mouse controls" },
  },
  {
    id: "nexaos",
    name: "Amir / NexaOS",
    category: "Personal · Flagship — Ongoing",
    status: "In development — planning & Phase 0",
    description:
      "A local-first AI assistant designed to grow into an AI-integrated operating system experience. Amir runs a local model on ordinary hardware — conversations and data never leave the machine — and NexaOS is the long-term Linux-based system built around it.",
    highlights: [
      "100% local: chat, summarization, and document Q&A on-device via Ollama with small quantized models",
      "Sized for real hardware — the first edition targets 8 GB RAM PCs with CPU-only inference",
      "FastAPI backend, WebSocket token streaming, SQLite full-text search, and local vector retrieval",
      "Staged roadmap with three hardware tiers (Lite / Standard / Pro) — no public release claimed yet",
    ],
    tech: ["Python", "FastAPI", "WebSockets", "SQLite", "Ollama", "Quantized GGUF models", "Linux"],
    role: "Project architect & developer",
    media: [],
  },
  {
    id: "nexapath",
    name: "NexaPath",
    category: "Personal · Web Platform",
    description:
      "An education and workforce innovation platform concept — certified learning, career pathways, and certificate verification for students, employers, and institutions.",
    highlights: [
      "Multi-audience landing experience for students, employers, and institutions",
      "Certificate verification flow and structured program presentation",
      "Fully responsive, SEO-ready front-end build",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO"],
    role: "Sole designer & developer",
    link: { label: "Visit live site", href: "https://nexapath.netlify.app/" },
    media: [{ src: "/assets/screenshots/nexapath.png", alt: "NexaPath — education and workforce platform homepage" }],
  },
];

export type WebProject = {
  slug: string;
  name: string;
  description: string;
  href: string;
  image: string;
  mobileImage?: string;
};

export type WebGroup = {
  title: string;
  note: string;
  projects: WebProject[];
};

export const webGroups: WebGroup[] = [
  {
    title: "Business Automation Tools",
    note: "Demo tools with local demo modes — built around my AI data specialty",
    projects: [
      {
        slug: "t-dataforge",
        name: "DataForge",
        description: "Data profiling and cleanup dashboard with local demo mode.",
        href: "https://t-dataforge.netlify.app/",
        image: "/assets/screenshots/t-dataforge.png",
        mobileImage: "/assets/screenshots/mobile/t-dataforge.png",
      },
      {
        slug: "t-paperlift",
        name: "PaperLift",
        description: "PDF table extraction interface with local demo mode.",
        href: "https://t-paperlift.netlify.app/",
        image: "/assets/screenshots/t-paperlift.png",
        mobileImage: "/assets/screenshots/mobile/t-paperlift.png",
      },
      {
        slug: "t-veritas",
        name: "Veritas",
        description: "Content quality analyzer with local demo scoring.",
        href: "https://t-veritas.netlify.app/",
        image: "/assets/screenshots/t-veritas.png",
        mobileImage: "/assets/screenshots/mobile/t-veritas.png",
      },
    ],
  },
  {
    title: "Nexa Tools — Offline-First Utilities",
    note: "Browser tools that work fully offline, with local storage and PWA support",
    projects: [
      {
        slug: "nexa-folio",
        name: "Nexa Folio Ultra",
        description: "Offline notes and tasks workspace with themes, weekly activity, and backup export.",
        href: "https://nexa-folio.netlify.app/",
        image: "/assets/screenshots/nexa-folio.png",
        mobileImage: "/assets/screenshots/mobile/nexa-folio.png",
      },
      {
        slug: "nexa-scan",
        name: "Nexa Scan Suite",
        description: "Professional QR and barcode suite — generate, decode, and keep history, fully offline.",
        href: "https://nexa-scan.netlify.app/",
        image: "/assets/screenshots/nexa-scan.png",
        mobileImage: "/assets/screenshots/mobile/nexa-scan.png",
      },
      {
        slug: "ultra-theme-forge",
        name: "Ultra Theme Forge",
        description: "AI-powered mockup preview engine — 50 website types × 3 variants for 150 unique previews.",
        href: "https://ultra-theme-forge.netlify.app/",
        image: "/assets/screenshots/ultra-theme-forge.png",
        mobileImage: "/assets/screenshots/mobile/ultra-theme-forge.png",
      },
      {
        slug: "chroma-forge",
        name: "Chroma Forge Pro",
        description: "Professional color design system with specialized workspaces for web, UI/UX, and graphic design.",
        href: "https://chroma-forge.netlify.app/",
        image: "/assets/screenshots/chroma-forge.png",
        mobileImage: "/assets/screenshots/mobile/chroma-forge.png",
      },
      {
        slug: "nexa-vault",
        name: "Nexa Vault Studio",
        description: "Offline password studio with classic, passphrase, quantum, and PIN modes plus entropy scoring.",
        href: "https://nexa-vault.netlify.app/",
        image: "/assets/screenshots/nexa-vault.png",
        mobileImage: "/assets/screenshots/mobile/nexa-vault.png",
      },
      {
        slug: "nexa-dev",
        name: "Nexa Dev",
        description: "Client-side developer toolbox — URL formatter, UTM builder, copy tools, and JSON export.",
        href: "https://nexa-dev.netlify.app/",
        image: "/assets/screenshots/nexa-dev.png",
        mobileImage: "/assets/screenshots/mobile/nexa-dev.png",
      },
    ],
  },
  {
    title: "Brand Concept Sites",
    note: "High-end landing page concepts — typography, motion, and product storytelling",
    projects: [
      {
        slug: "aura-w",
        name: "AURA — Premium Coffee",
        description: "Single-origin coffee brand concept with editorial design.",
        href: "https://aura-w.netlify.app/",
        image: "/assets/screenshots/aura-w.png",
        mobileImage: "/assets/screenshots/mobile/aura-w.png",
      },
      {
        slug: "noir-web",
        name: "NOIR — Audio Instruments",
        description: "Premium audio hardware brand concept.",
        href: "https://noir-web.netlify.app/",
        image: "/assets/screenshots/noir-web.png",
        mobileImage: "/assets/screenshots/mobile/noir-web.png",
      },
      {
        slug: "obsidian-xpro",
        name: "Obsidian X Pro",
        description: "AXIOM Labs flagship camera-phone launch concept — bold review-style product reveal.",
        href: "https://obsidian-xpro.netlify.app/",
        image: "/assets/screenshots/obsidian-xpro.png",
        mobileImage: "/assets/screenshots/mobile/obsidian-xpro.png",
      },
      {
        slug: "zenith-s",
        name: "Zenith V-1 — Watch",
        description: "Titanium mechanical watch concept — product storytelling.",
        href: "https://zenith-s.netlify.app/",
        image: "/assets/screenshots/zenith-s.png",
        mobileImage: "/assets/screenshots/mobile/zenith-s.png",
      },
      {
        slug: "zenith-w",
        name: "The Zenith V-One",
        description: "Alternate Zenith concept exploring a different art direction.",
        href: "https://zenith-w.netlify.app/",
        image: "/assets/screenshots/zenith-w.png",
        mobileImage: "/assets/screenshots/mobile/zenith-w.png",
      },
    ],
  },
  {
    title: "Demo Hub",
    note: "A hub of demo project concepts",
    projects: [
      {
        slug: "demo-project-web",
        name: "Portfolio Pro",
        description: "Demo project hub presenting multiple website concepts in one place.",
        href: "https://demo-project-web.netlify.app/",
        image: "/assets/screenshots/demo-project-web.png",
        mobileImage: "/assets/screenshots/mobile/demo-project-web.png",
      },
    ],
  },
];

export const experience = [
  {
    period: "Oct 2025 — Present",
    title: "AI Data Specialist, Front-End Developer & Virtual Assistant",
    org: "Self-Employed / Freelance",
    points: [
      "Automate data entry and manage structured databases using Python & AI tools with 100% accuracy",
      "Convert complex PDF documents into clean, analysis-ready Excel and CSV formats",
      "Develop responsive websites, portfolios, landing pages, dashboards, and internal tools",
      "Fact-check and QA AI-generated content for accuracy, SEO compliance, and professionalism",
      "Provide full virtual assistant services: email management, scheduling, and admin coordination",
    ],
  },
  {
    period: "2 Years",
    title: "Social Media Manager & Digital Content Strategist",
    org: "Freelance / Agency",
    points: [
      "Managed multiple client social media accounts driving organic engagement and audience growth",
      "Created SEO-optimized content using modern AI tools to elevate brand visibility",
      "Conducted market research to identify digital trends and inform content strategy",
    ],
  },
  {
    period: "Freelance",
    title: "HR & Recruitment Support Specialist",
    org: "Administrative & HR Operations",
    points: [
      "Supported end-to-end recruitment: sourcing, applicant tracking, and HR data management",
      "Coordinated cross-department administrative operations ensuring efficient workflow",
      "Applied IT automation to streamline repetitive HR tasks and improve team productivity",
    ],
  },
];

export const certifications = [
  { title: "Diploma in AI & IT", org: "Cased Institute", year: "2026" },
  { title: "Diploma in HR Management", org: "Cased Institute", year: "2025" },
  { title: "Certified Web Developer", org: "Orion International Campus", year: "2024" },
  { title: "Python Programming", org: "I-Tech Academy", year: "2024" },
];
