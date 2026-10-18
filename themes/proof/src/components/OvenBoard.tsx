import { useState, type CSSProperties } from "react";
import { bakes, boardRange } from "../content";
import { Link } from "../router";
import {
  bakeState,
  bakeStateLabel,
  clock,
  minutesNow,
  OVEN_MIN,
  WARM_MIN,
  type BakeState,
} from "../lib/time";

const span = boardRange.end - boardRange.start;
const pct = (m: number) =>
  `${((Math.min(Math.max(m, boardRange.start), boardRange.end) - boardRange.start) / span) * 100}%`;
const ticks = Array.from(
  { length: Math.floor(span / 60) + 1 },
  (_, i) => Math.ceil(boardRange.start / 60) * 60 + i * 60,
).filter((m) => m <= boardRange.end);

/** The day's oven loads on a timeline; drag the clock to see what is in the oven, warm, on the rack or gone. */
export function OvenBoard() {
  const now = minutesNow();
  const live = now >= boardRange.start && now <= boardRange.end;
  const [t, setT] = useState(live ? now - (now % 5) : 510);

  const states = bakes.map((b) => bakeState(b, t));
  const tally = (s: BakeState) => states.filter((x) => x === s).length;
  const parts = [
    tally("warm") && `${tally("warm")} warm`,
    tally("oven") && `${tally("oven")} in the oven`,
    tally("rack") && `${tally("rack")} on the rack`,
    tally("gone") && `${tally("gone")} usually sold out`,
  ].filter(Boolean);

  return (
    <div className="board" style={{ "--now": pct(t) } as CSSProperties}>
      <div className="board-controls">
        <div className="board-clock">
          <label htmlFor="board-time">Time of day</label>
          <output htmlFor="board-time">{clock(t)}</output>
        </div>
        <input
          id="board-time"
          type="range"
          min={boardRange.start}
          max={boardRange.end}
          step={5}
          value={t}
          aria-valuetext={clock(t)}
          onChange={(e) => setT(Number(e.target.value))}
        />
        <button
          type="button"
          className="btn btn-small btn-ghost"
          onClick={() => setT(now - (now % 5))}
          disabled={!live}
        >
          {live ? "Back to now" : "Closed now"}
        </button>
      </div>
      <p className="board-summary" aria-live="polite">
        At {clock(t)}:{" "}
        {parts.length ? parts.join(", ") : "the ovens are still heating"}.
      </p>

      <div className="board-scale" aria-hidden="true">
        {ticks.map((m) => (
          <span key={m} style={{ left: pct(m) }}>
            {clock(m)}
          </span>
        ))}
      </div>
      <ol className="board-rows">
        {bakes.map((b, i) => (
          <li key={b.name + b.out} data-state={states[i]}>
            <span className="board-out">{clock(b.out)}</span>
            <span className="board-name">
              {b.productId ? (
                <Link to={`/shop/${b.productId}`}>{b.name}</Link>
              ) : (
                b.name
              )}
              <small>{b.batch}</small>
            </span>
            <span className="board-track" aria-hidden="true">
              <i
                className="seg-oven"
                style={{
                  left: pct(b.out - OVEN_MIN),
                  right: `calc(100% - ${pct(b.out)})`,
                }}
              />
              <i
                className="seg-warm"
                style={{
                  left: pct(b.out),
                  right: `calc(100% - ${pct(b.out + WARM_MIN)})`,
                }}
              />
              <i
                className="seg-rack"
                style={{
                  left: pct(b.out + WARM_MIN),
                  right: `calc(100% - ${pct(b.gone ?? boardRange.end)})`,
                }}
              />
            </span>
            <span className="board-state">{bakeStateLabel[states[i]]}</span>
          </li>
        ))}
      </ol>
      <ul className="board-key" aria-label="Key">
        <li className="key-oven">In the oven</li>
        <li className="key-warm">Warm, first {WARM_MIN} minutes</li>
        <li className="key-rack">On the rack until it usually sells out</li>
      </ul>
    </div>
  );
}
