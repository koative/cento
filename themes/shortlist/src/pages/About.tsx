import { about, brand, home } from "../content";
import { Link } from "../router";

export function About() {
  return (
    <div className="page about-page">
      <div className="wrap page-head">
        <h1>{about.title}</h1>
        <p className="lede">{about.intro}</p>
      </div>

      <section className="wrap about-story" aria-labelledby="story-h">
        <h2 id="story-h" className="section-title">
          How it started
        </h2>
        <div className="story-columns">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <figure className="wrap about-photo">
        <img src={about.photo.src} alt={about.photo.alt} loading="lazy" />
        <figcaption>{about.photo.caption}</figcaption>
      </figure>

      <section className="rules-band" aria-labelledby="rules-h">
        <div className="wrap rules">
          <h2 id="rules-h" className="rules-title">
            The house rules
          </h2>
          <dl className="rules-list">
            {home.rules.map((r) => (
              <div key={r.title}>
                <dt>{r.title}</dt>
                <dd>{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="desk-h">
        <h2 id="desk-h" className="section-title">
          The desk
        </h2>
        <ul className="people">
          {about.people.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p className="people-role">{p.role}</p>
              <p>{p.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="wrap section contact-strip"
        aria-labelledby="contact-h"
      >
        <h2 id="contact-h" className="section-title">
          Write to the desk
        </h2>
        <div className="contact-cols">
          <p>
            Looking for work
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
          <p>
            Hiring
            <a href={`mailto:${brand.employersEmail}`}>
              {brand.employersEmail}
            </a>
          </p>
          <p>
            By phone, {brand.hours.replace("Desk staffed ", "")}
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
        </div>
        <p className="fine">
          {about.numbersNote} Ready to look?{" "}
          <Link to="/jobs">Today’s listings</Link>.
        </p>
      </section>
    </div>
  );
}
