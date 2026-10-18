import { Link } from "../router";
import { about, brand } from "../content";

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap about-head">
          <h1>{about.h1}</h1>
          <p className="lede">{about.lead}</p>
        </div>
      </section>

      <figure className="wrap about-photo">
        <img src={about.image} alt={about.imageAlt} width={1600} height={855} />
      </figure>

      <section className="section">
        <div className="wrap">
          <h2>How we work</h2>
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

      <section className="section section-sunk">
        <div className="wrap split">
          <h2>From one lane to 44</h2>
          <ol className="timeline">
            {about.timeline.map((t) => (
              <li key={t.year}>
                <span className="num">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>The people on the desk</h2>
          <ul className="team">
            {about.team.map((m) => (
              <li key={m.name}>
                <span className="avatar lg" aria-hidden>
                  {m.name
                    .split(" ")
                    .map((w) => w[0])
                    .filter((c) => c === c.toUpperCase())
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <h3>{m.name}</h3>
                  <p className="team-role">
                    {m.role} · <span className="muted">{m.base}</span>
                  </p>
                  <p>{m.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-sunk">
        <div className="wrap split">
          <div>
            <h2>Careers</h2>
            <p>
              410 people across nine countries, most of them on a dock, in a cab
              or on the control-tower floor. We hire for calm under pressure.
            </p>
            <p className="muted small">{about.careersNote}</p>
          </div>
          <ul className="roles">
            {about.roles.map((r) => (
              <li key={r.title}>
                <a
                  href={`mailto:jobs@relay.example?subject=${encodeURIComponent(r.title)}`}
                >
                  <strong>{r.title}</strong>
                  <span className="muted">
                    {r.place} · {r.type}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-row">
          <h2>Visit the Waalhaven</h2>
          <p>
            {brand.address.join(", ")}. Hub tours on the first Friday of every
            month: <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
          <div className="actions">
            <Link to="/network" className="btn btn-ghost btn-lg">
              Find a hub near you
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
