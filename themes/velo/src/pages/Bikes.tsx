import { useState } from "react";
import { bikes, bikeTypes, type Bike, type BikeType } from "../content";
import { BikeCard } from "../components/BikeCard";
import { Link } from "../router";

const sorts: Record<
  string,
  { label: string; fn: (a: Bike, b: Bike) => number }
> = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  "price-desc": {
    label: "Price, high to low",
    fn: (a, b) => b.price - a.price,
  },
  weight: { label: "Lightest first", fn: (a, b) => a.weight - b.weight },
};
type Sort = keyof typeof sorts;

const budgets = [
  { id: "any", label: "Any price", max: Infinity },
  { id: "1500", label: "Under $1,500", max: 1500 },
  { id: "3500", label: "Under $3,500", max: 3500 },
];

export function Bikes() {
  const [type, setType] = useState<BikeType | "All">("All");
  const [material, setMaterial] = useState("any");
  const [budget, setBudget] = useState("any");
  const [sort, setSort] = useState<Sort>("featured");

  const max = budgets.find((b) => b.id === budget)!.max;
  const shown = bikes
    .filter(
      (b) =>
        (type === "All" || b.type === type) &&
        (material === "any" || b.material === material) &&
        b.price < max,
    )
    .sort(sorts[sort].fn);

  const reset = () => {
    setType("All");
    setMaterial("any");
    setBudget("any");
  };

  return (
    <div className="page">
      <header className="page-head">
        <h1>Bikes on the floor</h1>
        <p className="lead">
          Seven bicycles we stock, ride and service. Six steel frames come out
          of our own back room, one carbon race bike from a mould shop we trust
          — and every one is fitted to you before it leaves.
        </p>
      </header>

      <div className="toolbar" role="search" aria-label="Filter bikes">
        <div className="chips" role="group" aria-label="Type">
          {(["All", ...bikeTypes] as const).map((t) => (
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
                  ? bikes.length
                  : bikes.filter((b) => b.type === t).length}
              </span>
            </button>
          ))}
        </div>
        <div className="selects">
          <label>
            <span>Frame</span>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="any">Any material</option>
              <option value="Steel">Steel</option>
              <option value="Carbon">Carbon</option>
            </select>
          </label>
          <label>
            <span>Budget</span>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              {budgets.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
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
              {Object.entries(sorts).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "bike" : "bikes"}
        {type !== "All" && ` · ${type}`}
      </p>

      {shown.length ? (
        <div className="bike-grid bike-grid-wide">
          {shown.map((b, i) => (
            <BikeCard key={b.id} bike={b} lazy={i > 2} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nothing matches all three</h2>
          <p>
            Try a different frame material or budget — or have one built to
            exactly what you want.
          </p>
          <div className="actions">
            <button type="button" className="btn" onClick={reset}>
              Clear filters
            </button>
            <Link to="/build" className="btn btn-ghost">
              Build your own
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
