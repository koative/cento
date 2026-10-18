const W = 640;
const H = 260;
const PAD = { l: 40, r: 16, t: 16, b: 34 };
const DAYS = ["M", "T", "W", "T", "F"];

type Props = {
  total: number;
  days: number;
  /** Points the team is projected to close per working day. */
  rate: number;
  /** Remaining points at the end of each day so far, when the cycle is underway. */
  actual?: number[];
  label: string;
};

/** Burndown in the shape teams draw on whiteboards: an ideal diagonal and the line you are really on. */
export function Burndown({ total, days, rate, actual, label }: Props) {
  const top = Math.max(total, ...(actual ?? []), 1);
  const x = (d: number) => PAD.l + (d / days) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - v / top) * (H - PAD.t - PAD.b);
  const projected = Array.from({ length: days + 1 }, (_, d) =>
    Math.max(0, total - rate * d),
  );
  const carry = projected[days];
  const line = (pts: number[]) =>
    pts
      .map((v, d) => `${d ? "L" : "M"}${x(d).toFixed(1)} ${y(v).toFixed(1)}`)
      .join(" ");
  const ticks = [0, Math.round(top / 2), top];

  return (
    <svg
      className="burndown"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={PAD.l}
            x2={W - PAD.r}
            y1={y(t)}
            y2={y(t)}
            className="bd-grid"
          />
          <text x={PAD.l - 8} y={y(t) + 4} className="bd-tick" textAnchor="end">
            {t}
          </text>
        </g>
      ))}
      {Array.from({ length: days }, (_, d) => (
        <text
          key={d}
          x={(x(d) + x(d + 1)) / 2}
          y={H - 12}
          className="bd-tick"
          textAnchor="middle"
        >
          {DAYS[d % 5]}
        </text>
      ))}
      {days > 5 && (
        <line
          x1={x(5)}
          x2={x(5)}
          y1={PAD.t}
          y2={H - PAD.b}
          className="bd-week"
        />
      )}
      <path
        d={`M${x(0)} ${y(total)} L${x(days)} ${y(0)}`}
        className="bd-ideal"
      />
      {carry > 0 && (
        <path
          d={`${line(projected)} L${x(days)} ${y(0)} Z`}
          className="bd-carry"
        />
      )}
      <path
        d={line(projected)}
        className={actual ? "bd-projected bd-projected-faint" : "bd-projected"}
      />
      {actual && <path d={line(actual)} className="bd-actual" />}
      {actual && (
        <circle
          cx={x(actual.length - 1)}
          cy={y(actual[actual.length - 1])}
          r="5"
          className="bd-dot"
        />
      )}
      {carry > 0 && (
        <text
          x={x(days) - 6}
          y={y(carry) - 10}
          className="bd-carry-label"
          textAnchor="end"
        >
          {Math.round(carry)} pts carry over
        </text>
      )}
    </svg>
  );
}
