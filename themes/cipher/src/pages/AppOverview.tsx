import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "../router";
import { app, grants } from "../content";
import { identityOf, useReview } from "../lib/review";
import { LineChart, StackedBars, type BarRow } from "../components/Charts";
import { Avatar, RiskTag } from "../components/bits";
import { VerdictMark } from "../components/Review";

export default function AppOverview() {
  const { decisions, signedAt } = useReview();
  const decided = Object.keys(decisions).length;
  const kept = Object.values(decisions).filter(
    (d) => d.verdict === "keep",
  ).length;
  const revoked = decided - kept;
  const urgent = grants.filter((g) => g.risk === "high" && !decisions[g.id]);

  const byDept: Record<string, BarRow> = {};
  for (const g of grants) {
    const dept = identityOf(g).dept;
    const row = (byDept[dept] ??= {
      label: dept,
      kept: 0,
      revoked: 0,
      open: 0,
    });
    row[
      decisions[g.id]?.verdict === "keep"
        ? "kept"
        : decisions[g.id]
          ? "revoked"
          : "open"
    ]++;
  }
  const rows = Object.values(byDept).sort(
    (a, b) => b.kept + b.revoked + b.open - (a.kept + a.revoked + a.open),
  );
  const recent = Object.entries(decisions).slice(-5).reverse();

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>{app.campaign}</h1>
          <p>
            {app.framework} · due {app.due} · {app.daysLeft} days left
          </p>
        </div>
        <Link to="/app/review" className="btn btn-primary">
          Open the review queue <ArrowRight size={16} aria-hidden />
        </Link>
      </header>

      <section className="panel progress-panel" aria-labelledby="prog-title">
        <h2 id="prog-title" className="panel-title">
          Campaign progress
        </h2>
        <p className="progress-line num">
          <strong>{decided}</strong> of {grants.length} grants decided · {kept}{" "}
          kept · {revoked} revoked · {grants.length - decided} open
        </p>
        <div
          className="seg-bar"
          role="img"
          aria-label={`${kept} kept, ${revoked} revoked, ${grants.length - decided} open`}
        >
          <span
            data-kind="kept"
            style={{ width: `${(kept / grants.length) * 100}%` }}
          />
          <span
            data-kind="revoked"
            style={{ width: `${(revoked / grants.length) * 100}%` }}
          />
        </div>
        {signedAt ? (
          <p className="form-success">
            Attestation signed {signedAt}. Evidence pack sealed.
          </p>
        ) : decided === grants.length ? (
          <Link to="/app/review" className="text-link">
            Every grant is decided. Sign the attestation{" "}
            <ArrowRight size={16} aria-hidden />
          </Link>
        ) : null}
      </section>

      <div className="app-grid">
        <section className="panel" aria-labelledby="trend-title">
          <h2 id="trend-title" className="panel-title">
            Open grants across all systems
          </h2>
          <p className="panel-sub">
            Start of each week, last 12 weeks (illustrative)
          </p>
          <LineChart
            values={app.openGrants}
            labels={app.weeks}
            summary={`Open grants fell from ${app.openGrants[0]} to ${app.openGrants.at(-1)} over twelve weeks`}
          />
        </section>
        <section className="panel" aria-labelledby="dept-title">
          <h2 id="dept-title" className="panel-title">
            This campaign by department
          </h2>
          <p className="panel-sub">Updates as you decide</p>
          <StackedBars
            rows={rows}
            summary={rows
              .map(
                (r) =>
                  `${r.label}: ${r.kept} kept, ${r.revoked} revoked, ${r.open} open`,
              )
              .join("; ")}
          />
        </section>
      </div>

      <div className="app-grid">
        <section className="panel" aria-labelledby="urgent-title">
          <h2 id="urgent-title" className="panel-title">
            Decide these first
          </h2>
          {urgent.length ? (
            <ul className="mini-list">
              {urgent.map((g) => {
                const p = identityOf(g);
                return (
                  <li key={g.id}>
                    <Avatar initials={p.initials} />
                    <Link to={`/app/review?g=${g.id}`}>
                      <strong>{p.name}</strong>
                      <small>
                        {g.system} · {g.permission}
                      </small>
                    </Link>
                    <RiskTag risk={g.risk} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="empty-note">No high-risk grants left open.</p>
          )}
        </section>
        <section className="panel" aria-labelledby="recent-title">
          <h2 id="recent-title" className="panel-title">
            Your recent decisions
          </h2>
          {recent.length ? (
            <ul className="mini-list">
              {recent.map(([id, d]) => {
                const g = grants.find((x) => x.id === id)!;
                const p = identityOf(g);
                return (
                  <li key={id}>
                    <Avatar initials={p.initials} />
                    <span>
                      <strong>{p.name}</strong>
                      <small>
                        {g.permission} · {d.at}
                      </small>
                    </span>
                    <VerdictMark decision={d} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="empty-note">
              Nothing decided yet. Decisions you make in the queue appear here.
            </p>
          )}
          <h2 className="panel-title spaced">Next campaigns</h2>
          <ul className="mini-list">
            {app.upcoming.map((u) => (
              <li key={u.name}>
                <CalendarDays size={18} aria-hidden />
                <span>
                  <strong>{u.name}</strong>
                  <small>{u.scope}</small>
                </span>
                <span className="num small">{u.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
