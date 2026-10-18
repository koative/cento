import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { app, modeLabel, type Mode } from "../content";
import { useApp } from "../lib/store";
import { hub } from "../lib/geo";
import { eur, num, when } from "../lib/format";
import { schedule } from "../lib/shipment";
import { StatusPill } from "../components/Waybill";

const MODES: Mode[] = ["road", "rail", "sea", "air"];

/** Stacked weekly volume by mode, with a keyboard/hover readout. */
function VolumeChart() {
  const [active, setActive] = useState(app.weeks.length - 2);
  const totals = app.weeks.map((_, i) =>
    MODES.reduce((sum, m) => sum + app.volume[m][i], 0),
  );
  const max = Math.ceil(Math.max(...totals) / 20) * 20;
  const W = 600;
  const H = 220;
  const bw = W / app.weeks.length;

  return (
    <figure className="chart">
      <figcaption>
        <span>Shipments per week</span>
        <span className="chart-readout num" aria-live="polite">
          {app.weeks[active]}: {totals[active]} ·{" "}
          {MODES.map((m) => `${modeLabel[m]} ${app.volume[m][active]}`).join(
            " · ",
          )}
        </span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H + 24}`}
        role="slider"
        tabIndex={0}
        aria-label="Week"
        aria-valuemin={1}
        aria-valuemax={app.weeks.length}
        aria-valuenow={active + 1}
        aria-valuetext={`${app.weeks[active]}, ${totals[active]} shipments`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setActive((a) => Math.max(0, a - 1));
          if (e.key === "ArrowRight")
            setActive((a) => Math.min(app.weeks.length - 1, a + 1));
        }}
      >
        {[0, 0.5, 1].map((f) => (
          <g key={f} className="grid">
            <line x1="0" x2={W} y1={H - f * H} y2={H - f * H} />
            <text x="2" y={H - f * H - 4}>
              {f * max}
            </text>
          </g>
        ))}
        {app.weeks.map((w, i) => {
          let y = H;
          return (
            <g
              key={w}
              className={`bar-group ${i === active ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <rect
                x={i * bw}
                y="0"
                width={bw}
                height={H}
                className="bar-hit"
              />
              {MODES.map((m) => {
                const h = (app.volume[m][i] / max) * H;
                y -= h;
                return (
                  <rect
                    key={m}
                    x={i * bw + bw * 0.2}
                    y={y}
                    width={bw * 0.6}
                    height={h}
                    className={`seg seg-${m}`}
                  />
                );
              })}
              <text
                x={i * bw + bw / 2}
                y={H + 18}
                textAnchor="middle"
                className="axis"
              >
                {w}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="legend">
        {MODES.map((m) => (
          <li key={m}>
            <span className={`swatch seg-${m}`} aria-hidden /> {modeLabel[m]}
          </li>
        ))}
      </ul>
    </figure>
  );
}

function OnTimeChart() {
  const W = 600;
  const H = 140;
  const lo = 92;
  const hi = 100;
  const pts = app.onTime.map((v, i) => [
    (i / (app.onTime.length - 1)) * W,
    H - ((v - lo) / (hi - lo)) * H,
  ]);
  const d = pts
    .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const last = app.onTime[app.onTime.length - 1];
  return (
    <figure className="chart">
      <figcaption>
        <span>On-time delivery</span>
        <span className="num">{last}% this week · target 96%</span>
      </figcaption>
      <svg
        viewBox={`-4 -8 ${W + 8} ${H + 16}`}
        role="img"
        aria-label={`On-time delivery by week, from ${app.onTime[0]}% to ${last}%`}
      >
        <line
          x1="0"
          x2={W}
          y1={H - ((96 - lo) / (hi - lo)) * H}
          y2={H - ((96 - lo) / (hi - lo)) * H}
          className="target"
        />
        <path d={`${d} L${W},${H} L0,${H} Z`} className="area" />
        <path d={d} className="line" pathLength={1} />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3.5" className="dot" />
        ))}
      </svg>
    </figure>
  );
}

export default function AppOverview() {
  const { shipments } = useApp();
  const open = shipments.filter((s) => s.status !== "Delivered");
  const moving = shipments.filter(
    (s) => s.status === "In transit" || s.status === "Out for delivery",
  );
  const exceptions = shipments.filter((s) => s.status === "Exception");
  const spend = shipments.reduce((sum, s) => sum + s.cost, 0);
  const maxLane = Math.max(...app.spendByLane.map((l) => l.value));

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Overview</h1>
          <p className="muted">Monday 19 October, 10:40 · sample data</p>
        </div>
        <Link to="/app/shipments" className="btn btn-ghost">
          All shipments <ArrowRight size={16} aria-hidden />
        </Link>
      </header>

      <dl className="kpis">
        <div>
          <dt>Open shipments</dt>
          <dd className="num">{open.length}</dd>
        </div>
        <div>
          <dt>Moving now</dt>
          <dd className="num">{moving.length}</dd>
        </div>
        <div className={exceptions.length ? "is-alert" : ""}>
          <dt>Exceptions</dt>
          <dd className="num">{exceptions.length}</dd>
        </div>
        <div>
          <dt>Spend, October</dt>
          <dd className="num">{eur(spend)}</dd>
        </div>
      </dl>

      <div className="app-grid">
        <section className="panel span-2" aria-label="Volume">
          <VolumeChart />
        </section>
        <section className="panel" aria-labelledby="exc-title">
          <h2 id="exc-title">Needs attention</h2>
          {exceptions.length ? (
            <ul className="exc-list">
              {exceptions.map((s) => (
                <li key={s.id}>
                  <Link to={`/app/shipments/${s.id}`}>
                    <span className="num">{s.id}</span>
                    <span>{s.exception}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">
              No open exceptions. Every shipment is moving to plan.
            </p>
          )}
        </section>
        <section className="panel span-2" aria-label="On-time delivery">
          <OnTimeChart />
        </section>
        <section className="panel" aria-labelledby="lane-title">
          <h2 id="lane-title">Spend by lane, 90 days</h2>
          <ul className="bar-list">
            {app.spendByLane.map((l) => (
              <li key={l.lane}>
                <span className="num">{l.lane}</span>
                <span className="bar-track" aria-hidden>
                  <span style={{ width: `${(l.value / maxLane) * 100}%` }} />
                </span>
                <span className="num">{eur(l.value)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="panel span-3" aria-labelledby="moving-title">
          <h2 id="moving-title">Moving now</h2>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Shipment</th>
                  <th scope="col">Lane</th>
                  <th scope="col">Progress</th>
                  <th scope="col">ETA</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {moving.map((s) => (
                  <tr key={s.id}>
                    <th scope="row">
                      <Link to={`/app/shipments/${s.id}`} className="num">
                        {s.id}
                      </Link>
                    </th>
                    <td>
                      {hub(s.route[0]).city} →{" "}
                      {hub(s.route[s.route.length - 1]).city}
                    </td>
                    <td>
                      <span
                        className="progress"
                        role="img"
                        aria-label={`${num(s.progress * 100)}% of the route`}
                      >
                        <span style={{ width: `${s.progress * 100}%` }} />
                      </span>
                    </td>
                    <td className="num">{when(schedule(s).eta)}</td>
                    <td>
                      <StatusPill status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
