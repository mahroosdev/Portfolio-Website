/* Single source of truth for all portfolio content. */

export const person = {
  name: "Mahroos Mahthie",
  fullName: "MFM Mahroos Mahthie",
  roles: ["Junior Software Engineer", "Full-Stack Developer", "AI-Assisted Developer"],
  tagline:
    "I design and build high-performance web applications, desktop/mobile-connected systems, and clean user interfaces. Focused on writing scalable code, optimizing system architecture, and delivering high-quality products.",
  location: "Sri Lanka · Remote worldwide",
  contactLocation: "Valaichenai, Batticaloa, Eastern Province, Sri Lanka",
  phone: "+94 74 252 7474 / +94 71 437 6113",
  phones: [
    { label: "+94 74 252 7474", href: "+94742527474" },
    { label: "+94 71 437 6113", href: "+94714376113" },
  ],
  availability: "Ready to start immediately",
  email: "m.mahthie.dev@gmail.com",
  resume: "/resume",
};

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahthiedev/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/mahroosdev", icon: "github" },
  { label: "Facebook", href: "https://www.facebook.com/mmdev26", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/m.m_dev26", icon: "instagram" },
  { label: "Twitter", href: "https://x.com/mm_dev26", icon: "twitter" },
] as const;

export const stats = [
  { value: 16, suffix: "+", label: "Live projects shipped" },
  { value: 2, suffix: "", label: "Desktop apps built" },
];

export const skillGroups = [
  {
    title: "Frontend Architecture",
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "CSS3 / HTML5", "Responsive UI/UX"],
  },
  {
    title: "Backend & Systems",
    skills: ["Node.js", "Python", "RESTful APIs", "FastAPI", "WebSockets", "Express", "Databases (SQLite/MongoDB)"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "CI/CD Foundations", "Vite", "Electron", "DevTools", "Package Managers"],
  },
];

export const services = [
  {
    title: "Frontend Architecture",
    description:
      "Designing and implementing scalable, performant client-side architectures using React, Next.js, TypeScript, and modern styling frameworks.",
  },
  {
    title: "Full-Stack Engineering",
    description:
      "Building robust, high-performance web applications, integrating frontend user experiences with resilient Node.js and Python backend microservices.",
  },
  {
    title: "System Automation & Tooling",
    description:
      "Developing local-first desktop applications, system-level automation suites (Python, Electron), and multi-platform network utilities.",
  },
  {
    title: "Technical Leadership & Quality",
    description:
      "Driving clean code practices, testing, and security-first system designs. Collaborating effectively in team environments to deliver high-impact products.",
  },
];

