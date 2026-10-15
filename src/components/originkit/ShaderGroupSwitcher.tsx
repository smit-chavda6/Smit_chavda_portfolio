"use client"

import { useEffect, useRef, useState } from "react"
import MobileSquareGridCanvas from "./mobile/MobileSquareGridCanvas"

const MAX_DPR = 2

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uT;

uniform vec3 uBg;
uniform vec3 uTint;

uniform float uSpeed;
uniform float uBright;
uniform float uThick;
uniform float uChroma;
uniform float uZoom;

uniform float uHover;
uniform vec2 uPtr;

varying vec2 vUv;

mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = fract(sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453);
    float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453);
    float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
    float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for(int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = rot(1.7) * p * 2.0;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
    float t = uT * uSpeed;

    float zoom = uZoom;
    vec2 p = uv * zoom;

    vec2 ptrDist = (vUv - uPtr) * uRes / min(uRes.x, uRes.y);
    float hoverDist = length(ptrDist);
    float hoverPower = smoothstep(uHover, 0.0, hoverDist);

    p += ptrDist * hoverPower * 0.5;
    
    vec2 offset = vec2(fbm(p - t * 0.2), fbm(p + vec2(4.2, 1.3) + t * 0.2));
    float d = fbm(p + offset * 3.0 - t * 0.3);

    float basePattern = sin(d * 10.0 + t) * 0.5 + 0.5;
    float lines = smoothstep(1.0 - uThick, 1.0, basePattern);

    vec3 c = mix(uBg, uTint, lines * uBright);

    float chromaDist = uChroma * 0.01;
    vec2 pR = p + offset * 3.0 - t * 0.3 + chromaDist;
    vec2 pB = p + offset * 3.0 - t * 0.3 - chromaDist;
    
    float dR = fbm(pR);
    float dB = fbm(pB);
    
    float linesR = smoothstep(1.0 - uThick, 1.0, sin(dR * 10.0 + t) * 0.5 + 0.5);
    float linesB = smoothstep(1.0 - uThick, 1.0, sin(dB * 10.0 + t) * 0.5 + 0.5);
    
    c.r = mix(uBg.r, uTint.r, max(lines, linesR) * uBright);
    c.b = mix(uBg.b, uTint.b, max(lines, linesB) * uBright);

    gl_FragColor = vec4(c, 1.0);
}`

function parseColor(input: string | undefined, fallback: [number, number, number]): [number, number, number] {
    if (!input) return fallback
    const s = input.trim()
    if (s[0] === "#") {
        let h = s.slice(1)
        if (h.length === 3 || h.length === 4)
            h = h.split("").map((c) => c + c).join("")
        if (h.length >= 6) {
            const r = parseInt(h.slice(0, 2), 16) / 255
            const g = parseInt(h.slice(2, 4), 16) / 255
            const b = parseInt(h.slice(4, 6), 16) / 255
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r, g, b]
        }
        return fallback
    }
    const m = s.match(/rgba?\(([^)]+)\)/i)
    if (m) {
        const p = m[1].split(",").map((v) => parseFloat(v))
        if (p.length >= 3) return [p[0] / 255, p[1] / 255, p[2] / 255]
    }
    return fallback
}

export interface ShaderGroupSwitcherProps {
    background?: string
    tint?: string
    speed?: number
    brightness?: number
    thickness?: number
    chromatic?: number
    zoom?: number
    hover?: number
    style?: React.CSSProperties
    className?: string
}

export default function ShaderGroupSwitcher({
    background = "#050505",
    tint = "#3b82f6",
    speed = 40,
    brightness = 80,
    thickness = 15,
    chromatic = 8,
    zoom = 250,
    hover = 120,
    style,
    className
}: ShaderGroupSwitcherProps) {
    const hostRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check, { passive: true });
        return () => window.removeEventListener("resize", check);
    }, []);

    const live = useRef({
        bg: parseColor(background, [0.02, 0.02, 0.02]),
        tint: parseColor(tint, [0.23, 0.51, 0.96]),
        speed: speed / 100,
        brightness: brightness / 100,
        thickness: thickness / 100,
        chromatic: chromatic,
        zoom: (400 - Math.min(zoom, 399)) / 100,
        hover: hover / 1000
    })

    live.current = {
        bg: parseColor(background, [0.02, 0.02, 0.02]),
        tint: parseColor(tint, [0.23, 0.51, 0.96]),
        speed: speed / 100,
        brightness: brightness / 100,
        thickness: thickness / 100,
        chromatic: chromatic,
        zoom: (400 - Math.min(zoom, 399)) / 100,
        hover: hover / 1000
    }

    useEffect(() => {
        if (isMobile) return;
        const host = hostRef.current
        const canvas = canvasRef.current
        if (!host || !canvas) return

        const gl = canvas.getContext("webgl", {
            alpha: true,
            antialias: false,
            powerPreference: "high-performance"
        })
        if (!gl) return

        const make = (type: number, src: string) => {
            const sh = gl.createShader(type)!
            gl.shaderSource(sh, src)
            gl.compileShader(sh)
            return sh
        }

        const prog = gl.createProgram()!
        gl.attachShader(prog, make(gl.VERTEX_SHADER, VERT))
        gl.attachShader(prog, make(gl.FRAGMENT_SHADER, FRAG))
        gl.linkProgram(prog)

        const aPos = gl.getAttribLocation(prog, "aPos")
        const u = {
            res: gl.getUniformLocation(prog, "uRes"),
            t: gl.getUniformLocation(prog, "uT"),
            bg: gl.getUniformLocation(prog, "uBg"),
            tint: gl.getUniformLocation(prog, "uTint"),
            speed: gl.getUniformLocation(prog, "uSpeed"),
            bright: gl.getUniformLocation(prog, "uBright"),
            thick: gl.getUniformLocation(prog, "uThick"),
            chroma: gl.getUniformLocation(prog, "uChroma"),
            zoom: gl.getUniformLocation(prog, "uZoom"),
            hover: gl.getUniformLocation(prog, "uHover"),
            ptr: gl.getUniformLocation(prog, "uPtr")
        }

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        let w = 1
        let h = 1
        let ptrX = 0.5
        let ptrY = 0.5
        let targetPtrX = 0.5
        let targetPtrY = 0.5

        const resize = () => {
            // Use lower DPR on smaller screens to reduce pixel fill rate
            const rawDpr = window.devicePixelRatio || 1;
            const dpr = Math.min(rawDpr, window.innerWidth >= 1440 ? 2 : 1.0);
            w = Math.max(1, Math.round(host.offsetWidth * dpr));
            h = Math.max(1, Math.round(host.offsetHeight * dpr));
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
        }
        
        const ro = new ResizeObserver(resize)
        ro.observe(host)
        resize()

        const onMove = (e: PointerEvent) => {
            const r = host.getBoundingClientRect()
            if (r.width <= 0 || r.height <= 0) return
            targetPtrX = (e.clientX - r.left) / r.width
            targetPtrY = 1.0 - (e.clientY - r.top) / r.height
        }
        
        const onLeave = () => {
            targetPtrX = 0.5
            targetPtrY = 0.5
        }
        
        host.addEventListener("pointermove", onMove)
        host.addEventListener("pointerleave", onLeave)

        let raf = 0
        const start = performance.now()
        // Cap to 30fps — imperceptible for background shader, ~2x less GPU work
        const FRAME_MS = 1000 / 30;
        let lastDraw = 0;

        const draw = (now: number) => {
            raf = requestAnimationFrame(draw)
            if (now - lastDraw < FRAME_MS) return;
            lastDraw = now;

            const L = live.current
            
            ptrX += (targetPtrX - ptrX) * 0.1
            ptrY += (targetPtrY - ptrY) * 0.1

            gl.useProgram(prog)
            gl.uniform2f(u.res, w, h)
            gl.uniform1f(u.t, (now - start) / 1000)
            
            gl.uniform3f(u.bg, L.bg[0], L.bg[1], L.bg[2])
            gl.uniform3f(u.tint, L.tint[0], L.tint[1], L.tint[2])
            
            gl.uniform1f(u.speed, L.speed)
            gl.uniform1f(u.bright, L.brightness)
            gl.uniform1f(u.thick, L.thickness)
            gl.uniform1f(u.chroma, L.chromatic)
            gl.uniform1f(u.zoom, L.zoom)
            
            gl.uniform1f(u.hover, L.hover)
            gl.uniform2f(u.ptr, ptrX, ptrY)

            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }

        raf = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            host.removeEventListener("pointermove", onMove)
            host.removeEventListener("pointerleave", onLeave)
        }
    }, [])

    if (isMobile) {
        return <MobileSquareGridCanvas accent="#6366f1" secondary="#c084fc" gridSize={36} />;
    }

    return (
        <div 
            ref={hostRef} 
            className={className}
            style={{ 
                position: "relative", 
                width: "100%", 
                height: "100%", 
                overflow: "hidden", 
                background,
                ...style 
            }}
        >
            <canvas 
                ref={canvasRef} 
                style={{ 
                    position: "absolute", 
                    inset: 0, 
                    width: "100%", 
                    height: "100%", 
                    display: "block",
                    pointerEvents: "none"
                }} 
            />
        </div>
    )
}
