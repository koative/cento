import { useRef, useState, type KeyboardEvent } from "react";
import { RotateCcw } from "lucide-react";
import { brand, chainPresets, month } from "../content";
import { analyse, inChain, type DayState, type Mark } from "../lib/chain";
import { Cross } from "./marks";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const said: Record<DayState, string> = {
  done: "done",
  grace: "grace day",
  spent: "second grace day inside a week, counts as a miss",
  missed: "missed",
  open: "still open",
};

/**
 * The signature interaction: a wall-calendar month the visitor can mark.
 * Tap cycles a day through done → grace day → empty; the chain, the longest
 * run and the grace rule recompute on every tap.
 */
export function ChainBoard() {
  const today = brand.today.day;
  const [presetId, setPresetId] = useState(chainPresets[0].id);
  const [marks, setMarks] = useState(() =>
    Object.fromEntries(chainPresets.map((p) => [p.id, p.marks])),
  );
  const [focus, setFocus] = useState(today - 1);
  const grid = useRef<HTMLDivElement>(null);

  const current = marks[presetId];
  const {
    states,
    current: chain,
    longest,
    graceFreeIn,
    todayOpen,
  } = analyse(current);

  function cycle(i: number) {
    setMarks((all) => ({
      ...all,
      [presetId]: all[presetId].map((m, j) =>
        j === i ? (((m + 1) % 3) as Mark) : m,
      ),
    }));
  }

  function move(e: KeyboardEvent, i: number) {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[
      e.key
    ];
    const next =
      step !== undefined
        ? i + step
        : e.key === "Home"
          ? 0
          : e.key === "End"
            ? today - 1
            : null;
    if (next === null || next < 0 || next > today - 1) return;
    e.preventDefault();
    setFocus(next);
    grid.current
      ?.querySelector<HTMLButtonElement>(`[data-day="${next}"]`)
      ?.focus();
  }

  const preset = chainPresets.find((p) => p.id === presetId)!;
  const message =
    chain === 0
      ? "The chain is broken. One tick today starts it again at 1."
      : todayOpen
        ? `Today is still open. Tick it before midnight to make it ${chain + 1}.`
        : `Today is done. The chain is ${chain} ${chain === 1 ? "day" : "days"} long.`;

  return (
    <div className="board">
      <div className="board-sheet">
        <div className="board-head">
          <p className="board-month">{month.name}</p>
          <p className="board-habit">{preset.label}</p>
        </div>
        <div
          className="board-grid"
          ref={grid}
          role="group"
          aria-label={`${preset.label}, ${month.name}. Arrow keys move between days.`}
        >
          {weekdays.map((d) => (
            <span key={d} className="board-wd" aria-hidden="true">
              {d.slice(0, 3)}
            </span>
          ))}
          {Array.from({ length: month.offset }, (_, i) => (
            <span key={`b${i}`} className="board-blank" />
          ))}
          {Array.from({ length: month.days }, (_, i) => {
            const state = states[i];
            const link =
              inChain(state) &&
              inChain(states[i + 1]) &&
              (i + month.offset) % 7 !== 6;
            if (!state)
              return (
                <span key={i} className="board-day" data-state="future">
                  <span className="board-num">{i + 1}</span>
                </span>
              );
            return (
              <button
                key={i}
                type="button"
                className="board-day"
                data-day={i}
                data-state={state}
                data-link={link ? "" : undefined}
                data-today={i === today - 1 ? "" : undefined}
                tabIndex={i === focus ? 0 : -1}
                aria-label={`${weekdays[(i + month.offset) % 7]} ${month.short} ${i + 1}: ${said[state]}`}
                onClick={() => {
                  setFocus(i);
                  cycle(i);
                }}
                onKeyDown={(e) => move(e, i)}
              >
                <span className="board-num">{i + 1}</span>
                {state === "done" && (
                  <Cross
                    key={`${presetId}-${i}`}
                    className="cross board-cross"
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="board-future">
          Days after today can't be ticked yet. Neither can they in the app.
        </p>
      </div>

      <div className="board-side">
        <div className="board-presets" role="group" aria-label="Example habit">
          {chainPresets.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === presetId}
              onClick={() => setPresetId(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="board-readout" aria-live="polite">
          <p className="board-count">
            <strong>{chain}</strong>
            <span>{chain === 1 ? "day" : "days"} in the chain</span>
          </p>
          <p className="board-msg">{message}</p>
          <dl className="board-facts">
            <div>
              <dt>Longest this month</dt>
              <dd>{longest} days</dd>
            </div>
            <div>
              <dt>Grace day</dt>
              <dd>
                {graceFreeIn === 0
                  ? "Available today"
                  : `Back in ${graceFreeIn} ${graceFreeIn === 1 ? "day" : "days"}`}
              </dd>
            </div>
          </dl>
        </div>

        <ul className="board-legend">
          <li>
            <span className="key key-done">
              <Cross />
            </span>
            Done
          </li>
          <li>
            <span className="key key-grace" />
            Grace day, bridges one miss
          </li>
          <li>
            <span className="key key-spent" />
            Second grace in 7 days, counts as a miss
          </li>
          <li>
            <span className="key" />
            Missed
          </li>
        </ul>

        <button
          type="button"
          className="btn btn-quiet btn-small"
          onClick={() =>
            setMarks((all) => ({ ...all, [presetId]: preset.marks }))
          }
        >
          <RotateCcw size={16} aria-hidden="true" /> Reset{" "}
          {preset.label.toLowerCase()}
        </button>
      </div>
    </div>
  );
}
