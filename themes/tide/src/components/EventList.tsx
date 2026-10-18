import { ArrowRight } from "lucide-react";
import { sites, type TideEvent } from "../content";
import { day } from "../lib/format";
import { clock, workWindow } from "../lib/tide";
import { useSignups } from "../lib/signups";
import { Link } from "../router";

/** Events laid out like a tide table: date, place, the low-water window, places left. */
export function EventList({ items }: { items: TideEvent[] }) {
  const signups = useSignups();
  return (
    <ol className="event-list">
      {items.map((e) => {
        const site = sites.find((s) => s.id === e.site)!;
        const win = workWindow({ site, highWater: e.highWater });
        const date = day(e.date);
        const mine = signups[e.id];
        const left = e.spots - e.taken - (mine ?? 0);
        return (
          <li key={e.id}>
            <Link to={`/volunteer/${e.id}`} className="event-row">
              <time dateTime={e.date} className="event-date">
                <span>
                  {date.toLocaleDateString("en-GB", { weekday: "short" })}
                </span>
                <strong className="num">{date.getDate()}</strong>
                <span>
                  {date.toLocaleDateString("en-GB", { month: "short" })}
                </span>
              </time>
              <span className="event-main">
                <strong className="event-title">{e.title}</strong>
                <span className="event-site">
                  {site.name} · {e.kind}
                </span>
              </span>
              <span className="event-tide">
                <span>Low water {clock(win.low)}</span>
                <span className="num">
                  {clock(win.start)}–{clock(win.end)}
                </span>
              </span>
              <span
                className="event-spots"
                data-state={
                  mine
                    ? "mine"
                    : left <= 0
                      ? "full"
                      : left <= 4
                        ? "few"
                        : undefined
                }
              >
                {mine
                  ? e.spots - e.taken <= 0
                    ? "On the waitlist"
                    : "You're going"
                  : left <= 0
                    ? "Full, join waitlist"
                    : `${left} places left`}
              </span>
              <ArrowRight className="event-go" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
