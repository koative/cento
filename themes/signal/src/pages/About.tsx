import { ArrowUpRight } from "lucide-react";
import { about, brand } from "../content";

export default function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.heading}</h1>
      </header>

      <section className="wrap section-tight split">
        <h2>{about.storyTitle}</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <h2 className="section-title">{about.principlesTitle}</h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band-dark">
        <div className="wrap section split">
          <h2>{about.timelineTitle}</h2>
          <ol className="timeline">
            {about.timeline.map((t) => (
              <li key={t.year}>
                <span className="mono">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="section-title">{about.teamTitle}</h2>
        <ul className="team">
          {about.team.map((m) => (
            <li key={m.name}>
              <span className="monogram" aria-hidden>
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <strong>{m.name}</strong>
              <span>{m.role}</span>
              <small>{m.place}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section split">
        <div>
          <h2>{about.rolesTitle}</h2>
          <p>
            {about.rolesText}{" "}
            <a href={`mailto:${brand.careers}`}>{brand.careers}</a>.
          </p>
        </div>
        <ul className="roles">
          {about.roles.map((r) => (
            <li key={r.title}>
              <a
                href={`mailto:${brand.careers}?subject=${encodeURIComponent(r.title)}`}
              >
                <span>
                  <strong>{r.title}</strong>
                  <small>
                    {r.team} · {r.place}
                  </small>
                </span>
                <ArrowUpRight size={18} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
