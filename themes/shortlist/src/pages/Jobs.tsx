import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  categories,
  cities,
  jobs,
  jobTypes,
  levels,
  workplaces,
  type CategoryId,
} from "../content";
import { companyOf, k } from "../lib/format";
import { JobRow } from "../components/JobRow";

type Sort = "newest" | "pay" | "closing";

function initial() {
  const qs = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const category = qs.get("category");
  return {
    q: qs.get("q") ?? "",
    where: cities.find((c) => c === qs.get("where")) ?? "",
    cats: categories.some((c) => c.id === category)
      ? [category as CategoryId]
      : [],
  };
}

const flip = <T,>(list: T[], v: T) =>
  list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

export function Jobs() {
  const [start] = useState(initial);
  const [q, setQ] = useState(start.q);
  const [where, setWhere] = useState<string>(start.where);
  const [cats, setCats] = useState<CategoryId[]>(start.cats);
  const [places, setPlaces] = useState<string[]>([]);
  const [lvls, setLvls] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [minPay, setMinPay] = useState(0);
  const [sort, setSort] = useState<Sort>("newest");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const list = jobs.filter((j) => {
      const hay =
        `${j.title} ${companyOf(j).name} ${j.summary} ${j.city}`.toLowerCase();
      return (
        words.every((w) => hay.includes(w)) &&
        (!where ||
          j.city === where ||
          (where !== "Remote (US)" && j.workplace === "Remote")) &&
        (!cats.length || cats.includes(j.category)) &&
        (!places.length || places.includes(j.workplace)) &&
        (!lvls.length || lvls.includes(j.level)) &&
        (!types.length || types.includes(j.type)) &&
        j.salary[1] >= minPay
      );
    });
    const by: Record<
      Sort,
      (a: (typeof jobs)[number], b: (typeof jobs)[number]) => number
    > = {
      newest: (a, b) => a.posted - b.posted,
      pay: (a, b) => b.salary[1] - a.salary[1],
      closing: (a, b) => a.closes - b.closes,
    };
    return list.sort(by[sort]);
  }, [q, where, cats, places, lvls, types, minPay, sort]);

  const active =
    cats.length +
    places.length +
    lvls.length +
    types.length +
    (minPay ? 1 : 0) +
    (where ? 1 : 0);
  const clear = () => {
    setQ("");
    setWhere("");
    setCats([]);
    setPlaces([]);
    setLvls([]);
    setTypes([]);
    setMinPay(0);
  };
  const checks = (
    legend: string,
    field: "category" | "workplace" | "level" | "type",
    options: readonly { id: string; label: string }[],
    value: string[],
    set: (v: string[]) => void,
  ) => (
    <fieldset className="filter-group">
      <legend>{legend}</legend>
      {options.map((o) => (
        <label key={o.id} className="check">
          <input
            type="checkbox"
            checked={value.includes(o.id)}
            onChange={() => set(flip(value, o.id))}
          />
          <span>{o.label}</span>
          <span className="check-count num">
            {jobs.filter((j) => j[field] === o.id).length}
          </span>
        </label>
      ))}
    </fieldset>
  );
  const asOptions = (list: readonly string[]) =>
    list.map((v) => ({ id: v, label: v }));

  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>Find jobs</h1>
        <p className="lede">
          Every listing below shows its salary range and the employer’s promised
          reply time. Circle the ones worth a second look.
        </p>
      </div>

      <form
        className="search-bar"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="hero-field">
          <label htmlFor="js-q">What</label>
          <input
            id="js-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Job title, skill or company"
          />
        </div>
        <div className="hero-field">
          <label htmlFor="js-where">Where</label>
          <select
            id="js-where"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
          >
            <option value="">Anywhere</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </form>

      <div className="search-layout">
        <aside
          className="filters"
          data-open={open ? "" : undefined}
          aria-label="Filters"
        >
          <button
            type="button"
            className="filters-toggle btn btn-ghost"
            aria-expanded={open}
            aria-controls="filter-body"
            onClick={() => setOpen((o) => !o)}
          >
            <SlidersHorizontal aria-hidden="true" /> Filters
            {active ? ` (${active})` : ""}
          </button>
          <div id="filter-body" className="filter-body">
            {checks("Trade", "category", categories, cats, (v) =>
              setCats(v as CategoryId[]),
            )}
            {checks(
              "Workplace",
              "workplace",
              asOptions(workplaces),
              places,
              setPlaces,
            )}
            {checks("Level", "level", asOptions(levels), lvls, setLvls)}
            {checks("Hours", "type", asOptions(jobTypes), types, setTypes)}
            <div className="filter-group">
              <label htmlFor="min-pay" className="legend">
                Pays at least{" "}
                <output htmlFor="min-pay" className="num">
                  {minPay ? k(minPay) : "any"}
                </output>
              </label>
              <input
                id="min-pay"
                type="range"
                min={0}
                max={160000}
                step={10000}
                value={minPay}
                onChange={(e) => setMinPay(Number(e.target.value))}
                aria-valuetext={minPay ? `${k(minPay)} or more` : "Any salary"}
              />
            </div>
            <button
              type="button"
              className="text-btn"
              onClick={clear}
              disabled={!active && !q}
            >
              Clear all filters
            </button>
          </div>
        </aside>

        <section className="results" aria-labelledby="results-h">
          <div className="results-head">
            <h2 id="results-h" aria-live="polite">
              {results.length} {results.length === 1 ? "listing" : "listings"}
            </h2>
            <label className="sort">
              <span>Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="newest">Newest first</option>
                <option value="pay">Highest pay</option>
                <option value="closing">Closing soonest</option>
              </select>
            </label>
          </div>
          {results.length ? (
            <div className="listing-stack">
              {results.map((j) => (
                <JobRow key={j.id} job={j} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                Nothing matches all of that. Try widening the pay floor or
                removing a trade.
              </p>
              <button type="button" className="btn btn-ghost" onClick={clear}>
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
