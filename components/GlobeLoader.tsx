"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { feature, merge } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { MultiPolygon } from "geojson";

const SIZE = 200;
const R = 72; // globe radius

let atlasPromise: Promise<Topology> | null = null;
function loadAtlas(): Promise<Topology> {
  if (!atlasPromise) {
    atlasPromise = fetch(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    ).then((r) => r.json());
  }
  return atlasPromise;
}

export default function GlobeLoader() {
  const { resolvedTheme } = useTheme();
  const globeRef = useRef<HTMLCanvasElement>(null);
  const whirlRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const globeCanvas = globeRef.current;
    const whirlCanvas = whirlRef.current;
    if (!globeCanvas || !whirlCanvas) return;

    const isDark = resolvedTheme === "dark";
    const inkRGB = isDark ? "232,232,232" : "23,23,23";
    const ink = `rgb(${inkRGB})`;
    const sphereFill = isDark ? "rgba(255,255,255,0.03)" : "#ffffff";

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    [globeCanvas, whirlCanvas].forEach((c) => {
      c.width = SIZE * dpr;
      c.height = SIZE * dpr;
    });

    const g = globeCanvas.getContext("2d");
    const w = whirlCanvas.getContext("2d");
    if (!g || !w) return;
    g.scale(dpr, dpr);
    w.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;

    const projection = geoOrthographic()
      .scale(R)
      .translate([cx, cy])
      .clipAngle(90);
    const path = geoPath(projection, g);
    const graticule = geoGraticule10();
    const sphere = { type: "Sphere" } as const;

    let land: MultiPolygon | null = null;
    let countries: ReturnType<typeof feature> | null = null;

    loadAtlas()
      .then((topo) => {
        const obj = topo.objects.countries as GeometryCollection;
        countries = feature(topo, obj);
        land = merge(topo, obj.geometries as Parameters<typeof merge>[1]);
      })
      .catch(() => {
        /* keep spinning the wireframe even if data fails */
      });

    function drawGlobe() {
      g!.clearRect(0, 0, SIZE, SIZE);

      g!.beginPath();
      path(sphere);
      g!.fillStyle = sphereFill;
      g!.fill();
      g!.lineWidth = 1.25;
      g!.strokeStyle = ink;
      g!.stroke();

      g!.beginPath();
      path(graticule);
      g!.lineWidth = 0.5;
      g!.strokeStyle = `rgba(${inkRGB},0.16)`;
      g!.stroke();

      if (land) {
        g!.beginPath();
        path(land);
        g!.fillStyle = `rgba(${inkRGB},0.07)`;
        g!.fill();
      }
      if (countries) {
        g!.beginPath();
        path(countries);
        g!.lineWidth = 0.75;
        g!.strokeStyle = `rgba(${inkRGB},0.85)`;
        g!.stroke();
      }
    }

    function drawWhirlRing(
      angle: number,
      radius: number,
      span: number,
      lineWidth: number,
      dir: number,
      baseAlpha: number
    ) {
      const steps = 48;
      for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);
        const a0 = angle - dir * (span * t);
        const a1 = angle - dir * (span * (t + 1 / steps));
        w!.beginPath();
        w!.arc(cx, cy, radius, Math.min(a0, a1), Math.max(a0, a1));
        w!.lineWidth = lineWidth;
        w!.lineCap = "round";
        const alpha = baseAlpha * Math.pow(1 - t, 1.7);
        w!.strokeStyle = `rgba(${inkRGB},${alpha.toFixed(3)})`;
        w!.stroke();
      }
    }

    function drawWhirl(time: number) {
      w!.clearRect(0, 0, SIZE, SIZE);
      const s = time / 1000;

      drawWhirlRing(s * 2.6, R + 16, Math.PI * 0.9, 2.2, 1, 0.55);
      drawWhirlRing(-s * 1.7 + Math.PI, R + 9, Math.PI * 0.7, 1.4, -1, 0.4);

      for (let k = 0; k < 3; k++) {
        const a = s * 2.6 + (k * 2 * Math.PI) / 3;
        const rr = R + 16;
        const px = cx + Math.cos(a) * rr;
        const py = cy + Math.sin(a) * rr;
        w!.beginPath();
        w!.arc(px, py, 1.6, 0, 2 * Math.PI);
        w!.fillStyle = `rgba(${inkRGB},0.7)`;
        w!.fill();
      }
    }

    let lon = 20;
    const lat = -18;
    let last = performance.now();
    let raf = 0;

    function frame(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      lon += dt * 22; // deg/sec spin
      projection.rotate([lon, lat]);

      drawGlobe();
      drawWhirl(now);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [resolvedTheme]);

  return (
    <div
      role="status"
      aria-label="Loading globe"
      style={{ width: SIZE, height: SIZE, position: "relative" }}
    >
      <canvas
        ref={whirlRef}
        style={{ position: "absolute", inset: 0, width: SIZE, height: SIZE }}
      />
      <canvas
        ref={globeRef}
        style={{ position: "absolute", inset: 0, width: SIZE, height: SIZE }}
      />
    </div>
  );
}
