import { issues, statuses, workspace } from "../content";
import { Avatar, PriorityIcon, StatusIcon } from "./issue";

/** The product itself in the first viewport: the demo board, drawn from the same data the /app demo uses. */
export function BoardPreview() {
  const cols = statuses.filter((s) => s.id !== "backlog");
  return (
    <div
      className="preview"
      role="img"
      aria-label={`A Sprint board for ${workspace.name}: ${cols.map((c) => c.name).join(", ")} columns with issue cards`}
    >
      <div className="preview-bar">
        <span>
          {workspace.name} · {workspace.team}
        </span>
        <span className="preview-cycle">
          {workspace.cycle.name} · day 5 of 10
        </span>
      </div>
      <div className="preview-cols">
        {cols.map((s) => {
          const cards = issues.filter((i) => i.status === s.id).slice(0, 3);
          return (
            <div key={s.id} className="preview-col">
              <p className="col-head">
                <StatusIcon status={s.id} />
                {s.name}
                <span className="col-count">
                  {issues.filter((i) => i.status === s.id).length}
                </span>
              </p>
              {cards.map((i) => (
                <div key={i.key} className="card card-static">
                  <span className="card-key">{i.key}</span>
                  <span className="card-title">{i.title}</span>
                  <span className="card-meta">
                    <PriorityIcon priority={i.priority} />
                    {i.labels.slice(0, 1).map((l) => (
                      <span key={l} className="tag">
                        {l}
                      </span>
                    ))}
                    <span className="card-pts">{i.estimate}</span>
                    <Avatar id={i.assignee} size={20} />
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
