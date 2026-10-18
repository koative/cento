import { Link } from "../router";
import { brand, days, hours, visit } from "../content";
import { hoursLabel, openStatus } from "../lib/format";
import { ClinicMap } from "../components/ClinicMap";

export function Visit() {
  const status = openStatus(hours);
  const today = new Date().getDay();

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>Visit</h1>
        <p className="lede">{visit.lede}</p>
      </header>

      <section className="wrap visit-grid" aria-labelledby="where-h">
        <div>
          <h2 id="where-h" className="sr-only">
            Address and hours
          </h2>
          <address className="visit-address">
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <p className="status-line" data-open={status.open ? "" : undefined}>
            {status.label}
          </p>
          <dl className="hours-list">
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <div key={d} data-today={today === d ? "" : undefined}>
                <dt>{days[d]}</dt>
                <dd className="tnum">{hoursLabel(hours[d])}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ClinicMap />
      </section>

      <section className="wrap visit-cols" aria-labelledby="get-h">
        <div>
          <h2 id="get-h">Getting here</h2>
          <dl className="policy-list">
            {visit.getting.map((g) => (
              <div key={g.title}>
                <dt>{g.title}</dt>
                <dd>{g.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>Access</h2>
          <ul className="ticks">
            {visit.access.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-alert" aria-labelledby="em-h">
        <div className="wrap emergency">
          <div>
            <h2 id="em-h">Dental emergency?</h2>
            <p>{visit.emergency}</p>
          </div>
          <div className="emergency-actions">
            <a
              className="btn btn-light btn-lg"
              href={`tel:${brand.emergencyPhone.replace(/\s/g, "")}`}
            >
              Call {brand.emergencyPhone}
            </a>
            <Link to="/book?t=emergency" className="btn btn-outline-light">
              Book an emergency slot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
