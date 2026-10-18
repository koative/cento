import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, scenes } from "../content";

export function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{about.title}</h1>
          <p className="lede">{about.lede}</p>
        </div>
      </section>

      <section className="about-hero">
        <img
          src={scenes.hands}
          alt="A clinician holding an older patient's hands"
          width={1800}
          height={1200}
        />
      </section>

      <section className="section">
        <div className="wrap split">
          <h2>The short history</h2>
          <div className="prose">
            {about.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <h2>Clinical standards we publish and keep</h2>
          <dl className="standards">
            {about.standards.map((s) => (
              <div key={s.title}>
                <dt>{s.title}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <img
            className="photo"
            src={scenes.family}
            alt="A father holding his young son on his shoulders with his daughter beside him"
            width={1800}
            height={1201}
            loading="lazy"
          />
          <div>
            <h2>Leadership</h2>
            <ul className="leaders">
              {about.leadership.map((l) => (
                <li key={l.name}>
                  <strong>{l.name}</strong>
                  <span>{l.role}</span>
                </li>
              ))}
            </ul>
            <p>
              Press, partnerships or careers:{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
            <Link to="/clinicians" className="text-link">
              Meet the clinicians <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
