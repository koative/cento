import { standings } from "../content";

/** League table; `compact` drops full team names for narrow columns. Rows after the cut miss the playoffs. */
export function StandingsTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className="table-wrap">
      <table className="standings">
        <caption className="sr-only">
          {standings.title}. {standings.note}
        </caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">Maps</th>
          </tr>
        </thead>
        <tbody>
          {standings.rows.map((r, i) => (
            <tr
              key={r.tag}
              data-us={"us" in r ? "" : undefined}
              data-cut={i === 5 ? "" : undefined}
            >
              <td className="num">{i + 1}</td>
              <th scope="row">
                <span className="st-tag">{r.tag}</span>{" "}
                {compact ? null : r.team}
              </th>
              <td className="num">{r.w}</td>
              <td className="num">{r.l}</td>
              <td className="num">{r.maps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
