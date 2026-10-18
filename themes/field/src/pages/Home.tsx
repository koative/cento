import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  articles,
  brand,
  clubToday,
  home,
  photos,
  tables,
  teams,
} from "../content";
import {
  fmtDate,
  results,
  scoreline,
  sides,
  outcome,
  outcomeLabel,
  teamOf,
  trainingWeek,
  upcoming,
} from "../lib/club";
import { ArticleCard, Img } from "../components/Bits";
import { FixtureRow, LeagueTable } from "../components/Match";
import { Shirt } from "../components/Kit";
import { PitchLines } from "../components/TeamSheet";

const next = upcoming("first-team")[0];
const sunday = new Date(clubToday + "T00:00:00Z");
sunday.setUTCDate(sunday.getUTCDate() + ((7 - sunday.getUTCDay()) % 7));
const weekend = upcoming().filter(
  (f) => f.date <= sunday.toISOString().slice(0, 10),
);
const latest = teams
  .map((t) => results(t.slug).find((f) => f.score))
  .filter((f) => f !== undefined)
  .slice(0, 4);
const week = trainingWeek();
const ladder = [...teams].sort((a, b) => a.minAge - b.minAge);
const AGE_MIN = 4;
const AGE_MAX = 85;

export function Home() {
  const [age, setAge] = useState(10);
  const fits = teams.filter((t) => age >= t.minAge && age <= t.maxAge);
  const pct = (n: number) =>
    ((Math.min(n, AGE_MAX) - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100;

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>
              Our game.
              <br />
              Our ground.
              <br />
              <span>Our people.</span>
            </h1>
            <p className="lede">{home.lede}</p>
            <div className="actions">
              <Link to="/teams" className="btn btn-primary">
                Find your team <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link to="/fixtures" className="btn btn-ghost">
                Fixtures &amp; results
              </Link>
            </div>
          </div>
          <div className="hero-media">
            <Img photo={photos.hero} lazy={false} />
            {next && (
              <Link to="/fixtures" className="next-card">
                <PitchLines />
                <span className="next-label">
                  {next.home ? `Next at ${brand.ground}` : "Next match"}
                </span>
                <span className="next-teams">
                  {sides(next).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </span>
                <span className="next-when num">
                  {fmtDate(next.date, "full")} · {next.ko}
                </span>
                <span className="next-meta">
                  {teamOf(next.team)?.name} · {next.comp} ·{" "}
                  {teamOf(next.team)?.pitch}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section weekend" aria-labelledby="weekend-title">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="weekend-title">This weekend</h2>
            <p>
              {weekend.length} games across Saturday and Sunday. Home games are
              on {brand.ground}; the tea hut opens an hour before the first
              kick-off.
            </p>
            <Link to="/fixtures" className="text-link">
              Full fixture list <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ol className="fixture-list">
            {weekend.map((f) => (
              <FixtureRow key={f.id} f={f} />
            ))}
          </ol>
        </div>
      </section>

      <section className="section results-band" aria-labelledby="results-title">
        <div className="wrap">
          <h2 id="results-title">Last time out</h2>
          <ul className="scoreboard">
            {latest.map((f) => {
              const s = scoreline(f) as number[];
              const o = outcome(f);
              return (
                <li key={f.id}>
                  <p className="sb-team">
                    {teamOf(f.team)?.short} · {fmtDate(f.date)}
                  </p>
                  <p className="sb-line">
                    <span>{sides(f)[0]}</span>
                    <b className="num">
                      {s[0]}–{s[1]}
                    </b>
                    <span>{sides(f)[1]}</span>
                  </p>
                  <p className="sb-foot">
                    {o && (
                      <span className="outcome" data-o={o}>
                        {outcomeLabel[o]}
                      </span>
                    )}
                    {f.report && (
                      <Link to={`/news/${f.report}`}>Match report</Link>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="kit-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="kit-title">Eight teams, one shirt</h2>
            <Link to="/teams" className="text-link">
              All teams <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ul className="kit-rail">
            {teams.map((t) => (
              <li key={t.slug}>
                <Link to={`/teams/${t.slug}`}>
                  <Shirt n={t.captain} size={88} />
                  <b>{t.short}</b>
                  <span>{t.ages}</span>
                  <span>{t.matchday.split(",")[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pathway" aria-labelledby="pathway-title">
        <div className="wrap pathway-grid">
          <div>
            <h2 id="pathway-title">{home.pathwayTitle}</h2>
            <p>{home.pathwayLede}</p>
            <div className="age-pick">
              <label htmlFor="age">
                Age on 31 August:{" "}
                <b className="num">{age >= AGE_MAX ? `${AGE_MAX}+` : age}</b>
              </label>
              <input
                id="age"
                type="range"
                min={AGE_MIN}
                max={AGE_MAX}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                aria-valuetext={`${age} years old`}
              />
            </div>
            <div className="age-result" aria-live="polite">
              {fits.length ? (
                <ul>
                  {fits.map((t) => (
                    <li key={t.slug}>
                      <Link to={`/teams/${t.slug}`}>
                        {t.name} <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  No team for {age}-year-olds yet. Our Under-13 boys have a
                  waiting list and adult players can join from 16:{" "}
                  <Link to="/join">tell us you're interested</Link>.
                </p>
              )}
            </div>
          </div>
          <div className="ladder" aria-hidden="true">
            {ladder.map((t) => (
              <div
                key={t.slug}
                className="rung-row"
                data-on={age >= t.minAge && age <= t.maxAge ? "" : undefined}
              >
                <span className="rung-label">{t.short}</span>
                <span className="rung-track">
                  <span
                    className="rung"
                    style={{
                      left: `${pct(t.minAge)}%`,
                      width: `${pct(t.maxAge + 1) - pct(t.minAge)}%`,
                    }}
                  />
                </span>
              </div>
            ))}
            <div className="ladder-axis">
              {[4, 10, 20, 30, 40, 50, 60, 70, 85].map((n) => (
                <span key={n} style={{ left: `${pct(n)}%` }}>
                  {n === 85 ? "85+" : n}
                </span>
              ))}
              <span
                className="ladder-marker"
                style={{ left: `${pct(age)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section training" aria-labelledby="training-title">
        <div className="wrap training-grid">
          <Img photo={photos.keeper} className="training-photo" />
          <div>
            <h2 id="training-title">{home.coachingTitle}</h2>
            <dl className="week">
              {week
                .filter((d) => d.sessions.length)
                .map((d) => (
                  <div key={d.id}>
                    <dt>{d.label}</dt>
                    <dd>
                      {d.sessions.map(({ team, s }) => (
                        <span key={team.slug + s.start}>
                          <span className="num">{s.start}</span>{" "}
                          <Link to={`/teams/${team.slug}`}>{team.short}</Link>
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
            </dl>
            <Link to="/coaching" className="text-link">
              Camps, keeper academy and coaching courses{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section tables-band" aria-labelledby="tables-title">
        <div className="wrap">
          <h2 id="tables-title">Where we stand</h2>
          <div className="tables-grid">
            <LeagueTable
              league={tables["first-team"].league}
              rows={tables["first-team"].rows}
              compact
            />
            <LeagueTable
              league={tables.women.league}
              rows={tables.women.rows}
              compact
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="news-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="news-title">Club news</h2>
            <Link to="/news" className="text-link">
              All news <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="news-grid">
            {articles.slice(0, 3).map((a, i) => (
              <ArticleCard key={a.slug} a={a} lead={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-band" aria-label="From the tea hut">
        <div className="wrap quote-grid">
          <figure>
            <blockquote>
              <p>{home.communityQuote.text}</p>
            </blockquote>
            <figcaption>{home.communityQuote.who}</figcaption>
          </figure>
          <Img photo={photos.clubhouse} />
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <PitchLines />
        <div className="wrap close-inner">
          <h2 id="close-title">{home.closeTitle}</h2>
          <p>{home.closeLede}</p>
          <div className="actions">
            <Link to="/join" className="btn btn-gold">
              Join the club <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link to="/coaching" className="btn btn-chalk">
              Come to a session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
