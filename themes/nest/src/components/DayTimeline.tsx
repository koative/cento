import { useEffect, useState } from "react";
import { NotebookPen } from "lucide-react";
import { days } from "../content";
import { ampm, toMinutes } from "../lib/time";

/** Index of the moment in progress at `now`, or -1 outside opening hours / at weekends. */
function momentAt(moments: { time: string }[], now: Date) {
  const day = now.getDay();
  if (day === 0 || day === 6) return -1;
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins < toMinutes(moments[0].time) || mins >= 18 * 60) return -1;
  let idx = 0;
  moments.forEach((m, i) => mins >= toMinutes(m.time) && (idx = i));
  return idx;
}

export function DayTimeline({ compact = false }: { compact?: boolean }) {
  const [dayId, setDayId] = useState(days[0].id);
  const plan = days.find((d) => d.id === dayId) ?? days[0];
  const [now, setNow] = useState(() => new Date());
  const live = momentAt(plan.moments, now);
  const [picked, setPicked] = useState<number | null>(null);
  const index = Math.min(picked ?? Math.max(live, 0), plan.moments.length - 1);
  const m = plan.moments[index];

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className={`daytl${compact ? " daytl-compact" : ""}`}>
      <div className="daytl-tabs" role="group" aria-label="Choose an age group">
        {days.map((d) => (
          <button
            key={d.id}
            type="button"
            className="chip"
            aria-pressed={d.id === dayId}
            onClick={() => {
              setDayId(d.id);
              setPicked(null);
            }}
          >
            {d.label}
            <small>{d.rooms}</small>
          </button>
        ))}
      </div>

      <p className="daytl-status" aria-live="polite">
        {live >= 0
          ? `Right now in ${plan.rooms}: ${plan.moments[live].title.toLowerCase()}.`
          : "Nest is closed right now, so here is a typical weekday from the start."}
      </p>

      <div className="daytl-body">
        <figure className="daytl-photo">
          <img
            src={plan.image.src}
            alt={plan.image.alt}
            width={plan.image.w}
            height={plan.image.h}
            loading="lazy"
          />
        </figure>

        <div className="daytl-now" key={`${dayId}-${index}`}>
          <p className="daytl-time num">{ampm(m.time)}</p>
          <h3>{m.title}</h3>
          <p>{m.text}</p>
          {m.diary && (
            <p className="daytl-diary">
              <NotebookPen aria-hidden="true" /> Logged in Nest Notes: {m.diary}
            </p>
          )}
          <label className="scrub">
            <span className="sr-only">Scrub through the day</span>
            <input
              type="range"
              min={0}
              max={plan.moments.length - 1}
              step={1}
              value={index}
              aria-valuetext={`${ampm(m.time)}, ${m.title}`}
              onChange={(e) => setPicked(Number(e.target.value))}
            />
            <span className="scrub-ends" aria-hidden="true">
              <span>{ampm(plan.moments[0].time)}</span>
              <span>6:00 pm</span>
            </span>
          </label>
        </div>
      </div>

      {!compact && (
        <ol className="daytl-list">
          {plan.moments.map((mo, i) => (
            <li key={mo.time} data-active={i === index ? "" : undefined}>
              <button
                type="button"
                onClick={() => setPicked(i)}
                aria-current={i === index ? "step" : undefined}
              >
                <span className="num">{ampm(mo.time)}</span>
                <span>{mo.title}</span>
                {i === live && <span className="now-tag">Now</span>}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
