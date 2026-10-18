import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Link } from "../router";
import {
  animals,
  speciesLabel,
  tags,
  type Animal,
  type Species,
  type Tag,
} from "../content";
import { ageGroup, ageGroups } from "../lib/util";
import { KennelCard } from "../components/KennelCard";

const speciesList: Species[] = ["dog", "cat", "rabbit"];
type Sort = { label: string; fn: (a: Animal, b: Animal) => number };
const sorts: Record<
  "longest" | "newest" | "youngest" | "oldest" | "name",
  Sort
> = {
  longest: { label: "Waiting longest", fn: (a, b) => b.daysHere - a.daysHere },
  newest: { label: "Newest arrivals", fn: (a, b) => a.daysHere - b.daysHere },
  youngest: {
    label: "Youngest first",
    fn: (a, b) => a.ageMonths - b.ageMonths,
  },
  oldest: { label: "Oldest first", fn: (a, b) => b.ageMonths - a.ageMonths },
  name: { label: "Name A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};
type SortKey = keyof typeof sorts;

const toggles = [
  { key: "kids", label: "Good with kids" },
  { key: "dogs", label: "Good with dogs" },
  { key: "cats", label: "Good with cats" },
  { key: "apartment", label: "Apartment-friendly" },
  { key: "green", label: "First-time friendly (green tag)" },
] as const;
type ToggleKey = (typeof toggles)[number]["key"];

function initialSpecies(): Species | "all" {
  const s = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(
    "species",
  );
  return speciesList.includes(s as Species) ? (s as Species) : "all";
}

export function Animals() {
  const [species, setSpecies] = useState<Species | "all">(initialSpecies);
  const [query, setQuery] = useState("");
  const [age, setAge] = useState("any");
  const [size, setSize] = useState("any");
  const [on, setOn] = useState<Record<ToggleKey, boolean>>({
    kids: false,
    dogs: false,
    cats: false,
    apartment: false,
    green: false,
  });
  const [sort, setSort] = useState<SortKey>("longest");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return animals
      .filter(
        (a) =>
          (species === "all" || a.species === species) &&
          (!q ||
            `${a.name} ${a.breed} ${a.colour}`.toLowerCase().includes(q)) &&
          (age === "any" || ageGroup(a.ageMonths) === age) &&
          (size === "any" || a.size === size) &&
          (!on.kids || a.goodWith.kids === "yes") &&
          (!on.dogs || a.goodWith.dogs === "yes") &&
          (!on.cats || a.goodWith.cats === "yes") &&
          (!on.apartment || a.apartmentOk) &&
          (!on.green || a.tag === "green"),
      )
      .sort(sorts[sort].fn);
  }, [species, query, age, size, on, sort]);

  const active =
    (species !== "all" ? 1 : 0) +
    (query ? 1 : 0) +
    (age !== "any" ? 1 : 0) +
    (size !== "any" ? 1 : 0) +
    Object.values(on).filter(Boolean).length;

  function reset() {
    setSpecies("all");
    setQuery("");
    setAge("any");
    setSize("any");
    setOn({
      kids: false,
      dogs: false,
      cats: false,
      apartment: false,
      green: false,
    });
  }

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Adoptable animals</h1>
        <p className="lede">
          Everyone here is vaccinated, microchipped and has been living with us
          long enough for us to tell you who they really are. Not sure where to
          start? <Link to="/match">Take the matching quiz</Link>.
        </p>
      </header>

      <div className="species-tabs" role="group" aria-label="Species">
        <button
          type="button"
          aria-pressed={species === "all"}
          onClick={() => setSpecies("all")}
        >
          Everyone <span className="num">{animals.length}</span>
        </button>
        {speciesList.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={species === s}
            onClick={() => setSpecies(s)}
          >
            {speciesLabel[s].many}{" "}
            <span className="num">
              {animals.filter((a) => a.species === s).length}
            </span>
          </button>
        ))}
      </div>

      <div className="browse">
        <aside className="filters" aria-label="Filters">
          <button
            type="button"
            className="btn btn-quiet filters-toggle"
            aria-expanded={showFilters}
            aria-controls="filter-panel"
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal aria-hidden="true" /> Filters
            {active ? ` (${active})` : ""}
          </button>
          <div
            id="filter-panel"
            className="filter-panel"
            data-open={showFilters ? "" : undefined}
          >
            <div className="field search-field">
              <label htmlFor="q">Search by name or breed</label>
              <div className="input-icon">
                <Search aria-hidden="true" />
                <input
                  id="q"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “terrier” or “Mabel”"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="age">Age</label>
              <select
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="any">Any age</option>
                {ageGroups.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="any">Any size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
            <fieldset className="checks">
              <legend>Must be</legend>
              {toggles.map((t) => (
                <label key={t.key} className="check">
                  <input
                    type="checkbox"
                    checked={on[t.key]}
                    onChange={(e) =>
                      setOn({ ...on, [t.key]: e.target.checked })
                    }
                  />
                  {t.label}
                </label>
              ))}
            </fieldset>
            {active > 0 && (
              <button type="button" className="text-button" onClick={reset}>
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        <section className="results" aria-labelledby="results-h">
          <div className="results-bar">
            <h2 id="results-h" aria-live="polite">
              {results.length} {results.length === 1 ? "animal" : "animals"}
            </h2>
            <div className="sort">
              <label htmlFor="sort">Sort</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                {Object.entries(sorts).map(([k, s]) => (
                  <option key={k} value={k}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {results.length ? (
            <div className="kgrid kgrid-3">
              {results.map((a) => (
                <KennelCard key={a.id} animal={a} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                Nobody matches all of that right now. New animals arrive most
                weeks — try loosening a filter, or sign up to Kennel notes
                below.
              </p>
              <button type="button" className="btn btn-primary" onClick={reset}>
                Clear filters
              </button>
            </div>
          )}

          <section className="tag-legend" aria-labelledby="tags-h">
            <h3 id="tags-h">What the collar tags mean</h3>
            <dl>
              {(Object.keys(tags) as Tag[]).map((t) => (
                <div key={t} data-tag={t}>
                  <dt>
                    <span className="tag-chip" data-tag={t}>
                      {tags[t].label}
                    </span>
                  </dt>
                  <dd>{tags[t].note}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
      </div>
    </div>
  );
}
