import { brand, visit, week } from "../content";
import { OpenNow } from "../components/OpenNow";
import { span } from "../lib/time";

/** Authored street plan: Alder Street, Wren Lane, the library, the bus stop and the walk from the station. */
function StreetMap() {
  return (
    <svg
      className="street-map"
      viewBox="0 0 600 420"
      role="img"
      aria-labelledby="map-title map-desc"
    >
      <title id="map-title">
        Map of the corner of Alder Street and Wren Lane
      </title>
      <desc id="map-desc">
        Ember sits on the north-east corner of Alder Street and Wren Lane,
        opposite the library. The bus stop is beside the door; Northside station
        is south along Wren Lane.
      </desc>
      <rect width="600" height="420" fill="var(--paper-2)" />
      <g fill="var(--block)">
        <rect x="20" y="20" width="230" height="140" rx="6" />
        <rect x="330" y="20" width="250" height="140" rx="6" />
        <rect x="20" y="230" width="230" height="170" rx="6" />
        <rect x="330" y="230" width="250" height="170" rx="6" />
      </g>
      <g fill="none" stroke="var(--card)">
        <path d="M0 195H600" strokeWidth="56" />
        <path d="M290 0V420" strokeWidth="56" />
      </g>
      <g
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        strokeDasharray="10 10"
      >
        <path d="M0 195H262M318 195H600" />
        <path d="M290 0V167M290 223V420" />
      </g>
      <path
        d="M352 160V180H274V420"
        stroke="var(--tomato)"
        strokeWidth="3"
        strokeDasharray="2 8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="20"
        y="232"
        width="200"
        height="120"
        rx="6"
        fill="var(--sage)"
        opacity="0.55"
      />
      <g className="map-label">
        <text x="420" y="215">
          ALDER STREET
        </text>
        <text x="300" y="70" transform="rotate(90 300 70)">
          WREN LANE
        </text>
        <text x="120" y="295" textAnchor="middle">
          Library
        </text>
        <text
          x="306"
          y="412"
          transform="rotate(-90 306 412)"
          textAnchor="start"
          dx="6"
        >
          to station, 8 min
        </text>
      </g>
      <circle cx="372" cy="216" r="11" fill="var(--ink)" />
      <text x="372" y="220" textAnchor="middle" className="map-bus">
        12
      </text>
      <g transform="translate(345 74)">
        <path d="M0 64V30a30 30 0 0 1 60 0v34z" fill="var(--tomato)" />
        <path d="M14 64V32a16 16 0 0 1 32 0v32z" fill="var(--paper)" />
        <circle cx="24" cy="56" r="4" fill="var(--tomato)" />
        <circle cx="34" cy="54" r="3" fill="var(--tomato)" />
      </g>
      <text x="420" y="118" className="map-ember">
        Ember
      </text>
      <text x="420" y="138" className="map-small">
        {brand.street}
      </text>
    </svg>
  );
}

export function Visit() {
  const today = new Date().getDay();
  return (
    <div className="visit-page">
      <header className="page-head wrap">
        <h1>{visit.title}</h1>
        <p className="lede">{visit.intro}</p>
        <OpenNow />
      </header>

      <section className="wrap visit-grid" aria-label="Address and hours">
        <StreetMap />
        <div className="visit-info">
          <h2>Address</h2>
          <address>
            {brand.street}
            <br />
            {brand.area}, {brand.postcode}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <h2>Hours</h2>
          <table className="hours-table">
            <caption className="sr-only">Opening hours by day</caption>
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Brunch</th>
                <th scope="col">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {[...week.slice(1), week[0]].map((d) => (
                <tr
                  key={d.day}
                  aria-current={week[today] === d ? "date" : undefined}
                >
                  <th scope="row">{d.day}</th>
                  <td className="num">{d.brunch ? span(d.brunch) : "—"}</td>
                  <td className="num">
                    {d.dinner ? span(d.dinner) : "Closed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap getting" aria-labelledby="getting-title">
        <h2 id="getting-title" className="section-title">
          Getting here
        </h2>
        <dl className="getting-list">
          {visit.directions.map((d) => (
            <div key={d.how}>
              <dt>{d.how}</dt>
              <dd>{d.detail}</dd>
            </div>
          ))}
          <div>
            <dt>Access</dt>
            <dd>{visit.access}</dd>
          </div>
        </dl>
      </section>

      <section className="wrap faq" aria-labelledby="faq-title">
        <h2 id="faq-title" className="section-title">
          Questions we hear at the door
        </h2>
        <div className="faq-list">
          {visit.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
