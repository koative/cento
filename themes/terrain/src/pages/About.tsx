import { Link } from "../router";
import { about, brand, guides, images, trips } from "../content";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <div className="wrap about-photo">
        <img
          src={images.rest}
          alt="A walker's boots crossed on a rock above a misty forested valley"
          width={1600}
          height={1066}
        />
      </div>

      <section
        className="wrap section about-story"
        aria-labelledby="story-title"
      >
        <h2 id="story-title">Ten seasons, still small</h2>
        <div>
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            {trips.length} routes • {guides.length} lead guides • groups of up
            to 12 • one office in Innsbruck.
          </p>
        </div>
      </section>

      <section className="section dark" aria-labelledby="safety-title">
        <div className="wrap">
          <h2 id="safety-title">{about.safetyTitle}</h2>
          <dl className="safety">
            {about.safety.map((s) => (
              <div key={s.title}>
                <dt>{s.title}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="team-title">
        <div className="section-head">
          <h2 id="team-title">The planning desk</h2>
          <p>
            Four people in Innsbruck, all of whom walk. Write to{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a> or call{" "}
            <a href={brand.phoneHref}>{brand.phone}</a>.
          </p>
        </div>
        <ul className="team">
          {about.team.map((m) => (
            <li key={m.name}>
              <h3>{m.name}</h3>
              <p className="muted">{m.role}</p>
              <p>{m.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section quiet" aria-labelledby="about-next">
        <div className="wrap quiet-inner">
          <h2 id="about-next">The guides are the company</h2>
          <p className="lede">
            Meet the eight people who plan and lead every Terrain route, in the
            valleys they call home.
          </p>
          <div className="actions">
            <Link to="/guides" className="btn btn-primary">
              Meet the guides
            </Link>
            <Link to="/trips" className="btn btn-ghost">
              See the trips
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
