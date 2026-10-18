import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, images } from "../content";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lede">{about.intro}</p>
      </header>

      <section className="wrap split-media">
        <img
          src={images.towerCrane.src}
          alt={images.towerCrane.alt}
          width={images.towerCrane.w}
          height={images.towerCrane.h}
        />
        <div className="prose">
          <h2>Regional on purpose</h2>
          {about.story.map((s) => (
            <p key={s.slice(0, 24)}>{s}</p>
          ))}
        </div>
      </section>

      <section className="section wrap split">
        <div className="split-head">
          <h2>Since 1987</h2>
        </div>
        <ol className="timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="num">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band-dark">
        <div className="wrap section">
          <h2>How we run the company</h2>
          <ul className="rules rules-3">
            {about.values.map((v) => (
              <li key={v.name}>
                <h3>{v.name}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap">
        <h2>Leadership</h2>
        <ul className="people">
          {about.leaders.map((l) => (
            <li key={l.name}>
              <h3>{l.name}</h3>
              <p className="person-role">{l.role}</p>
              <p>{l.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap split">
        <div className="split-head">
          <h2>Offices</h2>
          <ul className="credentials">
            {about.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <ul className="offices">
          {about.offices.map((o) => (
            <li key={o.name}>
              <h3>{o.name}</h3>
              <p>{o.address}</p>
              <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="num">
                {o.phone}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="close-panel">
        <div className="wrap close-grid">
          <div>
            <h2>Work with us, or for us</h2>
            <p>
              Clients start with a tender invitation. Everyone else starts with
              the open roles.
            </p>
          </div>
          <div className="close-actions">
            <Link to="/tender" className="btn btn-ink">
              Invite us to tender <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link to="/careers" className="btn btn-line">
              See open roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
