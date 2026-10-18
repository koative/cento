import { ArrowRight } from "lucide-react";
import { about, booksellers, brand, hours, images } from "../content";
import { Link } from "../router";
import { hoursLabel, shopStatus } from "../lib/format";

export function HoursTable() {
  const today = (new Date().getDay() + 6) % 7;
  const status = shopStatus();
  return (
    <div className="hours">
      <p className="status-line" data-open={status.open || undefined}>
        <span aria-hidden="true" /> {status.text}
      </p>
      <table className="table hours-table">
        <caption className="visually-hidden">Opening hours</caption>
        <tbody>
          {hours.map((h, i) => (
            <tr key={h.day} aria-current={i === today ? "date" : undefined}>
              <th scope="row">{h.day}</th>
              <td>{hoursLabel(h.open, h.close)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Authored street plan: Quarry Lane, the lime tree, the old towpath. */
function StreetPlan() {
  return (
    <svg
      className="street-plan"
      viewBox="0 0 480 300"
      role="img"
      aria-labelledby="plan-title"
    >
      <title id="plan-title">
        Street plan: Index sits at 14 Quarry Lane, near the corner of Mill
        Street, beside the old canal towpath.
      </title>
      <path className="plan-towpath" d="M-10 238 C 120 210, 220 268, 490 222" />
      <path className="plan-road" d="M-10 130 H490" />
      <path className="plan-road" d="M300 -10 V310" />
      <path className="plan-road plan-road-minor" d="M120 130 V310" />
      {[40, 80, 160, 200, 240, 360, 400, 440].map((x) => (
        <rect
          key={x}
          className="plan-block"
          x={x - 16}
          y={84}
          width={30}
          height={34}
        />
      ))}
      <rect className="plan-shop" x={208} y={146} width={44} height={40} />
      <circle className="plan-tree" cx={186} cy={150} r={9} />
      <text x={20} y={122}>
        Quarry Lane
      </text>
      <text x={310} y={40}>
        Mill Street
      </text>
      <text x={330} y={248}>
        Old towpath
      </text>
      <text x={196} y={206} className="plan-label">
        Index, no. 14
      </text>
    </svg>
  );
}

export function About() {
  return (
    <div className="page about-page">
      <header className="page-head page-head-split">
        <div>
          <h1>{about.heading}</h1>
          <p className="lede">{about.lede}</p>
        </div>
        <img
          src={images.leather}
          alt="Shelves of old leather-bound books, red and brown spines in tidy rows"
          width={1800}
          height={1350}
        />
      </header>

      <section className="timeline" aria-labelledby="story-title">
        <h2 id="story-title">Thirty-nine years on Quarry Lane</h2>
        <ol>
          {about.story.map((s) => (
            <li key={s.year}>
              <span className="timeline-year">{s.year}</span>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rooms" aria-labelledby="rooms-title">
        <h2 id="rooms-title">The three rooms</h2>
        {about.rooms.map((r, i) => (
          <article
            key={r.name}
            className="room"
            data-flip={i % 2 === 1 || undefined}
          >
            <img
              src={r.image}
              alt={r.alt}
              width={1600}
              height={1100}
              loading="lazy"
            />
            <div>
              <h3>{r.name}</h3>
              <p>{r.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="band" aria-labelledby="people-title">
        <div className="band-head">
          <h2 id="people-title">Who's behind the till</h2>
          <Link to="/staff-picks" className="text-link">
            What they're reading <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="people">
          {booksellers.map((s) => (
            <li key={s.id}>
              <h3>{s.name}</h3>
              <p className="seller-role">{s.role}</p>
              <p>{s.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="services" aria-labelledby="services-title">
        <h2 id="services-title">Besides selling books</h2>
        <dl>
          {about.services.map((s) => (
            <div key={s.title}>
              <dt>{s.title}</dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="visit visit-about" aria-labelledby="visit-title">
        <StreetPlan />
        <div className="visit-copy">
          <h2 id="visit-title">Visit</h2>
          <p>
            {brand.address}. Two minutes from the Mill Street bus stop; bike
            racks by the lime tree. {about.access}
          </p>
          <HoursTable />
          <p>
            <a href={brand.phoneHref}>{brand.phone}</a> ·{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
