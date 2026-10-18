import { Link } from "../router";
import { about, brand, testimonials } from "../content";

export function About() {
  return (
    <div className="page about-page">
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <figure className="wrap wide-photo">
        <img
          src={about.team.src}
          alt={about.team.alt}
          width={about.team.w}
          height={about.team.h}
        />
      </figure>

      <section className="wrap story" aria-labelledby="story-h">
        <h2 id="story-h">Why a formula card</h2>
        <div className="story-text">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap values" aria-labelledby="values-h">
        <h2 id="values-h">How the salon runs</h2>
        <dl>
          {about.values.map((v) => (
            <div key={v.title}>
              <dt>{v.title}</dt>
              <dd>{v.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="split wrap" aria-labelledby="clients-h">
        <img
          src={about.floor.src}
          alt={about.floor.alt}
          width={about.floor.w}
          height={about.floor.h}
          loading="lazy"
        />
        <div>
          <h2 id="clients-h">In clients' words</h2>
          <ul className="quotes">
            {testimonials.map((t) => (
              <li key={t.by}>
                <blockquote>
                  <p>{t.text}</p>
                </blockquote>
                <p className="by">{t.by}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-wine" aria-labelledby="careers-h">
        <div className="wrap careers">
          <h2 id="careers-h">{about.careers.title}</h2>
          <p>{about.careers.body}</p>
          <div className="actions">
            <a
              className="btn btn-light"
              href={`mailto:${brand.email}?subject=Joining%20Chroma`}
            >
              Email {brand.email}
            </a>
            <Link to="/stylists" className="btn btn-outline-light">
              Meet the team first
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
