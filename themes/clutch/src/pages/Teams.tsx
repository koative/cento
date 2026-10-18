import { useState } from "react";
import { divisions, images, players, type DivisionId } from "../content";
import { PlayerCard } from "../components/PlayerCard";

export function Teams() {
  const [show, setShow] = useState<DivisionId | "all">("all");
  const visible = divisions.filter((d) => show === "all" || d.id === show);

  return (
    <>
      <header className="page-head wrap">
        <h1>Teams</h1>
        <p className="lede">
          Twelve players and three coaches across a tactical shooter, an arena
          strategy game and a fighting game. All of them train at Clutch House
          in Rotterdam.
        </p>
        <div className="segmented" role="group" aria-label="Show division">
          {[{ id: "all" as const, game: "All divisions" }, ...divisions].map(
            (d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={show === d.id}
                onClick={() => setShow(d.id)}
              >
                {d.game}
              </button>
            ),
          )}
        </div>
      </header>

      {visible.map((d) => (
        <section
          key={d.id}
          className="division wrap"
          aria-labelledby={`div-${d.id}`}
        >
          <div className="division-head">
            <h2 id={`div-${d.id}`}>{d.game}</h2>
            <dl className="division-facts">
              <div>
                <dt>Game</dt>
                <dd>{d.genre}</dd>
              </div>
              <div>
                <dt>Competing in</dt>
                <dd>{d.league}</dd>
              </div>
              <div>
                <dt>Standing</dt>
                <dd className="num">{d.standing}</dd>
              </div>
            </dl>
            <p>{d.blurb}</p>
          </div>
          <ul className="player-grid">
            {players
              .filter((p) => p.division === d.id)
              .map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            <li className="coach-card">
              <span className="pc-handle">{d.coach.handle}</span>
              <span className="pc-name">{d.coach.name}</span>
              <span className="pc-meta">
                <span>Coach</span>
              </span>
              <p>{d.coach.note}</p>
            </li>
          </ul>
        </section>
      ))}

      <section className="wrap academy">
        <img
          src={images.squad}
          alt="Academy players in headsets at a row of practice desks."
          width={1600}
          height={1066}
          loading="lazy"
          className="cut"
        />
        <div>
          <h2>The academy</h2>
          <p>
            Five of our twelve professionals came through the Clutch academy.
            Tryouts for 2027 are open until 30 November: two Fault Line spots
            and one Ascendancy jungler. You need to be sixteen or older and able
            to train from Clutch House three evenings a week.
          </p>
          <a className="btn btn-ghost" href="mailto:academy@clutch.example">
            Apply: academy@clutch.example
          </a>
        </div>
      </section>
    </>
  );
}
