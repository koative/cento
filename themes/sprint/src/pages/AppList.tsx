import { useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { Link } from "../router";
import { people, priorities, statuses, type Issue } from "../content";
import { useDemo } from "../lib/store";
import {
  formatStamp,
  person,
  priorityName,
  priorityRank,
  statusName,
} from "../lib/format";
import { Avatar, PriorityIcon, StatusIcon } from "../components/issue";

type Col =
  "key" | "title" | "status" | "priority" | "assignee" | "estimate" | "updated";

const columns: { id: Col; label: string }[] = [
  { id: "key", label: "Key" },
  { id: "title", label: "Title" },
  { id: "status", label: "Status" },
  { id: "priority", label: "Priority" },
  { id: "assignee", label: "Assignee" },
  { id: "estimate", label: "Pts" },
  { id: "updated", label: "Updated" },
];

const statusOrder = statuses.map((s) => s.id);

const sortValue: Record<Col, (i: Issue) => string | number> = {
  key: (i) => Number(i.key.split("-")[1]),
  title: (i) => i.title.toLowerCase(),
  status: (i) => statusOrder.indexOf(i.status),
  priority: (i) => priorityRank(i.priority),
  assignee: (i) => person(i.assignee)?.name ?? "~",
  estimate: (i) => i.estimate,
  updated: (i) => i.updated,
};

export default function AppList() {
  const { issues } = useDemo();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [sort, setSort] = useState<{ col: Col; dir: 1 | -1 }>({
    col: "priority",
    dir: 1,
  });

  const needle = q.trim().toLowerCase();
  const rows = issues
    .filter(
      (i) =>
        (!needle ||
          i.title.toLowerCase().includes(needle) ||
          i.key.toLowerCase().includes(needle)) &&
        (!status || i.status === status) &&
        (!priority || i.priority === priority) &&
        (!assignee ||
          (assignee === "none" ? !i.assignee : i.assignee === assignee)),
    )
    .sort((a, b) => {
      const x = sortValue[sort.col](a);
      const y = sortValue[sort.col](b);
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });

  const filtered = q || status || priority || assignee;

  return (
    <div className="list-page">
      <div className="app-head">
        <div>
          <h1>All issues</h1>
          <p className="app-sub" aria-live="polite">
            {rows.length} of {issues.length} issues
          </p>
        </div>
      </div>

      <div className="list-filters">
        <label className="search">
          <Search size={16} aria-hidden />
          <span className="sr-only">Search by key or title</span>
          <input
            type="search"
            placeholder="Search by key or title"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <label className="select-label">
          <span>Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Any</option>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="select-label">
          <span>Priority</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Any</option>
            {priorities.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="select-label">
          <span>Assignee</span>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">Anyone</option>
            <option value="none">Unassigned</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        {filtered && (
          <button
            type="button"
            className="btn btn-quiet btn-sm"
            onClick={() => {
              setQ("");
              setStatus("");
              setPriority("");
              setAssignee("");
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {rows.length ? (
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Issues"
        >
          <table className="issues">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th
                    key={c.id}
                    scope="col"
                    className={`th-${c.id}`}
                    aria-sort={
                      sort.col === c.id
                        ? sort.dir === 1
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSort((s) => ({
                          col: c.id,
                          dir: s.col === c.id ? (s.dir === 1 ? -1 : 1) : 1,
                        }))
                      }
                    >
                      {c.label}
                      {sort.col === c.id &&
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
              {rows.map((i) => (
                <tr key={i.key}>
                  <td className="num td-key">{i.key}</td>
                  <td className="td-title">
                    <Link to={`/app/issues/${i.key}`}>{i.title}</Link>
                  </td>
                  <td>
                    <span className="cell-icon">
                      <StatusIcon status={i.status} />
                      {statusName(i.status)}
                    </span>
                  </td>
                  <td>
                    <span className="cell-icon">
                      <PriorityIcon priority={i.priority} />
                      {priorityName(i.priority)}
                    </span>
                  </td>
                  <td>
                    <span className="cell-icon">
                      <Avatar id={i.assignee} size={22} />
                      {person(i.assignee)?.name.split(" ")[0] ?? "—"}
                    </span>
                  </td>
                  <td className="num">{i.estimate}</td>
                  <td className="num td-updated">{formatStamp(i.updated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">
          <p>No issues match these filters.</p>
          <p className="fine">
            Try a shorter search, or clear one of the filters above.
          </p>
        </div>
      )}
    </div>
  );
}
