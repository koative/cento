import { Link } from "../router";
import { brand, img, studio, team } from "../content";
import { filmBySlug } from "../lib/format";

export function Studio() {
  return (
    <>
      <header className="wrap page-head">
        <h1 className="h-display">{studio.title}</h1>
        <p className="lede">{studio.intro}</p>
      </header>

      <section className="wrap story" aria-label="Our story">
        <figure>
          <img
            src={img.deepCrew.src}
            alt={img.deepCrew.alt}
            width={img.deepCrew.w}
            height={img.deepCrew.h}
          />
          <figcaption>On location for Deep Time, 2023.</figcaption>
        </figure>
        <div className="story-copy">
          {studio.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="wrap section">
          <h2 className="h-section">How we work</h2>
          <dl className="principles">
            {studio.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="h-section">{studio.teamHeading}</h2>
        <ul className="team">
          {team.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p className="team-role">{p.role}</p>
              <p>{p.bio}</p>
              <p className="team-films">
                {p.films.map((slug, i) => {
                  const f = filmBySlug(slug);
                  return (
                    f && (
                      <span key={slug}>
                        {i > 0 && ", "}
                        <Link to={`/films/${slug}`}>{f.title}</Link>
                      </span>
                    )
                  );
                })}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section rooms">
        <img
          src={img.edit1985.src}
          alt={img.edit1985.alt}
          width={img.edit1985.w}
          height={img.edit1985.h}
          loading="lazy"
        />
        <div>
          <h2 className="h-section">{studio.roomsHeading}</h2>
          <p>{studio.rooms}</p>
          <p>
            {brand.address.join(", ")}
            <br />
            {brand.hours}
          </p>
          <div className="actions">
            <Link to="/services" className="btn btn-ghost">
              Rooms and rates
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Visit the studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
