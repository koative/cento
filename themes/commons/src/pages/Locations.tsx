import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { amenityFilters, locations } from "../content";
import { CityMap } from "../components/CityMap";
import { DeskStatus } from "../components/DeskStatus";

export function Locations() {
  const [needs, setNeeds] = useState<string[]>([]);
  const shown = locations.filter((l) =>
    needs.every((n) => l.amenities.includes(n)),
  );
  const toggle = (n: string) =>
    setNeeds((cur) =>
      cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n],
    );

  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>Four houses across Eastmere</h1>
          <p className="lede">
            A mill, a warehouse, a library and a corner above the station. One
            key card opens your home house around the clock and the others
            whenever the front desk is in.
          </p>
        </div>
        <CityMap houses={locations} />
      </header>

      <section className="wrap" aria-labelledby="filter-title">
        <div className="filter-bar">
          <h2 id="filter-title" className="filter-title">
            What do you need?
          </h2>
          <div className="chips" role="group" aria-labelledby="filter-title">
            {amenityFilters.map((n) => (
              <button
                key={n}
                type="button"
                className="chip"
                aria-pressed={needs.includes(n)}
                onClick={() => toggle(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="filter-count" aria-live="polite">
            {shown.length === locations.length
              ? "Showing all four houses"
              : `${shown.length} of ${locations.length} houses have everything you picked`}
          </p>
        </div>

        {shown.length ? (
          <ul className="location-list">
            {shown.map((l) => (
              <li key={l.id} className="location-row">
                <img
                  src={l.image.src}
                  alt={l.image.alt}
                  width={l.image.w}
                  height={l.image.h}
                  loading="lazy"
                />
                <div className="location-body">
                  <h2>
                    <Link to={`/locations/${l.id}`}>{l.name}</Link>
                  </h2>
                  <p className="location-where">
                    {l.neighbourhood} · {l.address}
                  </p>
                  <p>{l.short}</p>
                  <dl className="facts">
                    <div>
                      <dt>Desks</dt>
                      <dd>{l.desks}</dd>
                    </div>
                    <div>
                      <dt>Floors</dt>
                      <dd>{l.floors}</dd>
                    </div>
                    <div>
                      <dt>Best for</dt>
                      <dd>{l.bestFor}</dd>
                    </div>
                  </dl>
                  <ul className="amenities">
                    {l.amenities.map((a) => (
                      <li
                        key={a}
                        data-match={needs.includes(a) ? "" : undefined}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p className="location-foot">
                    <DeskStatus hours={l.staffed} />
                    <Link to={`/locations/${l.id}`} className="text-link">
                      Visit {l.name} <ArrowRight aria-hidden="true" />
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No single house has all of that yet. Try dropping one filter, or
              ask us; studios change hands every month.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => setNeeds([])}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
