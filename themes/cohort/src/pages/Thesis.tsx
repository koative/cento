import { Link } from "../router";
import { companies, domainById, domains, partners, thesis } from "../content";

export function Thesis() {
  return (
    <div className="page">
      <header className="wrap page-head thesis-head">
        <h1>{thesis.title}</h1>
        <div className="thesis-intro">
          {thesis.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </header>

      <section className="section wrap" aria-labelledby="beliefs">
        <h2 id="beliefs" className="section-title">
          What we believe
        </h2>
        <dl className="beliefs">
          {thesis.beliefs.map((b) => (
            <div key={b.title}>
              <dt>{b.title}</dt>
              <dd>{b.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {domains.map((d) => {
        const backed = companies.filter((c) => c.domain === d.id);
        const leads = partners.filter((p) => p.focus.includes(d.id));
        return (
          <section
            key={d.id}
            className="domain-section wrap rule-top"
            aria-labelledby={`d-${d.id}`}
          >
            <div className="domain-section-head">
              <h2 id={`d-${d.id}`}>{d.name}</h2>
              <p className="domain-line">{d.line}</p>
              <img
                src={backed[backed.length - 1].image}
                alt=""
                width={480}
                height={360}
                loading="lazy"
              />
            </div>
            <div className="domain-section-body">
              <p>{d.body}</p>
              <h3>What we look for</h3>
              <ul className="ticks">
                {d.lookFor.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <h3>What we pass on</h3>
              <p>{d.passOn}</p>
              <p className="domain-meta">
                <span>Partners:</span>{" "}
                {leads.map((p, i) => (
                  <span key={p.slug}>
                    {i > 0 && ", "}
                    <Link to={`/team/${p.slug}`}>{p.name}</Link>
                  </span>
                ))}
                <br />
                <span>Portfolio:</span>{" "}
                {backed.map((c, i) => (
                  <span key={c.slug}>
                    {i > 0 && ", "}
                    <Link to={`/portfolio/${c.slug}`}>{c.name}</Link>
                  </span>
                ))}
              </p>
            </div>
          </section>
        );
      })}

      <section className="section wrap" aria-labelledby="questions">
        <h2 id="questions" className="section-title">
          Questions we are asking in 2026
        </h2>
        <p className="section-sub">
          If you are working on one of these, we would like to hear from you
          before you think you are ready.
        </p>
        <ul className="questions">
          {thesis.questions.map((q) => (
            <li key={q.text}>
              <p>{q.text}</p>
              <span>{domainById(q.domain).name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>Working on one of these questions?</h2>
          <p>
            Tell us what you have learned so far. A partner reads every pitch
            and replies within ten working days.
          </p>
          <div className="actions">
            <Link to="/pitch" className="btn btn-paper">
              Pitch us
            </Link>
            <Link to="/founders" className="close-mail">
              How we invest
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
