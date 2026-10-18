import { Link } from "../router";
import { beers, images, milestones, story, team, values } from "../content";
import { beerColor } from "../lib/util";
import { Glass } from "../components/Art";

export function About() {
  return (
    <>
      <header className="page-head wrap about-head">
        <h1>{story.title}</h1>
        <p className="lede">{story.intro}</p>
      </header>

      <figure className="wrap about-hero">
        <img
          src={images.kettles}
          alt="Copper brew kettles with tall vapour stacks under spotlights"
          width={1800}
          height={1210}
        />
        <figcaption>
          Copper kettles like ours: they hold heat evenly and give the wort a
          gentle caramel note.
        </figcaption>
      </figure>

      <section className="section" aria-label="Chapters">
        <div className="wrap chapters">
          {story.chapters.map((c) => (
            <article key={c.title} className="chapter">
              <figure>
                <img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  width={1600}
                  height={1200}
                />
              </figure>
              <div>
                <h2>{c.title}</h2>
                <p>{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-board" aria-labelledby="years-title">
        <div className="wrap">
          <h2 id="years-title">Ten years on Tannery Row</h2>
          <ol className="timeline">
            {milestones.map((m) => (
              <li key={m.year}>
                <span className="timeline-year tnum">{m.year}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="team-title">Who's behind the bar</h2>
            <p>Eleven of us in all. These four you'll meet most often.</p>
          </div>
          <ul className="team">
            {team.map((p) => {
              const beer = beers.find((b) => b.slug === p.drinks)!;
              return (
                <li key={p.name} className="person">
                  <Glass
                    shape={beer.glass}
                    color={beerColor(beer)}
                    id={`team-${beer.slug}`}
                    className="glass glass-mini"
                  />
                  <div>
                    <h3>{p.name}</h3>
                    <p className="person-role">{p.role}</p>
                    <p>{p.bio}</p>
                    <p className="person-drinks">
                      Usually drinking{" "}
                      <Link to={`/beers/${beer.slug}`}>{beer.name}</Link>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="section section-seasonal"
        aria-labelledby="values-title"
      >
        <div className="wrap values">
          <h2 id="values-title">How we brew</h2>
          <ul>
            {values.map((v) => (
              <li key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
          <div className="actions">
            <Link to="/tours" className="btn btn-copper">
              See it on a tour
            </Link>
            <Link to="/beers" className="btn btn-line">
              Meet the beers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
