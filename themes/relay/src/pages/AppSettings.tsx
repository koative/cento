import { useState } from "react";
import { Copy, Eye, EyeOff, RefreshCw, Trash2 } from "lucide-react";
import { app } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const CHANNELS = ["Email", "SMS", "Webhook"] as const;

export default function AppSettings() {
  const [saved, setSaved] = useState("");
  const profile = useForm(
    {
      company: app.workspace,
      vat: "NL004495445B01",
      address: "Keileweg 18, 3029 BS Rotterdam",
      window: "08:00–16:00",
    },
    (v) => ({
      company: v.company.trim()
        ? undefined
        : "Enter the company name shown on documents.",
      vat: /^[A-Z]{2}[0-9A-Z]{8,12}$/.test(v.vat.replace(/\s/g, ""))
        ? undefined
        : "VAT numbers start with a country code, e.g. NL004495445B01.",
      address:
        v.address.trim().length > 5
          ? undefined
          : "Enter the default collection address.",
    }),
    () => setSaved("Company profile saved."),
  );

  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    "exception-Email": true,
    "exception-SMS": true,
    "eta-Email": true,
    "delivered-Email": true,
    "delivered-Webhook": true,
    "invoice-Email": true,
  });

  const [team, setTeam] = useState(app.team);
  const invite = useForm(
    { email: "", role: "Planner" },
    (v) => ({
      email: !EMAIL.test(v.email)
        ? "Enter a full email address, e.g. name@company.com."
        : team.some((m) => m.email === v.email.trim().toLowerCase())
          ? "That person is already in the workspace."
          : undefined,
    }),
    (v) => {
      setTeam((t) => [
        ...t,
        {
          name: v.email.split("@")[0],
          email: v.email.trim().toLowerCase(),
          role: v.role,
        },
      ]);
      setSaved(`Invitation sent to ${v.email} (demo — nothing was sent).`);
      invite.reset();
    },
  );

  const [reveal, setReveal] = useState(false);
  const [key, setKey] = useState(app.apiKey);
  const [confirmRotate, setConfirmRotate] = useState(false);

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(key);
      setSaved("API key copied to the clipboard.");
    } catch {
      setSaved(
        "Copy is blocked in this browser. Reveal the key and copy it by hand.",
      );
    }
  }

  function rotate() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    setKey(
      `rk_live_${Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")}`,
    );
    setConfirmRotate(false);
    setSaved("New API key created. The old key stops working in 24 hours.");
  }

  return (
    <div className="app-page settings">
      <header className="app-head">
        <div>
          <h1>Settings</h1>
          <p className="muted">Workspace, alerts, team and API access.</p>
        </div>
      </header>
      <p className={saved ? "notice is-ok" : "notice"} aria-live="polite">
        {saved}
      </p>

      <section className="panel settings-block" aria-labelledby="s-profile">
        <div className="settings-intro">
          <h2 id="s-profile">Company profile</h2>
          <p className="muted">Printed on eCMRs, labels and invoices.</p>
        </div>
        <form className="form-grid" onSubmit={profile.submit} noValidate>
          <Field form={profile} name="company" label="Company name" required />
          <Field form={profile} name="vat" label="VAT number" required />
          <Field
            form={profile}
            name="address"
            label="Default collection address"
            className="span-2"
            required
          />
          <Field
            form={profile}
            name="window"
            label="Default loading window"
            options={["06:00–14:00", "08:00–16:00", "10:00–18:00"]}
          />
          <div className="span-2">
            <button
              className="btn btn-primary"
              disabled={profile.status === "sending"}
            >
              {profile.status === "sending" ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </section>

      <section className="panel settings-block" aria-labelledby="s-alerts">
        <div className="settings-intro">
          <h2 id="s-alerts">Alerts</h2>
          <p className="muted">
            Choose how each event reaches you. Changes apply immediately.
          </p>
        </div>
        <div className="table-scroll">
          <table className="data-table alert-matrix">
            <thead>
              <tr>
                <th scope="col">Event</th>
                {CHANNELS.map((c) => (
                  <th scope="col" key={c}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {app.notifications.map((n) => (
                <tr key={n.id}>
                  <th scope="row">
                    {n.label}
                    <small className="muted">{n.text}</small>
                  </th>
                  {CHANNELS.map((c) => {
                    const k = `${n.id}-${c}`;
                    return (
                      <td key={c}>
                        <label className="switch">
                          <input
                            type="checkbox"
                            role="switch"
                            checked={!!prefs[k]}
                            onChange={(e) => {
                              setPrefs((p) => ({
                                ...p,
                                [k]: e.target.checked,
                              }));
                              setSaved(
                                `${n.label} by ${c.toLowerCase()} ${e.target.checked ? "on" : "off"}.`,
                              );
                            }}
                          />
                          <span className="sr-only">
                            {n.label} by {c}
                          </span>
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel settings-block" aria-labelledby="s-team">
        <div className="settings-intro">
          <h2 id="s-team">Team</h2>
          <p className="muted">
            {team.length} of 10 seats on the Operate plan. Planners book and
            edit; Finance sees invoices.
          </p>
        </div>
        <ul className="team-list">
          {team.map((m) => (
            <li key={m.email}>
              <span className="avatar" aria-hidden>
                {m.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="team-who">
                {m.name}
                <small className="muted">{m.email}</small>
              </span>
              <label className="sr-only" htmlFor={`role-${m.email}`}>
                Role for {m.name}
              </label>
              <select
                id={`role-${m.email}`}
                value={m.role}
                disabled={m.email === app.user.email}
                onChange={(e) =>
                  setTeam((t) =>
                    t.map((x) =>
                      x.email === m.email ? { ...x, role: e.target.value } : x,
                    ),
                  )
                }
              >
                {["Admin", "Planner", "Finance"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <button
                type="button"
                className="icon-button"
                aria-label={`Remove ${m.name}`}
                disabled={m.email === app.user.email}
                onClick={() => {
                  setTeam((t) => t.filter((x) => x.email !== m.email));
                  setSaved(`${m.name} removed from the workspace.`);
                }}
              >
                <Trash2 size={16} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <form className="invite" onSubmit={invite.submit} noValidate>
          <Field
            form={invite}
            name="email"
            label="Invite by email"
            type="email"
            placeholder="name@company.com"
          />
          <Field
            form={invite}
            name="role"
            label="Role"
            options={["Planner", "Finance", "Admin"]}
          />
          <button
            className="btn btn-ghost"
            disabled={invite.status === "sending" || team.length >= 10}
          >
            {invite.status === "sending" ? "Inviting…" : "Send invite"}
          </button>
        </form>
      </section>

      <section className="panel settings-block" aria-labelledby="s-api">
        <div className="settings-intro">
          <h2 id="s-api">API key</h2>
          <p className="muted">
            Use it for the REST API and to verify webhook signatures. Keep it
            server-side.
          </p>
        </div>
        <div className="api-key">
          <code className="num">
            {reveal ? key : `${key.slice(0, 8)}${"•".repeat(16)}`}
          </code>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setReveal((r) => !r)}
            aria-pressed={reveal}
          >
            {reveal ? (
              <EyeOff size={16} aria-hidden />
            ) : (
              <Eye size={16} aria-hidden />
            )}{" "}
            {reveal ? "Hide" : "Reveal"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={copyKey}>
            <Copy size={16} aria-hidden /> Copy
          </button>
          {confirmRotate ? (
            <span className="confirm">
              <span>Old key stops in 24 h.</span>
              <button type="button" className="btn btn-danger" onClick={rotate}>
                Rotate now
              </button>
              <button
                type="button"
                className="btn btn-quiet"
                onClick={() => setConfirmRotate(false)}
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setConfirmRotate(true)}
            >
              <RefreshCw size={16} aria-hidden /> Rotate key
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
