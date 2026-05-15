"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";

const CARD_W = 480;
const GAP = 20;
const STEP = CARD_W + GAP;

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-[#FB923C] font-mono text-2xl leading-none select-none">/</span>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>{children}</h2>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative shrink-0 rounded-2xl overflow-hidden flex flex-col"
      style={{
        width: `${CARD_W}px`,
        height: "300px",
        scrollSnapAlign: "start",
        background: project.color,
      }}
    >
      {/* Content */}
      <div className="relative flex flex-col h-full p-6">

        {/* Top row: index label + links */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
            project {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-opacity opacity-40 hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={17} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live / Demo"
                className="transition-opacity opacity-40 hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold leading-snug mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-auto"
          style={{
            color: "rgba(255,255,255,0.55)",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] rounded px-2 py-0.5"
              style={{
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scroll = (dir: 1 | -1) => {
    sliderRef.current?.scrollBy({ left: dir * STEP, behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-28">
      <div ref={ref} className="px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <SectionTitle>projects</SectionTitle>

          {/* Arrow controls */}
          <div className="flex items-center gap-2 mb-12 shrink-0">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous project"
              className="flex items-center justify-center w-8 h-8 rounded-full border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--fg)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--fg-dim)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <ChevronLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next project"
              className="flex items-center justify-center w-8 h-8 rounded-full border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--fg)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--fg-dim)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <ChevronRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={sliderRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex gap-5 overflow-x-auto pl-6 pr-6"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
