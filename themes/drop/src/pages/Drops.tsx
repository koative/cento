import { useState } from "react";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { Link } from "../router";
import { brand, drops, modeLabel } from "../content";
import {
  at,
  dateParts,
  dayLabel,
  downloadIcs,
  dropNo,
  dropStatus,
  productsIn,
  shortCountdown,
  timeLabel,
  useNow,
  type DropStatus,
} from "../lib/time";
import { Flat } from "../components/Flat";

const statusLabel: Record<DropStatus, string> = {
  upcoming: "Upcoming",
  "raffle-open": "Raffle open",
  "raffle-drawn": "Raffle drawn",
  live: "Released",
};

/** ET calendar date of a moment as [year, month 1–12, day]. */
function ymd(ms: number) {
  const p = new Intl.DateTimeFormat("en-CA", {
    timeZone: brand.timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(ms);
  const get = (t: string) => Number(p.find((x) => x.type === t)!.value);
  return [get("year"), get("month"), get("day")] as const;
}

function Month({ year, month }: { year: number; month: number }) {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lead = (first.getUTCDay() + 6) % 7; // weeks start Monday
  const onDay = new Map(drops.map((d) => [ymd(at(d.date)).join("-"), d]));
  const name = first.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <figure className="month">
      <figcaption>{name}</figcaption>
      <div className="month-grid" role="list" aria-label={name}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="month-dow" aria-hidden="true">
            {d}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={"x" + i} aria-hidden="true" />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const drop = onDay.get(`${year}-${month}-${i + 1}`);
          return drop ? (
            <span role="listitem" key={i}>
              <Link
                to={`/drops/${drop.id}`}
                className="month-day month-drop"
                aria-label={`${drop.name}, ${dayLabel(at(drop.date))}`}
              >
                {i + 1}
              </Link>
            </span>
          ) : (
            <span key={i} className="month-day" aria-hidden="true">
              {i + 1}
            </span>
          );
        })}
      </div>
    </figure>
  );
}

export function Drops() {
  const now = useNow();
  const [view, setView] = useState<"upcoming" | "archive">("upcoming");
  const list =
    view === "upcoming"
      ? drops.filter((d) => at(d.date) > now)
      : drops.filter((d) => at(d.date) <= now).reverse();
  const [y, m] = ymd(list[0] ? at(list[0].date) : now);
  // Upcoming shows this month and the next; the archive shows the latest month and the one before.
  const step = view === "upcoming" ? 1 : -1;
  const other = new Date(Date.UTC(y, m - 1 + step, 1));
  const pair: [number, number][] = [
    [y, m],
    [other.getUTCFullYear(), other.getUTCMonth() + 1],
  ];
  const months = view === "upcoming" ? pair : pair.reverse();
  return (
    <div className="page">
      <header className="page-head">
        <h1>Drops calendar</h1>
        <p className="lead">
          Every release, on the day and minute it lands. Online drops open at
          11:00 {brand.tzLabel}, the shop at 12:00. Add one to your own calendar
          and it will ping you.
        </p>
      </header>

      <div className="tabs" role="group" aria-label="Show drops">
        {(["upcoming", "archive"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
          >
            {v === "upcoming" ? "Upcoming" : "Archive"}
          </button>
        ))}
      </div>

      <div className="drops-layout">
        <ol className="drop-rows">
          {list.map((d) => {
            const start = at(d.date);
            const date = dateParts(start);
            const status = dropStatus(d, now);
            return (
              <li key={d.id} className="drop-row" data-status={status}>
                <div className="drop-date" aria-hidden="true">
                  <span>{date.weekday}</span>
                  <b className="num">{date.day}</b>
                  <span>{date.month}</span>
                </div>
                <div className="drop-info">
                  <h2>
                    <Link to={`/drops/${d.id}`}>{d.name}</Link>
                  </h2>
                  <p className="drop-meta">
                    <span className="num">Drop {dropNo(d)}</span>
                    <span>
                      {dayLabel(start)}, {timeLabel(start)} {brand.tzLabel}
                    </span>
                    <span>{modeLabel[d.mode]}</span>
                    {d.collab && <span>With {d.collab}</span>}
                  </p>
                  <p>{d.summary}</p>
                </div>
                <ul className="drop-thumbs" aria-label="Pieces">
                  {productsIn(d).map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/shop/${p.id}`}
                        className="plate"
                        title={p.name}
                      >
                        <Flat product={p} label={p.name} />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="drop-side">
                  <span className="status-chip" data-status={status}>
                    {statusLabel[status]}
                    {start > now && (
                      <span className="num">
                        {" "}
                        · {shortCountdown(start - now)}
                      </span>
                    )}
                  </span>
                  {start > now ? (
                    <button
                      type="button"
                      className="btn btn-small"
                      onClick={() => downloadIcs(d)}
                    >
                      <CalendarPlus size={16} aria-hidden="true" /> Add to
                      calendar
                    </button>
                  ) : (
                    <Link
                      to={`/drops/${d.id}`}
                      className="btn btn-small btn-outline"
                    >
                      What's left <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <aside className="months" aria-label="Month view">
          {months.map(([yy, mm]) => (
            <Month key={`${yy}-${mm}`} year={yy} month={mm} />
          ))}
          <p className="muted small">
            Highlighted days are drop days. Times are store time (
            {brand.tzLabel}).
          </p>
        </aside>
      </div>
    </div>
  );
}
