import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, images, principles, quotes, team, timeline } from "../content";

export function About() {
  return (
    <div className="page about-page">
      <header className="about-hero">
        <h1>{about.title}</h1>
        <p className="lead">{about.lead}</p>
      </header>

      <figure className="wide-img">
        <img
          src={images.beans.src}
          alt={images.beans.alt}
          width={1200}
          height={915}
        />
      </figure>

      <section className="about-body" aria-label="How we work">
        {about.body.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </section>

      <section className="principles" aria-labelledby="h-principles">
        <h2 id="h-principles">{about.principlesTitle}</h2>
        <dl>
          {principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="timeline-section" aria-labelledby="h-time">
        <img
          src={images.drying.src}
          alt={images.drying.alt}
          loading="lazy"
          width={1200}
          height={800}
        />
        <div>
          <h2 id="h-time">{about.timelineTitle}</h2>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.year}>
                <span className="num">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="team" aria-labelledby="h-team">
        <h2 id="h-team">{about.teamTitle}</h2>
        <ul>
          {team.map((m) => (
            <li key={m.name}>
              <span className="initials" aria-hidden="true">
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div>
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
                <p className="muted">{m.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="quote-section" aria-label="From a subscriber">
        <blockquote>
          <p>{quotes[1].text}</p>
          <footer>{quotes[1].who}</footer>
        </blockquote>
      </section>

      <section className="close-band" aria-labelledby="h-visit">
        <h2 id="h-visit">{about.closeTitle}</h2>
        <p>{about.closeText}</p>
        <div className="actions">
          <Link to="/cafes" className="btn">
            Cafés &amp; tours <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/shop" className="btn btn-ghost">
            Shop the coffee
          </Link>
        </div>
      </section>
    </div>
  );
}
