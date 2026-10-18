import { ArrowRight, Clock } from "lucide-react";
import { Link } from "../router";
import { app, jobs, stages, today, weeklyApplicants } from "../content";
import { useDemo } from "../lib/store";
import { daysBetween, formatDate, stageLabel } from "../lib/format";
import { BarChart, StageBars } from "../components/Charts";
import { Avatar } from "../components/Visuals";

/** Days a candidate may wait at a stage before the stage promise is at risk. */
const promiseDays: Record<string, number> = {
  applied: 1,
  screen: 5,
  interview: 7,
  final: 5,
  offer: 5,
};

export default function AppOverview() {
  const { candidates } = useDemo();
  const open = new Set(
    jobs.filter((j) => j.status === "Open").map((j) => j.id),
  );
  const active = candidates.filter((c) => open.has(c.jobId));
  const todays = candidates.filter((c) => c.next?.when.startsWith("Today"));
  const atRisk = active
    .filter(
      (c) =>
        c.stage in promiseDays &&
        daysBetween(c.since, today) > promiseDays[c.stage],
    )
    .sort((a, b) => daysBetween(b.since, today) - daysBetween(a.since, today));
  const sources = ["Referral", "Careers page", "Job board", "Sourced"].map(
    (s) => ({
      label: s,
      count: active.filter((c) => c.source === s).length,
    }),
  );

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Good morning, {app.user.name.split(" ")[0]}</h1>
          <p>
            {new Date(today + "T12:00:00").toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            · {todays.length} interviews today · {atRisk.length} candidates
            waiting longer than promised
          </p>
        </div>
        <Link to="/app/candidates" className="btn btn-quiet">
          All candidates
        </Link>
      </header>

      <div className="app-grid">
        <section className="panel" aria-labelledby="h-today">
          <h2 id="h-today">Today's interviews</h2>
          <ul className="list">
            {todays.map((c) => (
              <li key={c.id}>
                <Avatar name={c.name} size="sm" />
                <span className="list-main">
                  <Link to={`/app/candidates/${c.id}`}>{c.name}</Link>
                  <small>
                    {c.next!.step} · {jobs.find((j) => j.id === c.jobId)!.title}
                  </small>
                </span>
                <span className="num list-time">
                  {c.next!.when.replace("Today, ", "")}
                </span>
                <Link to={`/app/kit/${c.id}`} className="btn btn-small">
                  Open kit
                </Link>
              </li>
            ))}
            {!todays.length && (
              <li className="empty-row">
                No interviews left today. Every scorecard is in.
              </li>
            )}
          </ul>
        </section>

        <section className="panel" aria-labelledby="h-risk">
          <h2 id="h-risk">Waiting longer than promised</h2>
          <ul className="list">
            {atRisk.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Avatar name={c.name} size="sm" />
                <span className="list-main">
                  <Link to={`/app/candidates/${c.id}`}>{c.name}</Link>
                  <small>
                    {stageLabel(c.stage)} since {formatDate(c.since)}
                  </small>
                </span>
                <span className="wait num">
                  <Clock size={14} aria-hidden /> {daysBetween(c.since, today)}{" "}
                  days
                </span>
              </li>
            ))}
            {!atRisk.length && (
              <li className="empty-row">
                Every candidate has heard from you on time.
              </li>
            )}
          </ul>
        </section>

        <section className="panel panel-wide" aria-labelledby="h-weekly">
          <div className="panel-head">
            <h2 id="h-weekly">Applicants per week</h2>
            <span className="muted">Last 12 weeks · this week so far</span>
          </div>
          <BarChart
            data={weeklyApplicants}
            label="Applicants per week over the last twelve weeks, peaking at 45 in the week of September 21; 14 so far this week"
          />
        </section>

        <section className="panel" aria-labelledby="h-stages">
          <h2 id="h-stages">Open roles by stage</h2>
          <StageBars
            rows={stages.map((s) => ({
              label: s.label,
              count: active.filter((c) => c.stage === s.id).length,
            }))}
          />
        </section>

        <section className="panel" aria-labelledby="h-sources">
          <h2 id="h-sources">Where candidates come from</h2>
          <StageBars rows={sources} />
          <Link to="/app/jobs" className="text-link">
            Pipelines by role <ArrowRight size={16} aria-hidden />
          </Link>
        </section>
      </div>
    </div>
  );
}
