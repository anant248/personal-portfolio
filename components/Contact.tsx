"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, FileText } from "lucide-react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  { label: "GitHub",   href: "https://github.com/anant248",                  Icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anant-goyal1/",    Icon: LinkedinIcon },
  { label: "Email",    href: "mailto:anantgoyal2000@gmail.com",              Icon: Mail },
  { label: "Resume",   href: "/resume/Anant Goyal Resume Masters.pdf",       Icon: FileText, external: true },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      id="contact"
      className="w-full border-t"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div ref={ref} className="max-w-5xl mx-auto px-6 pt-20 pb-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-14 mb-20">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <h2
              className="leading-none mb-3"
              style={{ fontFamily: "var(--font-caveat)", color: "#FB923C", fontSize: "3.5rem" }}
            >
              Anant Goyal
            </h2>
            <p className="text-base mb-8" style={{ color: "var(--fg-muted)" }}>Masters in CE @ UIUC</p>
            <p className="text-xl leading-relaxed max-w-sm" style={{ color: "var(--fg-2)" }}>
              Always open to interesting conversations,
              collaborations, and new opportunities.
            </p>
          </motion.div>

          {/* Right: links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="flex flex-col gap-5"
          >
            <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: "var(--fg-muted)" }}>
              Get in touch
            </p>
            {socialLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external || !href.startsWith("mailto") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors group"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                <Icon size={18} />
                <span className="text-base font-mono group-hover:translate-x-0.5 transition-transform">
                  {label}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="border-t pt-6 flex items-center justify-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
            designed &amp; built by{" "}
            <span style={{ color: "var(--fg-muted)" }}>Anant Goyal</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
