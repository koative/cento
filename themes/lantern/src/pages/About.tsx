import { Link } from "../router";
import { about, brand, pagesCopy } from "../content";

export function About() {
  const copy = pagesCopy.about;
  return (
    <>
      <header className="page-head wrap">
        <h1>{copy.title}</h1>
        <p>{about.intro}</p>
      </header>

      <section className="section wrap about-story">
        <img src={about.image} alt={about.imageAlt} width={900} height={600} />
        <div className="prose">
          <h2>{copy.storyTitle}</h2>
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <h2>{copy.timelineTitle}</h2>
        <ol className="timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="timeline-year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section panel-band">
        <div className="wrap panel-inner">
          <h2>{copy.panelTitle}</h2>
          <p>{about.panel}</p>
          <Link to="/reports" className="btn btn-light">
            See every decision in the reports
          </Link>
        </div>
      </section>

      <section className="section wrap people">
        <div>
          <h2>{copy.staffTitle}</h2>
          <ul className="people-list">
            {about.staff.map((p) => (
              <li key={p.name}>
                <span className="initials" aria-hidden="true">
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div>
                  <h3>{p.name}</h3>
                  <p className="role-meta">{p.role}</p>
                  <p>{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{copy.trusteesTitle}</h2>
          <ul className="trustee-list">
            {about.trustees.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p>
                  {p.role} · {p.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap visit">
        <h2>{copy.visitTitle}</h2>
        <p>{copy.visitText}</p>
        <address>
          {brand.address}
          <br />
          {brand.hours}
          <br />
          <a href={brand.phoneHref}>{brand.phone}</a> ·{" "}
          <a href={"mailto:" + brand.email}>{brand.email}</a>
        </address>
        <div className="btn-row">
          <Link to="/volunteer" className="btn">
            Volunteer
          </Link>
          <Link to="/donate" className="btn btn-flame">
            Donate
          </Link>
        </div>
      </section>
    </>
  );
}
