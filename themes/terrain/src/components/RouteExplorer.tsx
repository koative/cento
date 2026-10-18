import { useRef, useState, type KeyboardEvent } from "react";
import { BedDouble, Clock, MoveDown, MoveUp, Route } from "lucide-react";
import type { Trip } from "../content";
import { num } from "../lib/trips";
import { Profile } from "./Profile";
import { RouteMap } from "./RouteMap";

/** Day-by-day: tabs drive the map leg, the profile segment and the day's notes together. */
export function RouteExplorer({ trip }: { trip: Trip }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const day = trip.days[active];
  const n = trip.days.length;

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
      e.key
    ];
    if (move) select((active + move + n) % n, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(n - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <div className="explorer">
      <div className="explorer-visuals">
        <RouteMap trip={trip} active={active} onSelect={select} />
        <Profile days={trip.days} active={active} onSelect={select} />
      </div>
      <div className="explorer-days">
        <div
          role="tablist"
          aria-label="Itinerary days"
          className="day-tabs"
          onKeyDown={onKey}
        >
          {trip.days.map((d, i) => (
            <button
              key={i}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`day-tab-${i}`}
              aria-selected={active === i}
              aria-controls="day-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
            >
              <span className="day-tab-n">Day {i + 1}</span>
              <span className="day-tab-t">{d.title}</span>
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id="day-panel"
          aria-labelledby={`day-tab-${active}`}
          className="day-panel"
          key={active}
        >
          <h3>
            <span className="day-panel-n">Day {active + 1}</span> {day.title}
          </h3>
          <ul className="day-stats">
            <li>
              <Route aria-hidden="true" /> {day.km} km
            </li>
            <li>
              <MoveUp aria-hidden="true" /> {num(day.up)} m
              <span className="sr-only"> up</span>
            </li>
            <li>
              <MoveDown aria-hidden="true" /> {num(day.down)} m
              <span className="sr-only"> down</span>
            </li>
            <li>
              <Clock aria-hidden="true" /> {day.hours}
            </li>
          </ul>
          <p>{day.text}</p>
          <p className="day-sleep">
            <BedDouble aria-hidden="true" /> {day.sleep}
          </p>
          <div className="day-nav">
            <button
              type="button"
              className="btn btn-ghost btn-small"
              disabled={active === 0}
              onClick={() => select(active - 1)}
            >
              Previous day
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-small"
              disabled={active === n - 1}
              onClick={() => select(active + 1)}
            >
              Next day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