export const marqueeItems = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Python",
  "REST APIs",
  "Git & GitHub",
  "Full-Stack",
  "FastAPI",
  "WebSockets",
  "Electron",
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
  github?: string;
  link?: { label: string; href: string };
  media: { src: string; alt: string }[];
  mobileShot?: { src: string; alt: string };
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "remotelink",
    name: "RemoteLink",
    category: "Desktop + Mobile Utility",
    status: "Completed",
    description:
      "Desktop/mobile remote-control prototype exploring local-network pairing, desktop/mobile UI flows, screen preview concepts, input-control planning, and secure connection handling.",
    highlights: [
      "Built a desktop engine dashboard with live connection state and a pairing hub.",
      "Developed an Android client interface with screen viewer and touchpad area controls.",
      "Implemented cross-platform communication via WebSockets."
    ],
    tech: ["Electron", "React", "TypeScript", "Flutter", "WebSockets"],
    role: "Sole developer",
    github: "https://github.com/mahroosdev/RemoteLink",
    link: { label: "Get App", href: "https://remotelink.netlify.app/" },
    media: [
      { src: "/assets/apps/remotelink-desktop-1.png", alt: "RemoteLink desktop dashboard showing device pairing and connection status" },
      { src: "/assets/apps/remotelink-desktop-2.png", alt: "RemoteLink monitor configuration and desktop streaming settings" },
    ],
    mobileShot: { src: "/assets/apps/remotelink-mobile-1.jpg", alt: "RemoteLink mobile control interface" },
  },
  {
    id: "nexaflow",
    name: "NexaFlow",
    category: "Desktop Product",
    status: "Completed",
    description:
      "A local-first desktop automation suite for recording and replaying workflows with smart capture and a focused overlay UI.",
    highlights: [
      "Built workflow recorder with multiple capture modes and scheduling features.",
      "Implemented a compact focus mode overlay with global hotkeys.",
      "Integrated secure local network pairing for Android companion apps."
    ],
    tech: ["Python", "Tkinter", "WebSockets", "Android", "Chrome Extension"],
    role: "Sole developer",
    github: "https://github.com/mahroosdev/NexaFlow",
    link: { label: "Get App", href: "https://web-nexaflow.netlify.app/" },
    media: [
      { src: "/assets/apps/nexaflow-desktop-1.png", alt: "NexaFlow desktop workflow automation dashboard" },
      { src: "/assets/apps/nexaflow-desktop-2.png", alt: "NexaFlow Focus Mode overlay and workflow list editor" },
    ],
    mobileShot: { src: "/assets/apps/nexaflow-mobile-1.jpg", alt: "NexaFlow mobile companion interface" },
  },

  {
    id: "nexaos",
    name: "Nexa Arc",
    category: "Architecture Concept",
    status: "In Progress",
    description:
      "AI-first desktop OS/platform concept built around Amir, local-first workflows, phased planning, governance documents, UI experiments, and security-focused architecture notes.",
    highlights: [
      "Explored local token streaming and prompt engineering via Ollama.",
      "Prototyped a FastAPI backend and WebSocket communication layer for local assistant workflows.",
      "Planned a staged OS/platform rollout focused on local-first data privacy, governance, and controlled feature expansion."
    ],
    tech: ["Python", "FastAPI", "WebSockets", "SQLite", "Ollama"],
    role: "Developer",
    media: [],
  },
];

export type WebProject = {
  slug: string;
  name: string;
  description: string;
  href: string;
  image: string;
  mobileImage?: string;
  mobileFit?: "cover" | "contain";
  mobileZoom?: boolean;
  objectPosition?: string;
};

export type WebGroup = {
  title: string;
  note: string;
  projects: WebProject[];
};

