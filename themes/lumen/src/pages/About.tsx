import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, images } from "../content";

export function About() {
  return (
    <div className="page about">
      <header className="about-hero">
        <div>
          <h1>{about.title}</h1>
          <p className="lede">{about.intro}</p>
        </div>
        <img
          src={images.wood}
          alt="A pair of browline glasses standing on a weathered wooden table at sunset"
          width={933}
          height={1400}
        />
      </header>

      <section className="about-story">
        <h2>From a spreadsheet to four stores</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section principles">
        <h2>What we hold to</h2>
        <ul className="rows">
          {about.principles.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section timeline-section">
        <h2>Five years, briefly</h2>
        <ol className="timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="year">{t.year}</span>
              <span>{t.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section team">
        <h2>The people behind the frames</h2>
        <ul className="team-list">
          {about.team.map((m) => (
            <li key={m.name}>
              <h3>{m.name}</h3>
              <p className="role">{m.role}</p>
              <p>{m.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-close">
        <img
          src={images.examRoom}
          alt="An exam room with a phoropter on an arm in front of the patient chair"
          loading="lazy"
          width={1123}
          height={1400}
        />
        <div>
          <h2>Come and see for yourself</h2>
          <p>
            Every store has an optometrist on a salary and a wall of frames you
            can try without anyone hovering. Adjustments are free, whoever made
            your glasses.
          </p>
          <div className="actions">
            <Link to="/stores" className="btn">
              Find a store <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/frames" className="btn btn-quiet">
              Shop frames
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
