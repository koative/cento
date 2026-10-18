import { Link } from "../router";
import { brand, type Fixture, type TableRow } from "../content";
import {
  fmtDate,
  isPlayed,
  outcome,
  outcomeLabel,
  scoreline,
  sides,
  teamOf,
} from "../lib/club";

/** One line of the programme: date, who, the score or kick-off, where. */
export function FixtureRow({
  f,
  showTeam = true,
}: {
  f: Fixture;
  showTeam?: boolean;
}) {
  const team = teamOf(f.team);
  const [home, away] = sides(f);
  const score = scoreline(f);
  const o = outcome(f);
  const played = isPlayed(f);
  return (
    <li className="fixture" data-outcome={o ?? undefined}>
      <span className="fx-date num">{fmtDate(f.date)}</span>
      <span className="fx-meta">
        {showTeam && team && (
          <Link to={`/teams/${team.slug}`}>{team.short}</Link>
        )}
        <span>{f.comp}</span>
      </span>
      <span className="fx-teams">
        <span data-us={home === "Field United" ? "" : undefined}>{home}</span>
        <span
          className="fx-score num"
          data-state={score ? "score" : played ? "played" : "ko"}
        >
          {score ? (
            `${score[0]}–${score[1]}`
          ) : played ? (
            "Played"
          ) : (
            <>
              <span className="sr-only">kick-off </span>
              {f.ko}
            </>
          )}
        </span>
        <span data-us={away === "Field United" ? "" : undefined}>{away}</span>
      </span>
      <span className="fx-end">
        {o ? (
          <span className="outcome" data-o={o}>
            <span aria-hidden="true">{o}</span>
            <span className="sr-only">{outcomeLabel[o]}</span>
          </span>
        ) : (
          <span className="fx-venue">
            {f.home ? `${brand.ground}, ${team?.pitch}` : "Away"}
          </span>
        )}
        {f.report && (
          <Link to={`/news/${f.report}`} className="fx-report">
            Report
          </Link>
        )}
      </span>
    </li>
  );
}

export function LeagueTable({
  league,
  rows,
  compact = false,
}: {
  league: string;
  rows: TableRow[];
  compact?: boolean;
}) {
  return (
    <div className="table-wrap">
      <table className="league">
        <caption>{league}</caption>
        <thead>
          <tr>
            <th scope="col">
              <abbr title="Position">Pos</abbr>
            </th>
            <th scope="col">Club</th>
            <th scope="col">
              <abbr title="Played">P</abbr>
            </th>
            {!compact && (
              <>
                <th scope="col">
                  <abbr title="Won">W</abbr>
                </th>
                <th scope="col">
                  <abbr title="Drawn">D</abbr>
                </th>
                <th scope="col">
                  <abbr title="Lost">L</abbr>
                </th>
              </>
            )}
            <th scope="col">
              <abbr title="Goal difference">GD</abbr>
            </th>
            <th scope="col">
              <abbr title="Points">Pts</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.club} data-us={r.club === brand.name ? "" : undefined}>
              <td className="num">{i + 1}</td>
              <th scope="row">{r.club}</th>
              <td className="num">{r.p}</td>
              {!compact && (
                <>
                  <td className="num">{r.w}</td>
                  <td className="num">{r.d}</td>
                  <td className="num">{r.l}</td>
                </>
              )}
              <td className="num">
                {r.gf - r.ga > 0 ? `+${r.gf - r.ga}` : r.gf - r.ga}
              </td>
              <td className="num pts">{r.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
