import { useEffect, useRef, useState } from "react";
import { CalendarArrowDown, Trash2, X } from "lucide-react";
import { Link } from "../router";
import {
  days,
  sessions,
  trackById,
  tracks,
  type Session,
  type TrackId,
} from "../content";
import {
  byStart,
  clearPlan,
  conflicts,
  downloadCalendar,
  endMinutes,
  minutes,
  planned,
  togglePlan,
  usePlan,
} from "../lib/plan";
import { SessionCard } from "../components/SessionCard";

const trackFromHash = () => {
  const id = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(
    "track",
  );
  return tracks.some((t) => t.id === id) ? [id as TrackId] : [];
};

/* Timeline geometry: day labels in the first 36 units, then 08:00 → 24:00 across 324. */
const DAY_START = 8 * 60;
const SPAN = 16 * 60;
const x = (m: number) =>
  36 + (Math.min(Math.max(m - DAY_START, 0), SPAN) / SPAN) * 324;

/** Overlapping sessions split their row: the earlier of each pair on top, the later below. */
function Timeline({
  list,
  pairs,
}: {
  list: Session[];
  pairs: [Session, Session][];
}) {
  const lane = (s: Session) =>
    pairs.some(([, b]) => b.id === s.id)
      ? 2
      : pairs.some(([a]) => a.id === s.id)
        ? 1
        : 0;
  return (
    <svg
      className="timeline"
      viewBox="0 0 360 124"
      role="img"
      aria-label="Your three days drawn as a timeline, 08:00 to midnight"
    >
      {[9, 12, 15, 18, 21].map((h) => (
        <g key={h}>
          <line
            x1={x(h * 60)}
            x2={x(h * 60)}
            y1="0"
            y2="100"
            className="tl-hour"
          />
          <text x={x(h * 60)} y="118" className="tl-label">
            {h}:00
          </text>
        </g>
      ))}
      {days.map((d, i) => (
        <g key={d.iso} transform={`translate(0 ${i * 34})`}>
          <text x="0" y="20" className="tl-day">
            {d.short}
          </text>
          <rect x="36" y="2" width="324" height="26" className="tl-track" />
          {list
            .filter((s) => s.day === i)
            .map((s) => (
              <rect
                key={s.id}
                x={x(minutes(s.start))}
                y={lane(s) === 2 ? 15 : 2}
                width={Math.max(x(endMinutes(s)) - x(minutes(s.start)), 3)}
                height={lane(s) ? 13 : 26}
                className="tl-block"
                data-track={s.track ?? undefined}
                data-clash={lane(s) ? "" : undefined}
              />
            ))}
        </g>
      ))}
    </svg>
  );
}

