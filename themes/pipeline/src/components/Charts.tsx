import { owners, stages, type Deal } from "../content";
import { money, short } from "../lib/format";
import { isOpen } from "../lib/store";

type Month = { month: string; won: number; target: number };

/** Won revenue per month as bars, with each month's target drawn as a rule across its bar. */
export function WonChart({ months }: { months: Month[] }) {
  const W = 640;
  const H = 260;
  const pad = { top: 16, right: 8, bottom: 32, left: 48 };
  const max =
    Math.ceil(Math.max(...months.flatMap((m) => [m.won, m.target])) / 50000) *
    50000;
  const y = (v: number) => pad.top + (1 - v / max) * (H - pad.top - pad.bottom);
  const band = (W - pad.left - pad.right) / months.length;
  const ticks = Array.from({ length: max / 50000 + 1 }, (_, i) => i * 50000);

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby="won-title won-desc"
    >
      <title id="won-title">Won revenue by month against target</title>
      <desc id="won-desc">
        {months
          .map(
            (m) => `${m.month}: won ${money(m.won)}, target ${money(m.target)}`,
          )
          .join("; ")}
      </desc>
      {ticks.map((t) => (
        <g key={t}>
          <line
            className="grid"
            x1={pad.left}
            x2={W - pad.right}
            y1={y(t)}
            y2={y(t)}
          />
          <text className="axis" x={pad.left - 8} y={y(t) + 4} textAnchor="end">
            {short(t)}
          </text>
        </g>
      ))}
      {months.map((m, i) => {
        const x = pad.left + i * band + band * 0.2;
        const w = band * 0.6;
        const hit = m.won >= m.target;
        return (
          <g key={m.month}>
            <rect
              className={hit ? "bar bar-hit" : "bar"}
              x={x}
              y={y(m.won)}
              width={w}
              height={y(0) - y(m.won)}
              rx="3"
            />
            <line
              className="target"
              x1={x - 6}
              x2={x + w + 6}
              y1={y(m.target)}
              y2={y(m.target)}
            />
            <text className="axis" x={x + w / 2} y={H - 10} textAnchor="middle">
              {m.month}
            </text>
            <text
              className="bar-label"
              x={x + w / 2}
              y={Math.min(y(m.won), y(m.target)) - 6}
              textAnchor="middle"
            >
              {short(m.won)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Open pipeline per stage: one horizontal bar per stage, value and count. */
export function StageBars({ deals }: { deals: Deal[] }) {
  const rows = stages
    .filter((s) => s.id !== "lost")
    .map((s) => {
      const inStage = deals.filter((d) => d.stage === s.id);
      return {
        ...s,
        count: inStage.length,
        value: inStage.reduce((n, d) => n + d.value, 0),
      };
    });
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <ul className="hbars">
      {rows.map((r) => (
        <li key={r.id}>
          <span className="hbar-label">{r.label}</span>
          <span className="hbar-track">
            <span
              className={r.id === "won" ? "hbar hbar-won" : "hbar"}
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </span>
          <span className="num hbar-value">
            {short(r.value)}{" "}
            <small>
              {r.count} {r.count === 1 ? "deal" : "deals"}
            </small>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Quota attainment per rep: won as a solid bar, commit as a lighter extension, quota as 100%. */
export function Attainment({ deals }: { deals: Deal[] }) {
  return (
    <table className="data attain">
      <thead>
        <tr>
          <th scope="col">Rep</th>
          <th scope="col">Won + commit against quota</th>
          <th scope="col" className="num">
            Won
          </th>
          <th scope="col" className="num">
            Commit
          </th>
          <th scope="col" className="num">
            Quota
          </th>
        </tr>
      </thead>
      <tbody>
        {owners.map((o) => {
          const mine = deals.filter((d) => d.owner === o.id);
          const won = mine
            .filter((d) => d.stage === "won")
            .reduce((n, d) => n + d.value, 0);
          const commit = mine
            .filter((d) => isOpen(d) && d.forecast === "commit")
            .reduce((n, d) => n + d.value, 0);
          const pct = (n: number) => `${Math.min(100, (n / o.quota) * 100)}%`;
          return (
            <tr key={o.id}>
              <th scope="row">{o.name}</th>
              <td>
                <span
                  className="attain-track"
                  role="img"
                  aria-label={`${Math.round(((won + commit) / o.quota) * 100)}% of quota`}
                >
                  <span className="seg-won" style={{ width: pct(won) }} />
                  <span className="seg-commit" style={{ width: pct(commit) }} />
                </span>
              </td>
              <td className="num">{short(won)}</td>
              <td className="num">{short(commit)}</td>
              <td className="num">{short(o.quota)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
