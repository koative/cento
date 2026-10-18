import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, images } from "../content";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Good morning is the first rule</h1>
        <p className="lede">{about.intro}</p>
      </header>

      <section className="wrap section about-story">
        <img
          src={images.millYard.src}
          alt={images.millYard.alt}
          width={images.millYard.w}
          height={images.millYard.h}
        />
        <div className="prose">
          <h2>Independent, on purpose</h2>
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="time-title">
        <h2 id="time-title">How we got here</h2>
        <ol className="timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <time>{t.year}</time>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="zones band" aria-labelledby="team-title">
        <div className="wrap">
          <h2 id="team-title">The front desks</h2>
          <ul className="team">
            {about.team.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p className="team-role">{p.role}</p>
                <p>{p.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section rules" aria-labelledby="rules-title">
        <div className="sign rules-sign">
          <h2 id="rules-title">House rules</h2>
          <p>
            Posted by the kitchen in every house, and enforced mostly by raised
            eyebrows.
          </p>
        </div>
        <dl className="rule-list">
          {about.rules.map((r) => (
            <div key={r.title}>
              <dt>{r.title}</dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="close wrap" aria-labelledby="close-title">
        <img
          src={images.talk.src}
          alt={images.talk.alt}
          width={images.talk.w}
          height={images.talk.h}
          loading="lazy"
        />
        <div>
          <h2 id="close-title">See it for yourself</h2>
          <p>
            The best way to know if Commons suits you is a day at a desk. The
            first one is free.
          </p>
          <Link to="/tour" className="btn btn-accent">
            Book a tour <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
