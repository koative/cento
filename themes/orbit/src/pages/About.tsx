import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, images } from "../content";

export function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>We publish the date, and keep it.</h1>
          <p className="lede">
            Orbit is 214 people who design, build, test and fly small-satellite
            launch vehicles from one factory, one test site and two pads.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap split story">
          <div className="prose">
            <h2>Why we started</h2>
            {about.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <img
            src={images.testStand.src}
            alt={images.testStand.alt}
            width={images.testStand.w}
            height={images.testStand.h}
            className="rounded-photo"
          />
        </div>
      </section>

      <section className="section night">
        <div className="wrap">
          <h2>Four rules we work by</h2>
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
        <div className="wrap split">
          <div>
            <h2>Milestones</h2>
            <ol className="timeline tnum">
              {about.milestones.map((m) => (
                <li key={m.year}>
                  <span>{m.year}</span>
                  <p>{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2>Leadership</h2>
            <ul className="people">
              {about.team.map((t) => (
                <li key={t.name}>
                  <span className="initials" aria-hidden="true">
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div>
                    <h3>{t.name}</h3>
                    <p className="role">{t.role}</p>
                    <p>{t.bio}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap">
          <h2>Where Orbit is made and flown</h2>
          <div className="facilities">
            {about.facilities.map((f, i) => (
              <figure
                key={f.name}
                className={i === 0 ? "facility lead" : "facility"}
              >
                <img
                  src={f.image.src}
                  alt={f.image.alt}
                  width={f.image.w}
                  height={f.image.h}
                  loading="lazy"
                />
                <figcaption>
                  <h3>{f.name}</h3>
                  <p>{f.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band night">
        <div className="wrap cta-row">
          <p>
            We are hiring engineers and technicians in Port Kessel, Mesa Dorada
            and Cape Halden.
          </p>
          <Link to="/careers" className="btn btn-primary">
            Open roles <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
