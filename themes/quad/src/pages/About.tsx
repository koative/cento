import { Link } from "../router";
import { about, brand, history, images, leaders } from "../content";
import { Photo } from "../components/Photo";

export function About() {
  return (
    <>
      <header className="page-head wrap page-head-photo">
        <div>
          <h1>{about.title}</h1>
          <p className="lead">{about.lead}</p>
        </div>
        <Photo
          img={images.cloister}
          caption="The cloister walk in the 1950s, from the University archive."
          eager
        />
      </header>

      <section
        className="section wrap principal"
        aria-label="From the Vice-Chancellor"
      >
        <blockquote>
          <p>{about.principal.quote}</p>
          <footer>
            <strong>{about.principal.name}</strong>
            {about.principal.role}
          </footer>
        </blockquote>
      </section>

      <section className="section section-stone" aria-labelledby="hist-h">
        <div className="wrap">
          <h2 id="hist-h">Since {brand.founded}</h2>
          <ol className="timeline">
            {history.map((h) => (
              <li key={h.year}>
                <span className="timeline-year">{h.year}</span>
                <p>{h.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap split" aria-labelledby="val-h">
        <div>
          <h2 id="val-h">What we hold to</h2>
          <dl className="values">
            {about.values.map((v) => (
              <div key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Photo
          img={images.arches}
          caption="The Ferrier gatehouse, the way most students first walk into the quad."
        />
      </section>

      <section className="section wrap" aria-labelledby="lead-h">
        <h2 id="lead-h">Who leads the university</h2>
        <ul className="people">
          {leaders.map((l) => (
            <li key={l.name}>
              <span className="monogram" aria-hidden="true">
                {l.name
                  .replace(/^(Prof\.|Dr)\s/, "")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div>
                <h3>{l.name}</h3>
                <p className="person-role">{l.role}</p>
                <p>{l.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section-ink" aria-labelledby="visit-h">
        <div className="wrap visit">
          <div>
            <h2 id="visit-h">Find us</h2>
            <address>
              {brand.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <p>
              Ten minutes' walk from Harrowmere Central station; buses 4, 11 and
              19 stop on Cloister Lane. The Old Quad is open to visitors daily,
              8:00–20:00.
            </p>
          </div>
          <div>
            <h3 className="h-sub">Get in touch</h3>
            <p>
              General enquiries:{" "}
              <a href={`mailto:${brand.enquiries}`}>{brand.enquiries}</a>
              <br />
              Admissions: <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <br />
              Switchboard: <a href={brand.phoneHref}>{brand.phone}</a>
            </p>
            <Link to="/events" className="btn btn-light">
              Visit on an open day
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
