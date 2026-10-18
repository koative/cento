import { useMemo, useState } from "react";
import { Eraser, Play } from "lucide-react";
import { Link } from "../router";
import {
  PRESETS,
  QUBITS,
  STEPS,
  basis,
  emptyCircuit,
  ket,
  probabilities,
  sample,
  simulate,
  type Circuit,
  type Gate,
} from "../lib/quantum";

type Tool = Gate | "erase";

const TOOLS: { id: Tool; label: string; name: string; note: string }[] = [
  {
    id: "H",
    label: "H",
    name: "Hadamard",
    note: "Puts a qubit into an equal superposition of 0 and 1.",
  },
  {
    id: "X",
    label: "X",
    name: "Pauli-X",
    note: "Flips 0 and 1, the quantum NOT.",
  },
  {
    id: "Y",
    label: "Y",
    name: "Pauli-Y",
    note: "A bit flip and a phase flip together.",
  },
  {
    id: "Z",
    label: "Z",
    name: "Pauli-Z",
    note: "Flips the phase of the 1 component.",
  },
  {
    id: "S",
    label: "S",
    name: "Phase S",
    note: "Quarter-turn phase on the 1 component.",
  },
  {
    id: "T",
    label: "T",
    name: "Phase T",
    note: "Eighth-turn phase on the 1 component.",
  },
  {
    id: "CX",
    label: "CX",
    name: "CNOT",
    note: "Flips the wire below when this wire is 1. Not available on the last wire.",
  },
  {
    id: "erase",
    label: "",
    name: "Erase",
    note: "Clears a gate from the circuit.",
  },
];

const SHOTS = 1024;

export function Composer() {
  const [circuit, setCircuit] = useState<Circuit>(PRESETS[0].circuit);
  const [tool, setTool] = useState<Tool>("H");
  const [counts, setCounts] = useState<number[] | null>(null);
  const state = useMemo(() => simulate(circuit), [circuit]);
  const probs = probabilities(state);
  const current = TOOLS.find((t) => t.id === tool)!;

  function update(next: Circuit) {
    setCircuit(next);
    setCounts(null);
  }

  function place(q: number, s: number) {
    const next = circuit.map((row) => [...row]);
    const isTarget = q > 0 && next[q - 1][s] === "CX";
    if (isTarget) next[q - 1][s] = null;
    if (tool === "erase" || (next[q][s] === tool && !isTarget))
      next[q][s] = null;
    else {
      if (next[q][s] === "CX") next[q + 1][s] = null;
      next[q][s] = tool;
      if (tool === "CX") {
        if (next[q + 1][s] === "CX") next[q + 2][s] = null;
        next[q + 1][s] = null;
      }
    }
    update(next);
  }

  function describe(q: number, s: number) {
    const g = circuit[q][s];
    if (g === "CX") return "CNOT control";
    if (q > 0 && circuit[q - 1][s] === "CX") return "CNOT target";
    return g ? TOOLS.find((t) => t.id === g)!.name : "empty";
  }

  const best = counts ? counts.indexOf(Math.max(...counts)) : -1;

  return (
    <div className="composer">
      <div className="composer-left">
        <fieldset className="tool-palette">
          <legend>Gate</legend>
          {TOOLS.map((t) => (
            <label key={t.id} className="tool" data-tool={t.id}>
              <input
                type="radio"
                name="tool"
                value={t.id}
                checked={tool === t.id}
                onChange={() => setTool(t.id)}
              />
              <span className="tool-face" aria-hidden="true">
                {t.id === "erase" ? <Eraser size={16} /> : t.label}
              </span>
              <span className="visually-hidden">{t.name}</span>
            </label>
          ))}
        </fieldset>
        <p className="tool-note">
          <strong>{current.name}.</strong> {current.note}
        </p>

        <div
          className="circuit"
          role="group"
          aria-label="Circuit, three qubits by six steps"
        >
          {circuit.map((row, q) => (
            <div className="wire" key={q}>
              <span className="wire-label">
                q{q} <span>|0⟩</span>
              </span>
              {row.map((g, s) => {
                const target = q > 0 && circuit[q - 1][s] === "CX";
                const blocked = tool === "CX" && q === QUBITS - 1;
                return (
                  <button
                    key={s}
                    type="button"
                    className="cell"
                    data-gate={g ?? (target ? "target" : undefined)}
                    aria-label={`Qubit ${q}, step ${s + 1}: ${describe(q, s)}`}
                    aria-disabled={blocked || undefined}
                    onClick={() => !blocked && place(q, s)}
                  >
                    {g === "CX" ? (
                      <svg
                        viewBox="0 0 40 40"
                        aria-hidden="true"
                        className="cx-control"
                      >
                        <line x1="20" y1="20" x2="20" y2="48" />
                        <circle cx="20" cy="20" r="5" />
                      </svg>
                    ) : target ? (
                      <svg
                        viewBox="0 0 40 40"
                        aria-hidden="true"
                        className="cx-target"
                      >
                        <circle cx="20" cy="20" r="11" />
                        <line x1="20" y1="-8" x2="20" y2="31" />
                        <line x1="9" y1="20" x2="31" y2="20" />
                      </svg>
                    ) : g ? (
                      <span className="gate-box">{g}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="composer-actions">
          <span className="presets-label">Load</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              className="chip-btn"
              onClick={() => update(p.circuit)}
            >
              {p.name}
            </button>
          ))}
          <button
            type="button"
            className="chip-btn"
            onClick={() => update(emptyCircuit())}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="composer-right">
        <p className="ket" aria-label="State vector">
          |ψ⟩ = {ket(state)}
        </p>
        <div
          className="histogram"
          role="img"
          aria-label={`Measurement probabilities: ${probs.map((p, i) => `${basis(i)} ${Math.round(p * 100)}%`).join(", ")}`}
        >
          {probs.map((p, i) => (
            <div className="bar" key={i}>
              <span className="bar-value">
                {counts ? counts[i] : `${Math.round(p * 100)}%`}
              </span>
              <span className="bar-track">
                <span
                  className="bar-fill"
                  style={{ transform: `scaleY(${p})` }}
                />
                {counts && (
                  <span
                    className="bar-shots"
                    style={{ transform: `scaleY(${counts[i] / SHOTS})` }}
                  />
                )}
              </span>
              <span className="bar-label">{basis(i)}</span>
            </div>
          ))}
        </div>
        <div className="composer-run">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setCounts(sample(probs, SHOTS))}
          >
            <Play size={16} aria-hidden /> Sample{" "}
            {SHOTS.toLocaleString("en-US")} shots
          </button>
          <Link to="/access" className="text-link">
            Run it on Firn 24
          </Link>
        </div>
        <p className="composer-live" aria-live="polite">
          {counts
            ? `Sampled ${SHOTS.toLocaleString("en-US")} ideal shots. Most frequent outcome |${basis(best)}⟩, ${counts[best]} times. Hardware results add readout noise of about 1%.`
            : "Bars show exact probabilities from the simulator. Sample shots to see the spread a real run gives."}
        </p>
      </div>
    </div>
  );
}
