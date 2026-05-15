"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function CoffeeSpill() {
  const { scrollYProgress } = useScroll();

  // Drips appear first as you start scrolling
  const dripsScaleY = useTransform(scrollYProgress, [0.02, 0.14], [0, 1]);
  const dripsOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.08, 0.32, 0.58],
    [0, 0.85, 0.8, 0]
  );

  // Puddle spreads from the left edge
  const puddleScaleX = useTransform(scrollYProgress, [0.06, 0.3], [0, 1]);
  const puddleOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.35, 0.62],
    [0, 0.68, 0.63, 0]
  );

  // Coffee ring materialises last
  const ringScale = useTransform(scrollYProgress, [0.16, 0.27], [0.15, 1]);
  const ringOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.22, 0.42, 0.62],
    [0, 0.48, 0.44, 0]
  );

  return (
    <div
      className="fixed left-0 top-0 h-full pointer-events-none z-10"
      style={{ width: "280px" }}
    >
      {/* ── Drip streams ── */}
      <motion.div
        className="absolute"
        style={{
          top: "26%",
          left: 0,
          opacity: dripsOpacity,
          scaleY: dripsScaleY,
          transformOrigin: "top center",
        }}
      >
        <svg width="56" height="170" viewBox="0 0 56 170" fill="none">
          <path
            d="M7,0 C9,22 6,52 10,84 C12,106 8,135 13,168"
            stroke="#3D2010"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M22,0 C25,19 21,47 25,75 C27,96 23,120 27,148"
            stroke="#4A2C1A"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M38,4 C40,24 37,52 39,80"
            stroke="#3D2010"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* Drop blobs at tips */}
          <ellipse cx="12" cy="167" rx="6.5" ry="9" fill="#3D2010" opacity="0.75" />
          <ellipse cx="27" cy="151" rx="5" ry="7" fill="#4A2C1A" opacity="0.65" />
        </svg>
      </motion.div>

      {/* ── Main puddle ── */}
      <motion.svg
        width="270"
        height="290"
        viewBox="0 0 270 290"
        className="absolute"
        style={{
          top: "33%",
          left: "-8px",
          scaleX: puddleScaleX,
          transformOrigin: "left center",
          opacity: puddleOpacity,
        }}
      >
        {/* Outer spill blob */}
        <path
          d="M0,72 C12,46 38,24 72,38 C106,52 92,94 128,78 C164,62 150,28 186,42 C222,56 206,98 240,86 C258,80 266,98 270,118 L270,205 C246,232 214,214 180,228 C146,242 160,270 124,276 C88,282 68,254 36,258 C14,261 2,240 0,218 Z"
          fill="#2E1505"
          opacity="0.82"
        />
        {/* Mid-tone variation for depth */}
        <path
          d="M0,105 C22,92 58,96 90,84 C122,72 110,112 142,100 C168,91 162,64 194,74 C216,81 210,104 238,96"
          fill="none"
          stroke="#4A2C1A"
          strokeWidth="2.5"
          opacity="0.35"
        />
        {/* Surface sheen */}
        <ellipse cx="78" cy="158" rx="52" ry="28" fill="#5C3820" opacity="0.22" />
        <ellipse cx="48" cy="175" rx="28" ry="14" fill="#6B4830" opacity="0.15" />
      </motion.svg>

      {/* ── Coffee ring stain ── */}
      <motion.svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        className="absolute"
        style={{
          top: "60%",
          left: "28px",
          opacity: ringOpacity,
          scale: ringScale,
          transformOrigin: "center center",
        }}
      >
        <circle cx="48" cy="48" r="42" fill="none" stroke="#4A2C1A" strokeWidth="8" opacity="0.62" />
        <circle cx="48" cy="48" r="35" fill="none" stroke="#2E1505" strokeWidth="3" opacity="0.3" />
        <circle cx="48" cy="48" r="28" fill="none" stroke="#6B4828" strokeWidth="1.5" opacity="0.18" />
      </motion.svg>
    </div>
  );
}
