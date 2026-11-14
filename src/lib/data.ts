import type { ShapeName } from "./shapes";

export const profile = {
  name: "Smit Chavda",
  role: "AI Engineer",
  email: "smitchavda6756@gmail.com",
  phone: "+91 87809 89600",
  phoneHref: "tel:+918780989600",
  resume: "/Smit_Chavda_Resume_main.pdf",
  github: "https://github.com/smit-chavda6",
  linkedin: "https://www.linkedin.com/in/smit-chavda6/",
};

// Each scene is one full-screen section; the particle field morphs to `shape`
// and slides to the opposite side of the text.
export type Scene = {
  id: string;
  label: string;
  shape: ShapeName;
  side: "left" | "right" | "center";
  color: string; // dark mode
  colorLight: string; // deeper tone that stays readable on the light background
};

export const sceneColor = (s: Scene, theme: "dark" | "light") => (theme === "light" ? s.colorLight : s.color);

export const scenes: Scene[] = [
  { id: "intro", label: "Neural core", shape: "core", side: "center", color: "#9a86ff", colorLight: "#5a43d1" },
  { id: "about", label: "About", shape: "knot", side: "left", color: "#9a86ff", colorLight: "#5a43d1" },
  { id: "infermesh", label: "Project / InferMesh", shape: "mesh", side: "left", color: "#ffb21f", colorLight: "#c27c00" },
  { id: "contextos", label: "Project / ContextOS", shape: "layers", side: "right", color: "#5bd1ff", colorLight: "#0a86bd" },
  { id: "cinesphere", label: "Project / CineSphere", shape: "atlas", side: "left", color: "#ff6b5b", colorLight: "#c4372a" },
  { id: "salon", label: "Project / MJ Salon", shape: "lattice", side: "right", color: "#b9ff5b", colorLight: "#4b870d" },
  { id: "homedecor", label: "Project / Home Decor", shape: "wave", side: "left", color: "#ff7ad9", colorLight: "#c0328f" },
  { id: "umamaheshwar", label: "Project / Uma Maheshwar", shape: "ledger", side: "right", color: "#4ff0a8", colorLight: "#12875a" },
  { id: "stack", label: "Stack", shape: "helix", side: "left", color: "#9a86ff", colorLight: "#5a43d1" },
  { id: "journey", label: "Journey", shape: "galaxy", side: "right", color: "#ffb21f", colorLight: "#c27c00" },
  { id: "contact", label: "Contact", shape: "portal", side: "center", color: "#9a86ff", colorLight: "#5a43d1" },
];

export type ProjectLink = { label: "Live" | "GitHub"; href: string };

export const projects: {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  links: ProjectLink[];
}[] = [
  {
    id: "infermesh",
    title: "InferMesh",
    category: "LLM Gateway & Observability",
    description:
      "One API that sits in front of OpenAI, Anthropic, Gemini and Azure. If a provider fails or slows down, requests retry or switch to another one automatically. Repeated questions are answered from a cache, usage is rate-limited, and a dashboard shows what every request cost and how long it took.",
    highlights: ["248+ automated tests", "4 LLM providers", "15-page dashboard"],
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "React"],
    links: [{ label: "GitHub", href: "https://github.com/smit-chavda6/InferMesh" }],
  },
  {
    id: "contextos",
    title: "ContextOS",
    category: "AI Browser Extension",
    description:
      "A browser extension that remembers your conversations across ChatGPT, Claude, Gemini and DeepSeek, so you can pick up in one tool where you left off in another. Your history and API keys are stored only in your own browser, with no outside database.",
    highlights: ["4 AI platforms bridged", "8+ LLM APIs", "No external database"],
    tech: ["React", "Vite", "Tailwind CSS", "Chrome Extension"],
    links: [
      { label: "Live", href: "https://context-os-extension.vercel.app/" },
      { label: "GitHub", href: "https://github.com/smit-chavda6/ContextOS-extension" },
    ],
  },
  {
    id: "cinesphere",
    title: "CineSphere",
    category: "Movie Discovery & Recommendations",
    description:
      "A movie discovery site laid out like an old sea map, where each feature is an island you fly between. It recommends films from your own taste using an engine I wrote myself, and covers everything from silent-era classics to upcoming releases.",
    highlights: ["13 recommendation tools", "~13k lines of TypeScript", "38 unit tests"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "TMDB API"],
    links: [
      { label: "Live", href: "https://cinesphere-sage-one.vercel.app/" },
      { label: "GitHub", href: "https://github.com/smit-chavda6/CineSphere" },
    ],
  },
  {
    id: "salon",
    title: "MJ Family Salon",
    category: "Salon Website + Booking CMS",
    description:
      "A live website for a local salon. Customers can book appointments online and the owner gets an email for each one. Behind it is an admin panel where the salon updates its services, photos, team, reviews and opening hours without touching code.",
    highlights: ["Live in production", "Online booking", "Full admin CMS"],
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    links: [{ label: "Live", href: "https://mjthefamilysalon.shop/" }],
  },
  {
    id: "homedecor",
    title: "Home Decor",
    category: "E-Commerce + AR & 3D",
    description:
      "An online furniture store where you can view products in 3D and place them in your own room with AR. An AI assistant helps you shop and can suggest pieces from a photo of your room. It has login, a cart, online payments and an admin dashboard.",
    highlights: ["AR view in your room", "Gemini room advisor", "Razorpay payments"],
    tech: ["Next.js", "TypeScript", "MongoDB", "Three.js", "Gemini API"],
    links: [
      { label: "Live", href: "https://homedecorfurnitureshop.vercel.app/" },
      { label: "GitHub", href: "https://github.com/smit-chavda6/HOME-DECOUR-FURNITURE" },
    ],
  },
  {
    id: "umamaheshwar",
    title: "Uma Maheshwar",
    category: "Android App · Digital Khata",
    description:
      "An Android app that replaces the paper khata for a stitching job-work shop. Bills are made in one tap and sent as PDFs straight to the customer's WhatsApp, balances update on their own, and the owner and staff share one khata across phones — even when offline. It works in Gujarati and English.",
    highlights: ["In production · v2.0.1", "Offline-first sync", "Gujarati & English"],
    tech: ["React Native", "Expo", "TypeScript", "SQLite", "Firebase"],
    links: [{ label: "Live", href: "https://uma-maheshwar.vercel.app/" }],
  },
];

