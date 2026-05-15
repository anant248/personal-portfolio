"use client";

import { useState, useRef, useEffect } from "react";
import { tracks } from "@/data/music";

export default function RecordPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.6;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  // Attach ended handler — uses functional setState to avoid stale closures
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % tracks.length;
        audio.src = tracks[next].src;
        audio.play().catch(() => {});
        return next;
      });
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src) audio.src = tracks[currentIndex].src;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const skipNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentIndex((prev) => {
      const next = (prev + 1) % tracks.length;
      audio.src = tracks[next].src;
      if (isPlaying) audio.play().catch(() => {});
      return next;
    });
  };

  const track = tracks[currentIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Track info pill */}
      <div
        className={`transition-all duration-300 ${
          showInfo ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <div
          className="rounded-xl px-4 py-2.5 text-right shadow-xl border"
          style={{ background: "var(--pill-bg)", borderColor: "var(--border)" }}
        >
          <p className="text-xs font-medium leading-tight" style={{ color: "var(--fg)" }}>{track.title}</p>
          <p className="text-[11px] font-mono mt-0.5" style={{ color: "var(--fg-muted)" }}>{track.artist}</p>
          <button
            onClick={skipNext}
            className="text-[10px] font-mono mt-1.5 transition-colors"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--fg-2)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
          >
            next →
          </button>
        </div>
      </div>

      {/* Vinyl record */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="relative w-16 h-16 rounded-full focus:outline-none group"
      >
        {/* Spinning disc */}
        <div
          className={`absolute inset-0 rounded-full border shadow-2xl ${isPlaying ? "animate-spin" : ""}`}
          style={{
            animationDuration: "3s",
            background: "var(--disc-bg)",
            borderColor: "var(--disc-border)",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.07)",
          }}
        >
          {/* Groove rings */}
          {[20, 26, 32, 38, 44, 50, 56].map((r) => (
            <div
              key={r}
              className="absolute rounded-full"
              style={{ inset: `${r / 2}%`, border: "1px solid rgba(255,255,255,0.05)" }}
            />
          ))}
          {/* Center label */}
          <div className="absolute inset-[30%] rounded-full bg-[#FB923C] flex items-center justify-center">
            <span className="text-[#0a0a0a] text-[9px] font-bold font-mono leading-none">AG</span>
          </div>
        </div>

        {/* Play/pause hover overlay */}
        <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
