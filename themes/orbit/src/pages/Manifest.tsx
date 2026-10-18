import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { flights, images, sites, vehicles } from "../content";
import { day, nextFlight, num, useNow, utc, vehicleName } from "../lib/format";
import { Countdown, FlightTable } from "../components/FlightTable";

export function Manifest() {
  const now = useNow(60000);
  const next = nextFlight(now);
  const [vehicle, setVehicle] = useState("all");
  const [type, setType] = useState("all");
  const [open, setOpen] = useState(false);

  const rows = flights
    .filter((f) => Date.parse(f.date) > now)
    .filter((f) => vehicle === "all" || f.vehicle === vehicle)
    .filter((f) => type === "all" || f.type === type)
    .filter((f) => !open || f.openKg > 0);
  const openKg = flights
    .filter((f) => Date.parse(f.date) > now)
    .reduce((s, f) => s + f.openKg, 0);

  return (
    <>
      <section className="page-head night manifest-head">
        <img
          className="head-photo"
          src={images.night.src}
          alt=""
          width={images.night.w}
          height={images.night.h}
        />
        <div className="wrap manifest-head-grid">
          <div>
            <h1>Launch manifest</h1>
            <p className="lede">
              Every flight we have scheduled through 2027, the same list our
              launch team works from. {num(openKg)} kg of rideshare capacity is
              open across {flights.filter((f) => f.openKg > 0).length} flights.
            </p>
          </div>
          {next && (
            <div className="next-launch">
              <h2>
                Next: <span>{next.name}</span>
              </h2>
              <Countdown iso={next.date} name={next.name} />
              <p className="tnum muted-light">
                {vehicleName(next.vehicle)} · {sites[next.site].short} ·{" "}
                {day(next.date)}, {utc(next.date)}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter flights">
            <label className="select-label">
              Vehicle
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
              >
                <option value="all">All vehicles</option>
                {vehicles
                  .filter((v) => v.kind === "rocket")
                  .map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className="select-label">
              Flight type
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">Rideshare and dedicated</option>
                <option value="Rideshare">Rideshare</option>
                <option value="Dedicated">Dedicated</option>
              </select>
            </label>
            <label className="check-inline">
              <input
                type="checkbox"
                checked={open}
                onChange={(e) => setOpen(e.target.checked)}
              />
              Open capacity only
            </label>
            <p className="count tnum" aria-live="polite">
              {rows.length} {rows.length === 1 ? "flight" : "flights"}
            </p>
          </div>
          {rows.length ? (
            <FlightTable rows={rows} caption="Scheduled flights" />
          ) : (
            <div className="empty">
              <p>
                No scheduled flights match. Dedicated Kestrel flights can be
                added to the manifest with about five months' notice.
              </p>
              <Link to="/reserve" className="btn btn-dark">
                Request a dedicated launch
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap split">
          <div className="prose">
            <h2>How to read this list</h2>
            <p>
              <strong>NET</strong> means no earlier than. A date becomes a
              launch window, with a time to the minute, once the vehicle has
              completed its static fire and payloads are encapsulated.
            </p>
            <p>
              <strong>Closing soon</strong> means rideshare bookings close
              within 30 days. After that, a flight can still take cubesats on a
              waitlist if another customer drops out.
            </p>
            <p>
              <strong>Open</strong> is the rideshare mass still available on the
              dispenser rings, after margins. Dedicated flights show none.
            </p>
          </div>
          <div>
            <h2>Launch sites</h2>
            <dl className="spec-list">
              {Object.values(sites).map((s) => (
                <div key={s.name}>
                  <dt>{s.name}</dt>
                  <dd>{s.note}</dd>
                </div>
              ))}
            </dl>
            <Link to="/missions" className="text-link">
              Flown missions and outcomes{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
