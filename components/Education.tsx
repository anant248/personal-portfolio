"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { education, type Education as EduType } from "@/data/education";

/** Logo that gracefully hides if the source is missing/broken.
 *  Checks naturalWidth on mount to catch a 404 that errored before hydration. */
function Logo({ src, alt, sizeClass = "h-12" }: { src?: string; alt: string; sizeClass?: string }) {
  const [hidden, setHidden] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setHidden(true);
  }, []);

  if (!src || hidden) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`${sizeClass} w-auto object-contain shrink-0`}
      onError={() => setHidden(true)}
    />
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

function EduPolaroid({ photo, school }: { photo?: string; school: string }) {
  return (
    <div
      className="shrink-0 select-none"
      style={{
        width: "210px",
        transform: "rotate(3deg)",
        background: "#fff",
        boxShadow: "0 6px 28px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      <div className="w-full bg-zinc-200 overflow-hidden" style={{ height: "196px" }}>
        <Image
          src={photo ?? ""}
          alt={school}
          width={210}
          height={196}
          className="w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div
          className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-end p-2"
          style={{ marginTop: "-196px" }}
        >
        </div>
      </div>
      <div className="px-3 pt-2.5 pb-6 bg-white">
        <span className="text-zinc-400 text-xl block text-center" style={{ fontFamily: "var(--font-caveat)" }}>
          {school}
        </span>
      </div>
    </div>
  );
}

function EduContent({ edu }: { edu: EduType }) {
  return (
    <div className="max-w-[380px]">
      {/* Logo + university name */}
      <div className="flex items-center gap-3 mb-1.5">
        <Logo src={edu.logo} alt={edu.short ?? edu.school} sizeClass={edu.logoClass} />
        <h3 className="text-xl md:text-2xl font-semibold leading-tight" style={{ color: "var(--fg)" }}>
          {edu.school}
        </h3>
      </div>

      {/* Degree — smaller, italic */}
      <p className="italic text-sm md:text-base mb-1.5" style={{ color: "var(--fg-muted)" }}>
        {edu.degree}
      </p>

      {/* Dates + location */}
      <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: "var(--fg-dim)" }}>
        {edu.dates}{edu.location ? ` · ${edu.location}` : ""}
      </p>

      {/* Bullets */}
      <ul className="space-y-3">
        {edu.bullets.map((bullet, j) => (
          <li key={j} className="flex gap-3 text-base leading-relaxed" style={{ color: "var(--fg-2)" }}>
            <span className="text-[#FB923C] mt-1 shrink-0 text-xs">▷</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="px-6 py-28">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>education</SectionTitle>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Vertical line — centered on desktop, left rail on mobile */}
          <div
            className="absolute inset-y-0 left-[7px] md:left-1/2 -translate-x-1/2 w-px"
            style={{ background: "var(--border)" }}
          />

          <div className="space-y-16 md:space-y-28">
            {education.map((edu, i) => {
              const contentRight = i % 2 === 0; // UIUC (0) → right side, UBC (1) → left side
              return (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Node dot on the line */}
                  <div
                    className="absolute left-[7px] md:left-1/2 -translate-x-1/2 top-1.5 w-3.5 h-3.5 rounded-full z-10"
                    style={{ background: "#FB923C", boxShadow: "0 0 0 4px var(--bg)" }}
                  />

                  {/* ── Desktop: two-sided timeline ── */}
                  <div className="hidden md:grid grid-cols-2 items-start">
                    {/* Left column */}
                    <div className={`flex justify-end pr-14 ${contentRight ? "" : "pt-1"}`}>
                      {contentRight
                        ? <EduPolaroid photo={edu.photo} school={edu.short ?? edu.school} />
                        : <EduContent edu={edu} />}
                    </div>
                    {/* Right column */}
                    <div className={`flex justify-start pl-14 ${contentRight ? "pt-1" : ""}`}>
                      {contentRight
                        ? <EduContent edu={edu} />
                        : <EduPolaroid photo={edu.photo} school={edu.short ?? edu.school} />}
                    </div>
                  </div>

                  {/* ── Mobile: single left rail ── */}
                  <div className="md:hidden pl-8">
                    <EduContent edu={edu} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
