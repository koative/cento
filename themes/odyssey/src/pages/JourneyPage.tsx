import { ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import {
  destinationBySlug,
  journeys,
  monthNames,
  type Journey,
} from "../content";
import { JourneyRow, routeName } from "../components/Pieces";
import { RouteMap } from "../components/RouteMap";
import { legBetween, loadStops, money, duration } from "../lib/plan";

export function JourneyPage({ j }: { j: Journey }) {
  const route = j.stops.flatMap((s) => destinationBySlug(s.slug) ?? []);
  const nights = j.stops.reduce((s, x) => s + x.nights, 0);
  const legs = route.slice(1).map((d, i) => legBetween(route[i], d));
  const others = journeys.filter(
    (x) =>
      x.slug !== j.slug &&
      x.stops.some((s) => j.stops.some((t) => t.slug === s.slug)),
  );
  const more = (
    others.length ? others : journeys.filter((x) => x.slug !== j.slug)
  ).slice(0, 2);

  return (
    <>
      <header className="journey-hero">
        <img src={j.photo.src} alt={j.photo.alt} />
        <div className="wrap journey-hero-copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/journeys">Journeys</Link>{" "}
            <span aria-hidden="true">/</span> <span>{j.name}</span>
          </nav>
          <h1>{j.name}</h1>
          <p className="lede">{j.summary}</p>
        </div>
      </header>

      <section className="wrap section journey-top">
        <dl className="ticket ticket--wide">
          <div>
            <dt>Route</dt>
            <dd>{routeName(j)}</dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>
              {nights + 1} days, {nights} nights
            </dd>
          </div>
          <div>
            <dt>Pace</dt>
            <dd>{j.pace}</dd>
          </div>
          <div>
            <dt>Best departures</dt>
            <dd>{j.months.map((m) => monthNames[m].slice(0, 3)).join(", ")}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>
              {money(j.priceFrom)}
              <small>per person, two sharing</small>
            </dd>
          </div>
        </dl>
        <div className="actions">
          <Link to={`/enquire?journey=${j.slug}`} className="btn btn-accent">
            Enquire about this journey <ArrowRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              loadStops(j.stops);
              navigate("/planner");
            }}
          >
            Reshape it in the planner
          </button>
        </div>
      </section>

      <section className="wrap section journey-body">
        <div>
          <h2>Day by day</h2>
          <ol className="timeline">
            {j.itinerary.map((step) => (
              <li key={step.days + step.place}>
                <p className="tl-days">
                  Day{step.days.includes("–") ? "s" : ""}{" "}
                  <span className="num">{step.days}</span>
                </p>
                <div>
                  <h3>{step.title}</h3>
                  <p className="tl-place place">{step.place}</p>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="journey-side">
          <RouteMap
            route={route}
            label={`Chart of ${j.name}: ${route.map((d) => d.name).join(" to ")}`}
            compact
          />
          {legs.length > 0 && (
            <ul className="legs">
              {legs.map((l) => (
                <li key={l.to.slug}>
                  {l.from.name} to {l.to.name}:{" "}
                  {l.mode === "flight" ? "flight" : "rail and road"}, about{" "}
                  {duration(l.hours)}
                </li>
              ))}
            </ul>
          )}
          <h2 className="h3">Included</h2>
          <ul className="included">
            {j.included.map((x) => (
              <li key={x}>
                <Check aria-hidden="true" /> {x}
              </li>
            ))}
          </ul>
          <p className="fine">
            International flights are quoted separately, or leave them to us.
          </p>
        </aside>
      </section>

      <section className="wrap section">
        <h2>Pairs well with</h2>
        <ul className="journey-list">
          {more.map((x) => (
            <JourneyRow key={x.slug} j={x} />
          ))}
        </ul>
      </section>
    </>
  );
}
