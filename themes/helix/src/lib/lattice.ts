import type { System } from "../content";

export type QubitCal = {
  index: number;
  row: number;
  col: number;
  t1: number;
  t2: number;
  readout: number;
  freq: number;
  parked: boolean;
};

export type Coupler = { a: number; b: number; f2q: number };

/**
 * Illustrative per-qubit calibration spread around the system's published medians.
 * Seeded from the slug, so every visit shows the same chip.
 */
export function calibrate(system: System) {
  let seed = [...system.slug].reduce(
    (h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0,
    7,
  );
  const rand = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const spread = () => rand() + rand() - 1; // triangular in (−1, 1), centred on the median

  const qubits: QubitCal[] = Array.from(
    { length: system.rows * system.cols },
    (_, index) => {
      const row = Math.floor(index / system.cols);
      const col = index % system.cols;
      return {
        index,
        row,
        col,
        t1: Math.round(system.t1 * (1 + 0.32 * spread())),
        t2: Math.round(system.t2 * (1 + 0.36 * spread())),
        readout: Math.min(99.9, +(system.readout + 0.9 * spread()).toFixed(2)),
        // Checkerboard of two frequency bands keeps neighbours detuned.
        freq: +(((row + col) % 2 ? 5.12 : 4.58) + 0.09 * spread()).toFixed(3),
        parked: system.parked.includes(index),
      };
    },
  );

  const couplers: Coupler[] = [];
  for (const q of qubits) {
    const pair = (b: number) =>
      couplers.push({
        a: q.index,
        b,
        f2q: Math.min(99.95, +(system.f2q + 0.22 * spread()).toFixed(2)),
      });
    if (q.col < system.cols - 1) pair(q.index + 1);
    if (q.row < system.rows - 1) pair(q.index + system.cols);
  }
  return { qubits, couplers };
}
