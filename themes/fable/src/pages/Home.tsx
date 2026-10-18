import { ArrowRight, Clock, MapPin, Ticket } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  events,
  exhibits,
  home,
  images,
  membership,
  ticketTypes,
} from "../content";
import { clock, money, openStatus } from "../lib/format";
import { MapExplorer } from "../components/MapExplorer";
import { ExhibitCard } from "../components/ExhibitCard";
import { Shape } from "../components/Shape";
import { EventRow } from "./Events";

const todaySessions = exhibits
  .flatMap((e) => e.sessions.map((s) => ({ ...s, ex: e })))
  .sort((a, b) => a.time.localeCompare(b.time));

export function Home() {
  const status = openStatus();
  const featured = exhibits.filter(
    (e) => e.slug === "bubble-works" || e.slug === "dino-dig",
  );
  const rest = exhibits.filter((e) => !featured.includes(e));
  const upcoming = events.slice(0, 3);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="hero-actions">
            <Link to="/tickets" className="btn btn-ink btn-lg">
              <Ticket aria-hidden="true" /> Book a time slot
            </Link>
            <Link to="/visit" className="btn btn-line btn-lg">
              Plan your day
            </Link>
          </div>
          <p className="hero-facts">
            <span className="status" data-open={status.open ? "" : undefined}>
              <span className="status-dot" aria-hidden="true" />
              {status.label}
            </span>
            <span>
              Adults {money(ticketTypes[0].price)} · Children{" "}
              {money(ticketTypes[1].price)} · Under 2s free
            </span>
          </p>
        </div>
        <div className="hero-art">
          <span className="block block-sun" aria-hidden="true" />
          <span className="block block-mint" aria-hidden="true" />
          <img
            src={images.hero}
            alt="Three toddlers squash and cut play dough with bright tools at a low white table."
            width={1000}
            height={1500}
          />
          <span className="block block-coral" aria-hidden="true" />
          <p className="hero-tag">
            Squish Table,{" "}
            <Link to="/exhibits/colour-kitchen">Colour Kitchen</Link>
          </p>
        </div>
      </section>

      <section className="today" aria-labelledby="today-title">
        <div className="wrap today-row">
          <h2 id="today-title">Today at Fable</h2>
          <ol className="today-list">
            {todaySessions.map((s) => (
              <li key={s.time + s.title}>
                <span className="tnum">{clock(s.time)}</span>
                <Link to={`/exhibits/${s.ex.slug}`}>{s.title}</Link>
                <small>{s.ex.name}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="galleries-title">
        <div className="section-head">
          <h2 id="galleries-title">Nine galleries. No glass cases.</h2>
          <p>
            Every gallery has a shape, so even children who can’t read yet can
            find their way. Follow the circle to Bubble Works, the arch to the
            dinosaurs.
          </p>
        </div>
        <div className="featured">
          {featured.map((ex) => (
            <ExhibitCard key={ex.slug} ex={ex} />
          ))}
        </div>
        <ul className="signboard">
          {rest.map((ex) => (
            <li key={ex.slug} data-swatch={ex.swatch}>
              <Shape kind={ex.shape} swatch={ex.swatch} />
              <Link to={`/exhibits/${ex.slug}`} className="stretch">
                {ex.name}
              </Link>
              <span className="signboard-sign">{ex.sign}</span>
              <span className="signboard-age">{ex.ageLabel}</span>
            </li>
          ))}
        </ul>
        <Link to="/exhibits" className="text-link">
          Compare all exhibits by age and noise{" "}
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="section band band-paper2" aria-labelledby="map-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="map-title">Find your way around</h2>
            <p>
              Tell us who’s coming and the map shows which galleries suit them.
              Tap a room to see what’s inside and add it to your day.
            </p>
          </div>
          <MapExplorer />
          <Link to="/visit" className="text-link">
            Turn it into a timed plan for the day{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="quiet wrap" aria-labelledby="quiet-title">
        <h2 id="quiet-title">{home.quiet.title}</h2>
        <p>{home.quiet.text}</p>
      </section>

      <section className="section wrap prices" aria-labelledby="prices-title">
        <div>
          <h2 id="prices-title">One ticket, the whole day</h2>
          <p>
            Book an arrival slot online and stay until closing. Leave for lunch
            and come back with a hand stamp.
          </p>
          <Link to="/tickets" className="btn btn-coral">
            <Ticket aria-hidden="true" /> Choose a date
          </Link>
        </div>
        <table className="price-table">
          <caption className="sr-only">Admission prices</caption>
          <tbody>
            {ticketTypes.map((t) => (
              <tr key={t.id}>
                <th scope="row">
                  {t.label}
                  <small>{t.note}</small>
                </th>
                <td className="tnum">{money(t.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <aside className="pass">
          <h3>{membership.name}</h3>
          <p className="pass-price tnum">{money(membership.price)} a year</p>
          <p>{membership.blurb}</p>
        </aside>
      </section>

      <section className="section wrap groups" aria-labelledby="groups-title">
        <h2 id="groups-title" className="sr-only">
          Groups and celebrations
        </h2>
        <article className="group group-school">
          <img
            src={images.school}
            alt="A child slots coloured wooden pegs onto a counting board."
            width={1280}
            height={854}
            loading="lazy"
          />
          <div>
            <h3>School trips that stick</h3>
            <p>
              Hands-on workshops tied to the science standards for Pre-K to
              Grade 5, from $9 a student. Free for Title I schools.
            </p>
            <Link to="/school-trips" className="text-link">
              Plan a class visit <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>
        <article className="group group-party">
          <div>
            <h3>Birthdays with bubbles</h3>
            <p>
              Three party packages, a private hour in a gallery, and a host who
              handles the mess. From $395 for twelve.
            </p>
            <Link to="/parties" className="text-link">
              See party packages <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <img
            src={images.party}
            alt="Children around a craft table sharing beads, pencils and coloured paper."
            width={1280}
            height={854}
            loading="lazy"
          />
        </article>
      </section>

      <section className="section wrap" aria-labelledby="events-title">
        <div className="section-head">
          <h2 id="events-title">Coming up</h2>
          <Link to="/events" className="text-link">
            Full events calendar <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="event-list">
          {upcoming.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </ul>
      </section>

      <figure className="quote wrap">
        <blockquote>
          <p>“{home.quote.text}”</p>
        </blockquote>
        <figcaption>{home.quote.who}</figcaption>
      </figure>

      <section className="close band band-ink" aria-labelledby="close-title">
        <div className="wrap close-grid">
          <div>
            <h2 id="close-title">See you on Depot Row</h2>
            <p>
              <MapPin aria-hidden="true" /> {brand.address.join(", ")} · two
              minutes from Depot Row light rail
            </p>
            <p>
              <Clock aria-hidden="true" /> {status.label}. Closed Mondays.
            </p>
          </div>
          <div className="close-actions">
            <Link to="/tickets" className="btn btn-sun btn-lg">
              <Ticket aria-hidden="true" /> Book tickets
            </Link>
            <Link to="/visit" className="btn btn-line-light btn-lg">
              Getting here &amp; access
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
