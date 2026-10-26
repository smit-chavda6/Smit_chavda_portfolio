"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile, projects, scenes } from "@/lib/data";
import type { Theme } from "./useTheme";

const navLinks = [
  { name: "About", href: "#about", scenes: ["about"] },
  { name: "Work", href: "#infermesh", scenes: projects.map((p) => p.id) },
  { name: "Stack", href: "#stack", scenes: ["stack"] },
  { name: "Journey", href: "#journey", scenes: ["journey"] },
  { name: "Contact", href: "#contact", scenes: ["contact"] },
];

const pad = (n: number) => String(n).padStart(2, "0");
const spring = { type: "spring", stiffness: 420, damping: 36 } as const;

// 3×3 "neuron" matrix — a diagonal pulse sweeps through it in the scene colour
function Logo({ color }: { color: string }) {
  return (
    <span className="mark flex items-center gap-3" style={{ ["--mark" as string]: color }}>
      <span className="grid grid-cols-3 gap-[3px] border border-paper/15 bg-ink/40 p-[5px] backdrop-blur" aria-hidden>
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3), col = i % 3;
          return (
            <span
              key={i}
              className={`matrix-cell h-[5px] w-[5px] ${[0, 4, 8, 2, 6].includes(i) ? "on" : ""}`}
              style={{ animationDelay: `${(row + col) * 0.18}s` }}
            />
          );
        })}
      </span>
      <span className="leading-none">
        <span className="block font-display text-[13px] uppercase tracking-[-0.01em]">
          <span className="font-semibold">Smit</span> <span className="font-light text-paper/70">Chavda</span>
        </span>
        <span className="mt-1.5 hidden font-mono text-[9px] uppercase tracking-[0.25em] text-muted sm:block">
          {profile.role}
        </span>
      </span>
    </span>
  );
}

// Glowing orb tinted by the current scene
function Orb({ color }: { color: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:animate-none" style={{ background: color }} />
      <span className="relative h-2.5 w-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 12px ${color}`, transition: "background 0.8s" }} />
    </span>
  );
}

