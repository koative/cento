import { ChevronDown } from "lucide-react";
import { Link } from "../router";
import { about, brand, faqs, images } from "../content";

export function About() {
  return (
    <div className="page">
      <div className="wrap">
        <header className="page-head">
          <h1>About Prism</h1>
          <p className="lede">{about.intro}</p>
        </header>

        <section className="section split">
          <h2>How it started</h2>
          <div className="prose">
            {about.story.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </section>
      </div>

      <figure className="wrap wide-photo">
        <img
          src={images.party.src}
          alt={images.party.alt}
          width={images.party.w}
          height={images.party.h}
          loading="lazy"
        />
        <figcaption>Afterlight, the Friday party, Prism 2026.</figcaption>
      </figure>

      <div className="wrap">
        <section className="section split">
          <h2>House rules</h2>
          <dl className="principles">
            {about.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section">
          <h2 className="h-section">The team</h2>
          <ul className="team">
            {about.team.map((m) => (
              <li key={m.name}>
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  width={800}
                  height={1000}
                  loading="lazy"
                />
                <h3>{m.name}</h3>
                <p className="team-role">{m.role}</p>
                <p>{m.text}</p>
              </li>
            ))}
          </ul>
          <p className="quiet-line">
            Plus about a hundred volunteers in Prism jackets. Want to be one?
            Write to <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
        </section>

        <section className="section split">
          <h2>Code of conduct</h2>
          <div className="prose">
            <p>{about.conduct}</p>
            <p>
              Reports can be made in person, by phone or to{" "}
              <a href="mailto:safety@prism.example">safety@prism.example</a>. We
              act on every one, and we'll tell you what we did.
            </p>
          </div>
        </section>

        <section className="section split">
          <h2>Questions</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <ChevronDown aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section cta-line">
          <h2>Still deciding?</h2>
          <div className="actions">
            <Link to="/tickets" className="btn btn-ink">
              See the passes
            </Link>
            <Link to="/editions" className="btn btn-line">
              Read past recaps
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
