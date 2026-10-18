import { X } from "lucide-react";
import { Link } from "../router";
import { classes, trialPrice, weekdays } from "../content";
import { clock } from "../lib/util";
import { clearWeek, costs, toggleClass, useWeek } from "../lib/week";

/** The signature: pin classes, and the cheapest way to dance that week appears beside them. */
export function WeekPanel() {
  const ids = useWeek();
  const picked = classes
    .filter((c) => ids.includes(c.id))
    .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
  const n = picked.length;
  const options = n ? costs(n) : [];
  const best = options[0];
  const max = Math.max(...options.map((o) => o.monthly), 1);

  return (
    <aside className="week" aria-labelledby="week-title">
      <h2 id="week-title">My week</h2>
      <p className="week-status" aria-live="polite">
        {n === 0
          ? "Add classes from the board and we'll work out the cheapest pass for your week."
          : `${n} class${n === 1 ? "" : "es"} a week. Best value: ${best.pass.name}, about $${best.monthly} a month.`}
      </p>

      {n > 0 && (
        <>
          <ul className="week-list">
            {picked.map((c) => (
              <li key={c.id}>
                <span>
                  <b>{weekdays[c.day].slice(0, 3)}</b> {clock(c.start)}
                </span>
                <span className="week-title-cell">{c.title}</span>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={`Remove ${c.title} on ${weekdays[c.day]}`}
                  onClick={() => toggleClass(c.id)}
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <h3 className="week-sub">What that costs a month</h3>
          <ul className="week-costs">
            {options.map((o, i) => (
              <li key={o.pass.id} data-best={i === 0 ? "" : undefined}>
                <span className="wc-name">
                  {o.pass.name}
                  {i === 0 && <em> best value</em>}
                </span>
                <span className="wc-track" aria-hidden="true">
                  <span style={{ width: `${(o.monthly / max) * 100}%` }} />
                </span>
                <span className="wc-price">${o.monthly}</span>
              </li>
            ))}
          </ul>
          <p className="week-note">
            Cards and drop-ins priced at {n}×52÷12 classes a month. Memberships
            are month-to-month prices.
          </p>

          <div className="week-actions">
            <Link to={`/trial?class=${picked[0].id}`} className="btn btn-ink">
              Start with a ${trialPrice} trial
            </Link>
            <Link to="/passes" className="btn btn-line">
              Compare passes
            </Link>
          </div>
          <button type="button" className="link-btn" onClick={clearWeek}>
            Clear my week
          </button>
        </>
      )}
    </aside>
  );
}
