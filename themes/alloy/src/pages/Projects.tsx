import { useState } from "react";
import { projects, projectsPage, sectors, type Sector } from "../content";
import { ProjectCard } from "../components/ProjectCard";

type Status = "All" | "On site" | "Completed";
type Sort = "newest" | "value" | "name";

export function Projects() {
  const [sector, setSector] = useState<Sector | "All">("All");
  const [status, setStatus] = useState<Status>("All");
  const [sort, setSort] = useState<Sort>("newest");

  const list = projects
    .filter(
      (p) =>
        (sector === "All" || p.sector === sector) &&
        (status === "All" || p.status === status),
    )
    .sort((a, b) =>
      sort === "value"
        ? b.value - a.value
        : sort === "name"
          ? a.name.localeCompare(b.name)
          : b.year - a.year || b.start.localeCompare(a.start),
    );

  return (
    <>
      <header className="page-head wrap">
        <h1>{projectsPage.title}</h1>
        <p className="lede">{projectsPage.intro}</p>
      </header>

      <div className="wrap filters">
        <div className="chip-group" role="group" aria-label="Sector">
          {(["All", ...sectors] as const).map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              aria-pressed={sector === s}
              onClick={() => setSector(s)}
            >
              {s === "All" ? "All sectors" : s}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <div className="segmented" role="group" aria-label="Status">
            {(["All", "On site", "Completed"] as const).map((s) => (
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
          <label className="select-inline">
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="newest">Most recent</option>
              <option value="value">Contract value</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <section className="wrap section-tight">
        <h2 className="sr-only">Results</h2>
        {list.length ? (
          <div className="project-grid">
            {list.map((p, i) => (
              <ProjectCard key={p.slug} project={p} eager={i < 3} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              No {status === "All" ? "" : status.toLowerCase() + " "}projects in{" "}
              {sector} right now.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setSector("All");
                setStatus("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
