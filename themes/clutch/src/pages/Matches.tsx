import { useState } from "react";
import { divisions, matches, standings, type DivisionId } from "../content";
import { byDate, isWin } from "../lib/format";
import { MatchRow } from "../components/MatchRow";
import { StandingsTable } from "../components/StandingsTable";

type View = "upcoming" | "results";

export function Matches() {
  const [view, setView] = useState<View>("upcoming");
  const [division, setDivision] = useState<DivisionId | "all">("all");

  const list = matches
    .filter((m) => (view === "upcoming" ? !m.games : !!m.games))
    .filter((m) => division === "all" || m.division === division)
    .sort(byDate);
  if (view === "results") list.reverse();

  const played = list.filter((m) => m.games);
  const wins = played.filter(isWin).length;

  return (
    <>
      <header className="page-head wrap">
        <h1>Matches</h1>
        <p className="lede">
          Every match across the three divisions. Times are Rotterdam time; home
          Fault Line matches are screened at Clutch House.
        </p>
      </header>

      <section className="wrap" aria-label="Schedule">
        <div className="toolbar">
          <div className="segmented" role="group" aria-label="Show">
            {(["upcoming", "results"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
              >
                {v === "upcoming" ? "Upcoming" : "Results"}
              </button>
            ))}
          </div>
          <label className="select">
            <span>Division</span>
            <select
              value={division}
              onChange={(e) =>
                setDivision(e.target.value as DivisionId | "all")
              }
            >
              <option value="all">All divisions</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.game}
                </option>
              ))}
            </select>
          </label>
          <p className="toolbar-count num" aria-live="polite">
            {view === "results"
              ? `${played.length} played · ${wins} won · ${played.length - wins} lost`
              : `${list.length} ${list.length === 1 ? "match" : "matches"} scheduled`}
          </p>
        </div>

        {list.length ? (
          <ul className="match-list">
            {list.map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </ul>
        ) : (
          <p className="empty">
            No {view === "upcoming" ? "upcoming matches" : "results"} for this
            division yet this season. Iron Verdict entries are confirmed when
            each open publishes its bracket.
          </p>
        )}
      </section>

      <section
        className="wrap section standings-block"
        aria-labelledby="table-h"
      >
        <h2 id="table-h">{standings.title}</h2>
        <p>{standings.note}</p>
        <StandingsTable />
      </section>
    </>
  );
}
