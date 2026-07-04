"use client";

import { person, socials } from "@/data/portfolio";
import { socialIcons } from "@/components/Icons";
import { scrollToHash } from "@/lib/anim";

export default function Footer() {
  return (
    <footer className="hairline-t">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 px-5 py-8 text-[13px] text-muted sm:grid-cols-3 md:px-8">
        <p className="text-center sm:justify-self-start sm:text-left">
          © {new Date().getFullYear()} {person.fullName}
        </p>

        {/* social media icons */}
        <div className="flex justify-center gap-5 sm:justify-self-center">
          {socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="text-muted transition-colors hover:text-primary"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            );
          })}
        </div>

        <button
          onClick={() => scrollToHash("body")}
          data-cursor-hover
          className="text-center transition-colors hover:text-primary sm:justify-self-end sm:text-right"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
