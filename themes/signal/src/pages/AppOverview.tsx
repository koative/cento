import { useState } from "react";
import { Download } from "lucide-react";
import { app, cohorts, dayLabels, wave } from "../content";
import { BarList, CohortGrid, LineChart } from "../components/Charts";
import { Delta, compact, num, usdCompact } from "../components/format";

const RANGES = [7, 30, 90];
const FORMATS = {
  count: (n: number) => num.format(Math.round(n)),
  percent: (n: number) => `${n.toFixed(1)}%`,
  money: (n: number) => usdCompact.format(n),
};

export default function AppOverview() {
  const [days, setDays] = useState(30);
  const [metricId, setMetricId] = useState(app.metrics[0].id);
  const [compare, setCompare] = useState(true);
  const [exported, setExported] = useState("");

  const data = app.metrics.map((m, i) => {
    const current = wave(17 + i * 7 + days, days, m.base, 0.12, 0.004);
    const previous = wave(
      53 + i * 11 + days,
      days,
      m.base * (0.9 + i * 0.015),
      0.12,
      0.002,
    );
    const agg = (v: number[]) =>
      m.agg === "sum"
        ? v.reduce((a, b) => a + b, 0)
        : v.reduce((a, b) => a + b, 0) / v.length;
    return {
      m,
      current,
      previous,
      value: agg(current),
      change: ((agg(current) - agg(previous)) / agg(previous)) * 100,
    };
  });
  const selected = data.find((d) => d.m.id === metricId)!;
  const format = FORMATS[selected.m.format];
  const labels = dayLabels(days);
  const annotations = app.annotations
    .filter((a) => a.daysAgo < days)
    .map((a) => ({ index: days - 1 - a.daysAgo, label: a.label }));

  function exportCsv() {
    const rows = [
      ["date", selected.m.label, "previous period"],
      ...labels.map((l, i) => [l, selected.current[i], selected.previous[i]]),
    ];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], {
      type: "text/csv",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `signal-${selected.m.id}-${days}d.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    setExported(
      `Downloaded ${days} days of ${selected.m.label.toLowerCase()} as CSV.`,
    );
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Overview</h1>
          <p>
            {app.workspace} · {app.environment} · all platforms
          </p>
        </div>
        <div className="app-controls">
          <div className="segmented" role="radiogroup" aria-label="Date range">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={days === r}
                onClick={() => setDays(r)}
              >
                {r}d
              </button>
            ))}
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={compare}
              onChange={(e) => setCompare(e.target.checked)}
            />
            <span>Compare to previous</span>
          </label>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={exportCsv}
          >
            <Download size={15} aria-hidden /> Export CSV
          </button>
        </div>
      </header>
      <p className="visually-hidden" role="status">
        {exported}
      </p>

      <div className="kpis" role="radiogroup" aria-label="Chart metric">
        {data.map((d) => (
          <button
            key={d.m.id}
            type="button"
            role="radio"
            aria-checked={metricId === d.m.id}
            onClick={() => setMetricId(d.m.id)}
          >
            <span className="kpi-label">{d.m.label}</span>
            <span className="kpi-value num">
              {FORMATS[d.m.format](d.value)}
            </span>
            <Delta value={d.change} />
          </button>
        ))}
      </div>

      <section className="app-card" aria-labelledby="main-chart">
        <div className="panel-head">
          <h2 id="main-chart">
            {selected.m.label}, last {days} days
          </h2>
          <span className="panel-meta">
            Hover or focus the chart and use arrow keys
          </span>
        </div>
        <LineChart
          label={`${selected.m.label} per day`}
          labels={labels}
          format={format}
          annotations={annotations}
          series={[
            { label: "This period", values: selected.current },
            ...(compare
              ? [
                  {
                    label: "Previous period",
                    values: selected.previous,
                    tone: "compare" as const,
                    dashed: true,
                  },
                ]
              : []),
          ]}
        />
      </section>

      <div className="app-grid">
        <section className="app-card" aria-labelledby="sources">
          <div className="panel-head">
            <h2 id="sources">Where visitors came from</h2>
            <span className="panel-meta">Share of sessions</span>
          </div>
          <BarList rows={app.sources} format={(n) => `${n.toFixed(1)}%`} />
        </section>
        <section className="app-card" aria-labelledby="pages">
          <div className="panel-head">
            <h2 id="pages">Top pages</h2>
            <span className="panel-meta">Views, last 30 days</span>
          </div>
          <table className="data-table compact">
            <thead>
              <tr>
                <th scope="col">Path</th>
                <th scope="col" className="r">
                  Views
                </th>
                <th scope="col" className="r">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {app.pages.map((p) => (
                <tr key={p.path}>
                  <td>
                    <code>{p.path}</code>
                  </td>
                  <td className="r num">{compact.format(p.views)}</td>
                  <td className="r">
                    <Delta value={p.change} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <section className="app-card" aria-labelledby="retention">
        <div className="panel-head">
          <h2 id="retention">Weekly retention</h2>
          <span className="panel-meta">
            Returned and did anything, by first-visit week
          </span>
        </div>
        <CohortGrid cohorts={cohorts} />
      </section>
    </div>
  );
}
