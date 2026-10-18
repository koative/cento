import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "../router";
import {
  goals,
  levels,
  lifts,
  programmePage,
  type Goal,
  type Level,
  type Lift,
} from "../content";
import {
  buildProgramme,
  classById,
  clock,
  load,
  relative,
  save,
  upcoming,
  type Prescription,
} from "../lib";
import { Barbell } from "../components/Barbell";

const KEY = "iron-programme";
const phases = ["Build", "Build", "Peak", "Deload"];
const liftName = (id: Lift) => lifts.find((l) => l.id === id)!.name;

type Saved = {
  goal: Goal;
  days: number;
  level: Level;
  maxes: Record<Lift, string>;
};
const defaults: Saved = {
  goal: "strength",
  days: 3,
  level: "returning",
  maxes: Object.fromEntries(
    lifts.map((l) => [l.id, String(l.fallback)]),
  ) as Record<Lift, string>,
};

const valid = (v: string) =>
  /^\d+$/.test(v) && Number(v) >= 45 && Number(v) <= 1000;

export function Programme() {
  const [state, setState] = useState<Saved>(() => load(KEY, defaults));
  const [week, setWeek] = useState(0);
  const [picked, setPicked] = useState({
    day: 0,
    which: "main" as "main" | "second",
  });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const output = useRef<HTMLElement>(null);

  useEffect(() => save(KEY, state), [state]);

  const maxes = Object.fromEntries(
    lifts.map((l) => [
      l.id,
      valid(state.maxes[l.id]) ? Number(state.maxes[l.id]) : l.fallback,
    ]),
  ) as Record<Lift, number>;
  const block = buildProgramme({
    goal: state.goal,
    days: state.days,
    level: state.level,
    maxes,
  });
  const days = block[week];
  const day = days[picked.day] ?? days[0];
  const selected: Prescription | undefined = day[picked.which] ?? days[0].main;
  const goal = goals.find((g) => g.id === state.goal)!;
  const next = upcoming((s) => s.classId === goal.classId)[0];

  const set = (patch: Partial<Saved>) => {
    setState((s) => ({ ...s, ...patch }));
    setPicked({ day: 0, which: "main" });
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const i = (week + step + 4) % 4;
    setWeek(i);
    tabs.current[i]?.focus();
  };

  const line = (
    p: Prescription | undefined,
    d: number,
    which: "main" | "second",
  ) =>
    p && (
      <button
        type="button"
        className="rx"
        aria-pressed={picked.day === d && picked.which === which}
        onClick={() => setPicked({ day: d, which })}
      >
        <span className="rx-lift">{liftName(p.lift)}</span>
        <span className="rx-scheme">
          {p.sets} × {p.reps}
        </span>
        <span className="rx-pct">{Math.round(p.pct * 100)}%</span>
        <span className="rx-weight">{p.weight} lb</span>
      </button>
    );

  return (
    <>
      <header className="page-head wrap page-head-img">
        <div>
          <h1>{programmePage.title}</h1>
          <p className="lede">{programmePage.intro}</p>
        </div>
        <img
          src={programmePage.image.src}
          alt={programmePage.image.alt}
          width={programmePage.image.w}
          height={programmePage.image.h}
        />
      </header>

      <div className="wrap builder">
        <form
          className="builder-form"
          onSubmit={(e) => e.preventDefault()}
          aria-labelledby="builder-inputs"
        >
          <h2 id="builder-inputs">Your training</h2>

          <fieldset className="choice-set">
            <legend>Goal for the next four weeks</legend>
            {goals.map((g) => (
              <label key={g.id} className="choice">
                <input
                  type="radio"
                  name="goal"
                  value={g.id}
                  checked={state.goal === g.id}
                  onChange={() => set({ goal: g.id })}
                />
                <span>
                  <strong>{g.name}</strong>
                  <span>{g.line}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset className="segmented">
            <legend>Days a week</legend>
            {[2, 3, 4, 5].map((n) => (
              <label key={n}>
                <input
                  type="radio"
                  name="days"
                  value={n}
                  checked={state.days === n}
                  onChange={() => set({ days: n })}
                />
                <span>{n}</span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <label htmlFor="level">Experience</label>
            <select
              id="level"
              value={state.level}
              aria-describedby="level-hint"
              onChange={(e) => set({ level: e.target.value as Level })}
            >
              {levels.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <p className="field-hint" id="level-hint">
              {levels.find((l) => l.id === state.level)!.line}. Newer lifters
              start a little lighter.
            </p>
          </div>

          <fieldset className="maxes">
            <legend>Your best single, in lb</legend>
            <p className="field-hint">
              Only know a five-rep best? Multiply it by 1.15. Leave a lift on
              our default if you've never tested it.
            </p>
            {lifts.map((l) => {
              const v = state.maxes[l.id];
              const bad = !valid(v);
              return (
                <div
                  key={l.id}
                  className="field max-field"
                  data-invalid={bad ? "" : undefined}
                >
                  <label htmlFor={`max-${l.id}`}>{l.name}</label>
                  <input
                    id={`max-${l.id}`}
                    inputMode="numeric"
                    value={v}
                    aria-invalid={bad || undefined}
                    aria-describedby={bad ? `max-${l.id}-err` : undefined}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        maxes: { ...s.maxes, [l.id]: e.target.value.trim() },
                      }))
                    }
                  />
                  {bad && (
                    <p className="field-error" id={`max-${l.id}-err`}>
                      Enter whole pounds between 45 and 1000. Using {l.fallback}{" "}
                      lb until then.
                    </p>
                  )}
                </div>
              );
            })}
          </fieldset>
          <p className="builder-saved">Saved on this device as you type.</p>
          <button
            type="button"
            className="btn btn-primary builder-jump"
            onClick={() =>
              output.current?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
              })
            }
          >
            See your four-week block
          </button>
        </form>

        <section
          ref={output}
          className="builder-out"
          aria-labelledby="block-title"
        >
          <div className="builder-bar">
            <h2 id="block-title" className="sr-only">
              Your four-week block
            </h2>
            {selected && <Barbell weight={selected.weight} />}
            <p className="builder-bar-label" aria-live="polite">
              {selected &&
                `Week ${week + 1}, day ${picked.day + 1}: ${liftName(selected.lift)}, ${selected.sets} sets of ${selected.reps} at ${selected.weight} lb`}
            </p>
          </div>

          <div className="weeks" role="tablist" aria-label="Week">
            {phases.map((p, i) => (
              <button
                key={i}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`week-tab-${i}`}
                aria-selected={week === i}
                aria-controls="week-panel"
                tabIndex={week === i ? 0 : -1}
                onClick={() => setWeek(i)}
                onKeyDown={onTabKey}
              >
                <strong>Week {i + 1}</strong>
                <span>{p}</span>
              </button>
            ))}
          </div>

          <div
            id="week-panel"
            role="tabpanel"
            aria-labelledby={`week-tab-${week}`}
            className="week-panel"
          >
            {days.map((d, i) => (
              <article key={i} className="day">
                <h3>
                  Day {i + 1}
                  <span>
                    {d.main
                      ? `${liftName(d.main.lift)} & ${liftName(d.second!.lift).toLowerCase()}`
                      : "Conditioning & recovery"}
                  </span>
                </h3>
                {d.main && (
                  <div className="rx-list">
                    {line(d.main, i, "main")}
                    {line(d.second, i, "second")}
                  </div>
                )}
                <ul className="day-extras">
                  {d.extras.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                  <li>
                    <strong>Finish:</strong> {d.finisher}
                  </li>
                </ul>
              </article>
            ))}
          </div>

          <aside className="builder-next" aria-label="Train it with a coach">
            <p>
              Rather be coached through it?{" "}
              <Link to={`/classes/${goal.classId}`}>
                {classById(goal.classId)!.name}
              </Link>{" "}
              runs the same kind of block
              {next &&
                `; the next one is ${relative(next.inMinutes, next.slot)} at ${clock(next.slot.time)}`}
              .
            </p>
            <Link to="/join?plan=coached" className="btn btn-primary">
              Have a coach write the next block
            </Link>
          </aside>
        </section>
      </div>
    </>
  );
}
