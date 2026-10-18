import { ArrowLeft, Check, Phone } from "lucide-react";
import { Link } from "../router";
import { days, locations, type Location } from "../content";
import { hoursLabel, openStatus } from "../lib";
import { CityMap } from "../components/CityMap";

export function LocationPage({ location: l }: { location: Location }) {
  const s = openStatus(l.hours);
  const today = new Date().getDay();
  const others = locations.filter((o) => o.id !== l.id);

  return (
    <div className="page location-page">
      <div className="wrap">
        <Link to="/locations" className="back-link">
          <ArrowLeft aria-hidden="true" /> All locations
        </Link>
      </div>

      <section className="wrap location-hero">
        <div>
          <h1>{l.name}</h1>
          <p className="location-status" data-open={s.open ? "" : undefined}>
            <span className="dot" aria-hidden="true" />
            {l.kind} · {s.label}
          </p>
          <p className="lede">{l.description}</p>
          <address>
            {l.address.map((a) => (
              <span key={a}>{a}</span>
            ))}
            {l.zip !== "—" && <span>{l.zip}</span>}
          </address>
          <div className="actions">
            <Link to="/menu" className="btn btn-primary">
              Order pickup here
            </Link>
            <a href={l.phoneHref} className="btn btn-ghost">
              <Phone aria-hidden="true" /> {l.phone}
            </a>
          </div>
        </div>
        {l.image && (
          <img
            src={l.image.src}
            alt={l.image.alt}
            width={l.image.w}
            height={l.image.h}
          />
        )}
      </section>

      <section className="wrap location-details">
        <div>
          <h2>Hours</h2>
          <table className="hours">
            <caption className="sr-only">Opening hours for {l.name}</caption>
            <tbody>
              {days.map((d, i) => (
                <tr key={d} data-today={i === today ? "" : undefined}>
                  <th scope="row">{d}</th>
                  <td>{hoursLabel(l.hours[i])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {l.stops ? (
          <div>
            <h2>Where the Truck parks</h2>
            <table className="hours">
              <caption className="sr-only">Weekday stops for the Truck</caption>
              <tbody>
                {l.stops.map((st) => (
                  <tr
                    key={st.day}
                    data-today={days[today] === st.day ? "" : undefined}
                  >
                    <th scope="row">{st.day}</th>
                    <td>{st.spot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div>
          <h2>Good to know</h2>
          <ul className="features">
            {l.features.map((f) => (
              <li key={f}>
                <Check aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="location-map">
          <h2>On the map</h2>
          <CityMap active={l.id} />
        </div>
      </section>

      <section className="wrap location-others" aria-labelledby="others-h">
        <h2 id="others-h">The other counters</h2>
        <ul>
          {others.map((o) => (
            <li key={o.id}>
              <Link to={`/locations/${o.id}`}>
                <span className="visit-name">{o.name}</span>
                <span>{o.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
