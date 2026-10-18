import { Link } from "../router";
import { about, brand } from "../content";

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function About() {
  return (
    <>
      <section className="page-head wrap about-head">
        <div>
          <h1>{about.title}</h1>
          <p className="lede">{about.lede}</p>
          {about.story.map((p) => (
            <p key={p.slice(0, 24)} className="measure">
              {p}
            </p>
          ))}
        </div>
        <figure className="about-figure">
          <img
            src={about.image}
            alt={about.imageAlt}
            width={908}
            height={1200}
          />
          <figcaption>{about.imageCaption}</figcaption>
        </figure>
      </section>

      <section className="band-green" aria-labelledby="charter-h">
        <div className="wrap charter">
          <h2 id="charter-h">{about.charter.title}</h2>
          <ol>
            {about.charter.articles.map((a, i) => (
              <li key={a.title}>
                <span className="article-no" aria-hidden="true">
                  {roman[i]}
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="team-h">
        <div className="section-head">
          <div>
            <h2 id="team-h">{about.team.title}</h2>
            <p className="section-text">{about.team.text}</p>
          </div>
        </div>
        <ul className="team">
          {about.team.people.map((p) => (
            <li key={p.name}>
              <img
                src={p.photo}
                alt={`Portrait of ${p.name}`}
                width={640}
                height={800}
                loading="lazy"
              />
              <h3>{p.name}</h3>
              <p className="team-role">{p.role}</p>
              <p className="muted">{p.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section band-paper" aria-labelledby="evenings-h">
        <div className="wrap members">
          <img
            src={about.community.image}
            alt={about.community.imageAlt}
            width={1600}
            height={1067}
            loading="lazy"
          />
          <div>
            <h2 id="evenings-h">{about.community.title}</h2>
            <p>{about.community.text}</p>
            <Link to="/signup" className="btn btn-ink">
              Join the guild
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="offices-h">
        <h2 id="offices-h">Find the desk</h2>
        <div className="offices">
          {about.offices.map((o) => (
            <div key={o.city}>
              <h3>{o.city}</h3>
              <p>{o.address}</p>
              <p className="muted">{o.hours}</p>
            </div>
          ))}
          <div>
            <h3>Write or call</h3>
            <p>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <br />
              <a href={brand.phoneHref}>{brand.phone}</a>
            </p>
            <p className="muted">Replies within one working day.</p>
          </div>
        </div>
      </section>
    </>
  );
}
