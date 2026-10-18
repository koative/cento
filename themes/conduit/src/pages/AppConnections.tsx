import { useState } from "react";
import { ArrowDown, ArrowUp, Pause, Play, Search } from "lucide-react";
import { connections as seed, connectors, type Connection } from "../content";
import { num } from "../lib/format";
import { Mark } from "../components/bits";

type Key = "name" | "requests" | "errorRate" | "p95";
const columns: { key: Key; label: string; numeric?: boolean }[] = [
  { key: "name", label: "Connection" },
  { key: "requests", label: "Requests 24h", numeric: true },
  { key: "errorRate", label: "Error rate", numeric: true },
  { key: "p95", label: "p95", numeric: true },
];

export default function AppConnections() {
  const [rows, setRows] = useState<Connection[]>(seed);
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({
    key: "requests",
    dir: -1,
  });
  const [state, setState] = useState("all");
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");

  const q = query.trim().toLowerCase();
  const list = rows
    .filter((r) => state === "all" || r.state === state)
    .filter((r) => !q || `${r.name} ${r.id}`.toLowerCase().includes(q))
    .sort((a, b) => {
      const x = a[sort.key];
      const y = b[sort.key];
      return (
        (typeof x === "string"
          ? x.localeCompare(y as string)
          : x - (y as number)) * sort.dir
      );
    });

  function toggle(r: Connection) {
    const paused = r.state !== "paused";
    setRows((rs) =>
      rs.map((x) =>
        x.id === r.id ? { ...x, state: paused ? "paused" : "healthy" } : x,
      ),
    );
    setNote(
      `${r.name} ${paused ? "paused — requests will queue until you resume" : "resumed"}.`,
    );
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <h1>Connections</h1>
        <p className="muted">
          Each connection is one account on one provider. Pause one to queue its
          requests without failing them.
        </p>
      </header>

      <div className="filters">
        <div className="field search-field">
          <label htmlFor="conn-search">Search</label>
          <span className="input-icon">
            <Search size={17} aria-hidden />
            <input
              id="conn-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name or id"
            />
          </span>
        </div>
        <div className="field">
          <label htmlFor="conn-state">State</label>
          <select
            id="conn-state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="all">All states</option>
            <option value="healthy">Healthy</option>
            <option value="degraded">Degraded</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {note || `${list.length} of ${rows.length} connections`}
      </p>

      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Connections"
      >
        <table className="data-table app-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={
                    sort.key === c.key
                      ? sort.dir === 1
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={c.numeric ? "num" : undefined}
                >
                  <button
                    type="button"
                    className="sort"
                    onClick={() =>
                      setSort((s) => ({
                        key: c.key,
                        dir:
                          s.key === c.key
                            ? s.dir === 1
                              ? -1
                              : 1
                            : c.numeric
                              ? -1
                              : 1,
                      }))
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
              <th scope="col">State</th>
              <th scope="col">Last call</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => {
              const cx = connectors.find((x) => x.slug === r.connector)!;
              return (
                <tr key={r.id}>
                  <td>
                    <span className="cell-conn">
                      <Mark connector={cx} size="sm" />
                      <span>
                        <strong>{r.name}</strong>
                        <code className="muted">{r.id}</code>
                      </span>
                    </span>
                  </td>
                  <td className="num tabular">{num(r.requests)}</td>
                  <td
                    className="num tabular"
                    data-warn={r.errorRate > 2 ? "" : undefined}
                  >
                    {r.errorRate.toFixed(1)}%
                  </td>
                  <td className="num tabular">{r.p95 ? `${r.p95} ms` : "—"}</td>
                  <td>
                    <span className="state-label" data-state={r.state}>
                      {r.state}
                    </span>
                  </td>
                  <td className="muted">{r.lastCall}</td>
                  <td>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => toggle(r)}
                      aria-label={`${r.state === "paused" ? "Resume" : "Pause"} ${r.name}`}
                    >
                      {r.state === "paused" ? (
                        <Play size={15} aria-hidden />
                      ) : (
                        <Pause size={15} aria-hidden />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {list.length === 0 && (
          <p className="empty">
            No connections match. Clear the search or pick “All states”.
          </p>
        )}
      </div>
    </div>
  );
}
