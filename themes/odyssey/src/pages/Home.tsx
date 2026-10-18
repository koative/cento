import { ArrowRight, Phone } from "lucide-react";
import { Link, navigate } from "../router";
import {
  articles,
  brand,
  destinationBySlug,
  destinations,
  home,
  journeys,
  process,
  testimonials,
} from "../content";
import { DestinationCard, JourneyRow } from "../components/Pieces";
import { RouteMap } from "../components/RouteMap";
import { duration, loadStops, longDate } from "../lib/plan";
import bigSur from "../assets/big-sur.jpg";

const sample = journeys[0];
const sampleRoute = sample.stops.flatMap(
  (s) => destinationBySlug(s.slug) ?? [],
);
const featured = [
  "kyoto",
  "norwegian-fjords",
  "marrakech",
  "amalfi-coast",
  "namib-desert",
].flatMap((s) => destinationBySlug(s) ?? []);

export function Home() {
  const [quote] = testimonials;

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/planner" className="btn btn-accent">
              Draft your route <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/destinations" className="btn btn-line">
              Browse destinations
            </Link>
          </div>
        </div>
        <figure className="hero-photo">
          <img
            src={bigSur}
            alt="A turquoise cove at Big Sur with a waterfall dropping onto the beach, seen through cypress branches"
            width={1600}
            height={1067}
          />
          <figcaption>
            <span className="place">Big Sur, California</span> — day four of{" "}
            <Link to="/journeys/highway-one-slowly">Highway One, Slowly</Link>
          </figcaption>
        </figure>
      </section>

      <section className="departures" aria-labelledby="departures-title">
        <div className="wrap">
          <h2 id="departures-title" className="departures-title">
            Where we send people
          </h2>
          <ul>
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link to={`/destinations/${d.slug}`}>
                  <span className="place">{d.name}</span>
                  <span className="dep-meta">
                    {d.country} · ≈ {duration(d.flightHours)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Ten places we know by heart</h2>
          <p>
            Every destination on this site has been walked, slept in and eaten
            through by one of our planners in the last two years.
          </p>
        </div>
        <div className="dest-feature">
          {featured.map((d, i) => (
            <DestinationCard key={d.slug} d={d} large={i === 0} />
          ))}
        </div>
        <Link to="/destinations" className="text-link">
          All ten destinations <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="section process-band">
        <div className="wrap">
          <div className="section-head">
            <h2>How a journey gets made</h2>
            <p>
              Four steps, usually about three weeks from first call to a
              confirmed route.
            </p>
          </div>
          <ol className="process">
            {process.map((s, i) => (
              <li key={s.title}>
                <span className="process-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/how-we-work" className="text-link">
            Fees, protection and the small print{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="night section">
        <div className="wrap planner-teaser">
          <div>
            <h2>Draft the route yourself, then hand it to us</h2>
            <p>
              Plot your stops on the chart, set the nights, and the planner
              works out the legs between them, the dates and a rough cost per
              person. Send it to a planner and we will start from your sketch
              rather than a blank page.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn btn-paper"
                onClick={() => {
                  loadStops(sample.stops);
                  navigate("/planner");
                }}
              >
                Start from {sample.name}
              </button>
              <Link to="/planner" className="btn btn-line-light">
                Open a blank chart
              </Link>
            </div>
          </div>
          <RouteMap
            route={sampleRoute}
            label={`Chart of ${sample.name}: ${sampleRoute.map((d) => d.name).join(" to ")}`}
            compact
          />
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Set journeys, ready to change</h2>
          <p>
            Routes we have run many times. Take one as it is, or open it in the
            planner and move things around.
          </p>
        </div>
        <ul className="journey-list">
          {journeys.slice(0, 4).map((j) => (
            <JourneyRow key={j.slug} j={j} />
          ))}
        </ul>
        <Link to="/journeys" className="text-link">
          All seven journeys <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="quote-band">
        <figure className="wrap">
          <blockquote>
            <p>{quote.quote}</p>
          </blockquote>
          <figcaption>
            {quote.name} · {quote.trip}
          </figcaption>
        </figure>
      </section>

      <section className="wrap section promises">
        <h2>What you can count on</h2>
        <dl>
          {home.promises.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>From the journal</h2>
          <p>Field notes from planners on the road.</p>
        </div>
        <div className="article-grid">
          {articles.slice(0, 3).map((a) => (
            <article key={a.slug} className="article-card">
              <img src={a.photo.src} alt="" loading="lazy" />
              <h3>
                <Link to={`/journal/${a.slug}`} className="stretched">
                  {a.title}
                </Link>
              </h3>
              <p>{a.dek}</p>
              <p className="byline">
                {a.author} · <time dateTime={a.date}>{longDate(a.date)}</time>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>Tell us where you have been dreaming of.</h2>
          <p>
            A planner replies within one working day, usually with a question or
            two and a time to talk. There is no charge until you ask us to draft
            a route.
          </p>
          <div className="actions">
            <Link to="/enquire" className="btn btn-accent">
              Start an enquiry <ArrowRight aria-hidden="true" />
            </Link>
            <a href={brand.phoneHref} className="btn btn-line">
              <Phone aria-hidden="true" /> {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
