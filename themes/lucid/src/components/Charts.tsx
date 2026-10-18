import { num, pct } from "../lib/text";

type Week = { week: string; words: number; accepted: number };

/** Words reviewed per week as bars, acceptance rate as a line on its own 50–100% scale. */
export function WeeklyChart({ data }: { data: Week[] }) {
  const w = 640;
  const h = 240;
  const pad = { l: 44, r: 44, t: 16, b: 28 };
  const max = Math.ceil(Math.max(...data.map((d) => d.words)) / 10000) * 10000;
  const step = (w - pad.l - pad.r) / data.length;
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
  const yRate = (r: number) =>
    pad.t + (1 - (r - 0.5) / 0.5) * (h - pad.t - pad.b);
  const line = data
    .map(
      (d, i) =>
        `${i ? "L" : "M"}${pad.l + step * i + step / 2},${yRate(d.accepted)}`,
    )
    .join(" ");

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="weekly-desc">
        <desc id="weekly-desc">
          Words reviewed per week, from {num(data[0].words)} in the week of{" "}
          {data[0].week} to {num(data[data.length - 1].words)} in the week of{" "}
          {data[data.length - 1].week}. Acceptance rose from{" "}
          {pct(data[0].accepted)} to {pct(data[data.length - 1].accepted)}.
        </desc>
        {[0, 0.5, 1].map((f) => (
          <g key={f}>
            <line
              x1={pad.l}
              x2={w - pad.r}
              y1={y(max * f)}
              y2={y(max * f)}
              className="grid"
            />
            <text
              x={pad.l - 8}
              y={y(max * f) + 4}
              textAnchor="end"
              className="axis"
            >
              {f ? `${num((max * f) / 1000)}k` : "0"}
            </text>
            <text
              x={w - pad.r + 8}
              y={yRate(0.5 + f * 0.5) + 4}
              className="axis axis-rate"
            >
              {pct(0.5 + f * 0.5)}
            </text>
          </g>
        ))}
        {data.map((d, i) => (
          <g key={d.week}>
            <rect
              x={pad.l + step * i + step * 0.2}
              width={step * 0.6}
              y={y(d.words)}
              height={h - pad.b - y(d.words)}
              className="bar"
              rx={2}
            />
            {i % 2 === 0 && (
              <text
                x={pad.l + step * i + step / 2}
                y={h - 8}
                textAnchor="middle"
                className="axis"
              >
                {d.week}
              </text>
            )}
          </g>
        ))}
        <path d={line} className="rate-line" />
        {data.map((d, i) => (
          <circle
            key={d.week}
            cx={pad.l + step * i + step / 2}
            cy={yRate(d.accepted)}
            r={3}
            className="rate-dot"
          />
        ))}
      </svg>
      <figcaption className="chart-key">
        <span className="key key-bar">Words reviewed</span>
        <span className="key key-line">Suggestions accepted</span>
      </figcaption>
    </figure>
  );
}

/** Accepted versus offered suggestions per kind. */
export function KindBars({
  data,
}: {
  data: { kind: string; accepted: number; total: number }[];
}) {
  return (
    <ul className="kind-bars">
      {data.map((d) => (
        <li key={d.kind}>
          <span className="kind-label">{d.kind}</span>
          <span className="kind-value num">
            {num(d.accepted)} of {num(d.total)} · {pct(d.accepted / d.total)}
          </span>
          <svg
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
            aria-hidden
            className="kind-track"
          >
            <rect width="100" height="6" rx="3" className="track" />
            <rect
              width={(d.accepted / d.total) * 100}
              height="6"
              rx="3"
              className="fill"
            />
          </svg>
        </li>
      ))}
    </ul>
  );
}
