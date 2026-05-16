"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sun, Moon, Mail, FileText, Globe } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "About",      href: "#about",      comingSoon: false },
  { label: "Experience", href: "#experience", comingSoon: false },
  { label: "Projects",   href: "#projects",   comingSoon: false },
  { label: "Chat",       href: "#ask",        comingSoon: false },
  { label: "Contact",    href: "#contact",    comingSoon: false },
  // { label: "Writing",    href: null,          comingSoon: true  },
];

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://github.com/anant248",               Icon: GithubIcon,  label: "GitHub"   },
  { href: "https://www.linkedin.com/in/anant-goyal1/", Icon: LinkedinIcon, label: "LinkedIn" },
  { href: "mailto:anantgoyal2000@gmail.com",           Icon: Mail,        label: "Email",   isLucide: true },
  { href: "/resume/Anant Goyal Resume Masters.pdf",    Icon: FileText,    label: "Resume",  isLucide: true, external: true },
];

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const iconStyle = { color: "var(--fg-muted)" };
  const iconHover = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) =>
    ((e.currentTarget as HTMLElement).style.color = "var(--fg)");
  const iconLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) =>
    ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)");

  const isTravel = pathname === "/travel";
  const logoHref = isTravel ? "/" : "#hero";

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 py-3 backdrop-blur-md border-b"
      style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
    >
      {/* Left: logo + social icons */}
      <div className="flex items-center gap-4">
        <Link href={logoHref} className="flex items-center shrink-0">
          <Image
            src="/ag-logo.png"
            alt="AG logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
        </Link>

        {/* Divider — desktop only */}
        <div className="h-5 w-px hidden md:block" style={{ background: "var(--border)" }} />

        {/* Social icon links with tooltips — desktop only */}
        {socialLinks.map(({ href, Icon, label, isLucide, external }) => (
          <div key={label} className="relative group items-center hidden md:flex">
            <a
              href={href}
              target={external || !href.startsWith("mailto") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-colors"
              style={iconStyle}
              onMouseEnter={iconHover}
              onMouseLeave={iconLeave}
            >
              {isLucide
                ? <Icon size={20} strokeWidth={1.7} />
                : <Icon size={20} />
              }
            </a>
            {/* Tooltip */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-2 py-1 rounded text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background: "var(--pill-bg)",
                color: "var(--fg-2)",
                border: "1px solid var(--border)",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Right: nav links + globe icon + theme toggle */}
      <nav className="flex items-center gap-5 md:gap-7">
        {navLinks.map(({ label, href, comingSoon }) => {
          if (comingSoon) {
            return (
              <span
                key={label}
                className="font-mono text-base tracking-wide items-center gap-1.5 cursor-default hidden md:flex"
                style={{ color: "var(--fg-dim)" }}
              >
                {label}
                <span className="text-[10px] tracking-normal" style={{ color: "var(--fg-dim)" }}>
                  (coming soon!)
                </span>
              </span>
            );
          }

          return (
            <a
              key={label}
              href={href ?? undefined}
              className="font-mono text-base tracking-wide transition-colors hidden md:block"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              {label}
            </a>
          );
        })}

        {/* Globe icon — links to /travel, with tooltip. Visible on all screen sizes. */}
        <div className="relative group items-center flex">
          <Link
            href="/travel"
            aria-label="My journey"
            className="transition-colors p-1 rounded-md"
            style={{ color: isTravel ? "#FB923C" : "var(--fg-muted)" }}
            onMouseEnter={e => { if (!isTravel) e.currentTarget.style.color = "var(--fg)"; }}
            onMouseLeave={e => { if (!isTravel) e.currentTarget.style.color = "var(--fg-muted)"; }}
          >
            <Globe size={18} strokeWidth={1.7} />
          </Link>
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-2 py-1 rounded text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "var(--pill-bg)",
              color: "var(--fg-2)",
              border: "1px solid var(--border)",
            }}
          >
            my journey
          </div>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="transition-colors p-1 rounded-md"
          style={{ color: "var(--fg-muted)" }}
          onMouseEnter={iconHover}
          onMouseLeave={iconLeave}
        >
          {mounted
            ? theme === "dark"
              ? <Sun size={18} strokeWidth={1.8} />
              : <Moon size={18} strokeWidth={1.8} />
            : <Sun size={18} strokeWidth={1.8} />}
        </button>
      </nav>
    </header>
  );
}
