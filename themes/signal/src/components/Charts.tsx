import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { compact, EventName, num } from "./format";

export type Tone = "signal" | "compare" | "t3" | "t4";
export type Series = {
  label: string;
  values: number[];
  tone?: Tone;
  dashed?: boolean;
};

const TONES: Tone[] = ["signal", "compare", "t3", "t4"];
const W = 1000;
const H = 300;

type LineChartProps = {
  label: string;
  series: Series[];
  labels: string[];
  format: (n: number) => string;
  annotations?: { index: number; label: string }[];
  zeroBased?: boolean;
};

/**
 * Multi-series line chart. The plot is a slider: hover or use arrow keys to read
 * every series on one day. Axis text is HTML so it never stretches with the SVG.
 */
export function LineChart({
  label,
  series,
  labels,
  format,
  annotations = [],
  zeroBased = false,
}: LineChartProps) {
  const [cursor, setCursor] = useState<number | null>(null);
  const n = labels.length;
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all);
  const min = Math.min(...all);
  const span = max - min || max || 1;
  const lo = zeroBased ? 0 : Math.max(0, min - span * 0.35);
  const hi = max + span * 0.12;
  const x = (i: number) => (i / (n - 1)) * W;
  const y = (v: number) => H - ((v - lo) / (hi - lo)) * H;
  const path = (vals: number[]) =>
    vals
      .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
      .join("");
  // Round gridlines: the smallest 1/2/2.5/5 × 10ⁿ step that gives at most four lines.
  const raw = (hi - lo) / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw)!;
  const first = Math.ceil(lo / step);
  const ticks = Array.from(
    { length: 5 },
    (_, k) => +((first + k) * step).toPrecision(12),
  ).filter((t) => t > lo && t < hi);
  const every = Math.ceil(n / 6);
  const mid = Math.round((n - 1) / 2 / every) * every; // the one middle label kept on narrow screens
  const at = cursor ?? n - 1;
  const signature = series.map((s) => s.label + s.values.join()).join("|");

  function pick(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setCursor(Math.round(((e.clientX - r.left) / r.width) * (n - 1)));
  }
  function key(e: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowLeft: at - 1,
      ArrowRight: at + 1,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    setCursor(Math.min(n - 1, Math.max(0, moves[e.key])));
  }

  return (
    <figure className="line-chart">
      {series.length > 1 && (
        <figcaption className="legend">
          {series.map((s, i) => (
            <span
              key={s.label}
              data-tone={s.tone ?? TONES[i]}
              data-dashed={s.dashed ? "" : undefined}
            >
              {s.label}
            </span>
          ))}
        </figcaption>
      )}
      <div className="plot-wrap">
        <div className="y-ticks" aria-hidden>
          {ticks.map((t) => (
            <span
              key={t}
              style={{ bottom: `${((t - lo) / (hi - lo)) * 100}%` }}
            >
              {format(t).length > 6 ? compact.format(t) : format(t)}
            </span>
          ))}
        </div>
        <div
          className="plot"
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={n - 1}
          aria-valuenow={at}
          aria-valuetext={`${labels[at]}: ${series.map((s) => `${s.label} ${format(s.values[at])}`).join(", ")}`}
          onPointerMove={pick}
          onPointerLeave={() => setCursor(null)}
          onKeyDown={key}
          onBlur={() => setCursor(null)}
        >
          <svg
            key={signature}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            {ticks.map((t) => (
              <line
                key={t}
                className="grid"
                x1={0}
                x2={W}
                y1={y(t)}
                y2={y(t)}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              className="area"
              d={`${path(series[0].values)}L${W} ${H}L0 ${H}Z`}
            />
            {series.map((s, i) => (
              <path
                key={s.label}
                className="trace"
                data-tone={s.tone ?? TONES[i]}
                data-dashed={s.dashed ? "" : undefined}
                d={path(s.values)}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          {annotations.map((a) => (
            <div
              key={a.label}
              className="annotation"
              data-flip={a.index > n * 0.55 ? "" : undefined}
              style={{ left: `${(a.index / (n - 1)) * 100}%` }}
            >
              <span>{a.label}</span>
            </div>
          ))}
          {cursor !== null && (
            <>
              <div
                className="cursor"
                style={{ left: `${(at / (n - 1)) * 100}%` }}
              />
              {series.map((s, i) => (
                <i
                  key={s.label}
                  className="dot"
                  data-tone={s.tone ?? TONES[i]}
                  style={{
                    left: `${(at / (n - 1)) * 100}%`,
                    top: `${(y(s.values[at]) / H) * 100}%`,
                  }}
                />
              ))}
              <div
                className="tip"
                data-flip={at > n * 0.6 ? "" : undefined}
                style={{ left: `${(at / (n - 1)) * 100}%` }}
              >
                <b>{labels[at]}</b>
                {series.map((s, i) => (
                  <span key={s.label} data-tone={s.tone ?? TONES[i]}>
                    {s.label} <strong>{format(s.values[at])}</strong>
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="x-ticks" aria-hidden>
          {labels.map((l, i) =>
            (i % every === 0 && n - 1 - i > every / 2) || i === n - 1 ? (
              <span
                key={i}
                style={{ left: `${(i / (n - 1)) * 100}%` }}
                data-edge={i === 0 ? "start" : i === n - 1 ? "end" : undefined}
                data-minor={
                  i !== 0 && i !== n - 1 && i !== mid ? "" : undefined
                }
              >
                {l}
              </span>
            ) : null,
          )}
        </div>
      </div>
    </figure>
  );
}

/** Vertical funnel: solid bars for converted users, ribbons for the drop between steps. */
export function FunnelChart({
  steps,
  label,
}: {
  steps: { event: string; users: number }[];
  label: string;
}) {
  const top = steps[0]?.users || 1;
  const n = steps.length;
  const bar = 58;
  return (
    <figure className="funnel" style={{ ["--steps" as string]: n }}>
      <svg
        viewBox={`0 0 ${n * 100} 100`}
        preserveAspectRatio="none"
        role="img"
        aria-label={label}
      >
        {steps.map((s, i) => {
          const h = (s.users / top) * 100;
          const next = steps[i + 1];
          return (
            <g key={s.event + i}>
              <rect
                className="ghost"
                x={i * 100}
                y={0}
                width={bar}
                height={100 - h}
              />
              <rect
                className="bar"
                x={i * 100}
                y={100 - h}
                width={bar}
                height={h}
              />
              {next && (
                <polygon
                  className="ribbon"
                  points={`${i * 100 + bar},${100 - h} ${(i + 1) * 100},${100 - (next.users / top) * 100} ${(i + 1) * 100},100 ${i * 100 + bar},100`}
                />
              )}
            </g>
          );
        })}
      </svg>
      <ol className="funnel-steps">
        {steps.map((s, i) => {
          const prev = steps[i - 1];
          return (
            <li key={s.event + i}>
              <span className="step-no num">{i + 1}</span>
              <EventName id={s.event} />
              <span className="num">{num.format(s.users)}</span>
              <span className="pct">{((s.users / top) * 100).toFixed(1)}%</span>
              {prev && (
                <span className="drop">
                  −{(((prev.users - s.users) / prev.users) * 100).toFixed(0)}%
                  from prev.
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

/** Weekly retention grid; cell tint is the share of the cohort that came back. */
export function CohortGrid({
  cohorts,
}: {
  cohorts: { week: string; size: number; values: number[] }[];
}) {
  const weeks = Math.max(...cohorts.map((c) => c.values.length));
  return (
    <div
      className="cohort-scroll"
      tabIndex={0}
      role="region"
      aria-label="Weekly retention cohorts"
    >
      <table className="cohorts">
        <thead>
          <tr>
            <th scope="col">Cohort</th>
            <th scope="col">Users</th>
            {Array.from({ length: weeks }, (_, i) => (
              <th scope="col" key={i}>
                W{i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cohorts.map((c) => (
            <tr key={c.week}>
              <th scope="row">{c.week}</th>
              <td className="num">{num.format(c.size)}</td>
              {Array.from({ length: weeks }, (_, i) => {
                const v = c.values[i];
                return v === undefined ? (
                  <td key={i} className="empty" />
                ) : (
                  <td
                    key={i}
                    style={{ ["--v" as string]: `${v}%` }}
                    data-strong={v >= 70 ? "" : undefined}
                  >
                    {v}%
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Ranked horizontal bars for shares (sources, platforms). */
export function BarList({
  rows,
  format,
}: {
  rows: { label: string; value: number }[];
  format: (n: number) => string;
}) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="bar-list">
      {rows.map((r) => (
        <li key={r.label}>
          <span
            className="bar-fill"
            style={{ width: `${(r.value / max) * 100}%` }}
            aria-hidden
          />
          <span>{r.label}</span>
          <span className="num">{format(r.value)}</span>
        </li>
      ))}
    </ul>
  );
}
