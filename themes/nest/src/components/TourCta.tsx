import { CalendarDays } from "lucide-react";
import { Link } from "../router";
import { tours } from "../content";
import { dayLabel, tourSlots } from "../lib/time";

/** The closing block on most pages: the next open tour slots, straight from the tour calendar. */
export function TourCta({ title }: { title: string }) {
  const next = tourSlots(4)
    .flatMap((d) => d.slots)
    .filter((s) => !s.full)
    .slice(0, 3);
  return (
    <section className="tour-cta">
      <div className="wrap tour-cta-inner">
        <div>
          <h2>{title}</h2>
          <p>
            {tours.intro} Each tour takes about {tours.length}.
          </p>
        </div>
        <div className="tour-cta-slots">
          <p className="tour-cta-label">Next free tours</p>
          <ul>
            {next.map((s) => (
              <li key={s.id}>
                <Link to="/tour" className="slot-link">
                  <CalendarDays aria-hidden="true" />
                  <span>{dayLabel(s.date)}</span>
                  <span className="num">{s.time}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/tour" className="btn btn-primary">
            See all tour times
          </Link>
        </div>
      </div>
    </section>
  );
}
