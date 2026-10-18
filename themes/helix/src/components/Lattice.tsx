import { useMemo, useState, type KeyboardEvent } from "react";
import type { System } from "../content";
import { calibrate, type QubitCal } from "../lib/lattice";

const GAP = 36;
const pos = (n: number) => GAP / 2 + n * GAP;

/** Static chip outline for list rows. */
export function LatticeMap({ system }: { system: System }) {
  const { rows, cols, parked } = system;
  return (
    <svg
      className="lattice-map"
      viewBox={`0 0 ${cols * GAP} ${rows * GAP}`}
      aria-hidden="true"
    >
      {Array.from({ length: rows }, (_, r) => (
        <line
          key={`r${r}`}
          x1={pos(0)}
          y1={pos(r)}
          x2={pos(cols - 1)}
          y2={pos(r)}
        />
      ))}
      {Array.from({ length: cols }, (_, c) => (
        <line
          key={`c${c}`}
          x1={pos(c)}
          y1={pos(0)}
          x2={pos(c)}
          y2={pos(rows - 1)}
        />
      ))}
      {Array.from({ length: rows * cols }, (_, i) => (
        <circle
          key={i}
          cx={pos(i % cols)}
          cy={pos(Math.floor(i / cols))}
          r={9}
          data-parked={parked.includes(i) || undefined}
        />
      ))}
    </svg>
  );
}

const METRICS = [
  { id: "t1", label: "T1", unit: "µs", read: (q: QubitCal) => q.t1 },
  {
    id: "readout",
    label: "Readout",
    unit: "%",
    read: (q: QubitCal) => q.readout,
  },
  {
    id: "freq",
    label: "Frequency",
    unit: "GHz",
    read: (q: QubitCal) => q.freq,
  },
] as const;

/** Interactive calibration map: pick a metric, move across qubits with the mouse or arrow keys. */
export function LatticeExplorer({ system }: { system: System }) {
  const { qubits, couplers } = useMemo(() => calibrate(system), [system]);
  const [metricId, setMetricId] =
    useState<(typeof METRICS)[number]["id"]>("t1");
  const [selected, setSelected] = useState(0);
  const metric = METRICS.find((m) => m.id === metricId)!;
  const live = qubits.filter((q) => !q.parked).map(metric.read);
  const min = Math.min(...live);
  const max = Math.max(...live);
  const q = qubits[selected];
  const links = couplers.filter((c) => c.a === selected || c.b === selected);

  function onKey(e: KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: system.cols,
      ArrowUp: -system.cols,
    };
    const step = moves[e.key];
    if (!step) return;
    e.preventDefault();
    const next = selected + step;
    const wraps =
      Math.abs(step) === 1 && Math.floor(next / system.cols) !== q.row;
    if (next >= 0 && next < qubits.length && !wraps) setSelected(next);
  }

  return (
    <div className="explorer">
      <div className="explorer-bar">
        <fieldset className="segmented">
          <legend className="visually-hidden">Colour qubits by</legend>
          {METRICS.map((m) => (
            <label key={m.id}>
              <input
                type="radio"
                name="metric"
                checked={metricId === m.id}
                onChange={() => setMetricId(m.id)}
              />
              <span>{m.label}</span>
            </label>
          ))}
        </fieldset>
        <div className="scale" aria-hidden="true">
          <span>
            {min} {metric.unit}
          </span>
          <span className="scale-ramp" />
          <span>
            {max} {metric.unit}
          </span>
        </div>
      </div>

      <div className="explorer-body">
        <div
          className="explorer-chip"
          tabIndex={0}
          role="group"
          aria-label={`${system.name} qubit lattice. Arrow keys move between qubits.`}
          onKeyDown={onKey}
          style={{ maxWidth: `${system.cols * 64}px` }}
        >
          <svg
            viewBox={`0 0 ${system.cols * GAP} ${system.rows * GAP}`}
            aria-hidden="true"
          >
            {couplers.map((c) => {
              const a = qubits[c.a];
              const b = qubits[c.b];
              return (
                <line
                  key={`${c.a}-${c.b}`}
                  className="coupler"
                  data-on={c.a === selected || c.b === selected || undefined}
                  x1={pos(a.col)}
                  y1={pos(a.row)}
                  x2={pos(b.col)}
                  y2={pos(b.row)}
                />
              );
            })}
            {qubits.map((cal) => {
              const share =
                max === min
                  ? 50
                  : Math.round(((metric.read(cal) - min) / (max - min)) * 100);
              return (
                <circle
                  key={cal.index}
                  className="qubit"
                  data-parked={cal.parked || undefined}
                  data-selected={cal.index === selected || undefined}
                  cx={pos(cal.col)}
                  cy={pos(cal.row)}
                  r={11}
                  style={
                    cal.parked
                      ? undefined
                      : {
                          fill: `color-mix(in oklab, var(--gold-deep) ${share}%, var(--gold-pale))`,
                        }
                  }
                  onClick={() => setSelected(cal.index)}
                />
              );
            })}
          </svg>
        </div>

        <div className="qubit-card" aria-live="polite">
          <h3>
            Qubit {q.index}{" "}
            <span>
              row {q.row + 1}, column {q.col + 1}
            </span>
          </h3>
          {q.parked ? (
            <p>
              Parked: excluded from the current calibration after a frequency
              collision. The compiler routes around it.
            </p>
          ) : (
            <dl className="spec-list compact">
              <div>
                <dt>T1</dt>
                <dd>{q.t1} µs</dd>
              </div>
              <div>
                <dt>T2 echo</dt>
                <dd>{q.t2} µs</dd>
              </div>
              <div>
                <dt>Readout fidelity</dt>
                <dd>{q.readout}%</dd>
              </div>
              <div>
                <dt>Frequency</dt>
                <dd>{q.freq} GHz</dd>
              </div>
            </dl>
          )}
          <h4>Couplers</h4>
          <ul className="coupler-list">
            {links.map((c) => {
              const other = c.a === selected ? c.b : c.a;
              return (
                <li key={other}>
                  <button type="button" onClick={() => setSelected(other)}>
                    Q{q.index}–Q{other}
                  </button>
                  <span>
                    {qubits[other].parked || q.parked ? "idle" : `${c.f2q}%`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
