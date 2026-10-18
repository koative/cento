import { ArrowRight, X } from "lucide-react";
import { Link } from "../router";
import { about, photos } from "../content";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

export function About() {
  return (
    <>
      <section className="page-head wrap about-head">
        <h1>{about.title}</h1>
        <p className="lede">{about.intro}</p>
      </section>

      <figure className="wrap about-photo">
        <img
          src={photos.night.src}
          alt={photos.night.alt}
          width={photos.night.w}
          height={photos.night.h}
        />
      </figure>

      <section className="section wrap about-story" aria-label="Our story">
        {about.story.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="section band-ink" aria-labelledby="care-title">
        <div className="wrap">
          <h2 id="care-title">{about.care.title}</h2>
          <ol className="wayfinding">
            {about.care.steps.map((s, i) => (
              <li key={s.title}>
                <span className="way-no" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {i < about.care.steps.length - 1 && (
                  <ArrowRight className="way-arrow" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap about-wont" aria-labelledby="wont-title">
        <h2 id="wont-title">{about.principles.title}</h2>
        <ul className="wont">
          {about.principles.items.map((p) => (
            <li key={p}>
              <X aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="section band-concrete" aria-labelledby="team-title">
        <div className="wrap">
          <h2 id="team-title">Who runs the counters</h2>
          <ul className="team">
            {about.team.map((t) => (
              <li key={t.name}>
                <span className="badge" aria-hidden="true">
                  {initials(t.name)}
                </span>
                <span>
                  <strong>{t.name}</strong>
                  {t.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap about-close">
        <img
          src={photos.headland.src}
          alt={photos.headland.alt}
          width={photos.headland.w}
          height={photos.headland.h}
          loading="lazy"
        />
        <div>
          <h2>Come and say hello at the counter</h2>
          <p>
            Ines is on the airport desk most Fridays. Everyone else is at their
            station, keys in hand.
          </p>
          <Link to="/locations" className="btn btn-sign">
            Find a station <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
