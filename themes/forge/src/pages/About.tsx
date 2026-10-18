import { ArrowRight, Mail } from "lucide-react";
import { about, brand, images } from "../content";
import { Link } from "../router";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>A family-owned shop that reads the drawing twice</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <figure className="wide-figure">
        <img
          src={images.shopFloor.src}
          alt={images.shopFloor.alt}
          width={images.shopFloor.w}
          height={images.shopFloor.h}
        />
      </figure>

      <section className="wrap section story" aria-labelledby="story-title">
        <h2 id="story-title">How we got here</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <ol className="years">
          {about.timeline.map(([y, t]) => (
            <li key={y}>
              <span className="year">{y}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="band-paper" aria-labelledby="values-title">
        <div className="wrap section">
          <h2 id="values-title">Three rules we hire by</h2>
          <dl className="values">
            {about.values.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="people-title">
        <h2 id="people-title">People you will talk to</h2>
        <ul className="people">
          {about.people.map((p) => (
            <li key={p.name}>
              <span className="people-name">{p.name}</span>
              <span className="people-role">{p.role}</span>
              <span className="people-line">{p.line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section careers" aria-labelledby="careers-title">
        <div>
          <h2 id="careers-title">Careers</h2>
          <p>
            Two shifts, paid overtime, tuition for NIMS credentials and a
            training budget that does not need a business case. Apply with a
            short note to{" "}
            <a href={`mailto:${brand.jobsEmail}`}>{brand.jobsEmail}</a>.
          </p>
        </div>
        <ul className="roles">
          {about.roles.map((r) => (
            <li key={r.title}>
              <div>
                <h3>{r.title}</h3>
                <p>{r.detail}</p>
              </div>
              <span className="role-shift">{r.shift}</span>
              <a
                className="btn btn-ghost"
                href={`mailto:${brand.jobsEmail}?subject=${encodeURIComponent(r.title)}`}
              >
                <Mail aria-hidden="true" /> Apply
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section visit" aria-labelledby="visit-title">
        <div>
          <h2 id="visit-title">Visit the shop</h2>
          <p>
            Customers are welcome on the floor any weekday. Bring safety shoes
            or borrow a pair at reception; ITAR areas need a day's notice.
          </p>
          <Link to="/rfq" className="btn btn-primary">
            Book a visit with your RFQ <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <dl className="spec-list">
          <div>
            <dt>Address</dt>
            <dd>{brand.address.join(", ")}</dd>
          </div>
          {brand.hours.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={brand.phoneHref}>{brand.phone}</a>
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
