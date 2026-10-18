import { useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { navigate } from "../router";
import { pricing, rooms } from "../content";
import {
  clock,
  getDraft,
  money,
  quote,
  setDraft,
  weekdays,
  type Pattern,
} from "../lib/fees";

const DAY_START = 7.5;
const DAY_END = 18;
const pos = (h: number) => ((h - DAY_START) / (DAY_END - DAY_START)) * 100;

export function FeesCalculator() {
  const draft = getDraft();
  const [roomId, setRoomId] = useState(draft?.roomId ?? "finches");
  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const [pattern, setPattern] = useState<Pattern>(
    draft?.pattern ?? ["full", "full", "full", null, null],
  );
  const [credit, setCredit] = useState(true);
  const [siblings, setSiblings] = useState(false);

  const valid = pattern.map((id) =>
    room.sessions.some((s) => s.id === id) ? id : null,
  );
  const q = quote(room, valid, credit, siblings);

  const presets: { label: string; pattern: Pattern }[] =
    room.stage === "School age"
      ? [
          {
            label: "After school, every day",
            pattern: ["after", "after", "after", "after", "after"],
          },
          {
            label: "Breakfast & after, 3 days",
            pattern: ["both", null, "both", null, "both"],
          },
        ]
      : [
          {
            label: "Three full days",
            pattern: ["full", "full", "full", null, null],
          },
          {
            label: "Five mornings",
            pattern: ["morning", "morning", "morning", "morning", "morning"],
          },
          {
            label: "Full time",
            pattern: ["full", "full", "full", "full", "full"],
          },
        ];

  const setDay = (i: number, id: string | null) =>
    setPattern((p) => p.map((v, j) => (j === i ? id : v)));

  const changeRoom = (id: string) => {
    const next = rooms.find((r) => r.id === id)!;
    setRoomId(id);
    // Keep the shape of the week when switching between rooms with different session types.
    if (next.sessions[0].id !== room.sessions[0].id)
      setPattern(
        pattern.map((v) =>
          v ? next.sessions[next.sessions.length - 1].id : null,
        ),
      );
  };

  const book = () => {
    setDraft({ roomId: room.id, pattern: valid });
    navigate("/tour");
  };

  return (
    <div className="calc">
      <div className="calc-controls">
        <fieldset className="calc-rooms">
          <legend>Which room?</legend>
          <div className="room-pills">
            {rooms.map((r) => (
              <label
                key={r.id}
                className="room-pill"
                style={{ "--room": r.color } as CSSProperties}
              >
                <input
                  type="radio"
                  name="calc-room"
                  value={r.id}
                  checked={r.id === roomId}
                  onChange={() => changeRoom(r.id)}
                />
                <span className="dot" aria-hidden="true" />
                <span>
                  {r.name}
                  <small>{r.ages.split(" · ")[0]}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="calc-presets" role="group" aria-label="Quick patterns">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              className="chip"
              onClick={() => setPattern(p.pattern)}
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            className="chip chip-quiet"
            onClick={() => setPattern([null, null, null, null, null])}
          >
            Clear week
          </button>
        </div>

        <ol className="week">
          {weekdays.map((d, i) => {
            const chosen = room.sessions.find((s) => s.id === valid[i]);
            return (
              <li
                key={d}
                className="week-day"
                data-booked={chosen ? "" : undefined}
              >
                <fieldset>
                  <legend>{d}</legend>
                  <div className="seg">
                    <label>
                      <input
                        type="radio"
                        name={`day-${i}`}
                        checked={!chosen}
                        onChange={() => setDay(i, null)}
                      />
                      <span>Off</span>
                    </label>
                    {room.sessions.map((s) => (
                      <label key={s.id}>
                        <input
                          type="radio"
                          name={`day-${i}`}
                          checked={chosen?.id === s.id}
                          onChange={() => setDay(i, s.id)}
                        />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <span
                  className="day-bar"
                  aria-hidden="true"
                  style={{ "--room": room.color } as CSSProperties}
                >
                  {chosen?.spans.map(([a, b]) => (
                    <span
                      key={a}
                      style={{
                        left: `${pos(a)}%`,
                        width: `${pos(b) - pos(a)}%`,
                      }}
                    />
                  ))}
                </span>
                <span className="day-meta">
                  {chosen ? (
                    <>
                      <span>
                        {chosen.spans
                          .map(([a, b]) => `${clock(a)}–${clock(b)}`)
                          .join(" + ")}
                      </span>
                      <span className="num">{money(chosen.price)}</span>
                    </>
                  ) : (
                    <span className="quiet">Not booked</span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="calc-toggles">
          {room.creditHours ? (
            <label className="check">
              <input
                type="checkbox"
                checked={credit}
                onChange={(e) => setCredit(e.target.checked)}
              />
              <span>
                Use pre-K credit
                <small>
                  15 hrs a week in the school year, averaged to{" "}
                  {room.creditHours} hrs across our open weeks
                </small>
              </span>
            </label>
          ) : null}
          <label className="check">
            <input
              type="checkbox"
              checked={siblings}
              onChange={(e) => setSiblings(e.target.checked)}
            />
            <span>
              A brother or sister is also at Nest
              <small>
                {pricing.siblingDiscount * 100}% off this child's fees
              </small>
            </span>
          </label>
        </div>
      </div>

      <aside className="slip" aria-labelledby="slip-title">
        <h3 id="slip-title">
          <span
            className="dot"
            style={{ background: room.color }}
            aria-hidden="true"
          />
          {room.name} · your week
        </h3>
        <dl className="slip-lines">
          <div>
            <dt>Sessions</dt>
            <dd className="num">{q.sessions} a week</dd>
          </div>
          <div>
            <dt>Hours of care</dt>
            <dd className="num">
              {q.hours.toFixed(2).replace(/\.?0+$/, "")} hrs
            </dd>
          </div>
          <div>
            <dt>Session fees</dt>
            <dd className="num">{money(q.gross, true)}</dd>
          </div>
          {q.credit > 0 && (
            <div className="minus">
              <dt>Pre-K credit</dt>
              <dd className="num">−{money(q.credit, true)}</dd>
            </div>
          )}
          {q.sibling > 0 && (
            <div className="minus">
              <dt>Sibling discount</dt>
              <dd className="num">−{money(q.sibling, true)}</dd>
            </div>
          )}
        </dl>
        <div className="slip-total" aria-live="polite" aria-atomic="true">
          <p>
            <span>Per week</span>
            <strong className="num">{money(q.weekly, true)}</strong>
          </p>
          <p>
            <span>Per month</span>
            <strong className="num big">{money(q.monthly)}</strong>
          </p>
        </div>
        <p className="slip-note">
          Monthly = weekly × 50 open weeks ÷ 12. Meals, diapers and sunscreen
          included. Illustrative demo prices.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={book}
          disabled={q.sessions === 0}
        >
          Book a tour with these days <ArrowRight aria-hidden="true" />
        </button>
        {q.sessions === 0 && (
          <p className="slip-note">
            Pick at least one session to carry it into a tour booking.
          </p>
        )}
      </aside>
    </div>
  );
}
