import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";
import { Link } from "../router";
import {
  app,
  competencies,
  jobs,
  kitPage,
  recommendations,
  type Candidate,
  type Recommendation,
} from "../content";
import { addScorecard, useDemo } from "../lib/store";
import { focusOnMount, useForm } from "../components/form";
import { Avatar } from "../components/Visuals";

const levels = ["Weak", "Mixed", "Solid", "Exceptional"];

export default function AppKit({ id }: { id?: string }) {
  const { candidates } = useDemo();
  if (!id) return <KitPicker />;
  return <Kit key={id} candidate={candidates.find((c) => c.id === id)!} />;
}

function KitPicker() {
  const { candidates } = useDemo();
  const upcoming = candidates.filter(
    (c) => c.next && c.next.step !== "Decision meeting",
  );
  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>{kitPage.title}</h1>
          <p>{kitPage.intro}</p>
        </div>
      </header>
      <ul className="panel list">
        {upcoming.map((c) => (
          <li key={c.id}>
            <Avatar name={c.name} size="sm" />
            <span className="list-main">
              <strong>{c.name}</strong>
              <small>
                {c.next!.step} · {jobs.find((j) => j.id === c.jobId)!.title}
              </small>
            </span>
            <span className="num list-time">{c.next!.when}</span>
            <Link
              to={`/app/kit/${c.id}`}
              className="btn btn-small"
              aria-label={`Open kit for ${c.name}`}
            >
              Open kit <ArrowRight size={14} aria-hidden />
            </Link>
          </li>
        ))}
        {!upcoming.length && (
          <li className="empty-row">
            Every interview on your schedule has a scorecard. Nice work.
          </li>
        )}
      </ul>
    </div>
  );
}

function Kit({ candidate: c }: { candidate: Candidate }) {
  const job = jobs.find((j) => j.id === c.jobId)!;
  const step = c.next?.step ?? "Follow-up conversation";
  const comps = job.competencies.map((id) =>
    competencies.find((x) => x.id === id)!,
  );
  const initial: Record<string, string> = { recommendation: "", note: "" };
  comps.forEach((x) => (initial[x.id] = ""));

  const form = useForm(
    initial,
    (v) => {
      const errors: Record<string, string | undefined> = {};
      comps.forEach((x) => {
        if (!v[x.id])
          errors[x.id] =
            `Rate ${x.label.toLowerCase()}. If you did not cover it, pick the level the evidence supports and say so in your note.`;
      });
      if (!v.recommendation)
        errors.recommendation =
          "Choose a recommendation. There is no neutral option on purpose.";
      if (v.note.trim().length < 20)
        errors.note = `Write at least 20 characters of evidence (${v.note.trim().length} so far). Quote what they said or did.`;
      return errors;
    },
    (v) =>
      addScorecard(c.id, {
        by: app.user.name,
        step,
        ratings: Object.fromEntries(comps.map((x) => [x.id, Number(v[x.id])])),
        recommendation: v.recommendation as Recommendation,
        note: v.note.trim(),
      }),
  );

  if (form.status === "done")
    return (
      <div className="app-page">
        <div
          className="panel form-done kit-done"
          role="status"
          aria-live="polite"
        >
          <CircleCheck size={32} aria-hidden />
          <h1 tabIndex={-1} ref={focusOnMount}>
            Scorecard submitted for {c.name}.
          </h1>
          <p>
            Your {form.values.recommendation.toLowerCase()} is locked in. You
            will see the other interviewers' scores once everyone on the{" "}
            {job.title.toLowerCase()} loop has submitted.
          </p>
          <div className="actions">
            <Link to={`/app/candidates/${c.id}`} className="btn btn-primary">
              View {c.name.split(" ")[0]}'s profile
            </Link>
            <Link to="/app/kit" className="btn btn-quiet">
              Back to your interviews
            </Link>
          </div>
        </div>
      </div>
    );

  const missing = Object.values(form.errors).filter(Boolean).length;

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <Link to="/app/kit" className="text-link back">
            <ArrowLeft size={16} aria-hidden /> Your interviews
          </Link>
          <h1>
            {step}: {c.name}
          </h1>
          <p>
            {job.title} ·{" "}
            {c.next ? `${c.next.when} with ${c.next.with}` : "Not scheduled"} ·
            scores stay hidden until the panel submits
          </p>
        </div>
      </header>

      <form className="kit" onSubmit={form.submit} noValidate>
        {missing > 0 && (
          <p className="form-alert" role="alert">
            {missing} {missing === 1 ? "thing needs" : "things need"} your
            attention before this scorecard can be submitted.
          </p>
        )}
        {comps.map((x) => (
          <fieldset
            key={x.id}
            className="panel kit-block"
            aria-describedby={form.errors[x.id] ? `err-${x.id}` : undefined}
          >
            <legend>{x.label}</legend>
            <p className="kit-question">{x.question}</p>
            <p className="kit-probe">Follow-up: {x.probe}</p>
            <div className="rubric">
              {x.rubric.map((r, i) => (
                <label key={i} className="rubric-option">
                  <input
                    type="radio"
                    name={x.id}
                    value={String(i + 1)}
                    checked={form.values[x.id] === String(i + 1)}
                    onChange={(e) => form.set(x.id, e.target.value)}
                  />
                  <span className="rubric-level">
                    <span className="num">{i + 1}</span> {levels[i]}
                  </span>
                  <span className="rubric-text">{r}</span>
                </label>
              ))}
            </div>
            {form.errors[x.id] && (
              <p className="field-error" id={`err-${x.id}`}>
                {form.errors[x.id]}
              </p>
            )}
          </fieldset>
        ))}

        <fieldset
          className="panel kit-block"
          aria-describedby={
            form.errors.recommendation ? "err-recommendation" : undefined
          }
        >
          <legend>Recommendation</legend>
          <div className="recs">
            {recommendations.map((r) => (
              <label key={r} className="rec-option" data-rec={r}>
                <input
                  type="radio"
                  name="recommendation"
                  value={r}
                  checked={form.values.recommendation === r}
                  onChange={(e) => form.set("recommendation", e.target.value)}
                />
                <span>{r}</span>
              </label>
            ))}
          </div>
          {form.errors.recommendation && (
            <p className="field-error" id="err-recommendation">
              {form.errors.recommendation}
            </p>
          )}
          <div className="field">
            <label htmlFor="kit-note">Evidence for the panel</label>
            <textarea
              id="kit-note"
              name="note"
              rows={5}
              value={form.values.note}
              aria-invalid={form.errors.note ? true : undefined}
              aria-describedby={form.errors.note ? "err-note" : "hint-note"}
              onChange={(e) => form.set("note", e.target.value)}
            />
            <p className="field-hint" id="hint-note">
              What did they say or do that supports your scores? Others read
              this before the decision meeting.
            </p>
            {form.errors.note && (
              <p className="field-error" id="err-note">
                {form.errors.note}
              </p>
            )}
          </div>
        </fieldset>

        <div className="kit-submit">
          <button
            className="btn btn-primary btn-lg"
            disabled={form.status === "sending"}
          >
            {form.status === "sending"
              ? "Submitting scorecard…"
              : "Submit scorecard"}
          </button>
          <p className="quiet-note">
            Demo: the scorecard is saved in this browser tab only.
          </p>
        </div>
      </form>
    </div>
  );
}
