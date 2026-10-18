import { useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { Link } from "../router";
import { identities, riskLabel, type Risk } from "../content";
import { grantsOf, useReview } from "../lib/review";
import { Avatar, RiskTag } from "../components/bits";

const rank: Record<Risk, number> = { high: 3, medium: 2, low: 1 };
const depts = [...new Set(identities.map((i) => i.dept))].sort();
const kinds = [...new Set(identities.map((i) => i.kind))];

type Key = "name" | "dept" | "grants" | "open" | "risk";
const columns: { key: Key; label: string }[] = [
  { key: "name", label: "Identity" },
  { key: "dept", label: "Department" },
  { key: "grants", label: "Grants" },
  { key: "open", label: "Open" },
  { key: "risk", label: "Highest open risk" },
];

export default function AppIdentities() {
  const { decisions } = useReview();
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({
    key: "risk",
    dir: -1,
  });
  const [dept, setDept] = useState("");
  const [kind, setKind] = useState("");
  const [query, setQuery] = useState("");

  const rows = identities.map((p) => {
    const gs = grantsOf(p.id);
    const openGrants = gs.filter((g) => !decisions[g.id]);
    const top = openGrants.reduce<Risk | null>(
      (m, g) => (!m || rank[g.risk] > rank[m] ? g.risk : m),
      null,
    );
    return { p, grants: gs.length, open: openGrants.length, top };
  });
  const q = query.trim().toLowerCase();
  const shown = rows
    .filter(
      (r) =>
        (!dept || r.p.dept === dept) &&
        (!kind || r.p.kind === kind) &&
        (!q || `${r.p.name} ${r.p.title}`.toLowerCase().includes(q)),
    )
    .sort((a, b) => {
      const v = (r: (typeof rows)[number]) =>
        sort.key === "name"
          ? r.p.name
          : sort.key === "dept"
            ? r.p.dept
            : sort.key === "risk"
              ? r.top
                ? rank[r.top]
                : 0
              : r[sort.key];
      const [x, y] = [v(a), v(b)];
      return (
        (typeof x === "string"
          ? x.localeCompare(y as string)
          : x - (y as number)) * sort.dir || a.p.name.localeCompare(b.p.name)
      );
    });

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Identities</h1>
          <p>
            {identities.length} people and service accounts with grants in this
            campaign
          </p>
        </div>
      </header>

      <div className="toolbar">
        <label className="select-inline">
          <span>Department</span>
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="">All</option>
            {depts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className="select-inline">
          <span>Type</span>
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="">All</option>
            {kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="search">
          <Search size={16} aria-hidden />
          <span className="sr-only">Search identities</span>
          <input
            type="search"
            placeholder="Name or title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="result-count" role="status">
        {shown.length} of {identities.length} identities
      </p>

      <div className="table-wrap panel flush">
        <table className="data-table app-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  scope="col"
                  key={c.key}
                  aria-sort={
                    sort.key === c.key
                      ? sort.dir === 1
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  <button
                    className="sort"
                    onClick={() =>
                      setSort((s) => ({
                        key: c.key,
                        dir:
                          s.key === c.key
                            ? (-s.dir as 1 | -1)
                            : c.key === "name" || c.key === "dept"
                              ? 1
                              : -1,
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
              <th scope="col">Last active</th>
            </tr>
          </thead>
          <tbody>
            {shown.map(({ p, grants, open, top }) => (
              <tr key={p.id}>
                <th scope="row">
                  <Link to={`/app/identities/${p.id}`} className="who">
                    <Avatar initials={p.initials} />
                    <span>
                      <strong>{p.name}</strong>
                      <small>
                        {p.title} · {p.kind}
                      </small>
                    </span>
                  </Link>
                </th>
                <td data-label="Dept">{p.dept}</td>
                <td data-label="Grants" className="num">
                  {grants}
                </td>
                <td data-label="Open" className="num">
                  {open}
                </td>
                <td>
                  {top ? (
                    <RiskTag risk={top} />
                  ) : (
                    <span className="quiet">All decided</span>
                  )}
                </td>
                <td data-label="Active">{p.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!shown.length && (
          <p className="empty-note">
            No identities match. Clear a filter to see more.
          </p>
        )}
      </div>
      <p className="quiet small">
        Risk levels: {Object.values(riskLabel).join(", ")}. Only grants still
        open count toward the highest risk.
      </p>
    </div>
  );
}
