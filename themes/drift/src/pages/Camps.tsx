import { useState } from "react";
import { camps, images } from "../content";
import { CampCard, nextDeparture } from "../components/CampCard";

const levels = ["All", ...new Set(camps.map((c) => c.level))];
const regions = [...new Set(camps.map((c) => c.region))];
const months = [
  ...new Set(camps.flatMap((c) => c.departures.map((d) => d.date.slice(0, 7)))),
].sort();
const monthName = (ym: string) =>
  new Date(`${ym}-01T12:00`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

const sorts = {
  soonest: "Next departure",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  length: "Shortest first",
};
type Sort = keyof typeof sorts;

export function Camps() {
  const [level, setLevel] = useState("All");
  const [region, setRegion] = useState("");
  const [month, setMonth] = useState("");
  const [sort, setSort] = useState<Sort>("soonest");

  const list = camps
    .filter((c) => level === "All" || c.level === level)
    .filter((c) => !region || c.region === region)
    .filter((c) => !month || c.departures.some((d) => d.date.startsWith(month)))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "length") return a.nights - b.nights;
      return (nextDeparture(a)?.date ?? "9999").localeCompare(
        nextDeparture(b)?.date ?? "9999",
      );
    });

  function reset() {
    setLevel("All");
    setRegion("");
    setMonth("");
  }

  return (
    <>
      <section className="page-head page-head-photo">
        <img
          src={images.lineup.src}
          alt=""
          width={images.lineup.w}
          height={images.lineup.h}
        />
        <div className="wrap">
          <h1>Surf camps</h1>
          <p className="lede">
            A week of surfing twice a day changes more than a year of occasional
            lessons. Camps at our home beach, a van trip up the coast, and
            warm-water weeks in Baja and Costa Rica.
          </p>
        </div>
      </section>

      <section className="wrap camps-page" aria-label="Camp finder">
        <form className="filters" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="pills">
            <legend>Level</legend>
            {levels.map((l) => (
              <label key={l}>
                <input
                  type="radio"
                  name="level"
                  value={l}
                  checked={l === level}
                  onChange={() => setLevel(l)}
                />
                <span>{l}</span>
              </label>
            ))}
          </fieldset>
          <div className="filter-selects">
            <label>
              <span>Where</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Anywhere</option>
                {regions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Month</span>
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Any month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {monthName(m)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Sort by</span>
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
        </form>

        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "camp" : "camps"}
          {month ? ` departing in ${monthName(month)}` : ""}
        </p>

        {list.length ? (
          <div className="camp-grid">
            {list.map((c) => (
              <CampCard key={c.id} camp={c} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No camps match all of that</h2>
            <p>
              Try another month or level, or email us: we run private group
              camps on request.
            </p>
            <button type="button" className="btn btn-ink" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
