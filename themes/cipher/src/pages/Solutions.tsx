import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "../router";
import { solutions, solutionsPage } from "../content";

const teams = ["All teams", ...new Set(solutions.map((s) => s.team))];
const frameworks = [...new Set(solutions.flatMap((s) => s.frameworks))];

export default function Solutions() {
  const [team, setTeam] = useState("All teams");
  const [framework, setFramework] = useState("");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = solutions.filter(
    (s) =>
      (team === "All teams" || s.team === team) &&
      (!framework || s.frameworks.includes(framework)) &&
      (!q || `${s.name} ${s.summary} ${s.problem}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>{solutionsPage.heading}</h1>
        <p className="lede">{solutionsPage.lede}</p>
      </header>

      <section className="wrap" aria-label="Filter solutions">
        <div className="filters">
          <div className="chips" role="group" aria-label="Team">
            {teams.map((t) => (
              <button
                key={t}
                className="chip"
                aria-pressed={team === t}
                onClick={() => setTeam(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="select-inline">
            <span>Framework</span>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
            >
              <option value="">Any</option>
              {frameworks.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
          <label className="search">
            <Search size={16} aria-hidden />
            <span className="sr-only">Search solutions</span>
            <input
              type="search"
              placeholder="Search: leaver, token, refund…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="result-count" role="status">
          {shown.length} of {solutions.length} solutions
        </p>

        {shown.length ? (
          <ul className="solution-ledger">
            {shown.map((s) => (
              <li key={s.slug}>
                <Link to={`/solutions/${s.slug}`} className="solution-row">
                  <span className="solution-team">{s.team}</span>
                  <div className="solution-name">
                    <h2>{s.name}</h2>
                    <span>{s.summary}</span>
                  </div>
                  <span className="rule-line">
                    <small>Runs</small> {s.rule.when}
                  </span>
                  <span className="solution-foot">
                    {s.frameworks.join(" · ")}
                    <ArrowUpRight size={18} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>No solution matches those filters.</p>
            <button
              className="btn btn-quiet"
              onClick={() => {
                setTeam("All teams");
                setFramework("");
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="close slim" aria-labelledby="sol-close">
        <div className="wrap close-inner">
          <h2 id="sol-close">Not on the list? Most reviews are a rule away.</h2>
          <p>
            Describe the review you owe and we will build the campaign template
            with you on the call.
          </p>
          <div className="actions">
            <Link to="/demo" className="btn btn-primary">
              Request a demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
