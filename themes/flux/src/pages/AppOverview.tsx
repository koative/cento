import { ArrowRight, TriangleAlert } from "lucide-react";
import { Link } from "../router";
import { brand, demoRuns, runsByDay, usage } from "../content";
import { useWorkflows } from "../lib/workspace";
import { RunStatusTag } from "../components/RunStatusTag";

function RunsChart() {
  const max = Math.max(...runsByDay.map((d) => d.ok + d.failed));
  const h = 180;
  const bw = 100 / runsByDay.length;
  return (
    <figure className="chart">
      <svg
        viewBox={`0 0 100 ${h}`}
        preserveAspectRatio="none"
        role="img"
        aria-labelledby="chart-cap"
      >
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            x2="100"
            y1={h - f * h}
            y2={h - f * h}
            className="chart-grid"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {runsByDay.map((d, i) => {
          const okH = (d.ok / max) * (h - 8);
          const failH = Math.max(d.failed ? 2 : 0, (d.failed / max) * (h - 8));
          return (
            <g key={d.day}>
              <title>{`${d.day}: ${d.ok} succeeded, ${d.failed} failed`}</title>
              <rect
                x={i * bw + bw * 0.18}
                width={bw * 0.64}
                y={h - okH}
                height={okH}
                className="bar-ok"
              />
              <rect
                x={i * bw + bw * 0.18}
                width={bw * 0.64}
                y={h - okH - failH - 1}
                height={failH}
                className="bar-fail"
              />
            </g>
          );
        })}
      </svg>
      <div className="chart-axis" aria-hidden="true">
        {runsByDay.map((d, i) => (
          <span key={d.day}>
            {i % 2 === 0 ? d.day.replace("Oct ", "") : ""}
          </span>
        ))}
      </div>
      <figcaption id="chart-cap">
        Runs per day, October 5–18.{" "}
        <span className="key key-ok">Succeeded</span>{" "}
        <span className="key key-fail">Failed</span>
      </figcaption>
    </figure>
  );
}

export default function AppOverview() {
  const workflows = useWorkflows();
  const total = runsByDay.reduce((n, d) => n + d.ok + d.failed, 0);
  const failed = runsByDay.reduce((n, d) => n + d.failed, 0);
  const live = workflows.filter((w) => w.on).length;
  const attention = workflows
    .filter((w) => w.failed30 > 0)
    .sort((a, b) => b.failed30 / b.runs30 - a.failed30 / a.runs30);

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Overview</h1>
          <p>
            {brand.workspace} · {usage.today}
          </p>
        </div>
        <Link to="/app/workflows" className="btn btn-plum">
          Open workflows
        </Link>
      </header>

      <dl className="app-stats">
        <div>
          <dt>Runs, last 14 days</dt>
          <dd className="num">{total.toLocaleString("en-US")}</dd>
        </div>
        <div>
          <dt>Succeeded</dt>
          <dd className="num">
            {(((total - failed) / total) * 100).toFixed(1)}%
          </dd>
        </div>
        <div>
          <dt>Live workflows</dt>
          <dd className="num">
            {live} <small>of {workflows.length}</small>
          </dd>
        </div>
        <div>
          <dt>Runs used this month, {usage.plan} plan</dt>
          <dd className="num">
            {usage.used.toLocaleString("en-US")}{" "}
            <small>of {usage.included.toLocaleString("en-US")}</small>
          </dd>
        </div>
      </dl>

      <div className="app-cols">
        <section className="panel panel-wide" aria-labelledby="chart-h">
          <h2 id="chart-h">Run volume</h2>
          <RunsChart />
        </section>

        <section className="panel" aria-labelledby="attn-h">
          <h2 id="attn-h">Needs attention</h2>
          {attention.length ? (
            <ul className="attention">
              {attention.map((w) => (
                <li key={w.id}>
                  <TriangleAlert size={16} aria-hidden />
                  <div>
                    <Link to={`/app/workflows/${w.id}`}>{w.name}</Link>
                    <span>
                      {w.failed30} failed of {w.runs30.toLocaleString("en-US")}{" "}
                      runs · owner {w.owner}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nothing failed in the last 30 days.</p>
          )}
        </section>

        <section className="panel panel-wide" aria-labelledby="recent-h">
          <div className="panel-head">
            <h2 id="recent-h">Latest runs</h2>
            <Link to="/app/runs" className="text-link">
              Run history <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-labelledby="recent-h"
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Workflow</th>
                  <th scope="col">Started</th>
                  <th scope="col">Steps</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {demoRuns.slice(0, 6).map((r) => {
                  const w = workflows.find((x) => x.id === r.workflow)!;
                  return (
                    <tr key={r.id}>
                      <td>
                        <Link to={`/app/workflows/${w.id}`}>{w.name}</Link>
                      </td>
                      <td className="num">{r.started}</td>
                      <td className="num">{r.steps}</td>
                      <td>
                        <RunStatusTag status={r.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