// Grouped as on the résumé. Brand icons are devicon (MIT) in /public/icons;
// non-brand skills use simple generic glyphs. `brand` tints the icon on hover.
export const skillGroups = [
  {
    group: "Languages",
    items: [
      { name: "Python", icon: "python", brand: "#ffd845" },
      { name: "Java", icon: "java", brand: "#ea2d2e" },
      { name: "TypeScript", icon: "typescript", brand: "#3178c6" },
      { name: "C", icon: "c", brand: "#659ad2" },
      { name: "C++", icon: "cplusplus", brand: "#659ad2" },
    ],
  },
  {
    group: "Web",
    items: [
      { name: "HTML5", icon: "html5", brand: "#e44d26" },
      { name: "CSS3", icon: "css3", brand: "#2965f1" },
      { name: "JavaScript", icon: "javascript", brand: "#f0db4f" },
      { name: "React", icon: "react", brand: "#61dafb" },
      { name: "FastAPI", icon: "fastapi", brand: "#049688" },
      { name: "Node.js", icon: "nodejs", brand: "#5fa04e" },
      { name: "Express.js", icon: "express", brand: "var(--paper)" },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "MySQL", icon: "mysql", brand: "#00a3e0" },
      { name: "MongoDB", icon: "mongodb", brand: "#4faa41" },
      { name: "SQLite", icon: "sqlite", brand: "#3a9ad9" },
    ],
  },
  {
    group: "Data Science",
    items: [
      { name: "Data Analysis", icon: "data-analysis", brand: "#f59e0b" },
      { name: "Data Visualization", icon: "data-viz", brand: "#22d3ee" },
      { name: "Machine Learning", icon: "ml", brand: "#a78bfa" },
      { name: "LLM Fine-tuning", icon: "fine-tuning", brand: "#f472b6" },
    ],
  },
  {
    group: "Android",
    items: [{ name: "Android Studio", icon: "androidstudio", brand: "#3ddc84" }],
  },
  {
    group: "DevOps & Cloud",
    items: [
      { name: "Git", icon: "git", brand: "#f34f29" },
      { name: "GitHub", icon: "github", brand: "var(--paper)" },
      { name: "Docker", icon: "docker", brand: "#1d91e6" },
      { name: "Azure", icon: "azure", brand: "#0089d6" },
      { name: "n8n", icon: "workflow", brand: "#ea4b71" },
    ],
  },
];

export const journey = [
  {
    period: "Mar — Aug 2026 · 6 mos",
    title: "AI Engineer Intern",
    org: "Dehix · Remote",
    points: [
      "Supported development of AI and machine-learning solutions as a remote intern on the Dehix engineering team.",
      "Collected, cleaned and preprocessed datasets, then trained models for AI-driven product features.",
      "Built LLM-powered features and connected them to backend APIs and frontend interfaces alongside the web team.",
      "Evaluated and tuned model outputs to improve accuracy and performance.",
      "Researched emerging AI tools and techniques and applied the relevant ones to ongoing work.",
    ],
  },
  {
    period: "2022 — 2026",
    title: "B.Tech Computer Engineering",
    org: "Indus Institute of Technology",
    points: ["Graduated with a final CGPA of 9.06 / 10."],
  },
];
