import { ArrowRight } from "lucide-react";
import { about } from "../content";

export default function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{about.heading}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section className="wrap story" aria-label="Our story">
        {about.story.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </section>

      <section className="archive-wall" aria-labelledby="wall-title">
        <div className="wrap">
          <div className="section-intro">
            <h2 id="wall-title">{about.archive.heading}</h2>
            <p>{about.archive.text}</p>
          </div>
          <ul className="wall">
            {about.archive.items.map((a) => (
              <li key={a.caption}>
                <figure>
                  <img
                    src={a.image}
                    width={a.width}
                    height={a.height}
                    alt={a.alt}
                    loading="lazy"
                  />
                  <figcaption>{a.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap principles" aria-labelledby="principles-title">
        <h2 id="principles-title">{about.principles.heading}</h2>
        <dl>
          {about.principles.items.map((p) => (
            <div key={p.title}>
              <dt>
                <del>{p.title}</del>
              </dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap team" aria-labelledby="team-title">
        <h2 id="team-title">{about.team.heading}</h2>
        <ul className="team-list">
          {about.team.people.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p className="team-role">{p.role}</p>
              <p>{p.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="close" aria-labelledby="careers-title">
        <div className="wrap close-inner">
          <h2 id="careers-title" className="display">
            {about.careers.heading}
          </h2>
          <p>{about.careers.text}</p>
          <div className="actions">
            <a
              href={`mailto:${about.careers.email}`}
              className="btn btn-primary btn-large"
            >
              {about.careers.link} <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
