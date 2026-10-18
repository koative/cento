import { Link } from "../router";
import {
  brand,
  categories,
  ptRates,
  slots,
  trainers,
  type Trainer,
} from "../content";
import { byTime, money } from "../lib";
import { Disc } from "../components/Marks";
import { SessionList, TrainerCard } from "../components/Sessions";

export function TrainerPage({ t }: { t: Trainer }) {
  const sessions = slots.filter((s) => s.trainerId === t.id).sort(byTime);
  const first = t.name.split(" ")[0];
  const others = trainers
    .filter((x) => x.id !== t.id && x.focus.some((f) => t.focus.includes(f)))
    .slice(0, 3);

  return (
    <>
      <nav className="wrap crumbs" aria-label="Breadcrumb">
        <Link to="/trainers">Trainers</Link> <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">{t.name}</span>
      </nav>

      <section className="wrap profile">
        <img
          src={t.image.src}
          alt={t.image.alt}
          width={t.image.w}
          height={t.image.h}
          className="profile-img"
        />
        <div className="profile-copy">
          <h1>{t.name}</h1>
          <p className="trainer-role">{t.role}</p>
          <p className="profile-quote">“{t.quote}”</p>
          <ul className="profile-focus" aria-label="Coaches">
            {t.focus.map((f) => (
              <li key={f}>
                <Disc category={f} label />
              </li>
            ))}
          </ul>
          <div className="actions">
            <Link
              to={`/join?plan=coached&coach=${t.id}`}
              className="btn btn-primary"
            >
              Train with {first}
            </Link>
            <a
              href={`mailto:${brand.email}?subject=${encodeURIComponent(`Question for ${t.name}`)}`}
              className="btn btn-ghost"
            >
              Ask {first} a question
            </a>
          </div>
        </div>
      </section>

      <section className="wrap section profile-body">
        <div className="prose">
          <h2>About {first}</h2>
          {t.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="profile-facts">
          <div>
            <dt>At Iron since</dt>
            <dd>{t.since}</dd>
          </div>
          <div>
            <dt>Specialties</dt>
            <dd>
              <ul>
                {t.specialties.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Qualifications</dt>
            <dd>
              <ul>
                {t.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Personal training</dt>
            <dd>
              {t.ptDays} · {money(ptRates[0].price)} a session, or{" "}
              {money(ptRates[2].price / ptRates[2].sessions)} in a ten-block
            </dd>
          </div>
        </dl>
      </section>

      <section
        className="section section-tint"
        aria-labelledby="coaches-this-week"
      >
        <div className="wrap detail-week">
          <div>
            <h2 id="coaches-this-week">{first}'s classes this week</h2>
            <p>
              {sessions.length} sessions across{" "}
              {[...new Set(sessions.map((s) => s.classId))].length} classes.{" "}
              {categories
                .filter((c) => t.focus.includes(c.id))
                .map((c) => c.name)
                .join(" and ")}{" "}
              are the specialty.
            </p>
          </div>
          <SessionList items={sessions} withDay hide="trainer" />
        </div>
      </section>
      {others.length > 0 && (
        <section className="wrap section" aria-labelledby="others">
          <h2 id="others">Coaching alongside {first}</h2>
          <ul className="trainer-grid">
            {others.map((o) => (
              <TrainerCard key={o.id} t={o} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
