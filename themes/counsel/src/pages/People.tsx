import { useState } from "react";
import { Search } from "lucide-react";
import { areas, people } from "../content";
import { PageHead } from "../components/PageHead";
import { PersonCard } from "../components/PersonCard";
import { Closing } from "../components/Closing";

const roles = [
  { id: "all", label: "Everyone" },
  { id: "partners", label: "Partners" },
  { id: "others", label: "Counsel & associates" },
] as const;

export function People() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [role, setRole] = useState<(typeof roles)[number]["id"]>("all");

  const q = query.trim().toLowerCase();
  const shown = people.filter(
    (p) =>
      (!q || p.name.toLowerCase().includes(q)) &&
      (area === "all" || p.areas.includes(area)) &&
      (role === "all" || (role === "partners") === p.role.endsWith("artner")),
  );

  return (
    <>
      <PageHead
        title="People"
        lede="Every matter has a named partner and a named associate from the first call to the final invoice. These are some of them."
      />

      <section className="wrap section-tight" aria-label="Directory">
        <div className="filters">
          <div className="field field-search">
            <label htmlFor="people-q">Search by name</label>
            <div className="input-icon">
              <Search size={16} aria-hidden="true" />
              <input
                id="people-q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Tierney"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="people-area">Practice area</label>
            <select
              id="people-area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="all">All practice areas</option>
              {areas.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="segmented" role="group" aria-label="Role">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={role === r.id}
                onClick={() => setRole(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <p className="result-count" aria-live="polite">
          {shown.length} of {people.length} people
        </p>

        {shown.length ? (
          <div className="people-grid">
            {shown.map((p) => (
              <PersonCard key={p.slug} person={p} level={2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No one matches those filters.</p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setQuery("");
                setArea("all");
                setRole("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <Closing />
    </>
  );
}
