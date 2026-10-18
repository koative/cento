import { useState } from "react";
import { ChevronUp, Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { courseLabels } from "../content";
import {
  advise,
  clearPlan,
  countOf,
  linesOf,
  setGuests,
  setQty,
  totalOf,
  usePlan,
} from "../lib/table";
import { money } from "../lib/time";

/** The ticket: guests, chosen dishes, running total per head and the floor team's advice. */
export function TablePlanner() {
  const plan = usePlan();
  const [open, setOpen] = useState(false);
  const lines = linesOf(plan);
  const count = countOf(plan);
  const total = totalOf(plan);
  const advice = advise(plan);
  const perHead = total / plan.guests;

  return (
    <aside
      className="planner"
      aria-labelledby="planner-title"
      data-open={open ? "" : undefined}
    >
      <button
        type="button"
        className="planner-toggle"
        aria-expanded={open}
        aria-controls="planner-body"
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          Your table · {count} {count === 1 ? "dish" : "dishes"}
        </span>
        <span className="num">{money(total)}</span>
        <ChevronUp aria-hidden="true" />
      </button>

      <div className="ticket" id="planner-body">
        <div className="ticket-top">
          <h2 id="planner-title">Your table</h2>
          <div className="stepper" role="group" aria-label="Guests">
            <button
              type="button"
              onClick={() => setGuests(plan.guests - 1)}
              disabled={plan.guests <= 1}
              aria-label="One fewer guest"
            >
              <Minus aria-hidden="true" />
            </button>
            <output aria-live="polite">
              {plan.guests} {plan.guests === 1 ? "guest" : "guests"}
            </output>
            <button
              type="button"
              onClick={() => setGuests(plan.guests + 1)}
              disabled={plan.guests >= 12}
              aria-label="One more guest"
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
        </div>

        {lines.length ? (
          <ul className="ticket-lines">
            {lines.map(({ dish, qty }) => (
              <li key={dish.id}>
                <span className="ticket-qty num">{qty}×</span>
                <Link to={`/menu/${dish.service}/${dish.id}`}>{dish.name}</Link>
                <span className="ticket-step">
                  <button
                    type="button"
                    onClick={() => setQty(dish.id, qty - 1)}
                    aria-label={`Remove one ${dish.name}`}
                  >
                    <Minus aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setQty(dish.id, qty + 1)}
                    aria-label={`Add another ${dish.name}`}
                  >
                    <Plus aria-hidden="true" />
                  </button>
                </span>
                <span className="num">{money(qty * dish.price)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ticket-empty">
            Nothing yet. Tap “Add to table” on any dish and it lands here.
          </p>
        )}

        <dl className="ticket-total">
          <div>
            <dt>Total</dt>
            <dd className="num">{money(total)}</dd>
          </div>
          <div>
            <dt>About, per head</dt>
            <dd className="num">{money(Math.round(perHead * 100) / 100)}</dd>
          </div>
        </dl>

        <div className="advice" data-tone={advice.tone}>
          <p aria-live="polite">{advice.message}</p>
          <ul>
            {advice.rows.map((r) => (
              <li
                key={r.course}
                data-met={r.aim && r.have >= r.aim ? "" : undefined}
              >
                <span>{courseLabels[r.course]}</span>
                <span className="num">
                  {r.aim ? `${r.have} of ${r.aim}` : r.have}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ticket-actions">
          <Link to="/reservations" className="btn btn-primary">
            Book with this plan
          </Link>
          {count > 0 && (
            <button type="button" className="btn-link" onClick={clearPlan}>
              Clear the table
            </button>
          )}
        </div>
        <p className="ticket-note">
          A guide, not an order. Nothing is charged; your server confirms
          everything on the night.
        </p>
      </div>
    </aside>
  );
}
