"use client";

import { person, socials } from "@/data/portfolio";
import { scrollToHash } from "@/lib/anim";

export default function Footer() {
  return (
    <footer className="hairline-t">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 px-5 py-8 text-[13px] text-muted sm:grid-cols-3 md:px-8">
        <p className="text-center sm:justify-self-start sm:text-left">
          © {new Date().getFullYear()} {person.fullName}
        </p>

        {/* plain-text site labels (no icons, not linked) — centered to the page */}
        <div className="flex items-center justify-center gap-2 text-muted sm:justify-self-center">
          {socials.map((s, i) => (
            <span key={s.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-line">·</span>}
              {s.label}
            </span>
          ))}
        </div>

        <button
          onClick={() => scrollToHash("body")}
          data-cursor-hover
          className="text-center transition-colors hover:text-gold sm:justify-self-end sm:text-right"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
