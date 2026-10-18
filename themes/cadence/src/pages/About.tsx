import { about } from "../content";
import { Avatar } from "../components/Visuals";

export default function About() {
  return (
    <>
      <section className="page-hero wrap">
        <h1>{about.hero.title}</h1>
        <p className="lede">{about.hero.lede}</p>
      </section>

      <section className="wrap split about-story" aria-label="Our story">
        <img src={about.photo} alt={about.photoAlt} width={1400} height={933} />
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="h-principles">
        <div className="section-head">
          <h2 id="h-principles">{about.principlesTitle}</h2>
        </div>
        <dl className="ruled-list ruled-list-large">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band band-sunk" aria-labelledby="h-team">
        <div className="wrap section">
          <div className="section-head">
            <h2 id="h-team">{about.teamTitle}</h2>
          </div>
          <ul className="team">
            {about.team.map((m) => (
              <li key={m.name}>
                <Avatar name={m.name} size="lg" />
                <strong>{m.name}</strong>
                <span>{m.role}</span>
                <span className="muted">{m.place}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section quiet-block" aria-labelledby="h-careers">
        <h2 id="h-careers">{about.careers.title}</h2>
        <p>{about.careers.body}</p>
        <a className="text-link" href={`mailto:${about.careers.email}`}>
          {about.careers.email}
        </a>
      </section>
    </>
  );
}
