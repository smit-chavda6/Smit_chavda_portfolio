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
  { id: "salon", label: "Project / MJ Salon", shape: "lattice", side: "left", color: "#b9ff5b", colorLight: "#4b870d" },
  { id: "homedecor", label: "Project / Home Decor", shape: "wave", side: "right", color: "#ff7ad9", colorLight: "#c0328f" },
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
      "Production-shaped gateway unifying OpenAI, Anthropic, Gemini and Azure AI Foundry behind one OpenAI-compatible API — with retry/backoff, cross-provider fallback and circuit breaking, two-tier exact + pgvector semantic caching, Redis rate limiting and a 15-page React 19 observability dashboard.",
    highlights: ["248+ automated tests", "4 LLM providers", "15-page dashboard"],
    tech: ["Python 3.13", "FastAPI", "PostgreSQL", "pgvector", "Redis", "React 19", "TypeScript", "Docker", "GitHub Actions"],
    links: [{ label: "GitHub", href: "https://github.com/smit-chavda6/InferMesh" }],
  },
  {
    id: "contextos",
    title: "ContextOS",
    category: "AI Browser Extension",
    description:
      "Context-persistence extension that carries session state across ChatGPT, Claude, Gemini and DeepSeek — with client-side vector search using in-browser cosine similarity and a credentials engine for multiple LLM APIs, stored strictly on the client for privacy.",
    highlights: ["4 AI platforms bridged", "8+ LLM APIs", "No external database"],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Chrome MV3", "Vector Search"],
    links: [
      { label: "Live", href: "https://context-os-extension.vercel.app/" },
      { label: "GitHub", href: "https://github.com/smit-chavda6/ContextOS-extension" },
    ],
  },
  {
    id: "salon",
    title: "MJ Family Salon",
    category: "Salon Website + Booking CMS",
    description:
      "Live salon website with online appointment booking and email notifications, plus an admin CMS for bookings, services, gallery, team, reviews and hours — drag-to-reorder content, auto-resized image uploads, secure login and SEO settings, deployed on a custom domain over HTTPS.",
    highlights: ["Live in production", "Online booking", "Full admin CMS"],
    tech: ["PHP 8.1", "MySQL", "JavaScript", "Bootstrap 5", "GSAP", "cPanel"],
    links: [{ label: "Live", href: "https://mjthefamilysalon.shop/" }],
  },
  {
    id: "homedecor",
    title: "Home Decor",
    category: "E-Commerce + AI",
    description:
      "Full-stack furniture store with authentication, an admin dashboard and REST APIs, a Gemini-powered chatbot with intelligent product search and caching, and invoices and order workflows automated through n8n webhooks.",
    highlights: ["25+ REST APIs", "85% fewer AI API calls", "n8n automation"],
    tech: ["Node.js", "Express", "MongoDB", "Gemini API", "n8n"],
    links: [{ label: "GitHub", href: "https://github.com/smit-chavda6/HOME-DECOUR-FURNITURE" }],
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
