import { Link } from "../router";
import { about, brand } from "../content";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lead">{about.lead}</p>
      </header>

      <figure className="wrap about-figure">
        <img
          src={about.image}
          alt={about.imageAlt}
          width={1600}
          height={1067}
        />
      </figure>

      <section className="wrap about-story" aria-labelledby="h-story">
        <h2 id="h-story">How a drill press became a job</h2>
        <div>
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-timeline">
        <div className="section-head">
          <h2 id="h-timeline">The timeline so far</h2>
        </div>
        <ol className="timeline-years">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap" aria-labelledby="h-crew">
        <div className="section-head">
          <h2 id="h-crew">Who's in the shop</h2>
        </div>
        <ul className="crew">
          {about.crew.map((c) => (
            <li key={c.name}>
              <h3>{c.name}</h3>
              <p className="crew-role">{c.role}</p>
              <p>{c.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="gear-band" aria-labelledby="h-gear">
        <img
          src={about.shopImage}
          alt={about.shopImageAlt}
          width={1600}
          height={1153}
          loading="lazy"
        />
        <div className="wrap gear-inner">
          <h2 id="h-gear">What's on the floor</h2>
          <div className="gear-cols">
            {about.gear.map((g) => (
              <div key={g.group}>
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap partner-strip" aria-labelledby="h-visit">
        <h2 id="h-visit">The shop isn't open to visitors, but the inbox is.</h2>
        <p>
          Got a machine that deserves saving? Write to{" "}
          <a href={"mailto:" + brand.email}>{brand.email}</a> with a photo and
          where it is. Brands, please use the{" "}
          <Link to="/partners">brand deals page</Link>.
        </p>
      </section>
    </>
  );
}
