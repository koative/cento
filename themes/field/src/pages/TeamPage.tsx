import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { articles, brand, tables, teams, type Team } from "../content";
import { form, outcomeLabel, posName, results, upcoming } from "../lib/club";
import { ArticleCard, Img } from "../components/Bits";
import { FixtureRow, LeagueTable } from "../components/Match";
import { Shirt } from "../components/Kit";
import { TeamSheet } from "../components/TeamSheet";

export function TeamPage({ team }: { team: Team }) {
  const next = upcoming(team.slug);
  const past = results(team.slug);
  const recent = form(team.slug);
  const table = tables[team.slug];
  const news = articles.filter((a) => a.team === team.slug);
  const others = teams
    .filter((t) => t.slug !== team.slug && t.group === team.group)
    .concat(teams.filter((t) => t.group !== team.group))
    .slice(0, 3);
  const order = { GK: 0, DF: 1, MF: 2, FW: 3 };
  const squad = [...team.squad].sort(
    (a, b) => order[a.pos] - order[b.pos] || a.n - b.n,
  );

  return (
    <>
      <header className="team-head">
        <div className="wrap team-head-grid">
          <div>
            <p className="crumbs">
              <Link to="/teams">Teams</Link> / {team.group}
            </p>
            <h1>{team.name}</h1>
            <p className="lede">{team.lede}</p>
            <dl className="team-facts team-facts-head">
              <div>
                <dt>League</dt>
                <dd>{team.league}</dd>
              </div>
              <div>
                <dt>Matchday</dt>
                <dd>{team.matchday}</dd>
              </div>
              <div>
                <dt>Home</dt>
                <dd>
                  {brand.ground}, {team.pitch}
                </dd>
              </div>
              <div>
                <dt>Ages</dt>
                <dd>
                  {team.ages}, {team.format}-a-side
                </dd>
              </div>
            </dl>
            {team.scores && recent.length > 0 && (
              <div className="form-guide">
                <span>Form</span>
                <ol aria-label="Last results, most recent first">
                  {recent.map((o, i) => (
                    <li
                      key={i}
                      className="outcome"
                      data-o={o}
                      title={outcomeLabel[o]}
                    >
                      <span aria-hidden="true">{o}</span>
                      <span className="sr-only">{outcomeLabel[o]}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          <Img photo={team.photo} lazy={false} className="team-photo" />
        </div>
      </header>

      <div className="wrap">
        <TeamSheet team={team} next={next[0]} />
      </div>

      <section className="section" aria-labelledby="games-title">
        <div className="wrap">
          <h2 id="games-title">Fixtures &amp; results</h2>
          <div className="games-grid">
            <div>
              <h3>Coming up</h3>
              {next.length ? (
                <ol className="fixture-list">
                  {next.map((f) => (
                    <FixtureRow key={f.id} f={f} showTeam={false} />
                  ))}
                </ol>
              ) : (
                <p className="muted">
                  Nothing scheduled yet. The fixtures secretary publishes new
                  dates every Monday.
                </p>
              )}
            </div>
            <div>
              <h3>Played</h3>
              {past.length ? (
                <ol className="fixture-list">
                  {past.map((f) => (
                    <FixtureRow key={f.id} f={f} showTeam={false} />
                  ))}
                </ol>
              ) : (
                <p className="muted">No games played yet this season.</p>
              )}
              {!team.scores && (
                <p className="muted small">
                  We don't publish scores for under-12 football or mini
                  festivals.
                </p>
              )}
            </div>
          </div>
          {table && (
            <div className="team-table">
              <LeagueTable league={table.league} rows={table.rows} />
            </div>
          )}
        </div>
      </section>

      <section className="section paper-2" aria-labelledby="squad-title">
        <div className="wrap squad-grid">
          <div>
            <h2 id="squad-title">The squad</h2>
            <div className="table-wrap">
              <table className="squad">
                <caption className="sr-only">
                  {team.name} squad, season statistics
                </caption>
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Player</th>
                    <th scope="col">Position</th>
                    <th scope="col">Apps</th>
                    {team.scores && <th scope="col">Goals</th>}
                    <th scope="col" className="hide-sm">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {squad.map((p) => (
                    <tr key={p.n}>
                      <td className="num">{p.n}</td>
                      <th scope="row">
                        {p.name}
                        {p.n === team.captain && (
                          <span className="cap"> (captain)</span>
                        )}
                      </th>
                      <td>{posName[p.pos]}</td>
                      <td className="num">{p.apps}</td>
                      {team.scores && <td className="num">{p.goals}</td>}
                      <td className="num hide-sm">{p.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="team-side">
            {team.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h3>Coaches</h3>
            <ul className="people">
              {team.coaches.map((c) => (
                <li key={c.name}>
                  <b>{c.name}</b>
                  <span>
                    {c.role} · {c.badge}
                  </span>
                </li>
              ))}
            </ul>
            <h3>Training</h3>
            <ul className="people">
              {team.training.map((s) => (
                <li key={s.day}>
                  <b className="num">
                    {s.day} {s.start}–{s.end}
                  </b>
                  <span>{s.where}</span>
                </li>
              ))}
            </ul>
            <Link to={`/join?team=${team.slug}`} className="btn btn-primary">
              Play for the {team.short}{" "}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="section" aria-labelledby="team-news">
          <div className="wrap">
            <h2 id="team-news">From the touchline</h2>
            <div className="news-grid news-grid-2">
              {news.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight" aria-labelledby="other-teams">
        <div className="wrap">
          <h2 id="other-teams">Other teams</h2>
          <ul className="kit-rail kit-rail-3">
            {others.map((t) => (
              <li key={t.slug}>
                <Link to={`/teams/${t.slug}`}>
                  <Shirt n={t.captain} size={72} />
                  <b>{t.short}</b>
                  <span>{t.ages}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
