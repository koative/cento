import { Mail, Printer } from "lucide-react";
import { Link } from "../router";
import { brand, resume } from "../content";

export function Resume() {
  return (
    <>
      <section className="sheet page-head">
        <dl className="aside meta">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={"mailto:" + brand.email}>{brand.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={brand.phoneHref}>{brand.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{brand.city}</dd>
          </div>
        </dl>
        <div className="col">
          <h1 className="display">{resume.title}</h1>
          <p className="resume-name">
            {brand.person} — {brand.role}
          </p>
          <p className="lead">{resume.summary}</p>
          <div className="actions no-print">
            <button
              type="button"
              className="btn"
              onClick={() => window.print()}
            >
              <Printer size={18} aria-hidden="true" /> Print or save as PDF
            </button>
            <Link to="/contact" className="btn btn-line">
              <Mail size={18} aria-hidden="true" /> Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="experience">
        <div className="sheet">
          <div className="aside" />
          <div className="col">
            <h2 id="experience">Experience</h2>
          </div>
        </div>
        {resume.experience.map((x) => (
          <div className="sheet resume-row" key={x.org}>
            <p className="aside resume-dates num">{x.dates}</p>
            <div className="col">
              <h3>
                {x.role}, <span className="resume-org">{x.org}</span>
              </h3>
              <p className="resume-where">{x.where}</p>
              <ul className="resume-points">
                {x.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="sheet" aria-labelledby="skills">
        <div className="aside" />
        <div className="col">
          <h2 id="skills">Skills and tools</h2>
          <dl className="skills">
            {resume.skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sheet" aria-labelledby="talks">
        <div className="aside" />
        <div className="col resume-two">
          <div>
            <h2 id="talks">Talks</h2>
            <ul className="resume-list">
              {resume.talks.map((t) => (
                <li key={t.what}>
                  <strong>{t.what}</strong>
                  <span>
                    {t.where}, <span className="num">{t.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Education</h2>
            <ul className="resume-list">
              {resume.education.map((t) => (
                <li key={t.what}>
                  <strong>{t.what}</strong>
                  <span>
                    {t.where}, <span className="num">{t.when}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="resume-refs">{resume.references}</p>
          </div>
        </div>
      </section>
    </>
  );
}
