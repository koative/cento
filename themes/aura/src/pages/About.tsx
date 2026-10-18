import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand } from "../content";

export function About() {
  return (
    <div className="page about-page">
      <header className="about-head">
        <h1>{about.title}</h1>
        <p className="lede">{about.intro}</p>
      </header>

      <section className="about-story">
        <figure>
          <img
            src={about.image}
            alt={about.imageAlt}
            width={1400}
            height={2100}
          />
        </figure>
        <div className="prose">
          <h2>How it started</h2>
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section principles">
        <h2>What we hold to</h2>
        <dl>
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sourcing">
        <img
          src={about.sourcing.image}
          alt={about.sourcing.imageAlt}
          width={1400}
          height={933}
          loading="lazy"
        />
        <div>
          <h2>{about.sourcing.title}</h2>
          <p>{about.sourcing.text}</p>
          <Link
            to="/journal/shea-from-the-women-who-crack-it"
            className="text-link"
          >
            Read about the shea cooperative{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section team">
        <h2>The people in the studio</h2>
        <ul>
          {about.team.map((t) => (
            <li key={t.name}>
              <span className="initials" aria-hidden="true">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <h3>{t.name}</h3>
              <p className="role">{t.role}</p>
              <p>{t.bio}</p>
            </li>
          ))}
        </ul>
        <p className="team-note">
          Questions for any of us go to{" "}
          <a href={"mailto:" + brand.email}>{brand.email}</a>.{" "}
          <Link to="/help">Read the FAQ</Link> first if it is about an order.
        </p>
      </section>
    </div>
  );
}
