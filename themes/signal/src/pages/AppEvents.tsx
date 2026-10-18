import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { Link } from "../router";
import { events, type EventDef, type EventStatus } from "../content";
import { Delta, EventName, num } from "../components/format";

type SortKey = "id" | "volume" | "users" | "change";
const COLUMNS: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: "id", label: "Event", numeric: false },
  { key: "volume", label: "Events, 30d", numeric: true },
  { key: "users", label: "People, 30d", numeric: true },
  { key: "change", label: "Change", numeric: true },
];
const categories = [
  "All categories",
  ...new Set(events.map((e) => e.category)),
];
const statuses: ("All" | EventStatus)[] = [
  "All",
  "Verified",
  "Unverified",
  "Deprecated",
];

export default function AppEvents() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "volume",
    dir: -1,
  });

  const q = query.trim().toLowerCase();
  const rows = events
    .filter((e) => category === categories[0] || e.category === category)
    .filter((e) => status === "All" || e.status === status)
    .filter(
      (e) =>
        !q ||
        (
          e.id +
          " " +
          e.description +
          " " +
          e.properties.map((p) => p.name).join(" ")
        )
          .toLowerCase()
          .includes(q),
    )
    .sort((a: EventDef, b: EventDef) => {
      const x = a[sort.key];
      const y = b[sort.key];
      return (
        (typeof x === "string"
          ? x.localeCompare(y as string)
          : x - (y as number)) * sort.dir
      );
    });

  function toggle(key: SortKey) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === 1 ? -1 : 1 }
        : { key, dir: key === "id" ? 1 : -1 },
    );
  }
  function clear() {
    setQuery("");
    setCategory(categories[0]);
    setStatus("All");
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Events</h1>
          <p>
            Every event Fernway sends, with owners and verification status.
            Click a column to sort.
          </p>
        </div>
      </header>

      <div className="toolbar">
        <label className="search">
          <Search size={16} aria-hidden />
          <span className="visually-hidden">Search events</span>
          <input
            type="search"
            placeholder="Search events or properties"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="select-inline">
          <span className="visually-hidden">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <div className="chips" role="group" aria-label="Filter by status">
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
      </div>
      <p className="result-count" aria-live="polite">
        {rows.length} of {events.length} events
      </p>

      <div className="app-card flush">
        <div
          className="table-scroll"
          role="region"
          aria-label="Event catalog"
          tabIndex={0}
        >
          <table className="data-table events-table">
            <thead>
              <tr>
                {COLUMNS.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className={c.numeric ? "r" : undefined}
                    aria-sort={
                      sort.key === c.key
                        ? sort.dir === 1
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      className="sort"
                      onClick={() => toggle(c.key)}
                    >
                      {c.label}
                      {sort.key !== c.key ? (
                        <ArrowUpDown size={14} aria-hidden />
                      ) : sort.dir === 1 ? (
                        <ArrowUp size={14} aria-hidden />
                      ) : (
                        <ArrowDown size={14} aria-hidden />
                      )}
                    </button>
                  </th>
                ))}
                <th scope="col">Category</th>
                <th scope="col">Status</th>
                <th scope="col">Last seen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id}>
                  <td>
                    <Link to={`/app/events/${e.id}`} className="row-link">
                      <EventName id={e.id} />
                    </Link>
                  </td>
                  <td className="r num">{num.format(e.volume)}</td>
                  <td className="r num">{num.format(e.users)}</td>
                  <td className="r">
                    <Delta value={e.change} />
                  </td>
                  <td>{e.category}</td>
                  <td>
                    <span className="status" data-status={e.status}>
                      {e.status}
                    </span>
                  </td>
                  <td className="muted">{e.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="empty-state">
            <p>No events match these filters.</p>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={clear}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
