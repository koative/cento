import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, destinations, planners } from "../content";
import fjordBoat from "../assets/fjord-boat.jpg";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.title}</h1>
      </header>

      <section className="wrap about-story">
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <figure>
          <img
            src={fjordBoat}
            alt="A small boat beneath dark cliffs on a Norwegian fjord under heavy cloud"
          />
          <figcaption>
            Nærøyfjord in June, on Tomasz's last research trip.
          </figcaption>
        </figure>
      </section>

      <section className="wrap section promises">
        <h2>Three habits we keep</h2>
        <dl>
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>The planners</h2>
          <p>
            Each of us looks after two regions and spends six to eight weeks a
            year in them.
          </p>
        </div>
        <ul className="planners">
          {planners.map((p) => {
            const theirs = destinations.filter((d) => d.planner === p.name);
            return (
              <li key={p.name}>
                <span className="stamp" aria-hidden="true">
                  {p.initials}
                </span>
                <div>
                  <h3>{p.name}</h3>
                  <p className="planner-role">
                    {p.role} · with Odyssey since{" "}
                    <span className="num">{p.since}</span>
                  </p>
                  <p>{p.bio}</p>
                  <p className="planner-regions">
                    Plans{" "}
                    {theirs.map((d, i) => (
                      <span key={d.slug}>
                        {i > 0 && " and "}
                        <Link to={`/destinations/${d.slug}`}>{d.name}</Link>
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wrap section office">
        <div>
          <h2>Come and see us</h2>
          <p>
            Our office is on the Portland waterfront, up a flight of stairs
            above a ship chandler. Visits are by appointment so the right
            planner is in; coffee is always on.
          </p>
          <Link to="/enquire" className="btn btn-accent">
            Book a visit or a call <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <address>
          {brand.address.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </address>
        <dl className="hours">
          {brand.hours.map(([d, h]) => (
            <div key={d}>
              <dt>{d}</dt>
              <dd>{h}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
