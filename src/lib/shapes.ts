// Point-cloud targets the particle field morphs between, one per scene.
// Every generator fills exactly `n` xyz triples centred near the origin.

export type ShapeName =
  | "core"
  | "knot"
  | "mesh"
  | "layers"
  | "lattice"
  | "wave"
  | "helix"
  | "galaxy"
  | "portal";

const TAU = Math.PI * 2;
const rnd = (a = -1, b = 1) => a + Math.random() * (b - a);

// Random point inside a unit ball, biased toward the surface
function inBall(r: number): [number, number, number] {
  const u = Math.random(),
    v = Math.random();
  const th = TAU * u,
    ph = Math.acos(2 * v - 1);
  const rr = r * Math.cbrt(Math.random());
  return [rr * Math.sin(ph) * Math.cos(th), rr * Math.sin(ph) * Math.sin(th), rr * Math.cos(ph)];
}

function rotate(out: Float32Array, rx: number, ry: number) {
  const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
  for (let i = 0; i < out.length; i += 3) {
    const x = out[i], y = out[i + 1], z = out[i + 2];
    const y1 = y * cx - z * sx, z1 = y * sx + z * cx;
    out[i] = x * cy + z1 * sy;
    out[i + 1] = y1;
    out[i + 2] = -x * sy + z1 * cy;
  }
  return out;
}

