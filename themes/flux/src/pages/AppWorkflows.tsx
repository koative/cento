import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Search } from "lucide-react";
import { Link } from "../router";
import { teams, type Workflow } from "../content";
import { saveWorkflow, useWorkflows } from "../lib/workspace";
import { ConnectorMark } from "../components/Marks";

type SortKey = "name" | "runs30" | "failRate" | "owner";
const columns: [SortKey, string][] = [
  ["name", "Workflow"],
  ["owner", "Owner"],
  ["runs30", "Runs, 30 days"],
  ["failRate", "Failed"],
];
const failRate = (w: Workflow) => (w.runs30 ? w.failed30 / w.runs30 : 0);

export default function AppWorkflows() {
  const workflows = useWorkflows();
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("");
  const [state, setState] = useState("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "runs30",
    dir: -1,
  });

  const q = query.trim().toLowerCase();
  const rows = workflows
    .filter(
      (w) =>
        (!team || w.team === team) &&
        (state === "all" || (state === "on") === w.on) &&
        (!q || w.name.toLowerCase().includes(q)),
    )
    .sort((a, b) => {
      const av = sort.key === "failRate" ? failRate(a) : a[sort.key];
      const bv = sort.key === "failRate" ? failRate(b) : b[sort.key];
      return (
        (typeof av === "string"
          ? av.localeCompare(bv as string)
          : av - (bv as number)) * sort.dir
      );
    });

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Workflows</h1>
          <p>
            {workflows.filter((w) => w.on).length} live,{" "}
            {workflows.filter((w) => !w.on).length} switched off
          </p>
        </div>
        <Link to="/templates" className="btn btn-plum">
          <Plus size={16} aria-hidden /> New from a template
        </Link>
      </header>

      <div className="app-filters">
        <label className="search">
          <Search size={18} aria-hidden />
          <span className="sr-only">Search workflows</span>
          <input
            type="search"
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="sort">
          Team
          <select value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="">All teams</option>
            {teams.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="sort">
          Status
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="all">Any status</option>
            <option value="on">Live</option>
            <option value="off">Switched off</option>
          </select>
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        Showing {rows.length} of {workflows.length} workflows
      </p>

      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Workflows"
      >
        <table className="data-table workflows-table">
          <thead>
            <tr>
              {columns.map(([key, label]) => (
                <th
                  key={key}
                  scope="col"
                  aria-sort={
                    sort.key === key
                      ? sort.dir === 1
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() =>
                      setSort((s) => ({
                        key,
                        dir:
                          s.key === key
                            ? s.dir === 1
                              ? -1
                              : 1
                            : key === "name" || key === "owner"
                              ? 1
                              : -1,
                      }))
                    }
                  >
                    {label}
                    {sort.key === key &&
                      (sort.dir === 1 ? (
                        <ArrowUp size={14} aria-hidden />
                      ) : (
                        <ArrowDown size={14} aria-hidden />
                      ))}
                  </button>
                </th>
              ))}
              <th scope="col">Last run</th>
              <th scope="col">Live</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => (
              <tr key={w.id}>
                <td>
                  <div className="wf-name">
                    <span className="wf-apps" aria-hidden="true">
                      {[...new Set(w.steps.map((s) => s.app))]
                        .slice(0, 3)
                        .map((a) => (
                          <ConnectorMark key={a} slug={a} size={22} />
                        ))}
                    </span>
                    <span>
                      <Link to={`/app/workflows/${w.id}`}>{w.name}</Link>
                      <small>
                        {w.team} · {w.steps.length} steps
                      </small>
                    </span>
                  </div>
                </td>
                <td>{w.owner}</td>
                <td className="num">{w.runs30.toLocaleString("en-US")}</td>
                <td className="num" data-bad={w.failed30 > 0 ? "" : undefined}>
                  {w.failed30}{" "}
                  {w.runs30 > 0 && (
                    <small>({(failRate(w) * 100).toFixed(1)}%)</small>
                  )}
                </td>
                <td className="num">{w.lastRun}</td>
                <td>
                  <button
                    type="button"
                    role="switch"
                    className="switch"
                    aria-checked={w.on}
                    aria-label={`${w.name} live`}
                    onClick={() => saveWorkflow({ ...w, on: !w.on })}
                  >
                    <span aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <div className="empty">
          <p>No workflow matches these filters.</p>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setQuery("");
              setTeam("");
              setState("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
