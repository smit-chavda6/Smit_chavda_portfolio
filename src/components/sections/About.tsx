import React from "react";
import PredictiveArc from "../originkit/PredictiveArc";

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-center py-20">
      
      {/* Interactive Predictive Arc Background */}
      <div className="absolute inset-0 z-0">
        <PredictiveArc 
          background="#050505"
          baseColor="#31105e"
          accentColor="#6366f1"
          highlight="#ffffff"
          density={80}
          speed={60}
          arch={{
            peak: 80,
            falloff: 500,
            thickness: 200,
            archHeight: 20
          }}
          pointer={{
            radius: 300,
            strength: 50
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pointer-events-none">
        
        {/* Glassmorphism Card Wrapper */}
        <div className="bg-[#050505]/60 backdrop-blur-sm md:backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-[0_0_80px_rgba(99,102,241,0.15)] flex flex-col lg:flex-row gap-12 lg:gap-20 pointer-events-auto">
          
          {/* Left Text Content */}
          <div className="flex-1">
            <h2 className="text-sm uppercase tracking-[0.2em] bg-gradient-to-r from-[#6366f1] via-[#c084fc] to-[#6366f1] animate-text-sweep font-bold mb-6">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-[1.15] tracking-tight">
              Turning raw model capability <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#6366f1] via-[#c084fc] to-[#6366f1] animate-text-sweep drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">into shipped product.</span>
            </h3>
            
            <div className="space-y-6 text-neutral-300 text-lg font-light leading-relaxed">
              <p>
                Hi! I'm Smit — a results-driven AI Engineer. I design and deploy generative-AI features for modern web apps, and I integrate LLMs to automate complex business workflows end to end.
              </p>
              <p>
                My work spans managing cloud-based AI platforms for model deployment and orchestration, backed by a solid full-stack foundation — FastAPI / Node back ends, React front ends, Docker and CI/CD.
              </p>
            </div>
          </div>

          {/* Right Stats Content */}
          <div className="flex flex-col gap-8 justify-center lg:w-[35%]">
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-70 transition duration-500" />
              <div className="relative p-8 bg-black rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                <h4 className="relative z-10 text-3xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:via-[#c084fc] group-hover:to-[#6366f1] group-hover:animate-text-sweep group-hover:text-transparent group-hover:bg-clip-text">Dehix</h4>
                <p className="relative z-10 text-[#6366f1] text-xs font-semibold uppercase tracking-wider">AI Engineer Intern</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-70 transition duration-500" />
              <div className="relative p-8 bg-black rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                <h4 className="relative z-10 text-3xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:via-[#c084fc] group-hover:to-[#6366f1] group-hover:animate-text-sweep group-hover:text-transparent group-hover:bg-clip-text">9.06</h4>
                <p className="relative z-10 text-[#6366f1] text-xs font-semibold uppercase tracking-wider">CGPA (B.Tech CE)</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
