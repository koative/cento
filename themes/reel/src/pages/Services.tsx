import { Link } from "../router";
import {
  faq,
  img,
  process,
  rateCard,
  services,
  servicesPage,
} from "../content";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export function Services() {
  return (
    <>
      <header className="wrap page-head page-head-split">
        <div>
          <h1 className="h-display">{servicesPage.title}</h1>
          <p className="lede">{servicesPage.intro}</p>
        </div>
        <img
          src={img.setCamera.src}
          alt={img.setCamera.alt}
          width={img.setCamera.w}
          height={img.setCamera.h}
        />
      </header>

      <section className="wrap section-tight" aria-label="What we offer">
        <ul className="services">
          {services.map((s) => (
            <li key={s.id} className="service">
              <h2 className="service-h">{s.name}</h2>
              <div className="service-body">
                <p>{s.summary}</p>
                <ul className="ticks">
                  {s.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <dl className="service-terms">
                <div>
                  <dt>Timeline</dt>
                  <dd>{s.timeline}</dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>{s.from}</dd>
                </div>
                <Link to={`/contact?type=${s.enquiry}`} className="text-link">
                  Enquire
                </Link>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className="band">
        <div className="wrap section">
          <h2 className="h-section">{servicesPage.processHeading}</h2>
          <ol className="process">
            {process.map((p) => (
              <li key={p.step}>
                <h3>{p.step}</h3>
                <p className="process-time">{p.time}</p>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section rates">
        <div>
          <h2 className="h-section">{servicesPage.rateHeading}</h2>
          <p className="quiet">{servicesPage.rateNote}</p>
          <img
            src={img.editFlatbed.src}
            alt={img.editFlatbed.alt}
            width={img.editFlatbed.w}
            height={img.editFlatbed.h}
            loading="lazy"
          />
        </div>
        <table className="rate-table">
          <caption className="sr-only">
            Day rates for crew and finishing rooms
          </caption>
          <thead>
            <tr>
              <th scope="col">Room or crew</th>
              <th scope="col" className="num">
                Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {rateCard.map((r) => (
              <tr key={r.item}>
                <th scope="row">{r.item}</th>
                <td className="num">
                  {gbp.format(r.price)} <span>/ {r.unit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="wrap section faq-wrap">
        <h2 className="h-section">{servicesPage.faqHeading}</h2>
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap section cta-line">
        <h2 className="h-display">Have a film in mind?</h2>
        <Link to="/contact?type=commission" className="btn btn-primary">
          Tell us about it
        </Link>
      </section>
    </>
  );
}
