import { useState } from "react";
import { app, settings } from "../content";
import { EMAIL, Field, useForm } from "../components/form";
import { resetWorkspace } from "../lib/workspace";

export default function AppSettings() {
  const [notify, setNotify] = useState(
    Object.fromEntries(settings.notifications.map((n) => [n.id, n.on])),
  );
  const [resetDone, setResetDone] = useState(false);
  const form = useForm(
    {
      name: app.user.name,
      email: app.user.email,
      workspace: app.workspace,
      language: settings.languages[0],
      retention: settings.retention[2],
    },
    (v) => ({
      name: v.name.trim()
        ? undefined
        : "Enter your name; teammates see it on comments.",
      email: !v.email.trim()
        ? "Enter the email you sign in with."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check it has a name, an @ and a domain."
          : undefined,
      workspace:
        v.workspace.trim().length >= 2
          ? undefined
          : "Workspace names need at least 2 characters.",
      language: v.language
        ? undefined
        : "Choose the default language for suggestions.",
      retention: v.retention
        ? undefined
        : "Choose how long Lucid keeps drafts.",
    }),
  );

  return (
    <div className="app-page">
      <header className="app-head">
        <h1>{settings.heading}</h1>
        <p>{settings.lede}</p>
      </header>

      <form onSubmit={form.submit} noValidate className="settings-form">
        <fieldset className="panel">
          <legend>Profile</legend>
          <div className="form-grid">
            <Field
              form={form}
              name="name"
              label="Name"
              autoComplete="name"
              required
            />
            <Field
              form={form}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
        </fieldset>

        <fieldset className="panel">
          <legend>Workspace</legend>
          <div className="form-grid">
            <Field
              form={form}
              name="workspace"
              label="Workspace name"
              required
            />
            <Field
              form={form}
              name="language"
              label="Default language"
              options={settings.languages}
              required
            />
            <Field
              form={form}
              name="retention"
              label="Keep drafts on Lucid's servers for"
              options={settings.retention}
              hint="Zero retention processes drafts without storing them. Version history then stays on each device."
              required
            />
          </div>
        </fieldset>

        <fieldset className="panel">
          <legend>Email me when</legend>
          <div className="switches">
            {settings.notifications.map((n) => (
              <div key={n.id} className="switch-row">
                <input
                  type="checkbox"
                  role="switch"
                  id={`n-${n.id}`}
                  checked={notify[n.id]}
                  onChange={(e) =>
                    setNotify((s) => ({ ...s, [n.id]: e.target.checked }))
                  }
                />
                <label htmlFor={`n-${n.id}`}>{n.label}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="settings-foot">
          <button
            className="btn btn-primary"
            disabled={form.status === "sending"}
          >
            {form.status === "sending" ? "Saving…" : "Save settings"}
          </button>
          <p
            className={form.status === "done" ? "form-success" : "quiet-note"}
            role="status"
          >
            {form.status === "done"
              ? "Settings saved for this session."
              : "Demo only: nothing leaves your browser."}
          </p>
        </div>
      </form>

      <section className="panel danger" aria-labelledby="reset-title">
        <h2 id="reset-title">Reset the demo</h2>
        <p>
          Restore every document, suggestion and house style rule to how the
          demo started.
        </p>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            resetWorkspace();
            setResetDone(true);
          }}
        >
          Reset demo data
        </button>
        <p className="quiet-note" role="status">
          {resetDone
            ? "Done. All documents are back to their original suggestions."
            : ""}
        </p>
      </section>
    </div>
  );
}
