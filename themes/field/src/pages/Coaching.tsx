import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  coachingIntro,
  coachPathway,
  programmes,
  safeguarding,
  teams,
  type Coach,
  type Team,
} from "../content";
import { trainingWeek } from "../lib/club";
import { Img, PageHead } from "../components/Bits";

const week = trainingWeek();

/** Each coach once, with every team they work with. */
const staff = teams.reduce<(Coach & { teams: Team[] })[]>((all, team) => {
  for (const c of team.coaches) {
    const known = all.find((x) => x.name === c.name);
    if (known) known.teams.push(team);
    else all.push({ ...c, teams: [team] });
  }
  return all;
}, []);

export function Coaching() {
  return (
    <>
      <PageHead title={coachingIntro.title} lede={coachingIntro.lede} />

      <section className="section-tight" aria-labelledby="week-title">
        <div className="wrap">
          <h2 id="week-title">The training week</h2>
          <ol className="board">
            {week.map((d) => (
              <li key={d.id} data-empty={d.sessions.length ? undefined : ""}>
                <h3>{d.label}</h3>
                {d.sessions.length ? (
                  <ul>
                    {d.sessions.map(({ team, s }) => (
                      <li key={team.slug + s.start}>
                        <span className="num">
                          {s.start}–{s.end}
                        </span>
                        <Link to={`/teams/${team.slug}`}>{team.short}</Link>
                        <small>{s.where}</small>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="muted small">Pitches rest</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="programmes-title">
        <div className="wrap">
          <h2 id="programmes-title">Camps, academies and open sessions</h2>
          <div className="programmes">
            {programmes.map((p) => (
              <article key={p.id} className="programme">
                <Img photo={p.photo} />
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.body}</p>
                  <dl className="team-facts">
                    <div>
                      <dt>Who</dt>
                      <dd>{p.who}</dd>
                    </div>
                    <div>
                      <dt>When</dt>
                      <dd>{p.when}</dd>
                    </div>
                    <div>
                      <dt>Cost</dt>
                      <dd>{p.price}</dd>
                    </div>
                  </dl>
                  <Link to="/join" className="text-link">
                    Book a place <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper-2" aria-labelledby="staff-title">
        <div className="wrap staff-grid">
          <div>
            <h2 id="staff-title">The coaches</h2>
            <p>
              Every one a volunteer, every one DBS-checked. Qualifications are
              as held on 1 September; the club renews first-aid every two years.
            </p>
          </div>
          <ul className="staff">
            {staff.map((c) => (
              <li key={c.name}>
                <b>{c.name}</b>
                <span>{c.badge}</span>
                <span className="staff-teams">
                  {c.role},{" "}
                  {c.teams.map((t, i) => (
                    <span key={t.slug}>
                      {i > 0 && " & "}
                      <Link to={`/teams/${t.slug}`}>{t.short}</Link>
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="pathway-title">
        <div className="wrap">
          <h2 id="pathway-title">Become a coach</h2>
          <p className="section-lede">
            Most of our coaches started by holding the cones for their own
            child. Here's the route, and the club pays for every step.
          </p>
          <ol className="steps">
            {coachPathway.map((s, i) => (
              <li key={s.step}>
                <span className="step-n num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.step}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="safe-title">
        <div className="wrap">
          <div className="safeguard">
            <ShieldCheck aria-hidden="true" size={36} />
            <div>
              <h2 id="safe-title">Safeguarding</h2>
              <p>{safeguarding.text}</p>
              <p>
                Welfare officer: <b>{safeguarding.officer}</b>,{" "}
                <a href={`mailto:${brand.welfareEmail}`}>
                  {brand.welfareEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
