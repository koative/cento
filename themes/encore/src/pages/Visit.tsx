import { Accessibility, Bike, Bus, Car, Train } from "lucide-react";
import {
  accessFeatures,
  barMenu,
  boxOfficeHours,
  brand,
  days,
  gettingHere,
  images,
  seatingGuide,
  visitFaq,
} from "../content";
import { hoursLabel, money, openStatus } from "../lib/util";

const icons: Record<string, typeof Bus> = {
  "By bus": Bus,
  "By train": Train,
  "By car": Car,
  "By bike": Bike,
};

export function Visit() {
  const today = new Date().getDay();
  const status = openStatus(boxOfficeHours);
  // Monday-first for reading.
  const week = [1, 2, 3, 4, 5, 6, 0];

  return (
    <>
      <section className="page-head page-head-split">
        <div className="wrap split">
          <div>
            <h1 className="display">Plan your visit</h1>
            <p className="lede">
              {brand.address.join(", ")}. Doors open 45 minutes before curtain;
              the bar opens with them, and interval drinks can be ordered before
              the show.
            </p>
            <p className="status-line">
              <span
                className="live-dot"
                data-open={status.open ? "" : undefined}
              />{" "}
              {status.label}
            </p>
          </div>
          <img
            src={images.house.src}
            alt={images.house.alt}
            width={images.house.w}
            height={images.house.h}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap split split-top">
          <div>
            <h2>Getting here</h2>
            <ul className="icon-list">
              {gettingHere.map((g) => {
                const Icon = icons[g.title] ?? Bus;
                return (
                  <li key={g.title}>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{g.title}</h3>
                      <p>{g.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Box office</h2>
            <table className="data-table hours">
              <caption className="sr-only">Box office opening hours</caption>
              <tbody>
                {week.map((d) => (
                  <tr key={d} aria-current={d === today ? "date" : undefined}>
                    <th scope="row">{days[d]}</th>
                    <td className="num">{hoursLabel(boxOfficeHours[d])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="quiet">
              On performance days the box office stays open until curtain-up.
              Call <a href={brand.phoneHref}>{brand.phone}</a> or email{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap split split-top">
          <div>
            <h2>Access</h2>
            <ul className="check-list">
              {accessFeatures.map((a) => (
                <li key={a}>
                  <Accessibility aria-hidden="true" /> {a}
                </li>
              ))}
            </ul>
            <p>
              Join the free Access Register and we'll remember what you need
              every time you book. Call the box office or email{" "}
              <a href={`mailto:${brand.email}?subject=Access%20Register`}>
                {brand.email}
              </a>
              .
            </p>
          </div>
          <div>
            <h2>Where to sit</h2>
            <dl className="guide">
              {seatingGuide.map((s) => (
                <div key={s.section}>
                  <dt>{s.section}</dt>
                  <dd>{s.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split-top">
          <div>
            <h2>The Lantern Bar</h2>
            <p>
              On the mezzanine, under the restored ceiling. Open from doors
              until 30 minutes after the show, and all afternoon on matinee
              days.
            </p>
            <ul className="menu-list">
              {barMenu.map((b) => (
                <li key={b.item}>
                  <span>{b.item}</span>
                  <span className="num">{money(b.price)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="faq">
            <h2>Before you come</h2>
            {visitFaq.map((f) => (
              <details key={f.q} className="disclosure">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
