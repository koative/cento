import { useEffect, useState } from "react";
import { Pause, Play, Search } from "lucide-react";
import { connections, connectors } from "../content";
import { statusClass } from "../lib/format";
import { Json } from "../components/bits";

type Entry = {
  id: string;
  time: string;
  status: number;
  method: string;
  path: string;
  ms: number;
  attempts: number;
  connection: string;
};

const live = connections.filter((c) => c.state !== "paused");
let clock = Date.UTC(2026, 9, 18, 9, 12, 0);

// One illustrative request: degraded connections fail often, writes occasionally fail validation.
function nextEntry(): Entry {
  const conn = live[Math.floor(Math.random() * live.length)];
  const cx = connectors.find((c) => c.slug === conn.connector)!;
  const action = cx.actions[Math.floor(Math.random() * cx.actions.length)];
  const roll = Math.random();
  const status =
    conn.state === "degraded" && roll < 0.3
      ? 502
      : action.method !== "GET" && roll > 0.96
        ? 422
        : action.method === "POST"
          ? 201
          : 200;
  clock += 400 + Math.floor(Math.random() * 1800);
  return {
    id: "req_" + Math.random().toString(36).slice(2, 12),
    time: new Date(clock).toISOString().slice(11, 23),
    status,
    method: action.method,
    path: action.path,
    ms:
      status === 422
        ? 3
        : Math.round(
            cx.latency * (0.7 + Math.random()) * (status === 502 ? 4 : 1),
          ),
    attempts: status === 502 ? 4 : status === 422 ? 0 : roll > 0.9 ? 2 : 1,
    connection: conn.name,
  };
}

const filters = [
  { id: "all", label: "All" },
  { id: "ok", label: "2xx" },
  { id: "warn", label: "4xx" },
  { id: "err", label: "5xx" },
];

export default function AppLogs() {
  const [entries, setEntries] = useState<Entry[]>(() =>
    Array.from({ length: 14 }, nextEntry).reverse(),
  );
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(
      () => setEntries((e) => [nextEntry(), ...e].slice(0, 60)),
      1600,
    );
    return () => window.clearInterval(t);
  }, [paused]);

  const q = query.trim().toLowerCase();
  const list = entries.filter(
    (e) =>
      (filter === "all" || statusClass(e.status) === filter) &&
      (!q || `${e.path} ${e.id} ${e.connection}`.toLowerCase().includes(q)),
  );

  return (
    <div className="app-page">
      <header className="app-head app-head-row">
        <div>
          <h1>Logs</h1>
          <p className="muted">
            Live tail of every request in this workspace. Select a row for the
            full record.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          {paused ? (
            <Play size={16} aria-hidden />
          ) : (
            <Pause size={16} aria-hidden />
          )}
          {paused ? "Resume tail" : "Pause tail"}
        </button>
      </header>

      <div className="filters">
        <div className="field search-field">
          <label htmlFor="log-search">
            Search path, request id or connection
          </label>
          <span className="input-icon">
            <Search size={17} aria-hidden />
            <input
              id="log-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ferryline, req_…"
            />
          </span>
        </div>
        <div className="chips" role="group" aria-label="Status class">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">
        <span
          className="live-dot"
          data-paused={paused ? "" : undefined}
          aria-hidden="true"
        />
        {paused ? "Paused" : "Streaming"} · {list.length} shown
      </p>

      {list.length === 0 ? (
        <p className="empty">
          No requests match yet. Clear the search or choose “All”.
        </p>
      ) : (
        <ul className="log-list">
          {list.map((e) => (
            <li key={e.id} data-open={open === e.id ? "" : undefined}>
              <button
                type="button"
                className="log-row"
                aria-expanded={open === e.id}
                onClick={() => setOpen(open === e.id ? null : e.id)}
              >
                <span className="tabular muted">{e.time}</span>
                <span className={`code-pill ${statusClass(e.status)}`}>
                  {e.status}
                </span>
                <span className="method" data-method={e.method}>
                  {e.method}
                </span>
                <code className="log-path">{e.path}</code>
                <span className="tabular log-ms">{e.ms} ms</span>
              </button>
              {open === e.id && (
                <pre className="log-detail">
                  <Json
                    value={{
                      request_id: e.id,
                      connection: e.connection,
                      status: e.status,
                      attempts: e.attempts,
                      duration_ms: e.ms,
                      at: `2026-10-18T${e.time}Z`,
                    }}
                  />
                </pre>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