// Little live "signal" bars used in the call-to-action
function Signal() {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[2px] origin-bottom rounded-full bg-current motion-safe:animate-[signal_1s_ease-in-out_infinite]"
          style={{ height: "100%", animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

// Sun ↔ moon morph: the moon is a sun whose disc gets "bitten" by a sliding mask circle
function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: (e: React.MouseEvent) => void }) {
  const dark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      data-cursor={dark ? "Light" : "Dark"}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      className="group grid h-11 w-11 place-items-center rounded-full border border-paper/20 bg-glass/70 backdrop-blur-xl transition-colors hover:border-paper/50"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] overflow-visible" aria-hidden>
        <mask id="moon-mask">
          <rect x="-4" y="-4" width="32" height="32" fill="white" />
          <circle
            cx="17"
            cy="7"
            r="7"
            fill="black"
            style={{
              transform: dark ? "none" : "translate(13px, -11px)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="currentColor"
          mask="url(#moon-mask)"
          style={{
            transformOrigin: "12px 12px",
            transform: dark ? "none" : "scale(0.625)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transformOrigin: "12px 12px",
            transform: dark ? "rotate(-90deg) scale(0)" : "rotate(0) scale(1)",
            opacity: dark ? 0 : 1,
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="1.5" x2="12" y2="3.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}

export default function Navbar({
  active,
  progress,
  color,
  theme,
  onToggleTheme,
}: {
  active: number;
  progress: number;
  color: string;
  theme: Theme;
  onToggleTheme: (e: React.MouseEvent) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scene = scenes[active];
  const activeNav = navLinks.findIndex((l) => l.scenes.includes(scene.id));
  // The island shows links at the top of the page or on hover; otherwise it collapses to the scene readout
  const expanded = !scrolled || hover;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-4 pt-4 md:px-8 md:pt-6">
        {/* Fade + blur strip so page text dissolves under the bar instead of colliding with it */}
        <div
          aria-hidden
          className={`nav-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 transition-opacity duration-500 md:h-32 ${
            scrolled || menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Left: identity */}
        <a
          href="#intro"
          onClick={() => setMenuOpen(false)}
          data-cursor="Home"
          aria-label={`${profile.name} — back to top`}
          className={`rounded-full border py-1.5 pl-1.5 pr-4 transition-all duration-500 ${
            scrolled ? "border-paper/12 bg-glass/75 shadow-[0_10px_40px_-12px_var(--shadow)] backdrop-blur-xl" : "border-transparent"
          }`}
        >
          <Logo color={color} />
        </a>

        {/* Center: dynamic island (desktop) */}
        <div className="pointer-events-none absolute inset-x-0 top-4 hidden justify-center md:top-6 lg:flex">
        <motion.nav
          layout
          transition={spring}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          aria-label="Primary"
          className="pointer-events-auto overflow-hidden border border-paper/12 bg-glass/80 shadow-[0_10px_40px_-12px_var(--shadow),inset_0_1px_0_var(--sheen)] backdrop-blur-xl"
          style={{ borderRadius: 999 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {expanded ? (
              <motion.ul
                key="links"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-1 p-1.5"
              >
                {navLinks.map((l, i) => {
                  const on = i === activeNav;
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className={`relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                          on ? "text-ink" : "text-paper/60 hover:text-paper"
                        }`}
                      >
                        {on && (
                          <motion.span
                            layoutId="island-active"
                            className="absolute inset-0 rounded-full"
                            style={{ background: color }}
                            transition={spring}
                          />
                        )}
                        <span className="relative">{l.name}</span>
                      </a>
                    </li>
                  );
                })}
              </motion.ul>
            ) : (
              <motion.div
                key="readout"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 py-2.5 pl-4 pr-3"
              >
                <Orb color={color} />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{pad(active + 1)}</span>
                <span key={scene.id} className="hud-fade whitespace-nowrap text-[13px] font-medium text-paper">
                  {scene.label.replace("Project / ", "")}
                </span>
                {/* mini progress ring */}
                <svg viewBox="0 0 20 20" className="ml-1 h-5 w-5 -rotate-90" aria-hidden>
                  <circle cx="10" cy="10" r="8" fill="none" stroke="var(--paper)" strokeOpacity={0.15} strokeWidth="2" />
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={`${progress} 1`}
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={profile.resume}
            target="_blank"
            data-cursor="CV"
            className="hidden rounded-full px-4 py-2.5 text-[13px] font-medium text-paper/70 transition-colors hover:text-paper md:block"
          >
            Résumé
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            data-cursor="Talk"
            className="group relative hidden items-center gap-2.5 overflow-hidden rounded-full bg-paper py-2.5 pl-4 pr-2.5 text-[13px] font-semibold text-ink sm:flex"
          >
            {/* Hover fill takes the current scene colour */}
            <span
              className="absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
              style={{ background: color }}
            />
            <span className="relative">
              <Signal />
            </span>
            <span className="relative">Let&apos;s talk</span>
            <span className="relative grid h-6 w-6 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:rotate-45">
              ↗
            </span>
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 bg-glass/70 backdrop-blur-xl lg:hidden"
          >
            <span className="relative h-2.5 w-4">
              <span className={`absolute left-0 h-px w-4 bg-paper transition-all duration-300 ${menuOpen ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-paper transition-all duration-300 ${menuOpen ? "top-1 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-glass/95 px-5 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <ul>
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-paper/10"
                >
                  <a href={l.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-4">
                    <span className="display text-5xl sm:text-6xl" style={{ color: i === activeNav ? color : undefined }}>
                      {l.name}
                    </span>
                    <span className="font-mono text-xs text-muted">{pad(i + 1)}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <Orb color={color} />
                {scene.label}
              </span>
              <a href={profile.resume} target="_blank" className="rounded-full border border-paper/25 px-4 py-2.5 text-[13px] text-paper">
                Résumé ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
