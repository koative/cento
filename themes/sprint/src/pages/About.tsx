import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand } from "../content";
import { initials } from "../lib/format";
import whiteboard from "../assets/whiteboard.jpg";
import wall from "../assets/planning-wall.jpg";

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{about.h1}</h1>
          <p className="lede">{about.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap about-story">
          <figure className="photo">
            <img
              src={whiteboard}
              alt="A whiteboard with Backlog, In Progress and Done columns of orange and green sticky notes beside marker sketches"
              width={1024}
              height={768}
            />
            <figcaption>The kind of wall we were trying to keep.</figcaption>
          </figure>
          <div className="prose">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <dl className="about-facts">
              {about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section keys-band">
        <div className="wrap">
          <h2>What the wall taught us</h2>
          <dl className="principles">
            {about.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>The people answering your support email</h2>
          <ul className="team">
            {about.team.map((t, n) => (
              <li key={t.name}>
                <span className="avatar" data-tone={n % 5} aria-hidden="true">
                  {initials(t.name)}
                </span>
                <p className="team-name">{t.name}</p>
                <p className="team-role">{t.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section jobs-section">
        <div className="wrap jobs-grid">
          <img src={wall} alt="" width={1024} height={682} loading="lazy" />
          <div>
            <h2>Open roles</h2>
            <ul className="jobs">
              {about.jobs.map((j) => (
                <li key={j.title}>
                  <a
                    href={`mailto:${brand.email}?subject=${encodeURIComponent(j.title)}`}
                  >
                    <span>{j.title}</span>
                    <span className="job-place">{j.place}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p>
              Don’t see your role? Write to{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a> anyway.
            </p>
            <Link to="/contact" className="text-link">
              Or talk to sales about using Sprint{" "}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
