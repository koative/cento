import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  products,
  shopCopy,
  skinTypes,
  steps,
  type Skin,
  type Step,
  type Time,
} from "../content";
import { ProductCard } from "../components/ProductCard";

const sorts = {
  featured: "Featured",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  name: "Name, A to Z",
};
type Sort = keyof typeof sorts;

export function Shop() {
  const preset = new URLSearchParams(
    window.location.hash.split("?")[1] ?? "",
  ).get("step");
  const [step, setStep] = useState<Step | "all">(
    steps.some((s) => s.id === preset) ? (preset as Step) : "all",
  );
  const [skin, setSkin] = useState<Skin[]>([]);
  const [time, setTime] = useState<Time | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [open, setOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const list = products
    .filter(
      (p) =>
        (step === "all" || p.step === step) &&
        (time === "all" || p.time.includes(time)) &&
        skin.every((s) => p.skin.includes(s)) &&
        (!q ||
          [p.name, p.line, p.texture, ...p.ingredients]
            .join(" ")
            .toLowerCase()
            .includes(q)),
    )
    .sort((a, b) =>
      sort === "price-asc"
        ? a.sizes[0].price - b.sizes[0].price
        : sort === "price-desc"
          ? b.sizes[0].price - a.sizes[0].price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : a.rank - b.rank,
    );
  const active =
    (step !== "all" ? 1 : 0) +
    skin.length +
    (time !== "all" ? 1 : 0) +
    (q ? 1 : 0);

  function reset() {
    setStep("all");
    setSkin([]);
    setTime("all");
    setQuery("");
  }

  return (
    <div className="page shop-page">
      <header className="page-head">
        <h1>{shopCopy.title}</h1>
        <p className="lede">{shopCopy.text}</p>
      </header>

      <div className="shop-layout">
        <aside
          className="filters"
          aria-label="Filters"
          data-open={open || undefined}
        >
          <button
            type="button"
            className="filters-toggle"
            aria-expanded={open}
            aria-controls="filter-panel"
            onClick={() => setOpen(!open)}
          >
            <SlidersHorizontal size={18} aria-hidden="true" /> Filter
            {active ? ` (${active})` : ""}
          </button>
          <div id="filter-panel" className="filter-panel">
            <div className="field search-field">
              <label htmlFor="shop-search">Search</label>
              <div className="input-icon">
                <Search size={16} aria-hidden="true" />
                <input
                  id="shop-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Oat, serum, SPF…"
                />
              </div>
            </div>
            <fieldset>
              <legend>Step</legend>
              <div className="chips">
                {[{ id: "all" as const, label: "All steps" }, ...steps].map(
                  (s) => (
                    <label key={s.id} className="chip">
                      <input
                        type="radio"
                        name="step"
                        checked={step === s.id}
                        onChange={() => setStep(s.id)}
                      />
                      {s.label}
                    </label>
                  ),
                )}
              </div>
            </fieldset>
            <fieldset>
              <legend>Suits skin that is</legend>
              <div className="chips">
                {skinTypes.map((s) => (
                  <label key={s.id} className="chip">
                    <input
                      type="checkbox"
                      checked={skin.includes(s.id)}
                      onChange={(e) =>
                        setSkin(
                          e.target.checked
                            ? [...skin, s.id]
                            : skin.filter((x) => x !== s.id),
                        )
                      }
                    />
                    {s.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Time of day</legend>
              <div className="chips">
                {(
                  [
                    ["all", "Any time"],
                    ["am", "Morning"],
                    ["pm", "Evening"],
                  ] as const
                ).map(([id, label]) => (
                  <label key={id} className="chip">
                    <input
                      type="radio"
                      name="time"
                      checked={time === id}
                      onChange={() => setTime(id)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            {active > 0 && (
              <button type="button" className="text-link reset" onClick={reset}>
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        <section className="results" aria-labelledby="results-count">
          <div className="results-bar">
            <p id="results-count" aria-live="polite">
              {list.length} {list.length === 1 ? "product" : "products"}
            </p>
            <div className="sort">
              <label htmlFor="shop-sort">Sort by</label>
              <select
                id="shop-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {list.length ? (
            <div className="product-grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} headingLevel={2} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Nothing matches all of that</h2>
              <p>
                Try fewer skin types, or search for an ingredient like “oat” or
                “rosehip”.
              </p>
              <button type="button" className="btn" onClick={reset}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
