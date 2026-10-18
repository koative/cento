import { useState } from "react";
import { Copy, Eye, EyeOff, RefreshCw, Trash2 } from "lucide-react";
import { app } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

type Member = (typeof app.team)[number];
const ROLES: Member["role"][] = ["Admin", "Editor", "Viewer"];

export default function AppSettings() {
  const workspace = useForm(
    {
      name: app.workspace,
      timezone: app.timezones[0],
      retention: app.retention[1],
    },
    (v) => ({
      name:
        v.name.trim().length >= 2
          ? undefined
          : "Workspace names need at least 2 characters.",
    }),
  );
  const [team, setTeam] = useState(app.team);
  const [teamNote, setTeamNote] = useState("");
  const invite = useForm(
    { email: "", role: "Viewer" },
    (v) => ({
      email: !EMAIL.test(v.email)
        ? "Enter a full email address, like name@fernway.example."
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
          role: v.role as Member["role"],
        },
      ]);
      setTeamNote(`Invitation sent to ${v.email}.`);
      invite.reset();
    },
  );
  const [key, setKey] = useState(app.apiKey);
  const [reveal, setReveal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [keyNote, setKeyNote] = useState("");
  const [notify, setNotify] = useState(() =>
    Object.fromEntries(app.notifications.map((n) => [n.id, n.on])),
  );

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(key);
      setKeyNote("API key copied to the clipboard.");
    } catch {
      setKeyNote(
        "Copy is blocked in this browser. Reveal the key and select it instead.",
      );
    }
  }
  function regenerate() {
    const fresh =
      "sg_live_" +
      Array.from(crypto.getRandomValues(new Uint8Array(10)), (b) =>
        b.toString(16).padStart(2, "0"),
      ).join("");
    setKey(fresh);
    setConfirm(false);
    setKeyNote("New key generated. The old key stops working in 24 hours.");
  }

  return (
    <div className="app-page settings">
      <header className="app-head">
        <div>
          <h1>Settings</h1>
          <p>Changes stay in this browser tab. Nothing is saved to a server.</p>
        </div>
      </header>

      <section className="app-card" aria-labelledby="ws-title">
        <h2 id="ws-title" className="panel-title">
          Workspace
        </h2>
        <form onSubmit={workspace.submit} noValidate className="settings-form">
          <Field form={workspace} name="name" label="Workspace name" required />
          <Field
            form={workspace}
            name="timezone"
            label="Reporting timezone"
            options={app.timezones}
            hint="Daily buckets start at midnight in this zone."
          />
          <Field
            form={workspace}
            name="retention"
            label="Keep raw events for"
            options={app.retention}
          />
          <div className="form-foot">
            <button
              className="btn btn-primary btn-sm"
              disabled={workspace.status === "sending"}
            >
              {workspace.status === "sending" ? "Saving…" : "Save changes"}
            </button>
            <p className="quiet-note" role="status">
              {workspace.status === "done"
                ? `Saved. ${workspace.values.name} reports in ${workspace.values.timezone}.`
                : ""}
            </p>
          </div>
        </form>
      </section>

      <section className="app-card" aria-labelledby="team-title">
        <h2 id="team-title" className="panel-title">
          Team{" "}
          <span className="muted">· {team.length} people, unlimited seats</span>
        </h2>
        <div
          className="table-scroll"
          role="region"
          aria-labelledby="team-title"
          tabIndex={0}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Person</th>
                <th scope="col">Role</th>
                <th scope="col">
                  <span className="visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {team.map((m) => (
                <tr key={m.email}>
                  <td>
                    <strong>{m.name}</strong>
                    <br />
                    <small className="muted">{m.email}</small>
                  </td>
                  <td>
                    <select
                      aria-label={`Role for ${m.name}`}
                      value={m.role}
                      disabled={m.email === app.user.email}
                      onChange={(e) => {
                        setTeam(
                          team.map((x) =>
                            x.email === m.email
                              ? { ...x, role: e.target.value as Member["role"] }
                              : x,
                          ),
                        );
                        setTeamNote(
                          `${m.name} is now ${e.target.value === "Admin" ? "an" : "a"} ${e.target.value}.`,
                        );
                      }}
                    >
                      {ROLES.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="r">
                    {m.email !== app.user.email && (
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`Remove ${m.name}`}
                        onClick={() => {
                          setTeam(team.filter((x) => x.email !== m.email));
                          setTeamNote(`${m.name} removed from the workspace.`);
                        }}
                      >
                        <Trash2 size={15} aria-hidden />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form onSubmit={invite.submit} noValidate className="invite">
          <Field
            form={invite}
            name="email"
            label="Invite by email"
            type="email"
            placeholder="name@fernway.example"
          />
          <Field form={invite} name="role" label="Role" options={ROLES} />
          <button
            className="btn btn-ghost btn-sm"
            disabled={invite.status === "sending"}
          >
            {invite.status === "sending" ? "Inviting…" : "Send invite"}
          </button>
        </form>
        <p className="quiet-note" role="status">
          {teamNote}
        </p>
      </section>

      <section className="app-card" aria-labelledby="key-title">
        <h2 id="key-title" className="panel-title">
          API key
        </h2>
        <p className="muted">
          Use this key in the SDK's init call. It can send events but cannot
          read data.
        </p>
        <div className="key-row">
          <code className="key">
            {reveal ? key : key.slice(0, 8) + "•".repeat(12) + key.slice(-4)}
          </code>
          <button
            type="button"
            className="icon-btn"
            aria-pressed={reveal}
            onClick={() => setReveal((r) => !r)}
            aria-label="Show full key"
          >
            {reveal ? (
              <EyeOff size={15} aria-hidden />
            ) : (
              <Eye size={15} aria-hidden />
            )}
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={copyKey}
            aria-label="Copy key"
          >
            <Copy size={15} aria-hidden />
          </button>
          {confirm ? (
            <span className="confirm">
              Old key stops in 24 h.
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={regenerate}
              >
                Regenerate
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setConfirm(true)}
            >
              <RefreshCw size={15} aria-hidden /> Regenerate
            </button>
          )}
        </div>
        <p className="quiet-note" role="status">
          {keyNote}
        </p>
      </section>

      <section className="app-card" aria-labelledby="notify-title">
        <h2 id="notify-title" className="panel-title">
          Notifications
        </h2>
        <ul className="toggles">
          {app.notifications.map((n) => (
            <li key={n.id}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notify[n.id]}
                  onChange={(e) =>
                    setNotify({ ...notify, [n.id]: e.target.checked })
                  }
                />
                <span>
                  <strong>{n.label}</strong>
                  <small>{n.text}</small>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
