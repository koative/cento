import { useState } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { app } from "../content";
import { CopyButton } from "../components/bits";
import { EMAIL, Field, useForm } from "../components/form";

type Key = { id: string; label: string; value: string; created: string };
const newKey = (prefix: string) =>
  prefix +
  Array.from(
    { length: 24 },
    () =>
      "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"[
        Math.floor(Math.random() * 55)
      ],
  ).join("");

export default function AppSettings() {
  const [keys, setKeys] = useState<Key[]>([
    {
      id: "test",
      label: "Test key",
      value: "ck_test_4fQ9xTnW2mRb8KdP7sLvZ3hY",
      created: "Mar 2, 2026",
    },
    {
      id: "live",
      label: "Live key",
      value: "ck_live_9hJ2pWq6NcV4tXr8BmLs5DkG",
      created: "Mar 2, 2026",
    },
  ]);
  const [shown, setShown] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [keyNote, setKeyNote] = useState("");

  const form = useForm(
    {
      webhook: "https://shop.northbank.example/hooks/conduit",
      retries: "5",
      alertEmail: app.user.email,
      digest: "yes",
    },
    (v) => {
      let webhook: string | undefined;
      try {
        const u = new URL(v.webhook);
        if (u.protocol !== "https:")
          webhook =
            "Webhook URLs must use https:// so payloads are encrypted in transit.";
      } catch {
        webhook = "Enter a full URL, starting with https://";
      }
      return {
        webhook,
        alertEmail: EMAIL.test(v.alertEmail)
          ? undefined
          : "Enter the email that should receive failure alerts.",
      };
    },
  );

  function rotate(k: Key) {
    setKeys((ks) =>
      ks.map((x) =>
        x.id === k.id
          ? { ...x, value: newKey(`ck_${k.id}_`), created: "Just now" }
          : x,
      ),
    );
    setConfirm(null);
    setShown(k.id);
    setKeyNote(`${k.label} rotated. The old key keeps working for 24 hours.`);
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <h1>Settings</h1>
        <p className="muted">
          {app.workspace} · demo values, nothing is saved beyond this page.
        </p>
      </header>

      <section className="panel" aria-labelledby="keys-h">
        <div className="panel-head">
          <h2 id="keys-h">API keys</h2>
          <p className="muted small" aria-live="polite">
            {keyNote}
          </p>
        </div>
        <ul className="keys">
          {keys.map((k) => (
            <li key={k.id}>
              <div className="key-label">
                <strong>{k.label}</strong>
                <span className="muted small">Created {k.created}</span>
              </div>
              <code className="key-value">
                {shown === k.id
                  ? k.value
                  : k.value.slice(0, 8) + "•".repeat(16) + k.value.slice(-4)}
              </code>
              <div className="key-actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setShown(shown === k.id ? null : k.id)}
                  aria-label={`${shown === k.id ? "Hide" : "Reveal"} ${k.label.toLowerCase()}`}
                >
                  {shown === k.id ? (
                    <EyeOff size={16} aria-hidden />
                  ) : (
                    <Eye size={16} aria-hidden />
                  )}
                </button>
                <CopyButton text={k.value} />
                {confirm === k.id ? (
                  <span className="confirm">
                    <span className="small">Rotate?</span>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => rotate(k)}
                    >
                      Rotate now
                    </button>
                    <button
                      type="button"
                      className="btn btn-quiet btn-sm"
                      onClick={() => setConfirm(null)}
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="btn btn-quiet btn-sm"
                    onClick={() => setConfirm(k.id)}
                  >
                    <RefreshCw size={14} aria-hidden /> Rotate
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel" aria-labelledby="delivery-h">
        <h2 id="delivery-h">Delivery</h2>
        <form
          noValidate
          onSubmit={form.submit}
          className="stack-form settings-form"
        >
          <Field
            form={form}
            name="webhook"
            label="Event webhook URL"
            type="url"
            required
            hint="Conduit signs every delivery with your workspace secret."
          />
          <fieldset className="radio-group">
            <legend>Retry policy for writes</legend>
            {[
              ["0", "No retries — fail fast"],
              ["3", "Up to 3 retries (about 3 seconds)"],
              ["5", "Up to 5 retries (about 13 seconds)"],
              ["8", "Up to 8 retries (about 2 minutes)"],
            ].map(([v, l]) => (
              <label key={v}>
                <input
                  type="radio"
                  name="retries"
                  value={v}
                  checked={form.values.retries === v}
                  onChange={() => form.set("retries", v)}
                />
                {l}
              </label>
            ))}
          </fieldset>
          <Field
            form={form}
            name="alertEmail"
            label="Failure alerts go to"
            type="email"
            required
          />
          <Field
            form={form}
            name="digest"
            label="Send a weekly reliability digest"
            type="checkbox"
          />
          <div className="form-actions">
            <button
              className="btn btn-signal"
              disabled={form.status === "sending"}
            >
              {form.status === "sending" ? "Saving…" : "Save changes"}
            </button>
            <p role="status" className="form-saved">
              {form.status === "done"
                ? "Saved. New deliveries use these settings."
                : ""}
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
