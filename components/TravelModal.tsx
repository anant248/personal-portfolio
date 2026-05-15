"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { TravelLocation, TravelPhoto } from "@/data/travel";

function Polaroid({
  photo,
  index,
  total,
}: {
  photo: TravelPhoto;
  index: number;
  total: number;
}) {
  // Spread polaroids in a fan: tighter spacing for larger sets
  const spacing = total <= 2 ? 160 : total === 3 ? 130 : 108;
  const spread = total === 1 ? 0 : (index - (total - 1) / 2) * spacing;
  const baseRotate = photo.rotate;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, y: 40, rotate: baseRotate - 8, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, rotate: baseRotate, scale: 1 }}
      transition={{
        delay: 0.1 + index * 0.1,
        duration: 0.6,
        type: "spring",
        damping: 15,
        stiffness: 120,
      }}
      whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
      whileDrag={{ scale: 1.08, zIndex: 60, cursor: "grabbing" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="absolute select-none"
      style={{
        width: "160px",
        left: `calc(50% + ${spread}px - 80px)`,
        top: "0px",
        zIndex: hovered ? 50 : index + 1,
        background: "#fff",
        boxShadow: "0 8px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.06)",
        cursor: "grab",
        touchAction: "none",
      }}
    >
      <div className="w-full overflow-hidden bg-zinc-200" style={{ height: "150px" }}>
        <Image
          src={photo.src}
          alt={photo.caption}
          width={160}
          height={150}
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          className="w-full h-full bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-350"
          style={{ marginTop: "-150px" }}
        />
      </div>
      <div className="px-2 pt-2 pb-5 bg-white">
        <span
          className="text-zinc-500 text-base block text-center"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          {photo.caption}
        </span>
      </div>
    </motion.div>
  );
}

interface TravelModalProps {
  location: TravelLocation | null;
  onClose: () => void;
}

export default function TravelModal({ location, onClose }: TravelModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!location) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [location, onClose]);

  // Cluster height scales with photo count; 0 photos → no cluster space
  const photoCount = location?.photos.length ?? 0;
  const clusterH = photoCount === 0 ? 0 : 230;

  return (
    <AnimatePresence>
      {location && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 rounded-2xl border p-8"
            style={{
              bottom: "clamp(24px, 5vh, 60px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(320px, 90vw, 560px)",
              background: "var(--pill-bg)",
              borderColor: "var(--border)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1.5 transition-colors"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--fg)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")
              }
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.8} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h2
                  className="leading-none"
                  style={{
                    fontFamily: "var(--font-caveat)",
                    fontSize: "clamp(2rem, 6vw, 2.8rem)",
                    color: "#FB923C",
                  }}
                >
                  {location.city}
                </h2>
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {location.flag} {location.country}
                  {location.years && ` · ${location.years}`}
                </span>
              </div>
              <p
                className="mt-2 text-base leading-relaxed"
                style={{ color: "var(--fg-2)" }}
              >
                {location.caption}
              </p>
            </div>

            {/* Polaroid cluster — hidden when no photos */}
            {photoCount > 0 && (
              <div
                className="relative w-full overflow-visible"
                style={{ height: `${clusterH}px` }}
              >
                {location.photos.map((photo, i) => (
                  <Polaroid
                    key={photo.src}
                    photo={photo}
                    index={i}
                    total={photoCount}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
