"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const polaroids = [
  { src: "/photos/hero/me.JPG",         caption: "yum!",             rotate: -6, top: "0%",  left: "0%"  },
  { src: "/photos/hero/bean.jpeg",      caption: "the bean!",        rotate:  5, top: "3%",  left: "49%" },
  { src: "/photos/hero/lakers.jpeg",    caption: "first laker game", rotate: -3, top: "52%", left: "3%"  },
  { src: "/photos/hero/fall_uiuc.jpeg", caption: "fall on campus",   rotate:  7, top: "49%", left: "49%" },
];

function Polaroid({
  src, caption, rotate, top, left, index,
}: {
  src: string; caption: string; rotate: number;
  top: string; left: string; index: number;
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, y: 40, rotate: rotate - 10, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
      transition={{ delay: 0.6 + index * 0.15, duration: 0.7, type: "spring", damping: 14, stiffness: 110 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
      whileDrag={{ scale: 1.08, zIndex: 50, cursor: "grabbing" }}
      className="absolute select-none"
      style={{
        top, left, width: "230px", zIndex: index + 1,
        background: "#fff",
        boxShadow: "0 8px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.06)",
        cursor: "grab",
        touchAction: "none",
      }}
    >
      <div className="w-full overflow-hidden bg-zinc-200" style={{ height: "216px" }}>
        <Image
          src={src}
          alt={caption}
          width={230}
          height={216}
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="w-full h-full bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-350 flex items-end p-2" style={{ marginTop: "-216px" }}>
        </div>
      </div>
      <div className="px-3 pt-3 pb-7 bg-white">
        <span className="text-zinc-500 text-xl block text-center" style={{ fontFamily: "var(--font-caveat)" }}>
          {caption}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 0.84]);
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);
  const y = useTransform(scrollY, [0, 600], [0, -70]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-20 pb-10">
      <motion.div
        style={{ scale, opacity, y }}
        className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
      >
        {/* Left: text */}
        <div className="flex-1 lg:text-left text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="leading-none mb-7"
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: "clamp(4.5rem, 10vw, 8rem)",
            }}
          >
            <span style={{ color: "var(--fg-2)" }}>Hi, I&apos;m </span>
            <span style={{ color: "#FB923C" }}>Anant</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl font-light leading-relaxed max-w-lg lg:mx-0 mx-auto"
            style={{ color: "var(--fg-2)" }}
          >
            Building scalable systems and backend software with a focus on distributed infrastructure, networking, and reliability
          </motion.p>

          {/* View my work CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-10 lg:justify-start justify-center flex"
          >
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2 font-mono text-sm tracking-wide transition-colors"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              <ArrowDown
                size={15}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-y-0.5"
              />
              <span>View my work</span>
            </a>
          </motion.div>
        </div>

        {/* Right: polaroid cluster */}
        <div
          className="relative shrink-0 hidden lg:block"
          style={{ width: "470px", height: "590px" }}
        >
          {polaroids.map((p, i) => (
            <Polaroid key={i} index={i} {...p} />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator removed */}
    </section>
  );
}
