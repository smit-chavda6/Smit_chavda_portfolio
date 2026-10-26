"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildShapes } from "@/lib/shapes";
import { sceneColor, scenes } from "@/lib/data";
import type { Theme } from "./useTheme";

// Dark: glowing additive points.
// Light: risograph print — crisp ink-blue + fluoro accent dots that fade into the paper with depth.
const look = {
  dark: {
    base: "#e9e4dc", bg: "#050507", blending: THREE.AdditiveBlending,
    opacity: 0.85, mobileOpacity: 0.55, accentMix: 0.28, core: 0.0, paperFog: 0, sizeMul: 1,
  },
  light: {
    base: "#1f2160", bg: "#f1ede6", blending: THREE.NormalBlending,
    opacity: 0.92, mobileOpacity: 0.6, accentMix: 0.45, core: 0.22, paperFog: 1, sizeMul: 1.18,
  },
};

const vertexShader = /* glsl */ `
  attribute float aRand;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uWobble;
  uniform float uSizeMul;
  varying float vRand;
  varying float vDepth;

  void main() {
    vec3 p = position;
    p += uWobble * vec3(
      sin(uTime * 0.8 + aRand * 40.0),
      cos(uTime * 0.7 + aRand * 30.0),
      sin(uTime * 0.9 + aRand * 20.0)
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uSizeMul * uPixelRatio * (0.45 + aRand) / -mv.z;
    vRand = aRand;
    vDepth = -mv.z;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform vec3 uBg;
  uniform float uOpacity;
  uniform float uAccentMix;
  uniform float uCore;     // 0 = soft glow, higher = crisp printed dot
  uniform float uPaperFog; // 1 = far points fade into the paper colour instead of to transparent
  varying float vRand;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, uCore, d);
    vec3 color = mix(uBase, uAccent, step(1.0 - uAccentMix, vRand));
    float fog = smoothstep(11.0, 4.5, vDepth);
    color = mix(color, mix(uBg, color, 0.3 + 0.7 * fog), uPaperFog);
    float depthAlpha = mix(0.25 + 0.75 * fog, 1.0, uPaperFog);
    gl_FragColor = vec4(color, alpha * uOpacity * depthAlpha);
  }
`;

