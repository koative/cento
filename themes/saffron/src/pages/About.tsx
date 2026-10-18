import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, growers, home, team } from "../content";

export function About() {
  return (
    <div className="page about-page">
      <header className="about-head">
        <div>
          <h1>{about.title}</h1>
          <p className="lede">{about.intro}</p>
        </div>
        <img {...about.photo} />
      </header>

      <section className="section timeline" aria-labelledby="timeline-title">
        <h2 id="timeline-title">Ten years on one corner</h2>
        <ol>
          {about.chapters.map((c) => (
            <li key={c.year}>
              <span className="year">{c.year}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="story-band">
        <img {...home.story.photo} loading="lazy" />
        <div>
          <h2>{home.story.title}</h2>
          <p>{home.story.text}</p>
        </div>
      </section>

      <section className="section standards" aria-labelledby="standards-title">
        <h2 id="standards-title">{about.standards.title}</h2>
        <dl>
          {about.standards.items.map((s) => (
            <div key={s.title}>
              <dt>{s.title}</dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section team" aria-labelledby="team-title">
        <h2 id="team-title">Who you will meet</h2>
        <ul>
          {team.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p className="role">{p.role}</p>
              <p>{p.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section suppliers" aria-labelledby="suppliers-title">
        <h2 id="suppliers-title">The people we buy from</h2>
        <ul className="supplier-list">
          {growers.map((g) => (
            <li key={g.name}>
              <strong>{g.name}</strong>
              <span>{g.grows}</span>
              <span className="num">{g.miles}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="visit">
        <img {...about.bike} loading="lazy" />
        <div>
          <h2>Come in person</h2>
          <address>{brand.address}</address>
          <dl className="hours">
            {brand.shopHours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
            <div>
              <dt>Delivery round</dt>
              <dd>{brand.deliveryHours}</dd>
            </div>
          </dl>
          <p>
            Questions about an order?{" "}
            <a href={brand.phoneHref}>{brand.phone}</a> or{" "}
            <a href={"mailto:" + brand.email}>{brand.email}</a>.
          </p>
          <Link to="/delivery" className="btn">
            Or let us come to you <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
