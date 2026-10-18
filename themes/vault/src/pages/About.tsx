import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, premiumSplit } from "../content";

export function About() {
  return (
    <>
      <section className="wrap about-hero">
        <h1>{about.title}</h1>
        <p className="lede">{about.text}</p>
        <img
          src={about.image}
          alt={about.imageAlt}
          width={1500}
          height={1000}
        />
      </section>

      <section className="wrap about-story" aria-labelledby="story-h">
        <h2 id="story-h">Forty tenants and a twelve-page policy</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="band" aria-labelledby="years-h">
        <div className="wrap">
          <h2 id="years-h">Since 2009</h2>
          <ol className="years">
            {about.milestones.map((m) => (
              <li key={m.year}>
                <span className="num">{m.year}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap principles" aria-labelledby="princ-h">
        <img
          src={about.secondImage}
          alt={about.secondAlt}
          width={1300}
          height={867}
          loading="lazy"
        />
        <div>
          <h2 id="princ-h">Three rules we don't bend</h2>
          <dl className="promise-list promise-list-single">
            {about.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap people" aria-labelledby="people-h">
        <h2 id="people-h">Who answers for it</h2>
        <ul className="people-list">
          {about.people.map((p) => (
            <li key={p.name}>
              <span className="monogram" aria-hidden="true">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <h3>{p.name}</h3>
              <p className="role">{p.role}</p>
              <p>{p.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band band-ink" aria-labelledby="money-h">
        <div className="wrap split split-ink">
          <div>
            <h2 id="money-h">Where the money goes</h2>
            <p>
              Of every $100 members paid last year. Audited figures are
              published each April in the members' report (sample data).
            </p>
          </div>
          <ul className="split-bars">
            {premiumSplit.map((p) => (
              <li key={p.label}>
                <span className="split-label">{p.label}</span>
                <span className="split-track" aria-hidden="true">
                  <span
                    style={{
                      width: `${(p.value / premiumSplit[0].value) * 100}%`,
                    }}
                  />
                </span>
                <span className="num">${p.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="wrap close close-tight"
        aria-labelledby="about-close-h"
      >
        <h2 id="about-close-h">Become a member by buying a policy.</h2>
        <p>
          Every policyholder gets one vote at the annual meeting, whatever they
          pay.
        </p>
        <Link to="/quote" className="btn btn-primary">
          Get a quote <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </>
  );
}
