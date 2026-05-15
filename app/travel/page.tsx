import type { Metadata } from "next";
import Link from "next/link";
import TravelView from "@/components/TravelView";
import RecordPlayer from "@/components/RecordPlayer";
import TravelThemeToggle from "@/components/TravelThemeToggle";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Travel — Anant",
  description: "Places I've lived and explored — an interactive globe of my journey.",
};

export default function TravelPage() {
  return (
    <>
      <main style={{ background: "var(--bg)" }}>
        <TravelView />
      </main>

      {/* Go back — top-left */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-50 flex items-center gap-1.5 font-mono text-xs tracking-wide rounded-full px-3 py-2 border transition-colors"
        style={{
          background: "var(--nav-bg)",
          borderColor: "var(--border)",
          color: "var(--fg-muted)",
          backdropFilter: "blur(8px)",
        }}
      >
        <ArrowLeft size={12} strokeWidth={1.8} />
        go back
      </Link>

      {/* Theme toggle — top-right */}
      <TravelThemeToggle />

      <RecordPlayer />
    </>
  );
}
