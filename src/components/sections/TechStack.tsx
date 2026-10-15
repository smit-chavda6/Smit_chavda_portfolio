import React from "react";
import { Backlight } from "../originkit/Backlight";
import ChromaticWaves from "../originkit/ChromaticWaves";

const skills = [
  { name: "Python", icon: "python/python-original.svg" },
  { name: "TypeScript", icon: "typescript/typescript-original.svg" },
  { name: "Java", icon: "java/java-original.svg" },
  { name: "C++", icon: "cplusplus/cplusplus-original.svg" },
  { name: "React", icon: "react/react-original.svg" },
  { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
  { name: "FastAPI", icon: "fastapi/fastapi-original.svg" },
  { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "mysql/mysql-original.svg" },
  { name: "Docker", icon: "docker/docker-original.svg" },
  { name: "Azure", icon: "azure/azure-original.svg" },
  { name: "Git", icon: "git/git-original.svg" },
];

export default function TechStack() {
  // 2 repetitions are sufficient for seamless infinite marquee — was 4x (48 DOM nodes)
  const row1 = [...skills.slice(0, 6), ...skills.slice(0, 6)];
  const row2 = [...skills.slice(6, 12), ...skills.slice(6, 12)];

  return (
    <section id="skills" className="relative w-full min-h-screen flex flex-col justify-center py-20 md:py-32 bg-black overflow-hidden">
      {/* Dynamic Chromatic Waves Background */}
      <ChromaticWaves />
      
      {/* Background glow over waves */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-[#6366f1]/10 blur-[150px] rounded-[100%] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-16 md:mb-20">
        <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] bg-gradient-to-r from-[#6366f1] via-[#c084fc] to-[#6366f1] animate-text-sweep font-bold mb-4 md:mb-6">Capabilities</h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Tech Stack & <span className="bg-gradient-to-r from-[#6366f1] via-[#c084fc] to-[#6366f1] animate-text-sweep drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">Tools</span>
        </h3>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Row 1: Left */}
        <div className="flex w-max animate-marquee-left gap-8">
          {row1.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-6 bg-[#0a0a0a] border border-white/10 px-8 py-5 rounded-full hover:bg-white/[0.05] hover:border-[#6366f1]/50 transition-all duration-300">
              <Backlight blur={8}>
                <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}`} alt={skill.name} className="w-8 h-8 drop-shadow-md brightness-110" />
              </Backlight>
              <span className="text-xl font-bold text-white tracking-wide">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Right */}
        <div className="flex w-max animate-marquee-right gap-8 ml-[-20%]">
          {row2.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-6 bg-[#0a0a0a] border border-white/10 px-8 py-5 rounded-full hover:bg-white/[0.05] hover:border-[#c084fc]/50 transition-all duration-300">
              <Backlight blur={8}>
                <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}`} alt={skill.name} className="w-8 h-8 drop-shadow-md brightness-110" />
              </Backlight>
              <span className="text-xl font-bold text-white tracking-wide">{skill.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
