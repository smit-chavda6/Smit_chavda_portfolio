"use client";

import { useEffect, useRef } from "react";

// HUD targeting cursor: a bracket reticle that trails the pointer and snaps
// around interactive elements. Label comes from data-cursor="…" when present.
export default function Cursor({ color }: { color: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = rootRef.current!, frameEl = frameRef.current!, dot = dotRef.current!, label = labelRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-cursor");

    const pointer = { x: -100, y: -100 };
    const frame = { x: -100, y: -100, w: 30, h: 30 };
    let target: HTMLElement | null = null;
    let down = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      root.style.opacity = "1";
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("a, button, [data-cursor]");
      if (el === target) return;
      target = el;
      const text = el?.dataset.cursor ?? (el instanceof HTMLAnchorElement && el.target === "_blank" ? "Open" : "");
      label.textContent = text;
      root.dataset.mode = el ? "target" : "idle";
      root.dataset.label = text ? "on" : "off";
    };

    const onDown = () => {
      down = true;
      root.dataset.down = "on";
    };
    const onUp = () => {
      down = false;
      root.dataset.down = "off";
    };
    const onLeave = () => (root.style.opacity = "0");

    const loop = () => {
      raf = requestAnimationFrame(loop);
      let tx: number, ty: number, tw: number, th: number;
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect();
        const pad = down ? 3 : 7;
        tx = r.left - pad;
        ty = r.top - pad;
        tw = r.width + pad * 2;
        th = r.height + pad * 2;
      } else {
        const s = down ? 18 : 30;
        tx = pointer.x - s / 2;
        ty = pointer.y - s / 2;
        tw = th = s;
      }
      const k = reduce ? 1 : 0.22;
      frame.x += (tx - frame.x) * k;
      frame.y += (ty - frame.y) * k;
      frame.w += (tw - frame.w) * k;
      frame.h += (th - frame.h) * k;

      frameEl.style.transform = `translate3d(${frame.x}px, ${frame.y}px, 0)`;
      frameEl.style.width = `${frame.w}px`;
      frameEl.style.height = `${frame.h}px`;
      dot.style.transform = `translate3d(${pointer.x - 2}px, ${pointer.y - 2}px, 0)`;
      label.style.transform = `translate3d(${pointer.x + 16}px, ${pointer.y + 18}px, 0)`;
    };
    loop();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-mode="idle"
      data-label="off"
      data-down="off"
      className="cursor pointer-events-none fixed inset-0 z-[100] opacity-0 transition-opacity duration-300"
      style={{ ["--cursor" as string]: color }}
    >
      <div ref={frameRef} className="cursor-frame absolute left-0 top-0">
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>
      <div ref={dotRef} className="cursor-dot absolute left-0 top-0 h-1 w-1" />
      <div ref={labelRef} className="cursor-label absolute left-0 top-0 font-mono text-[10px] font-medium uppercase tracking-[0.18em]" />
    </div>
  );
}
