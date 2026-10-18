import { Link } from "../router";
import {
  brand,
  firmFacts,
  photos,
  principles,
  stories,
  story,
  team,
} from "../content";
import { Img } from "../components/Bits";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>A small firm, on purpose</h1>
        <p className="lede">
          Eighteen people above a print shop in Milwaukee, keeping the books for
          240 businesses that are a lot like ours.
        </p>
      </header>

      <section className="wrap section about-story" aria-labelledby="story-h">
        <div className="about-text">
          <h2 id="story-h">How {brand.name} started</h2>
          {story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <figure className="about-fig">
          <Img photo={photos.storefront} />
          <figcaption>
            Most of our clients have a door like this one, and an owner who
            would rather be behind the counter than in a spreadsheet.
          </figcaption>
        </figure>
      </section>

      <section className="wrap" aria-label="Firm at a glance">
        <dl className="facts">
          {firmFacts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band band-paper" aria-labelledby="pr-h">
        <div className="wrap section split is-flip">
          <div>
            <h2 id="pr-h">How we work</h2>
            <dl className="principles">
              {principles.map((p) => (
                <div key={p.title}>
                  <dt>{p.title}</dt>
                  <dd>{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Img photo={photos.reviewCall} className="split-img" />
        </div>
      </section>

      <section className="wrap section" aria-labelledby="team-h">
        <div className="section-head">
          <h2 id="team-h">The people on your books</h2>
          <p>
            Every client has a named bookkeeper and a named tax lead. These are
            the people who lead each desk.
          </p>
        </div>
        <ul className="team">
          {team.map((p) => (
            <li key={p.name}>
              <span className="monogram is-large" aria-hidden="true">
                {p.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <h3>{p.name}</h3>
              <p className="team-role">
                {p.role} · {p.credential}
              </p>
              <p>{p.bio}</p>
              <p className="team-focus">
                Focus: {p.focus} · with {brand.name} since {p.since}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band band-ink" aria-labelledby="cl-h">
        <div className="wrap section">
          <h2 id="cl-h" className="section-title">
            In our clients' words
          </h2>
          <ul className="quote-grid">
            {stories.map((s) => (
              <li key={s.id}>
                <blockquote>
                  <p>“{s.quote}”</p>
                </blockquote>
                <p className="story-who">
                  <strong>{s.owner}</strong>, {s.business}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section visit" aria-labelledby="v-h">
        <h2 id="v-h">Visit or call</h2>
        <div className="visit-grid">
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>
            {brand.hours}
            <br />
            Most meetings happen on video; the kettle is on if you'd rather come
            in.
          </p>
          <p>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={brand.emailHref}>{brand.email}</a>
          </p>
          <Link to="/book" className="btn btn-primary">
            Book a call
          </Link>
        </div>
      </section>
    </>
  );
}
