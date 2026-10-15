"use client";

import React, { useState, useEffect } from "react";
import DottedBackground from "../originkit/DottedBackground";
import MobileSquareGridCanvas from "../originkit/mobile/MobileSquareGridCanvas";

export default function Experience() {
  // Check if mobile — DottedBackground has its own check at 768px
  // but we want a richer mobile bg than its default simple check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="experience" className="relative w-full py-20 md:py-32 bg-[#020202] overflow-hidden">
      
      {/* Mobile: Dynamic Square Grid Canvas */}
      {isMobile ? (
        <MobileSquareGridCanvas accent="#8b5cf6" secondary="#06b6d4" gridSize={36} />
      ) : (
        <>
          {/* Desktop: Dynamic WebGL Dotted Background */}
          <div className="absolute inset-0 z-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]">
            <DottedBackground 
              frequency={1.5}
              speed={2}
              colors={["#4f46e5", "#9333ea", "#000000"]}
              cellSize={24}
              paletteBias={0.5}
              gamma={2}
              bgColor="#020202"
            />
          </div>
          {/* Background glow behind dots */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#c084fc]/10 rounded-full blur-[120px] pointer-events-none z-0" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
           <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] bg-gradient-to-r from-[#6366f1] via-[#c084fc] to-[#6366f1] animate-text-sweep font-bold mb-4 md:mb-6">Journey</h2>
           <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Experience & <span className="bg-gradient-to-r from-[#6366f1] via-[#c084fc] to-[#6366f1] animate-text-sweep drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">Education</span>
           </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Experience Card */}
          <div className="flex-1 group relative bg-[#0a0a0a]/60 backdrop-blur-sm md:backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[2rem] p-8 md:p-14 hover:border-[#6366f1]/40 transition-colors duration-500 overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex-grow">
              <div className="flex items-center gap-4 mb-10">
                <div className="px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#6366f1] text-xs font-bold uppercase tracking-widest">
                  Career
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#c084fc] group-hover:animate-text-sweep group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500">AI Engineer Intern</h4>
                    <p className="text-xl text-[#a1a1aa] font-medium">Dehix</p>
                  </div>
                  <div className="text-sm font-mono text-neutral-400 whitespace-nowrap">Mar 2026 – July 2026</div>
                </div>
              </div>

              <div className="space-y-4 text-neutral-300 font-light leading-relaxed text-lg">
                <p>Designed and deployed generative AI models, driving end-to-end integration across robust full-stack infrastructures.</p>
                <p>Engineered comprehensive data pipelines for collection, preprocessing, and rigorous model training optimizations.</p>
                <p>Collaborated aggressively with backend/frontend pods to ensure seamless execution and scalable AI performance.</p>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="flex-1 group relative bg-[#0a0a0a]/60 backdrop-blur-sm md:backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[2rem] p-8 md:p-14 hover:border-[#c084fc]/40 transition-colors duration-500 overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#c084fc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="flex items-center gap-4 mb-10">
                <div className="px-4 py-2 rounded-full bg-[#c084fc]/10 border border-[#c084fc]/30 text-[#c084fc] text-xs font-bold uppercase tracking-widest">
                  Academic
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-[#c084fc] group-hover:to-[#6366f1] group-hover:animate-text-sweep group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500">Computer Engineering</h4>
                    <p className="text-xl text-[#a1a1aa] font-medium">Indus Institute of Technology</p>
                  </div>
                  <div className="text-sm font-mono text-neutral-400 whitespace-nowrap">2022 – 2026</div>
                </div>
              </div>

              <div className="mt-auto pt-10 border-t border-white/10 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-neutral-400 font-medium">Final CGPA</span>
                  <span className="text-4xl md:text-5xl font-black text-white group-hover:text-[#c084fc] transition-colors duration-300">
                    9.06<span className="text-xl md:text-2xl text-neutral-600 font-normal">/10</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
