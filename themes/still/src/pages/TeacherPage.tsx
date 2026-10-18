import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { classes, teachers, type Teacher } from "../content";
import { SessionRow } from "../components/SessionRow";
import { ClassTile } from "../components/ClassTile";
import { sessionsOn, upcomingDays } from "../lib/week";

export function TeacherPage({ teacher }: { teacher: Teacher }) {
  const first = teacher.name.split(" ")[0];
  const slots = upcomingDays()
    .flatMap((d) => sessionsOn(d))
    .filter((s) => s.session.teacher === teacher.slug);
  const others = teachers.filter((t) => t.slug !== teacher.slug);

  return (
    <article className="detail">
      <div className="wrap">
        <Link to="/teachers" className="back">
          <ArrowLeft aria-hidden="true" size={16} /> All teachers
        </Link>
      </div>

      <header className="wrap profile-head">
        <figure className="profile-photo">
          <img
            src={teacher.image.src}
            alt={teacher.image.alt}
            width={teacher.image.w}
            height={teacher.image.h}
          />
        </figure>
        <div>
          <h1>{teacher.name}</h1>
          <p className="roster-role">
            {teacher.role} · at Still since {teacher.since}
          </p>
          <blockquote className="profile-quote">{teacher.quote}</blockquote>
          <div className="prose">
            {teacher.bio.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <h2 className="small-head">Training</h2>
          <ul className="ticks">
            {teacher.training.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </header>

      <section className="wrap detail-week" aria-labelledby="week-title">
        <h2 id="week-title">{first}'s next seven days</h2>
        <ul className="sessions">
          {slots.map((s) => (
            <SessionRow key={s.session.id + s.day.iso} slot={s} withDay />
          ))}
        </ul>
      </section>

      <section className="wrap related" aria-labelledby="teaches-title">
        <h2 id="teaches-title">Classes {first} teaches</h2>
        <ul className="class-grid class-grid-3">
          {classes
            .filter((c) => teacher.teaches.includes(c.slug))
            .map((c) => (
              <li key={c.slug}>
                <ClassTile c={c} />
              </li>
            ))}
        </ul>
      </section>

      <section className="wrap leads" aria-labelledby="others-title">
        <h2 id="others-title">The other teachers</h2>
        <ul className="leads-list">
          {others.map((t) => (
            <li key={t.slug}>
              <Link to={`/teachers/${t.slug}`}>
                <img
                  src={t.image.src}
                  alt=""
                  width={t.image.w}
                  height={t.image.h}
                  loading="lazy"
                />
                <span>
                  <strong>{t.name}</strong>
                  {t.role}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
