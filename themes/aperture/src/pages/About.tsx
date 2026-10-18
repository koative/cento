import { Link } from "../router";
import { about, images } from "../content";

export function About() {
  return (
    <div className="page-pad">
      <header className="wrap page-head">
        <h1>{about.title}</h1>
        <p className="lede">{about.intro}</p>
      </header>

      <figure className="wrap archive">
        <img
          src={images.archive.src}
          alt={images.archive.alt}
          width={images.archive.w}
          height={images.archive.h}
        />
        <figcaption>
          A picture palace of the same era. Our own 1938 photographs were lost
          in the 1961 fire.
        </figcaption>
      </figure>

      <section className="wrap story" aria-labelledby="story-h">
        <h2 id="story-h">The building</h2>
        <div className="story-text">
          {about.story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <ol className="timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <strong className="tnum">{t.year}</strong>
              <span>{t.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="manifesto-band" aria-labelledby="princ-h">
        <div className="wrap">
          <h2 id="princ-h">House rules</h2>
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

      <section className="wrap team-section" aria-labelledby="team-h">
        <div className="team-head">
          <h2 id="team-h">Who runs it</h2>
          <p>
            Nineteen staff, around sixty volunteer ushers, and a board elected
            by the members every November.
          </p>
        </div>
        <ul className="team">
          {about.team.map((m) => (
            <li key={m.name}>
              <strong>{m.name}</strong>
              <span className="team-role">{m.role}</span>
              <p>{m.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap split closing" aria-labelledby="own-h">
        <img
          src={images.projector.src}
          alt={images.projector.alt}
          width={images.projector.w}
          height={images.projector.h}
          loading="lazy"
        />
        <div>
          <h2 id="own-h">Own a share of the cinema</h2>
          <p>
            Every member can buy community shares from £50 and vote at the
            annual meeting. The 2025 share offer paid for the 70mm restoration;
            the next one will replace the seats in Screen One.
          </p>
          <Link to="/membership" className="btn btn-ink">
            Become a member
          </Link>
        </div>
      </section>
    </div>
  );
}