export function Agenda() {
  const plan = usePlan();
  const [day, setDay] = useState<0 | 1 | 2>(1);
  const [only, setOnly] = useState<TrackId[]>(trackFromHash);
  const [mine, setMine] = useState(false);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    const sync = () => setOnly(trackFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const list = planned(plan);
  const pairs = conflicts(list);
  const clashWith: Record<string, string> = {};
  pairs.forEach(([a, b]) => {
    clashWith[a.id] = b.title;
    clashWith[b.id] = a.title;
  });

  const shown = sessions
    .filter((s) => s.day === day)
    .filter((s) => !only.length || !s.track || only.includes(s.track))
    .filter((s) => !mine || !s.track || plan.includes(s.id))
    .sort(byStart);
  const slots = [...new Set(shown.map((s) => s.start))];

  const mix = tracks
    .map((t) => ({ ...t, n: list.filter((s) => s.track === t.id).length }))
    .filter((t) => t.n);
  const toggleTrack = (id: TrackId) =>
    setOnly((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Agenda builder</h1>
        <p className="lede">
          Three days, two stages, eight workshops and walks. Add the sessions
          you want and Prism draws your days, flags anything that overlaps, and
          hands you a calendar file. Your agenda stays on this device.
        </p>
      </header>

      <div className="agenda-layout">
        <div className="agenda-main">
          <div className="day-tabs" role="group" aria-label="Day">
            {days.map((d, i) => (
              <button
                key={d.iso}
                type="button"
                aria-pressed={day === i}
                onClick={() => setDay(i as 0 | 1 | 2)}
              >
                <span className="dt-day">
                  <span className="dt-long">{d.label}</span>
                  <span className="dt-short" aria-hidden="true">
                    {d.short}
                  </span>
                </span>
                <span className="dt-date">
                  {d.date}
                  <span className="dt-theme"> · {d.theme}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="agenda-filters">
            <div className="filters" role="group" aria-label="Show tracks">
              {tracks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="filter"
                  data-track={t.id}
                  aria-pressed={only.includes(t.id)}
                  onClick={() => toggleTrack(t.id)}
                >
                  {t.name}
                </button>
              ))}
              {only.length > 0 && (
                <button
                  type="button"
                  className="filter-clear"
                  onClick={() => setOnly([])}
                >
                  <X aria-hidden="true" /> All tracks
                </button>
              )}
            </div>
            <label className="check">
              <input
                type="checkbox"
                checked={mine}
                onChange={(e) => setMine(e.target.checked)}
              />
              Only my sessions
            </label>
          </div>

          <p className="result-count" aria-live="polite">
            {days[day].label}: {shown.filter((s) => s.track).length} sessions
            shown
          </p>

          {slots.length ? (
            <ol className="slots">
              {slots.map((start) => (
                <li key={start} className="slot">
                  <h2 className="slot-time">{start}</h2>
                  <div className="slot-sessions">
                    {shown
                      .filter((s) => s.start === start)
                      .map((s) => (
                        <SessionCard
                          key={s.id}
                          session={s}
                          clash={
                            plan.includes(s.id) ? clashWith[s.id] : undefined
                          }
                        />
                      ))}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty">
              <p>Nothing on {days[day].label} matches those filters yet.</p>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => {
                  setOnly([]);
                  setMine(false);
                }}
              >
                Show everything
              </button>
            </div>
          )}
        </div>

        <aside
          className="plan-panel"
          ref={panel}
          id="your-agenda"
          aria-labelledby="plan-title"
          tabIndex={-1}
        >
          <h2 id="plan-title">Your agenda</h2>
          {list.length === 0 ? (
            <p className="plan-empty">
              Nothing yet. Press Add on any session and it lands here, drawn on
              your three days.
            </p>
          ) : (
            <>
              <Timeline list={list} pairs={pairs} />

              <div className="mix" aria-label="Your agenda by track">
                <div className="mix-bar">
                  {mix.map((t) => (
                    <span
                      key={t.id}
                      data-track={t.id}
                      style={{ flexGrow: t.n }}
                    />
                  ))}
                </div>
                <p>
                  {mix
                    .map((t) => `${t.n} ${trackById[t.id].short}`)
                    .join(" · ")}
                </p>
              </div>

              {pairs.length > 0 && (
                <p className="plan-warning" role="status">
                  {pairs.length === 1
                    ? "Two sessions overlap"
                    : `${pairs.length} overlaps`}
                  . Pick one of each pair — you can't be in both rooms.
                </p>
              )}

              {days.map((d, i) => {
                const today = list.filter((s) => s.day === i);
                if (!today.length) return null;
                return (
                  <div key={d.iso} className="plan-day">
                    <h3>
                      {d.label} {d.date}
                    </h3>
                    <ul>
                      {today.map((s) => (
                        <li
                          key={s.id}
                          data-track={s.track ?? undefined}
                          data-clash={s.id in clashWith ? "" : undefined}
                        >
                          <span className="pd-time">{s.start}</span>
                          <span className="pd-title">{s.title}</span>
                          <button
                            type="button"
                            className="icon-btn"
                            aria-label={`Remove “${s.title}”`}
                            onClick={() => togglePlan(s.id)}
                          >
                            <X aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <div className="plan-actions">
                <button
                  type="button"
                  className="btn btn-ink"
                  onClick={() => downloadCalendar(list)}
                >
                  <CalendarArrowDown aria-hidden="true" /> Add to calendar
                  (.ics)
                </button>
                <button
                  type="button"
                  className="btn btn-line"
                  onClick={clearPlan}
                >
                  <Trash2 aria-hidden="true" /> Clear
                </button>
              </div>
              {list.some((s) => s.seats) && (
                <p className="plan-note">
                  Workshops and walks need the Full Spectrum pass.{" "}
                  <Link to="/register?pass=full">
                    Register with your workshop
                  </Link>
                  .
                </p>
              )}
            </>
          )}
        </aside>
      </div>

      {list.length > 0 && (
        <button
          type="button"
          className="plan-dock"
          onClick={() =>
            panel.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        >
          <span className="mix-bar" aria-hidden="true">
            {mix.map((t) => (
              <span key={t.id} data-track={t.id} style={{ flexGrow: t.n }} />
            ))}
          </span>
          Your agenda · {list.length}{" "}
          {list.length === 1 ? "session" : "sessions"}
          {pairs.length > 0 &&
            ` · ${pairs.length} overlap${pairs.length > 1 ? "s" : ""}`}
        </button>
      )}
    </div>
  );
}
