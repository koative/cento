import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import {
  images,
  resources,
  resourcesPage,
  resourceTypes,
  skills,
  type ResourceType,
  type SkillId,
} from "../content";
import { Sheet } from "../components/Sheet";

export function Resources() {
  const [type, setType] = useState<ResourceType | "all">("all");
  const [skill, setSkill] = useState<SkillId | "all">("all");
  const [q, setQ] = useState("");

  const needle = q.trim().toLowerCase();
  const list = resources.filter(
    (r) =>
      (type === "all" || r.type === type) &&
      (skill === "all" || r.skill === skill) &&
      (!needle || `${r.title} ${r.summary}`.toLowerCase().includes(needle)),
  );

  return (
    <div className="page">
      <header className="page-head page-head-photo wrap">
        <div>
          <h1>{resourcesPage.title}</h1>
          <p className="lede">{resourcesPage.intro}</p>
        </div>
        <img
          src={images.notebook.src}
          alt={images.notebook.alt}
          width={images.notebook.w}
          height={images.notebook.h}
        />
      </header>

      <div className="wrap filters" role="group" aria-label="Filter resources">
        <div className="chips" role="group" aria-label="Type">
          {(["all", ...resourceTypes] as const).map((t) => (
            <button
              key={t}
              type="button"
              className="chip"
              aria-pressed={type === t}
              onClick={() => setType(t)}
            >
              {t === "all" ? "Everything" : t + "s"}
            </button>
          ))}
        </div>
        <div className="filter-selects">
          <label>
            <span>Skill</span>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value as SkillId | "all")}
            >
              <option value="all">Every skill</option>
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="search">
            <span>Search</span>
            <span className="search-box">
              <Search aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="agenda, hiring, no…"
              />
            </span>
          </label>
        </div>
      </div>

      <p className="wrap result-count" aria-live="polite">
        {list.length === 1 ? "1 resource" : `${list.length} resources`}
      </p>

      {list.length ? (
        <ul className="wrap res-grid">
          {list.map((r) => (
            <li key={r.slug}>
              <Link to={`/resources/${r.slug}`} className="res-item">
                <Sheet r={r} />
                <span className="res-title">{r.title}</span>
                <span className="res-summary">{r.summary}</span>
                <span className="res-meta">
                  {r.format} · {r.minutes} min ·{" "}
                  {skills.find((s) => s.id === r.skill)!.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="wrap empty">
          <p>
            No resource matches “{q || type}”. Try a skill instead, or clear the
            filters.
          </p>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setType("all");
              setSkill("all");
              setQ("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
