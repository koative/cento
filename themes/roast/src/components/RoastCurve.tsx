const W = 600;
const H = 280;
const TURN = 1.5; // minutes to the turning point
const TURN_TEMP = 92;
const CHARGE = 200;
const CRACK = 192; // °C, first crack
const TAU = 5; // how fast the bean temperature approaches the drop temperature
const MAX_T = 12;

const x = (t: number) => 48 + (t / MAX_T) * (W - 64);
const y = (temp: number) => H - 36 - ((temp - 80) / 150) * (H - 56);
const clock = (m: number) =>
  `${Math.floor(m)}:${String(Math.round((m % 1) * 60)).padStart(2, "0")}`;

/** Bean temperature curve from the roast log: drop time (min) and drop temperature (°C) shape an exponential approach after the turning point. */
export function RoastCurve({
  drop,
  temp,
  color,
}: {
  drop: number;
  temp: number;
  color: string;
}) {
  const span = 1 - Math.exp(-(drop - TURN) / TAU);
  const at = (t: number) =>
    t < TURN
      ? TURN_TEMP + (CHARGE - TURN_TEMP) * (1 - t / TURN) ** 2
      : TURN_TEMP +
        ((temp - TURN_TEMP) * (1 - Math.exp(-(t - TURN) / TAU))) / span;
  const crack =
    TURN -
    TAU * Math.log(1 - ((CRACK - TURN_TEMP) / (temp - TURN_TEMP)) * span);
  const points = Array.from({ length: 61 }, (_, i) => (i / 60) * drop);
  const d = points
    .map((t, i) => `${i ? "L" : "M"}${x(t).toFixed(1)} ${y(at(t)).toFixed(1)}`)
    .join(" ");
  const dev = drop - crack;

  return (
    <figure className="roast-curve">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Roast curve: first crack at ${clock(crack)}, dropped at ${clock(drop)} and ${temp}°C, ${clock(dev)} development.`}
      >
        {[100, 150, 200].map((v) => (
          <g key={v} className="rc-grid">
            <line x1={x(0)} x2={W - 16} y1={y(v)} y2={y(v)} />
            <text x={x(0) - 8} y={y(v) + 4} textAnchor="end">
              {v}°
            </text>
          </g>
        ))}
        {[0, 2, 4, 6, 8, 10, 12].map((t) => (
          <text
            key={t}
            className="rc-axis"
            x={x(t)}
            y={H - 12}
            textAnchor="middle"
          >
            {t} min
          </text>
        ))}
        <rect
          className="rc-dev"
          x={x(crack)}
          y={16}
          width={x(drop) - x(crack)}
          height={H - 52}
          style={{ fill: color }}
        />
        <line
          className="rc-crack"
          x1={x(crack)}
          x2={x(crack)}
          y1={16}
          y2={H - 36}
        />
        <text className="rc-label" x={x(crack) - 8} y={30} textAnchor="end">
          First crack {clock(crack)}
        </text>
        <path className="rc-line" d={d} pathLength={1} />
        <circle className="rc-dot" cx={x(TURN)} cy={y(TURN_TEMP)} r={4} />
        <text className="rc-label" x={x(TURN) + 10} y={y(TURN_TEMP) + 18}>
          Turning point
        </text>
        <circle className="rc-dot rc-drop" cx={x(drop)} cy={y(temp)} r={6} />
        <text className="rc-label" x={x(drop) + 12} y={y(temp) + 4}>
          Drop {temp}°
        </text>
      </svg>
      <figcaption>
        <span>
          Drop <b>{clock(drop)}</b>
        </span>
        <span>
          Development <b>{clock(dev)}</b>
        </span>
        <span>
          Development ratio <b>{Math.round((dev / drop) * 100)}%</b>
        </span>
      </figcaption>
    </figure>
  );
}
