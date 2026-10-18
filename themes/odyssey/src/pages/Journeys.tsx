import { useState } from "react";
import { journeys, monthNames } from "../content";
import { JourneyRow } from "../components/Pieces";
import { Link } from "../router";

const lengths = [
  { label: "Any length", test: () => true },
  { label: "Up to 8 days", test: (days: number) => days <= 8 },
  { label: "9 to 11 days", test: (days: number) => days >= 9 && days <= 11 },
  { label: "12 days or more", test: (days: number) => days >= 12 },
];

export function Journeys() {
  const [length, setLength] = useState(0);
  const [month, setMonth] = useState(-1);
  const list = journeys.filter((j) => {
    const days = j.stops.reduce((s, x) => s + x.nights, 0) + 1;
    return (
      lengths[length].test(days) && (month < 0 || j.months.includes(month))
    );
  });

  return (
    <>
      <header className="page-head wrap">
        <h1>Journeys</h1>
        <p className="lede">
          Seven routes we have run many times, priced per person with two
          sharing and every transfer included. Treat them as a starting point:
          any of them can be opened in the planner and reshaped.
        </p>
      </header>

      <section className="wrap filters" aria-label="Filter journeys">
        <fieldset className="seg">
          <legend>Length</legend>
          {lengths.map((l, i) => (
            <label key={l.label}>
              <input
                type="radio"
                name="length"
                checked={length === i}
                onChange={() => setLength(i)}
              />
              <span>{l.label}</span>
            </label>
          ))}
        </fieldset>
        <div className="filter-selects">
          <label>
            Departing in
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
        </div>
      </section>

      <section className="wrap section-tight" aria-label="Journeys">
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "journey" : "journeys"}
        </p>
        {list.length ? (
          <ul className="journey-list">
            {list.map((j, i) => (
              <JourneyRow key={j.slug} j={j} lazy={i > 2} />
            ))}
          </ul>
        ) : (
          <div className="empty">
            <h2>No set journey fits those dates.</h2>
            <p>
              That usually means it is the wrong season for our usual routes,
              not that there is nowhere to go. Draft something in the{" "}
              <Link to="/planner">planner</Link> and we will tell you what
              works.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setLength(0);
                setMonth(-1);
              }}
            >
              Show all journeys
            </button>
          </div>
        )}
      </section>

      <section className="wrap section note-band">
        <h2>Prices, plainly</h2>
        <p>
          Prices are from-prices per person, two sharing, in the cheapest month
          listed, excluding international flights. They include every night,
          every transfer on the route, the guides named on each journey and our
          24-hour line. Your planner confirms the real figure in the first
          draft.
        </p>
      </section>
    </>
  );
}
