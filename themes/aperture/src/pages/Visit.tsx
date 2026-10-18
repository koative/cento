import { Link } from "../router";
import { brand, hours, images, visit } from "../content";
import { Faq } from "../components/Listing";

export function Visit() {
  return (
    <div className="wrap page-pad">
      <header className="page-head">
        <h1>{visit.title}</h1>
        <p className="lede">{visit.intro}</p>
      </header>

      <div className="visit-top">
        <img
          src={images.booth.src}
          alt={images.booth.alt}
          width={images.booth.w}
          height={images.booth.h}
        />
        <div className="visit-facts">
          <section aria-labelledby="where-h">
            <h2 id="where-h">Where</h2>
            <address>
              {brand.name}
              <br />
              {brand.street}
              <br />
              {brand.town}
            </address>
            <p>
              <a href={brand.phoneHref}>{brand.phone}</a>
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          </section>
          <section aria-labelledby="hours-h">
            <h2 id="hours-h">Opening hours</h2>
            <dl className="hours">
              {hours.map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <section className="directions" aria-labelledby="dir-h">
        <h2 id="dir-h">Getting here</h2>
        <dl>
          {visit.directions.map((d) => (
            <div key={d.mode}>
              <dt>{d.mode}</dt>
              <dd>{d.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="access" aria-labelledby="access-h">
        <h2 id="access-h">Access</h2>
        <p>
          Tell us what you need when you book, or call the box office and we
          will sort it. Captioned, audio-described and parent-and-baby
          screenings are marked in <Link to="/whats-on">the listings</Link>.
        </p>
        <ul>
          {visit.access.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="faq-section" aria-labelledby="faq-h">
        <h2 id="faq-h">Before you come</h2>
        <Faq items={visit.faq} />
      </section>
    </div>
  );
}
