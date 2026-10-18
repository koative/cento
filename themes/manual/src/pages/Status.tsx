import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { statusAsOf, statusComponents } from "../content";
import { formatDay, formatStamp } from "../lib/manual";
import {
  active,
  componentState,
  headline,
  history,
  overall,
  past,
  stateLabel,
  upcoming,
  uptime,
  durationOf,
  isUpcoming,
} from "../lib/status";
import { validate } from "../lib/forms";
import { Field, useErrors } from "../components/Field";

const groups = [...new Set(statusComponents.map((c) => c.group))];
const impactLabel = {
  minor: "Minor",
  major: "Major",
  maintenance: "Maintenance",
};

function Bars({ id, name }: { id: string; name: string }) {
  const days = history(id);
  const bad = days.filter((d) => d.level !== "ok").length;
  return (
    <svg
      className="bars"
      viewBox={`0 0 ${days.length * 6} 32`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`${name}: ${uptime(id)}% uptime over 90 days, ${bad ? `${bad} ${bad === 1 ? "day" : "days"} with incidents` : "no incidents"}`}
    >
      {days.map((d, i) => (
        <rect
          key={d.date}
          x={i * 6}
          y="0"
          width="4"
          height="32"
          rx="1"
          data-level={d.level}
        >
          <title>{`${formatDay(d.date)}: ${d.titles.length ? d.titles.join(", ") : "No incidents"}`}</title>
        </rect>
      ))}
    </svg>
  );
}

export function Status() {
  const [filter, setFilter] = useState("all");
  const { errors, setErrors, onChange } = useErrors();
  const [subscribed, setSubscribed] = useState("");
  const shown =
    filter === "all" ? past : past.filter((i) => i.components.includes(filter));

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email: "Enter an email like you@yourshop.com to get incident updates.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setSubscribed(String(new FormData(form).get("email")));
    form.reset();
  };

  return (
    <div className="wrap status-page">
      <header className="status-banner" data-state={overall}>
        <span className="dot dot-lg" aria-hidden="true" />
        <div>
          <h1>{headline[overall]}</h1>
          <p>Updated {formatStamp(statusAsOf)}. Times are Eastern.</p>
        </div>
      </header>

      {[...active, ...upcoming].map((i) => (
        <Link
          key={i.id}
          to={`/status/${i.id}`}
          className="incident-card"
          data-impact={i.impact}
        >
          <span className="incident-kind">
            {isUpcoming(i)
              ? `Scheduled · ${formatStamp(i.start)}`
              : `Ongoing since ${formatStamp(i.start)}`}
          </span>
          <strong>{i.title}</strong>
          <span>
            <b>{i.updates[0].state}</b> · {i.updates[0].text}
          </span>
          <span className="text-link">
            Full timeline <ArrowRight aria-hidden="true" />
          </span>
        </Link>
      ))}

      <div className="status-layout">
        <div>
          {groups.map((g) => (
            <section
              key={g}
              className="component-group"
              aria-labelledby={`g-${g}`}
            >
              <h2 id={`g-${g}`}>{g}</h2>
              <ul>
                {statusComponents
                  .filter((c) => c.group === g)
                  .map((c) => {
                    const s = componentState(c.id);
                    return (
                      <li key={c.id} className="component" data-state={s}>
                        <div className="component-head">
                          <div>
                            <h3>{c.name}</h3>
                            <p className="muted">{c.description}</p>
                          </div>
                          <span className="state">
                            <span className="dot" aria-hidden="true" />
                            {stateLabel[s]}
                          </span>
                        </div>
                        <Bars id={c.id} name={c.name} />
                        <p className="bars-scale">
                          <span>90 days ago</span>
                          <span>{uptime(c.id)}% uptime</span>
                          <span>Today</span>
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
          <p className="legend">
            <span data-level="ok">No incidents</span>
            <span data-level="maintenance">Maintenance</span>
            <span data-level="minor">Minor</span>
            <span data-level="major">Major</span>
          </p>
        </div>

        <aside className="status-aside">
          <section aria-labelledby="subscribe">
            <h2 id="subscribe">Get incident updates</h2>
            <p className="muted">
              An email when an incident opens and when it's resolved. Nothing
              else.
            </p>
            <form
              noValidate
              onSubmit={subscribe}
              onChange={onChange}
              className="inline-form"
            >
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@yourshop.com"
                error={errors.email}
              />
              <button type="submit" className="btn btn-ink">
                Subscribe
              </button>
            </form>
            <p className="form-done" aria-live="polite">
              {subscribed && `Done. Incident updates will go to ${subscribed}.`}
            </p>
          </section>
        </aside>
      </div>

      <section className="history" aria-labelledby="history">
        <div className="section-head">
          <h2 id="history">Past incidents</h2>
          <div className="field field-inline">
            <label htmlFor="incident-filter">Component</label>
            <select
              id="incident-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All components</option>
              {statusComponents.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {shown.length} incidents shown
        </p>
        {shown.length ? (
          <ol className="incident-list">
            {shown.map((i) => (
              <li key={i.id}>
                <time dateTime={i.start}>{formatDay(i.start)}</time>
                <div>
                  <Link to={`/status/${i.id}`}>{i.title}</Link>
                  <p className="muted">{i.summary}</p>
                </div>
                <span className="impact" data-impact={i.impact}>
                  {impactLabel[i.impact]} · {durationOf(i)}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty">
            No incidents for this component in the last 90 days.
          </p>
        )}
      </section>
    </div>
  );
}
