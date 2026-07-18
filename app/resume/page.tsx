"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { person, certifications } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/Icons";
import { Download, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

// Resume-specific, ATS-optimised content (no first-person language, quantified
// bullets, explicit location) — kept separate so the website copy is untouched.
const summary =
  "Junior Software Engineer focused on front-end and full-stack web development. Hands-on experience building and deploying responsive web applications, desktop prototypes, and real-time WebSocket-based systems. Strong practical foundation in JavaScript, React, Next.js, TypeScript, Python, Node.js, REST APIs, Git, debugging, and manual testing.";

const resumeLocation = "Valaichenai, Sri Lanka";
const resumeRoles = ["Junior Software Engineer", "Full-Stack Developer", "AI-Assisted Developer"];
const resumePhone = person.phones[0];

const resumeEducation = [
  { title: "Diploma in IT & AI", org: "Cased Institute", year: "2026" },
];

const experienceEntries = [
  {
    title: "Independent Software Developer",
    org: "Self-Directed Projects & Skill Development",
    location: "Remote · Sri Lanka",
    period: "2025 — Present",
    points: [
      "Delivered 15+ software and portfolio projects using React, Next.js, TypeScript, Python, Electron, and WebSocket concepts.",
      "Deployed 10+ responsive web applications on Netlify, focusing on mobile-friendly layouts, reusable components, performance, and UI consistency.",
      "Resolved 30+ visible UI, layout, and logic issues by testing fixes, reviewing AI-assisted code changes, and validating behavior after updates.",
      "Packaged and manually tested 3 desktop application prototypes, covering installer troubleshooting, UI redesign, and release-readiness checks.",
    ],
  },
];

export default function ResumePage() {
  const [scale, setScale] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(1150);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 860) {
        const availableWidth = width - 32;
        setScale(availableWidth / 820);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    setCardHeight(cardRef.current.scrollHeight || cardRef.current.offsetHeight || 1150);
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = cardRef.current ? cardRef.current.scrollHeight : entry.contentRect.height;
        if (height > 100) setCardHeight(height);
      }
    });
    resizeObserver.observe(cardRef.current);
    return () => resizeObserver.disconnect();
  }, [scale]);

  const technicalSkills = [
    { label: "Languages", items: "JavaScript, TypeScript, Python, HTML, CSS" },
    { label: "Frontend", items: "React, Next.js, Tailwind CSS, Responsive Design, Component-Based UI" },
    { label: "Backend", items: "Node.js, Express, REST API Concepts, WebSocket Concepts" },
    { label: "Databases", items: "SQLite Basics, MongoDB Basics" },
    { label: "Tools", items: "Electron, Python Tkinter, Vite, Git, GitHub, VS Code, PyInstaller" },
    { label: "Practices", items: "Debugging, Manual Testing, UI Polishing, AI-Assisted Development" },
  ];

  const projects = [
    {
      name: "RemoteLink",
      stack: "Electron · Flutter · React · TypeScript · WebSockets",
      description:
        "Desktop/mobile remote-control prototype with local-network pairing, live connection-state tracking, screen preview UI, and mobile touchpad control flow using WebSocket communication concepts.",
      href: "https://github.com/mahroosdev",
    },
    {
      name: "NexaFlow",
      stack: "Python · Tkinter · PyInstaller",
      description:
        "Local-first Windows desktop automation prototype with workflow recording concepts, scheduler-trigger routines, compact overlay UI patterns, packaging checks, and manual validation.",
      href: "https://github.com/mahroosdev",
    },
    {
      name: "Web Project Showcase",
      stack: "React · Next.js · JavaScript · Netlify",
      description:
        "Responsive web app portfolio including dashboards, PDF/data utilities, QR/barcode interfaces, and portfolio sites with reusable UI components and cross-device testing.",
      href: "https://demo-project-web.netlify.app/",
    },
  ];

  const strengths = ["Responsive UI", "Debugging", "Manual Testing", "Fast Learning", "Project Ownership"];

  return (
    <main className="min-h-screen bg-res-bg py-8 px-4 sm:py-16 sm:px-6 font-sans selection:bg-res-primary/25 print:bg-white print:p-0 flex flex-col items-center">
      {/* Back Link + Download */}
      <div className="w-full max-w-[820px] mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.close();
            setTimeout(() => {
              window.location.href = "/";
            }, 100);
          }}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-res-muted hover:text-res-primary transition-colors duration-300"
        >
          ← Back to Portfolio
        </Link>
        <a
          href="/RESUME.pdf"
          download="RESUME.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-res-secondary hover:bg-res-primary rounded-md transition-colors duration-300 shadow-sm"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
          Download PDF
        </a>
      </div>

      <div
        style={{
          height: scale < 1 ? `${(cardHeight + 80) * scale}px` : "auto",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
        className="w-full flex justify-center print:!h-auto print:!overflow-visible"
      >
        <div
          ref={cardRef}
          style={{
            transform: scale < 1 ? `scale(${scale})` : "none",
            transformOrigin: "top center",
            width: "820px",
            minWidth: "820px",
            height: "max-content",
          }}
          className="relative bg-res-panel text-res-ink border border-res-line px-12 py-10 shadow-xl print:border-none print:shadow-none print:px-[14mm] print:py-[13mm] print:bg-white print:!transform-none print:!w-full print:!min-w-0 transition-colors duration-300"
        >
          {/* ===== Header ===== */}
          <header className="flex items-start justify-between gap-6 pb-4 print:pb-5">
            <div className="min-w-0">
              <h1 className="text-[33px] print:text-[30px] font-black tracking-[-0.01em] leading-[1.05] text-res-ink uppercase">
                {person.fullName}
              </h1>
              <p className="mt-1.5 print:mt-2 whitespace-nowrap text-[11px] print:text-[10.5px] font-semibold uppercase tracking-[0.09em] text-res-secondary">
                {resumeRoles.join("  ·  ")}
              </p>

              {/* Social links — under the header */}
              <div className="mt-3 print:mt-2 flex items-center gap-3.5 print:gap-2.5 text-[11.5px] print:text-[10.5px] text-res-muted">
                {/* Web: icon-only links */}
                <a href="https://github.com/mahroosdev" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="hover:text-res-secondary transition-colors print:hidden">
                  <GitHubIcon className="h-[19px] w-[19px]" />
                </a>
                <a href="https://www.linkedin.com/in/mahthiedev/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="hover:text-res-secondary transition-colors print:hidden">
                  <LinkedInIcon className="h-[19px] w-[19px]" />
                </a>
                {/* Print: text URLs (ATS-readable and clickable in generated PDF) */}
                <a className="hidden print:inline" href="https://github.com/mahroosdev">
                  github.com/mahroosdev
                </a>
                <span className="hidden print:inline text-res-line">·</span>
                <a className="hidden print:inline" href="https://www.linkedin.com/in/mahthiedev/">
                  linkedin.com/in/mahthiedev
                </a>
                <span className="hidden print:inline text-res-line">·</span>
                <a className="hidden print:inline" href="https://portfolio-mahroos.netlify.app/">
                  portfolio-mahroos.netlify.app
                </a>
              </div>
            </div>

            {/* Right: email, phone, location */}
            <div className="shrink-0">
              {/* Web: icon contact */}
              <div className="flex flex-col items-end gap-1.5 text-[11.5px] text-res-muted print:hidden">
                <a href={`mailto:${person.email}`} className="flex items-center gap-2 hover:text-res-secondary transition-colors">
                  <span>{person.email}</span>
                  <Mail className="h-3.5 w-3.5 text-res-secondary" strokeWidth={2} />
                </a>
                <div className="flex items-center gap-2">
                  <span className="flex flex-wrap justify-end gap-x-1.5">
                    <a href={`tel:${resumePhone.href}`} className="hover:text-res-secondary transition-colors">
                      {resumePhone.label}
                    </a>
                  </span>
                  <Phone className="h-3.5 w-3.5 text-res-secondary" strokeWidth={2} />
                </div>
                <span className="flex items-center gap-2">
                  <span>{resumeLocation}</span>
                  <MapPin className="h-3.5 w-3.5 text-res-secondary" strokeWidth={2} />
                </span>
              </div>

              {/* Print: aligned text contact (ATS-readable) */}
              <div className="hidden print:block text-right text-[10.5px] leading-[1.85] text-res-muted">
                <div>{person.email}</div>
                <div>{resumePhone.label}</div>
                <div>{resumeLocation}</div>
              </div>
            </div>
          </header>

          {/* Header divider — bold accent + hairline */}
          <div className="h-[2.5px] bg-res-ink/85" />
          <div className="h-px bg-res-secondary mt-[2px]" />

          {/* ===== Professional Summary ===== */}
          <Section title="Professional Summary">
            <p className="text-[13px] print:text-[12px] leading-[1.7] print:leading-[1.65] text-res-muted">
              {summary}
            </p>
          </Section>

          {/* ===== Technical Skills ===== */}
          <Section title="Technical Skills">
            <div className="space-y-1.5 print:space-y-[7px]">
              {technicalSkills.map((skill) => (
                <div key={skill.label} className="grid grid-cols-[128px_1fr] gap-3 text-[12.5px] print:text-[12px] leading-[1.5] print:leading-[1.5]">
                  <span className="font-bold text-res-ink">{skill.label}</span>
                  <span className="text-res-muted">{skill.items}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ===== Professional Experience ===== */}
          <Section title="Professional Experience">
            <div className="space-y-4 print:space-y-4">
              {experienceEntries.map((exp, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <h3 className="text-[14px] print:text-[13.5px] font-bold text-res-ink">{exp.title}</h3>
                    <span className="text-[10.5px] print:text-[10.5px] font-bold text-res-muted uppercase tracking-wider">{exp.period}</span>
                  </div>
                  <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1.5 print:mb-2">
                    <span className="text-[11.5px] print:text-[11.5px] font-medium text-res-secondary italic">{exp.org}</span>
                    <span className="text-[10.5px] print:text-[10.5px] font-semibold text-res-muted">{exp.location}</span>
                  </div>
                  <ul className="space-y-1 print:space-y-1.5 list-disc pl-[18px] marker:text-res-secondary">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-[12.5px] print:text-[12px] leading-[1.6] print:leading-[1.6] text-res-muted pl-1">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* ===== Projects ===== */}
          <Section title="Key Projects">
            <div className="space-y-3.5 print:space-y-3.5">
              {projects.map((proj) => (
                <div key={proj.name}>
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <h3 className="text-[13.5px] print:text-[13px] font-bold text-res-ink flex items-center gap-1.5">
                      {proj.name}
                      <a href={proj.href} target="_blank" rel="noreferrer" aria-label={`${proj.name} link`} className="text-res-secondary hover:text-res-primary transition-colors print:hidden">
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                      </a>
                    </h3>
                    <span className="text-[10px] print:text-[9.5px] font-semibold uppercase tracking-wide text-res-muted">{proj.stack}</span>
                  </div>
                  <p className="mt-0.5 print:mt-1 text-[12.5px] print:text-[12px] leading-[1.6] print:leading-[1.6] text-res-muted">{proj.description}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ===== Education ===== */}
          <Section title="Education">
            <ul className="space-y-1.5 print:space-y-2">
              {resumeEducation.map((item, i) => (
                <li key={i} className="flex items-baseline justify-between flex-wrap gap-2 text-[12.5px] print:text-[12px]">
                  <span className="font-bold text-res-ink">{item.title}</span>
                  <span className="text-res-muted">{item.org} — {item.year}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* ===== Certifications ===== */}
          <Section title="Certifications">
            <ul className="space-y-1.5 print:space-y-2">
              {certifications.slice(0, 4).map((cert) => (
                <li key={cert.title} className="flex items-baseline justify-between flex-wrap gap-2 text-[12.5px] print:text-[12px]">
                  <span className="font-bold text-res-ink">{cert.title}</span>
                  <span className="text-res-muted">{cert.org}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* ===== Core Strengths & Languages ===== */}
          <div className="grid grid-cols-[1fr_180px] gap-8 mt-5 print:mt-7">
            <div className="break-inside-avoid">
              <SectionTitle title="Core Strengths" />
              <p className="whitespace-nowrap text-[11.5px] print:text-[11px] leading-[1.8] print:leading-[1.7] text-res-muted">
                {strengths.map((s, i) => (
                  <span key={s}>
                    <span className="whitespace-nowrap">{s}</span>
                    {i < strengths.length - 1 ? "  ·  " : ""}
                  </span>
                ))}
              </p>
            </div>
            <div className="break-inside-avoid">
              <SectionTitle title="Languages" />
              <p className="text-[12.5px] print:text-[12px] leading-[1.8] print:leading-[1.7] text-res-muted">
                English  ·  Tamil
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-2.5 print:mb-2.5">
      <span className="h-3.5 w-[3px] bg-res-secondary rounded-full" />
      <h2 className="text-[12.5px] print:text-[12px] font-extrabold uppercase tracking-[0.13em] text-res-ink whitespace-nowrap">
        {title}
      </h2>
      <span className="flex-1 h-px bg-res-line" />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 print:mt-[22px] break-inside-avoid">
      <SectionTitle title={title} />
      {children}
    </section>
  );
}
