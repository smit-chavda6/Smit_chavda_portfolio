"use client"

import React, { useEffect, useRef, useState } from "react";
import MobileSquareGridCanvas from "./mobile/MobileSquareGridCanvas";

const CHARS = " .'`^,-_~=+:;!*#%$@";

export default function AsciiWater({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let w = 0, h = 0;
    const cellSize = 14; 
    let cols = 0, rows = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      cols = Math.floor(w / cellSize);
      rows = Math.floor(h / cellSize);
      ctx.font = `bold ${cellSize - 2}px monospace`;
      ctx.textBaseline = "top";
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();

    let rafId = 0;
    let time = 0;

    // Cap to 20fps — fillText() is slow; 20fps is imperceptible for background text rain
    const TARGET_FPS = 20;
    const FRAME_MS = 1000 / TARGET_FPS;
    let lastFrame = 0;

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;
      time += 0.05; // Compensate for fewer frames vs original 60fps

      // Fill background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // Draw ASCII — set fillStyle once, vary only globalAlpha per char
      ctx.fillStyle = "#0ea5e9";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x * 0.05;
          const ny = y * 0.05;
          
          const v1 = Math.sin(nx + time) + Math.cos(ny + time * 0.8);
          const v2 = Math.sin(nx * 1.5 - ny * 1.2 - time * 1.5);
          const v3 = Math.sin(Math.hypot(nx, ny) * 2 - time * 2);
          
          let val = (v1 + v2 + v3 + 3) / 6;
          val = Math.max(0, Math.min(1, val));
          val = Math.pow(val, 1.5);

          const charIdx = Math.floor(val * (CHARS.length - 1));

          // Skip low-value chars entirely — reduces fillText calls significantly
          if (charIdx > 2) {
            const fadeX = Math.min(1, x / 10, (cols - x) / 10);
            const fadeY = Math.min(1, y / 5, (rows - y) / 5);
            ctx.globalAlpha = val * fadeX * fadeY;
            ctx.fillText(CHARS[charIdx], x * cellSize, y * cellSize);
          }
        }
      }
      
      ctx.globalAlpha = 1.0;
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isMobile) {
    return <MobileSquareGridCanvas accent="#0ea5e9" secondary="#6366f1" gridSize={36} />;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} 
    />
  );
}
