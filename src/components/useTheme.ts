"use client";

import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

// Source of truth is <html data-theme>, stamped before first paint by the
// inline script in layout.tsx; React subscribes to it as an external store.
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function write(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  flushSync(() => listeners.forEach((fn) => fn()));
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => "dark" as Theme);

  // Switch with a circular reveal expanding from the click point
  const toggle = useCallback(
    (e?: { clientX: number; clientY: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || reduce) {
        write(next);
        return;
      }

      const x = e?.clientX ?? window.innerWidth - 40;
      const y = e?.clientY ?? 40;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      document.startViewTransition(() => write(next)).ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      });
    },
    [theme]
  );

  return { theme, toggle };
}
