import { Link } from "../router";
import { about } from "../content";

export default function About() {
  return (
    <div className="wrap page about">
      <header className="page-head about-head">
        <h1>{about.h1}</h1>
        <p className="lead">{about.lead}</p>
      </header>

      <section className="about-story" aria-label="Story">
        {about.story.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="principles" aria-labelledby="principles-h">
        <h2 id="principles-h">{about.principles.heading}</h2>
        <dl>
          {about.principles.items.map((p) => (
            <div key={p.term}>
              <dt>{p.term}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="team" aria-labelledby="team-h">
        <h2 id="team-h">{about.team.heading}</h2>
        <ul>
          {about.team.people.map((m) => (
            <li key={m.name}>
              <span className="monogram" aria-hidden>
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span className="team-name">{m.name}</span>
              <span className="team-role">{m.role}</span>
              <span className="team-focus">{m.focus}</span>
              <span className="team-place">{m.place}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="governance" aria-labelledby="gov-h">
        <h2 id="gov-h">{about.governance.heading}</h2>
        <dl className="facts">
          {about.governance.rows.map((r) => (
            <div key={r.term}>
              <dt>{r.term}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
        <p>
          Want to help? Start with the <Link to="/changelog">changelog</Link> to
          see what's moving, read the{" "}
          <Link to="/guides/local-dev">local development guide</Link>, then say
          hello through <Link to="/support">support</Link>.
        </p>
      </section>
    </div>
  );
}
