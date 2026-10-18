import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, dentists } from "../content";

export function About() {
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>About Enamel</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section className="wrap story" aria-labelledby="story-h">
        <h2 id="story-h">One chair, one rule</h2>
        <div className="story-body">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="band band-gum" aria-labelledby="pr-h">
        <div className="wrap">
          <h2 id="pr-h">How we work</h2>
          <dl className="principles">
            {about.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap rooms" aria-labelledby="rooms-h">
        <h2 id="rooms-h">The rooms</h2>
        <div className="rooms-grid">
          {about.rooms.map((r) => (
            <figure key={r.caption}>
              <img
                src={r.image}
                alt={r.alt}
                width={960}
                height={640}
                loading="lazy"
              />
              <figcaption>{r.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="sterile">{about.sterilisation}</p>
      </section>

      <section className="wrap callout" aria-labelledby="people-h">
        <h2 id="people-h">The people</h2>
        <p>
          {dentists
            .map((d) => d.name)
            .slice(0, -1)
            .join(", ")}{" "}
          and {dentists[dentists.length - 1].name}, with four dental nurses and
          a front desk that answers from 7:45.
        </p>
        <Link to="/dentists" className="link-arrow">
          Meet the dentists <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
