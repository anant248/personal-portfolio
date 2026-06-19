"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const BASE_SPEED = 42;   // px/s — idle auto-scroll
const HOVER_SPEED = 11;  // px/s — card hovered (not over a link)
const COPIES = 3;        // duplicated sets for seamless wrap

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

function ProjectCard({
  project,
  index,
  onLinkEnter,
  onLinkLeave,
}: {
  project: typeof projects[0];
  index: number;
  onLinkEnter: () => void;
  onLinkLeave: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative shrink-0 rounded-3xl overflow-hidden flex flex-col"
      style={{
        width: "min(480px, 86vw)",
        minHeight: "380px",
        boxShadow: "0 18px 44px rgba(0,0,0,0.32)",
      }}
    >
      {/* Project color base */}
      <div className="absolute inset-0" style={{ background: project.color }} />

      {/* Liquid glass: frosted sheen sweeping from the top-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      />

      {/* Glass rim highlight */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.09)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col grow p-7">

        {/* Top row: index label + links */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            project {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-3" style={{ color: "white" }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-opacity opacity-50 hover:opacity-100 p-1"
                style={{ color: "white" }}
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
              >
                <GithubIcon size={21} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live / Demo"
                className="transition-opacity opacity-50 hover:opacity-100 p-1"
                style={{ color: "white" }}
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
              >
                <ExternalLink size={20} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold leading-snug mb-3">
          {project.title}
        </h3>

        {/* Description — no clamp, cards are tall enough to fit full text */}
        <p className="text-sm leading-relaxed mb-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] rounded-full px-2.5 py-0.5"
              style={{
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.05)",
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Animation state lives in refs — the rAF loop mutates the transform directly,
  // no React re-renders per frame.
  const offset = useRef(0);
  const speed = useRef(BASE_SPEED);
  const setWidth = useRef(0);
  const hovered = useRef(false);
  const linkHovered = useRef(false); // completely stop when hovering link icons
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastMoveT = useRef(0);
  const dragVel = useRef(0);
  const moved = useRef(0);

  // Stable callbacks passed to every card
  const onLinkEnter = useRef(() => { linkHovered.current = true; });
  const onLinkLeave = useRef(() => { linkHovered.current = false; });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      if (setRef.current) setWidth.current = setRef.current.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (setRef.current) ro.observe(setRef.current);

    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!dragging.current) {
        const base = reduceMotion ? 0 : BASE_SPEED;
        let target: number;
        if (linkHovered.current) {
          target = 0; // full stop when over a link icon
        } else if (hovered.current) {
          target = Math.min(HOVER_SPEED, base);
        } else {
          target = base;
        }
        speed.current += (target - speed.current) * Math.min(1, dt * 2.4);
        offset.current += speed.current * dt;
      }

      const w = setWidth.current;
      if (w > 0) {
        offset.current = ((offset.current % w) + w) % w;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-offset.current}px,0,0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const wrap = wrapRef.current;
    const onEnter = () => (hovered.current = true);
    const onLeave = () => { hovered.current = false; linkHovered.current = false; };
    wrap?.addEventListener("mouseenter", onEnter);
    wrap?.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap?.removeEventListener("mouseenter", onEnter);
      wrap?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    // Don't hijack clicks on links or buttons — let them navigate normally
    if ((e.target as HTMLElement).closest("a, button")) return;
    dragging.current = true;
    moved.current = 0;
    lastX.current = e.clientX;
    lastMoveT.current = performance.now();
    dragVel.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dt = (now - lastMoveT.current) / 1000;
    lastX.current = e.clientX;
    lastMoveT.current = now;
    moved.current += Math.abs(dx);
    offset.current -= dx;
    if (dt > 0) dragVel.current = -dx / dt;
  };

  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    speed.current = Math.max(-2600, Math.min(2600, dragVel.current));
    // Reset so a subsequent link click isn't mistakenly swallowed
    setTimeout(() => { moved.current = 0; }, 50);
  };

  // After a real drag, swallow the click so card body doesn't trigger anything —
  // but always let clicks on links/buttons through.
  const onClickCapture = (e: React.MouseEvent) => {
    if (moved.current > 8 && !(e.target as HTMLElement).closest("a, button")) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id="projects" className="py-28">
      <div ref={ref} className="px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>projects</SectionTitle>
        </motion.div>
      </div>

      {/* Infinite marquee — auto-scrolls, slows on hover, stops on link hover, drag to fling */}
      <motion.div
        ref={wrapRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none py-3"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div ref={trackRef} className="flex w-max" style={{ willChange: "transform" }}>
          {Array.from({ length: COPIES }).map((_, c) => (
            <div key={c} ref={c === 0 ? setRef : undefined} className="flex gap-5 pr-5">
              {projects.map((project, i) => (
                <ProjectCard
                  key={i}
                  project={project}
                  index={i}
                  onLinkEnter={onLinkEnter.current}
                  onLinkLeave={onLinkLeave.current}
                />
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
