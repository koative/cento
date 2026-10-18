import { Link } from "../router";
import { about, brand, events, studioImage } from "../content";

export function About() {
  return (
    <div className="page">
      <header className="page-head about-head">
        <h1>{brand.photographer}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <figure className="about-figure">
        <img
          src={studioImage.src}
          alt={studioImage.alt}
          width={studioImage.w}
          height={studioImage.h}
        />
        <figcaption className="label">
          <span>
            The studio on Commercial Street, north light, late morning.
          </span>
        </figcaption>
      </figure>

      <section className="section about-bio" aria-labelledby="h-bio">
        <h2 id="h-bio">The studio</h2>
        <div className="prose">
          {about.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="h-principles">
        <h2 id="h-principles">Three things I hold to</h2>
        <dl className="fact-rows principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section cv" aria-labelledby="h-cv">
        <h2 id="h-cv">Selected record</h2>
        <div className="cv-cols">
          {about.cv.map((group) => (
            <div key={group.heading}>
              <h3>{group.heading}</h3>
              <ul className="cv-list">
                {group.items.map((it) => (
                  <li key={it.text}>
                    <span className="cv-year">{it.year}</span>
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section about-split" aria-labelledby="h-kit">
        <div>
          <h2 id="h-kit">What I carry</h2>
          <ul className="plain-list">
            {about.kit.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Coming up</h2>
          <ul className="event-list compact">
            {events.map((e) => (
              <li key={e.title}>
                <p className="event-date">{e.date}</p>
                <h3>
                  <Link to={e.to}>{e.title}</Link>
                </h3>
                <p>{e.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="close" aria-labelledby="h-close">
        <h2 id="h-close">Come and see the prints in person</h2>
        <p>{brand.visits} The darkroom is part of the tour if you ask.</p>
        <div className="actions">
          <Link to="/contact?type=prints" className="btn btn-solid">
            Book a studio visit
          </Link>
          <Link to="/commissions" className="text-link">
            Or commission a shoot
          </Link>
        </div>
      </section>
    </div>
  );
}
