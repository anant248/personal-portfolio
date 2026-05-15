"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function TravelThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="fixed top-5 right-5 z-50 flex items-center justify-center w-9 h-9 rounded-full border transition-colors"
      style={{
        background: "var(--nav-bg)",
        borderColor: "var(--border)",
        color: "var(--fg-muted)",
        backdropFilter: "blur(8px)",
      }}
    >
      {mounted
        ? theme === "dark"
          ? <Sun size={15} strokeWidth={1.8} />
          : <Moon size={15} strokeWidth={1.8} />
        : <Sun size={15} strokeWidth={1.8} />}
    </button>
  );
}
