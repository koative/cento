import { clinicHours } from "../content";
import { clock, queueAt, useNow } from "../lib/care";

/** Small live pill: the current video queue. */
export function WaitBadge({ className = "" }: { className?: string }) {
  const q = queueAt(useNow());
  return (
    <p
      className={`wait-badge ${className}`}
      data-open={q.open ? "" : undefined}
    >
      <span className="live-dot" aria-hidden="true" />
      <span>
        {q.open ? (
          <>
            Video wait <strong className="num">{q.minutes} min</strong>
          </>
        ) : (
          q.label
        )}
      </span>
    </p>
  );
}

/** The three ways to be seen, with honest times for right now. */
export function WaitBoard() {
  const q = queueAt(useNow());
  const rows = [
    {
      label: "Video visit",
      value: q.open ? `${q.minutes} min` : clock(clinicHours.open),
      note: q.open
        ? "first available clinician"
        : "when the video clinic opens",
    },
    {
      label: "Message visit",
      value: "≈ 1 hr",
      note: "written plan, any time of day",
    },
    {
      label: "Scheduled",
      value: q.open ? "Today" : "Tomorrow",
      note: "choose your clinician",
    },
  ];
  return (
    <dl className="wait-board" aria-label="Current waiting times">
      {rows.map((r) => (
        <div key={r.label}>
          <dt>{r.label}</dt>
          <dd>
            <strong className="num">{r.value}</strong>
            <span>{r.note}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
