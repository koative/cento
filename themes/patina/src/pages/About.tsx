import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, restoration } from "../content";

export function About() {
  return (
    <div className="page about">
      <header className="page-head">
        <h1>{about.title}</h1>
        <p className="lead">{about.intro}</p>
      </header>

      <figure className="wide-figure">
        <img
          src={about.image.src}
          alt={about.image.alt}
          width={about.image.w}
          height={about.image.h}
        />
      </figure>

      <section className="section about-story" aria-labelledby="story-h">
        <h2 id="story-h">How it started</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section principles" aria-labelledby="principles-h">
        <h2 id="principles-h">House rules</h2>
        <dl>
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section archive" aria-labelledby="team-h">
        <figure>
          <img
            src={restoration.archive.src}
            alt={restoration.archive.alt}
            width={restoration.archive.w}
            height={restoration.archive.h}
            loading="lazy"
          />
          <figcaption>{restoration.archiveCaption}</figcaption>
        </figure>
        <div>
          <h2 id="team-h">Four people, two floors</h2>
          <ul className="team">
            {about.team.map((t) => (
              <li key={t.name}>
                <h3>{t.name}</h3>
                <p className="team-role">{t.role}</p>
                <p>{t.text}</p>
              </li>
            ))}
          </ul>
          <div className="actions">
            <Link to="/visit" className="btn">
              Come and visit <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/restoration" className="btn btn-ghost">
              The workshop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
