import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Link } from "../router";
import {
  connectors,
  kindLabel,
  type Op,
  type Step,
  type StepKind,
  type Workflow,
} from "../content";
import { connector, formatValue, ruleText, useTestRun } from "../lib/flow";
import { saveWorkflow } from "../lib/workspace";
import { FlowCanvas } from "../components/FlowCanvas";

const opLabel: Record<Op, string> = {
  ">": "is over",
  "<": "is under",
  "=": "is exactly",
};

export default function AppBuilder({ workflow: w }: { workflow: Workflow }) {
  const [selected, setSelected] = useState(w.steps[1]?.id ?? w.steps[0].id);
  const [adding, setAdding] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [notice, setNotice] = useState("");
  const run = useTestRun(w.steps, w.sample);
  const index = w.steps.findIndex((s) => s.id === selected);
  const step = w.steps[index];

  const save = (patch: Partial<Workflow>, message = "") => {
    saveWorkflow({ ...w, ...patch, edited: "Just now" });
    setNotice(message);
  };
  const updateStep = (patch: Partial<Step>) =>
    save({
      steps: w.steps.map((s) => (s.id === selected ? { ...s, ...patch } : s)),
    });

  function addStep(kind: StepKind) {
    const id = `s${Date.now().toString(36)}`;
    const first = w.sample[0];
    const next: Step =
      kind === "condition"
        ? {
            id,
            kind,
            app: "flux",
            title: "Condition",
            rule: { field: first.key, op: ">", value: first.value },
          }
        : kind === "delay"
          ? { id, kind, app: "flux", title: "Wait 1 hour" }
          : { id, kind, app: "hallway", title: "Post message to channel" };
    save(
      { steps: [...w.steps, next] },
      `${kindLabel[kind]} step added at position ${w.steps.length + 1}.`,
    );
    setSelected(id);
    setAdding(false);
  }

  function move(dir: -1 | 1) {
    const steps = [...w.steps];
    [steps[index], steps[index + dir]] = [steps[index + dir], steps[index]];
    save({ steps }, `Step moved to position ${index + dir + 1}.`);
  }

  function remove() {
    const steps = w.steps.filter((s) => s.id !== selected);
    save(
      { steps },
      `Step “${step.rule ? ruleText(step.rule, w.sample) : step.title}” removed.`,
    );
    setSelected(steps[Math.max(0, index - 1)].id);
  }

  const appChoices = connectors.filter((c) =>
    step?.kind === "trigger" ? c.triggers.length : c.actions.length,
  );
  const verbs =
    step &&
    (step.kind === "trigger"
      ? connector(step.app)?.triggers
      : connector(step.app)?.actions);

  return (
    <div className="app-page builder">
      <header className="builder-head">
        <Link to="/app/workflows" className="back-link">
          <ArrowLeft size={16} aria-hidden /> Workflows
        </Link>
        <div className="builder-title">
          {renaming ? (
            <form
              className="rename"
              onSubmit={(e) => {
                e.preventDefault();
                const name = String(
                  new FormData(e.currentTarget).get("name") ?? "",
                ).trim();
                if (name) save({ name }, "Workflow renamed.");
                setRenaming(false);
              }}
            >
              <label htmlFor="wf-name" className="sr-only">
                Workflow name
              </label>
              <input
                id="wf-name"
                name="name"
                defaultValue={w.name}
                autoFocus
                maxLength={80}
                onKeyDown={(e) => e.key === "Escape" && setRenaming(false)}
              />
              <button className="icon-btn" aria-label="Save name">
                <Check size={18} aria-hidden />
              </button>
            </form>
          ) : (
            <>
              <h1>{w.name}</h1>
              <button
                type="button"
                className="icon-btn"
                aria-label="Rename workflow"
                onClick={() => setRenaming(true)}
              >
                <Pencil size={16} aria-hidden />
              </button>
            </>
          )}
        </div>
        <p className="builder-meta">
          {w.team} · owner {w.owner} · edited {w.edited}
        </p>
        <div className="builder-actions">
          <span className="switch-label">
            <button
              type="button"
              role="switch"
              className="switch"
              aria-checked={w.on}
              aria-labelledby="live-label"
              onClick={() =>
                save(
                  { on: !w.on },
                  w.on
                    ? "Workflow switched off."
                    : "Workflow is live. In this demo nothing actually runs.",
                )
              }
            >
              <span aria-hidden="true" />
            </button>
            <span id="live-label">{w.on ? "Live" : "Off"}</span>
          </span>
          <button
            type="button"
            className="btn btn-plum"
            onClick={run.run}
            disabled={run.running}
          >
            <Play size={16} aria-hidden />{" "}
            {run.running ? "Testing…" : "Run test"}
          </button>
        </div>
      </header>
      <p className="sr-only" aria-live="polite">
        {notice}
      </p>

      <div className="builder-grid">
        <section className="canvas" aria-labelledby="canvas-h">
          <h2 id="canvas-h" className="sr-only">
            Steps
          </h2>
          <FlowCanvas
            steps={w.steps}
            sample={w.sample}
            states={run.states}
            selected={selected}
            onSelect={setSelected}
          />
          <div className="add-step">
            <span className="wire" aria-hidden="true" />
            <button
              type="button"
              className="btn btn-line"
              aria-expanded={adding}
              aria-controls="add-menu"
              onClick={() => setAdding((a) => !a)}
            >
              <Plus size={16} aria-hidden /> Add a step
            </button>
            {adding && (
              <ul id="add-menu" className="add-menu">
                {(["action", "condition", "delay"] as StepKind[]).map((k) => (
                  <li key={k}>
                    <button type="button" onClick={() => addStep(k)}>
                      <strong>{kindLabel[k]}</strong>
                      <span>
                        {k === "action"
                          ? "Do something in a connected app"
                          : k === "condition"
                            ? "Stop unless the record matches"
                            : "Pause before the next step"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <aside className="inspector" aria-labelledby="insp-h">
          {step && (
            <>
              <p className="insp-kind">
                Step {index + 1} · {kindLabel[step.kind]}
              </p>
              <h2 id="insp-h">
                {step.rule ? ruleText(step.rule, w.sample) : step.title}
              </h2>

              {(step.kind === "trigger" || step.kind === "action") && (
                <>
                  <label className="field">
                    App
                    <select
                      value={step.app}
                      onChange={(e) => {
                        const c = connector(e.target.value)!;
                        updateStep({
                          app: c.slug,
                          title: (step.kind === "trigger"
                            ? c.triggers
                            : c.actions)[0],
                        });
                      }}
                    >
                      {appChoices.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    {step.kind === "trigger" ? "Event" : "Action"}
                    <select
                      value={verbs?.includes(step.title) ? step.title : ""}
                      onChange={(e) => updateStep({ title: e.target.value })}
                    >
                      {!verbs?.includes(step.title) && (
                        <option value="">{step.title} (custom)</option>
                      )}
                      {verbs?.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {step.kind === "condition" && step.rule && (
                <fieldset className="rule">
                  <legend>Continue only if</legend>
                  <label className="field">
                    Field
                    <select
                      value={step.rule.field}
                      onChange={(e) =>
                        updateStep({
                          rule: { ...step.rule!, field: e.target.value },
                        })
                      }
                    >
                      {w.sample.map((f) => (
                        <option key={f.key} value={f.key}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    Comparison
                    <select
                      value={step.rule.op}
                      onChange={(e) =>
                        updateStep({
                          rule: { ...step.rule!, op: e.target.value as Op },
                        })
                      }
                    >
                      {(Object.keys(opLabel) as Op[]).map((o) => (
                        <option key={o} value={o}>
                          {opLabel[o]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    Value
                    <input
                      type="number"
                      inputMode="numeric"
                      value={step.rule.value}
                      onChange={(e) =>
                        updateStep({
                          rule: {
                            ...step.rule!,
                            value: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </label>
                </fieldset>
              )}

              {step.kind === "delay" && (
                <label className="field">
                  Wait label
                  <input
                    value={step.title}
                    maxLength={60}
                    onChange={(e) => updateStep({ title: e.target.value })}
                  />
                </label>
              )}

              {step.kind !== "trigger" && (
                <div className="insp-tools">
                  <button
                    type="button"
                    className="btn btn-line btn-sm"
                    disabled={index <= 1}
                    onClick={() => move(-1)}
                  >
                    <ArrowUp size={16} aria-hidden /> Move up
                  </button>
                  <button
                    type="button"
                    className="btn btn-line btn-sm"
                    disabled={index >= w.steps.length - 1}
                    onClick={() => move(1)}
                  >
                    <ArrowDown size={16} aria-hidden /> Move down
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={remove}
                  >
                    <Trash2 size={16} aria-hidden /> Remove
                  </button>
                </div>
              )}
              {step.kind === "trigger" && (
                <p className="insp-note">
                  Every workflow starts with exactly one trigger. Change its app
                  or event here.
                </p>
              )}
            </>
          )}
        </aside>

        <section className="test-panel" aria-labelledby="test-h">
          <h2 id="test-h">Test bench</h2>
          <p>
            Edit the sample record, then run a test. Nothing is sent to any app.
          </p>
          <div className="sample">
            {w.sample.map((f) => (
              <label key={f.key} className="field">
                <span>
                  {f.label}
                  {f.unit && <small> ({f.unit})</small>}
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={f.value}
                  onChange={(e) =>
                    save({
                      sample: w.sample.map((x) =>
                        x.key === f.key
                          ? { ...x, value: Number(e.target.value) }
                          : x,
                      ),
                    })
                  }
                />
              </label>
            ))}
          </div>
          <div className="test-actions">
            <button
              type="button"
              className="btn btn-plum"
              onClick={run.run}
              disabled={run.running}
            >
              <Play size={16} aria-hidden />{" "}
              {run.running ? "Testing…" : "Run test"}
            </button>
            {run.done && (
              <button
                type="button"
                className="btn btn-quiet"
                onClick={run.reset}
              >
                <RotateCcw size={16} aria-hidden /> Clear result
              </button>
            )}
          </div>
          <div aria-live="polite">
            {run.done && run.states && (
              <div
                className="test-log"
                data-outcome={run.stoppedAt >= 0 ? "stopped" : "done"}
              >
                <p className="test-summary">
                  {run.stoppedAt >= 0
                    ? `Stopped at step ${run.stoppedAt + 1}: the condition was not met, so the remaining ${w.steps.length - run.stoppedAt - 1} skipped.`
                    : `Test passed: all ${w.steps.length} steps would run for ${w.sample.map((f) => formatValue(f, f.value)).join(", ")}.`}
                </p>
                <ol>
                  {w.steps.map((s, i) => (
                    <li key={s.id} data-state={run.states![i]}>
                      <span>
                        {s.rule ? ruleText(s.rule, w.sample) : s.title}
                      </span>
                      <span className="num">
                        {run.states![i] === "done"
                          ? `${40 + ((i * 53) % 180)} ms`
                          : run.states![i] === "stopped"
                            ? "condition not met"
                            : "skipped"}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
