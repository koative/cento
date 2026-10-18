import { Link } from "../router";
import { films, flagship, home, statuses } from "../content";

export function ProductionBoard() {
  const stages = home.board.stages;
  const rows = [flagship, ...films.filter((f) => f.status !== "Released")];
  return (
    <div className="board">
      <div className="board-head" aria-hidden="true">
        <span />
        {stages.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <ol className="board-rows">
        {rows.map((f) => {
          // statuses run release → development, the board runs development → release
          const at = statuses.length - 1 - statuses.indexOf(f.status);
          return (
            <li key={f.slug} className="board-row">
              <Link to={`/films/${f.slug}`} className="board-film">
                {f.title}
              </Link>
              <span className="board-track" aria-hidden="true">
                {stages.map((s, i) => (
                  <i
                    key={s}
                    data-done={i < at ? "" : undefined}
                    data-now={i === at ? "" : undefined}
                  />
                ))}
              </span>
              <span className="sr-only">
                Stage {at + 1} of {stages.length}: {stages[at]}.
              </span>
              <span className="board-note">{f.release}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
