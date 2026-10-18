import { Link } from "../router";
import { about, brand, images } from "../content";

export function About() {
  return (
    <div className="page about-page">
      <header className="page-head wrap about-head">
        <h1>Nine years of pressing down hard.</h1>
        <p className="lede">
          {brand.name} is a counter-service burger joint that started as a
          Thursday pop-up. It still cooks everything the way it did that first
          night.
        </p>
      </header>

      <section className="wrap story" aria-labelledby="story-h">
        <img
          src={images.dining.src}
          alt={images.dining.alt}
          width={images.dining.w}
          height={images.dining.h}
        />
        <div>
          <h2 id="story-h">How it started</h2>
          {about.story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap sourcing" aria-labelledby="src-h">
        <h2 id="src-h">Who we buy from</h2>
        <dl>
          {about.sourcing.map((s) => (
            <div key={s.name}>
              <dt>
                {s.name} <span>{s.what}</span>
              </dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="crew-band" aria-labelledby="crew-h">
        <div className="wrap">
          <h2 id="crew-h">The crew</h2>
          <ul className="crew">
            {about.crew.map((c) => (
              <li key={c.name}>
                <h3>{c.name}</h3>
                <p className="crew-role">{c.role}</p>
                <p>{c.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions we get at the window</h2>
        <div className="faq-list">
          {about.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="faq-more">
          Something else? <a href={`mailto:${brand.email}`}>{brand.email}</a> or
          ask at any <Link to="/locations">counter</Link>.
        </p>
      </section>
    </div>
  );
}
