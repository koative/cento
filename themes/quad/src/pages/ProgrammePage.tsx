import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { faculties, programmes, type Programme } from "../content";
import { money } from "../lib/format";
import { ModulePlanner } from "../components/ModulePlanner";
import { ProgrammeRow } from "../components/ProgrammeRow";
import { Photo } from "../components/Photo";

export function ProgrammePage({ p }: { p: Programme }) {
  const faculty = faculties.find((f) => f.id === p.faculty)!;
  const related = programmes
    .filter(
      (o) => o.id !== p.id && (o.faculty === p.faculty || o.level === p.level),
    )
    .slice(0, 3);
  const weekly = p.teaching.reduce((s, t) => s + t.hours, 0);

  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/programmes">Programmes</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>

      <header className="wrap prog-head">
        <div className="prog-head-text">
          <h1>{p.title}</h1>
          <p className="prog-code">
            {p.award} · {p.code} · {faculty.name}
          </p>
          <p className="lead">{p.summary}</p>
          <div className="btn-row">
            <Link to="/apply" className="btn btn-primary">
              Apply for {p.start}
            </Link>
            <Link to="/events" className="btn btn-outline">
              Visit us first
            </Link>
          </div>
        </div>
        <Photo img={p.image} className="prog-photo" eager />
      </header>

      <section className="wrap facts" aria-label="Key facts">
        <dl>
          <div>
            <dt>Duration</dt>
            <dd>
              {p.years} {p.years === 1 ? "year" : "years"} full-time
              {p.modes.includes("Part-time") && `, ${p.years * 2} part-time`}
            </dd>
          </div>
          <div>
            <dt>Starts</dt>
            <dd>{p.start}</dd>
          </div>
          <div>
            <dt>Typical offer</dt>
            <dd>{p.entry}</dd>
          </div>
          <div>
            <dt>Fees per year</dt>
            <dd>
              {money(p.fees.home)} home · {money(p.fees.international)}{" "}
              international
            </dd>
          </div>
        </dl>
      </section>

      <section className="wrap prog-overview" aria-labelledby="ov-h">
        <div>
          <h2 id="ov-h">The programme</h2>
          {p.overview.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <ul className="highlights">
          {p.highlights.map((h) => (
            <li key={h}>
              <Check aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </section>

      <div className="section-stone planner-wrap">
        <div className="wrap">
          <ModulePlanner programme={p} />
        </div>
      </div>

      <section className="wrap section split" aria-labelledby="ta-h">
        <div>
          <h2 id="ta-h">A typical week</h2>
          <p>
            About {weekly} hours of study a week in term time, split like this.
          </p>
          <ul className="bars">
            {p.teaching.map((t) => (
              <li key={t.label}>
                <span className="bar-label">{t.label}</span>
                <span className="bar-track">
                  <span
                    className="bar-fill"
                    style={{ width: `${(t.hours / weekly) * 100}%` }}
                  />
                </span>
                <span className="bar-value">{t.hours} h</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>How you're assessed</h2>
          <p>Across the whole degree, by share of the final mark.</p>
          <div
            className="stack-bar"
            role="img"
            aria-label={p.assessment
              .map((a) => `${a.label} ${a.share}%`)
              .join(", ")}
          >
            {p.assessment.map((a, i) => (
              <span
                key={a.label}
                className={`stack-${i}`}
                style={{ flexBasis: `${a.share}%` }}
              />
            ))}
          </div>
          <ul className="stack-key">
            {p.assessment.map((a, i) => (
              <li key={a.label}>
                <span className={`swatch stack-${i}`} aria-hidden="true" />
                {a.label} <strong>{a.share}%</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section careers" aria-labelledby="car-h">
        <h2 id="car-h">Where graduates go</h2>
        <ul>
          {p.careers.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p>
          The Careers Studio works with you from Year 1 and for three years
          after you graduate.
        </p>
      </section>

      <section className="section section-stone" aria-labelledby="rel-h">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2 id="rel-h">You might also look at</h2>
            <Link to="/programmes" className="text-link">
              Programme finder <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="catalogue">
            {related.map((o) => (
              <ProgrammeRow key={o.id} p={o} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
