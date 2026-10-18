import type { Paper } from "../content";

const W = 560;
const H = 340;
const PAD = { l: 64, r: 20, t: 20, b: 52 };

/** Five evenly spaced ticks over a range padded out to round numbers. */
function ticks(lo: number, hi: number) {
  const raw = (hi - lo) / 4 || 1;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw)!;
  const start = Math.floor(lo / step) * step;
  const end = Math.ceil(hi / step) * step;
  const out: number[] = [];
  for (let v = start; v <= end + step / 1e6; v += step)
    out.push(+v.toPrecision(6));
  return out;
}

export function Plot({
  figure,
  label,
}: {
  figure: Paper["figure"];
  label: string;
}) {
  const pts = figure.series.flatMap((s) => s.points);
  const xs = ticks(
    Math.min(...pts.map((p) => p[0])),
    Math.max(...pts.map((p) => p[0])),
  );
  const ys = ticks(
    Math.min(...pts.map((p) => p[1])),
    Math.max(...pts.map((p) => p[1])),
  );
  const sx = (x: number) =>
    PAD.l + ((x - xs[0]) / (xs.at(-1)! - xs[0])) * (W - PAD.l - PAD.r);
  const sy = (y: number) =>
    H - PAD.b - ((y - ys[0]) / (ys.at(-1)! - ys[0])) * (H - PAD.t - PAD.b);

  return (
    <figure className="plot">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${label}. ${figure.caption}`}
      >
        {ys.map((y) => (
          <g key={`y${y}`} className="plot-tick">
            <line x1={PAD.l} x2={W - PAD.r} y1={sy(y)} y2={sy(y)} />
            <text x={PAD.l - 10} y={sy(y) + 4} textAnchor="end">
              {y}
            </text>
          </g>
        ))}
        {xs.map((x) => (
          <text
            key={`x${x}`}
            className="plot-tick"
            x={sx(x)}
            y={H - PAD.b + 20}
            textAnchor="middle"
          >
            {x}
          </text>
        ))}
        <line
          className="plot-axis"
          x1={PAD.l}
          x2={W - PAD.r}
          y1={H - PAD.b}
          y2={H - PAD.b}
        />
        <line
          className="plot-axis"
          x1={PAD.l}
          x2={PAD.l}
          y1={PAD.t}
          y2={H - PAD.b}
        />
        <text
          className="plot-label"
          x={(PAD.l + W - PAD.r) / 2}
          y={H - 8}
          textAnchor="middle"
        >
          {figure.x}
        </text>
        <text
          className="plot-label"
          transform={`translate(16 ${(PAD.t + H - PAD.b) / 2}) rotate(-90)`}
          textAnchor="middle"
        >
          {figure.y}
        </text>
        {figure.series.map((s, i) => (
          <g key={s.label} className={`plot-series s${i}`}>
            <polyline
              points={s.points.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ")}
            />
            {s.points.map(([x, y]) =>
              i === 0 ? (
                <circle key={x} cx={sx(x)} cy={sy(y)} r={4} />
              ) : (
                <rect
                  key={x}
                  x={sx(x) - 3.5}
                  y={sy(y) - 3.5}
                  width={7}
                  height={7}
                />
              ),
            )}
          </g>
        ))}
      </svg>
      <figcaption>
        <strong>{label}.</strong> {figure.caption}
        {figure.series.length > 1 && (
          <span className="plot-legend">
            {figure.series.map((s, i) => (
              <span key={s.label} className={`legend-key s${i}`}>
                {s.label}
              </span>
            ))}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
