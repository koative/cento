import { ArrowRight } from "lucide-react";
import {
  brand,
  capabilities,
  home,
  images,
  industries,
  insights,
  people,
} from "../content";
import { Link } from "../router";
import { Exhibit } from "../components/Exhibit";
import { InsightItem } from "../components/InsightItem";
import { Matrix } from "../components/Matrix";

export function Home() {
  const lead = insights.find((p) => p.image) ?? insights[0];
  const rest = insights.filter((p) => p !== lead);
  const partners = people.filter((p) => p.photo);
  const pricing = capabilities.find((c) => c.slug === "pricing")!;

  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <h1 className="display">{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/contact" className="btn btn-primary">
              Discuss a problem
            </Link>
            <Link to="/capabilities" className="btn btn-quiet">
              See our capabilities
            </Link>
          </div>
        </div>
        <figure className="hero-photo photo">
          <img
            src={images.workshop}
            alt="A consultant points to a planning board of sticky notes while client managers listen."
            width={960}
            height={640}
          />
          <figcaption>{home.photoCaption}</figcaption>
        </figure>
        <nav className="cap-index" aria-label="Capabilities">
          <ul>
            {capabilities.map((c) => (
              <li key={c.slug}>
                <Link to={`/capabilities/${c.slug}`}>
                  <span className="cap-index-name">{c.name}</span>
                  <span className="cap-index-short">{c.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="method wrap section">
        <div className="split">
          <h2 className="h2">{home.method.title}</h2>
          <p className="lede">{home.method.text}</p>
        </div>
        <ol className="timeline">
          {home.method.steps.map((s) => (
            <li key={s.when}>
              <span className="timeline-when num">{s.when}</span>
              <span className="timeline-what">{s.what}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="matrix-section section"
        aria-labelledby="matrix-heading"
      >
        <div className="wrap">
          <div className="split">
            <h2 className="h2" id="matrix-heading">
              {home.matrix.title}
            </h2>
            <p>{home.matrix.text}</p>
          </div>
          <Matrix />
        </div>
      </section>

      <section className="cases wrap section">
        <h2 className="h2 narrow">{home.cases.title}</h2>
        <div className="cases-grid">
          <ul className="case-list">
            {capabilities.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <p className="case-client">{c.story.client}</p>
                <p className="case-result">{c.story.result}</p>
                <Link to={`/capabilities/${c.slug}`} className="link-arrow">
                  {c.name} <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Exhibit data={pricing.exhibit} n={1} />
        </div>
      </section>

      <section
        className="quote-section section"
        aria-label="Client testimonial"
      >
        <blockquote className="wrap big-quote">
          <p>{home.quote.text}</p>
          <footer>
            {home.quote.by}, <span>{home.quote.org}</span>
          </footer>
        </blockquote>
      </section>

      <section className="wrap section">
        <div className="split">
          <h2 className="h2">{home.industries.title}</h2>
          <Link to="/industries" className="link-arrow">
            All industries and where our work sits{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="industry-list">
          {industries.map((i) => (
            <li key={i.slug}>
              <h3>{i.name}</h3>
              <p>{i.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section">
        <div className="split">
          <h2 className="h2">{home.insights.title}</h2>
          <Link to="/insights" className="link-arrow">
            All insights <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="insights-home">
          <div className="insight-lead">
            <InsightItem post={lead} photo />
          </div>
          <div className="insight-rest">
            {rest.slice(0, 3).map((p) => (
              <InsightItem key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section people-home">
        <figure className="photo">
          <img
            src={images.team}
            alt="Five consultants and a client around a meeting table with laptops, laughing."
            width={960}
            height={640}
            loading="lazy"
          />
          <figcaption>{home.people.caption}</figcaption>
        </figure>
        <div>
          <h2 className="h2">{home.people.title}</h2>
          <p>{home.people.text}</p>
          <ul className="partner-strip">
            {partners.map((p) => (
              <li key={p.id}>
                <img
                  src={p.photo}
                  alt=""
                  width={240}
                  height={320}
                  loading="lazy"
                />
                <span className="partner-name">{p.name}</span>
                <span className="partner-role">{p.role}</span>
              </li>
            ))}
          </ul>
          <div className="actions">
            <Link to="/people" className="btn btn-quiet">
              Meet the people
            </Link>
            <Link to="/careers" className="link-arrow">
              Careers at {brand.name} <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="close section">
        <div className="wrap close-inner">
          <h2 className="display-2">{home.close.title}</h2>
          <div>
            <p>{home.close.text}</p>
            <div className="actions">
              <Link to="/contact" className="btn btn-inverse">
                Start the conversation
              </Link>
              <a href={`mailto:${brand.email}`} className="close-mail">
                {brand.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
