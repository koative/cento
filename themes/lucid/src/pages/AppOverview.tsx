import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { docs, overview } from "../content";
import { KindBars, WeeklyChart } from "../components/Charts";
import { docStats, useWorkspace } from "../lib/workspace";
import { date, num, pct } from "../lib/text";

export default function AppOverview() {
  const ws = useWorkspace();
  const last = overview.weekly[overview.weekly.length - 1];
  const prev = overview.weekly[overview.weekly.length - 2];
  const rows = docs.map((d) => ({ doc: d, ...docStats(d, ws) }));
  const waiting = rows.filter((r) => r.status === "In review");
  const open = rows.reduce((sum, r) => sum + r.open, 0);

  return (
    <div className="app-page">
      <header className="app-head">
        <h1>{overview.heading}</h1>
        <p>{overview.lede}</p>
      </header>

      <dl className="app-summary num">
        <div>
          <dt>Words reviewed this week</dt>
          <dd>{num(last.words)}</dd>
          <dd className="delta">
            +{pct(last.words / prev.words - 1)} on last week
          </dd>
        </div>
        <div>
          <dt>Suggestions accepted</dt>
          <dd>{pct(last.accepted)}</dd>
          <dd className="delta">
            up from {pct(overview.weekly[0].accepted)} in July
          </dd>
        </div>
        <div>
          <dt>Open suggestions</dt>
          <dd>{open}</dd>
          <dd className="delta">
            across {rows.filter((r) => r.open).length} documents
          </dd>
        </div>
      </dl>

      <div className="app-grid">
        <section className="panel panel-wide" aria-labelledby="weekly-title">
          <h2 id="weekly-title">Twelve weeks of editing</h2>
          <WeeklyChart data={overview.weekly} />
        </section>

        <section className="panel" aria-labelledby="waiting-title">
          <h2 id="waiting-title">Waiting for review</h2>
          {waiting.length === 0 ? (
            <p className="empty">
              Nothing is waiting. Every document in review has been signed off.
            </p>
          ) : (
            <ul className="waiting">
              {waiting.map((r) => (
                <li key={r.doc.id}>
                  <Link to={`/app/documents/${r.doc.id}`}>{r.doc.title}</Link>
                  <span className="num">
                    {r.open} open · {r.doc.owner} ·{" "}
                    {date(r.doc.updated, { month: "short", day: "numeric" })}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/app/documents" className="text-link">
            All documents <ArrowRight size={15} aria-hidden />
          </Link>
        </section>

        <section className="panel" aria-labelledby="kind-title">
          <h2 id="kind-title">Accepted by kind, last 90 days</h2>
          <KindBars data={overview.byKind} />
        </section>

        <section className="panel" aria-labelledby="terms-title">
          <h2 id="terms-title">Most-corrected terms</h2>
          <table className="data-table compact">
            <thead>
              <tr>
                <th scope="col">Avoid</th>
                <th scope="col">Prefer</th>
                <th scope="col" className="r">
                  Fixes
                </th>
              </tr>
            </thead>
            <tbody>
              {overview.terms.map((t) => (
                <tr key={t.avoid}>
                  <td>
                    <del>{t.avoid}</del>
                  </td>
                  <td>
                    <ins>{t.prefer}</ins>
                  </td>
                  <td className="r num">{t.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/app/style" className="text-link">
            Edit house style <ArrowRight size={15} aria-hidden />
          </Link>
        </section>

        <section className="panel" aria-labelledby="team-title">
          <h2 id="team-title">Team this month</h2>
          <table className="data-table compact">
            <thead>
              <tr>
                <th scope="col">Writer</th>
                <th scope="col" className="r">
                  Documents
                </th>
                <th scope="col" className="r">
                  Accepted
                </th>
              </tr>
            </thead>
            <tbody>
              {overview.team.map((t) => (
                <tr key={t.name}>
                  <td>{t.name}</td>
                  <td className="r num">{t.docs}</td>
                  <td className="r num">{pct(t.accepted)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
