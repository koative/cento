import { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "../router";
import { projects, type Project, type ProjectKind } from "../content";

const kinds: ("All" | ProjectKind)[] = ["All", "Open source", "Client", "Tool"];
const sorts: Record<
  string,
  { label: string; fn: (a: Project, b: Project) => number }
> = {
  newest: { label: "Newest first", fn: (a, b) => b.year - a.year },
  name: { label: "Name, A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
  stars: { label: "Most stars", fn: (a, b) => (b.stars ?? 0) - (a.stars ?? 0) },
};
type SortKey = keyof typeof sorts;

export function Projects() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const q = query.trim().toLowerCase();
  const shown = projects
    .filter((p) => kind === "All" || p.kind === kind)
    .filter(
      (p) =>
        !q ||
        [p.name, p.summary, p.client ?? "", ...p.stack]
          .join(" ")
          .toLowerCase()
          .includes(q),
    )
    .sort(sorts[sort].fn);

  return (
    <>
      <header className="page-head wrap">
        <h1>Projects</h1>
        <p className="lead">
          Open-source libraries, tools and client work from the last five years.
          Client projects are published with permission; every number was
          measured on real traffic.
        </p>
      </header>

      <div className="wrap">
        <div className="toolbar" role="group" aria-label="Filter projects">
          <div className="segmented" role="group" aria-label="Kind">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k}
              </button>
            ))}
          </div>
          <label className="search">
            <span className="visually-hidden">Search projects</span>
            <input
              type="search"
              placeholder="Search by name or stack, e.g. rust"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="select">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="count" aria-live="polite">
          {shown.length} of {projects.length} projects
        </p>

        {shown.length ? (
          <ul className="ls">
            <li className="ls-head" aria-hidden="true">
              <span>name</span>
              <span>kind</span>
              <span>year</span>
              <span>stack</span>
              <span>stars</span>
            </li>
            {shown.map((p) => (
              <li key={p.slug} className="ls-row">
                <h2>
                  <Link to={`/projects/${p.slug}`}>{p.name}</Link>
                </h2>
                <span className="ls-kind">{p.kind}</span>
                <span className="num">{p.year}</span>
                <span className="ls-stack">
                  {p.stack.slice(0, 3).join(" · ")}
                </span>
                <span className="num ls-stars">
                  {p.stars ? (
                    <>
                      <Star size={14} aria-hidden="true" />{" "}
                      {p.stars.toLocaleString("en-GB")}
                      <span className="visually-hidden"> stars</span>
                    </>
                  ) : (
                    <span className="muted">{p.client}</span>
                  )}
                </span>
                <p className="ls-summary">{p.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No projects match <code>{query}</code>
              {kind !== "All" && ` in ${kind.toLowerCase()}`}.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setQuery("");
                setKind("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
