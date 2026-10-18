import { brand, hours, visit } from "../content";
import { clock, openState } from "../lib/time";

function StreetMap() {
  return (
    <svg
      className="street-map"
      viewBox="0 0 600 420"
      role="img"
      aria-labelledby="map-title"
    >
      <title id="map-title">
        Map: Proof is on Mill Lane, between Mill Lane station and Hollis Street
        parking
      </title>
      <path
        className="map-river"
        d="M-10 330C120 300 190 380 320 350S520 280 610 300"
      />
      <path className="map-road map-main" d="M40 -10L120 430" />
      <path className="map-road map-main" d="M-10 170H610" />
      <path className="map-road" d="M330 -10V430" />
      <path className="map-road" d="M470 -10L520 430" />
      <path className="map-rail" d="M-10 70L610 40" />
      <rect
        className="map-station"
        x="200"
        y="38"
        width="76"
        height="26"
        rx="6"
      />
      <text x="238" y="56" textAnchor="middle">
        Station
      </text>
      <text className="map-label" x="560" y="160" textAnchor="end">
        Mill Lane
      </text>
      <text className="map-label" x="342" y="300">
        Hollis St
      </text>
      <rect
        className="map-park"
        x="350"
        y="200"
        width="96"
        height="62"
        rx="8"
      />
      <text x="398" y="236" textAnchor="middle">
        Parking
      </text>
      <g className="map-pin" transform="translate(268 170)">
        <circle r="18" />
        <path d="M-8 2c0-6 4-10 8-10s8 4 8 10c0 2-2 3-4 3h-8c-2 0-4-1-4-3Z" />
      </g>
      <text className="map-here" x="268" y="210" textAnchor="middle">
        Proof, no. 41
      </text>
    </svg>
  );
}

export function Visit() {
  const day = new Date().getDay();
  const status = openState();

  return (
    <>
      <header className="page-head">
        <h1>{visit.title}</h1>
        <p className="lede">{visit.lede}</p>
      </header>

      <section className="section visit-grid" aria-label="Hours and location">
        <div>
          <h2>Hours</h2>
          <p className="status-pill" data-open={status.open || undefined}>
            {status.text}
          </p>
          <table className="hours-table">
            <caption className="visually-hidden">Opening hours</caption>
            <tbody>
              {hours.map((h, i) => (
                <tr key={h.day} aria-current={i === day ? "date" : undefined}>
                  <th scope="row">{h.day}</th>
                  <td>
                    {h.open === null || h.close === null
                      ? "Closed"
                      : `${clock(h.open)} – ${clock(h.close)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <address className="visit-address">
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
        </div>
        <StreetMap />
      </section>

      <section className="section notes" aria-label="Before you come">
        {visit.notes.map((n) => (
          <div key={n.title}>
            <h2>{n.title}</h2>
            <p>{n.body}</p>
          </div>
        ))}
      </section>

      <section className="section faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions we get at the counter</h2>
        <div className="faq-list">
          {visit.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
