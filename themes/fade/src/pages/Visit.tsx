import { Phone } from "lucide-react";
import { Link } from "../router";
import { brand, days, visitPage } from "../content";
import { hoursLabel, openStatus } from "../lib/format";
import { PageHead } from "../components/PageHead";

function StreetMap() {
  return (
    <svg
      className="street-map"
      viewBox="0 0 600 380"
      role="img"
      aria-label="Map: Fade is on the north side of Dunmore Avenue between Linden Street and Pell Street, between the bakery and the bike shop. Linden Street station is at the top of Linden Street; buses stop at Dunmore and Pell, by Hollis Park."
    >
      <rect width="600" height="380" className="map-ground" />
      <rect
        x="380"
        y="232"
        width="200"
        height="132"
        rx="4"
        className="map-park"
      />
      <text x="480" y="304" className="map-label">
        Hollis Park
      </text>
      <rect
        x="20"
        y="20"
        width="150"
        height="150"
        rx="4"
        className="map-block"
      />
      <rect
        x="210"
        y="20"
        width="350"
        height="150"
        rx="4"
        className="map-block"
      />
      <rect
        x="20"
        y="232"
        width="150"
        height="132"
        rx="4"
        className="map-block"
      />
      <rect
        x="210"
        y="232"
        width="130"
        height="132"
        rx="4"
        className="map-block"
      />
      <rect x="226" y="248" width="98" height="60" className="map-lot" />
      <text x="275" y="283" className="map-label map-small">
        Library lot
      </text>
      <path d="M0 201 H600" className="map-road" />
      <path d="M190 0 V380" className="map-road" />
      <path d="M360 0 V380" className="map-road map-road-minor" />
      <text x="96" y="196" className="map-street">
        Dunmore Ave
      </text>
      <text
        x="196"
        y="110"
        className="map-street"
        transform="rotate(90 196 110)"
      >
        Linden St
      </text>
      <text
        x="366"
        y="110"
        className="map-street"
        transform="rotate(90 366 110)"
      >
        Pell St
      </text>
      <g className="map-station">
        <rect x="174" y="34" width="32" height="32" rx="16" />
        <text x="190" y="55">
          M
        </text>
      </g>
      <text x="150" y="88" className="map-label map-small">
        Linden St station
      </text>
      <g className="map-bus">
        <rect x="372" y="208" width="26" height="18" rx="4" />
      </g>
      <text x="404" y="222" className="map-label map-small map-left">
        Routes 12, 40
      </text>
      <rect x="244" y="140" width="40" height="30" className="map-neighbour" />
      <text x="264" y="132" className="map-label map-small">
        Bakery
      </text>
      <rect x="320" y="140" width="34" height="30" className="map-neighbour" />
      <text x="337" y="132" className="map-label map-small">
        Bikes
      </text>
      <g className="map-shop">
        <rect x="288" y="136" width="28" height="34" />
        <rect
          x="298"
          y="104"
          width="8"
          height="32"
          rx="3"
          className="map-pole"
        />
      </g>
      <text x="302" y="94" className="map-label map-shop-label">
        Fade
      </text>
    </svg>
  );
}

export function Visit() {
  const status = openStatus(brand.hours);
  const today = new Date().getDay();

  return (
    <>
      <PageHead title={visitPage.title} intro={visitPage.intro} />

      <div className="wrap visit-grid">
        <section aria-labelledby="where-title" className="where">
          <h2 id="where-title" className="sr-only">
            Where we are
          </h2>
          <StreetMap />
          <address>
            <strong>{brand.full}</strong>
            <br />
            {brand.street}, {brand.area}
          </address>
          <div className="actions">
            <a href={brand.phoneHref} className="btn btn-ink">
              <Phone aria-hidden="true" /> {brand.phone}
            </a>
            <a
              href="https://www.google.com/maps/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-line"
            >
              Open in maps
            </a>
          </div>
        </section>

        <section aria-labelledby="hours-title" className="hours-panel">
          <h2 id="hours-title">Opening hours</h2>
          <p className="status" data-open={status.open ? "" : undefined}>
            <span className="dot" aria-hidden="true" />
            {status.label}
          </p>
          <dl className="hours">
            {[2, 3, 4, 5, 6, 0, 1].map((d) => (
              <div key={d} data-today={d === today ? "" : undefined}>
                <dt>
                  {days[d]}
                  {d === today && <span className="sr-only"> (today)</span>}
                </dt>
                <dd>{hoursLabel(brand.hours[d])}</dd>
              </div>
            ))}
          </dl>
          <p className="hours-note">
            Last booking starts 40 minutes before close. Walk-ins until 30
            minutes before.
          </p>
          <Link to="/book" className="btn btn-red">
            Book a chair
          </Link>
        </section>
      </div>

      <section className="wrap transit" aria-labelledby="transit-title">
        <h2 id="transit-title">Getting here</h2>
        <dl>
          {visitPage.transit.map((t) => (
            <div key={t.title}>
              <dt>{t.title}</dt>
              <dd>{t.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap faq" aria-labelledby="faq-title">
        <h2 id="faq-title">{visitPage.faqTitle}</h2>
        {visitPage.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