export default function NeuralScene({ active, theme, color }: { active: number; theme: Theme; color: string }) {
  const colorRef = useRef(color);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const themeRef = useRef(theme);
  const applyThemeRef = useRef<(t: Theme) => void>(() => {});

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    themeRef.current = theme;
    applyThemeRef.current(theme);
  }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = isMobile ? 4500 : 10000;
    // Weak phones start capped at 30 fps; others are downgraded if frames run slow
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowPower = isMobile && ((nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);
    // updateStyle=false: the canvas is stretched by CSS, so small viewport changes need no buffer reallocation
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7.5;

    const shapes = buildShapes(count);

    // Start scattered far out so the core assembles on load
    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 9 + Math.random() * 6;
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      positions.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3);
      rand[i] = Math.random();
    }
    if (reduce) positions.set(shapes[scenes[activeRef.current].shape]);

    const geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", posAttr);
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: isMobile ? 34 : 30 },
      uPixelRatio: { value: pixelRatio },
      uWobble: { value: reduce ? 0 : 0.035 },
      uBase: { value: new THREE.Color(look[themeRef.current].base) },
      uBg: { value: new THREE.Color(look[themeRef.current].bg) },
      uAccentMix: { value: 0.28 },
      uCore: { value: 0 },
      uPaperFog: { value: 0 },
      uSizeMul: { value: 1 },
      uAccent: { value: new THREE.Color(sceneColor(scenes[0], themeRef.current)) },
      uOpacity: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    applyThemeRef.current = (t: Theme) => {
      const l = look[t];
      uniforms.uBase.value.set(l.base);
      uniforms.uBg.value.set(l.bg);
      uniforms.uAccentMix.value = l.accentMix;
      uniforms.uCore.value = l.core;
      uniforms.uPaperFog.value = l.paperFog;
      uniforms.uSizeMul.value = l.sizeMul;
      uniforms.uOpacity.value = isMobile ? l.mobileOpacity : l.opacity;
      material.blending = l.blending;
      material.needsUpdate = true;
    };
    applyThemeRef.current(themeRef.current);

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    // Per-point morph speed so shapes dissolve and reform organically
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) speed[i] = 1.6 + rand[i] * 2.8;

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let lastScroll = window.scrollY;
    let spin = 0;

    // Mobile address-bar show/hide fires height-only resizes while scrolling; ignore those
    let lastW = window.innerWidth, lastH = window.innerHeight;
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      if (isMobile && w === lastW && Math.abs(h - lastH) < 160) return;
      lastW = w;
      lastH = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize);

    const accent = new THREE.Color();
    const clock = new THREE.Clock();
    let frame = 0;
    let frameBudget = lowPower ? 1 / 30 : 0; // seconds per rendered frame; 0 = uncapped
    let acc = 0;
    let slowFrames = 0, sampled = 0;
    let settledShape = "";

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const raw = clock.getDelta();
      acc += raw;
      if (frameBudget && acc < frameBudget) return;
      const dt = Math.min(acc, 0.05);
      acc = 0;

      // Adaptive quality: if a phone keeps missing 60 fps, drop to 30 fps at 1× resolution
      if (isMobile && !frameBudget) {
        sampled++;
        if (raw > 0.024) slowFrames++;
        if (sampled === 90) {
          if (slowFrames > 30) {
            frameBudget = 1 / 30;
            renderer.setPixelRatio(1);
            renderer.setSize(lastW, lastH, false);
            uniforms.uPixelRatio.value = 1;
          }
          sampled = slowFrames = 0;
        }
      }

      uniforms.uTime.value = clock.elapsedTime;

      const sceneCfg = scenes[activeRef.current];
      const target = shapes[sceneCfg.shape];

      // Morph toward the target; once every point has arrived, stop touching the buffer
      // (the gentle wobble runs on the GPU via uTime, so the shape still breathes)
      if (settledShape !== sceneCfg.shape) {
        if (reduce) {
          positions.set(target);
          settledShape = sceneCfg.shape;
        } else {
          let maxDelta = 0;
          for (let i = 0; i < count; i++) {
            const k = 1 - Math.exp(-dt * speed[i]);
            const j = i * 3;
            const dx = target[j] - positions[j], dy = target[j + 1] - positions[j + 1], dz = target[j + 2] - positions[j + 2];
            positions[j] += dx * k;
            positions[j + 1] += dy * k;
            positions[j + 2] += dz * k;
            const d = Math.abs(dx) + Math.abs(dy) + Math.abs(dz);
            if (d > maxDelta) maxDelta = d;
          }
          if (maxDelta < 0.003) settledShape = sceneCfg.shape;
        }
        posAttr.needsUpdate = true;
      }

      // Accent comes from Stage (current scene colour for the active theme)
      accent.set(colorRef.current);
      uniforms.uAccent.value.lerp(accent, 1 - Math.exp(-dt * 2));

      // Slide the cloud away from the text column on wide screens
      const halfW = Math.tan(THREE.MathUtils.degToRad(25)) * camera.position.z * camera.aspect;
      const wide = window.innerWidth >= 1024;
      const offset = !wide || sceneCfg.side === "center" ? 0 : (sceneCfg.side === "left" ? 1 : -1) * Math.min(2.6, halfW * 0.45);
      group.position.x += (offset - group.position.x) * (1 - Math.exp(-dt * 2.2));
      const scale = wide ? 1 : 0.78;
      group.scale.setScalar(group.scale.x + (scale - group.scale.x) * (1 - Math.exp(-dt * 3)));

      // Scroll velocity adds a burst of spin
      const sy = window.scrollY;
      spin += (sy - lastScroll) * 0.0009;
      lastScroll = sy;
      spin *= Math.exp(-dt * 3);

      if (!reduce) {
        points.rotation.y += dt * 0.07 + spin;
        group.rotation.x += (pointer.y * 0.25 - group.rotation.x) * (1 - Math.exp(-dt * 2));
        group.rotation.z += (-pointer.x * 0.12 - group.rotation.z) * (1 - Math.exp(-dt * 2));
      }

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}
