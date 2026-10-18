import type { Alert } from "../content";

export function AlertRow({
  alert,
  headingLevel = 2,
}: {
  alert: Alert;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <li className="alert-row" data-level={alert.level.toLowerCase()}>
      <span className="level-tag">{alert.level}</span>
      <div>
        <H>{alert.title}</H>
        <p>{alert.body}</p>
        <dl className="alert-meta">
          <div>
            <dt>Where</dt>
            <dd>{alert.area}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>{alert.since}</dd>
          </div>
          <div>
            <dt>Until</dt>
            <dd>{alert.until}</dd>
          </div>
          <div>
            <dt>Topic</dt>
            <dd>{alert.topic}</dd>
          </div>
        </dl>
      </div>
    </li>
  );
}
