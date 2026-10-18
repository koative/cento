import { useState } from "react";
import { app, history, owners } from "../content";
import { isOpen, setForecast, useWorkspace } from "../lib/store";
import { money } from "../lib/format";
import { Attainment, StageBars, WonChart } from "../components/Charts";
import { ForecastCall } from "../components/ForecastCall";

export default function AppReports() {
  const { deals } = useWorkspace();
  const [rep, setRep] = useState("all");
  const mine = rep === "all" ? deals : deals.filter((d) => d.owner === rep);
  const quota =
    rep === "all"
      ? owners.reduce((n, o) => n + o.quota, 0)
      : owners.find((o) => o.id === rep)!.quota;
  const won = mine.filter((d) => d.stage === "won");
  const lost = mine.filter((d) => d.stage === "lost");
  const wonValue = won.reduce((n, d) => n + d.value, 0);
  const closed = won.length + lost.length;
  const open = mine.filter(isOpen);

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Reports</h1>
          <p className="app-sub">
            {app.quarter} · week of Oct 12 · {open.length} open deals
          </p>
        </div>
        <div className="field field-inline">
          <label htmlFor="rep">Showing</label>
          <select id="rep" value={rep} onChange={(e) => setRep(e.target.value)}>
            <option value="all">Whole team</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="report" aria-labelledby="h-call">
        <div className="report-head">
          <h2 id="h-call">Forecast call</h2>
          <p>Calls here update the board and the attainment table below.</p>
        </div>
        <ForecastCall
          name="reports"
          deals={mine}
          quota={quota}
          onChange={setForecast}
        />
      </section>

      <div className="report-grid">
        <section className="sheet report" aria-labelledby="h-won">
          <h2 id="h-won">Won by month</h2>
          <WonChart
            months={[
              ...history,
              {
                month: "Oct",
                won: deals
                  .filter((d) => d.stage === "won")
                  .reduce((n, d) => n + d.value, 0),
                target: 210000,
              },
            ]}
          />
          <p className="chart-key">
            <i className="key-bar" /> Won (team) <i className="key-target" />{" "}
            Monthly target · October updates as deals close
          </p>
        </section>

        <section className="sheet report" aria-labelledby="h-stage">
          <h2 id="h-stage">Pipeline by stage</h2>
          <StageBars deals={mine} />
          <dl className="report-facts">
            <div>
              <dt>Win rate this quarter</dt>
              <dd className="num">
                {closed ? Math.round((won.length / closed) * 100) : 0}%
              </dd>
            </div>
            <div>
              <dt>Average won deal</dt>
              <dd className="num">
                {won.length ? money(wonValue / won.length) : "—"}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="sheet report" aria-labelledby="h-attain">
        <h2 id="h-attain">Attainment by rep</h2>
        <div
          className="table-scroll"
          role="region"
          aria-labelledby="h-attain"
          tabIndex={0}
        >
          <Attainment deals={deals} />
        </div>
      </section>
    </div>
  );
}
