import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { statusComponents, type Incident } from "../content";
import { formatStamp } from "../lib/manual";
import { durationOf, isActive, isUpcoming } from "../lib/status";

const impactLabel = {
  minor: "Minor incident",
  major: "Major incident",
  maintenance: "Scheduled maintenance",
};

export function IncidentPage({ incident }: { incident: Incident }) {
  const names = incident.components.map(
    (id) => statusComponents.find((c) => c.id === id)?.name ?? id,
  );
  const phase = isUpcoming(incident)
    ? "Scheduled"
    : isActive(incident)
      ? "Ongoing"
      : "Resolved";

  return (
    <div className="wrap narrow-wide incident-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/status">
          <ArrowLeft aria-hidden="true" /> System status
        </Link>
      </nav>
      <header className="page-head">
        <p className="impact" data-impact={incident.impact}>
          {impactLabel[incident.impact]} · {phase}
        </p>
        <h1>{incident.title}</h1>
        <p className="lead">{incident.summary}</p>
      </header>

      <dl className="facts">
        <div>
          <dt>Affected</dt>
          <dd>{names.join(", ")}</dd>
        </div>
        <div>
          <dt>Started</dt>
          <dd>{formatStamp(incident.start)}</dd>
        </div>
        <div>
          <dt>
            {incident.end
              ? phase === "Scheduled"
                ? "Planned end"
                : "Ended"
              : "Duration so far"}
          </dt>
          <dd>
            {incident.end ? formatStamp(incident.end) : durationOf(incident)}
          </dd>
        </div>
        {incident.end && phase === "Resolved" && (
          <div>
            <dt>Duration</dt>
            <dd>{durationOf(incident)}</dd>
          </div>
        )}
      </dl>

      <section aria-labelledby="updates">
        <h2 id="updates">Updates</h2>
        <ol className="timeline">
          {incident.updates.map((u) => (
            <li key={u.at} data-state={u.state}>
              <time dateTime={u.at}>{formatStamp(u.at)}</time>
              <h3>{u.state}</h3>
              <p>{u.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className="muted">
        Something still not right after this incident?{" "}
        <Link to="/contact">Contact support</Link> and mention the incident
        title.
      </p>
    </div>
  );
}
