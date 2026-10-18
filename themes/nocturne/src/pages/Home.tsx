import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  days,
  drinks,
  events,
  home,
  hours,
  images,
  nights,
  system,
} from "../content";
import { hoursLabel, longDate, money, openStatus } from "../lib/format";
import { DrinkCard, EventRow } from "../components/Cards";
import { NightPlayer } from "../components/NightPlayer";

export function Home() {
  const status = openStatus(hours);
  const latest = nights[0];
  const signatures = drinks.filter((d) => d.category === "signature");
  const featured = signatures.filter((d) => d.image).slice(0, 4);
  const upcoming = events.slice(0, 3);
  const today = new Date().getDay();

  return (
    <>
      <section className="hero">
        <img
          className="hero-img"
          src={images.room.src}
          alt={images.room.alt}
          width={images.room.w}
          height={images.room.h}
        />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>
              Stay for <em>another side.</em>
            </h1>
            <p className="hero-lead">{home.heroLine}</p>
            <div className="hero-actions">
              <Link to="/reservations" className="btn btn-brass">
                Book a table
              </Link>
              <Link to="/menu" className="btn btn-ghost">
                See the drinks
              </Link>
            </div>
          </div>

          <aside className="tonight" aria-label="Tonight at Nocturne">
            <p
              className="tonight-status"
              data-open={status.open ? "" : undefined}
            >
              <span className="lamp" aria-hidden="true" />
              {status.label}
            </p>
            <h2 className="tonight-title">From the menu</h2>
            <ul className="tonight-drinks">
              {signatures.slice(0, 4).map((d) => (
                <li key={d.id}>
                  <Link to={`/menu/${d.id}`}>
                    <span>{d.name}</span>
                    <span className="tonight-notes">{d.notes}</span>
                  </Link>
                  <span className="tonight-price">{d.price}</span>
                </li>
              ))}
            </ul>
            <p className="tonight-foot">
              Last on the desk: <Link to="/records">{latest.selector}</Link>,{" "}
              {longDate(latest.date)}
            </p>
          </aside>
        </div>
      </section>

      <section className="rules-band">
        <div className="wrap">
          <p className="rules-statement">{home.rules}</p>
          <p className="rules-note">{home.rulesNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{home.drinksTitle}</h2>
            <p>{home.drinksText}</p>
          </div>
          <div className="drink-grid">
            {featured.map((d) => (
              <DrinkCard key={d.id} drink={d} />
            ))}
          </div>
          <p className="section-more">
            <Link to="/menu" className="text-link">
              The full menu, with low and no <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-walnut">
        <div className="wrap">
          <div className="section-head">
            <h2>{home.recordTitle}</h2>
            <p>{home.recordText}</p>
          </div>
          <NightPlayer night={latest} />
          <p className="section-more">
            <Link to={`/records/${latest.id}`} className="text-link">
              Read {latest.selector.split(" ")[0]}'s full slip for{" "}
              {longDate(latest.date)} <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <figure className="arch">
            <img
              src={images.amplifier.src}
              alt={images.amplifier.alt}
              width={images.amplifier.w}
              height={images.amplifier.h}
              loading="lazy"
            />
          </figure>
          <div>
            <h2>{home.systemTitle}</h2>
            <p className="lede">{home.systemText}</p>
            <dl className="spec-list">
              {system.slice(0, 4).map((s) => (
                <div key={s.part}>
                  <dt>{s.part}</dt>
                  <dd>{s.detail}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="text-link">
              More about the room <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2>{home.eventsTitle}</h2>
            <Link to="/events" className="text-link">
              All events <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="event-list">
            {upcoming.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </ul>
        </div>
      </section>

      <section className="hire-band">
        <img
          src={images.lounge.src}
          alt={images.lounge.alt}
          width={images.lounge.w}
          height={images.lounge.h}
          loading="lazy"
        />
        <div className="wrap">
          <div className="hire-card">
            <h2>{home.hireTitle}</h2>
            <p>{home.hireText}</p>
            <p className="hire-from">Packages from {money(295)} a head</p>
            <Link to="/private-hire" className="btn btn-brass">
              Plan a private night
            </Link>
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <figure className="wrap quote">
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>{home.quote.by}</figcaption>
        </figure>
      </section>

      <section className="section section-walnut close">
        <div className="wrap close-grid">
          <div>
            <h2>{home.closeTitle}</h2>
            <p className="lede">{home.closeText}</p>
            <div className="hero-actions">
              <Link to="/reservations" className="btn btn-brass">
                Book a table
              </Link>
              <a href={brand.phoneHref} className="btn btn-ghost">
                Call {brand.phone}
              </a>
            </div>
          </div>
          <div className="visit">
            <h3>Find us</h3>
            <p>
              {brand.street}, {brand.city}
            </p>
            <p className="visit-note">{brand.directions}</p>
            <table className="hours-table">
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {[3, 4, 5, 6, 0].map((d) => (
                  <tr key={d} data-today={d === today ? "" : undefined}>
                    <th scope="row">{days[d]}</th>
                    <td>{hoursLabel(hours[d])}</td>
                  </tr>
                ))}
                <tr data-today={today === 1 || today === 2 ? "" : undefined}>
                  <th scope="row">Monday & Tuesday</th>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
