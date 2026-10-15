"use client"

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });
  // Merge both scroll handlers into one — was two separate listeners causing double React re-renders
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Single handler for both visibility and percent via scrollYProgress motion value
    return scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.012); // ~equivalent to window.scrollY > 100
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20, pointerEvents: isVisible ? "auto" : "none" }}
      onClick={scrollToTop}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-[90] w-16 h-16 rounded-full bg-[#050505]/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center justify-center group"
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 100 100">
        {/* Background Track */}
        <circle 
          cx="50" cy="50" r="46" 
          fill="none" 
          stroke="rgba(255,255,255,0.05)" 
          strokeWidth="4" 
        />
        {/* Animated Progress Stroke */}
        <motion.circle 
          cx="50" cy="50" r="46" 
          fill="none" 
          stroke="#6366f1" 
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength }}
          className="drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </svg>
      
      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white group-hover:text-indigo-300 transition-colors">
        <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path>
        </svg>
      </div>
    </motion.button>
  );
}
