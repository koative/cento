import { Link } from "../router";
import { brand, materials, studio, team } from "../content";

export function Studio() {
  return (
    <>
      <header className="page-head">
        <h1>The studio</h1>
        <p className="lede">
          Five people, one long table and fourteen hundred samples on Cordage
          Lane, Portland.
        </p>
      </header>

      <section className="section studio-story">
        <ul className="library-wall" aria-label="Part of the library wall">
          {materials.map((m) => (
            <li key={m.id}>
              <Link to={`/materials/${m.id}`} aria-label={m.name}>
                <img src={m.image} alt="" loading="lazy" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="prose">
          <h2>Started at a borrowed table</h2>
          {studio.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>What we hold to</h2>
        <dl className="values">
          {studio.values.map((v) => (
            <div key={v.title}>
              <dt>{v.title}</dt>
              <dd>{v.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <h2>The people</h2>
        <ul className="team">
          {team.map((t) => {
            const fav = materials.find((m) => m.id === t.sample)!;
            return (
              <li key={t.name}>
                <h3>{t.name}</h3>
                <p className="team-role">{t.role}</p>
                <p>{t.bio}</p>
                <p className="team-fav">
                  <img src={fav.image} alt="" loading="lazy" />
                  <span>
                    Desert-island sample:{" "}
                    <Link to={`/materials/${fav.id}`}>{fav.name}</Link>
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section studio-join">
        <div>
          <h2>Working here</h2>
          <p>
            We hire one junior designer a year and take one summer intern. Send
            a short letter and three rooms you wish you had designed to{" "}
            <a href="mailto:jobs@mosaic.example">jobs@mosaic.example</a> by the
            end of January.
          </p>
        </div>
        <div>
          <h2>Find us</h2>
          <p>
            {brand.address.join(", ")}. Street parking on Cordage Lane; the
            library door is the green one beside the tile shop.
          </p>
          <Link to="/consultation" className="btn">
            Book a library visit
          </Link>
        </div>
      </section>
    </>
  );
}
