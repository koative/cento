import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, countries, images, wines } from "../content";

const producers = [...new Map(wines.map((w) => [w.producer, w])).values()];

export function About() {
  return (
    <div className="page">
      <header className="page-head">
        <h1>A shop that opens the bottle</h1>
        <p className="lead">{about.lede}</p>
      </header>

      <div className="story">
        <figure>
          <img
            src={images.grower}
            alt="A grower holding up two bunches of green grapes in his vineyard"
            width={1400}
            height={898}
          />
        </figure>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <section className="section rules">
        <h2>How we buy</h2>
        <ul className="rule-list">
          {about.rules.map((r) => (
            <li key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Who you will meet</h2>
        <ul className="team">
          {about.team.map((m) => (
            <li key={m.name}>
              <span className="initials" aria-hidden="true">
                {m.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <p>{m.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section growers-index">
        <div>
          <h2>The growers on our shelf</h2>
          <p>
            {producers.length} farms in {countries.length} countries, and a
            phone number for every one of them.
          </p>
          <img
            src={images.vineyard}
            alt="Rows of vines running toward bare brown hills"
            width={1600}
            height={1066}
            loading="lazy"
          />
        </div>
        <ul className="producer-list">
          {producers.map((w) => (
            <li key={w.producer}>
              <Link to={"/wines/" + w.id}>
                <span>{w.producer}</span>
                <small>
                  {w.region}, {w.country} · {w.farming}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="close">
        <div>
          <h2>Pull up a stool</h2>
          <p className="lead">
            The best way to meet us is across the counter, with something open.
          </p>
          <div className="actions">
            <Link to="/visit" className="btn">
              Plan a visit <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/tastings" className="btn btn-ghost">
              Come to a tasting
            </Link>
          </div>
        </div>
        <img
          src={images.cellar}
          alt="Rows of oak barrels in a low, lamp-lit cellar"
          width={1400}
          height={932}
          loading="lazy"
        />
      </section>
    </div>
  );
}
