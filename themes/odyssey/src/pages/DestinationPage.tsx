import { ArrowRight, Plus } from "lucide-react";
import { Link, navigate } from "../router";
import { destinations, journeys, type Destination } from "../content";
import { DestinationCard, JourneyRow, SeasonChart } from "../components/Pieces";
import { addStop, duration, money, usePlan } from "../lib/plan";

export function DestinationPage({ d }: { d: Destination }) {
  const inRoute = usePlan().stops.some((s) => s.slug === d.slug);
  const through = journeys.filter((j) =>
    j.stops.some((s) => s.slug === d.slug),
  );
  const score = (x: Destination) =>
    (x.region === d.region ? 2 : 0) +
    x.styles.filter((s) => d.styles.includes(s)).length;
  const related = destinations
    .filter((x) => x.slug !== d.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, 3);
  return (
    <>
      <header className="dest-hero wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/destinations">Destinations</Link>{" "}
          <span aria-hidden="true">/</span> <span>{d.name}</span>
        </nav>
        <h1>
          <span className="place">{d.name}</span>
        </h1>
        <p className="dest-hero-country">
          {d.country} · {d.region}
        </p>
        <p className="lede">{d.summary}</p>
        <div className="actions">
          <button
            type="button"
            className="btn btn-accent"
            onClick={() => {
              if (!inRoute) addStop(d);
              navigate("/planner");
            }}
          >
            {inRoute ? (
              <>
                In your route: open planner <ArrowRight aria-hidden="true" />
              </>
            ) : (
              <>
                <Plus aria-hidden="true" /> Add to my route
              </>
            )}
          </button>
          <Link to={`/enquire?destination=${d.slug}`} className="btn btn-line">
            Ask {d.planner.split(" ")[0]} about {d.name}
          </Link>
        </div>
      </header>

      <figure className="wrap dest-photo">
        <img src={d.photo.src} alt={d.photo.alt} />
      </figure>

      <section className="wrap section dest-body">
        <div className="prose">
          <h2 className="sr-only">About {d.name}</h2>
          {d.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="planned-by">
            Planned by {d.planner}, who was last there this year.
          </p>
        </div>
        <dl className="ticket">
          <div>
            <dt>Getting there</dt>
            <dd>
              ≈ {duration(d.flightHours)}
              <small>{d.flightNote}</small>
            </dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{d.timezone}</dd>
          </div>
          <div>
            <dt>Currency</dt>
            <dd>{d.currency}</dd>
          </div>
          <div>
            <dt>Ideal stay</dt>
            <dd>{d.idealNights} nights</dd>
          </div>
          <div>
            <dt>Stays from</dt>
            <dd>
              {money(d.nightly)}
              <small>per person, per night, two sharing</small>
            </dd>
          </div>
        </dl>
      </section>

      <section className="wrap section when">
        <div className="section-head">
          <h2>When to go</h2>
          <p>{d.seasonNote}</p>
        </div>
        <SeasonChart d={d} />
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>A few days, roughly</h2>
          <p>
            The things we build a stay in {d.name} around. Your planner fits
            them to your pace.
          </p>
        </div>
        <ul className="day-ideas">
          {d.days.map((day) => (
            <li key={day.title}>
              <h3>{day.title}</h3>
              <p>{day.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {d.gallery.length > 0 && (
        <section className="wrap gallery" aria-label={`More of ${d.name}`}>
          {d.gallery.map((g) => (
            <figure key={g.src}>
              <img src={g.src} alt={g.alt} loading="lazy" />
              <figcaption>{g.alt}</figcaption>
            </figure>
          ))}
        </section>
      )}

      <section className="wrap section">
        <div className="section-head">
          <h2>Where we would put you</h2>
          <p>
            A short list. We have stayed in each and know which rooms to ask
            for.
          </p>
        </div>
        <div className="table-scroll">
          <table className="stays">
            <thead>
              <tr>
                <th scope="col">Stay</th>
                <th scope="col">What it is</th>
                <th scope="col">Why we like it</th>
                <th scope="col" className="num">
                  From / night
                </th>
              </tr>
            </thead>
            <tbody>
              {d.stays.map((s) => (
                <tr key={s.name}>
                  <th scope="row">{s.name}</th>
                  <td>{s.kind}</td>
                  <td>{s.note}</td>
                  <td className="num">{money(s.nightly)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {through.length > 0 && (
        <section className="wrap section">
          <h2>Journeys through {d.name}</h2>
          <ul className="journey-list">
            {through.map((j) => (
              <JourneyRow key={j.slug} j={j} />
            ))}
          </ul>
        </section>
      )}

      <section className="wrap section">
        <h2>You might also like</h2>
        <div className="dest-grid">
          {related.map((r) => (
            <DestinationCard key={r.slug} d={r} />
          ))}
        </div>
      </section>
    </>
  );
}
