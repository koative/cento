/* A tiny exact state-vector simulator for the three-qubit composer. Qubit 0 is the leftmost bit of |q0 q1 q2⟩. */

export type Gate = "H" | "X" | "Y" | "Z" | "S" | "T" | "CX";
export type Circuit = (Gate | null)[][]; // [qubit][step]

export const QUBITS = 3;
export const STEPS = 6;
const DIM = 1 << QUBITS;

type Complex = [re: number, im: number];
type Matrix = [Complex, Complex, Complex, Complex];

const r = Math.SQRT1_2;
const MATRICES: Record<Exclude<Gate, "CX">, Matrix> = {
  H: [
    [r, 0],
    [r, 0],
    [r, 0],
    [-r, 0],
  ],
  X: [
    [0, 0],
    [1, 0],
    [1, 0],
    [0, 0],
  ],
  Y: [
    [0, 0],
    [0, -1],
    [0, 1],
    [0, 0],
  ],
  Z: [
    [1, 0],
    [0, 0],
    [0, 0],
    [-1, 0],
  ],
  S: [
    [1, 0],
    [0, 0],
    [0, 0],
    [0, 1],
  ],
  T: [
    [1, 0],
    [0, 0],
    [0, 0],
    [r, r],
  ],
};

const mul = (a: Complex, b: Complex): Complex => [
  a[0] * b[0] - a[1] * b[1],
  a[0] * b[1] + a[1] * b[0],
];
const add = (a: Complex, b: Complex): Complex => [a[0] + b[0], a[1] + b[1]];
const bit = (q: number) => 1 << (QUBITS - 1 - q);

export function emptyCircuit(): Circuit {
  return Array.from({ length: QUBITS }, () =>
    Array<Gate | null>(STEPS).fill(null),
  );
}

export function simulate(circuit: Circuit): Complex[] {
  let state: Complex[] = Array.from({ length: DIM }, (_, i) => [
    i === 0 ? 1 : 0,
    0,
  ]);
  for (let s = 0; s < STEPS; s++) {
    for (let q = 0; q < QUBITS; q++) {
      const gate = circuit[q][s];
      if (!gate) continue;
      const next = state.map((c) => [...c] as Complex);
      if (gate === "CX") {
        const c = bit(q);
        const t = bit(q + 1);
        for (let i = 0; i < DIM; i++)
          if (i & c && !(i & t))
            [next[i], next[i | t]] = [state[i | t], state[i]];
      } else {
        const [m00, m01, m10, m11] = MATRICES[gate];
        const b = bit(q);
        for (let i = 0; i < DIM; i++) {
          if (i & b) continue;
          const j = i | b;
          next[i] = add(mul(m00, state[i]), mul(m01, state[j]));
          next[j] = add(mul(m10, state[i]), mul(m11, state[j]));
        }
      }
      state = next;
    }
  }
  return state;
}

export const probabilities = (state: Complex[]) =>
  state.map(([a, b]) => a * a + b * b);

export const basis = (i: number) => i.toString(2).padStart(QUBITS, "0");

const EPS = 1e-9;
const num = (x: number) =>
  Math.abs(x) < EPS ? "0" : x.toFixed(3).replace(/\.?0+$/, "");

/** Ket notation of the state, e.g. 0.707|000⟩ + 0.707|111⟩. */
export function ket(state: Complex[]) {
  const terms = state
    .map(([re, im], i) => ({ re, im, i }))
    .filter((t) => t.re * t.re + t.im * t.im > EPS)
    .map(({ re, im, i }) => {
      const amp =
        Math.abs(im) < EPS
          ? num(re)
          : Math.abs(re) < EPS
            ? `${num(im)}i`
            : `(${num(re)}${im < 0 ? "−" : "+"}${num(Math.abs(im))}i)`;
      return `${amp}|${basis(i)}⟩`;
    });
  return terms.join(" + ").replaceAll("+ -", "− ");
}

/** Draws `shots` measurement outcomes from the probability distribution. */
export function sample(probs: number[], shots: number, random = Math.random) {
  const counts = probs.map(() => 0);
  for (let n = 0; n < shots; n++) {
    let x = random();
    let i = 0;
    while (i < probs.length - 1 && x >= probs[i]) x -= probs[i++];
    counts[i]++;
  }
  return counts;
}

function preset(gates: [q: number, s: number, g: Gate][]): Circuit {
  const c = emptyCircuit();
  for (const [q, s, g] of gates) c[q][s] = g;
  return c;
}

export const PRESETS: { name: string; circuit: Circuit }[] = [
  {
    name: "Bell pair",
    circuit: preset([
      [0, 0, "H"],
      [0, 1, "CX"],
    ]),
  },
  {
    name: "GHZ state",
    circuit: preset([
      [0, 0, "H"],
      [0, 1, "CX"],
      [1, 2, "CX"],
    ]),
  },
  {
    name: "Superposition",
    circuit: preset([
      [0, 0, "H"],
      [1, 0, "H"],
      [2, 0, "H"],
    ]),
  },
  {
    name: "Phase flip",
    circuit: preset([
      [0, 0, "H"],
      [0, 1, "T"],
      [0, 2, "T"],
      [0, 3, "S"],
      [0, 4, "H"],
    ]),
  },
];

// Self-check: a Bell pair splits evenly between |00x⟩ and |11x⟩, and Z·Z is the identity.
if (import.meta.env.DEV) {
  const p = probabilities(simulate(PRESETS[0].circuit));
  console.assert(
    Math.abs(p[0] - 0.5) < 1e-9 && Math.abs(p[6] - 0.5) < 1e-9,
    "Bell pair amplitudes",
  );
  const zz = probabilities(
    simulate(
      preset([
        [2, 0, "X"],
        [2, 1, "Z"],
        [2, 2, "Z"],
      ]),
    ),
  );
  console.assert(Math.abs(zz[1] - 1) < 1e-9, "Z·Z identity");
}