export const webGroups: WebGroup[] = [
  {
    title: "Business Automation Tools",
    note: "Demo tools with local demo modes — built around my AI data specialty.",
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
    title: "Web Tools & Applications",
    note: "Functional web tools and utility interfaces built with modern web technologies.",
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
        slug: "chroma-forge",
        name: "Chroma",
        description: "Color palette generator and contrast checker with export options.",
        href: "https://chroma-forge.netlify.app/",
        image: "/assets/screenshots/chroma-forge.png",
        mobileImage: "/assets/screenshots/mobile/chroma-forge.png",
      },
      {
        slug: "nexa-scan",
        name: "Nexa Scan Suite",
        description: "Professional QR and barcode suite — generate, decode, and keep history, fully offline.",
        href: "https://nexa-scan.netlify.app/",
        image: "/assets/screenshots/nexa-scan.png",
        mobileImage: "/assets/screenshots/mobile/nexa-scan.png",
      },
    ],
  },
  {
    title: "Brand Concept Sites",
    note: "High-end landing page concepts — typography, motion, and product storytelling.",
    projects: [
      {
        slug: "savora-web",
        name: "SAVORA",
        description: "Fine dining restaurant brand concept with elegant, warm visual identity.",
        href: "https://savora-web.netlify.app/",
        image: "/assets/screenshots/savora-web.png",
        mobileImage: "/assets/screenshots/mobile/savora-web.png",
      },
      {
        slug: "wanderlux-web",
        name: "WANDERLUX",
        description: "Premium travel agency concept with destination showcase and booking flow.",
        href: "https://wanderlux-web.netlify.app/",
        image: "/assets/screenshots/wanderlux-web.png",
        mobileImage: "/assets/screenshots/mobile/wanderlux-web.png",
      },
      {
        slug: "vertex-it-solutions",
        name: "VERTEX IT SOLUTIONS",
        description: "Responsive digital services site focused on practical technology solutions and business growth.",
        href: "/assets/webs/vertex-it-solutions/index.html",
        image: "/assets/webs/images/ChatGPT Image Jul 18, 2026, 02_12_30 AM.png",
        mobileImage: "/assets/webs/images/ChatGPT Image Jul 18, 2026, 02_12_34 AM.png",
      },
    ],
  },
  {
    title: "Mini Projects & Experiments",
    note: "Standalone web tools and mini projects built for practice and exploration.",
    projects: [
      {
        slug: "calculator-pro",
        name: "Calculator Pro",
        description: "Standard and scientific calculator with history, memory keys, and full keyboard support — works fully offline.",
        href: "/calculator/index.html",
        image: "/assets/screenshots/calculator-pro.png",
        mobileImage: "/assets/screenshots/mobile/calculator-pro.png",
        mobileFit: "contain",
        mobileZoom: true,
      },
      {
        slug: "simon-says",
        name: "Simon Says",
        description: "Interactive memory game with progressive pattern challenges, sound cues, and responsive controls.",
        href: "/assets/webs/Simon-Game-Project/index.html",
        image: "/assets/webs/images/ChatGPT Image Jul 18, 2026, 02_12_35 AM.png",
        mobileImage: "/assets/webs/images/simon-says-mobile.png",
        mobileFit: "contain",
        mobileZoom: true,
      },
      {
        slug: "dice-duel",
        name: "Dice Duel",
        description: "Two-player browser dice game with instant randomized results and a polished responsive interface.",
        href: "/assets/webs/dice-game/index.html",
        image: "/assets/webs/images/ChatGPT Image Jul 18, 2026, 02_12_38 AM.png",
        mobileImage: "/assets/webs/images/dice-duel-mobile.png",
        mobileFit: "contain",
        mobileZoom: true,
      },
      {
        slug: "web-project-showcase",
        name: "Web Project Showcase",
        description: "Curated project hub presenting a broad collection of website concepts and frontend experiments.",
        href: "https://demo-project-web.netlify.app/",
        image: "/assets/demo 50 projects website/15-1.png",
        mobileImage: "/assets/demo 50 projects website/15-2.png",
        objectPosition: "object-center",
      },
    ],
  },
];



export const experience = [
  {
    period: "2025 — Present",
    title: "Independent Software Developer",
    org: "Self-Directed Projects & Skill Development",
    points: [
      "Designed and developed full-stack app prototypes and developer-focused utility tools using React, TypeScript, and modern web frameworks.",
      "Practiced component-based architecture, responsive design, UI polish, debugging, and iterative software improvement.",
      "Built desktop and mobile-connected applications experimenting with Python, Electron, and WebSockets.",
    ],
  },
];

export const education = [
  { title: "Diploma in IT & AI", org: "Cased Institute", year: "2026" },
  { title: "Diploma in HR Management", org: "Cased Institute", year: "2025" },
];

export const certifications = [
  {
    title: "Front-End Web Development",
    org: "University of Moratuwa — 2026",
    image: "/assets/certificates/front-end-web-development.jpg",
  },
  {
    title: "Web Design for Beginners",
    org: "University of Moratuwa — 2026",
    image: "/assets/certificates/web-design-for-beginners.jpg",
  },
  {
    title: "Introduction to Software Engineering",
    org: "IBM — 2026",
    image: "/assets/certificates/introduction-to-software-engineering.jpg",
  },
  {
    title: "Android App Development for Beginners",
    org: "Simplilearn — 2026",
    image: "/assets/certificates/android-app-development-beginners.jpg",
  },
  {
    title: "AI Agents and Agentic AI with Python & Generative AI",
    org: "Vanderbilt University — 2026",
    image: "/assets/certificates/ai-agents-python-generative-ai.jpg",
  },
  {
    title: "Python Programming",
    org: "GUVI HCL — 2025",
    image: "/assets/certificates/python-programming-certificate.png",
  },
];


