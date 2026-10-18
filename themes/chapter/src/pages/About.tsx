import { about, brand, staff } from "../content";
import { Link } from "../router";

export function About() {
  const [lead, ...rest] = about.photos;
  return (
    <>
      <section className="wrap page-head">
        <h1>{about.title}</h1>
        <p className="lede">{about.intro}</p>
      </section>

      <figure className="wrap about-lead">
        <img src={lead.src} alt={lead.alt} width={1600} height={1200} />
        <figcaption>{lead.caption}</figcaption>
      </figure>

      <section className="wrap about-story" aria-labelledby="story-h">
        <h2 id="story-h">How it started</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap" aria-labelledby="rules-h">
        <h2 id="rules-h">House rules</h2>
        <dl className="principles principles-4">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap about-pair" aria-label="Studio and field">
        {rest.map((p) => (
          <figure key={p.caption}>
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              width={1600}
              height={1000}
            />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </section>

      <section className="wrap about-people" aria-labelledby="people-h">
        <div>
          <h2 id="people-h">The people</h2>
          <p>
            Seven hosts, whom you can{" "}
            <Link to="/hosts">meet properly here</Link>, and the editors and
            producers who shape every episode.
          </p>
        </div>
        <ul className="staff-list">
          {staff.map((s) => (
            <li key={s.name}>
              <span className="staff-name">{s.name}</span>
              <span className="staff-role">{s.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap about-contact" aria-labelledby="contact-h">
        <div>
          <h2 id="contact-h">Pitch us a show</h2>
          <p>{about.pitch}</p>
          <a className="btn btn-ink" href={`mailto:${brand.pitchEmail}`}>
            Email a pitch
          </a>
        </div>
        <div>
          <h2>Visit the studio</h2>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>{brand.studioHours}. Listener visits by appointment.</p>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          </p>
        </div>
      </section>
    </>
  );
}
