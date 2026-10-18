import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand } from "../content";
import { initials } from "../lib/format";

export default function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.h1}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section className="wrap section prose-wide" aria-labelledby="h-story">
        <h2 id="h-story">Why we built it</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="band band-ink" aria-labelledby="h-principles">
        <div className="wrap section">
          <h2 id="h-principles">What we hold to</h2>
          <dl className="principles">
            {about.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="h-team">
        <h2 id="h-team">The people answering your emails</h2>
        <ul className="team">
          {about.team.map((t) => (
            <li key={t.name}>
              <span className="avatar avatar-lg" aria-hidden>
                {initials(t.name)}
              </span>
              <div>
                <h3>{t.name}</h3>
                <p className="team-role">{t.role}</p>
                <p>{t.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="h-offices">
        <h2 id="h-offices">Offices</h2>
        <div className="offices">
          {about.offices.map((o) => (
            <address key={o.city}>
              <strong>{o.city}</strong>
              {o.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          ))}
          <address>
            <strong>Reach us</strong>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          </address>
        </div>
      </section>

      <section className="wrap close" aria-labelledby="h-close">
        <h2 id="h-close">{about.hiring}</h2>
        <div className="cta-row">
          <a
            href={`mailto:${brand.email}?subject=Careers`}
            className="btn btn-primary btn-lg"
          >
            Email us about a role
          </a>
          <Link to="/demo" className="btn btn-quiet btn-lg">
            Or book a demo <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
