"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { experience } from "@/data/experience";

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-[#FB923C] font-mono text-2xl leading-none select-none">/</span>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>{children}</h2>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function ExpPolaroid({ photo, company }: { photo?: string; company: string }) {
  return (
    <div
      className="shrink-0 select-none hidden md:block"
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
          alt={company}
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
        <span
          className="text-zinc-400 text-xl block text-center"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          {company}
        </span>
      </div>
    </div>
  );
}

export default function Experience() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const current = experience[active];

  return (
    <section id="experience" className="px-6 py-28">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>experience</SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-0 min-h-[340px]"
        >
          {/* Left tabs */}
          <div
            className="flex flex-col gap-0.5 shrink-0 border-r"
            style={{ width: "168px", borderColor: "var(--border)" }}
          >
            {experience.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left px-4 py-3.5 text-base font-medium transition-all duration-200 border-l-2"
                style={
                  active === i
                    ? { color: "#FB923C", borderLeftColor: "#FB923C", background: "#FB923C0d" }
                    : { color: "var(--fg-muted)", borderLeftColor: "transparent" }
                }
                onMouseEnter={e => { if (active !== i) (e.currentTarget as HTMLElement).style.color = "var(--fg-2)"; }}
                onMouseLeave={e => { if (active !== i) (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Right content */}
          <div className="flex-1 pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="flex gap-10 items-start"
              >
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold mb-1.5 leading-tight" style={{ color: "var(--fg)" }}>
                    {current.role}{" "}
                    <span className="text-[#FB923C]">@ {current.company}</span>
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest mb-7" style={{ color: "var(--fg-muted)" }}>
                    {current.dates}
                  </p>
                  <ul className="space-y-5">
                    {current.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3.5 text-base leading-relaxed" style={{ color: "var(--fg-2)" }}>
                        <span className="text-[#FB923C] mt-1 shrink-0 text-xs">▷</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <ExpPolaroid photo={current.photo} company={current.company} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
