"use client";
import React, { useEffect, useRef, useState } from "react";
import MobileSquareGridCanvas from "./mobile/MobileSquareGridCanvas";

export default function ChromaticWaves() {
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

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let time = 0;
    const spacing = 18; // Spacing between dots

    let animationFrameId: number;

    // Cap to 24fps — imperceptible for background effects, cuts CPU load ~60%
    const TARGET_FPS = 24;
    const FRAME_MS = 1000 / TARGET_FPS;
    let lastFrame = 0;

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);
      
      time += 0.04; // Slightly faster to compensate for fewer frames

      const cols = Math.ceil(w / spacing);
      const rows = Math.ceil(h / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          
          // Calculate diagonal wave distance
          const dist = (x + y) * 0.005;
          // Create multiple overlapping waves
          const wave1 = Math.sin(dist - time);
          const wave2 = Math.sin(dist * 0.8 - time * 1.5);
          const combinedWave = (wave1 + wave2) / 2;
          
          // Skip near-invisible dots — reduces draw calls by ~50%
          if (combinedWave > 0.1) {
            // Chromatic effect: shift RGB slightly based on wave position
            // Target Indigo (#6366f1) and Purple (#c084fc)
            const r = Math.floor(100 + Math.sin(dist - time) * 50); // Subtle red for purple
            const g = Math.floor(80 + Math.cos(dist - time * 1.2 + 1) * 60); // Low green
            const b = Math.floor(200 + Math.sin(dist - time * 0.8 + 2) * 55); // High blue/indigo bias
            
            const radius = combinedWave * 2.5; // Max radius
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${combinedWave})`;
            ctx.fill();
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isMobile) {
    return <MobileSquareGridCanvas accent="#06b6d4" secondary="#6366f1" gridSize={36} />;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none mix-blend-screen opacity-50" 
    />
  );
}
