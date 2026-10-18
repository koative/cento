import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { ageGroups, exhibits, type Exhibit } from "../content";
import { suits, toggleAge, usePlan } from "../lib/plan";
import { ExhibitCard } from "../components/ExhibitCard";

const noises = ["Any", "Calm", "Lively", "Loud"] as const;
const sorts: Record<
  string,
  { label: string; by: (a: Exhibit, b: Exhibit) => number }
> = {
  floor: { label: "Museum order", by: () => 0 },
  short: { label: "Shortest visit first", by: (a, b) => a.stay - b.stay },
  az: { label: "A to Z", by: (a, b) => a.name.localeCompare(b.name) },
};

export function Exhibits() {
  const plan = usePlan();
  const [noise, setNoise] = useState<(typeof noises)[number]>("Any");
  const [sort, setSort] = useState("floor");
  const shown = exhibits
    .filter(
      (e) => suits(plan.ages, e.ages) && (noise === "Any" || e.noise === noise),
    )
    .sort(sorts[sort].by);

  return (
    <>
      <section className="page-hero wrap">
        <h1>Exhibits</h1>
        <p className="lede">
          Nine galleries over three floors, a courtyard and a roof. Filter by
          who’s coming and how much noise they can take.
        </p>
      </section>

      <section className="wrap section-tight" aria-labelledby="filter-title">
        <h2 id="filter-title" className="sr-only">
          Filter exhibits
        </h2>
        <div className="filters">
          <fieldset className="chips">
            <legend>Ages</legend>
            {ageGroups.map((a) => (
              <label key={a.id} className="chip">
                <input
                  type="checkbox"
                  checked={plan.ages.includes(a.id)}
                  onChange={() => toggleAge(a.id)}
                />
                <span>{a.label}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="chips">
            <legend>Noise</legend>
            {noises.map((n) => (
              <label key={n} className="chip">
                <input
                  type="radio"
                  name="noise"
                  checked={noise === n}
                  onChange={() => setNoise(n)}
                />
                <span>{n}</span>
              </label>
            ))}
          </fieldset>
          <label className="sort">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(sorts).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} of {exhibits.length} galleries
        </p>
      </section>

      <section className="wrap section-tight" aria-label="Galleries">
        {shown.length ? (
          <div className="ex-grid">
            {shown.map((ex, i) => (
              <ExhibitCard key={ex.slug} ex={ex} lazy={i > 2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              No gallery matches that mix. Try “Any” noise, or fewer age groups.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => setNoise("Any")}
            >
              Show any noise level
            </button>
          </div>
        )}
      </section>

      <section className="section wrap split-note">
        <h2>Galleries change, the shapes don’t</h2>
        <p>
          We refresh one gallery every season and swap the Dino Dig skeleton
          three times a year. Members hear first, and preview new exhibits the
          evening before they open.
        </p>
        <Link to="/visit" className="text-link">
          Plan a route through the galleries <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
