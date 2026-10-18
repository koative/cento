import { ArrowDown, ArrowUp, Ticket, Utensils, X } from "lucide-react";
import { Link } from "../router";
import { exhibits, slots } from "../content";
import { clock } from "../lib/format";
import {
  CLOSE,
  clearStops,
  moveStop,
  schedule,
  setArrival,
  toggleStop,
  usePlan,
} from "../lib/plan";
import { Shape } from "./Shape";

/** The day timeline that grows as galleries are added on the map. */
export function DayPlan() {
  const plan = usePlan();
  const { legs, finish, late } = schedule(plan);
  const stops = legs.filter((l) => l.kind === "stop").length;

  return (
    <section className="dayplan" aria-labelledby="dayplan-title">
      <div className="dayplan-head">
        <h3 id="dayplan-title">Our day</h3>
        <label className="arrival">
          <span>Arriving at</span>
          <select
            value={plan.arrival}
            onChange={(e) => setArrival(e.target.value)}
          >
            {slots.map((s) => (
              <option key={s} value={s}>
                {clock(s)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {stops === 0 ? (
        <p className="dayplan-empty">
          Nothing planned yet. Tap a gallery on the map, then press “Add to our
          day”.
        </p>
      ) : (
        <ol className="timeline">
          {legs.map((l, i) => {
            if (l.kind === "lunch")
              return (
                <li key={"lunch" + i} className="leg leg-lunch">
                  <span className="leg-time tnum">{clock(l.start)}</span>
                  <Utensils aria-hidden="true" className="leg-icon" />
                  <span className="leg-name">
                    Lunch at Crumbs café or the picnic room
                  </span>
                </li>
              );
            const ex = exhibits.find((e) => e.slug === l.slug)!;
            const at = plan.stops.indexOf(l.slug);
            return (
              <li key={l.slug} className="leg">
                <span className="leg-time tnum">{clock(l.start)}</span>
                <Shape
                  kind={ex.shape}
                  swatch={ex.swatch}
                  className="leg-icon"
                />
                <span className="leg-name">
                  <Link to={`/exhibits/${ex.slug}`}>{ex.name}</Link>
                  <small>
                    until {clock(l.end)} · {ex.floor}
                  </small>
                </span>
                <span className="leg-tools">
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Move ${ex.name} earlier`}
                    disabled={at === 0}
                    onClick={() => moveStop(l.slug, -1)}
                  >
                    <ArrowUp aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Move ${ex.name} later`}
                    disabled={at === plan.stops.length - 1}
                    onClick={() => moveStop(l.slug, 1)}
                  >
                    <ArrowDown aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Remove ${ex.name}`}
                    onClick={() => toggleStop(l.slug)}
                  >
                    <X aria-hidden="true" />
                  </button>
                </span>
              </li>
            );
          })}
        </ol>
      )}

      <div className="dayplan-foot" aria-live="polite">
        {stops > 0 && (
          <p className={late ? "dayplan-late" : undefined}>
            {stops} {stops === 1 ? "gallery" : "galleries"}, finishing around{" "}
            <strong className="tnum">{clock(finish)}</strong>.
            {late &&
              ` That runs past closing at ${clock(CLOSE)}: drop a gallery or arrive earlier.`}
          </p>
        )}
      </div>
      <div className="dayplan-actions">
        <Link to={`/tickets?slot=${plan.arrival}`} className="btn btn-coral">
          <Ticket aria-hidden="true" /> Book the {clock(plan.arrival)} arrival
        </Link>
        {stops > 0 && (
          <button type="button" className="text-link" onClick={clearStops}>
            Clear the plan
          </button>
        )}
      </div>
    </section>
  );
}
