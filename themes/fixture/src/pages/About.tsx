import { Link } from "../router";
import { about, brand } from "../content";

export function About() {
  return (
    <>
      <section className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lede">{about.lede}</p>
      </section>

      <section className="wrap story">
        <figure className="story-photo">
          <img
            src={about.image}
            alt={about.imageAlt}
            width={960}
            height={640}
          />
        </figure>
        <div className="story-copy">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap standards" aria-labelledby="standards-h">
        <h2 id="standards-h">Who comes to your door</h2>
        <ul className="promise-list promise-list-2">
          {about.standards.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap" aria-labelledby="team-h">
        <div className="section-head">
          <h2 id="team-h">The dispatch board</h2>
          <p>
            Six of our fourteen technicians. Every one is licensed in their own
            name.
          </p>
        </div>
        <ul className="roster">
          {about.team.map((t) => (
            <li key={t.licence}>
              <div className="roster-name">
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
              <dl>
                <div>
                  <dt>Licence</dt>
                  <dd>{t.licence}</dd>
                </div>
                <div>
                  <dt>On the tools</dt>
                  <dd>{t.years} years</dd>
                </div>
                <div className="roster-knows">
                  <dt>Ask them about</dt>
                  <dd>{t.knows}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap credentials" aria-labelledby="cred-h">
        <div>
          <h2 id="cred-h">On paper</h2>
          <dl className="cred-list">
            {brand.licences.map((l) => (
              <div key={l.label}>
                <dt>{l.label}</dt>
                <dd>{l.value}</dd>
              </div>
            ))}
            <div>
              <dt>Depot</dt>
              <dd>{brand.address}</dd>
            </div>
          </dl>
        </div>
        <div>
          <h2>Hours</h2>
          <dl className="cred-list">
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <div className="actions">
            <Link to="/book" className="btn btn-live">
              Book a visit
            </Link>
            <Link to="/areas" className="btn btn-ghost">
              See where we work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
