import { Link } from "../router";
import { about, brand, team } from "../content";

export default function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.heading}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section className="wrap split" aria-label="Our story">
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="ruled-list">
          {about.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band band-paper" aria-labelledby="princ-h">
        <div className="wrap">
          <h2 id="princ-h" className="section-title">
            What we hold to
          </h2>
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

      <section className="wrap" aria-labelledby="team-h">
        <h2 id="team-h" className="section-title">
          The people who answer your emails
        </h2>
        <ul className="team">
          {team.map((p) => (
            <li key={p.name}>
              <span className="avatar avatar-large" aria-hidden>
                {p.initials}
              </span>
              <div>
                <h3>{p.name}</h3>
                <p className="team-role">{p.role}</p>
                <p>{p.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="close wrap" aria-labelledby="ab-close">
        <h2 id="ab-close">Work with us, or just say hello</h2>
        <p>
          We are hiring an iOS engineer and a second money coach. Write to{" "}
          <a href="mailto:jobs@ledger.example">jobs@ledger.example</a>, or reach
          the whole team at <a href={`mailto:${brand.email}`}>{brand.email}</a>.
        </p>
        <div className="actions">
          <Link to="/signup" className="btn btn-primary btn-large">
            Try Ledger free
          </Link>
          <Link to="/changelog" className="btn btn-quiet btn-large">
            See what we shipped lately
          </Link>
        </div>
      </section>
    </>
  );
}
