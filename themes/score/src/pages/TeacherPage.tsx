import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { teachers, type Hours, type Teacher } from "../content";
import { clock } from "../lib/format";
import { programmeBySlug } from "../lib/school";
import { Coda } from "../components/Bits";

const DAYS = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function TeacherPage({ t }: { t: Teacher }) {
  const colleagues = teachers
    .filter(
      (o) =>
        o.slug !== t.slug && o.programmes.some((p) => t.programmes.includes(p)),
    )
    .slice(0, 3);
  const days = (
    Object.entries(t.hours) as [string, NonNullable<Hours[1]>][]
  ).map(([d, [from, to]]) => ({ day: DAYS[Number(d)], from, to }));

  return (
    <div className="page teacher">
      <header className="wrap teacher-head">
        <Link to="/teachers" className="back-link">
          <ArrowLeft aria-hidden="true" /> All teachers
        </Link>
        <h1>{t.name}</h1>
        <p className="teacher-role">{t.role}</p>
        <blockquote className="teacher-quote">
          <p>“{t.quote}”</p>
        </blockquote>
      </header>

      <div className="wrap teacher-body">
        <div className="prose">
          {t.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h2>On the stand this term</h2>
          <ul className="stand-list">
            {t.onTheStand.map((s) => {
              const [composer, piece] = s.includes(" — ")
                ? s.split(" — ")
                : ["", s];
              return (
                <li key={s}>
                  {composer && (
                    <span className="stand-composer">{composer}</span>
                  )}
                  <em>{piece}</em>
                </li>
              );
            })}
          </ul>
        </div>

        <aside
          className="aside-notes teacher-facts"
          aria-label={`About ${t.name}`}
        >
          <dl>
            <div>
              <dt>Teaches</dt>
              <dd>
                {t.programmes.map((s, i) => {
                  const p = programmeBySlug(s);
                  return p ? (
                    <span key={s}>
                      {i > 0 && ", "}
                      <Link to={`/programmes/${s}`}>{p.name}</Link>
                    </span>
                  ) : null;
                })}
              </dd>
            </div>
            <div>
              <dt>At Score since</dt>
              <dd>{t.since}</dd>
            </div>
            <div>
              <dt>Training</dt>
              <dd>{t.training}</dd>
            </div>
            <div>
              <dt>Teaches in</dt>
              <dd>{t.room}</dd>
            </div>
            <div>
              <dt>Teaching days</dt>
              <dd>
                <ul className="day-list">
                  {days.map((d) => (
                    <li key={d.day}>
                      <span>{d.day}</span> {clock(d.from)} – {clock(d.to)}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <Link
            to={`/trial?programme=${t.programmes[0]}&teacher=${t.slug}`}
            className="btn btn-primary"
          >
            Book a trial with {t.name.split(" ")[0]}
          </Link>
        </aside>
      </div>

      {colleagues.length > 0 && (
        <section className="wrap colleagues" aria-labelledby="col-h">
          <h2 id="col-h">In the same department</h2>
          <ul className="roster roster-small">
            {colleagues.map((c) => (
              <li key={c.slug} className="roster-entry">
                <h3>
                  <Link to={`/teachers/${c.slug}`} className="stretched">
                    {c.name}
                  </Link>
                </h3>
                <p className="roster-role">{c.role}</p>
                <p>{c.short}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Coda
        title={`Meet ${t.name.split(" ")[0]} for half an hour.`}
        text="Trial lessons are free, thirty minutes long and happen in the room you'd use every week."
        to={`/trial?programme=${t.programmes[0]}&teacher=${t.slug}`}
        action={`Book a trial with ${t.name.split(" ")[0]}`}
      />
    </div>
  );
}
