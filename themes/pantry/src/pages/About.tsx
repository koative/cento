import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, farms } from "../content";

export function About() {
  return (
    <div className="page about">
      <header className="about-hero">
        <div>
          <h1>{about.title}</h1>
          <p className="lead">{about.lead}</p>
        </div>
        <img
          src={about.image.src}
          alt={about.image.alt}
          width={about.image.w}
          height={about.image.h}
        />
      </header>

      <section className="section story narrow">
        <h2>Forty boxes from a church hall</h2>
        {about.story.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </section>

      <section className="section rules">
        <h2>Four rules from the first winter</h2>
        <dl className="rule-list">
          {about.rules.map((r) => (
            <div key={r.title}>
              <dt>{r.title}</dt>
              <dd>{r.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section team">
        <h2>Around the Monday table</h2>
        <ul className="team-list">
          {about.team.map((t) => (
            <li key={t.name}>
              <span className="monogram" aria-hidden="true">
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
      </section>

      <section className="section farms about-farms">
        <img
          src={about.farmImage.src}
          alt={about.farmImage.alt}
          width={about.farmImage.w}
          height={about.farmImage.h}
          loading="lazy"
        />
        <div>
          <h2>The growers</h2>
          <ul className="farm-list">
            {farms.map((f) => (
              <li key={f.name}>
                <b>{f.name}</b>
                <span>
                  {f.place} · {f.supplies}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section timeline-section">
        <h2>Since 2019</h2>
        <ol className="timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="num">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section cta-band">
        <h2>Taste the test kitchen’s week</h2>
        <Link to="/menu" className="btn btn-big">
          See this week’s menu <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
