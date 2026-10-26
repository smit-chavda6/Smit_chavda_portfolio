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
  { id: "manprotech", label: "Project / ManProTech", shape: "lattice", side: "left", color: "#b9ff5b", colorLight: "#4b870d" },
  { id: "homedecor", label: "Project / Home Decor", shape: "wave", side: "right", color: "#ff7ad9", colorLight: "#c0328f" },
  { id: "stack", label: "Stack", shape: "helix", side: "left", color: "#9a86ff", colorLight: "#5a43d1" },
  { id: "journey", label: "Journey", shape: "galaxy", side: "right", color: "#ffb21f", colorLight: "#c27c00" },
  { id: "contact", label: "Contact", shape: "portal", side: "center", color: "#9a86ff", colorLight: "#5a43d1" },
];

export const projects = [
  {
    id: "infermesh",
    title: "InferMesh",
    category: "LLM Gateway",
    year: "2026",
    description:
      "Multi-provider LLM gateway unifying OpenAI, Anthropic and Gemini behind one API, with pgvector semantic caching and a React 19 observability dashboard.",
    tech: ["FastAPI", "React 19", "PostgreSQL", "pgvector", "Redis", "Docker"],
    link: "https://github.com/smit-chavda6",
  },
  {
    id: "contextos",
    title: "ContextOS",
    category: "Browser Extension",
    year: "2026",
    description:
      "AI context-persistence extension bridging session state across ChatGPT, Claude and DeepSeek with client-side, in-browser vector search.",
    tech: ["React", "Vite", "Chrome MV3", "Vector Search"],
    link: "https://github.com/smit-chavda6",
  },
  {
    id: "manprotech",
    title: "ManProTech",
    category: "Full-Stack CMS",
    year: "2025",
    description:
      "Production React SPA on a custom PHP/MySQL backend with a full admin CMS, custom auth and server-side injected SEO tags.",
    tech: ["React 18", "PHP 8", "MySQL", "Tailwind"],
    link: "https://github.com/smit-chavda6",
  },
  {
    id: "homedecor",
    title: "Home Decor",
    category: "E-Commerce + AI",
    year: "2025",
    description:
      "Full-stack furniture store with a Gemini-powered shopping assistant, response caching and automated n8n order workflows.",
    tech: ["Node.js", "MongoDB", "Gemini API", "n8n"],
    link: "https://github.com/smit-chavda6",
  },
];

// Icons live in /public/icons (devicon, MIT); `brand` tints the icon on hover
export const skills = [
  { name: "Python", icon: "python", brand: "#ffd845" },
  { name: "TypeScript", icon: "typescript", brand: "#3178c6" },
  { name: "Java", icon: "java", brand: "#ea2d2e" },
  { name: "C++", icon: "cplusplus", brand: "#659ad2" },
  { name: "React", icon: "react", brand: "#61dafb" },
  { name: "Node.js", icon: "nodejs", brand: "#5fa04e" },
  { name: "FastAPI", icon: "fastapi", brand: "#049688" },
  { name: "MongoDB", icon: "mongodb", brand: "#4faa41" },
  { name: "MySQL", icon: "mysql", brand: "#00a3e0" },
  { name: "Docker", icon: "docker", brand: "#1d91e6" },
  { name: "Azure", icon: "azure", brand: "#0089d6" },
  { name: "Git", icon: "git", brand: "#f34f29" },
];

export const journey = [
  {
    period: "Mar — Jul 2026",
    title: "AI Engineer Intern",
    org: "Dehix",
    points: [
      "Designed and deployed generative-AI features, integrated end to end across the full-stack product.",
      "Built data pipelines for collection, preprocessing and model-training optimisation.",
      "Worked closely with backend and frontend teams to ship scalable AI functionality.",
    ],
  },
  {
    period: "2022 — 2026",
    title: "B.Tech Computer Engineering",
    org: "Indus Institute of Technology",
    points: ["Graduated with a final CGPA of 9.06 / 10."],
  },
];
