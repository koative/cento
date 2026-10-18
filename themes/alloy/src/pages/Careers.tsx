import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  careers,
  disciplines,
  images,
  jobs,
  offices,
  type Discipline,
} from "../content";
import { dateLabel } from "../lib/format";

export function Careers() {
  const [discipline, setDiscipline] = useState<Discipline | "All">("All");
  const [office, setOffice] = useState<string>("All");
  const list = jobs.filter(
    (j) =>
      (discipline === "All" || j.discipline === discipline) &&
      (office === "All" || j.location === office),
  );

  return (
    <>
      <header className="wrap careers-head">
        <div>
          <h1>{careers.title}</h1>
          <p className="lede">{careers.intro}</p>
        </div>
        <img
          src={images.columnPour.src}
          alt={images.columnPour.alt}
          width={images.columnPour.w}
          height={images.columnPour.h}
        />
      </header>

      <section className="section wrap" aria-labelledby="roles-h">
        <div className="row-head">
          <h2 id="roles-h">Open roles</h2>
          <p className="result-count" aria-live="polite">
            {list.length} of {jobs.length} roles
          </p>
        </div>
        <div className="filters filters-flat">
          <div className="chip-group" role="group" aria-label="Discipline">
            {(["All", ...disciplines] as const).map((d) => (
              <button
                key={d}
                type="button"
                className="chip"
                aria-pressed={discipline === d}
                onClick={() => setDiscipline(d)}
              >
                {d === "All" ? "All disciplines" : d}
              </button>
            ))}
          </div>
          <label className="select-inline">
            <span>Office</span>
            <select value={office} onChange={(e) => setOffice(e.target.value)}>
              <option value="All">All offices</option>
              {offices.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        </div>

        {list.length ? (
          <ul className="job-list">
            {list.map((j) => (
              <li key={j.id}>
                <Link to={`/careers/${j.id}`} className="job-title">
                  {j.title}
                </Link>
                <span>{j.discipline}</span>
                <span>{j.location}</span>
                <span className="num">{j.pay}</span>
                <span className="num job-close">
                  Closes {dateLabel(j.closes)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No {discipline === "All" ? "" : discipline.toLowerCase() + " "}
              roles open in {office} right now. Send your CV to{" "}
              <a href="mailto:careers@alloy.example">careers@alloy.example</a>{" "}
              and we will keep it on file for six months.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setDiscipline("All");
                setOffice("All");
              }}
            >
              Show all roles
            </button>
          </div>
        )}
      </section>

      <section className="section wrap split">
        <div className="split-head">
          <h2>What you get</h2>
        </div>
        <dl className="ruled-list">
          {careers.benefits.map((b) => (
            <div key={b.name}>
              <dt>{b.name}</dt>
              <dd>{b.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="close-panel">
        <div className="wrap close-grid">
          <div>
            <h2>{careers.apprenticeship.title}</h2>
            <p>{careers.apprenticeship.body}</p>
          </div>
          <div className="close-actions">
            <Link to="/careers/apprenticeship-2027" className="btn btn-ink">
              Apply for 2027 <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <h2>How hiring works</h2>
        <ol className="steps">
          {careers.steps.map((s, i) => (
            <li key={s.name}>
              <span className="step-no num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="quiet measure">{careers.equal}</p>
      </section>
    </>
  );
}
