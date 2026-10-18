import { Link } from "../router";
import type { Trip } from "../content";
import { eur, nextDeparture, num, shortDate, totals } from "../lib/trips";
import { Blaze } from "./Marks";

export function TripCard({
  trip,
  size = "default",
}: {
  trip: Trip;
  size?: "default" | "large";
}) {
  const t = totals(trip);
  const next = nextDeparture(trip);
  return (
    <article className="trip-card" data-size={size}>
      <div className="trip-card-img">
        <img
          src={trip.image}
          alt={trip.imageAlt}
          loading="lazy"
          width={1600}
          height={1066}
        />
      </div>
      <div className="trip-card-body">
        <p className="trip-card-region">
          {trip.region}, {trip.country}
        </p>
        <h3>
          <Link to={`/trips/${trip.slug}`} className="stretched">
            {trip.name}
          </Link>
        </h3>
        <p className="trip-card-summary">{trip.summary}</p>
        <dl className="trip-card-facts">
          <div>
            <dt>Days</dt>
            <dd>{trip.days.length}</dd>
          </div>
          <div>
            <dt>Distance</dt>
            <dd>{t.km} km</dd>
          </div>
          <div>
            <dt>Climb</dt>
            <dd>{num(t.up)} m</dd>
          </div>
        </dl>
        <div className="trip-card-foot">
          <Blaze grade={trip.grade} />
          <p>
            <span className="price">from {eur(trip.price)}</span>
            {next && (
              <span className="muted"> • next {shortDate(next.start)}</span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
