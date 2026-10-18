import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, images } from "../content";

export function About() {
  return (
    <>
      <header className="page-head about-head">
        <h1>{about.title}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section className="section about-story">
        <figure>
          <img
            src={images.family}
            alt="Three generations of a family stand together on a park path in autumn"
            width={825}
            height={1100}
          />
        </figure>
        <div className="prose">
          <h2>How it started</h2>
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>What we hold to</h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section band-plain">
        <h2>Seventeen years, three clinics</h2>
        <ol className="years">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section split">
        <div>
          <h2>The team</h2>
          <p>
            Eight clinicians, five receptionists, a practice manager, two
            phlebotomists and a cleaner called Dot who has been here longer than
            anyone. Meet the people you’ll actually see.
          </p>
          <Link to="/clinicians" className="link-arrow">
            Our clinicians <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="leaflet">
          <h3>{about.careers.title}</h3>
          <p>{about.careers.text}</p>
          <a href={`mailto:${brand.careersEmail}`} className="btn btn-quiet">
            Write to {brand.careersEmail}
          </a>
        </div>
      </section>
    </>
  );
}
