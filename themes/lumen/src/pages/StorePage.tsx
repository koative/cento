import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { eyeTestCopy, stores, type Store } from "../content";
import {
  clinicDates,
  dateLabel,
  days,
  hoursLabel,
  openStatus,
  slots,
} from "../lib/hours";

export function StorePage({ store }: { store: Store }) {
  const status = openStatus(store);
  const today = new Date().getDay();
  const next = clinicDates(store, 3).map((d) => ({
    d,
    free: slots(store, d).filter((s) => !s.taken).length,
  }));
  const others = stores.filter((s) => s.id !== store.id);

  return (
    <div className="page store-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/stores">Stores</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{store.name}</span>
      </nav>

      <header className="store-hero">
        <div>
          <p className="store-city">{store.city}</p>
          <h1>Lumen {store.name}</h1>
          <p className="lede">{store.intro}</p>
          <p className="status" data-open={status.open || undefined}>
            {status.label}
          </p>
          <div className="actions">
            <Link to={`/eye-test?store=${store.id}`} className="btn">
              Book an eye test here <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              className="btn btn-quiet"
              href={`tel:${store.phone.replace(/\s/g, "")}`}
            >
              Call {store.phone}
            </a>
          </div>
        </div>
        <img
          src={store.photo.src}
          alt={store.photo.alt}
          width={1200}
          height={900}
        />
      </header>

      <div className="store-info">
        <section>
          <h2>Find us</h2>
          <address>
            {store.address}
            <br />
            {store.postcode}
          </address>
          <p>{store.directions}</p>
        </section>
        <section>
          <h2>Opening hours</h2>
          <table className="hours">
            <tbody>
              {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                <tr key={d} aria-current={d === today || undefined}>
                  <th scope="row">{days[d]}</th>
                  <td>{hoursLabel(store, d)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Next eye tests</h2>
          <ul className="next-slots">
            {next.map(({ d, free }) => (
              <li key={d.toISOString()}>
                <span>{dateLabel(d)}</span>
                <span>{free} times free</span>
              </li>
            ))}
          </ul>
          <h3>Optometrists</h3>
          <ul className="plain">
            {store.optometrists.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>In this store</h2>
          <ul className="ticks">
            {store.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
            <li>Free frame adjustments, no appointment</li>
          </ul>
          <h3>Bring to your eye test</h3>
          <ul className="plain">
            {eyeTestCopy.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="section">
        <h2>Other stores</h2>
        <ul className="store-lines">
          {others.map((s) => (
            <li key={s.id}>
              <Link to={`/stores/${s.id}`}>
                <span className="store-city">{s.city}</span>
                <span className="store-name">{s.name}</span>
                <span>{s.address}</span>
                <span>Today {hoursLabel(s, today)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
