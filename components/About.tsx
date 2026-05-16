"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const techItems = ["Java", "Python", "TypeScript / JS", /*"C / C++",*/ "SQL", "React", "Next.js", "Spring", /*"Node.js", "Angular"*/];

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
          <div className="flex-1 space-y-8">
            {/* Paragraphs 0 and 1 */}
            {paragraphs.slice(0, 2).map((p, i) => (
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

            {/* Inline tech pills — after "Before grad school..." */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.34, ease: "easeOut" }}
            >
              <p className="text-xl leading-relaxed mb-3" style={{ color: "var(--fg-2)" }}>
                Here are some languages and frameworks I&apos;ve been working with:
              </p>
              <div className="flex flex-wrap gap-2">
                {techItems.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 6 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05, ease: "easeOut" }}
                    className="text-base rounded-full px-3 py-1 border cursor-default leading-relaxed"
                    style={{ borderColor: "var(--border)", color: "var(--fg-2)", background: "transparent" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = "#FB923C";
                      (e.currentTarget as HTMLElement).style.borderColor = "#FB923C";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = "var(--fg-2)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Paragraph 2 — travel/hobbies */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.62, ease: "easeOut" }}
              className="text-xl leading-relaxed"
              style={{ color: "var(--fg-2)" }}
            >
              {paragraphs[2]}
            </motion.p>
          </div>

          <BigPolaroid />
        </div>
      </div>
    </section>
  );
}
