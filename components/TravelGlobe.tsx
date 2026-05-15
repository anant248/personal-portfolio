"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { travelLocations, TravelLocation } from "@/data/travel";

// Dynamically import to avoid SSR — globe.gl calls window/WebGL at module eval time
// Cast to ComponentType<any> because react-globe.gl's TypeScript types are incomplete
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false }) as React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

interface TravelGlobeProps {
  onLocationSelect: (location: TravelLocation | null) => void;
  selectedLocation: TravelLocation | null;
}

export default function TravelGlobe({ onLocationSelect, selectedLocation }: TravelGlobeProps) {
  const { resolvedTheme } = useTheme();
  const globeRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [mounted, setMounted] = useState(false);

  // Measure container and keep globe sized to it
  useEffect(() => {
    setMounted(true);
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    observer.observe(el);
    setDimensions({ width: el.clientWidth, height: el.clientHeight });
    return () => observer.disconnect();
  }, []);

  // Stop auto-rotate when a location is selected
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = !selectedLocation;
    }
  }, [selectedLocation]);

  // Build imperative DOM pins — nested so globe.gl's left/top and our translate don't conflict
  const buildPin = useCallback((d: object) => {
    const loc = d as TravelLocation;

    // Root: positioned by globe.gl (left/top). Zero-size so it doesn't affect layout.
    const root = document.createElement("div");
    root.style.cssText = "pointer-events: auto; cursor: pointer; user-select: none; width: 0; height: 0;";

    // Inner: visual pin offset so the bottom-centre sits on the coordinate
    const pin = document.createElement("div");
    pin.style.cssText = [
      "position: absolute;",
      "transform: translate(-50%, -100%);",
      "transition: transform 0.15s ease;",
      "font-size: 28px;",
      "line-height: 1;",
      "filter: drop-shadow(0 2px 6px rgba(0,0,0,0.55));",
      "will-change: transform;",
    ].join(" ");
    pin.textContent = "📌";
    pin.title = `${loc.city}, ${loc.country}`;

    root.appendChild(pin);

    root.addEventListener("mouseenter", () => {
      pin.style.transform = "translate(-50%, -100%) scale(1.35)";
    });
    root.addEventListener("mouseleave", () => {
      pin.style.transform = "translate(-50%, -100%) scale(1)";
    });
    root.addEventListener("click", (e) => {
      e.stopPropagation();
      onLocationSelect(loc);
    });

    return root;
  }, [onLocationSelect]);

  const isDark = resolvedTheme === "dark";
  const globeTexture = isDark
    ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
    : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";

  if (!mounted) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
        <div
          className="rounded-full animate-pulse"
          style={{
            width: "min(70vh, 70vw)",
            height: "min(70vh, 70vw)",
            background: isDark ? "#1a1a1a" : "#e4e4e7",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={globeTexture}
        backgroundImageUrl=""
        showAtmosphere
        atmosphereColor="#FB923C"
        atmosphereAltitude={0.12}
        htmlElementsData={travelLocations}
        htmlLat={(d: TravelLocation) => d.lat}
        htmlLng={(d: TravelLocation) => d.lng}
        htmlAltitude={0.02}
        htmlElement={buildPin}
        pointOfView={{ lat: 20, lng: 20, altitude: 2.2 }}
        onGlobeReady={() => {
          if (globeRef.current) {
            const controls = globeRef.current.controls();
            if (controls) {
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.4;
            }
          }
        }}
        enablePointerInteraction
      />
    </div>
  );
}
