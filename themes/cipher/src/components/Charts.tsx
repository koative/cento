/* Small authored SVG charts. Each carries a text summary for screen readers. */

export function LineChart({
  values,
  labels,
  summary,
}: {
  values: number[];
  labels: string[];
  summary: string;
}) {
  const w = 600;
  const h = 200;
  const pad = { t: 16, r: 12, b: 28, l: 40 };
  const max = Math.ceil(Math.max(...values) / 50) * 50;
  const min = Math.floor(Math.min(...values) / 50) * 50 - 50;
  const x = (i: number) =>
    pad.l + (i / (values.length - 1)) * (w - pad.l - pad.r);
  const y = (v: number) =>
    pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b);
  const line = values
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join("");
  const ticks = [min, (min + max) / 2, max];
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={summary}>
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={pad.l}
              x2={w - pad.r}
              y1={y(t)}
              y2={y(t)}
              className="grid"
            />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="tick">
              {t}
            </text>
          </g>
        ))}
        <path
          d={`${line}L${x(values.length - 1)} ${h - pad.b}L${pad.l} ${h - pad.b}Z`}
          className="area"
        />
        <path d={line} className="line" />
        {values.map((v, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={y(v)}
            r={i === values.length - 1 ? 4.5 : 2.5}
            className={i === values.length - 1 ? "dot last" : "dot"}
          />
        ))}
        {labels.map((l, i) =>
          i % 3 === 0 || i === labels.length - 1 ? (
            <text
              key={l}
              x={x(i)}
              y={h - 8}
              textAnchor={i === labels.length - 1 ? "end" : "middle"}
              className="tick"
            >
              {l}
            </text>
          ) : null,
        )}
      </svg>
    </figure>
  );
}

export type BarRow = {
  label: string;
  kept: number;
  revoked: number;
  open: number;
};

/** One horizontal stacked bar per row: kept, revoked, still open. */
export function StackedBars({
  rows,
  summary,
}: {
  rows: BarRow[];
  summary: string;
}) {
  const max = Math.max(...rows.map((r) => r.kept + r.revoked + r.open));
  return (
    <figure className="bars" aria-label={summary} role="img">
      {rows.map((r) => (
        <div className="bar-row" key={r.label} aria-hidden>
          <span className="bar-label">{r.label}</span>
          <span className="bar-track">
            {(["kept", "revoked", "open"] as const).map((k) =>
              r[k] ? (
                <span
                  key={k}
                  className="bar-seg"
                  data-kind={k}
                  style={{ width: `${(r[k] / max) * 100}%` }}
                />
              ) : null,
            )}
          </span>
          <span className="bar-total num">{r.kept + r.revoked + r.open}</span>
        </div>
      ))}
      <figcaption className="legend" aria-hidden>
        <span data-kind="kept">Kept</span>
        <span data-kind="revoked">Revoked</span>
        <span data-kind="open">Open</span>
      </figcaption>
    </figure>
  );
}

/** 90 thin columns, one per day; partial days are drawn shorter and in the warning tone. */
export function UptimeBars({
  days,
  summary,
}: {
  days: number[];
  summary: string;
}) {
  const w = days.length * 6;
  return (
    <svg
      className="uptime"
      viewBox={`0 0 ${w} 32`}
      preserveAspectRatio="none"
      role="img"
      aria-label={summary}
    >
      {days.map((d, i) => (
        <rect
          key={i}
          x={i * 6}
          y={d < 100 ? 10 : 0}
          width={4}
          height={d < 100 ? 22 : 32}
          rx={1}
          className={d < 100 ? "partial" : "full"}
        />
      ))}
    </svg>
  );
}
