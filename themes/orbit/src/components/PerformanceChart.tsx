import type { Vehicle } from "../content";
import { num } from "../lib/format";

/** Payload mass against circular sun-synchronous altitude, drawn from the vehicle's curve table. */
export function PerformanceChart({ v }: { v: Vehicle }) {
  const W = 640;
  const H = 300;
  const pad = { l: 64, r: 20, t: 34, b: 44 };
  const alts = v.curve.map(([a]) => a);
  const kgs = v.curve.map(([, kg]) => kg);
  const x0 = Math.min(...alts);
  const x1 = Math.max(...alts);
  // four gridlines on a 1-2-2.5-5 step so ticks read as round numbers
  const raw = Math.max(...kgs) / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * mag >= raw)! * mag;
  const yMax = step * 4;
  const x = (a: number) => pad.l + ((a - x0) / (x1 - x0)) * (W - pad.l - pad.r);
  const y = (kg: number) => H - pad.b - (kg / yMax) * (H - pad.t - pad.b);
  const line = v.curve
    .map(
      ([a, kg], i) => `${i ? "L" : "M"} ${x(a).toFixed(1)} ${y(kg).toFixed(1)}`,
    )
    .join(" ");
  const ticks = [0, 1, 2, 3, 4].map((i) => i * step);

  return (
    <figure className="perf">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby={`perf-${v.id}`}
      >
        {ticks.map((t) => (
          <g key={t} className="perf-grid">
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} />
            <text x={pad.l - 10} y={y(t) + 4} textAnchor="end">
              {num(t)}
            </text>
          </g>
        ))}
        {v.curve.map(([a]) => (
          <text
            key={a}
            className="perf-x"
            x={x(a)}
            y={H - pad.b + 20}
            textAnchor="middle"
          >
            {a}
          </text>
        ))}
        <text className="perf-x" x={pad.l} y={12}>
          payload, kg
        </text>
        <text className="perf-x" x={W - pad.r} y={H - 4} textAnchor="end">
          circular altitude, km
        </text>
        <path
          d={`${line} L ${x(x1)} ${y(0)} L ${x(x0)} ${y(0)} Z`}
          className="perf-area"
        />
        <path d={line} className="perf-line" />
        {v.curve.map(([a, kg]) => (
          <circle key={a} cx={x(a)} cy={y(kg)} r={3.5} className="perf-dot" />
        ))}
      </svg>
      <figcaption id={`perf-${v.id}`}>
        {v.name} payload to sun-synchronous orbit by altitude: from{" "}
        {num(kgs[0])} kg at {x0} km to {num(kgs[kgs.length - 1])} kg at {x1} km.
      </figcaption>
    </figure>
  );
}
