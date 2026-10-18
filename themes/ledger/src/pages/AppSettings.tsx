import { useState } from "react";
import { EMAIL, Field, useForm } from "../components/form";
import { actions, useLedger } from "../lib/store";

export default function AppSettings() {
  const { prefs, institutions } = useLedger();
  const [removed, setRemoved] = useState("");
  const form = useForm(
    {
      name: prefs.name,
      email: prefs.email,
      weekStart: prefs.weekStart,
      largePurchase: prefs.largePurchase,
      hideOnOpen: prefs.hideOnOpen ? "yes" : "",
      alertAt80: prefs.alertAt80 ? "yes" : "",
      weeklyDigest: prefs.weeklyDigest ? "yes" : "",
    },
    (v) => ({
      name: v.name.trim()
        ? undefined
        : "Your name cannot be empty; it appears on the card and on shared budgets.",
      email: EMAIL.test(v.email)
        ? undefined
        : "Enter a full email address, like jamie@example.com.",
      largePurchase:
        /^\d+$/.test(v.largePurchase) && Number(v.largePurchase) >= 10
          ? undefined
          : "Use a whole dollar amount of $10 or more.",
    }),
    (v) =>
      actions.savePrefs({
        name: v.name.trim(),
        email: v.email.trim(),
        weekStart: v.weekStart === "Sunday" ? "Sunday" : "Monday",
        largePurchase: v.largePurchase,
        hideOnOpen: v.hideOnOpen === "yes",
        alertAt80: v.alertAt80 === "yes",
        weeklyDigest: v.weeklyDigest === "yes",
      }),
  );

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Settings</h1>
          <p>Changes apply to this demo session only.</p>
        </div>
      </header>

      <form className="settings" onSubmit={form.submit} noValidate>
        <section className="panel" aria-labelledby="profile-h">
          <h2 id="profile-h">Profile</h2>
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
        </section>

        <section className="panel" aria-labelledby="prefs-h">
          <h2 id="prefs-h">Budget and alerts</h2>
          <Field
            form={form}
            name="weekStart"
            label="Weeks start on"
            options={["Monday", "Sunday"]}
          />
          <Field
            form={form}
            name="largePurchase"
            label="Notify me about purchases over ($)"
            inputMode="numeric"
            hint="A push notification arrives within a second of the card being used."
          />
          <Field
            form={form}
            name="alertAt80"
            type="checkbox"
            label="Tell me when an envelope is 80% spent"
          />
          <Field
            form={form}
            name="weeklyDigest"
            type="checkbox"
            label="Send a Sunday morning summary email"
          />
          <Field
            form={form}
            name="hideOnOpen"
            type="checkbox"
            label="Hide balances when the app opens"
          />
        </section>

        <div className="settings-save">
          <button
            className="btn btn-primary"
            disabled={form.status === "sending"}
          >
            {form.status === "sending" ? "Saving…" : "Save changes"}
          </button>
          <p
            className={form.status === "done" ? "form-success" : "quiet-note"}
            role="status"
          >
            {form.status === "done"
              ? "Saved. Your name and alerts are updated across the demo."
              : "Nothing leaves your browser."}
          </p>
        </div>
      </form>

      <section className="panel" aria-labelledby="banks-h">
        <h2 id="banks-h">Connected institutions</h2>
        {institutions.length ? (
          <ul className="bank-list">
            {institutions.map((i) => (
              <li key={i.id}>
                <span>
                  {i.name}
                  <small>
                    {i.accounts} {i.accounts === 1 ? "account" : "accounts"} ·
                    synced {i.synced}
                  </small>
                </span>
                <button
                  type="button"
                  className="btn btn-quiet btn-small"
                  onClick={() => {
                    actions.disconnect(i.id);
                    setRemoved(
                      `${i.name} disconnected. Past transactions are kept.`,
                    );
                  }}
                >
                  Disconnect
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="panel-note">
            No banks connected. Reload the page to restore the demo connections.
          </p>
        )}
        <p className="form-success" role="status">
          {removed}
        </p>
      </section>
    </div>
  );
}
