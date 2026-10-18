import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, images } from "../content";

export function About() {
  return (
    <div className="page about">
      <header className="wrap about-head">
        <div>
          <h1>{about.title}</h1>
          <p className="lede">{about.lede}</p>
          <ul className="creds">
            {about.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <img
          src={images.desk.src}
          alt={images.desk.alt}
          width={images.desk.w}
          height={images.desk.h}
        />
      </header>

      <section className="wrap about-story" aria-labelledby="story-h">
        <h2 id="story-h" className="sr-only">
          Margo's story
        </h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ol className="timeline" aria-label="Timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="num">{t.year}</span>
              {t.text}
            </li>
          ))}
        </ol>
      </section>

      <section className="principles-band" aria-labelledby="pr-h">
        <div className="wrap">
          <h2 id="pr-h">How I coach</h2>
          <dl className="principles">
            {about.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap about-photo" aria-label="Margo at work">
        <img
          src={images.call.src}
          alt={images.call.alt}
          width={images.call.w}
          height={images.call.h}
          loading="lazy"
        />
        <p className="about-photo-note">
          Most of the work happens like this: a laptop, a notebook, and someone
          saying the hard sentence out loud for the first time.
        </p>
      </section>

      <section className="wrap team" aria-labelledby="team-h">
        <h2 id="team-h">The small team behind Mentor</h2>
        <ul className="team-list">
          {about.team.map((m) => (
            <li key={m.name}>
              <span className="team-initials" aria-hidden="true">
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <p>{m.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap unsure" aria-labelledby="ab-close-h">
        <h2 id="ab-close-h">Want to work together?</h2>
        <p>
          Start with the free resources, or tell me where you're stuck in a
          short application.
        </p>
        <div className="hero-actions">
          <Link to="/apply" className="btn btn-ink">
            Apply for coaching <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/resources" className="btn btn-line">
            Browse free resources
          </Link>
        </div>
      </section>
    </div>
  );
}
