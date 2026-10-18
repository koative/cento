import { Link } from "../router";
import { about, brand, images } from "../content";

export function About() {
  return (
    <div className="page">
      <header className="page-head">
        <h1 className="display">{about.title}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <div className="about-story">
        <img
          src={images.skylight}
          alt="A curving concrete passage under a long skylight"
          width={1350}
          height={1800}
        />
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <section className="section" aria-labelledby="principles-title">
        <h2 id="principles-title">How we work</h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <figure className="bleed bleed-plain">
        <img
          src={images.atrium}
          alt="Looking down into a busy gallery atrium on an opening night"
          loading="lazy"
          width={1600}
          height={1067}
        />
        <figcaption>
          Opening night of Measured Light, March 2026: 1,400 visitors in four
          hours.
        </figcaption>
      </figure>

      <section className="section" aria-labelledby="team-title">
        <div className="section-head">
          <h2 id="team-title">The team</h2>
          <p className="section-note">
            Six people run the gallery, the shop and the press. Write to any of
            us directly.
          </p>
        </div>
        <ul className="team">
          {about.team.map((m) => (
            <li key={m.name}>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
              <a href={"mailto:" + m.email}>{m.email}</a>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="section about-close"
        aria-labelledby="about-close-title"
      >
        <h2 id="about-close-title">Come and see for yourself</h2>
        <p>
          {brand.street}, {brand.city}. Tuesday to Sunday, always free.
        </p>
        <div className="actions">
          <Link to="/visit" className="btn">
            Plan your visit
          </Link>
          <Link to="/artists" className="btn btn-ghost">
            Meet the artists
          </Link>
        </div>
      </section>
    </div>
  );
}
