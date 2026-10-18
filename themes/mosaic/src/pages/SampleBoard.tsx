import { ArrowDown, ArrowRight, ArrowUp, X } from "lucide-react";
import { Link } from "../router";
import { materials, projects } from "../content";
import { BoardView } from "../components/Samples";
import {
  BOARD_MAX,
  boardMaterials,
  move,
  replace,
  role,
  toggle,
  useBoard,
} from "../lib/board";

const share = ["60%", "30%"];

export function SampleBoard() {
  const ids = useBoard();
  const items = boardMaterials(ids);
  const accents = Math.max(0, items.length - 2);

  return (
    <>
      <header className="page-head">
        <h1>Your sample board</h1>
        <p className="lede">
          Lay materials out the way we do on the studio table: one field
          material for most of the room, one secondary, and a few accents. Turn
          the dial to see how they read at nine in the morning and eight at
          night.
        </p>
      </header>

      {items.length ? (
        <section className="section board-page" aria-label="Board">
          <BoardView ids={ids} />
          <div className="board-side">
            <h2>The mix</h2>
            <ol className="board-legend">
              {items.map((m, i) => (
                <li key={m.id}>
                  <img src={m.image} alt="" />
                  <span>
                    <Link to={`/materials/${m.id}`}>{m.name}</Link>
                    <span className="fine">
                      {role(i)} ·{" "}
                      {i < 2 ? share[i] : `${Math.round(10 / accents)}%`} of the
                      room
                    </span>
                  </span>
                  <span className="board-legend-tools">
                    <button
                      type="button"
                      onClick={() => move(m.id, -1)}
                      disabled={i === 0}
                      aria-label={`Move ${m.name} up`}
                    >
                      <ArrowUp size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(m.id, 1)}
                      disabled={i === items.length - 1}
                      aria-label={`Move ${m.name} down`}
                    >
                      <ArrowDown size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggle(m.id)}
                      aria-label={`Remove ${m.name}`}
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </span>
                </li>
              ))}
            </ol>
            <p className="fine tabular">
              {items.length} of {BOARD_MAX} places used. Move a sample up or
              down to change its role.
            </p>
            <Link to="/consultation" className="btn">
              Bring this board to a consultation
            </Link>
            <div className="board-side-links">
              <Link to="/materials" className="text-link">
                Add more samples <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="text-button"
                onClick={() => replace([])}
              >
                Clear the board
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="section board-empty">
          <h2>Nothing on the table yet</h2>
          <p>
            Add samples from the library, or start from the palette of one of
            our projects and change it from there.
          </p>
          <div className="starter-list">
            {projects.slice(0, 4).map((p) => (
              <button
                key={p.slug}
                type="button"
                className="starter"
                onClick={() => replace(p.materials)}
              >
                <span className="starter-chips" aria-hidden="true">
                  {p.materials.map((id) => (
                    <img
                      key={id}
                      src={materials.find((m) => m.id === id)!.image}
                      alt=""
                    />
                  ))}
                </span>
                <span>
                  Start from <strong>{p.name}</strong>
                </span>
              </button>
            ))}
          </div>
          <Link to="/materials" className="btn">
            Browse the library
          </Link>
        </section>
      )}
    </>
  );
}
