"use client";

import React, { useEffect, useRef } from "react";

interface MobileSquareGridCanvasProps {
  accent?: string; // hex or rgb prefix
  secondary?: string;
  gridSize?: number;
  className?: string;
}

export default function MobileSquareGridCanvas({
  accent = "rgba(99, 102, 241, ",
  secondary = "rgba(192, 132, 252, ",
  gridSize = 36,
  className = "",
}: MobileSquareGridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId: number;
    let isVisible = true;

    // Format colors to rgba prefix if passed as hex
    const formatColorPrefix = (col: string, defaultPrefix: string) => {
      if (col.startsWith("rgba(")) return col;
      if (col.startsWith("#")) {
        const hex = col.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16) || 99;
        const g = parseInt(hex.substring(2, 4), 16) || 102;
        const b = parseInt(hex.substring(4, 6), 16) || 241;
        return `rgba(${r}, ${g}, ${b}, `;
      }
      return defaultPrefix;
    };

    const primaryColor = formatColorPrefix(accent, "rgba(99, 102, 241, ");
    const secondColor = formatColorPrefix(secondary, "rgba(192, 132, 252, ");

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Touch interaction
    const touch = { x: -1000, y: -1000, active: false };
    const activeTouchSquares: Array<{ col: number; row: number; alpha: number }> = [];

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        touch.x = e.touches[0].clientX - rect.left;
        touch.y = e.touches[0].clientY - rect.top;
        touch.active = true;

        const col = Math.floor(touch.x / gridSize);
        const row = Math.floor(touch.y / gridSize);

        // Highlight square under touch
        const existing = activeTouchSquares.find(
          (sq) => sq.col === col && sq.row === row
        );
        if (existing) {
          existing.alpha = 0.45;
        } else if (activeTouchSquares.length < 24) {
          activeTouchSquares.push({ col, row, alpha: 0.45 });
        }
      }
    };

    const handleTouchEnd = () => {
      touch.active = false;
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Animated wandering grid square pulses (AI matrix cells)
    const PULSE_CELLS_COUNT = 8;
    const pulseCells = Array.from({ length: PULSE_CELLS_COUNT }, () => ({
      col: Math.floor(Math.random() * 12),
      row: Math.floor(Math.random() * 24),
      alpha: 0,
      targetAlpha: Math.random() * 0.22 + 0.08,
      speed: Math.random() * 0.015 + 0.008,
      growing: true,
      useSecondary: Math.random() > 0.5,
    }));

    // Data pulses traveling along square grid lines
    interface GridPulse {
      col: number;
      row: number;
      direction: "h" | "v";
      pos: number;
      speed: number;
      length: number;
      color: string;
    }

    const pulses: GridPulse[] = Array.from({ length: 9 }, () => ({
      col: Math.floor(Math.random() * 12),
      row: Math.floor(Math.random() * 24),
      direction: Math.random() > 0.5 ? "h" : "v",
      pos: Math.random() * 300,
      speed: Math.random() * 1.8 + 1.0,
      length: Math.random() * 32 + 20,
      color: Math.random() > 0.4 ? primaryColor : secondColor,
    }));

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;

      // Clean dark canvas background
      ctx.fillStyle = "#020204";
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient center glow
      const cx = width * 0.5;
      const cy = height * 0.5;
      const bgAura = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.75);
      bgAura.addColorStop(0, `${primaryColor}0.08)`);
      bgAura.addColorStop(0.6, `${secondColor}0.03)`);
      bgAura.addColorStop(1, "rgba(2, 2, 4, 0)");
      ctx.fillStyle = bgAura;
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      // 1. Draw animated pulsing squares
      for (const cell of pulseCells) {
        if (cell.growing) {
          cell.alpha += cell.speed;
          if (cell.alpha >= cell.targetAlpha) cell.growing = false;
        } else {
          cell.alpha -= cell.speed;
          if (cell.alpha <= 0) {
            cell.growing = true;
            cell.col = Math.floor(Math.random() * cols);
            cell.row = Math.floor(Math.random() * rows);
            cell.targetAlpha = Math.random() * 0.22 + 0.08;
            cell.useSecondary = Math.random() > 0.5;
          }
        }

        const color = cell.useSecondary ? secondColor : primaryColor;
        ctx.fillStyle = `${color}${cell.alpha})`;
        ctx.fillRect(
          cell.col * gridSize + 1,
          cell.row * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      }

      // 2. Draw touch-activated squares
      for (let i = activeTouchSquares.length - 1; i >= 0; i--) {
        const sq = activeTouchSquares[i];
        sq.alpha -= 0.012;
        if (sq.alpha <= 0) {
          activeTouchSquares.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${primaryColor}${sq.alpha})`;
        ctx.fillRect(
          sq.col * gridSize + 1,
          sq.row * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );

        ctx.strokeStyle = `${secondColor}${sq.alpha * 1.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(
          sq.col * gridSize + 0.5,
          sq.row * gridSize + 0.5,
          gridSize - 1,
          gridSize - 1
        );
      }

      // 3. Draw the crisp square grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.045)";
      ctx.lineWidth = 1;

      // Vertical grid lines
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      ctx.stroke();

      // Horizontal grid lines
      ctx.beginPath();
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      // 4. Draw grid intersection micro-dots
      ctx.fillStyle = `${primaryColor}0.35)`;
      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }

      // 5. Draw traveling data beam pulses along square grid lines
      for (const p of pulses) {
        if (p.direction === "h") {
          p.pos += p.speed;
          const y = p.row * gridSize + 0.5;
          if (p.pos > width + p.length) {
            p.pos = -p.length;
            p.row = Math.floor(Math.random() * rows);
            p.speed = Math.random() * 1.8 + 1.0;
          }

          const startX = Math.max(0, p.pos - p.length);
          const endX = Math.min(width, p.pos);

          if (endX > startX) {
            const grad = ctx.createLinearGradient(startX, y, endX, y);
            grad.addColorStop(0, `${p.color}0)`);
            grad.addColorStop(1, `${p.color}0.85)`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();

            // Pulse leading spark
            ctx.fillStyle = `${p.color}1)`;
            ctx.beginPath();
            ctx.arc(endX, y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          p.pos += p.speed;
          const x = p.col * gridSize + 0.5;
          if (p.pos > height + p.length) {
            p.pos = -p.length;
            p.col = Math.floor(Math.random() * cols);
            p.speed = Math.random() * 1.8 + 1.0;
          }

          const startY = Math.max(0, p.pos - p.length);
          const endY = Math.min(height, p.pos);

          if (endY > startY) {
            const grad = ctx.createLinearGradient(x, startY, x, endY);
            grad.addColorStop(0, `${p.color}0)`);
            grad.addColorStop(1, `${p.color}0.85)`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();

            // Pulse leading spark
            ctx.fillStyle = `${p.color}1)`;
            ctx.beginPath();
            ctx.arc(x, endY, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause rendering when section is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [accent, secondary, gridSize]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: "block" }}
      />
    </div>
  );
}
