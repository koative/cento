import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { about, vets } from "../content";
import { VetCard } from "../components/VetCard";

export function About() {
  return (
    <>
      <section className="about-hero wrap">
        <div>
          <h1>{about.title}</h1>
          <p className="lede">{about.lede}</p>
        </div>
        <img
          src={about.image.src}
          alt={about.image.alt}
          width={about.image.w}
          height={about.image.h}
        />
      </section>

      <section className="section wrap" aria-labelledby="h-principles">
        <h2 id="h-principles">How we run the place</h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="section wrap timeline-section"
        aria-labelledby="h-time"
      >
        <h2 id="h-time">Seventeen years on Alder Street</h2>
        <ol className="timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="timeline-year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap facilities" aria-labelledby="h-fac">
        <div>
          <h2 id="h-fac">Inside the old bakery</h2>
          <p>{about.community}</p>
        </div>
        <ul className="check-list">
          {about.facilities.map((f) => (
            <li key={f}>
              <Check aria-hidden="true" /> {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap" aria-labelledby="h-people">
        <h2 id="h-people">The people</h2>
        <div className="vet-row">
          {vets.map((v) => (
            <VetCard key={v.slug} vet={v} />
          ))}
        </div>
        <Link to="/book" className="btn btn-primary btn-lg">
          Book a visit <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
