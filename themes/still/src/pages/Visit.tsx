import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, faqs, visit } from "../content";
import { Faq } from "../components/Faq";

export function Visit() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{visit.title}</h1>
        <p className="lead">{visit.lead}</p>
      </header>

      <section className="wrap where">
        <div className="where-text">
          <h2>Where we are</h2>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <h3>Front desk</h3>
          <dl className="hours">
            {brand.frontDesk.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
          <h3>Getting here</h3>
          <dl className="getting">
            {visit.getting.map((g) => (
              <div key={g.title}>
                <dt>{g.title}</dt>
                <dd>{g.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <StreetMap />
      </section>

      <section className="lavender">
        <div className="wrap timeline-wrap">
          <h2>Your first class, in order</h2>
          <ol className="timeline">
            {visit.timeline.map((t) => (
              <li key={t.at}>
                <span className="timeline-at">{t.at}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap bring">
        <figure>
          <img
            src={visit.image.src}
            alt={visit.image.alt}
            width={visit.image.w}
            height={visit.image.h}
            loading="lazy"
          />
        </figure>
        <div>
          <h2>What to bring</h2>
          <ul className="ticks">
            {visit.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h2>How the room works</h2>
          <ul className="ticks">
            {visit.etiquette.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <Link to="/book" className="btn btn-primary">
            Book your first class <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="wrap" aria-labelledby="visit-faq">
        <h2 id="visit-faq">Before you come</h2>
        <Faq items={faqs.slice(1, 5)} />
      </section>
    </>
  );
}

/** Street map of the few blocks around the studio. */
function StreetMap() {
  return (
    <figure className="map">
      <svg
        viewBox="0 0 600 480"
        role="img"
        aria-label="Map: Still is on Alder Row, between Ninth Street and Larkfield Common. The bus stop is at Alder and Ninth; the Ninth Street garage is one block south."
      >
        <rect width="600" height="480" className="map-ground" />
        <path
          d="M60 300 Q 120 250 200 270 L 260 285 Q 300 300 290 360 L 270 440 L 80 440 Z"
          className="map-park"
        />
        <rect
          x="430"
          y="330"
          width="120"
          height="80"
          rx="4"
          className="map-block"
        />
        <path d="M0 200 H600" className="map-road" />
        <path d="M0 200 H600" className="map-road-line" />
        <path d="M380 0 V480" className="map-road" />
        <path
          d="M120 0 V200 M0 90 H380 M380 300 H600 M480 200 V480"
          className="map-street"
        />
        <rect
          x="320"
          y="150"
          width="44"
          height="36"
          rx="4"
          className="map-studio"
        />
        <circle cx="342" cy="168" r="6" className="map-pin" />
        <circle cx="398" cy="218" r="9" className="map-stop" />
        <text x="30" y="190" className="map-label">
          Alder Row
        </text>
        <text
          x="392"
          y="60"
          className="map-label"
          transform="rotate(90 392 60)"
        >
          Ninth Street
        </text>
        <text x="110" y="360" className="map-label">
          Larkfield Common
        </text>
        <text x="440" y="375" className="map-label">
          Garage
        </text>
        <text x="412" y="236" className="map-label map-small">
          Bus 4, 15
        </text>
        <text x="236" y="140" className="map-label map-strong">
          Still, 2nd floor
        </text>
      </svg>
      <figcaption>
        Entrance through the arch at 48 Alder Row. The lift is on the left.
      </figcaption>
    </figure>
  );
}
