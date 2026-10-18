import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { classes, effortLabels, teachers, type ClassType } from "../content";
import { bookHref, Effort, SessionRow } from "../components/SessionRow";
import { ClassTile } from "../components/ClassTile";
import { sessionsOn, upcomingDays } from "../lib/week";

export function ClassPage({ cls }: { cls: ClassType }) {
  const slots = upcomingDays()
    .flatMap((d) => sessionsOn(d))
    .filter((s) => s.session.cls === cls.slug);
  const next = slots.find((s) => !s.started && s.left > 0);
  const leads = teachers.filter((t) => t.teaches.includes(cls.slug));
  const related = classes
    .filter((c) => c.slug !== cls.slug)
    .sort(
      (a, b) =>
        Number(b.focus === cls.focus) - Number(a.focus === cls.focus) ||
        Math.abs(a.effort - cls.effort) - Math.abs(b.effort - cls.effort),
    )
    .slice(0, 3);

  return (
    <article className="detail">
      <div className="wrap">
        <Link to="/classes" className="back">
          <ArrowLeft aria-hidden="true" size={16} /> All classes
        </Link>
      </div>

      <header className="wrap detail-head">
        <div>
          <h1>{cls.name}</h1>
          <p className="lead">{cls.summary}</p>
          <dl className="facts">
            <div>
              <dt>Length</dt>
              <dd>{cls.minutes} minutes</dd>
            </div>
            <div>
              <dt>Effort</dt>
              <dd>
                <Effort level={cls.effort} />
              </dd>
            </div>
            <div>
              <dt>Family</dt>
              <dd>{cls.focus}</dd>
            </div>
            <div>
              <dt>Room</dt>
              <dd>{cls.room}</dd>
            </div>
          </dl>
          {next && (
            <Link to={bookHref(next)} className="btn btn-primary">
              Book{" "}
              {next.day.label === "Today" || next.day.label === "Tomorrow"
                ? next.day.label.toLowerCase()
                : next.day.label}{" "}
              at {next.session.time} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          )}
        </div>
        <figure className="detail-image">
          <img
            src={cls.image.src}
            alt={cls.image.alt}
            width={cls.image.w}
            height={cls.image.h}
          />
        </figure>
      </header>

      <section className="wrap detail-body">
        <div className="prose">
          {cls.intro.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <aside className="detail-side">
          <h2>It's for you if</h2>
          <ul className="ticks">
            {cls.forYou.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <h2>What to bring</h2>
          <ul className="ticks">
            {cls.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="wrap arc" aria-labelledby="arc-title">
        <h2 id="arc-title">The shape of the {cls.minutes} minutes</h2>
        <ol className="arc-bar" aria-hidden="true">
          {cls.arc.map((a, i) => {
            const end = cls.arc[i + 1]?.at ?? cls.minutes;
            return (
              <li key={a.title} style={{ flexGrow: end - a.at }}>
                <span>{a.title}</span>
              </li>
            );
          })}
        </ol>
        <ol className="arc-list">
          {cls.arc.map((a, i) => (
            <li key={a.title}>
              <span className="arc-at">
                {a.at}–{cls.arc[i + 1]?.at ?? cls.minutes} min
              </span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
        <p className="fine">
          Effort scale: {effortLabels.slice(1).join(", ")}. Every class has a
          quieter option at every stage.
        </p>
      </section>

      <section className="wrap detail-week" aria-labelledby="week-title">
        <h2 id="week-title">{cls.name} in the next seven days</h2>
        <ul className="sessions">
          {slots.map((s) => (
            <SessionRow key={s.session.id + s.day.iso} slot={s} withDay />
          ))}
        </ul>
      </section>

      <section className="wrap leads" aria-labelledby="leads-title">
        <h2 id="leads-title">Taught by</h2>
        <ul className="leads-list">
          {leads.map((t) => (
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
                  {t.short}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap related" aria-labelledby="related-title">
        <h2 id="related-title">You might also like</h2>
        <ul className="class-grid class-grid-3">
          {related.map((c) => (
            <li key={c.slug}>
              <ClassTile c={c} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
