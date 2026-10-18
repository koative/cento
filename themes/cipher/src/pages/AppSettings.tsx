import { useState } from "react";
import { app } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

export default function AppSettings() {
  const s = app.settings;
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(s.toggles.map((t) => [t.id, t.on])),
  );
  const form = useForm(
    {
      cadence: "Quarterly",
      escalation: "After 7 days",
      idle: "60",
      owner: "security-oncall@alder.example",
    },
    (v) => ({
      idle:
        !/^\d+$/.test(v.idle) || +v.idle < 14 || +v.idle > 365
          ? "Use a whole number of days between 14 and 365."
          : undefined,
      owner: !EMAIL.test(v.owner)
        ? "Enter a full address, e.g. security@alder.example."
        : undefined,
    }),
  );

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Settings</h1>
          <p>Defaults for new campaigns in {app.workspace}</p>
        </div>
      </header>

      <form
        className="panel settings"
        onSubmit={form.submit}
        noValidate
        aria-label="Workspace settings"
      >
        <section aria-labelledby="set-cadence">
          <h2 id="set-cadence" className="panel-title">
            Cadence
          </h2>
          <div className="field-row">
            <Field
              form={form}
              name="cadence"
              label="Review every"
              options={s.cadence}
            />
            <Field
              form={form}
              name="escalation"
              label="Escalate overdue reviewers"
              options={s.escalation}
            />
          </div>
          <div className="field-row">
            <Field
              form={form}
              name="idle"
              label="Flag grants unused for (days)"
              inputMode="numeric"
              hint="Applies to the Unused signal. 60 is a common audit threshold."
            />
            <Field
              form={form}
              name="owner"
              label="Escalation contact"
              type="email"
            />
          </div>
        </section>

        <section aria-labelledby="set-policy">
          <h2 id="set-policy" className="panel-title">
            Policy
          </h2>
          <ul className="switches">
            {s.toggles.map((t) => (
              <li key={t.id}>
                <label className="switch">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={toggles[t.id]}
                    onChange={(e) =>
                      setToggles({ ...toggles, [t.id]: e.target.checked })
                    }
                    aria-describedby={`${t.id}-hint`}
                  />
                  <span className="switch-track" aria-hidden />
                  <span>{t.label}</span>
                </label>
                <p className="field-hint" id={`${t.id}-hint`}>
                  {t.hint}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="settings-foot">
          <button
            className="btn btn-primary"
            disabled={form.status === "sending"}
          >
            {form.status === "sending" ? "Saving…" : "Save settings"}
          </button>
          <p
            className={form.status === "done" ? "form-success" : "quiet small"}
            role="status"
          >
            {form.status === "done"
              ? `Saved. New campaigns run ${form.values.cadence.toLowerCase()} and flag grants idle for ${form.values.idle} days.`
              : "Demo workspace: settings stay in this tab."}
          </p>
        </div>
      </form>
    </div>
  );
}
