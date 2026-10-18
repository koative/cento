import { ArrowRight, Phone } from "lucide-react";
import { Link } from "../router";
import { locations } from "../content";
import { hoursLabel, openStatus } from "../lib";
import { CityMap } from "../components/CityMap";

export function Locations() {
  const today = new Date().getDay();
  return (
    <div className="page locations-page">
      <header className="page-head wrap">
        <h1>Locations</h1>
        <p className="lede">
          Three counters and a truck, all on the same side of the river. Every
          one takes pickup orders; Eastside and Northgate also deliver.
        </p>
      </header>

      <div className="wrap locations-grid">
        <CityMap />
        <ul className="location-list">
          {locations.map((l) => {
            const s = openStatus(l.hours);
            return (
              <li key={l.id} className="location-row">
                <div>
                  <h2>
                    <Link to={`/locations/${l.id}`}>{l.name}</Link>
                  </h2>
                  <p className="location-kind">{l.kind}</p>
                </div>
                <p
                  className="location-status"
                  data-open={s.open ? "" : undefined}
                >
                  <span className="dot" aria-hidden="true" />
                  {s.label}
                  <span className="location-today">
                    Today: {hoursLabel(l.hours[today])}
                  </span>
                </p>
                <address>
                  {l.address.map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </address>
                <p className="location-links">
                  <a href={l.phoneHref}>
                    <Phone aria-hidden="true" /> {l.phone}
                  </a>
                  <Link to={`/locations/${l.id}`} className="text-link">
                    Hours & details <ArrowRight aria-hidden="true" />
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
