import { Link } from "../router";
import { looks, lookPath } from "../content";

const START = 6 * 60;
const END = 24 * 60;
const at = (hour: string) =>
  ((Number(hour.slice(0, 2)) * 60 + Number(hour.slice(3)) - START) /
    (END - START)) *
  100;

/** The collection's single day, 06:00 to midnight, with each look pinned at its hour. */
export function DayLine({ current }: { current?: number }) {
  return (
    <nav className="dayline" aria-label="Looks by hour of the day">
      <span className="dayline-end" aria-hidden="true">
        06:00
      </span>
      <ol>
        {looks.map((l) => (
          <li key={l.n} style={{ left: `${at(l.hour)}%` }}>
            <Link
              to={lookPath(l.n)}
              data-current={current === l.n || undefined}
              aria-label={`Look ${l.n}, ${l.hour}, ${l.title}`}
            >
              <span className="dayline-tick" aria-hidden="true" />
              <span className="dayline-hour" aria-hidden="true">
                {l.hour}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <span className="dayline-end" aria-hidden="true">
        24:00
      </span>
    </nav>
  );
}
