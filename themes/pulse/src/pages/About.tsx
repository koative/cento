import { Link } from "../router";
import { about, brand, images } from "../content";

export function About() {
  return (
    <>
      <header className="page-head page-head-photo">
        <img
          src={images.confetti}
          alt="Confetti falling over a crowd in front of a stage lit blue"
          width="1400"
          height="934"
        />
        <div className="wrap">
          <h1>Six people and a pump room</h1>
          <p>{about.intro}</p>
        </div>
      </header>

      <section
        className="wrap section split"
        aria-labelledby="principles-title"
      >
        <h2 id="principles-title">How we run it</h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="section editions-band"
        aria-labelledby="editions-title"
      >
        <div className="wrap">
          <h2 id="editions-title">Seven volumes</h2>
          <ol className="editions">
            {about.editions.map((e) => (
              <li key={e.year}>
                <span className="num">{e.year}</span>
                <strong>{e.title}</strong>
                <p>{e.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="team-title">
        <div className="section-head">
          <h2 id="team-title">The crew</h2>
          <p>
            Six year-round staff, 140 crew in July and around 400 volunteers who
            get in free for a shift a day.
          </p>
        </div>
        <ul className="team">
          {about.team.map((t) => (
            <li key={t.name}>
              <span className="team-initials" aria-hidden="true">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <h3>{t.name}</h3>
              <p className="team-role">{t.role}</p>
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="close" aria-labelledby="about-cta">
        <div className="wrap close-inner">
          <h2 id="about-cta">Volunteer, play, or just come dancing</h2>
          <div>
            <p>
              Volunteers and artists:{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>. Press:{" "}
              <a href={`mailto:${brand.press}`}>{brand.press}</a>.
            </p>
            <Link to="/tickets" className="btn btn-ink">
              Get tickets
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
