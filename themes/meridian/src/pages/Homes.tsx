import { useState } from "react";
import { List, Map as MapIcon, RotateCcw, Search } from "lucide-react";
import {
  areas,
  listings,
  type AreaSlug,
  type HomeType,
  type Mode,
} from "../content";
import { money } from "../lib/format";
import {
  defaultFilters,
  setFilters,
  useFilters,
  type Sort,
} from "../lib/store";
import { CityMap } from "../components/CityMap";
import { ListingCard } from "../components/ListingCard";

const priceSteps: Record<Mode, number[]> = {
  buy: [500000, 750000, 1000000, 1500000],
  rent: [2500, 3000, 3500, 4000],
};

const sorts: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "size", label: "Largest first" },
];

const types: HomeType[] = ["House", "Townhouse", "Apartment", "Cottage"];

export function Homes() {
  const f = useFilters();
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "map">("list");

  const q = f.query.trim().toLowerCase();
  const results = listings
    .filter(
      (l) =>
        l.mode === f.mode &&
        (f.area === "all" || l.area === f.area) &&
        l.beds >= f.beds &&
        (!f.maxPrice || l.price <= f.maxPrice) &&
        (f.type === "all" || l.type === f.type) &&
        (!q ||
          `${l.address} ${l.area.replace("-", " ")} ${l.type}`
            .toLowerCase()
            .includes(q)),
    )
    .sort((a, b) =>
      f.sort === "price-asc"
        ? a.price - b.price
        : f.sort === "price-desc"
          ? b.price - a.price
          : f.sort === "size"
            ? b.sqft - a.sqft
            : b.listed.localeCompare(a.listed),
    );
  const filtered =
    JSON.stringify({ ...f, sort: "newest" }) !==
    JSON.stringify({ ...defaultFilters, mode: f.mode });

  return (
    <div className="search-page">
      <div className="wrap search-head">
        <h1>
          {f.mode === "buy" ? "Homes for sale" : "Homes to rent"} in Port Ellery
        </h1>
        <form
          className="filters"
          role="search"
          aria-label="Filter homes"
          onSubmit={(e) => e.preventDefault()}
        >
          <fieldset className="segmented">
            <legend className="visually-hidden">Looking to</legend>
            {(["buy", "rent"] as Mode[]).map((m) => (
              <label key={m}>
                <input
                  type="radio"
                  name="mode"
                  value={m}
                  checked={f.mode === m}
                  onChange={() => setFilters({ mode: m, maxPrice: 0 })}
                />{" "}
                <span>{m === "buy" ? "Buy" : "Rent"}</span>
              </label>
            ))}
          </fieldset>
          <div className="field field-search">
            <label htmlFor="s-q">Street or neighborhood</label>
            <div className="input-icon">
              <Search size={17} aria-hidden="true" />
              <input
                id="s-q"
                type="search"
                placeholder="e.g. Larkspur"
                value={f.query}
                onChange={(e) => setFilters({ query: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="s-area">Neighborhood</label>
            <select
              id="s-area"
              value={f.area}
              onChange={(e) =>
                setFilters({ area: e.target.value as AreaSlug | "all" })
              }
            >
              <option value="all">Anywhere</option>
              {areas.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="s-beds">Bedrooms</label>
            <select
              id="s-beds"
              value={f.beds}
              onChange={(e) => setFilters({ beds: Number(e.target.value) })}
            >
              <option value={0}>Any</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="s-price">Max price</label>
            <select
              id="s-price"
              value={f.maxPrice}
              onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
            >
              <option value={0}>No limit</option>
              {priceSteps[f.mode].map((p) => (
                <option key={p} value={p}>
                  {money(p)}
                  {f.mode === "rent" ? " / mo" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="s-type">Type</label>
            <select
              id="s-type"
              value={f.type}
              onChange={(e) =>
                setFilters({ type: e.target.value as HomeType | "all" })
              }
            >
              <option value="all">Any type</option>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="wrap results-bar">
        <p aria-live="polite" className="num">
          <strong>{results.length}</strong>{" "}
          {results.length === 1 ? "home" : "homes"}
          {f.area !== "all" && (
            <> in {areas.find((a) => a.slug === f.area)?.name}</>
          )}
        </p>
        {filtered && (
          <button
            type="button"
            className="text-btn"
            onClick={() => setFilters({ ...defaultFilters, mode: f.mode })}
          >
            <RotateCcw size={15} aria-hidden="true" /> Clear filters
          </button>
        )}
        <div className="field field-inline">
          <label htmlFor="s-sort">Sort</label>
          <select
            id="s-sort"
            value={f.sort}
            onChange={(e) => setFilters({ sort: e.target.value as Sort })}
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="view-toggle" role="group" aria-label="View">
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            <List size={16} aria-hidden="true" /> List
          </button>
          <button
            type="button"
            aria-pressed={view === "map"}
            onClick={() => setView("map")}
          >
            <MapIcon size={16} aria-hidden="true" /> Map
          </button>
        </div>
      </div>

      <div className="wrap results" data-view={view}>
        <div className="results-list">
          {results.length ? (
            <div className="card-grid card-grid-2">
              {results.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  active={hover === l.id || selected === l.id}
                  onHover={setHover}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No homes match that search yet</h2>
              <p>
                Try a higher price, fewer bedrooms or another neighborhood. New
                homes reach our books every week, often before they are
                advertised.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => setFilters({ ...defaultFilters, mode: f.mode })}
              >
                <RotateCcw size={16} aria-hidden="true" /> Clear filters
              </button>
            </div>
          )}
        </div>
        <div className="results-map">
          <CityMap
            label="Map of results. Choose a neighborhood to filter by it, or a price to preview the home."
            listings={results}
            activeArea={f.area}
            onArea={(slug) =>
              setFilters({ area: f.area === slug ? "all" : slug })
            }
            highlight={hover}
            selected={selected}
            onSelect={setSelected}
          />
          <p className="map-note">
            Choose a neighborhood on the map to filter by it. Map is
            illustrative.
          </p>
        </div>
      </div>
    </div>
  );
}
