import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, LayoutGrid, Rows3, Search } from "lucide-react";
import { Link } from "../router";
import {
  projects,
  projectTypes,
  type Project,
  type ProjectType,
} from "../content";
import { ProjectCard } from "../components/ProjectCard";
import { area, hashQuery } from "../lib/format";

type SortKey = "year" | "name" | "area";
const columns: { key: SortKey | null; label: string; className?: string }[] = [
  { key: "name", label: "Project" },
  { key: null, label: "Type", className: "hide-s" },
  { key: null, label: "Place", className: "hide-m" },
  { key: "area", label: "Area", className: "hide-s right" },
  { key: null, label: "Status", className: "hide-m" },
  { key: "year", label: "Year", className: "right" },
];

export function Projects() {
  const initial = hashQuery().get("type");
  const [type, setType] = useState<ProjectType | "All">(
    projectTypes.includes(initial as ProjectType)
      ? (initial as ProjectType)
      : "All",
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "year",
    dir: -1,
  });
  const [view, setView] = useState<"register" | "plates">("register");
  const [preview, setPreview] = useState<Project>(projects[0]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter((p) => type === "All" || p.type === type)
      .filter(
        (p) =>
          !q ||
          [
            p.name,
            p.place,
            p.country,
            p.type,
            ...p.materials.map((m) => m.spec),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q),
      )
      .sort((a, b) => {
        const d =
          sort.key === "name"
            ? a.name.localeCompare(b.name)
            : a[sort.key] - b[sort.key];
        return d * sort.dir;
      });
  }, [type, query, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === 1 ? -1 : 1 }
        : { key, dir: key === "name" ? 1 : -1 },
    );

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Projects</h1>
        <p>
          Houses, housing, schools, cultural buildings, landscapes and
          retrofits, 2021–2026. Filter by type, search by place or material, or
          sort the register.
        </p>
      </header>

      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter by type">
          {(["All", ...projectTypes] as const).map((t) => (
            <button
              key={t}
              type="button"
              className="chip"
              aria-pressed={type === t}
              onClick={() => setType(t)}
            >
              {t}
              <span className="num">
                {t === "All"
                  ? projects.length
                  : projects.filter((p) => p.type === t).length}
              </span>
            </button>
          ))}
        </div>
        <div className="toolbar-end">
          <label className="search">
            <Search size={16} aria-hidden="true" />
            <span className="visually-hidden">Search projects</span>
            <input
              type="search"
              placeholder="Place or material"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="view-toggle" role="group" aria-label="View">
            <button
              type="button"
              aria-pressed={view === "register"}
              onClick={() => setView("register")}
            >
              <Rows3 size={16} aria-hidden="true" /> Register
            </button>
            <button
              type="button"
              aria-pressed={view === "plates"}
              onClick={() => setView("plates")}
            >
              <LayoutGrid size={16} aria-hidden="true" /> Plates
            </button>
          </div>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {list.length === 1 ? "1 project" : `${list.length} projects`}
        {type !== "All" && ` in ${type.toLowerCase()}`}
        {query.trim() && ` matching “${query.trim()}”`}
      </p>

      {list.length === 0 ? (
        <div className="empty">
          <p>
            No projects match that search. Try a town, a country or a material
            such as “larch” or “brick”.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setQuery("");
              setType("All");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : view === "register" ? (
        <div className="register-wrap">
          <table className="register">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th
                    key={c.label}
                    scope="col"
                    className={c.className}
                    aria-sort={
                      c.key && sort.key === c.key
                        ? sort.dir === 1
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    {c.key ? (
                      <button type="button" onClick={() => toggleSort(c.key!)}>
                        {c.label}
                        {sort.key === c.key &&
                          (sort.dir === 1 ? (
                            <ArrowUp size={14} aria-hidden="true" />
                          ) : (
                            <ArrowDown size={14} aria-hidden="true" />
                          ))}
                      </button>
                    ) : (
                      c.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr
                  key={p.slug}
                  onPointerEnter={() => setPreview(p)}
                  onFocus={() => setPreview(p)}
                >
                  <td>
                    <Link to={"/projects/" + p.slug} className="row-link">
                      {p.name}
                    </Link>
                  </td>
                  <td className="hide-s">{p.type}</td>
                  <td className="hide-m">
                    {p.place}, {p.country}
                  </td>
                  <td className="hide-s right num">{area(p.area)}</td>
                  <td className="hide-m">
                    <span className="status" data-status={p.status}>
                      {p.status}
                    </span>
                  </td>
                  <td className="right num">{p.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <aside className="register-preview" aria-hidden="true">
            <img
              key={preview.slug}
              src={preview.cover.src}
              alt=""
              width={preview.cover.w}
              height={preview.cover.h}
            />
            <p>{preview.summary}</p>
          </aside>
        </div>
      ) : (
        <div className="plates-grid">
          {list.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
