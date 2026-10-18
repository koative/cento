import { ArrowUpRight } from "lucide-react";
import { brand, team, teamPage } from "../content";
import { CloseBand } from "../components/CloseBand";

export function Team() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>{teamPage.h1}</h1>
          <p className="lede">{teamPage.lede}</p>
        </div>
      </header>

      <div className="wrap wide-img">
        <img
          src={teamPage.image}
          alt={teamPage.imageAlt}
          width={1800}
          height={1200}
        />
      </div>

      <section className="section" aria-label="Discipline leads">
        <div className="wrap people">
          {team.map((p, i) => (
            <article key={p.id} className="person">
              <img
                src={p.image}
                alt={`Portrait of ${p.name}`}
                width={800}
                height={1000}
                loading={i > 3 ? "lazy" : undefined}
              />
              <h2>{p.name}</h2>
              <p className="person-role">{p.role}</p>
              <p className="person-bio">{p.bio}</p>
              <dl>
                <div>
                  <dt>Focus</dt>
                  <dd>{p.focus}</dd>
                </div>
                <div>
                  <dt>Based</dt>
                  <dd>{p.base}</dd>
                </div>
                <div>
                  <dt>At Surge since</dt>
                  <dd>{p.since}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section values-section"
        aria-labelledby="values-title"
      >
        <div className="wrap svc-grid">
          <h2 id="values-title" className="h-lg">
            {teamPage.valuesTitle}
          </h2>
          <dl className="values">
            {teamPage.values.map((v) => (
              <div key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="pods-title">
        <div className="wrap feature-grid">
          <img
            src={teamPage.studio}
            alt={teamPage.studioAlt}
            loading="lazy"
            width={1400}
            height={1050}
            className="rounded-img"
          />
          <div>
            <h2 id="pods-title" className="h-lg">
              {teamPage.podsTitle}
            </h2>
            <p>{teamPage.podsText}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="roles-title">
        <div className="wrap svc-grid">
          <h2 id="roles-title" className="h-lg">
            {teamPage.rolesTitle}
          </h2>
          <ul className="roles">
            {teamPage.roles.map((r) => (
              <li key={r.title}>
                <a
                  href={`mailto:${brand.jobsEmail}?subject=${encodeURIComponent(r.title)}`}
                >
                  <strong>{r.title}</strong>
                  <span>{r.place}</span>
                  <span className="num">{r.salary}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CloseBand title="Work with this team." />
    </>
  );
}
