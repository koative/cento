import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { categories, classes, slots, type GymClass } from "../content";
import { byTime, trainerById } from "../lib";
import { Disc } from "../components/Marks";
import { ClassRow, Intensity, SessionList } from "../components/Sessions";

export function ClassPage({ c }: { c: GymClass }) {
  const sessions = slots.filter((s) => s.classId === c.id).sort(byTime);
  const coaches = [...new Set(sessions.map((s) => s.trainerId))].map((id) =>
    trainerById(id)!,
  );
  const family = categories.find((x) => x.id === c.category)!;
  const related = classes
    .filter((x) => x.id !== c.id)
    .sort(
      (a, b) =>
        Number(a.category === c.category) - Number(b.category === c.category),
    )
    .slice(0, 3);
  let elapsed = 0;

  return (
    <>
      <nav className="wrap crumbs" aria-label="Breadcrumb">
        <Link to="/classes">Classes</Link> <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">{c.name}</span>
      </nav>

      <section className="wrap detail-hero">
        <div className="detail-copy">
          <h1>{c.name}</h1>
          <p className="lede">{c.summary}</p>
          <dl className="facts">
            <div>
              <dt>Type</dt>
              <dd>
                <Disc category={c.category} label />
              </dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{c.minutes} min</dd>
            </div>
            <div>
              <dt>Group</dt>
              <dd>Up to {c.capacity}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{c.room}</dd>
            </div>
            <div>
              <dt>Level</dt>
              <dd>{c.level}</dd>
            </div>
            <div>
              <dt>Intensity</dt>
              <dd>
                <Intensity value={c.intensity} />
              </dd>
            </div>
          </dl>
          <div className="actions">
            <Link
              to={c.id === "foundations" ? "/join" : `/join?plan=classes`}
              className="btn btn-primary"
            >
              {c.id === "foundations"
                ? "Join and start Foundations"
                : `Join to book ${c.name}`}
            </Link>
            <Link to="/timetable" className="btn btn-ghost">
              Timetable
            </Link>
          </div>
        </div>
        <img
          src={c.image.src}
          alt={c.image.alt}
          width={c.image.w}
          height={c.image.h}
          className="detail-img"
        />
      </section>

      <section className="wrap section detail-body">
        <div className="prose">
          <h2>About the class</h2>
          {c.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h2>Bring</h2>
          <ul className="ticks">
            {c.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="run">
          <h2>How the {c.minutes} minutes run</h2>
          <ol className="run-list">
            {c.blocks.map((b) => {
              const start = elapsed;
              elapsed += b.minutes;
              return (
                <li
                  key={b.name}
                  style={{ ["--share" as string]: b.minutes / c.minutes }}
                >
                  <span className="run-clock">
                    {start}–{elapsed}′
                  </span>
                  <div>
                    <h3>{b.name}</h3>
                    <p>{b.detail}</p>
                  </div>
                  <span
                    className="run-bar"
                    aria-hidden="true"
                    style={{ ["--c" as string]: family.plate }}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="this-week">
        <div className="wrap detail-week">
          <div>
            <h2 id="this-week">This week</h2>
            <p>
              {sessions.length} {sessions.length === 1 ? "session" : "sessions"}
              , coached by{" "}
              {coaches.map((t, i) => (
                <span key={t.id}>
                  {i > 0 && (i === coaches.length - 1 ? " and " : ", ")}
                  <Link to={`/trainers/${t.id}`}>{t.name}</Link>
                </span>
              ))}
              .
            </p>
          </div>
          <SessionList items={sessions} withDay hide="class" />
        </div>
      </section>

      <section className="wrap section" aria-labelledby="related">
        <div className="section-head">
          <h2 id="related">Pairs well with</h2>
          <Link to="/classes" className="text-link">
            All classes <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="class-list">
          {related.map((r) => (
            <ClassRow
              key={r.id}
              c={r}
              perWeek={slots.filter((s) => s.classId === r.id).length}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
