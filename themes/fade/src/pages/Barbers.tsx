import { Link } from "../router";
import { barbers, barbersPage, tierSurcharge } from "../content";
import { money } from "../lib/format";
import { workdays } from "../lib/slots";
import { PageHead } from "../components/PageHead";

export function Barbers() {
  return (
    <>
      <PageHead title={barbersPage.title} intro={barbersPage.intro} />
      <ol className="wrap barber-list">
        {barbers.map((b) => (
          <li key={b.id} className="barber-row">
            <Link
              to={`/barbers/${b.id}`}
              className="barber-photo"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src={b.photo.src}
                alt=""
                width={b.photo.w}
                height={b.photo.h}
                loading="lazy"
              />
            </Link>
            <div className="barber-plate" aria-hidden="true">
              <span>Chair</span>
              {b.chair}
            </div>
            <div className="barber-info">
              <h2>
                <Link to={`/barbers/${b.id}`}>{b.name}</Link>
              </h2>
              <p className="barber-tier">
                <span className="sr-only">Chair {b.chair}. </span>
                {b.tier}
                {tierSurcharge[b.tier]
                  ? ` · adds ${money(tierSurcharge[b.tier])}`
                  : ""}{" "}
                · cutting since {b.since}
              </p>
              <p>{b.short}</p>
              <ul className="tags" aria-label="Specialties">
                {b.specialties.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="barber-when">
              <p>{workdays(b.days)}</p>
              <Link to={`/book?barber=${b.id}`} className="btn btn-line">
                Book {b.name.split(" ")[0]}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
