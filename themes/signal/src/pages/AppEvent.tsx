import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import {
  app,
  dayLabels,
  events,
  wave,
  type EventDef,
  type EventStatus,
} from "../content";
import { LineChart } from "../components/Charts";
import { Delta, EventName, num } from "../components/format";

export default function AppEvent({ event }: { event: EventDef }) {
  const [status, setStatus] = useState<EventStatus>(event.status);
  const [note, setNote] = useState("");
  const volume = wave(event.volume % 9973, 30, event.volume / 30, 0.16, 0.004);
  const funnels = app.funnels.filter((f) => f.steps.includes(event.id));
  const related = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 4);

  function change(next: EventStatus) {
    setStatus(next);
    setNote(
      `${event.id} marked ${next.toLowerCase()}. Dashboards using it will show the new status.`,
    );
  }

  return (
    <div className="app-page">
      <Link to="/app/events" className="back-link">
        <ArrowLeft size={16} aria-hidden /> All events
      </Link>
      <header className="app-head">
        <div>
          <h1 className="event-title">
            <EventName id={event.id} />
          </h1>
          <p>{event.description}</p>
        </div>
        <div className="app-controls">
          <span className="status" data-status={status}>
            {status}
          </span>
          {status !== "Verified" && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => change("Verified")}
            >
              Verify event
            </button>
          )}
          {status !== "Deprecated" && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => change("Deprecated")}
            >
              Deprecate
            </button>
          )}
        </div>
      </header>
      <p className="quiet-note" role="status">
        {note}
      </p>

      <dl className="event-facts">
        <div>
          <dt>Events, 30d</dt>
          <dd className="num">{num.format(event.volume)}</dd>
        </div>
        <div>
          <dt>People, 30d</dt>
          <dd className="num">{num.format(event.users)}</dd>
        </div>
        <div>
          <dt>Change</dt>
          <dd>
            <Delta value={event.change} />
          </dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>{event.owner}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{event.source}</dd>
        </div>
        <div>
          <dt>Last seen</dt>
          <dd>{event.lastSeen}</dd>
        </div>
      </dl>

      <section className="app-card" aria-labelledby="volume-title">
        <div className="panel-head">
          <h2 id="volume-title">Daily volume, last 30 days</h2>
        </div>
        <LineChart
          label={`${event.id} per day`}
          labels={dayLabels(30)}
          format={(n) => num.format(Math.round(n))}
          series={[
            { label: "Events", values: volume },
            {
              label: "People",
              values: volume.map((v) =>
                Math.round(v * (event.users / event.volume)),
              ),
              tone: "t3",
            },
          ]}
        />
      </section>

      <div className="app-grid">
        <section className="app-card" aria-labelledby="props-title">
          <h2 id="props-title" className="panel-title">
            Properties
          </h2>
          <div
            className="table-scroll"
            role="region"
            aria-labelledby="props-title"
            tabIndex={0}
          >
            <table className="data-table compact">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Example</th>
                </tr>
              </thead>
              <tbody>
                {event.properties.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <code>{p.name}</code>
                    </td>
                    <td>{p.type}</td>
                    <td className="mono example">{p.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="app-card" aria-labelledby="used-title">
          <h2 id="used-title" className="panel-title">
            Used in
          </h2>
          {funnels.length ? (
            <ul className="link-list">
              {funnels.map((f) => (
                <li key={f.id}>
                  <Link to="/app/funnels">{f.name} funnel</Link>
                  <small>
                    step {f.steps.indexOf(event.id) + 1} of {f.steps.length}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Not used in any saved funnel yet.</p>
          )}
          <h3 className="panel-subtitle">
            Other {event.category.toLowerCase()} events
          </h3>
          <ul className="link-list">
            {related.map((e) => (
              <li key={e.id}>
                <Link to={`/app/events/${e.id}`}>
                  <EventName id={e.id} />
                </Link>
                <small className="num">{num.format(e.volume)}</small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
