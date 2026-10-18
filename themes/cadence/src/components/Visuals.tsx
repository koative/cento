import { candidates, competencies, jobs, stages, today } from "../content";
import { daysBetween, initials } from "../lib/format";

const tones = [
  "#e5cdb9",
  "#c9d8c4",
  "#cfd6e2",
  "#e3d3a8",
  "#dccbdc",
  "#c7ddd8",
];

export function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const tone =
    tones[[...name].reduce((n, ch) => n + ch.charCodeAt(0), 0) % tones.length];
  return (
    <span
      className={`avatar avatar-${size}`}
      style={{ background: tone }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

/** A slice of the demo workspace, drawn from the same data the /app demo uses. */
export function PipelinePreview() {
  const shown = stages.slice(0, 4);
  return (
    <figure
      className="preview"
      aria-label="Cadence pipeline board with candidates for four open roles in four stages"
    >
      <div className="preview-bar">
        <span>North Studio</span>
        <span aria-hidden="true">/</span>
        <strong>Pipeline</strong>
        <span className="preview-pill">
          {jobs.filter((j) => j.status === "Open").length} open roles
        </span>
      </div>
      <div className="preview-board">
        {shown.map((s) => {
          const people = candidates.filter((c) => c.stage === s.id).slice(0, 3);
          return (
            <div key={s.id} className="preview-col">
              <p className="preview-head">
                {s.label} <span className="num">{people.length}</span>
              </p>
              {people.map((c) => (
                <div
                  key={c.id}
                  className="preview-card"
                  data-hot={c.id === "morgan-lee" ? "" : undefined}
                >
                  <Avatar name={c.name} size="sm" />
                  <span>
                    <strong>{c.name}</strong>
                    <small>{jobs.find((j) => j.id === c.jobId)!.title}</small>
                  </span>
                  {c.id === "morgan-lee" && c.next ? (
                    <span className="preview-next">
                      {c.next.when} · {c.next.step}
                    </span>
                  ) : (
                    <span className="preview-wait num">
                      {daysBetween(c.since, today)} d
                    </span>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </figure>
  );
}

/** A read-only scorecard, as an interviewer sees it after submitting. */
export function ScorecardSample() {
  const rows = [
    { id: "craft", score: 4 },
    { id: "collaboration", score: 3 },
    { id: "communication", score: 3 },
    { id: "customer", score: 2 },
  ];
  return (
    <figure
      className="scorecard-sample"
      aria-label="Example scorecard with four competencies rated on a four-level rubric"
    >
      <div className="scorecard-head">
        <strong>Work sample review</strong>
        <span>Morgan Lee · Product designer</span>
      </div>
      <ul>
        {rows.map((r) => {
          const comp = competencies.find((c) => c.id === r.id)!;
          return (
            <li key={r.id}>
              <span className="scorecard-name">{comp.label}</span>
              <span className="scale" aria-label={`${r.score} of 4`}>
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} data-on={n <= r.score ? "" : undefined} />
                ))}
              </span>
              <span className="scorecard-rubric">
                {comp.rubric[r.score - 1]}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="scorecard-foot">
        Recommendation <strong>Yes</strong> · scores hidden from the panel until
        3 of 3 submit
      </p>
    </figure>
  );
}
