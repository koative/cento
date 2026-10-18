import { useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { Link } from "../router";
import { jobs, stages, today, type Candidate } from "../content";
import { useDemo } from "../lib/store";
import { daysBetween, formatDate, stageIndex, stageLabel } from "../lib/format";
import { Avatar } from "../components/Visuals";

const average = (c: Candidate) => {
  const all = c.scorecards.flatMap((s) => Object.values(s.ratings));
  return all.length ? all.reduce((a, b) => a + b, 0) / all.length : 0;
};

const columns: {
  key: string;
  label: string;
  value: (c: Candidate) => string | number;
  right?: boolean;
}[] = [
  { key: "name", label: "Name", value: (c) => c.name },
  { key: "stage", label: "Stage", value: (c) => stageIndex(c.stage) },
  { key: "applied", label: "Applied", value: (c) => c.applied },
  {
    key: "waiting",
    label: "Days at stage",
    value: (c) => daysBetween(c.since, today),
    right: true,
  },
  { key: "score", label: "Avg. score", value: average, right: true },
];

export default function AppCandidates() {
  const { candidates } = useDemo();
  const [query, setQuery] = useState("");
  const [job, setJob] = useState("");
  const [stage, setStage] = useState("");
  const [sort, setSort] = useState({ key: "applied", dir: -1 });

  const q = query.trim().toLowerCase();
  const col = columns.find((c) => c.key === sort.key)!;
  const shown = candidates
    .filter((c) => (!job || c.jobId === job) && (!stage || c.stage === stage))
    .filter(
      (c) =>
        !q || `${c.name} ${c.headline} ${c.location}`.toLowerCase().includes(q),
    )
    .sort((a, b) => {
      const x = col.value(a);
      const y = col.value(b);
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Candidates</h1>
          <p>{candidates.length} people across every role</p>
        </div>
      </header>

      <div className="toolbar">
        <label className="search">
          <Search size={16} aria-hidden />
          <span className="sr-only">Search candidates</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, headline or city"
          />
        </label>
        <label className="select">
          <span className="sr-only">Filter by role</span>
          <select value={job} onChange={(e) => setJob(e.target.value)}>
            <option value="">All roles</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </label>
        <label className="select">
          <span className="sr-only">Filter by stage</span>
          <select value={stage} onChange={(e) => setStage(e.target.value)}>
            <option value="">All stages</option>
            {stages.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        Showing {shown.length} of {candidates.length}, sorted by{" "}
        {col.label.toLowerCase()} {sort.dir === 1 ? "ascending" : "descending"}
      </p>

      {shown.length ? (
        <div
          className="table-scroll"
          role="region"
          aria-label="Candidates"
          tabIndex={0}
        >
          <table className="data">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className={c.right ? "r" : undefined}
                    aria-sort={
                      sort.key === c.key
                        ? sort.dir === 1
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    <button
                      type="button"
                      className="sort"
                      onClick={() =>
                        setSort({
                          key: c.key,
                          dir: sort.key === c.key ? -sort.dir : 1,
                        })
                      }
                    >
                      {c.label}
                      {sort.key === c.key &&
                        (sort.dir === 1 ? (
                          <ArrowUp size={14} aria-hidden />
                        ) : (
                          <ArrowDown size={14} aria-hidden />
                        ))}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((c) => {
                const avg = average(c);
                return (
                  <tr key={c.id}>
                    <td>
                      <span className="cell-person">
                        <Avatar name={c.name} size="sm" />
                        <span>
                          <Link
                            to={`/app/candidates/${c.id}`}
                            className="cell-title"
                          >
                            {c.name}
                          </Link>
                          <small>
                            {jobs.find((j) => j.id === c.jobId)!.title}
                          </small>
                        </span>
                      </span>
                    </td>
                    <td>
                      <span
                        className="stage-tag"
                        data-stage={stageIndex(c.stage)}
                      >
                        {stageLabel(c.stage)}
                      </span>
                    </td>
                    <td className="num">{formatDate(c.applied)}</td>
                    <td className="r num">{daysBetween(c.since, today)}</td>
                    <td className="r num">{avg ? avg.toFixed(1) : "–"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="panel empty">
          <p>No candidates match these filters.</p>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => {
              setQuery("");
              setJob("");
              setStage("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
