"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for the trailing glass ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      // Merge hover detection into mousemove — avoids separate mouseover event
      // with getComputedStyle() which forces a style recalc per DOM node traversal
      const target = e.target as HTMLElement;
      const isHoveringClickable = !!(target.closest("a") || target.closest("button") || target.tagName === "A" || target.tagName === "BUTTON");
      setIsHovering(isHoveringClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Hide on server or mobile devices to prevent hydration errors
  if (!mounted || isMobile) return null;

  return (
    <>
      {/* Outer Trailing Glass Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#6366f1]/80 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? "rgba(99,102,241,0)" : "rgba(99,102,241,0.1)",
          backdropFilter: isHovering ? "blur(0px)" : "blur(2px)",
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
      
      {/* Inner Immediate Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#c084fc] rounded-full pointer-events-none z-[10000] shadow-[0_0_10px_#c084fc]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          scale: isHovering ? 0 : isClicking ? 0.5 : 1,
        }}
        transition={{ scale: { duration: 0.15 } }}
      />
    </>
  );
}
