import { useState, type FormEvent } from "react";
import { notificationOptions, statuses } from "../content";
import { saveSettings, useDemo, type Role } from "../lib/store";
import { EMAIL } from "../components/form";
import { initials } from "../lib/format";

const roles: Role[] = ["Admin", "Member", "Guest"];

export default function AppSettings() {
  const state = useDemo();
  const [name, setName] = useState(state.workspaceName);
  const [weekStart, setWeekStart] = useState(state.weekStart);
  const [limits, setLimits] = useState(state.limits);
  const [errors, setErrors] = useState<{ name?: string; limits?: string }>({});
  const [saving, setSaving] = useState(false);
  const [said, setSaid] = useState("");
  const [invite, setInvite] = useState({ email: "", role: "Member" as Role });
  const [inviteError, setInviteError] = useState("");

  function save(e: FormEvent) {
    e.preventDefault();
    const found = {
      name:
        name.trim().length < 2
          ? "Give the workspace a name of at least 2 characters."
          : undefined,
      limits: Object.values(limits).some((l) => l !== null && (l < 1 || l > 50))
        ? "WIP limits must be between 1 and 50, or left empty for no limit."
        : undefined,
    };
    setErrors(found);
    if (found.name || found.limits) {
      setSaid("");
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      saveSettings({ workspaceName: name.trim(), weekStart, limits });
      setSaving(false);
      setSaid("Workspace settings saved. The board now uses the new limits.");
    }, 600);
  }

  function addMember(e: FormEvent) {
    e.preventDefault();
    const email = invite.email.trim().toLowerCase();
    const problem = !email
      ? "Enter an email address to send the invite to."
      : !EMAIL.test(email)
        ? "That email is missing something — check the part after the @."
        : state.members.some((m) => m.email === email)
          ? "That person is already in the workspace."
          : "";
    setInviteError(problem);
    if (problem) return;
    const local = email.split("@")[0].replace(/[._-]+/g, " ");
    const display = local.replace(/\b\w/g, (c) => c.toUpperCase());
    saveSettings({
      members: [
        ...state.members,
        { id: email, name: display, email, role: invite.role },
      ],
    });
    setInvite({ email: "", role: "Member" });
    setSaid(
      `Invite sent to ${email} as ${invite.role}. (Demo: no email leaves the browser.)`,
    );
  }

  return (
    <div className="settings-page">
      <div className="app-head">
        <div>
          <h1>Settings</h1>
          <p className="app-sub">
            Workspace, workflow, people and notifications
          </p>
        </div>
      </div>
      <p className="settings-said" role="status">
        {said}
      </p>

      <form className="settings-block" noValidate onSubmit={save}>
        <h2>Workspace</h2>
        <div className="field-row">
          <div className="field">
            <label htmlFor="ws-name">Workspace name</label>
            <input
              id="ws-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "ws-name-err" : undefined}
            />
            {errors.name && (
              <p className="field-error" id="ws-name-err">
                {errors.name}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="ws-week">Cycles start on</label>
            <select
              id="ws-week"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
            >
              {["Monday", "Tuesday", "Wednesday", "Sunday"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <h2>Workflow limits</h2>
        <p className="muted">
          Leave a column empty for no limit. The column header turns red on the
          board when it holds more.
        </p>
        <div
          className="limits"
          aria-describedby={errors.limits ? "limits-err" : undefined}
        >
          {statuses.map((s) => (
            <div key={s.id} className="field">
              <label htmlFor={`lim-${s.id}`}>{s.name}</label>
              <input
                id={`lim-${s.id}`}
                type="number"
                inputMode="numeric"
                min={1}
                max={50}
                placeholder="No limit"
                value={limits[s.id] ?? ""}
                aria-invalid={
                  errors.limits && limits[s.id] !== null ? true : undefined
                }
                onChange={(e) =>
                  setLimits((l) => ({
                    ...l,
                    [s.id]:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
              />
            </div>
          ))}
        </div>
        {errors.limits && (
          <p className="field-error" id="limits-err">
            {errors.limits}
          </p>
        )}
        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>

      <section className="settings-block" aria-labelledby="members-h">
        <h2 id="members-h">Members</h2>
        <ul className="members">
          {state.members.map((m, n) => (
            <li key={m.id}>
              <span className="avatar" data-tone={n % 5} aria-hidden="true">
                {initials(m.name)}
              </span>
              <span className="member-who">
                <strong>{m.name}</strong>
                <span className="muted">{m.email}</span>
              </span>
              <label className="sr-only" htmlFor={`role-${m.id}`}>
                Role for {m.name}
              </label>
              <select
                id={`role-${m.id}`}
                value={m.role}
                onChange={(e) => {
                  const role = e.target.value as Role;
                  saveSettings({
                    members: state.members.map((x) =>
                      x.id === m.id ? { ...x, role } : x,
                    ),
                  });
                  setSaid(`${m.name} is now ${role}.`);
                }}
              >
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </li>
          ))}
        </ul>
        <form className="invite" noValidate onSubmit={addMember}>
          <div className="field">
            <label htmlFor="inv-email">Invite by email</label>
            <input
              id="inv-email"
              type="email"
              autoComplete="off"
              placeholder="name@fernhill.example"
              value={invite.email}
              aria-invalid={inviteError ? true : undefined}
              aria-describedby={inviteError ? "inv-err" : undefined}
              onChange={(e) =>
                setInvite((v) => ({ ...v, email: e.target.value }))
              }
            />
            {inviteError && (
              <p className="field-error" id="inv-err">
                {inviteError}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="inv-role">Role</label>
            <select
              id="inv-role"
              value={invite.role}
              onChange={(e) =>
                setInvite((v) => ({ ...v, role: e.target.value as Role }))
              }
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-line">Send invite</button>
        </form>
      </section>

      <section className="settings-block" aria-labelledby="notif-h">
        <h2 id="notif-h">Notifications</h2>
        <ul className="switches">
          {notificationOptions.map((o) => (
            <li key={o.id}>
              <label className="switch">
                <input
                  type="checkbox"
                  role="switch"
                  checked={state.notifications[o.id] ?? false}
                  onChange={(e) => {
                    saveSettings({
                      notifications: {
                        ...state.notifications,
                        [o.id]: e.target.checked,
                      },
                    });
                    setSaid(`${o.label}: ${e.target.checked ? "on" : "off"}.`);
                  }}
                />
                <span className="switch-track" aria-hidden="true" />
                <span>{o.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
