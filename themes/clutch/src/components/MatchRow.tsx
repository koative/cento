import { Link } from "../router";
import { opponents, type Match } from "../content";
import { day, divisionOf, isWin, scoreline, time } from "../lib/format";

/** One line of the schedule: date, game and event, opponent, then the score or the start time. */
export function MatchRow({ match }: { match: Match }) {
  const score = scoreline(match);
  const opp = opponents[match.opponent];
  const result = score ? (isWin(match) ? "win" : "loss") : "upcoming";
  return (
    <li className="match-row" data-result={result}>
      <Link to={`/matches/${match.id}`}>
        <span className="mr-date">
          <strong>{day(match.date)}</strong>
          <span>{time(match.date)}</span>
        </span>
        <span className="mr-event">
          <strong>{divisionOf(match.division).game}</strong>
          <span>
            {match.event} · {match.stage}
          </span>
        </span>
        <span className="mr-opp">
          <span className="mr-tag">{opp.tag}</span>
          <span>vs {opp.name}</span>
        </span>
        <span className="mr-score">
          {score ? (
            <>
              <span className="mr-result">{result === "win" ? "W" : "L"}</span>
              <span className="num">
                {score[0]}–{score[1]}
              </span>
            </>
          ) : (
            <span className="mr-format">
              {match.format.replace("Best of ", "Bo")}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}
