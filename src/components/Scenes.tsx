import React from "react";
import Reveal from "./Reveal";
import CopyEmail from "./CopyEmail";
import { journey, profile, projects, scenes, skillGroups } from "@/lib/data";

function Scene({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const scene = scenes.find((s) => s.id === id);
  const side = scene?.side ?? "center";
  const align =
    side === "left" ? "lg:mr-auto lg:max-w-[min(40rem,46vw)]" : side === "right" ? "lg:ml-auto lg:max-w-[min(40rem,46vw)]" : "mx-auto max-w-5xl text-center";
  return (
    <section
      id={id}
      data-scene={id}
      style={{ ["--c-dark" as string]: scene?.color, ["--c-light" as string]: scene?.colorLight }}
      className={`relative flex min-h-[100svh] items-center px-5 py-32 md:px-8 lg:px-16 ${className}`}>
      <div className={`@container w-full min-w-0 ${align}`}>{children}</div>
    </section>
  );
}

const channels = [
  {
    label: "LinkedIn",
    value: "in/smit-chavda6",
    href: profile.linkedin,
    external: true,
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "GitHub",
    value: "smit-chavda6",
    href: profile.github,
    external: true,
    icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z",
  },
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
    external: false,
    icon: "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z",
  },
];

function Kicker({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
      <span style={{ color: "var(--c, var(--accent))" }}>[{index}]</span>
      {children}
    </p>
  );
}

export default function Scenes() {
  return (
    <main>
      {/* 01 — Intro */}
      <Scene id="intro">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">AI Engineer · Generative AI · LLM Systems</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="display mt-8 text-[clamp(2.6rem,11vw,9.5rem)]">
            <span className="thin">Smit</span>
            <br />
            Chavda<span className="text-accent">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-paper/70 md:text-lg">
            I build the systems that turn raw model capability into shipped product — LLM gateways, AI features and the
            pipelines behind them.
          </p>
        </Reveal>
      </Scene>

      {/* 02 — About */}
      <Scene id="about">
        <Reveal>
          <Kicker index="02">About</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-6 text-[min(8.5cqw,4.25rem)]">
            <span className="thin">Engineer of the</span> <span className="text-accent">boring parts</span>{" "}
            <span className="thin">that make AI work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 leading-relaxed text-paper/70 md:text-lg">
            I design and deploy generative-AI features for modern web apps and integrate LLMs to automate complex business
            workflows end to end — backed by FastAPI and Node back ends, React front ends, Docker and CI/CD. Caching,
            routing, observability, cost.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-paper/15 pt-6">
            {[
              ["9.06", "CGPA"],
              ["03", "LLM providers unified"],
              ["Dehix", "AI Engineer Intern"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-xl font-semibold tracking-tight md:text-3xl">{v}</dt>
                <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Scene>

      {/* 03–06 — Projects, one scene each */}
      {projects.map((p, i) => {
        return (
          <Scene key={p.id} id={p.id}>
            <Reveal>
              <Kicker index={String(i + 3).padStart(2, "0")}>
                Project {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · {p.category}
              </Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Sized to the text column so long names (CONTEXTOS, MJ FAMILY SALON) never overflow */}
              <h2 className="display mt-6 text-[min(10.5cqw,6rem)] [overflow-wrap:anywhere]">{p.title}</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 leading-relaxed text-paper/70 md:text-lg">{p.description}</p>
            </Reveal>
            <Reveal delay={0.3}>
              {/* Key numbers from the résumé */}
              <ul className="mt-8 flex flex-wrap gap-2">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="border border-[var(--c)]/40 bg-[var(--c)]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--c)]"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {p.tech.map((t) => (
                  <li key={t}>/ {t}</li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor={l.label === "Live" ? "Visit" : "Source"}
                    className="group inline-flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em]"
                  >
                    <span className="relative grid h-12 w-12 place-items-center rounded-full border border-paper/30 transition-all duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:text-ink">
                      <span className="absolute h-12 w-12 scale-0 rounded-full bg-[var(--c)] transition-transform duration-300 group-hover:scale-100" />
                      <span className="relative">↗</span>
                    </span>
                    {l.label === "Live" ? "Live site" : "GitHub"}
                  </a>
                ))}
              </div>
            </Reveal>
          </Scene>
        );
      })}

      {/* 07 — Stack */}
      <Scene id="stack">
        <Reveal>
          <Kicker index="07">Stack</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-6 text-[min(11cqw,5rem)]">
            <span className="thin">Tech</span> <span className="text-accent">stack.</span>
          </h2>
        </Reveal>
        <div className="mt-10 space-y-5">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.group} delay={0.15 + gi * 0.05}>
              <div className="grid gap-3 border-t border-paper/15 pt-4 sm:grid-cols-[120px_1fr] sm:gap-4">
                <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  <span className="text-accent">{String(gi + 1).padStart(2, "0")}</span> {g.group}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s.name}
                      data-cursor={s.name}
                      className="skill group relative flex items-center gap-2.5 border border-paper/15 bg-ink/70 px-3 py-2 backdrop-blur-sm transition-colors duration-300 hover:border-paper/30"
                      style={{ ["--brand" as string]: s.brand }}
                    >
                      <span
                        aria-hidden
                        className="skill-icon h-[18px] w-[18px] shrink-0"
                        style={{ ["--icon" as string]: `url(/icons/${s.icon}.svg)` }}
                      />
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/80 transition-colors group-hover:text-paper">
                        {s.name}
                      </span>
                      <span className="corner pointer-events-none absolute -inset-1" />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Scene>

      {/* 08 — Journey */}
      <Scene id="journey">
        <Reveal>
          <Kicker index="08">Journey</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-6 text-[min(11cqw,5rem)]">
            <span className="thin">Where I&apos;ve</span> <span className="text-accent">been.</span>
          </h2>
        </Reveal>
        <ol className="mt-10 space-y-10">
          {journey.map((j, i) => (
            <li key={j.title}>
              <Reveal delay={0.15 + i * 0.1} className="border-t border-paper/15 pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{j.period}</p>
                <h3 className="mt-3 font-display text-xl font-semibold uppercase tracking-tight md:text-2xl">{j.title}</h3>
                <p className="text-accent">{j.org}</p>
                <ul className="mt-4 space-y-2 text-paper/70">
                  {j.points.map((pt) => (
                    <li key={pt}>— {pt}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </Scene>

      {/* 09 — Contact */}
      <Scene id="contact">
        <Reveal>
          <Kicker index="09">Contact</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-8 text-[clamp(2.6rem,10vw,8.5rem)]">
            <span className="thin">Step</span>
            <br />
            inside<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-md leading-relaxed text-paper/70">
            Open to AI engineering roles. Questions, ideas or a hello — my inbox is open.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-8">
          <CopyEmail email={profile.email} />
          <ul className="grid w-full max-w-3xl grid-cols-1 gap-px overflow-hidden border border-paper/15 bg-paper/15 text-left sm:grid-cols-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : { "data-cursor": "Call" })}
                  className="group relative flex h-full items-center gap-4 bg-ink/85 p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-accent hover:text-ink"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-paper/20 transition-colors group-hover:border-ink/30">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={c.icon} />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-ink/70">
                      {c.label}
                    </span>
                    <span className="mt-1 block truncate text-sm font-medium">{c.value}</span>
                  </span>
                  <span className="ml-auto font-mono text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Scene>
    </main>
  );
}
