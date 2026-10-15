"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Background", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrollingRef = React.useRef(false);
  // Cache section refs once on mount — was re-querying DOM on every scroll event
  const sectionRefsCache = React.useRef<Element[]>([]);

  // Populate section refs once after mount
  React.useEffect(() => {
    sectionRefsCache.current = links
      .map(l => document.querySelector(l.href))
      .filter(Boolean) as Element[];
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isScrollingRef.current) return;
      let current = "";
      // Use cached refs instead of querying DOM on every scroll
      sectionRefsCache.current.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 250) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveTab(current ? `#${current}` : "");
    };
    // passive:true lets browser optimize scroll on compositor thread
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setActiveTab(href);
    isScrollingRef.current = true;
    setIsMobileMenuOpen(false); // Close mobile menu when clicked
    
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
      
      // Re-enable scrollspy after smooth scroll finishes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-[#050505]/80 backdrop-blur-xl shadow-lg border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        <div 
          className="text-xl font-black tracking-tighter text-white cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          SMIT CHAVDA.
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={`relative px-7 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full whitespace-nowrap ${
                activeTab === link.href 
                  ? "text-white" 
                  : "text-[#a1a1aa] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {activeTab === link.href && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 rounded-full z-0 shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-white/10 backdrop-blur-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none p-2 rounded-full bg-white/5 border border-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col py-4 px-6 shadow-2xl"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`block py-3 text-lg font-medium transition-colors border-b border-white/5 last:border-b-0 ${
                  activeTab === link.href 
                    ? "text-[#c084fc]" 
                    : "text-[#a1a1aa] hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
