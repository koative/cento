import { useState } from "react";
import { ArrowLeft, CalendarPlus, Tv } from "lucide-react";
import { Link } from "../router";
import { brand, matches, opponents, type Match } from "../content";
import {
  byDate,
  day,
  divisionOf,
  gameScore,
  isWin,
  longDate,
  playerById,
  scoreline,
  time,
} from "../lib/format";
import { MatchRow } from "../components/MatchRow";
import { RoundTape } from "../components/RoundTape";

/** Download a one-event calendar file; match times are Europe/Amsterdam local time. */
function downloadIcs(m: Match, title: string) {
  const stamp = m.date.replace(/[-:]/g, "") + "00";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Clutch//Matches//EN",
    "BEGIN:VEVENT",
    `UID:${m.id}@clutch.example`,
    `DTSTART;TZID=Europe/Amsterdam:${stamp}`,
    "DURATION:PT3H",
    `SUMMARY:${title}`,
    `LOCATION:${m.venue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${m.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function MatchPage({ match: m }: { match: Match }) {
  const opp = opponents[m.opponent];
  const division = divisionOf(m.division);
  const score = scoreline(m);
  const taped = (m.games ?? []).filter((g) => "tape" in g);
  const [mapIndex, setMapIndex] = useState(taped.length - 1);
  const mvp = m.mvp ? playerById(m.mvp) : undefined;
  const title = `${brand.name} vs ${opp.name} — ${m.event} ${m.stage}`;
  const [saved, setSaved] = useState(false);

  const history = matches
    .filter((x) => x.opponent === m.opponent && x.games && x.id !== m.id)
    .sort(byDate)
    .reverse();
  const around = matches
    .filter((x) => x.division === m.division && x.id !== m.id)
    .sort(byDate)
    .slice(0, 4);
  const shown = taped[mapIndex];

  return (
    <>
      <header className="match-hero">
        <div className="wrap">
          <Link to="/matches" className="text-link back">
            <ArrowLeft aria-hidden="true" /> All matches
          </Link>
          <h1 className="sr-only">{title}</h1>
          <div
            className="big-bug"
            data-result={score ? (isWin(m) ? "win" : "loss") : "upcoming"}
          >
            <div className="bb-team bb-us">
              <span className="bb-tag">{brand.tag}</span>
              <span>{brand.name}</span>
            </div>
            <div
              className="bb-score num"
              aria-label={
                score
                  ? `Final score ${score[0]} to ${score[1]}`
                  : `Starts ${day(m.date)} at ${time(m.date)}`
              }
            >
              {score ? (
                <>
                  <span>{score[0]}</span>
                  <span className="bb-dash">–</span>
                  <span>{score[1]}</span>
                </>
              ) : (
                <span className="bb-time">{time(m.date).slice(0, 5)}</span>
              )}
            </div>
            <div className="bb-team bb-them">
              <span className="bb-tag">{opp.tag}</span>
              <span>{opp.name}</span>
            </div>
          </div>
          <p className="match-meta">
            <span>{score ? (isWin(m) ? "Win" : "Loss") : "Upcoming"}</span>
            <span>{division.game}</span>
            <span>
              {m.event} · {m.stage}
            </span>
            <span>
              {longDate(m.date)}, {time(m.date)}
            </span>
            <span>{m.format}</span>
            <span>{m.venue}</span>
          </p>
        </div>
      </header>

      {m.games ? (
        <>
          <section className="wrap section match-recap">
            <div className="prose">
              <h2>How it went</h2>
              <p>{m.recap}</p>
              {mvp && (
                <p className="mvp">
                  Player of the match:{" "}
                  <Link to={`/players/${mvp.id}`}>{mvp.handle}</Link>
                </p>
              )}
            </div>
            <div className="table-wrap">
              <table className="games">
                <caption className="sr-only">
                  Score by {m.division === "fault-line" ? "map" : "game"}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">
                      {m.division === "fault-line" ? "Map" : "Game"}
                    </th>
                    <th scope="col">{brand.tag}</th>
                    <th scope="col">{opp.tag}</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {m.games.map((g) => {
                    const [us, them] = gameScore(g);
                    return (
                      <tr key={g.name} data-win={us > them ? "" : undefined}>
                        <th scope="row">{g.name}</th>
                        <td className="num">{us}</td>
                        <td className="num">{them}</td>
                        <td>{g.detail}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {shown && "tape" in shown && (
            <section
              className="section section-deck"
              aria-labelledby="replay-h"
            >
              <div className="wrap">
                <div className="section-head">
                  <h2 id="replay-h">Round by round</h2>
                  {taped.length > 1 && (
                    <div
                      className="segmented"
                      role="group"
                      aria-label="Choose map"
                    >
                      {taped.map((g, i) => (
                        <button
                          key={g.name}
                          type="button"
                          aria-pressed={i === mapIndex}
                          onClick={() => setMapIndex(i)}
                        >
                          {g.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <RoundTape
                  key={shown.name}
                  id={`m${mapIndex}`}
                  tape={shown.tape}
                  moments={shown.moments}
                  map={shown.name}
                  opponent={opp.tag}
                />
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="wrap section match-preview">
          <div className="prose">
            <h2>Preview</h2>
            <p>{m.preview}</p>
            <div className="actions">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  downloadIcs(m, title);
                  setSaved(true);
                }}
              >
                <CalendarPlus aria-hidden="true" /> Add to calendar
              </button>
              <a
                className="btn btn-ghost"
                href="https://www.twitch.tv/"
                target="_blank"
                rel="noreferrer"
              >
                <Tv aria-hidden="true" /> Watch on Twitch
              </a>
            </div>
            <p className="quiet" aria-live="polite">
              {saved
                ? "Calendar file downloaded — open it to add the match."
                : ""}
            </p>
          </div>
          <div className="h2h">
            <h2>Head to head this season</h2>
            {history.length ? (
              <ul className="match-list compact">
                {history.map((x) => (
                  <MatchRow key={x.id} match={x} />
                ))}
              </ul>
            ) : (
              <p className="empty">
                First meeting with {opp.name} this season.
              </p>
            )}
          </div>
        </section>
      )}

      <section className="wrap section" aria-labelledby="lineup-h">
        <h2 id="lineup-h">{m.games ? "Lineup" : "Expected lineup"}</h2>
        <ul className="lineup">
          {m.lineup.map((id) => {
            const p = playerById(id)!;
            return (
              <li key={id}>
                <Link to={`/players/${p.id}`}>
                  <span className="num">
                    {String(p.number).padStart(2, "0")}
                  </span>
                  <strong>{p.handle}</strong>
                  <span>{p.role}</span>
                </Link>
              </li>
            );
          })}
          <li className="lineup-coach">
            <span>Coach</span>
            <strong>{division.coach.handle}</strong>
            <span>{division.coach.name}</span>
          </li>
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="more-h">
        <h2 id="more-h">More {division.game}</h2>
        <ul className="match-list">
          {around.map((x) => (
            <MatchRow key={x.id} match={x} />
          ))}
        </ul>
      </section>
    </>
  );
}
