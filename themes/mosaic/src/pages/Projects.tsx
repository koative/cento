import { useState } from "react";
import {
  materials,
  projects,
  sectors,
  type Project,
  type Sector,
} from "../content";
import { ProjectCard } from "../components/ProjectCard";

const sorts: Record<
  string,
  { label: string; fn: (a: Project, b: Project) => number }
> = {
  newest: { label: "Newest first", fn: (a, b) => b.year - a.year },
  largest: { label: "Largest first", fn: (a, b) => b.area - a.area },
  quickest: { label: "Shortest programme", fn: (a, b) => a.months - b.months },
};
type Sort = "newest" | "largest" | "quickest";

export function Projects() {
  const [sector, setSector] = useState<Sector | "All">("All");
  const [material, setMaterial] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const shown = projects
    .filter(
      (p) =>
        (sector === "All" || p.sector === sector) &&
        (!material || p.materials.includes(material)),
    )
    .sort(sorts[sort].fn);
  const usedIds = new Set(projects.flatMap((p) => p.materials));

  return (
    <>
      <header className="page-head">
        <h1>Projects</h1>
        <p className="lede">
          Homes, inns, restaurants and one map-maker's studio, all within a
          day's drive of Portland. Each one began with a handful of samples on a
          table.
        </p>
      </header>

      <section className="section" aria-label="Project list">
        <div className="filters">
          <div className="segmented" role="group" aria-label="Sector">
            {(["All", ...sectors] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sector === s}
                onClick={() => setSector(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="filter-selects">
            <label>
              <span>Uses</span>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              >
                <option value="">Any material</option>
                {materials
                  .filter((m) => usedIds.has(m.id))
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>
        {shown.length ? (
          <div className="project-grid">
            {shown.map((p, i) => (
              <ProjectCard key={p.slug} project={p} eager={i < 2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No projects match that combination yet.</p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setSector("All");
                setMaterial("");
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
