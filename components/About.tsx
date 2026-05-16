"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const skills = [
  {
    category: "Languages",
    items: [
      { name: "Java",           level: 92 },
      { name: "Python",         level: 92 },
      { name: "TypeScript / JS",level: 85 },
      { name: "C / C++",        level: 74 },
      { name: "SQL",            level: 70 },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React",          level: 80 },
      { name: "Next.js",        level: 78 },
      { name: "Spring",         level: 72 },
      { name: "Node.js",        level: 70 },
      { name: "Angular",        level: 65 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git",            level: 95 },
      { name: "Jira",           level: 92 },
      { name: "Jenkins",        level: 75 },
      { name: "Snyk",           level: 74 },
      { name: "Hadoop / Spark", level: 62 },
    ],
  },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-[#FB923C] font-mono text-2xl leading-none select-none">/</span>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>{children}</h2>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function BigPolaroid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3, type: "spring", damping: 16 }}
      whileHover={{ rotate: 2, scale: 1.03, transition: { duration: 0.2 } }}
      className="shrink-0 select-none cursor-default hidden lg:block"
      style={{
        width: "240px",
        background: "#fff",
        boxShadow: "0 10px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.07)",
        rotate: "4deg",
      }}
    >
      <div className="w-full bg-zinc-200 overflow-hidden" style={{ height: "280px" }}>
        <Image
          src="/photos/about/scuba.jpg"
          alt="Anant Goyal"
          width={240}
          height={280}
          className="w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div
          className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-end p-3"
          style={{ marginTop: "-280px" }}
        >
        </div>
      </div>
      <div className="px-3 pt-3 pb-8 bg-white">
        <span
          className="text-zinc-500 text-xl block text-center"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          scuba diving :)
        </span>
      </div>
    </motion.div>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-mono text-sm tracking-wide" style={{ color: "var(--fg-2)" }}>{name}</span>
        <span className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>{level}%</span>
      </div>
      <div className="h-px w-full rounded-full" style={{ background: "var(--border)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
          className="h-px rounded-full"
          style={{ background: level >= 80 ? "#FB923C" : "var(--fg-dim)" }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const paragraphs: React.ReactNode[] = [
    <>
      I&apos;m currently pursuing my Master&apos;s in Computer Engineering at the
      University of Illinois Urbana-Champaign, where I&apos;m focused on distributed
      systems, networking, and backend infrastructure.
    </>,
    <>
      Before grad school, I worked at{" "}
      <span style={{ color: "var(--fg)" }}>Citi</span> and interned at{" "}
      <span style={{ color: "var(--fg)" }}>IBM</span>,{" "}
      <span style={{ color: "var(--fg)" }}>NETGEAR</span>, and a startup in Vancouver,
      building software across fintech, automation, and networking systems.
    </>,
    <>
      Outside of building software, I love traveling{" "}
      <span style={{ color: "var(--fg)" }}>(10 countries and counting!)</span>,
      discovering new coffee shops near me, and scuba diving whenever I get the chance.
      I&apos;m especially drawn to experiences that let me explore new places and perspectives.
    </>,
  ];

  return (
    <section id="about" className="px-6 py-28">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>about</SectionTitle>
        </motion.div>

        {/* Bio + polaroid */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: "easeOut" }}
                className="text-xl leading-relaxed"
                style={{ color: "var(--fg-2)" }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <BigPolaroid />
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-sm tracking-widest uppercase" style={{ color: "var(--fg-muted)" }}>
              skills &amp; proficiency
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {skills.map((group, gi) => (
              <div key={group.category} className="space-y-5">
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-5"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {group.category}
                </p>
                {group.items.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.1 + gi * 0.08 + si * 0.06}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
