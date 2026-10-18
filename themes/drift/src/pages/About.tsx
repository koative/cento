import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, images } from "../content";

export function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap about-head">
          <h1>{about.title}</h1>
          <p className="lede">{about.lede}</p>
        </div>
      </section>

      <section className="wrap story" aria-label="Our story">
        <figure>
          <img
            src={images.hut.src}
            alt={images.hut.alt}
            width={images.hut.w}
            height={images.hut.h}
          />
          <figcaption>
            The hut at Gull Point: lockers, hot showers, a kettle and forty
            boards.
          </figcaption>
        </figure>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section safety-band" aria-labelledby="h-safety">
        <div className="wrap">
          <div className="section-head">
            <h2 id="h-safety">How we keep it safe</h2>
            <p>
              Surfing is safe when the people running it are strict about the
              boring parts. These are ours.
            </p>
          </div>
          <dl className="safety">
            {about.safety.map((s) => (
              <div key={s.title}>
                <dt>{s.title}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section care" aria-labelledby="h-care">
        <div className="wrap care-grid">
          <img
            src={images.rental.src}
            alt={images.rental.alt}
            width={images.rental.w}
            height={images.rental.h}
            loading="lazy"
          />
          <div>
            <h2 id="h-care">{about.care.title}</h2>
            <p>{about.care.text}</p>
            <div className="actions">
              <Link to="/coaches" className="btn btn-ink">
                Meet the coaches <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link to="/faq" className="btn btn-line">
                Questions? Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
