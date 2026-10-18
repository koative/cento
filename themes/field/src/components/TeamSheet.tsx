import { useRef, useState } from "react";
import { ArrowLeftRight, RotateCcw } from "lucide-react";
import type { Fixture, Player, Team } from "../content";
import { fmtDate, posName, slots } from "../lib/club";
import { Shirt } from "./Kit";

/** "Callum Reid" → "Reid"; junior "Oscar H." → "Oscar". */
const shortName = (name: string) => {
  const parts = name.split(" ");
  const last = parts[parts.length - 1];
  return last.endsWith(".") ? parts[0] : last;
};

export function PitchLines() {
  return (
    <svg
      className="pitch-lines"
      viewBox="0 0 68 105"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.45">
        <rect x="2" y="2" width="64" height="101" pathLength={1} />
        <path d="M2 52.5h64" pathLength={1} />
        <circle cx="34" cy="52.5" r="9.15" pathLength={1} />
        <path
          d="M13.85 2v16.5h40.3V2M24.85 2v5.5h18.3V2M26.7 18.5a9.15 9.15 0 0 0 14.6 0"
          pathLength={1}
        />
        <path
          d="M13.85 103V86.5h40.3V103M24.85 103v-5.5h18.3V103M26.7 86.5a9.15 9.15 0 0 1 14.6 0"
          pathLength={1}
        />
      </g>
      <g fill="currentColor">
        <circle cx="34" cy="52.5" r="0.6" />
        <circle cx="34" cy="13" r="0.5" />
        <circle cx="34" cy="92" r="0.5" />
      </g>
    </svg>
  );
}

export function TeamSheet({ team, next }: { team: Team; next?: Fixture }) {
  const [formation, setFormation] = useState(team.formations[0]);
  const [xi, setXi] = useState(team.xi);
  const [selected, setSelected] = useState(team.captain);
  const [said, setSaid] = useState("");
  const pitch = useRef<HTMLDivElement>(null);

  const byNumber = new Map(team.squad.map((p) => [p.n, p]));
  const places = slots(formation);
  const bench = team.squad.filter((p) => !xi.includes(p.n));
  const player = byNumber.get(selected) as Player;
  const slot = xi.indexOf(selected);
  const changed = xi.some((n, i) => n !== team.xi[i]);

  const swap = (incoming: Player) => {
    setXi(xi.map((n, i) => (i === slot ? incoming.n : n)));
    setSaid(`${incoming.name} on for ${player.name}.`);
    setSelected(incoming.n);
    // The chip that was pressed disappears; keep the keyboard on the new player's shirt.
    requestAnimationFrame(() =>
      pitch.current
        ?.querySelector<HTMLElement>(`[data-n="${incoming.n}"]`)
        ?.focus(),
    );
  };

  const options =
    slot === -1 ? [] : bench.filter((p) => (slot === 0) === (p.pos === "GK"));

  return (
    <section className="sheet" aria-labelledby="sheet-title">
      <div className="sheet-head">
        <div>
          <h2 id="sheet-title">Team sheet</h2>
          <p>
            {next
              ? `Manager's pick for ${next.home ? "home to" : "away at"} ${next.opp}, ${fmtDate(next.date)}.`
              : "The manager's usual line-up."}{" "}
            Change the shape, tap a shirt for the player, swap from the bench.
          </p>
        </div>
        <fieldset className="segmented">
          <legend className="sr-only">Formation</legend>
          {team.formations.map((f) => (
            <label key={f}>
              <input
                type="radio"
                name="formation"
                value={f}
                checked={formation === f}
                onChange={() => setFormation(f)}
              />
              <span className="num">{f}</span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className="sheet-body">
        <div
          className="pitch"
          ref={pitch}
          role="group"
          aria-label={`Pitch, ${formation}, attacking upwards`}
        >
          <PitchLines />
          {xi.map((n, i) => {
            const p = byNumber.get(n) as Player;
            const at = places[i];
            return (
              <button
                key={n}
                data-n={n}
                type="button"
                className="token"
                style={{
                  left: `${at.x}%`,
                  top: `${at.y}%`,
                  ["--i" as string]: i,
                }}
                aria-pressed={selected === n}
                aria-label={`${n}, ${p.name}, ${at.line.toLowerCase()}`}
                onClick={() => setSelected(n)}
              >
                <Shirt n={n} keeper={i === 0} size={40} />
                <span className="token-name">{shortName(p.name)}</span>
              </button>
            );
          })}
        </div>

        <div className="sheet-side">
          <div className="player-card" aria-live="polite">
            <div className="player-top">
              <Shirt
                n={player.n}
                keeper={slot === 0 || (slot === -1 && player.pos === "GK")}
                size={72}
              />
              <div>
                <h3>{player.name}</h3>
                <p>
                  {posName[player.pos]}
                  {player.n === team.captain && " · Captain"}
                  {slot === -1
                    ? " · On the bench"
                    : ` · Playing in ${places[slot].line.toLowerCase()}`}
                </p>
              </div>
            </div>
            <dl className="player-stats">
              <div>
                <dt>Appearances</dt>
                <dd className="num">{player.apps}</dd>
              </div>
              <div>
                <dt>Goals</dt>
                <dd className="num">{team.scores ? player.goals : "—"}</dd>
              </div>
              <div>
                <dt>Joined</dt>
                <dd className="num">{player.since}</dd>
              </div>
            </dl>
            {options.length > 0 && (
              <div className="swap">
                <p>Bring on for {shortName(player.name)}:</p>
                <ul>
                  {options.map((p) => (
                    <li key={p.n}>
                      <button
                        type="button"
                        className="chip"
                        onClick={() => swap(p)}
                      >
                        <ArrowLeftRight aria-hidden="true" size={16} />
                        <span className="num">{p.n}</span> {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bench">
            <h3>Bench</h3>
            <ul>
              {bench.map((p) => (
                <li key={p.n}>
                  <button
                    type="button"
                    aria-pressed={selected === p.n}
                    onClick={() => setSelected(p.n)}
                  >
                    <span className="num">{p.n}</span>
                    {p.name}
                    <small>{p.pos}</small>
                  </button>
                </li>
              ))}
            </ul>
            {changed && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setXi(team.xi);
                  setSelected(team.captain);
                  setSaid("Back to the manager's line-up.");
                }}
              >
                <RotateCcw aria-hidden="true" size={16} /> Manager's line-up
              </button>
            )}
          </div>
          <p className="sr-only" role="status">
            {said}
          </p>
        </div>
      </div>
    </section>
  );
}
