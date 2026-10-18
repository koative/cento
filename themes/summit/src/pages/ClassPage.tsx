import { ArrowRight } from "lucide-react";
import { classes, coach, type ClassItem } from "../content";
import { Link } from "../router";
import { money, shortDate } from "../lib/format";
import { upcomingSessions } from "../lib/schedule";

export function ClassPage({ item }: { item: ClassItem }) {
  const sessions = upcomingSessions(28, item).slice(0, 5);
  const teacher = coach(item.coach);
  const related = classes
    .filter(
      (c) =>
        c.id !== item.id && (c.level === item.level || c.kind === item.kind),
    )
    .slice(0, 3);

  return (
    <>
      <section className="detail-hero wrap">
        <div className="detail-copy">
          <p className="crumbs">
            <Link to="/classes">Classes</Link> / {item.kind}
          </p>
          <h1>{item.name}</h1>
          <p className="lead">{item.summary}</p>
          <dl className="spec-grid">
            <div>
              <dt>Level</dt>
              <dd>{item.level}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{item.duration}</dd>
            </div>
            <div>
              <dt>Ages</dt>
              <dd>{item.ages}</dd>
            </div>
            <div>
              <dt>Group size</dt>
              <dd>Up to {item.capacity}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd className="num">
                {money(item.price)}
                {item.sessions > 1 ? ` for ${item.sessions} sessions` : ""}
              </dd>
            </div>
            <div>
              <dt>Coach</dt>
              <dd>{teacher.name}</dd>
            </div>
          </dl>
          <Link to={`/book?class=${item.id}`} className="btn btn-tape">
            Book {item.name} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <img
          src={item.image}
          alt={item.alt}
          className="detail-img"
          width={768}
          height={1024}
        />
      </section>

      <section className="wrap detail-body">
        <div className="prose">
          {item.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>What you'll learn</h2>
          <ul className="ticks-list">
            {item.learn.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <h2>
            {item.sessions > 1 ? "Session by session" : "How the session runs"}
          </h2>
          <ol className="plan-list">
            {item.plan.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
          <h2>Bring</h2>
          <ul className="ticks-list">
            {item.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <aside className="detail-side">
          <h2 className="h-sm">
            {item.sessions > 1 ? "Next course starts" : "Next sessions"}
          </h2>
          <ul className="date-list">
            {sessions.map((s) => (
              <li key={s.date + s.time}>
                <span>
                  {shortDate(s.date)} · <span className="num">{s.time}</span>
                </span>
                <Link
                  to={`/book?class=${item.id}&date=${s.date}`}
                  className="text-link"
                >
                  Book <span className="sr-only">{shortDate(s.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="coach-note">
            <h2 className="h-sm">Your coach</h2>
            <p>
              <strong>{teacher.name}</strong> · {teacher.role}
            </p>
            <p>{teacher.bio}</p>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="wrap related" aria-labelledby="related-title">
          <h2 id="related-title" className="h-sm">
            You might also like
          </h2>
          <ul className="related-list">
            {related.map((c) => (
              <li key={c.id}>
                <Link to={`/classes/${c.id}`} className="related-item">
                  <img
                    src={c.image}
                    alt=""
                    width={320}
                    height={240}
                    loading="lazy"
                  />
                  <span>
                    <strong>{c.name}</strong>
                    {c.kind} · {c.level} · {money(c.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
