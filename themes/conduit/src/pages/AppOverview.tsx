import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { app, connections, connectors, traffic } from "../content";
import { num } from "../lib/format";
import { Mark } from "../components/bits";

const W = 720;
const H = 220;

export default function AppOverview() {
  const [hour, setHour] = useState(13);
  const total = traffic.reduce((s, [ok, bad]) => s + ok + bad, 0);
  const failed = traffic.reduce((s, [, bad]) => s + bad, 0);
  const peak = Math.max(...traffic.map(([ok, bad]) => ok + bad));
  const bw = W / traffic.length;
  const attention = connections.filter((c) => c.state !== "healthy");
  const [ok, bad] = traffic[hour];
  const label = (h: number) => `${String(h).padStart(2, "0")}:00`;

  return (
    <div className="app-page">
      <header className="app-head">
        <h1>Overview</h1>
        <p className="muted">
          {app.workspace} · last 24 hours · signed in as {app.user.name}
        </p>
      </header>

      <dl className="kpis">
        <div>
          <dt>Requests</dt>
          <dd className="tabular">{num(total)}</dd>
        </div>
        <div>
          <dt>Success rate</dt>
          <dd className="tabular">
            {((1 - failed / total) * 100).toFixed(2)}%
          </dd>
        </div>
        <div>
          <dt>Failed after retries</dt>
          <dd className="tabular">{num(failed)}</dd>
        </div>
        <div>
          <dt>p95 latency</dt>
          <dd className="tabular">412 ms</dd>
        </div>
      </dl>

      <section className="panel" aria-labelledby="traffic-h">
        <div className="panel-head">
          <h2 id="traffic-h">Requests per hour</h2>
          <p className="muted tabular" aria-live="polite">
            {label(hour)} — {num(ok)} delivered, {num(bad)} failed
          </p>
        </div>
        <svg
          className="traffic"
          viewBox={`0 0 ${W} ${H + 24}`}
          role="group"
          aria-label="Requests per hour, select a bar to read its values"
        >
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1={0}
              x2={W}
              y1={H - g * H}
              y2={H - g * H}
              className="gridline"
            />
          ))}
          {traffic.map(([okN, badN], i) => {
            const hOk = (okN / peak) * (H - 8);
            const hBad = Math.max(badN ? 2 : 0, (badN / peak) * (H - 8) * 6);
            return (
              <g
                key={i}
                className="bar"
                data-active={i === hour ? "" : undefined}
                tabIndex={0}
                role="button"
                aria-label={`${label(i)}: ${num(okN)} delivered, ${num(badN)} failed`}
                onMouseEnter={() => setHour(i)}
                onFocus={() => setHour(i)}
                onClick={() => setHour(i)}
              >
                <rect
                  x={i * bw + 2}
                  y={0}
                  width={bw - 4}
                  height={H}
                  className="bar-hit"
                />
                <rect
                  x={i * bw + 3}
                  y={H - hOk}
                  width={bw - 6}
                  height={hOk}
                  rx={2}
                  className="bar-ok"
                />
                <rect
                  x={i * bw + 3}
                  y={H - hOk - hBad - 2}
                  width={bw - 6}
                  height={hBad}
                  rx={1}
                  className="bar-bad"
                />
              </g>
            );
          })}
          {[0, 6, 12, 18, 23].map((h) => (
            <text
              key={h}
              x={h === 0 ? 2 : h === 23 ? W - 2 : h * bw + bw / 2}
              y={H + 18}
              textAnchor={h === 0 ? "start" : h === 23 ? "end" : "middle"}
              className="axis-label"
            >
              {label(h)}
            </text>
          ))}
        </svg>
        <p className="muted small">
          Failures are drawn at 6× scale so they stay visible. The 13:00 spike
          was Ferryline returning 503s.
        </p>
      </section>

      <section className="panel" aria-labelledby="attention-h">
        <div className="panel-head">
          <h2 id="attention-h">Needs attention</h2>
          <Link to="/app/connections" className="link-arrow">
            All connections <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
        <ul className="attention">
          {attention.map((c) => {
            const cx = connectors.find((x) => x.slug === c.connector)!;
            return (
              <li key={c.id}>
                <Mark connector={cx} size="sm" />
                <span>
                  <strong>{c.name}</strong>
                  <span className="muted">
                    {c.state === "paused"
                      ? "Paused by Priya — no requests are sent."
                      : `${c.errorRate}% errors, p95 ${c.p95} ms. Upstream is returning 503s intermittently.`}
                  </span>
                </span>
                <span className="state-label" data-state={c.state}>
                  {c.state}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
