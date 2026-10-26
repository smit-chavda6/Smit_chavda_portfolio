"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Cursor from "./Cursor";
import { useActiveScene } from "./useActiveScene";
import { useTheme } from "./useTheme";
import { profile, sceneColor, scenes } from "@/lib/data";

// three.js is the bulk of the JS; load it after the page's text is on screen
const NeuralScene = dynamic(() => import("./NeuralScene"), { ssr: false });

// Fixed 3D field + HUD chrome; the scrolling sections are passed as children
export default function Stage({ children }: { children: React.ReactNode }) {
  const active = useActiveScene();
  const { theme, toggle } = useTheme();
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    // At most one progress update per frame, and only when it visibly changes
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.round((window.scrollY / max) * 200) / 200 : 0;
      setProgress((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    const fmt = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(
          new Date()
        )
      );
    fmt();
    const clock = setInterval(fmt, 30_000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(clock);
    };
  }, []);

  const scene = scenes[active];
  const color = sceneColor(scene, theme);

  return (
    <>
      {/* Soft scene-coloured glow that sits behind the 3D shape */}
      <div aria-hidden className="scene-glow" data-side={scene.side} style={{ ["--gc" as string]: color }} />
      <NeuralScene active={active} theme={theme} color={color} />
      <Navbar active={active} progress={progress} color={color} theme={theme} onToggleTheme={toggle} />
      <Cursor color={color} />

      {/* Bottom HUD */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex items-end justify-between px-5 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:px-8 md:py-6">
        <div className="hidden leading-relaxed sm:block">
          <span className="block">Local time</span>
          <span className="block">IST {time}</span>
        </div>

        {/* Scene position lives in the navbar island; the HUD only hints and signs off */}
        <div className="text-right leading-relaxed sm:text-center">
          {active === 0 ? (
            <span className="hud-fade hidden md:block">Scroll to enter the model ↓</span>
          ) : active === scenes.length - 1 ? (
            <span key="footer" className="hud-fade block">
              © {new Date().getFullYear()} {profile.name}
            </span>
          ) : null}
        </div>

        <span className="hidden w-[150px] sm:block" />
      </div>

      <div className="relative z-10">{children}</div>
    </>
  );
}
