import { useMemo, useState } from "react";
import {
  destinations,
  monthNames,
  regions,
  styles,
  type Region,
  type Style,
} from "../content";
import { DestinationCard } from "../components/Pieces";
import { hashParam } from "../lib/plan";

const sorts = {
  recommended: "Our order",
  flight: "Shortest flight",
  price: "Price, low to high",
  name: "A to Z",
} as const;
type Sort = keyof typeof sorts;

export function Destinations() {
  const [region, setRegion] = useState<Region | "">(() => {
    const r = hashParam("region");
    return regions.find((x) => x === r) ?? "";
  });
  const [picked, setPicked] = useState<Style[]>([]);
  const [month, setMonth] = useState(-1);
  const [sort, setSort] = useState<Sort>("recommended");

  const list = useMemo(() => {
    const out = destinations.filter(
      (d) =>
        (!region || d.region === region) &&
        picked.every((s) => d.styles.includes(s)) &&
        (month < 0 || d.rating[month] > 0),
    );
    if (sort === "flight") out.sort((a, b) => a.flightHours - b.flightHours);
    if (sort === "price") out.sort((a, b) => a.nightly - b.nightly);
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "recommended" && month >= 0)
      out.sort((a, b) => b.rating[month] - a.rating[month]);
    return out;
  }, [region, picked, month, sort]);

  const reset = () => {
    setRegion("");
    setPicked([]);
    setMonth(-1);
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>Destinations</h1>
        <p className="lede">
          Ten places, each with a planner who knows it personally. Filter by the
          kind of trip you want and the month you can travel; we will tell you
          honestly when a place is better left for another season.
        </p>
      </header>

      <section className="wrap filters" aria-label="Filter destinations">
        <fieldset className="seg">
          <legend>Region</legend>
          {["", ...regions].map((r) => (
            <label key={r || "all"}>
              <input
                type="radio"
                name="region"
                checked={region === r}
                onChange={() => setRegion(r as Region | "")}
              />
              <span>{r || "Everywhere"}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="chips">
          <legend>Landscape</legend>
          {styles.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={picked.includes(s)}
              onClick={() =>
                setPicked((p) =>
                  p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
                )
              }
            >
              {s}
            </button>
          ))}
        </fieldset>
        <div className="filter-selects">
          <label>
            Travelling in
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              <option value={-1}>Any month</option>
              {monthNames.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              {Object.entries(sorts).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="wrap section-tight" aria-label="Results">
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "destination" : "destinations"}
          {month >= 0 && ` worth visiting in ${monthNames[month]}`}
        </p>
        {list.length ? (
          <div className="dest-grid">
            {list.map((d, i) => (
              <div key={d.slug} className="dest-cell">
                {month >= 0 && d.rating[month] === 2 && (
                  <p className="pick">Our pick for {monthNames[month]}</p>
                )}
                <DestinationCard d={d} lazy={i > 2} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>Nothing fits all of that, yet.</h2>
            <p>
              Try fewer landscapes or another month. Or tell a planner what you
              are after; our list grows when travellers ask.
            </p>
            <button type="button" className="btn btn-line" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
