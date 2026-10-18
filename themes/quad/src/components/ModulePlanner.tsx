import { useState, type KeyboardEvent } from "react";
import { Lock, RotateCcw } from "lucide-react";
import {
  CREDITS_PER_YEAR,
  days,
  hours,
  type Module,
  type Programme,
} from "../content";
import { navigate } from "../router";
import { savePlan, slotKey, timetable } from "../lib/plan";

const BLOCK = 15;
const slotLabel = (m: Module) =>
  m.slots.map((s) => `${s.day} ${s.hour}:00`).join(", ");

/**
 * The signature tool: pick optional modules for a year of study, watch the credit ledger fill
 * towards 120, and see the week's timetable — clashes included — before saving the plan to the application.
 */
export function ModulePlanner({ programme }: { programme: Programme }) {
  const [yearIndex, setYearIndex] = useState(0);
  const [chosen, setChosen] = useState<Record<string, string[]>>({});
  const year = programme.plan[yearIndex];
  const picked = chosen[year.label] ?? [];

  const core = year.modules.filter((m) => m.core);
  const options = year.modules.filter((m) => !m.core);
  const selected = [...core, ...options.filter((m) => picked.includes(m.code))];
  const grid = timetable(selected);
  const clashes = [...grid.entries()].filter(([, ms]) => ms.length > 1);
  const coreCredits = core.reduce((s, m) => s + m.credits, 0);
  const total = selected.reduce((s, m) => s + m.credits, 0);
  const remaining = CREDITS_PER_YEAR - total;
  const complete = remaining === 0 && clashes.length === 0;

  const toggle = (code: string) =>
    setChosen((c) => {
      const now = c[year.label] ?? [];
      return {
        ...c,
        [year.label]: now.includes(code)
          ? now.filter((x) => x !== code)
          : [...now, code],
      };
    });

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next =
      (yearIndex + step + programme.plan.length) % programme.plan.length;
    setYearIndex(next);
    document.getElementById(`year-tab-${next}`)?.focus();
  };

  const creditNote =
    remaining > 0
      ? `${total} of ${CREDITS_PER_YEAR} credits — choose ${remaining} more from the options.`
      : remaining < 0
        ? `${total} credits, ${-remaining} over — drop an option to reach ${CREDITS_PER_YEAR}.`
        : "";
  const clashNote = clashes.length
    ? `${clashes.length === 1 ? "One clash" : `${clashes.length} clashes`} on ${clashes.map(([k]) => k + ":00").join(", ")}: swap one of the modules meeting then.`
    : "";
  const status = complete
    ? `${year.label} adds up: ${CREDITS_PER_YEAR} credits and no clashes.`
    : [clashNote, creditNote].filter(Boolean).join(" ");

  const clashWith = (m: Module) =>
    selected.filter(
      (o) =>
        o.code !== m.code &&
        o.slots.some((s) => m.slots.some((t) => slotKey(s) === slotKey(t))),
    );

  return (
    <section className="planner" aria-labelledby="planner-title">
      <div className="planner-head">
        <h2 id="planner-title">Plan your modules</h2>
        <p>
          Core modules are fixed. Pick options until{" "}
          {year.label === "Full year" ? "the year" : year.label} adds up to{" "}
          {CREDITS_PER_YEAR} credits — the timetable shows where they meet, and
          where two of them collide.
        </p>
      </div>

      {programme.plan.length > 1 && (
        <div className="year-tabs" role="tablist" aria-label="Year of study">
          {programme.plan.map((y, i) => (
            <button
              key={y.label}
              id={`year-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === yearIndex}
              aria-controls="planner-panel"
              tabIndex={i === yearIndex ? 0 : -1}
              onClick={() => setYearIndex(i)}
              onKeyDown={onTabKey}
            >
              {y.label}
            </button>
          ))}
        </div>
      )}

      <div
        id="planner-panel"
        className="planner-body"
        role={programme.plan.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={
          programme.plan.length > 1 ? `year-tab-${yearIndex}` : undefined
        }
      >
        <div className="planner-list">
          <h3>
            Core modules <span>{coreCredits} credits</span>
          </h3>
          <ul className="mod-list">
            {core.map((m) => (
              <li key={m.code} className="mod mod-core">
                <Lock aria-hidden="true" />
                <span className="mod-code">{m.code}</span>
                <span className="mod-title">{m.title}</span>
                <span className="mod-credits">{m.credits}</span>
                <span className="mod-slots">{slotLabel(m)}</span>
              </li>
            ))}
          </ul>

          <h3>
            Options{" "}
            <span>
              {total - coreCredits} chosen · {CREDITS_PER_YEAR - coreCredits}{" "}
              credits needed
            </span>
          </h3>
          <ul className="mod-list">
            {options.map((m) => {
              const on = picked.includes(m.code);
              const hits = on ? clashWith(m) : [];
              return (
                <li
                  key={m.code}
                  className="mod mod-option"
                  data-on={on ? "" : undefined}
                  data-clash={hits.length ? "" : undefined}
                >
                  <input
                    id={`mod-${m.code}`}
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(m.code)}
                  />
                  <label htmlFor={`mod-${m.code}`}>
                    <span className="mod-code">{m.code}</span>
                    <span className="mod-title">{m.title}</span>
                    <span className="mod-credits">{m.credits}</span>
                    <span className="mod-slots">
                      {slotLabel(m)}
                      {hits.length > 0 && (
                        <strong>
                          {" "}
                          · clashes with {hits.map((h) => h.code).join(", ")}
                        </strong>
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="planner-side">
          <div className="ledger" aria-hidden="true">
            {Array.from(
              { length: Math.max(CREDITS_PER_YEAR, total) / BLOCK },
              (_, i) => {
                const at = i * BLOCK;
                const kind =
                  at < coreCredits
                    ? "core"
                    : at < total
                      ? at >= CREDITS_PER_YEAR
                        ? "over"
                        : "option"
                      : "empty";
                return (
                  <span key={i} className={`ledger-block ledger-${kind}`} />
                );
              },
            )}
          </div>
          <p className="ledger-total">
            <strong>{total}</strong> / {CREDITS_PER_YEAR} credits · core{" "}
            {coreCredits}, options {total - coreCredits}
          </p>
          <p
            className="planner-status"
            data-state={
              complete
                ? "ok"
                : clashes.length || remaining < 0
                  ? "warn"
                  : "todo"
            }
            aria-live="polite"
          >
            {status}
          </p>

          <table className="timetable">
            <caption className="sr-only">
              Weekly timetable for {year.label}, two-hour teaching blocks
            </caption>
            <thead>
              <tr>
                <td />
                {days.map((d) => (
                  <th key={d} scope="col">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => (
                <tr key={h} data-after-lunch={h === 14 ? "" : undefined}>
                  <th scope="row">{h}:00</th>
                  {days.map((d) => {
                    const ms = grid.get(`${d} ${h}`) ?? [];
                    return (
                      <td
                        key={d}
                        data-kind={
                          ms.length > 1
                            ? "clash"
                            : ms[0]?.core
                              ? "core"
                              : ms.length
                                ? "option"
                                : undefined
                        }
                      >
                        {ms.map((m) => (
                          <span key={m.code}>{m.code}</span>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="planner-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!complete}
              onClick={() => {
                savePlan({
                  programme: programme.id,
                  year: year.label,
                  modules: selected.filter((m) => !m.core).map((m) => m.code),
                });
                navigate("/apply");
              }}
            >
              Save plan and apply
            </button>
            <button
              type="button"
              className="btn btn-quiet"
              disabled={!picked.length}
              onClick={() => setChosen((c) => ({ ...c, [year.label]: [] }))}
            >
              <RotateCcw aria-hidden="true" /> Clear options
            </button>
          </div>
          <p className="planner-note">
            Illustrative timetable: final slots are confirmed in August before
            you arrive.
          </p>
        </div>
      </div>
    </section>
  );
}
