import { Clock, MapPin, Phone } from "lucide-react";
import { brand, faqs, hours, pages, services, visit } from "../content";
import { clock, shopStatus } from "../lib/format";

function StreetMap() {
  return (
    <svg
      className="street-map"
      viewBox="0 0 400 300"
      role="img"
      aria-labelledby="map-title"
    >
      <title id="map-title">
        Map: Tinker is on the north side of Larkspur Street, between the bakery
        and the bike shop, near 3rd Avenue.
      </title>
      <rect width="400" height="300" fill="#efe4cf" />
      <g fill="#e2d3b6">
        <rect x="20" y="20" width="250" height="110" rx="6" />
        <rect x="310" y="20" width="70" height="110" rx="6" />
        <rect x="20" y="190" width="250" height="90" rx="6" />
        <rect x="310" y="190" width="70" height="90" rx="6" />
      </g>
      <g fill="#cdbf9f">
        <rect x="30" y="30" width="110" height="46" rx="4" />
      </g>
      <path d="M0 160H400M290 0V300" stroke="#fffaf0" strokeWidth="34" />
      <path
        d="M0 160H400M290 0V300"
        stroke="#cdbf9f"
        strokeWidth="1.5"
        strokeDasharray="8 8"
      />
      <g fill="#fffaf0" stroke="#1f2340" strokeWidth="1.5">
        <rect x="70" y="92" width="56" height="38" rx="3" />
        <rect x="190" y="92" width="56" height="38" rx="3" />
      </g>
      <rect x="130" y="86" width="56" height="44" rx="3" fill="#c63a22" />
      <g
        fill="#1f2340"
        fontFamily="Quicksand, sans-serif"
        fontSize="11"
        fontWeight="700"
        textAnchor="middle"
      >
        <text x="98" y="115">
          Bakery
        </text>
        <text x="218" y="115">
          Bikes
        </text>
        <text x="85" y="57">
          Elm Ave lot
        </text>
        <text x="140" y="164">
          LARKSPUR STREET
        </text>
        <text x="290" y="248" transform="rotate(-90 290 248)">
          3RD AVE
        </text>
      </g>
      <text
        x="158"
        y="113"
        fill="#fff"
        fontFamily="Grandstander, sans-serif"
        fontSize="13"
        fontWeight="800"
        textAnchor="middle"
      >
        Tinker
      </text>
      <g fill="#2c5cc5">
        <circle cx="318" cy="186" r="9" />
      </g>
      <text
        x="318"
        y="190"
        fill="#fff"
        fontFamily="Quicksand, sans-serif"
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
      >
        4
      </text>
      <text
        x="332"
        y="210"
        fill="#1f2340"
        fontFamily="Quicksand, sans-serif"
        fontSize="10"
        fontWeight="700"
      >
        Bus 4 & 11
      </text>
    </svg>
  );
}

export function Visit() {
  const status = shopStatus();
  const today = new Date().getDay();
  return (
    <div className="page visit-page">
      <header className="page-head">
        <h1>{pages.visit.title}</h1>
        <p className="lead">{pages.visit.lead}</p>
      </header>

      <div className="visit-grid">
        <section className="hours" aria-labelledby="h-hours">
          <h2 id="h-hours">Opening hours</h2>
          <p className={"status-pill" + (status.open ? " is-open" : "")}>
            <Clock size={16} aria-hidden="true" /> {status.text}
          </p>
          <table>
            <caption className="visually-hidden">Opening hours by day</caption>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 0].map((i) => (
                <tr
                  key={hours[i].day}
                  aria-current={i === today ? "date" : undefined}
                >
                  <th scope="row">{hours[i].day}</th>
                  <td className="num">
                    {hours[i].open && hours[i].close
                      ? `${clock(hours[i].open!)} – ${clock(hours[i].close!)}`
                      : "Closed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted">
            Open until 10 pm on December Fridays and Saturdays. Closed
            Thanksgiving, Christmas Day and New Year&rsquo;s Day.
          </p>
        </section>

        <section className="where" aria-labelledby="h-where">
          <h2 id="h-where">Finding us</h2>
          <StreetMap />
          <p>{visit.intro}</p>
          <p className="address-line">
            <MapPin size={18} aria-hidden="true" /> {brand.street}, {brand.town}
          </p>
          <p className="address-line">
            <Phone size={18} aria-hidden="true" />{" "}
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
          <dl className="transport">
            {visit.transport.map((t) => (
              <div key={t.title}>
                <dt>{t.title}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="services services-wide" aria-labelledby="h-counter">
        <h2 id="h-counter">At the counter</h2>
        <dl>
          {services.map((s) => (
            <div key={s.title}>
              <dt>{s.title}</dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="faq" aria-labelledby="h-faq">
        <h2 id="h-faq">Questions we hear at the till</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
