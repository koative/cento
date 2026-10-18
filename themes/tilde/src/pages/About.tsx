import { Link } from "../router";
import { about, brand, resume } from "../content";
import { Section } from "../components/Blocks";
import dusk from "../assets/desk-dusk.jpg";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>About</h1>
        <p className="lead">{about.lead}</p>
      </header>

      <Section title="The short version">
        <div className="about-grid">
          <div className="prose">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <figure className="about-photo">
            <img
              src={dusk}
              alt="A wooden desk at dusk with a closed laptop and a single bulb lamp"
              width={1800}
              height={1200}
              loading="lazy"
            />
            <figcaption>
              The desk, after hours. Fridays it belongs to open source.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section title="How I work">
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Speaking">
        <ul className="talks">
          {resume.talks.map((t) => (
            <li key={t.title}>
              <span className="num">{t.year}</span>
              <span>
                {t.title}
                <span className="muted"> · {t.event}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="prose-p">
          I give one or two talks a year, usually about something I got wrong
          first. Workshops on reading query plans are available for teams of up
          to twelve.
        </p>
      </Section>

      <Section title="Facts">
        <dl className="kv">
          {about.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <section className="case-cta wrap">
        <h2>The full history is on the résumé.</h2>
        <p>Or skip straight to the part where we talk. {brand.status}.</p>
        <div className="actions">
          <Link to="/contact" className="btn">
            Get in touch
          </Link>
          <Link to="/resume" className="btn btn-ghost">
            Read the résumé
          </Link>
        </div>
      </section>
    </>
  );
}
