import { Mail, Phone } from "lucide-react";
import { brand, budget, cityHall, departments, images } from "../content";
import { hallStatus } from "../lib/city";
import { PageHead } from "../components/PageHead";

export function CityHall() {
  const hall = hallStatus();
  const max = Math.max(...budget.split.map((b) => b.amount));

  return (
    <>
      <PageHead
        title="City Hall & departments"
        lede="Who runs the city, where to find them, and where the money goes."
      />

      <section
        className="wrap section hall-intro"
        aria-labelledby="welcome-title"
      >
        <img
          src={images.cityHall.src}
          alt={images.cityHall.alt}
          width={images.cityHall.w}
          height={images.cityHall.h}
        />
        <div>
          <h2 id="welcome-title">A word from the mayor</h2>
          {cityHall.welcome.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <p className="signature">— {cityHall.signedBy}</p>
        </div>
      </section>

      <section className="band band-ink" aria-labelledby="visit-title">
        <div className="wrap visit">
          <div>
            <h2 id="visit-title">Visit or call</h2>
            <p className="hall-status">
              <span
                className="status-dot"
                data-open={hall.open || undefined}
                aria-hidden="true"
              />
              {hall.open ? "Open now" : "Closed now"} · {hall.text}
            </p>
          </div>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.tel}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <ul className="hours">
            {brand.hoursText.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="how-title">
        <h2 id="how-title">How the city is run</h2>
        <dl className="how">
          {cityHall.howItWorks.map((h) => (
            <div key={h.title}>
              <dt>{h.title}</dt>
              <dd>{h.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section" aria-labelledby="dept-title">
        <h2 id="dept-title">Departments</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="dept-title"
        >
          <table className="dept-table">
            <thead>
              <tr>
                <th scope="col">Department</th>
                <th scope="col">Handles</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.name}>
                  <th scope="row">{d.name}</th>
                  <td>{d.does}</td>
                  <td className="dept-contact">
                    <a href={`tel:${d.phone.replace(/\s/g, "")}`}>
                      <Phone size={15} aria-hidden="true" /> {d.phone}
                    </a>
                    <a href={`mailto:${d.email}`}>
                      <Mail size={15} aria-hidden="true" /> {d.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="band band-mist" aria-labelledby="budget-title">
        <div className="wrap budget">
          <div>
            <h2 id="budget-title">Where each $100 goes</h2>
            <p>
              The draft {budget.year} operating budget is {budget.total}. This
              is how every $100 of city property tax would be spent. Comment on
              it until November 6.
            </p>
          </div>
          <ul className="bars">
            {budget.split.map((b) => (
              <li key={b.label}>
                <span className="bar-label">{b.label}</span>
                <span className="bar-track" aria-hidden="true">
                  <span
                    className="bar"
                    style={{ width: `${(b.amount / max) * 100}%` }}
                  />
                </span>
                <span className="bar-value">${b.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
