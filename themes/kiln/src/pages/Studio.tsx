import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, studio } from "../content";

export function Studio() {
  return (
    <div className="page studio">
      <header className="page-head">
        <h1>{studio.title}</h1>
        <p className="lead">{studio.intro}</p>
      </header>
      <img
        className="studio-wide"
        src={studio.photos.wide}
        alt="A potter throwing a tall vase in the studio, shelves of bisqueware behind her"
        width={1800}
        height={1013}
      />

      <section className="studio-story" aria-labelledby="story-title">
        <h2 id="story-title">Why we work in runs</h2>
        <div className="prose">
          {studio.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section process" aria-labelledby="process-title">
        <h2 id="process-title">Four weeks from clay to table</h2>
        <ol className="process-list">
          {studio.process.map((s) => (
            <li key={s.step}>
              <span className="process-when">{s.when}</span>
              <h3>{s.step}</h3>
              <p>{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band kiln-band" aria-labelledby="kiln-title">
        <img
          src={studio.photos.hands}
          alt="Clay-covered hands raising a small pot on a spinning wheel"
          width={1800}
          height={1078}
          loading="lazy"
        />
        <div>
          <h2 id="kiln-title">{studio.kiln.title}</h2>
          <p>{studio.kiln.text}</p>
          <Link to="/glazes" className="btn btn-light">
            See our glazes <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <h2 id="team-title">Who makes your pots</h2>
        <ul className="team">
          {studio.team.map((t) => (
            <li key={t.name}>
              <h3>{t.name}</h3>
              <p className="team-role">{t.role}</p>
              <p>{t.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section visit" aria-labelledby="visit-title">
        <div>
          <h2 id="visit-title">Visit, wholesale and commissions</h2>
          <p>{studio.wholesale}</p>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          </p>
        </div>
        <div>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <dl className="hours">
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
