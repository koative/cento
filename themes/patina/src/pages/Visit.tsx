import { ChevronDown } from "lucide-react";
import { brand, visit } from "../content";
import { money } from "../lib/cart";

export function Visit() {
  return (
    <div className="page visit">
      <header className="page-head page-head-split">
        <div>
          <h1>{visit.title}</h1>
          <p className="lead">{visit.intro}</p>
          <address className="visit-address">
            {brand.address}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a> ·{" "}
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </address>
        </div>
        <figure>
          <img
            src={visit.image.src}
            alt={visit.image.alt}
            width={visit.image.w}
            height={visit.image.h}
          />
        </figure>
      </header>

      <section
        className="section visit-grid"
        aria-label="Opening hours and directions"
      >
        <div>
          <h2>Opening hours</h2>
          <dl className="hours">
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="quiet">{brand.floorNote}</p>
        </div>
        <div>
          <h2>Getting here</h2>
          <ul className="plain-list">
            {visit.directions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="delivery-h">
        <h2 id="delivery-h">Delivery</h2>
        <div className="table-wrap">
          <table className="price-table">
            <thead>
              <tr>
                <th scope="col">Option</th>
                <th scope="col">What happens</th>
                <th scope="col">Per order</th>
              </tr>
            </thead>
            <tbody>
              {visit.delivery.map((d) => (
                <tr key={d.name}>
                  <th scope="row">{d.name}</th>
                  <td>{d.text}</td>
                  <td className="num">{d.price ? money(d.price) : "Free"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions we get on the floor</h2>
        {visit.faq.map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <ChevronDown size={20} aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
