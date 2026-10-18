import { useState } from "react";
import { cases, disciplines, type Case, type Discipline } from "../content";
import { CaseRow } from "../components/CaseRow";

const sorts: Record<
  string,
  { label: string; fn: (a: Case, b: Case) => number }
> = {
  newest: { label: "Newest first", fn: (a, b) => b.year - a.year },
  oldest: { label: "Oldest first", fn: (a, b) => a.year - b.year },
  client: {
    label: "Client A–Z",
    fn: (a, b) => a.client.localeCompare(b.client),
  },
};
type Sort = keyof typeof sorts;
const sectors = [...new Set(cases.map((c) => c.sector))];

export function Work() {
  const [discipline, setDiscipline] = useState<Discipline | "All">("All");
  const [sector, setSector] = useState("All");
  const [sort, setSort] = useState<Sort>("newest");

  const shown = cases
    .filter((c) => discipline === "All" || c.disciplines.includes(discipline))
    .filter((c) => sector === "All" || c.sector === sector)
    .sort(sorts[sort].fn);

  return (
    <>
      <section className="sheet page-head">
        <p className="aside margin-note">
          Each case opens with annotated screens. Switch redlines on to see the
          spacing.
        </p>
        <div className="col">
          <h1 className="display">Case studies</h1>
          <p className="lead">
            Six products, from a commuter ticket to a night-shift dispatch
            board. Each one starts with the people using it and ends with what
            changed for them.
          </p>
        </div>
      </section>

      <div className="sheet filters-sheet">
        <div className="aside" />
        <div className="col filters">
          <div
            className="presets"
            role="group"
            aria-label="Filter by discipline"
          >
            {(["All", ...disciplines] as const).map((d) => (
              <button
                key={d}
                type="button"
                className="chip"
                aria-pressed={discipline === d}
                onClick={() => setDiscipline(d)}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="filter-selects">
            <label>
              <span>Sector</span>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option>All</option>
                {sectors.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([k, s]) => (
                  <option key={k} value={k}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="result-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "case study" : "case studies"}
          </p>
        </div>
      </div>

      {shown.map((c) => (
        <CaseRow key={c.slug} c={c} level={2} />
      ))}
      {shown.length === 0 && (
        <div className="sheet empty">
          <div className="aside" />
          <div className="col">
            <p>
              No case study is filed under both of those. Try one filter at a
              time, or start again from all six.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setDiscipline("All");
                setSector("All");
              }}
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
