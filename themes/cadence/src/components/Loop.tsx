import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { competencies, composer, paces } from "../content";
import { composeLoop, hours, stepsFor } from "../lib/format";

/** The loop drawn on a day grid: each step sits on its day, its width is its length (a full cell = one hour). */
export function LoopTimeline({
  stepIds,
  pace,
  label,
}: {
  stepIds: string[];
  pace: string;
  label: string;
}) {
  const loop = composeLoop(stepIds, pace);
  const span = loop.days + 1;
  return (
    <figure className="loop" style={{ ["--span" as string]: span }}>
      <ol aria-label={label}>
        {loop.steps.map((s) => (
          <li
            key={s.id}
            className="loop-row"
            data-kind={s.id === "decision" ? "decision" : undefined}
          >
            <span className="loop-label">
              <strong>{s.name}</strong>
              <span>
                Day {s.day + 1} · {s.minutes} min · {s.interviewers}{" "}
                {s.interviewers === 1 ? "person" : "people"}
              </span>
            </span>
            <span className="loop-track" aria-hidden="true">
              <span
                className="loop-beat"
                style={{
                  left: `${(s.day / span) * 100}%`,
                  width: `${(Math.min(s.minutes, 60) / 60 / span) * 100}%`,
                }}
              />
            </span>
          </li>
        ))}
      </ol>
      <div className="loop-scale" aria-hidden="true">
        {Array.from({ length: span }, (_, d) => (
          <span key={d}>{span > 9 && d % 2 ? "" : d + 1}</span>
        ))}
      </div>
    </figure>
  );
}

export function LoopComposer() {
  const [roleId, setRoleId] = useState(composer.roles[0].id);
  const [picked, setPicked] = useState(composer.roles[0].competencies);
  const [pace, setPace] = useState("steady");
  const stepIds = stepsFor(picked);
  const loop = composeLoop(stepIds, pace);
  const role = composer.roles.find((r) => r.id === roleId)!;

  function chooseRole(id: string) {
    setRoleId(id);
    setPicked(composer.roles.find((r) => r.id === id)!.competencies);
  }

  const warning =
    picked.length < 2
      ? "Pick at least two competencies so the decision rests on more than one conversation."
      : picked.length > 5
        ? "Six or more competencies make a heavy loop. Most teams settle on four."
        : null;

  return (
    <div className="composer">
      <div className="composer-controls">
        <div className="field">
          <label htmlFor="composer-role">Role</label>
          <select
            id="composer-role"
            value={roleId}
            onChange={(e) => chooseRole(e.target.value)}
          >
            {composer.roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="chips">
          <legend>What the role needs</legend>
          {competencies.map((c) => {
            const on = picked.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                className="chip"
                aria-pressed={on}
                onClick={() =>
                  setPicked(
                    on ? picked.filter((x) => x !== c.id) : [...picked, c.id],
                  )
                }
              >
                {c.label}
              </button>
            );
          })}
        </fieldset>

        <fieldset className="segmented">
          <legend>Pace</legend>
          <div>
            {paces.map((p) => (
              <label key={p.id}>
                <input
                  type="radio"
                  name="pace"
                  value={p.id}
                  checked={pace === p.id}
                  onChange={() => setPace(p.id)}
                />
                <span>{p.label}</span>
              </label>
            ))}
          </div>
          <p className="field-hint">{paces.find((p) => p.id === pace)!.note}</p>
        </fieldset>
      </div>

      <div className="composer-output">
        <LoopTimeline
          stepIds={stepIds}
          pace={pace}
          label={`Interview loop for ${role.label}`}
        />
        <dl className="loop-totals" aria-live="polite">
          <div>
            <dt>Decision on</dt>
            <dd className="num">Day {loop.days + 1}</dd>
          </div>
          <div>
            <dt>Candidate's time</dt>
            <dd className="num">{hours(loop.candidateMinutes)}</dd>
          </div>
          <div>
            <dt>Team time per candidate</dt>
            <dd className="num">{hours(loop.teamMinutes)}</dd>
          </div>
        </dl>
        {warning && (
          <p className="composer-warning" role="status">
            {warning}
          </p>
        )}
        <Link to="/app/jobs" className="btn btn-light">
          See loops running in the demo <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
