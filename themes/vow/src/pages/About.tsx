import { Link } from "../router";
import { about, brand, images, process, team, values } from "../content";
import { Img } from "../components/Cards";

export function About() {
  return (
    <div className="page about-page">
      <header className="page-head split">
        <h1>{about.title}</h1>
        <p className="lede">{about.intro}</p>
      </header>

      <div className="about-story">
        <figure className="frame">
          <Img photo={images.table} lazy={false} />
          <figcaption>
            Our first wedding: one long table at Hollins Orchard, 2017.
          </figcaption>
        </figure>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <section className="values" aria-labelledby="val-title">
        <h2 id="val-title">Three things we will not change</h2>
        <dl className="menu-list">
          {values.map((v) => (
            <div key={v.title}>
              <dt>{v.title}</dt>
              <dd>{v.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="team" aria-labelledby="team-title">
        <h2 id="team-title">The people you will meet</h2>
        <ul className="team-list">
          {team.map((t) => (
            <li key={t.name}>
              <span className="monogram" aria-hidden="true">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <h3>{t.name}</h3>
              <p className="meta">{t.role}</p>
              <p>{t.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="process" aria-labelledby="pr-title">
        <h2 id="pr-title">How we work</h2>
        <ol className="process-list">
          {process.map((s) => (
            <li key={s.title}>
              <p className="when">{s.when}</p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="visit" aria-labelledby="visit-title">
        <div>
          <h2 id="visit-title">Visit the studio</h2>
          <p>
            Come and see the tablescape mock-ups, the fabric library and the
            wall of order-of-the-day documents. Coffee is from the bakery next
            door.
          </p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>{brand.hours}.</p>
          <Link to="/enquire" className="btn">
            Book a studio visit
          </Link>
        </div>
        <figure className="frame">
          <Img photo={images.boutonnieres} />
        </figure>
      </section>
    </div>
  );
}
