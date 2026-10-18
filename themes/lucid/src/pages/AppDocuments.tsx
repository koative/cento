import { useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { Link } from "../router";
import { docs, type DocStatus } from "../content";
import { docStats, useWorkspace } from "../lib/workspace";
import { date, num } from "../lib/text";

type SortKey =
  "title" | "type" | "owner" | "status" | "open" | "words" | "updated";
const columns: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "title", label: "Document" },
  { key: "type", label: "Type" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
  { key: "open", label: "Open", numeric: true },
  { key: "words", label: "Words", numeric: true },
  { key: "updated", label: "Updated" },
];
const statuses: DocStatus[] = ["Draft", "In review", "Ready"];

export default function AppDocuments() {
  const ws = useWorkspace();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<DocStatus | "">("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "updated",
    dir: -1,
  });

  const q = query.trim().toLowerCase();
  const rows = docs
    .map((d) => ({ ...d, ...docStats(d, ws) }))
    .filter(
      (r) =>
        (!status || r.status === status) &&
        (!q || `${r.title} ${r.type} ${r.owner}`.toLowerCase().includes(q)),
    )
    .sort((a, b) => {
      const x = a[sort.key];
      const y = b[sort.key];
      return (
        (typeof x === "number" && typeof y === "number"
          ? x - y
          : String(x).localeCompare(String(y))) * sort.dir
      );
    });

  function sortBy(key: SortKey) {
    setSort((s) => ({
      key,
      dir:
        s.key === key
          ? s.dir === 1
            ? -1
            : 1
          : key === "updated" || key === "open"
            ? -1
            : 1,
    }));
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <h1>Documents</h1>
        <p>
          Everything your team has drafted in Halden Outfitters, with the
          suggestions still open on each.
        </p>
      </header>

      <div className="filter-bar app-filters">
        <div className="search-field">
          <label htmlFor="doc-search">Search documents</label>
          <div className="input-icon">
            <Search size={17} aria-hidden />
            <input
              id="doc-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, type or owner"
            />
          </div>
        </div>
        <div className="seg" role="group" aria-label="Filter by status">
          <button
            type="button"
            aria-pressed={status === ""}
            onClick={() => setStatus("")}
          >
            All
          </button>
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="filter-count num" aria-live="polite">
          {rows.length} of {docs.length} documents
        </p>
      </div>

      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Documents"
      >
        <table className="data-table docs-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={c.numeric ? "r" : undefined}
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
                    onClick={() => sortBy(c.key)}
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
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="empty">
                  No documents match. Clear the search or choose another status.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <Link to={`/app/documents/${r.id}`} className="row-link">
                    {r.title}
                  </Link>
                </td>
                <td>{r.type}</td>
                <td>{r.owner}</td>
                <td>
                  <span className="status" data-status={r.status}>
                    {r.status}
                  </span>
                </td>
                <td className="r num">{r.open || "—"}</td>
                <td className="r num">{num(r.words)}</td>
                <td className="num">
                  <time dateTime={r.updated}>
                    {date(r.updated, { month: "short", day: "numeric" })}
                  </time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
