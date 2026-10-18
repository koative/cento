import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { exams, stores } from "../content";
import { days, hoursLabel, openStatus } from "../lib/hours";
import { money } from "../lib/cart";

export function Stores() {
  const today = new Date().getDay();
  return (
    <div className="page stores">
      <header className="page-head">
        <h1>Stores and eye tests</h1>
        <p className="lede">
          Four stores, each with a frame wall, a fitting bench and an exam room.
          Walk in to try frames any time; book ahead for an eye test.
        </p>
      </header>

      <ul className="store-list">
        {stores.map((s) => {
          const status = openStatus(s);
          return (
            <li key={s.id} className="store-row">
              <img
                src={s.photo.src}
                alt={s.photo.alt}
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="store-main">
                <p className="store-city">{s.city}</p>
                <h2>
                  <Link to={`/stores/${s.id}`}>{s.name}</Link>
                </h2>
                <address>
                  {s.address}
                  <br />
                  {s.postcode}
                  <br />
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a>
                </address>
                <p className="status" data-open={status.open || undefined}>
                  {status.label}
                </p>
                <p>{s.intro}</p>
                <div className="actions">
                  <Link
                    to={`/eye-test?store=${s.id}`}
                    className="btn btn-small"
                  >
                    Book here
                  </Link>
                  <Link to={`/stores/${s.id}`} className="text-link">
                    Store details <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <table className="hours">
                <caption className="visually-hidden">
                  Opening hours, {s.name}
                </caption>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                    <tr key={d} aria-current={d === today || undefined}>
                      <th scope="row">{days[d].slice(0, 3)}</th>
                      <td>{hoursLabel(s, d)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          );
        })}
      </ul>

      <section className="section exam-prices">
        <h2>Eye test prices</h2>
        <table className="price-table">
          <tbody>
            {exams.map((e) => (
              <tr key={e.id}>
                <th scope="row">
                  {e.name}
                  <small>{e.note}</small>
                </th>
                <td>{e.minutes} min</td>
                <td>{e.price ? money(e.price) : "Free"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/eye-test" className="btn">
          Book an eye test <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
