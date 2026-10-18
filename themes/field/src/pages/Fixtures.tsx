import { useState } from "react";
import { brand, clubToday, tables, teams } from "../content";
import { byMonth, fmtDate, outcome, results, upcoming } from "../lib/club";
import { PageHead } from "../components/Bits";
import { FixtureRow, LeagueTable } from "../components/Match";

type View = "fixtures" | "results" | "tables";
type Venue = "all" | "home" | "away";
const views: { id: View; label: string }[] = [
  { id: "fixtures", label: "Fixtures" },
  { id: "results", label: "Results" },
  { id: "tables", label: "League tables" },
];

export function Fixtures() {
  const [view, setView] = useState<View>("fixtures");
  const [team, setTeam] = useState("all");
  const [venue, setVenue] = useState<Venue>("all");

  const source = view === "results" ? results() : upcoming();
  const list = source.filter(
    (f) =>
      (team === "all" || f.team === team) &&
      (venue === "all" || f.home === (venue === "home")),
  );
  const tally = { W: 0, D: 0, L: 0 };
  for (const f of list) {
    const o = outcome(f);
    if (o) tally[o]++;
  }

  return (
    <>
      <PageHead
        title="Fixtures & results"
        lede={`Every game for every Field United team this season, updated by the fixtures secretary on Monday mornings. As of ${fmtDate(clubToday, "day")}.`}
      />
      <section className="section-tight">
        <div className="wrap">
          <div className="filters">
            <fieldset className="segmented segmented-lg">
              <legend className="sr-only">Show</legend>
              {views.map((v) => (
                <label key={v.id}>
                  <input
                    type="radio"
                    name="view"
                    checked={view === v.id}
                    onChange={() => setView(v.id)}
                  />
                  <span>{v.label}</span>
                </label>
              ))}
            </fieldset>
            {view !== "tables" && (
              <div className="filter-selects">
                <div className="field field-inline">
                  <label htmlFor="fx-team">Team</label>
                  <select
                    id="fx-team"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                  >
                    <option value="all">All teams</option>
                    {teams.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field field-inline">
                  <label htmlFor="fx-venue">Venue</label>
                  <select
                    id="fx-venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value as Venue)}
                  >
                    <option value="all">Home &amp; away</option>
                    <option value="home">Home ({brand.ground})</option>
                    <option value="away">Away</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {view === "tables" ? (
            <div className="tables-stack">
              {Object.values(tables).map((t) => (
                <LeagueTable key={t.league} league={t.league} rows={t.rows} />
              ))}
              <p className="muted">
                Reserves and Under-16 tables are kept by their leagues and
                published monthly. In line with FA guidance, there are no league
                tables for Under-11s, Mini Kickers or walking football.
              </p>
            </div>
          ) : (
            <>
              <p className="count" role="status">
                {list.length} {view === "results" ? "results" : "fixtures"}
                {view === "results" &&
                  list.length > 0 &&
                  ` · won ${tally.W}, drawn ${tally.D}, lost ${tally.L}`}
              </p>
              {list.length ? (
                byMonth(list).map((g) => (
                  <section key={g.month} className="month" aria-label={g.month}>
                    <h2 className="month-title">{g.month}</h2>
                    <ol className="fixture-list">
                      {g.items.map((f) => (
                        <FixtureRow key={f.id} f={f} />
                      ))}
                    </ol>
                  </section>
                ))
              ) : (
                <div className="empty">
                  <p>
                    No {view} for that team{" "}
                    {venue === "all"
                      ? ""
                      : venue === "home"
                        ? "at home"
                        : "away"}{" "}
                    yet. Try "Home &amp; away" or another team.
                  </p>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setTeam("all");
                      setVenue("all");
                    }}
                  >
                    Show every team
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
