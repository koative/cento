import { ArrowRight } from "lucide-react";
import { home, members, photos, principles, timeline } from "../content";
import { Link } from "../router";
import { Photo } from "../components/Cards";

export function About() {
  return (
    <>
      <header className="page-head wrap about-head">
        <h1 className="display-xl">Four people, one low ceiling</h1>
        <p className="lede">{home.bandText}</p>
      </header>

      <div className="wrap">
        <Photo photo={photos.rehearsal} eager className="about-photo" />
        <p className="caption">
          The basement on Eastern Avenue. Seven feet, two inches. The flag came
          with the room.
        </p>
      </div>

      <section className="section wrap" aria-labelledby="who">
        <h2 id="who" className="display-md">
          The band
        </h2>
        <ul className="members">
          {members.map((m) => (
            <li key={m.name}>
              <Photo photo={m.photo} />
              <h3>{m.name}</h3>
              <p className="member-role">
                {m.role} · since {m.since}
              </p>
              <p>{m.bio}</p>
              <p className="member-gear">
                <span>Plays</span> {m.gear}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section band-ink" aria-labelledby="years">
        <div className="wrap">
          <h2 id="years" className="display-md">
            Ten years in one room
          </h2>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.year}>
                <span className="timeline-year">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap principles" aria-labelledby="rules">
        <h2 id="rules" className="display-md">
          House rules
        </h2>
        <dl>
          {principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
        <Link to="/tour" className="more-link">
          Come to a show <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
