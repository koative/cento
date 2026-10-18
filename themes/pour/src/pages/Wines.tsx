import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { colours, countries, images, wines, type Colour } from "../content";
import { money } from "../lib/cart";
import { WineCard } from "../components/WineCard";

const sorts = {
  shelf: "Staff order",
  new: "Newest arrivals",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  light: "Lightest first",
  wild: "Wildest first",
} as const;
type Sort = keyof typeof sorts;

const maxPrice = Math.max(...wines.map((w) => w.price));

export function Wines() {
  const [query, setQuery] = useState("");
  const [colour, setColour] = useState<Colour | "All">("All");
  const [country, setCountry] = useState("All");
  const [byGlass, setByGlass] = useState(false);
  const [noSulphur, setNoSulphur] = useState(false);
  const [max, setMax] = useState(maxPrice);
  const [sort, setSort] = useState<Sort>("shelf");

  const q = query.trim().toLowerCase();
  const list = wines
    .filter(
      (w) =>
        (colour === "All" || w.colour === colour) &&
        (country === "All" || w.country === country) &&
        (!byGlass || w.glass) &&
        (!noSulphur || w.sulphur === "None added") &&
        w.price <= max &&
        (!q ||
          [w.name, w.producer, w.grapes, w.region, w.country].some((s) =>
            s.toLowerCase().includes(q),
          )),
    )
    .sort((a, b) => {
      switch (sort) {
        case "new":
          return b.added.localeCompare(a.added);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "light":
          return a.body - b.body;
        case "wild":
          return b.wild - a.wild;
        default:
          return 0;
      }
    });

  function reset() {
    setQuery("");
    setColour("All");
    setCountry("All");
    setByGlass(false);
    setNoSulphur(false);
    setMax(maxPrice);
  }

  return (
    <div className="page">
      <header className="page-head with-photo">
        <div>
          <h1>The shelf</h1>
          <p className="lead">
            {wines.length} bottles from small farms in {countries.length}{" "}
            countries, every one tasted before it got here. Mix any six and the
            lot is 10% off.
          </p>
          <p>
            Not sure where to start?{" "}
            <Link to="/finder">Try the taste finder</Link>.
          </p>
        </div>
        <img
          src={images.shelves}
          alt="Wooden racks floor to ceiling, filled with bottles laid on their sides"
          width={1551}
          height={804}
        />
      </header>

      <div className="shop-layout">
        <aside className="filters" aria-label="Filter wines">
          <div className="search-field">
            <label htmlFor="wine-search">Search</label>
            <div className="input-icon">
              <Search size={18} aria-hidden="true" />
              <input
                id="wine-search"
                type="search"
                placeholder="Grape, region, producer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <fieldset className="chips">
            <legend>Colour</legend>
            {(["All", ...colours] as const).map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                data-colour={c}
                aria-pressed={colour === c}
                onClick={() => setColour(c)}
              >
                {c}
              </button>
            ))}
          </fieldset>
          <div className="select-field">
            <label htmlFor="wine-country">Country</label>
            <select
              id="wine-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="All">All countries</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="range-field">
            <label htmlFor="wine-max">
              Up to <b className="num">{money(max)}</b>
            </label>
            <input
              id="wine-max"
              type="range"
              min={20}
              max={maxPrice}
              step={1}
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
          <label className="check">
            <input
              type="checkbox"
              checked={byGlass}
              onChange={(e) => setByGlass(e.target.checked)}
            />
            Open at the bar tonight
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={noSulphur}
              onChange={(e) => setNoSulphur(e.target.checked)}
            />
            No sulphur added
          </label>
          <button type="button" className="text-btn" onClick={reset}>
            Clear all filters
          </button>
        </aside>

        <section className="shop-results" aria-labelledby="results-count">
          <div className="results-bar">
            <h2 id="results-count" aria-live="polite">
              {list.length} {list.length === 1 ? "bottle" : "bottles"}
            </h2>
            <div className="select-field inline">
              <label htmlFor="wine-sort">Sort</label>
              <select
                id="wine-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {list.length ? (
            <div className="wine-grid">
              {list.map((w) => (
                <WineCard key={w.id} wine={w} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                Nothing on the shelf matches all of that. Loosen a filter, or
                ask us: we probably have something in the back.
              </p>
              <button type="button" className="btn btn-ghost" onClick={reset}>
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
