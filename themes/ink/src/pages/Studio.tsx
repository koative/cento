import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { artists, brand, hours, images, studioPage } from "../content";

export function Studio() {
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{studioPage.title}</h1>
        <p className="lede">{studioPage.intro}</p>
      </header>

      <section className="wrap story">
        <img
          src={images.station.src}
          alt={images.station.alt}
          width={images.station.w}
          height={images.station.h}
        />
        <div className="prose">
          {studioPage.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <Link to="/flash" className="text-link">
            See the wall <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="wrap section">
        <h2>{studioPage.roomTitle}</h2>
        <dl className="room-list">
          {studioPage.room.map((r) => (
            <div key={r.title}>
              <dt>{r.title}</dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section people">
        <h2>Who works here</h2>
        <ul className="people-list">
          {artists.map((a) => (
            <li key={a.id}>
              <Link to={`/artists/${a.id}`}>{a.name}</Link>
              <span>{a.role}</span>
              <span>since {a.since}</span>
            </li>
          ))}
          <li>
            <span className="people-name">Guest chair</span>
            <span>{studioPage.guestText}</span>
          </li>
        </ul>
      </section>

      <section className="visit">
        <div className="wrap visit-grid">
          <div>
            <h2>{studioPage.visitTitle}</h2>
            <p>{studioPage.visitText}</p>
            <address>
              {brand.street}
              <br />
              {brand.city}, {brand.region}
              <br />
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
                {brand.phone}
              </a>
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </address>
          </div>
          <dl className="hours">
            {hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <StreetPlan />
        </div>
      </section>
    </div>
  );
}

/** Authored street plan of Calder Lane: blocks, tram stop, studio door. */
function StreetPlan() {
  return (
    <figure className="street-plan">
      <svg
        viewBox="0 0 320 220"
        role="img"
        aria-label="Street plan: Ink is on the north side of Calder Lane, two doors east of the tram stop"
      >
        <rect className="block" x="10" y="10" width="90" height="80" />
        <rect className="block" x="110" y="10" width="110" height="80" />
        <rect className="block" x="230" y="10" width="80" height="80" />
        <rect className="block" x="10" y="130" width="140" height="80" />
        <rect className="block" x="160" y="130" width="150" height="80" />
        <path className="rail" d="M0 112 H320" />
        <rect className="stop" x="118" y="104" width="34" height="16" rx="3" />
        <text x="135" y="146" textAnchor="middle">
          Tram
        </text>
        <rect className="studio" x="176" y="58" width="36" height="32" />
        <text x="194" y="48" textAnchor="middle" className="studio-label">
          Ink
        </text>
        <text x="300" y="104" textAnchor="end">
          Calder Lane
        </text>
        <path className="arrow" d="M300 196 V172 M294 180 L300 172 L306 180" />
        <text x="300" y="214" textAnchor="middle">
          N
        </text>
      </svg>
    </figure>
  );
}
