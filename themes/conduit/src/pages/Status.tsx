import { useState } from "react";
import { status } from "../content";
import { date } from "../lib/format";
import { UptimeBars } from "../components/UptimeBars";
import { EMAIL, Field, useForm } from "../components/form";

const regions = ["All", ...new Set(status.components.map((c) => c.region))];
const stateLabel = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};

export default function Status() {
  const [region, setRegion] = useState("All");
  const shown = status.components.filter(
    (c) => region === "All" || c.region === region,
  );
  const degraded = status.components.some((c) => c.state !== "operational");
  const form = useForm({ statusEmail: "", majorOnly: "" }, (v) => ({
    statusEmail: !v.statusEmail.trim()
      ? "Enter the email that should get incident updates."
      : !EMAIL.test(v.statusEmail)
        ? "Use a full address, like oncall@yourcompany.com."
        : undefined,
  }));

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>{status.heading}</h1>
        <p className="lede">{status.lede}</p>
      </header>

      <p
        className="status-banner"
        data-state={degraded ? "degraded" : "operational"}
      >
        <span
          className="state-dot"
          data-state={degraded ? "degraded" : "operational"}
          aria-hidden="true"
        />
        {degraded ? status.overall : "All systems operational"}
        <span className="muted tabular">Updated 08:42 UTC</span>
      </p>

      <section aria-labelledby="components-h" className="section-tight">
        <div className="status-head">
          <h2 id="components-h">Components</h2>
          <div className="chips" role="group" aria-label="Region">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                className="chip"
                aria-pressed={region === r}
                onClick={() => setRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <ul className="uptime-list uptime-list-full">
          {shown.map((c) => (
            <li key={c.name + c.region}>
              <div className="uptime-head">
                <span
                  className="state-dot"
                  data-state={c.state}
                  aria-hidden="true"
                />
                <span>
                  {c.name} <span className="muted">{c.region}</span>
                </span>
                <span className="state-label" data-state={c.state}>
                  {stateLabel[c.state]}
                </span>
              </div>
              <UptimeBars seed={c.seed} uptime={c.uptime} today={c.state} />
              <div className="uptime-foot muted tabular">
                <span>90 days ago</span>
                <span>{c.uptime}% uptime</span>
                <span>Today</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="incidents-h" className="section">
        <h2 id="incidents-h" className="section-title">
          Incident history
        </h2>
        <ol className="incidents">
          {status.incidents.map((inc, i) => (
            <li key={inc.title}>
              <details open={i === 0}>
                <summary>
                  <span className="impact" data-impact={inc.impact}>
                    {inc.impact}
                  </span>
                  <span className="incident-title">{inc.title}</span>
                  <time className="muted tabular" dateTime={inc.date}>
                    {date(inc.date)} · {inc.duration}
                  </time>
                </summary>
                <p className="muted">{inc.component}</p>
                <ol className="updates">
                  {inc.updates.map((u) => (
                    <li key={u.time}>
                      <span className="tabular muted">{u.time}</span>
                      <strong>{u.label}</strong>
                      <p>{u.text}</p>
                    </li>
                  ))}
                </ol>
              </details>
            </li>
          ))}
        </ol>
      </section>

      <section className="callout" aria-labelledby="subscribe-h">
        <h2 id="subscribe-h">Get incident updates by email</h2>
        {form.status === "done" ? (
          <p className="form-success" role="status">
            Subscribed {form.values.statusEmail} to{" "}
            {form.values.majorOnly
              ? "major incidents only"
              : "every incident and maintenance window"}
            .
          </p>
        ) : (
          <form noValidate onSubmit={form.submit} className="stack-form">
            <Field
              form={form}
              name="statusEmail"
              label="Email"
              type="email"
              autoComplete="email"
              required
            />
            <Field
              form={form}
              name="majorOnly"
              label="Only tell me about major incidents"
              type="checkbox"
            />
            <button
              className="btn btn-signal"
              disabled={form.status === "sending"}
            >
              {form.status === "sending" ? "Subscribing…" : "Subscribe"}
            </button>
            <p className="muted small">Demo form: nothing is sent.</p>
          </form>
        )}
      </section>
    </div>
  );
}
