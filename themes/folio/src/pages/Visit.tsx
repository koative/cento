import { Link } from "../router";
import { brand, hours, images, visit } from "../content";
import { DAYS, openState } from "../lib/format";

/** Monday first, the way the front-desk sign reads. */
const week = [1, 2, 3, 4, 5, 6, 0];

export function Visit() {
  const now = new Date();
  const state = openState(now);

  return (
    <div className="page">
      <header className="page-head visit-head">
        <h1 className="display">Visit</h1>
        <p className="lede">{visit.intro}</p>
      </header>

      <div className="visit-top">
        <section className="hours" aria-labelledby="hours-title">
          <h2 id="hours-title">Opening hours</h2>
          <p className="hours-state" data-open={state.open || undefined}>
            <span
              className="open-dot"
              data-open={state.open || undefined}
              aria-hidden="true"
            />
            {state.text}
          </p>
          <table>
            <caption className="visually-hidden">Opening hours by day</caption>
            <tbody>
              {week.map((d) => {
                const h = hours[d];
                return (
                  <tr
                    key={d}
                    aria-current={d === now.getDay() ? "date" : undefined}
                  >
                    <th scope="row">{DAYS[d]}</th>
                    <td>{h ? `${h.open} – ${h.close}` : "Closed"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="quiet">
            Closed 24–26 December and 1 January. Last entry 15 minutes before
            closing.
          </p>
        </section>

        <section className="where" aria-labelledby="where-title">
          <h2 id="where-title">Where</h2>
          <address>
            {brand.street}
            <br />
            {brand.city}
          </address>
          <svg
            className="map"
            viewBox="0 0 400 260"
            role="img"
            aria-label="Street map: Folio is on Tanner Street between Pier Road and Carroll Street; the ferry landing is to the west by the water."
          >
            <rect className="map-water" x="0" y="0" width="70" height="260" />
            <path
              className="map-road"
              d="M70 70H400M70 190H400M150 0V260M300 0V260"
            />
            <path className="map-road map-road-main" d="M70 130H400" />
            <rect className="map-block" x="210" y="98" width="40" height="22" />
            <circle className="map-pin" cx="230" cy="109" r="7" />
            <rect className="map-pier" x="40" y="122" width="34" height="16" />
            <text x="78" y="124">
              Tanner St
            </text>
            <text x="306" y="62">
              Carroll St
            </text>
            <text x="156" y="250">
              Pier Rd
            </text>
            <text x="12" y="152">
              Ferry
            </text>
            <text x="216" y="88">
              Folio
            </text>
          </svg>
          <ul className="line-list">
            {visit.gettingThere.map((g) => (
              <li key={g.title}>
                <strong>{g.title}</strong>
                <span>{g.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="section spaces" aria-labelledby="spaces-title">
        <h2 id="spaces-title">The building</h2>
        <div className="spaces-body">
          <img
            src={images.facade}
            alt="The brick corner of the gallery building against a clear blue sky"
            loading="lazy"
            width={1600}
            height={1067}
          />
          <ul className="spaces-list">
            {visit.spaces.map((s) => (
              <li key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section access" aria-labelledby="access-title">
        <div className="access-grid">
          <div>
            <h2 id="access-title">Access</h2>
            <p>
              If anything would make your visit easier, call {brand.phone} or
              write to us and we will have it ready when you arrive.
            </p>
          </div>
          <ul className="check-list">
            {visit.access.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Before you come</h2>
        <div className="faq-list">
          {visit.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p>
          Bringing a group? <Link to="/enquire">Send us your dates</Link> and we
          will open early for you.
        </p>
      </section>
    </div>
  );
}
