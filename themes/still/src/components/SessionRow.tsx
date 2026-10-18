import { Link } from "../router";
import { effortLabels } from "../content";
import { classOf, endTime, roomOf, teacherOf, type Slot } from "../lib/week";

export function Effort({ level }: { level: number }) {
  return (
    <span className="effort" title={`Effort: ${effortLabels[level]}`}>
      <span className="effort-bars" aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <i key={n} data-on={n <= level ? "" : undefined} />
        ))}
      </span>
      {effortLabels[level]}
    </span>
  );
}

export function bookHref(slot: Slot) {
  return `/book?session=${slot.session.id}&date=${slot.day.iso}`;
}

export function SessionRow({
  slot,
  withDay = false,
}: {
  slot: Slot;
  withDay?: boolean;
}) {
  const { session, started, left } = slot;
  const cls = classOf(session);
  const teacher = teacherOf(session);
  const room = roomOf(session);
  return (
    <li className="session" data-started={started ? "" : undefined}>
      <p className="session-time">
        {withDay && <span className="session-day">{slot.day.label}</span>}
        <time dateTime={`${slot.day.iso}T${session.time}`}>{session.time}</time>
        <span className="session-end">to {endTime(session)}</span>
      </p>
      <div className="session-what">
        <h3 className="session-name">
          <Link to={`/classes/${cls.slug}`}>{cls.name}</Link>
        </h3>
        <p className="session-meta">
          with <Link to={`/teachers/${teacher.slug}`}>{teacher.name}</Link>
          <span aria-hidden="true"> · </span>
          {room.name} · {cls.minutes} min
        </p>
        {session.note && <p className="session-note">{session.note}</p>}
      </div>
      <Effort level={cls.effort} />
      <div className="session-book">
        {started ? (
          <span className="session-status">Started</span>
        ) : (
          <>
            <span
              className="session-status"
              data-low={left > 0 && left <= 3 ? "" : undefined}
            >
              {left === 0
                ? "Full"
                : `${left} ${left === 1 ? "place" : "places"} left`}
            </span>
            <Link
              to={bookHref(slot)}
              className="btn btn-small"
              aria-label={`${left === 0 ? "Join waitlist for" : "Book"} ${cls.name}, ${slot.day.label} at ${session.time}`}
            >
              {left === 0 ? "Waitlist" : "Book"}
            </Link>
          </>
        )}
      </div>
    </li>
  );
}
