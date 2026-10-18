import { about, brand } from "../content";

export default function About() {
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>{about.heading}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section className="wrap section-tight prose-cols">
        {about.story.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </section>

      <section className="band">
        <div className="wrap section">
          <h2 className="section-title">How we work</h2>
          <dl className="notes">
            {about.principles.map((p) => (
              <div key={p.term}>
                <dt>{p.term}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="section-title">The people on the pager</h2>
        <ul className="team">
          {about.team.map((t) => (
            <li key={t.name}>
              <span className="avatar" aria-hidden="true">
                {t.initials}
              </span>
              <span>
                <strong>{t.name}</strong>
                <span className="muted">{t.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section about-split">
        <div>
          <h2>Offices</h2>
          <div className="offices">
            {about.offices.map((o) => (
              <address key={o.city}>
                <strong>{o.city}</strong>
                {o.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
            ))}
          </div>
          <p>
            Press and partnerships:{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </div>
        <div>
          <h2>Open roles</h2>
          <ul className="jobs">
            {about.jobs.map((j) => (
              <li key={j.role}>
                <a
                  href={`mailto:jobs@conduit.example?subject=${encodeURIComponent(j.role)}`}
                >
                  {j.role}
                </a>
                <span className="muted">{j.place}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
