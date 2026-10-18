import { useEffect, useState } from "react";
import { Link } from "../router";
import { dayNames, type GymClass, type Slot, type Trainer } from "../content";
import { classById, clock, relative, trainerById, upcoming } from "../lib";
import { Disc } from "./Marks";

/** Sessions as timetable rows. `withDay` prefixes the weekday for lists that span the week. */
export function SessionList({
  items,
  withDay = false,
  hide,
}: {
  items: Slot[];
  withDay?: boolean;
  hide?: "class" | "trainer";
}) {
  return (
    <ul className="sessions">
      {items.map((s) => {
        const c = classById(s.classId)!;
        const t = trainerById(s.trainerId)!;
        return (
          <li key={`${s.day}-${s.time}-${s.classId}`}>
            <span className="sessions-time">
              {withDay && (
                <span className="sessions-day">
                  {dayNames[s.day].slice(0, 3)}
                </span>
              )}
              {clock(s.time)}
            </span>
            {hide !== "class" && (
              <span className="sessions-class">
                <Disc category={c.category} />
                <Link to={`/classes/${c.id}`}>{c.name}</Link>
              </span>
            )}
            {hide !== "trainer" && (
              <span className="sessions-coach">
                <Link to={`/trainers/${t.id}`}>{t.name}</Link>
              </span>
            )}
            <span className="sessions-meta">
              {c.minutes} min · {c.room}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** The next few sessions from right now, refreshed every minute. */
export function NextUp({ count = 5 }: { count?: number }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  const next = upcoming(undefined, now).slice(0, count);

  return (
    <section className="board" aria-labelledby="board-title">
      <div className="board-head">
        <h2 id="board-title">Next on the floor</h2>
        <p className="board-clock">
          <time dateTime={now.toISOString()}>
            {dayNames[(now.getDay() + 6) % 7]}{" "}
            {now
              .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })
              .toLowerCase()
              .replace(" ", "")}
          </time>
        </p>
      </div>
      <ol className="board-list">
        {next.map(({ slot, inMinutes }) => {
          const c = classById(slot.classId)!;
          return (
            <li key={`${slot.day}-${slot.time}-${slot.classId}`}>
              <span className="board-when">
                <strong>{clock(slot.time)}</strong>
                <span>{relative(inMinutes, slot, now)}</span>
              </span>
              <span className="board-what">
                <Disc category={c.category} />
                <Link to={`/classes/${c.id}`}>{c.name}</Link>
              </span>
              <span className="board-who">
                {trainerById(slot.trainerId)!.name.split(" ")[0]}
              </span>
            </li>
          );
        })}
      </ol>
      <Link to="/timetable" className="text-link">
        Full timetable
      </Link>
    </section>
  );
}

export function ClassRow({ c, perWeek }: { c: GymClass; perWeek: number }) {
  return (
    <li className="class-row">
      <img
        src={c.image.src}
        alt=""
        width={c.image.w}
        height={c.image.h}
        loading="lazy"
      />
      <div className="class-row-body">
        <h3>
          <Link to={`/classes/${c.id}`}>{c.name}</Link>
        </h3>
        <p>{c.summary}</p>
      </div>
      <dl className="class-row-facts">
        <div>
          <dt>Type</dt>
          <dd>
            <Disc category={c.category} label />
          </dd>
        </div>
        <div>
          <dt>Length</dt>
          <dd>{c.minutes} min</dd>
        </div>
        <div>
          <dt>Intensity</dt>
          <dd>
            <Intensity value={c.intensity} />
          </dd>
        </div>
        <div>
          <dt>Per week</dt>
          <dd>{perWeek}</dd>
        </div>
      </dl>
    </li>
  );
}

export function Intensity({ value }: { value: number }) {
  return (
    <span className="intensity">
      <span className="intensity-bars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} data-on={n <= value ? "" : undefined} />
        ))}
      </span>
      {value} of 5
    </span>
  );
}

export function TrainerCard({ t }: { t: Trainer }) {
  return (
    <li className="trainer-card">
      <img
        src={t.image.src}
        alt=""
        width={t.image.w}
        height={t.image.h}
        loading="lazy"
      />
      <h3>
        <Link to={`/trainers/${t.id}`}>{t.name}</Link>
      </h3>
      <p className="trainer-role">{t.role}</p>
      <p>{t.summary}</p>
    </li>
  );
}
