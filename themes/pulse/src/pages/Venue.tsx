import { Link } from "../router";
import {
  accessInfo,
  brand,
  days,
  gettingThere,
  images,
  stages,
  walkMinutes,
} from "../content";
import { SiteMap } from "../components/SiteMap";

export function Venue() {
  return (
    <>
      <header className="page-head page-head-photo">
        <img
          src={images.bunker}
          alt="People walking through a dim concrete passage towards a bright opening"
          width="1066"
          height="1600"
        />
        <div className="wrap">
          <h1>The Waterworks</h1>
          <p>
            A red-brick waterworks from 1893 on the north bank of the Spree,
            decommissioned in 1994 and opened up for three days every July.{" "}
            {brand.address.join(", ")}.
          </p>
        </div>
      </header>

      <section className="wrap section-tight" aria-labelledby="map-title">
        <h2 id="map-title" className="sr-only">
          Site map
        </h2>
        <SiteMap />
      </section>

      <section className="wrap section split" aria-labelledby="hours-title">
        <div>
          <h2 id="hours-title">Stage hours</h2>
          <p>
            The field closes at 23:00 for the neighbours; the halls keep going.
            Gates open one hour before the first set each day.
          </p>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Stage</th>
                {days.map((d) => (
                  <th scope="col" key={d.id}>
                    {d.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stages.map((s) => (
                <tr key={s.id} data-stage={s.id}>
                  <th scope="row">
                    <span className="stage-tag">{s.name}</span>
                  </th>
                  {days.map((d) => (
                    <td key={d.id} className="num">
                      {s.hours[d.id] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section split" aria-labelledby="walk-title">
        <div>
          <h2 id="walk-title">Walking times</h2>
          <p>
            Minutes on foot at a normal pace with a normal crowd. The{" "}
            <Link to="/timetable">timetable builder</Link> uses these when your
            picks clash.
          </p>
        </div>
        <div className="table-wrap">
          <table className="data-table walk-table">
            <thead>
              <tr>
                <th scope="col">From \ to</th>
                {stages.map((s) => (
                  <th scope="col" key={s.id}>
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stages.map((from) => (
                <tr key={from.id}>
                  <th scope="row">{from.name}</th>
                  {stages.map((to) => (
                    <td key={to.id} className="num">
                      {from.id === to.id
                        ? "—"
                        : `${walkMinutes[from.id][to.id]} min`}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section travel" aria-labelledby="travel-title">
        <div className="wrap">
          <h2 id="travel-title">Getting there</h2>
          <dl className="travel-list">
            {gettingThere.map((g) => (
              <div key={g.title}>
                <dt>{g.title}</dt>
                <dd>{g.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section split camp" aria-labelledby="camp-title">
        <img
          src={images.camping}
          alt="View out of an open orange tent onto trees and a rocky clearing"
          loading="lazy"
          width="1500"
          height="1000"
        />
        <div>
          <h2 id="camp-title">Riverside Camp</h2>
          <p>
            2,400 marked pitches on the meadow west of the field, open from
            Thursday 14:00 to Monday 12:00. Hot showers, phone charging, a
            24-hour Care Point and a quiet zone in the north-west corner for
            people who want to sleep before sunrise.
          </p>
          <Link to="/tickets" className="btn btn-acid">
            Weekend + Camping tickets
          </Link>
        </div>
      </section>

      <section
        className="wrap section-tight access"
        aria-labelledby="access-title"
      >
        <h2 id="access-title">Access</h2>
        <ul className="ticks">
          {accessInfo.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <p>
          Need something we haven't listed? Write to{" "}
          <a href={`mailto:${brand.email}`}>{brand.email}</a> and a real person
          will answer.
        </p>
      </section>
    </>
  );
}
