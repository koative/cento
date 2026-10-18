import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand } from "../content";

export default function About() {
  return (
    <div className="page">
      <header className="wrap about-head">
        <h1>{about.heading}</h1>
        <p className="lede">{about.intro}</p>
      </header>

      <section className="wrap about-story">
        <img
          src={about.image}
          alt={about.imageAlt}
          width={1600}
          height={1064}
        />
        <div>
          <h2>What we kept from the classroom</h2>
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <h2>Three rules we teach by</h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section band">
        <div className="wrap">
          <h2>{about.processTitle}</h2>
          <ol className="process">
            {about.process.map((s, i) => (
              <li key={s.title}>
                <span className="process-step num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <h2>The people behind the desk</h2>
        <ul className="team">
          {about.team.map((t) => (
            <li key={t.name}>
              <span className="team-name">{t.name}</span>
              <span className="team-role">{t.role}</span>
            </li>
          ))}
        </ul>
        <p className="muted">{brand.address}</p>
      </section>

      <section className="wrap section about-close">
        <p className="about-close-text">{about.close}</p>
        <div className="actions">
          <a
            href={`mailto:${brand.email}?subject=Teaching%20on%20Campus`}
            className="btn btn-primary"
          >
            Write to us
          </a>
          <Link to="/instructors" className="text-link">
            Meet the current instructors <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
