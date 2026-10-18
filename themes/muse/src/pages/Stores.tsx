import { Mail, Phone } from "lucide-react";
import { brand, storeServices, stores } from "../content";
import { DAYS, storeStatus, todayIndex } from "../lib/hours";

// Week shown Monday first, as the shops print it on the door.
const WEEK = [1, 2, 3, 4, 5, 6, 0];

export function Stores() {
  return (
    <div className="page stores-page">
      <header className="page-head">
        <h1 className="display">Stores</h1>
        <p className="lede">
          Three shops, each with a tailor on site. Try the collection on, have a
          hem taken up while you wait for a coffee, or bring in any Muse piece,
          of any age, to be repaired.
        </p>
      </header>

      <div className="store-list">
        {stores.map((s, i) => {
          const status = storeStatus(s);
          const today = todayIndex(s);
          return (
            <section
              key={s.id}
              className="store"
              aria-labelledby={`store-${s.id}`}
            >
              <img
                src={s.image}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="store-text">
                <h2 id={`store-${s.id}`}>
                  {s.city} <span>{s.name}</span>
                </h2>
                <p
                  className="store-status"
                  data-open={status.open || undefined}
                >
                  {status.line} <span className="fine">(local time)</span>
                </p>
                <address>
                  {s.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <p>{s.note}</p>
                <table className="hours">
                  <caption className="visually-hidden">
                    Opening hours, {s.city}
                  </caption>
                  <tbody>
                    {WEEK.map((d) => {
                      const h = s.hours[d];
                      return (
                        <tr key={d} data-today={d === today || undefined}>
                          <th scope="row">
                            {DAYS[d]}
                            {d === today && (
                              <span className="visually-hidden"> (today)</span>
                            )}
                          </th>
                          <td>{h ? `${h[0]}–${h[1]}` : "Closed"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <ul className="store-services">
                  {s.services.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="store-contact">
                  <a href={s.phoneHref}>
                    <Phone size={16} aria-hidden="true" /> {s.phone}
                  </a>
                  <a href={`mailto:${s.email}`}>
                    <Mail size={16} aria-hidden="true" /> {s.email}
                  </a>
                </p>
              </div>
            </section>
          );
        })}
      </div>

      <section className="section faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Appointments, alterations and repairs</h2>
        <div className="faq-list">
          {storeServices.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="fine">
          Questions about an online order? Write to{" "}
          <a href={`mailto:${brand.email}`}>{brand.email}</a> or call{" "}
          <a href={brand.phoneHref}>{brand.phone}</a>.
        </p>
      </section>
    </div>
  );
}
