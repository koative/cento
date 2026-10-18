import { about } from "../content";
import { Link } from "../router";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <figure className="wrap about-figure">
        <img
          src={about.image.src}
          alt={about.image.alt}
          width={1229}
          height={825}
        />
        <figcaption>{about.imageCaption}</figcaption>
      </figure>

      <section className="section wrap about-history" aria-labelledby="hist-h">
        <h2 id="hist-h">A short history of a long wait</h2>
        <ol className="history">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="history-year num">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section band-linen" aria-labelledby="values-h">
        <div className="wrap values">
          <h2 id="values-h">How we run the house</h2>
          <dl className="defs defs-wide">
            {about.values.map((v) => (
              <div key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section wrap team" aria-labelledby="team-h">
        <div>
          <h2 id="team-h">The people you will meet</h2>
          <ul className="team-list">
            {about.team.map((p) => (
              <li key={p.name}>
                <span className="team-name">{p.name}</span>
                <span className="team-role">{p.role}</span>
                <span className="team-text">{p.text}</span>
              </li>
            ))}
          </ul>
          <p>
            Read what they write in the <Link to="/journal">journal</Link>, or
            come and meet them: <Link to="/book">check availability</Link>.
          </p>
        </div>
        <img
          src={about.photo.src}
          alt={about.photo.alt}
          width={1800}
          height={1200}
          loading="lazy"
        />
      </section>
    </>
  );
}
