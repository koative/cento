import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { atelier, brand, images } from "../content";

export function Atelier() {
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>{atelier.title}</h1>
        <p className="lede">{atelier.intro}</p>
      </header>

      <figure className="wrap print print-wide">
        <img
          src={images.eligius.src}
          width={images.eligius.width}
          height={images.eligius.height}
          alt={images.eligius.alt}
        />
        <figcaption>
          Master of the Love Gardens, Saint Eligius in his workshop, c. 1440–60.
          Rijksmuseum, Amsterdam.
        </figcaption>
      </figure>

      <section className="wrap section prose-pair">
        <div>
          <h2>{atelier.saintTitle}</h2>
          <p>{atelier.saintText}</p>
        </div>
        <div>
          <h2>{atelier.benchTitle}</h2>
          <p>{atelier.benchText}</p>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>The makers</h2>
          <p>
            Six people, six benches. Whoever makes your piece stamps their
            initials inside it, beside ours.
          </p>
        </div>
        <ul className="makers">
          {atelier.makers.map((m) => (
            <li key={m.name}>
              <span className="maker-mark" aria-hidden="true">
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <h3>{m.name}</h3>
                <p className="maker-role">
                  {m.role} · at the bench since {m.since}
                </p>
                <p>{m.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap split split-reverse">
        <img
          src={images.bench.src}
          width={images.bench.width}
          height={images.bench.height}
          alt={images.bench.alt}
          loading="lazy"
        />
        <div>
          <h2>How we work</h2>
          <dl className="values">
            {atelier.values.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <div>
            <h2>Visit the atelier</h2>
            <p>
              {brand.street}, {brand.city}. The arcade entrance is on Weybosset
              Street; take the stairs by the bookbinder.
            </p>
            <Link to="/appointments" className="btn">
              Book a visit <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <dl className="hours">
            {brand.hours.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
