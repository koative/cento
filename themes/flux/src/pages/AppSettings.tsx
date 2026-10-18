import { useState } from "react";
import { brand, connectors, members as initialMembers } from "../content";
import { ConnectorMark } from "../components/Marks";
import { EMAIL, Field, useForm } from "../components/form";

const zones = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Amsterdam",
  "Asia/Singapore",
];
const roles = ["Viewer", "Builder", "Admin"];

export default function AppSettings() {
  const workspace = useForm(
    { name: brand.workspace, zone: zones[0], alerts: "yes" },
    (v) => ({
      name:
        v.name.trim().length < 2
          ? "Give the workspace a name of at least 2 characters."
          : undefined,
      zone: v.zone
        ? undefined
        : "Choose the time zone schedules should run in.",
    }),
  );
  const [connected, setConnected] = useState([
    "hallway",
    "letterkit",
    "ledgerline",
    "funnelbook",
    "askbox",
    "ticketyard",
    "gridsheet",
    "listwell",
  ]);
  const [members, setMembers] = useState(initialMembers);
  const [notice, setNotice] = useState("");
  const [invite, setInvite] = useState({ email: "", error: "" });

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Settings</h1>
          <p>
            Workspace, connections and people. Changes stay in this browser.
          </p>
        </div>
      </header>
      <p className="sr-only" aria-live="polite">
        {notice}
      </p>

      <div className="settings">
        <section className="panel" aria-labelledby="ws-h">
          <h2 id="ws-h">Workspace</h2>
          <form noValidate onSubmit={workspace.submit} className="form">
            <Field
              form={workspace}
              name="name"
              label="Workspace name"
              required
            />
            <Field
              form={workspace}
              name="zone"
              label="Time zone for schedules"
              options={zones}
              required
            />
            <Field
              form={workspace}
              name="alerts"
              type="checkbox"
              label="Email workflow owners when a run fails"
            />
            <p className="field-static">
              Data region <strong>United States</strong>{" "}
              <small>Set when the workspace was created</small>
            </p>
            <div className="form-foot" aria-live="polite">
              <button
                className="btn btn-plum"
                disabled={workspace.status === "sending"}
              >
                {workspace.status === "sending" ? "Saving…" : "Save workspace"}
              </button>
              {workspace.status === "done" && (
                <span className="saved">
                  Saved. Schedules now run in {workspace.values.zone}.
                </span>
              )}
            </div>
          </form>
        </section>

        <section className="panel" aria-labelledby="conn-h">
          <h2 id="conn-h">Connections</h2>
          <p className="panel-note">
            {connected.length} apps connected. Shared with every builder;
            secrets are never shown again.
          </p>
          <ul className="conn-list">
            {connectors
              .filter((c) => c.category !== "Built-in")
              .map((c) => {
                const on = connected.includes(c.slug);
                return (
                  <li key={c.slug}>
                    <ConnectorMark slug={c.slug} size={32} />
                    <span>
                      <strong>{c.name}</strong>
                      <small>{on ? "Connected by Imogen Vale" : c.auth}</small>
                    </span>
                    <button
                      type="button"
                      className={
                        on ? "btn btn-quiet btn-sm" : "btn btn-line btn-sm"
                      }
                      aria-label={`${on ? "Disconnect" : "Connect"} ${c.name}`}
                      onClick={() => {
                        setConnected((list) =>
                          on
                            ? list.filter((x) => x !== c.slug)
                            : [...list, c.slug],
                        );
                        setNotice(
                          `${c.name} ${on ? "disconnected" : "connected"}.`,
                        );
                      }}
                    >
                      {on ? "Disconnect" : "Connect"}
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>

        <section className="panel" aria-labelledby="people-h">
          <h2 id="people-h">People</h2>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-labelledby="people-h"
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.email}>
                    <td>
                      <strong>{m.name}</strong>
                      <small className="block">{m.email}</small>
                    </td>
                    <td>
                      <select
                        aria-label={`Role for ${m.name}`}
                        value={m.role}
                        onChange={(e) => {
                          setMembers((list) =>
                            list.map((x) =>
                              x.email === m.email
                                ? { ...x, role: e.target.value }
                                : x,
                            ),
                          );
                          setNotice(`${m.name} is now ${e.target.value}.`);
                        }}
                      >
                        {roles.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form
            noValidate
            className="invite"
            onSubmit={(e) => {
              e.preventDefault();
              const email = invite.email.trim();
              const error = !EMAIL.test(email)
                ? "Enter a full email address, like name@northgate.example."
                : members.some((m) => m.email === email)
                  ? "That person is already in the workspace."
                  : "";
              setInvite({ email: error ? invite.email : "", error });
              if (error) return e.currentTarget.querySelector("input")?.focus();
              setMembers((list) => [
                ...list,
                { name: email.split("@")[0], email, role: "Viewer" },
              ]);
              setNotice(
                `Invitation to ${email} added as Viewer. No email is sent in the demo.`,
              );
            }}
          >
            <Field
              form={{
                values: { invite: invite.email },
                errors: { invite: invite.error },
                set: (_, email) => setInvite({ email, error: "" }),
              }}
              name="invite"
              label="Invite by email"
              type="email"
            />
            <button className="btn btn-line">Invite</button>
          </form>
        </section>
      </div>
    </div>
  );
}