const generators: Record<ShapeName, (n: number) => Float32Array> = {
  // Fibonacci shell with a dense inner nucleus — the "neural core"
  core(n) {
    const out = new Float32Array(n * 3);
    const shell = Math.floor(n * 0.75);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      let p: [number, number, number];
      if (i < shell) {
        const y = 1 - (i / (shell - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = golden * i;
        const R = 1.9 + rnd(-0.04, 0.04);
        p = [Math.cos(t) * r * R, y * R, Math.sin(t) * r * R];
      } else {
        p = inBall(0.9);
      }
      out.set(p, i * 3);
    }
    return out;
  },

  // (2,3) torus knot with a fuzzy tube
  knot(n) {
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const t = (i / n) * TAU;
      const r = 1.25 + 0.5 * Math.cos(3 * t);
      const [jx, jy, jz] = inBall(0.22);
      out.set([r * Math.cos(2 * t) + jx, 0.5 * Math.sin(3 * t) * 1.6 + jy, r * Math.sin(2 * t) + jz], i * 3);
    }
    return rotate(out, 0.9, 0.2);
  },

  // Gateway: a hub, three provider nodes and streams between them
  mesh(n) {
    const out = new Float32Array(n * 3);
    const nodes = [0, 1, 2].map((k) => {
      const a = Math.PI / 2 + (k * TAU) / 3;
      return [Math.cos(a) * 2.1, Math.sin(a) * 2.1, 0];
    });
    for (let i = 0; i < n; i++) {
      const f = i / n;
      let p: [number, number, number];
      if (f < 0.3) {
        p = inBall(0.75);
      } else if (f < 0.72) {
        const c = nodes[i % 3];
        const b = inBall(0.45);
        p = [c[0] + b[0], c[1] + b[1], c[2] + b[2]];
      } else {
        const c = nodes[i % 3];
        const t = Math.random();
        const w = 0.06 + 0.1 * Math.sin(t * Math.PI);
        p = [c[0] * t + rnd(-w, w), c[1] * t + rnd(-w, w), Math.sin(t * Math.PI) * 0.4 + rnd(-w, w)];
      }
      out.set(p, i * 3);
    }
    return rotate(out, 0.35, -0.3);
  },

  // Stacked session planes — context carried between them
  layers(n) {
    const out = new Float32Array(n * 3);
    const planes = 4;
    for (let i = 0; i < n; i++) {
      const k = i % planes;
      const z = -1.5 + k * 1.0;
      let x: number, y: number;
      if (Math.random() < 0.45) {
        // rectangle outline
        const t = Math.random() * 4;
        const e = Math.floor(t), u = t - e;
        x = e === 0 ? rnd(-1.5, 1.5) : e === 1 ? 1.5 : e === 2 ? rnd(-1.5, 1.5) : -1.5;
        y = e === 0 ? 1 : e === 2 ? -1 : u * 2 - 1;
      } else {
        x = rnd(-1.5, 1.5);
        y = rnd(-1, 1);
      }
      out.set([x + rnd(-0.02, 0.02), y + rnd(-0.02, 0.02), z], i * 3);
    }
    return rotate(out, -0.45, 0.75);
  },

  // Structured cube lattice — full-stack system
  lattice(n) {
    const out = new Float32Array(n * 3);
    const g = 9, s = 2.6;
    for (let i = 0; i < n; i++) {
      const node = i % (g * g * g);
      const gx = node % g, gy = Math.floor(node / g) % g, gz = Math.floor(node / (g * g));
      // points on edges between nodes along a random axis
      const axis = Math.floor(Math.random() * 3), t = Math.random() < 0.4 ? 0 : Math.random() / (g - 1);
      const p = [gx / (g - 1), gy / (g - 1), gz / (g - 1)];
      p[axis] = Math.min(1, p[axis] + t);
      out.set([(p[0] - 0.5) * s, (p[1] - 0.5) * s, (p[2] - 0.5) * s], i * 3);
    }
    return rotate(out, 0.6, 0.7);
  },

  // Flowing surface — commerce & automation pipelines
  wave(n) {
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const x = rnd(-3.2, 3.2), z = rnd(-2.2, 2.2);
      const y = 0.38 * Math.sin(1.5 * x) + 0.28 * Math.cos(2.0 * z + x * 0.6);
      out.set([x, y, z], i * 3);
    }
    return rotate(out, 0.55, 0.3);
  },

  // Double helix with rungs — the stack, layer by layer
  helix(n) {
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const t = Math.random();
      const y = (t - 0.5) * 5;
      const a = t * TAU * 2.2;
      if (Math.random() < 0.2) {
        const u = rnd(-1, 1);
        out.set([Math.cos(a) * 1.1 * u, y, Math.sin(a) * 1.1 * u], i * 3);
      } else {
        const s = i % 2 ? Math.PI : 0;
        const [jx, jy, jz] = inBall(0.12);
        out.set([Math.cos(a + s) * 1.1 + jx, y + jy, Math.sin(a + s) * 1.1 + jz], i * 3);
      }
    }
    return rotate(out, 0.15, 0.0);
  },

  // Spiral galaxy — the journey outward
  galaxy(n) {
    const out = new Float32Array(n * 3);
    const arms = 3;
    for (let i = 0; i < n; i++) {
      const r = Math.pow(Math.random(), 0.7) * 3;
      const a = ((i % arms) * TAU) / arms + r * 1.7;
      const spread = 0.35 * Math.pow(Math.random(), 2) * (1 + r * 0.3);
      out.set(
        [Math.cos(a) * r + rnd(-spread, spread), rnd(-0.12, 0.12) * (3 - r) * 0.5, Math.sin(a) * r + rnd(-spread, spread)],
        i * 3
      );
    }
    return rotate(out, 0.95, 0);
  },

  // Open ring — the way in
  portal(n) {
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU;
      const inner = Math.random() < 0.18;
      const R = inner ? Math.sqrt(Math.random()) * 1.6 : 2.2 + rnd(-0.12, 0.12) * Math.random();
      out.set([Math.cos(a) * R, Math.sin(a) * R, inner ? rnd(-0.6, 0.6) : rnd(-0.08, 0.08)], i * 3);
    }
    return rotate(out, 0.25, -0.35);
  },
};

export function buildShapes(n: number) {
  const out = {} as Record<ShapeName, Float32Array>;
  (Object.keys(generators) as ShapeName[]).forEach((k) => (out[k] = generators[k](n)));
  return out;
}
