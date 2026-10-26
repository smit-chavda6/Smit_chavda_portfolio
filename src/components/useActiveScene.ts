"use client";

import { useEffect, useState } from "react";
import { scenes } from "@/lib/data";

// Index of the [data-scene] section crossing the middle of the viewport
export function useActiveScene() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = scenes.findIndex((s) => s.id === (e.target as HTMLElement).dataset.scene);
          if (i >= 0) setActive(i);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    document.querySelectorAll("[data-scene]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
