import { app, deals, owners, stages, type StageId } from "../content";
import { shortDate, short } from "../lib/format";

const shown: StageId[] = ["demo", "proposal", "negotiation", "won"];

/** Read-only slice of the demo board, drawn from the same data as /app. */
export function BoardPreview() {
  return (
    <figure
      className="preview"
      aria-label={`Deals board of the ${app.workspace} demo workspace`}
    >
      <div className="preview-bar" aria-hidden>
        <span className="preview-title">
          {app.workspace} · {app.team}
        </span>
        <span className="preview-q">{app.quarter}</span>
      </div>
      <div className="preview-cols">
        {shown.map((id) => {
          const stage = stages.find((s) => s.id === id)!;
          const list = deals.filter((d) => d.stage === id);
          return (
            <div key={id} className="preview-col" data-stage={id}>
              <header>
                <p className="preview-stage">{stage.label}</p>
                <span className="num">
                  {short(list.reduce((n, d) => n + d.value, 0))}
                </span>
              </header>
              <ul>
                {list.slice(0, 3).map((d) => (
                  <li key={d.id} className="card">
                    <strong>{d.company}</strong>
                    <span>{d.title}</span>
                    <span className="card-foot">
                      <span className="num">{short(d.value)}</span>
                      <span>{shortDate(d.close)}</span>
                      <span
                        className="avatar"
                        title={owners.find((o) => o.id === d.owner)?.name}
                      >
                        {owners.find((o) => o.id === d.owner)?.initials}
                      </span>
                    </span>
                    {id === "won" && (
                      <span className="stamp stamp-won">Won</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
