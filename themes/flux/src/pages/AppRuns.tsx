import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Link } from "../router";
import { demoRuns, type RunStatus } from "../content";
import { useWorkflows } from "../lib/workspace";
import { RunStatusTag } from "../components/RunStatusTag";

const statuses: (RunStatus | "All")[] = [
  "All",
  "Succeeded",
  "Stopped",
  "Failed",
];

export default function AppRuns() {
  const workflows = useWorkflows();
  const [status, setStatus] = useState<RunStatus | "All">("All");
  const [workflow, setWorkflow] = useState("");
  const [replayed, setReplayed] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const rows = demoRuns.filter(
    (r) =>
      (status === "All" || r.status === status) &&
      (!workflow || r.workflow === workflow),
  );
  const failed = rows.filter(
    (r) => r.status === "Failed" && !replayed.includes(r.id),
  );

  function replay(ids: string[]) {
    setReplayed((r) => [...r, ...ids]);
    setNotice(
      ids.length === 1
        ? `Run ${ids[0]} queued for replay with its original trigger data.`
        : `${ids.length} failed runs queued for replay.`,
    );
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Run history</h1>
          <p>
            Live runs from the last 24 hours. Test runs are not recorded here.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-plum"
          disabled={!failed.length}
          onClick={() => replay(failed.map((r) => r.id))}
        >
          <RotateCcw size={16} aria-hidden /> Replay {failed.length || ""}{" "}
          failed
        </button>
      </header>

      <div className="app-filters">
        <div className="chips" role="group" aria-label="Result">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
            >
              {s}
              <span className="chip-count num">
                {s === "All"
                  ? demoRuns.length
                  : demoRuns.filter((r) => r.status === s).length}
              </span>
            </button>
          ))}
        </div>
        <label className="sort">
          Workflow
          <select
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
          >
            <option value="">All workflows</option>
            {workflows.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {notice || `${rows.length} runs`}
      </p>

      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Runs"
      >
        <table className="data-table runs-table">
          <thead>
            <tr>
              <th scope="col">Run</th>
              <th scope="col">Workflow</th>
              <th scope="col">Result</th>
              <th scope="col">Started</th>
              <th scope="col">Duration</th>
              <th scope="col">Steps</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const w = workflows.find((x) => x.id === r.workflow)!;
              const isReplayed = replayed.includes(r.id);
              return (
                <tr key={r.id}>
                  <td className="num mono">{r.id}</td>
                  <td>
                    <Link to={`/app/workflows/${w.id}`}>{w.name}</Link>
                  </td>
                  <td>
                    <RunStatusTag status={r.status} />
                  </td>
                  <td className="num">{r.started}</td>
                  <td className="num">{(r.duration / 1000).toFixed(2)} s</td>
                  <td className="num">{r.steps}</td>
                  <td>
                    {r.status === "Failed" ? (
                      isReplayed ? (
                        <span className="replayed">Replay queued</span>
                      ) : (
                        <span className="fail-note">
                          {r.note}
                          <button
                            type="button"
                            className="btn btn-line btn-sm"
                            onClick={() => replay([r.id])}
                            aria-label={`Replay run ${r.id}`}
                          >
                            Replay
                          </button>
                        </span>
                      )
                    ) : (
                      r.note
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <div className="empty">
          <p>No runs match. Try another result or workflow.</p>
        </div>
      )}
    </div>
  );
}
