import { circuits, type Problem } from "../content";

export const WALL_W = 800;
export const WALL_H = 420;
const BOTTOM = 348;

/** Small deterministic PRNG so every problem draws the same holds on every visit. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Unit hold silhouettes (radius ≈ 10): jug, crimp rail, sloper, pinch, pocket. */
export const holdShapes = [
  "M-10 2C-10-7-2-10 4-9S11-3 10 3 3 10-3 9-10 8-10 2Z",
  "M-12-3C-6-6 6-6 12-3 11 2 6 4 0 4S-11 2-12-3Z",
  "M-9 6C-11-2-5-10 2-10S11-4 10 4C8 9-6 10-9 6Z",
  "M-5-11C1-12 6-7 5 0S1 11-4 11-8 4-8-2-8-10-5-11Z",
  "M-10 0A10 10 0 1 1 10 0 10 10 0 1 1-10 0ZM-4 1A4 3 0 1 0 4 1 4 3 0 1 0-4 1Z",
];

export type Hold = {
  x: number;
  y: number;
  scale: number;
  rot: number;
  shape: number;
};

export function holdsFor(p: Problem, top: number): Hold[] {
  const rand = rng(p.seed);
  const size = circuits.find((c) => c.id === p.circuit)!.size;
  const n = p.moves + 1;
  const x0 = (p.start / 100) * WALL_W;
  const x1 = (p.finish / 100) * WALL_W;
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const sway = i > 0 && i < n - 1 ? (rand() - 0.5) * 110 : 0;
    return {
      x: Math.min(WALL_W - 30, Math.max(30, x0 + (x1 - x0) * t + sway)),
      y: BOTTOM - t * (BOTTOM - top - 26) + (rand() - 0.5) * 12,
      scale: (size * (0.8 + rand() * 0.5)) / 10,
      rot: Math.round(rand() * 360),
      shape: Math.floor(rand() * holdShapes.length),
    };
  });
}

/** Smooth path through hold centres (Catmull-Rom → cubic Bézier). */
export function lineThrough(pts: { x: number; y: number }[]) {
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6];
    const c2 = [p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}
