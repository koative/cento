import { useRef } from "react";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Link } from "../router";
import { kits, trips, type Trip } from "../content";
import {
  dateRange,
  eur,
  guideFor,
  nextDeparture,
  num,
  season,
  spotsLabel,
  totals,
} from "../lib/trips";
import { Blaze } from "../components/Marks";
import { RouteExplorer } from "../components/RouteExplorer";
import { TripCard } from "../components/TripCard";

export function TripPage({ trip }: { trip: Trip }) {
  const t = totals(trip);
  const next = nextDeparture(trip);
  const guide = guideFor(trip);
  const kit = kits.find((k) => k.id === trip.kit)!;
  const departures = useRef<HTMLElement>(null);
  const related = trips
    .filter((o) => o.slug !== trip.slug)
    .sort(
      (a, b) =>
        Number(b.area === trip.area) - Number(a.area === trip.area) ||
        Math.abs(a.grade - trip.grade) - Math.abs(b.grade - trip.grade),
    )
    .slice(0, 3);

  return (
    <article className="trip">
      <header className="trip-head wrap">
        <p className="crumbs">
          <Link to="/trips">All trips</Link> / {trip.area}
        </p>
        <h1>{trip.name}</h1>
        <p className="trip-where">
          {trip.region}, {trip.country}
        </p>
        <p className="lede">{trip.summary}</p>
        <div className="trip-head-row">
          <dl className="spec">
            <div>
              <dt>Grade</dt>
              <dd>
                <Blaze grade={trip.grade} />
              </dd>
            </div>
            <div>
              <dt>Days</dt>
              <dd>{trip.days.length}</dd>
            </div>
            <div>
              <dt>Distance</dt>
              <dd>{t.km} km</dd>
            </div>
            <div>
              <dt>Total climb</dt>
              <dd>{num(t.up)} m</dd>
            </div>
            <div>
              <dt>Highest point</dt>
              <dd>{num(t.max)} m</dd>
            </div>
            <div>
              <dt>Group</dt>
              <dd>max {trip.group}</dd>
            </div>
            <div>
              <dt>Season</dt>
              <dd>{season(trip.months)}</dd>
            </div>
          </dl>
          <div className="price-box">
            <p className="price-big">
              <span>from</span> {eur(trip.price)}
            </p>
            <p className="muted">
              per person •{" "}
              {trip.sleepLabel[0].toLowerCase() + trip.sleepLabel.slice(1)}
            </p>
            {next && (
              <p>
                Next with places:{" "}
                <strong>{dateRange(next.start, trip.days.length)}</strong>
              </p>
            )}
            <Link to={`/book?trip=${trip.slug}`} className="btn btn-primary">
              Book this trip
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() =>
                departures.current?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                })
              }
            >
              All {trip.departures.length} dates
            </button>
          </div>
        </div>
      </header>

      <div className="wrap trip-gallery" data-count={trip.gallery.length + 1}>
        <img src={trip.image} alt={trip.imageAlt} width={1600} height={1066} />
        {trip.gallery.map((g) => (
          <img
            key={g.src}
            src={g.src}
            alt={g.alt}
            loading="lazy"
            width={1600}
            height={1066}
          />
        ))}
      </div>

      <section
        className="wrap section trip-intro"
        aria-labelledby="intro-title"
      >
        <div>
          <h2 id="intro-title">The walk</h2>
          {trip.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div>
          <h3>Highlights</h3>
          <ul className="ticks">
            {trip.highlights.map((h) => (
              <li key={h}>
                <Check aria-hidden="true" /> {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section route-section" aria-labelledby="route-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="route-title">Day by day</h2>
            <p>
              Pick a day to trace it on the map and the profile. Use the arrow
              keys to walk through the itinerary.
            </p>
          </div>
          <RouteExplorer trip={trip} />

          <h3 className="glance-title">At a glance</h3>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Itinerary at a glance"
          >
            <table className="compare glance">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Stage</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Up</th>
                  <th scope="col">Down</th>
                  <th scope="col">Walking</th>
                  <th scope="col">Night</th>
                </tr>
              </thead>
              <tbody>
                {trip.days.map((d, i) => (
                  <tr key={i}>
                    <td className="num">{i + 1}</td>
                    <th scope="row">{d.title}</th>
                    <td className="num">{d.km} km</td>
                    <td className="num">{num(d.up)} m</td>
                    <td className="num">{num(d.down)} m</td>
                    <td className="num">{d.hours}</td>
                    <td>{d.sleep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        ref={departures}
        className="wrap section"
        aria-labelledby="dates-title"
      >
        <div className="section-head">
          <h2 id="dates-title">Dates and places</h2>
          <p>
            Starts: {trip.start}. Ends: {trip.finish}.
          </p>
        </div>
        <ul className="dep-list">
          {trip.departures.map((d) => (
            <li key={d.id} data-full={d.spots === 0 ? "" : undefined}>
              <span className="dep-date">
                {dateRange(d.start, trip.days.length)}
              </span>
              <span
                className="dep-spots"
                data-low={d.spots > 0 && d.spots <= 3 ? "" : undefined}
              >
                {spotsLabel(d.spots)}
              </span>
              <span className="num">{eur(trip.price)}</span>
              {d.spots > 0 ? (
                <Link
                  to={`/book?trip=${trip.slug}&dep=${d.id}`}
                  className="btn btn-small btn-primary"
                >
                  Book
                  <span className="sr-only">
                    {" "}
                    {dateRange(d.start, trip.days.length)}
                  </span>
                </Link>
              ) : (
                <span className="muted">Waitlist by email</span>
              )}
            </li>
          ))}
        </ul>
        <p className="fine">
          {trip.single === null
            ? "Shared rooms only: huts on this route have no private rooms. Solo walkers share with another walker at no extra cost."
            : `Private room supplement ${eur(trip.single)} for the trip, where available. Solo walkers can share at no extra cost.`}
        </p>
      </section>

      <section className="wrap section incl" aria-labelledby="incl-title">
        <h2 id="incl-title" className="sr-only">
          What the price covers
        </h2>
        <div>
          <h3>Included</h3>
          <ul className="ticks">
            {trip.included.map((x) => (
              <li key={x}>
                <Check aria-hidden="true" /> {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Not included</h3>
          <ul className="ticks is-minus">
            {trip.excluded.map((x) => (
              <li key={x}>
                <Minus aria-hidden="true" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section trip-people" aria-label="Guide and gear">
        <div className="wrap people-grid">
          <div className="guide-note">
            <img
              src={guide.image}
              alt=""
              loading="lazy"
              width={1600}
              height={1066}
            />
            <div>
              <h2>Your guide: {guide.name}</h2>
              <p className="muted">
                {guide.base} • guiding since {guide.since}
              </p>
              <blockquote>“{guide.quote}”</blockquote>
              <Link to={`/guides/${guide.slug}`} className="text-link">
                Read {guide.name.split(" ")[0]}'s profile{" "}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="kit-note">
            <h2>Packing: {kit.name.toLowerCase()}</h2>
            <p>
              {kit.pack}. {kit.text}
            </p>
            <Link to={`/gear?kit=${kit.id}`} className="text-link">
              Open the {kit.name.toLowerCase()} checklist{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="related-title">
        <div className="section-head">
          <h2 id="related-title">Walk on</h2>
          <Link to="/trips" className="text-link">
            All trips <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="trip-grid">
          {related.map((r) => (
            <TripCard key={r.slug} trip={r} />
          ))}
        </div>
      </section>
    </article>
  );
}
