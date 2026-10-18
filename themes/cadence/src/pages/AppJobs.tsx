import { useState } from "react";
import { Link } from "../router";
import { jobs, stages, today } from "../content";
import { useDemo } from "../lib/store";
import { daysBetween } from "../lib/format";

const statuses = ["All", "Open", "Paused", "Draft"] as const;

export default function AppJobs() {
  const { candidates } = useDemo();
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const shown = jobs.filter((j) => status === "All" || j.status === status);

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Jobs</h1>
          <p>
            {jobs.filter((j) => j.status === "Open").length} open ·{" "}
            {jobs.filter((j) => j.status !== "Open").length} paused or in draft
          </p>
        </div>
      </header>

      <div className="chips" role="group" aria-label="Filter by status">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            className="chip"
            aria-pressed={status === s}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div
        className="table-scroll"
        role="region"
        aria-label="Jobs"
        tabIndex={0}
      >
        <table className="data">
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Hiring manager</th>
              <th scope="col">Pipeline</th>
              <th scope="col" className="r">
                Candidates
              </th>
              <th scope="col" className="r">
                Days open
              </th>
            </tr>
          </thead>
          <tbody>
            {shown.map((j) => {
              const mine = candidates.filter((c) => c.jobId === j.id);
              return (
                <tr key={j.id}>
                  <td>
                    <Link to={`/app/jobs/${j.id}`} className="cell-title">
                      {j.title}
                    </Link>
                    <small>
                      {j.team} · {j.location}
                    </small>
                  </td>
                  <td>
                    <span className="status" data-status={j.status}>
                      {j.status}
                    </span>
                  </td>
                  <td>{j.manager}</td>
                  <td>
                    <span
                      className="mini-stages"
                      aria-label={stages
                        .map(
                          (s) =>
                            `${mine.filter((c) => c.stage === s.id).length} ${s.label}`,
                        )
                        .join(", ")}
                    >
                      {stages.map((s, i) => (
                        <span
                          key={s.id}
                          data-stage={i}
                          style={{
                            flexGrow: mine.filter((c) => c.stage === s.id)
                              .length,
                          }}
                        />
                      ))}
                    </span>
                  </td>
                  <td className="r num">{mine.length}</td>
                  <td className="r num">
                    {j.status === "Draft" ? "–" : daysBetween(j.opened, today)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
