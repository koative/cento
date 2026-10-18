import { money } from "../lib/format";

const W = 640;
const H = 240;
const PAD = { l: 52, r: 12, t: 12, b: 28 };

/** Cumulative spending this month against last month, day by day. */
export function PaceChart({
  thisMonth,
  lastMonth,
  hidden,
}: {
  thisMonth: number[];
  lastMonth: number[];
  hidden: boolean;
}) {
  const max = Math.ceil(Math.max(...lastMonth, ...thisMonth) / 1000) * 1000;
  const days = 31;
  const x = (i: number) => PAD.l + (i / (days - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => H - PAD.b - (v / max) * (H - PAD.t - PAD.b);
  const line = (vals: number[]) =>
    vals
      .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
      .join("");
  const ticks = Array.from({ length: max / 1000 + 1 }, (_, i) => i * 1000);
  const today = thisMonth.length - 1;
  const last = thisMonth[today];

  return (
    <figure className="chart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Spending so far this month ${hidden ? "hidden" : money(last, { cents: false })} by day ${today + 1}, against ${money(lastMonth[today], { cents: false })} by the same day last month.`}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(t)}
              y2={y(t)}
              className="chart-grid"
            />
            <text
              x={PAD.l - 8}
              y={y(t) + 4}
              className="chart-label"
              textAnchor="end"
            >
              {hidden ? "—" : `$${t / 1000}k`}
            </text>
          </g>
        ))}
        {[1, 8, 15, 22, 29].map((d) => (
          <text
            key={d}
            x={x(d - 1)}
            y={H - 8}
            className="chart-label"
            textAnchor="middle"
          >
            Oct {d}
          </text>
        ))}
        <path d={line(lastMonth)} className="chart-line chart-line-prev" />
        <path d={line(thisMonth)} className="chart-line chart-line-now" />
        <line
          x1={x(today)}
          x2={x(today)}
          y1={PAD.t}
          y2={H - PAD.b}
          className="chart-today"
        />
        <circle cx={x(today)} cy={y(last)} r="5" className="chart-dot" />
      </svg>
      <figcaption className="chart-legend">
        <span className="key key-now">October</span>
        <span className="key key-prev">September</span>
      </figcaption>
    </figure>
  );
}

/** Month-end balances as bars; debts are drawn by how much is owed. */
export function BalanceChart({
  months,
  values,
  hidden,
}: {
  months: string[];
  values: number[];
  hidden: boolean;
}) {
  const debt = values.every((v) => v <= 0);
  const abs = values.map(Math.abs);
  const max = Math.max(...abs) * 1.15;
  const bw = (W - PAD.l - PAD.r) / months.length;
  const y = (v: number) => H - PAD.b - (v / max) * (H - PAD.t - PAD.b);

  return (
    <figure className="chart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${debt ? "Amount owed" : "Balance"} at month end: ${months.map((m, i) => `${m} ${hidden ? "hidden" : money(abs[i], { cents: false })}`).join(", ")}.`}
      >
        <line
          x1={PAD.l}
          x2={W - PAD.r}
          y1={H - PAD.b}
          y2={H - PAD.b}
          className="chart-base"
        />
        {abs.map((v, i) => (
          <g key={months[i]}>
            <rect
              x={PAD.l + i * bw + bw * 0.2}
              y={y(v)}
              width={bw * 0.6}
              height={H - PAD.b - y(v)}
              rx="4"
              className={
                i === abs.length - 1 ? "chart-bar chart-bar-now" : "chart-bar"
              }
              data-debt={debt ? "" : undefined}
            />
            {!hidden && (
              <text
                x={PAD.l + i * bw + bw / 2}
                y={y(v) - 8}
                className="chart-value"
                textAnchor="middle"
              >
                {money(v, { cents: false })}
              </text>
            )}
            <text
              x={PAD.l + i * bw + bw / 2}
              y={H - 8}
              className="chart-label"
              textAnchor="middle"
            >
              {months[i]}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="chart-legend">
        {debt ? "Owed at month end" : "Balance at month end"}
      </figcaption>
    </figure>
  );
}
