import type { Priority, Status } from "../content";
import { people } from "../content";
import { initials, person, priorityName, statusName } from "../lib/format";

/** Signal bars for priority; Urgent is a filled card with a bang, like a red magnet on the wall. */
export function PriorityIcon({ priority }: { priority: Priority }) {
  const label = `Priority: ${priorityName(priority)}`;
  if (priority === "urgent")
    return (
      <svg
        className="prio prio-urgent"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        role="img"
        aria-label={label}
      >
        <rect x="1" y="1" width="14" height="14" rx="3" fill="currentColor" />
        <path
          d="M8 4.5v4.5"
          stroke="var(--card)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11.6" r="1.1" fill="var(--card)" />
      </svg>
    );
  const level = { high: 3, medium: 2, low: 1 }[priority];
  return (
    <svg
      className="prio"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      role="img"
      aria-label={label}
    >
      {[0, 1, 2].map((n) => (
        <rect
          key={n}
          x={2 + n * 4.5}
          y={10 - n * 3.5}
          width="3"
          height={4 + n * 3.5}
          rx="1"
          fill="currentColor"
          opacity={n < level ? 1 : 0.25}
        />
      ))}
    </svg>
  );
}

const FILL: Record<Status, number> = {
  backlog: 0,
  todo: 0,
  progress: 0.5,
  review: 0.75,
  done: 1,
};

/** A ring that fills as work moves right across the board. */
export function StatusIcon({ status }: { status: Status }) {
  const f = FILL[status];
  const r = 3.5;
  const c = 2 * Math.PI * r;
  return (
    <svg
      className={`stat stat-${status}`}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      role="img"
      aria-label={statusName(status)}
    >
      <circle
        cx="8"
        cy="8"
        r="6.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={status === "backlog" ? "2.2 2" : undefined}
      />
      {status === "done" ? (
        <>
          <circle cx="8" cy="8" r="6.25" fill="currentColor" />
          <path
            d="M5.2 8.2l1.9 1.9 3.8-3.9"
            fill="none"
            stroke="var(--card)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        f > 0 && (
          <circle
            cx="8"
            cy="8"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={r * 2}
            strokeDasharray={`${c * f} ${c}`}
            transform="rotate(-90 8 8)"
          />
        )
      )}
    </svg>
  );
}

export function Avatar({
  id,
  size = 24,
}: {
  id: string | null;
  size?: number;
}) {
  const p = person(id);
  if (!p)
    return (
      <span
        className="avatar avatar-none"
        style={{ width: size, height: size }}
        role="img"
        aria-label="Unassigned"
      />
    );
  return (
    <span
      className="avatar"
      data-tone={people.indexOf(p) % 5}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      role="img"
      aria-label={p.name}
      title={p.name}
    >
      {initials(p.name)}
    </span>
  );
}
