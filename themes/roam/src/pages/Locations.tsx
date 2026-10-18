import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { stations } from "../content";
import { oneWayFee } from "../lib/booking";
import { hoursLabel, money, openStatus } from "../lib/format";
import { RegionMap } from "../components/RegionMap";

export function Locations() {
  const [sel, setSel] = useState(stations[0].id);
  const today = new Date().getDay();

  const pick = (id: string) => {
    setSel(id);
    document
      .getElementById(`st-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <>
      <section className="page-head wrap">
        <h1>Five stations on the Salt Coast</h1>
        <p className="lede">
          An airport counter that never closes, a garage downtown, a rail
          station, a beach town and a mountain depot. Pick up at one, return to
          any.
        </p>
      </section>

      <section className="wrap locations-grid" aria-label="Stations">
        <div className="locations-map">
          <RegionMap
            active={[sel]}
            onPick={pick}
            label="Map of stations; choose one to highlight it in the list"
          />
          <p className="muted">
            Choose a sign on the map to find the station in the list.
          </p>
        </div>
        <ul className="location-list">
          {stations.map((s) => {
            const status = openStatus(s);
            return (
              <li
                key={s.id}
                id={`st-${s.id}`}
                data-on={sel === s.id ? "" : undefined}
                onMouseEnter={() => setSel(s.id)}
              >
                <p className="station-sign">
                  <span className="station-code">{s.code}</span>
                  {s.kind}
                </p>
                <h2>
                  <Link
                    to={`/locations/${s.id}`}
                    className="card-link"
                    onFocus={() => setSel(s.id)}
                  >
                    {s.name}
                  </Link>
                </h2>
                <p>{s.address.join(", ")}</p>
                <p className="location-hours">
                  <span
                    className="status"
                    data-open={status.open ? "" : undefined}
                  >
                    {status.label}
                  </span>
                  {!s.allDay && (
                    <span className="tnum">
                      Today {hoursLabel(s.hours[today])}
                    </span>
                  )}
                </p>
                <p className="location-facts">{s.facts.join(" · ")}</p>
                <ArrowRight className="location-arrow" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section band-concrete" aria-labelledby="oneway-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="oneway-title">Return elsewhere: one-way fees</h2>
            <p className="section-intro">
              Charged once per rental, on top of the day rate. Trips within the
              city triangle are free.
            </p>
          </div>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="One-way fee table, scrolls sideways"
          >
            <table className="oneway tnum">
              <caption>
                Rows are where you pick up, columns where you return.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Pick up</th>
                  {stations.map((s) => (
                    <th key={s.id} scope="col">
                      {s.code}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stations.map((a) => (
                  <tr key={a.id}>
                    <th scope="row">
                      <span className="station-code">{a.code}</span> {a.short}
                    </th>
                    {stations.map((b) => {
                      const fee = oneWayFee(a.id, b.id);
                      return (
                        <td
                          key={b.id}
                          data-self={a.id === b.id ? "" : undefined}
                        >
                          {a.id === b.id ? "—" : fee ? money(fee) : "Free"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
