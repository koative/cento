/** Weekly bars with a baseline and every other label; the last (partial) week is drawn lighter. */
export function BarChart({
  data,
  label,
}: {
  data: { week: string; count: number }[];
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.count));
  const top = Math.ceil(max / 10) * 10;
  const w = 560;
  const h = 200;
  const pad = { l: 28, b: 26, t: 10 };
  const slot = (w - pad.l) / data.length;
  const y = (v: number) => h - pad.b - (v / top) * (h - pad.b - pad.t);
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
        {[0, top / 2, top].map((v) => (
          <g key={v}>
            <line
              x1={pad.l}
              x2={w}
              y1={y(v)}
              y2={y(v)}
              className="chart-grid"
            />
            <text x={0} y={y(v) + 4} className="chart-axis">
              {v}
            </text>
          </g>
        ))}
        {data.map((d, i) => (
          <g key={d.week}>
            <rect
              x={pad.l + i * slot + slot * 0.18}
              y={y(d.count)}
              width={slot * 0.64}
              height={h - pad.b - y(d.count)}
              rx={3}
              className={
                i === data.length - 1
                  ? "chart-bar chart-bar-partial"
                  : "chart-bar"
              }
            >
              <title>{`Week of ${d.week}: ${d.count} applicants`}</title>
            </rect>
            {i % 2 === 0 && (
              <text
                x={pad.l + i * slot + slot / 2}
                y={h - 6}
                textAnchor="middle"
                className="chart-axis"
              >
                {d.week}
              </text>
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Horizontal bars per stage, longest = all candidates in the pipeline. */
export function StageBars({
  rows,
}: {
  rows: { label: string; count: number }[];
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <ul className="stage-bars">
      {rows.map((r, i) => (
        <li key={r.label}>
          <span>{r.label}</span>
          <span className="stage-bar-track" aria-hidden="true">
            <span
              className="stage-bar"
              data-stage={i}
              style={{ width: `${(r.count / max) * 100}%` }}
            />
          </span>
          <span className="num">{r.count}</span>
        </li>
      ))}
    </ul>
  );
}
