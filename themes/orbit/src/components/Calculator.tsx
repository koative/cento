import { ArrowRight } from "lucide-react";
import { Link, navigate } from "../router";
import { rideshare } from "../content";
import { day, money, num, useNow } from "../lib/format";
import { price, setQuote, useQuote } from "../lib/quote";
import { OrbitDiagram, periodMinutes } from "./OrbitDiagram";

/** The rideshare pricing calculator. `compact` keeps payload and orbit only (home page). */
export function Calculator({ compact = false }: { compact?: boolean }) {
  const q = useQuote();
  const now = useNow(60000);
  const p = price(q, now);
  const altitude = p.orbit.custom ? q.altitude : p.orbit.altitude;

  return (
    <div className="calc" data-compact={compact ? "" : undefined}>
      <form
        className="calc-controls"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Rideshare price calculator"
      >
        <fieldset>
          <legend>Payload</legend>
          <div className="segmented">
            {(["microsat", "cubesat"] as const).map((kind) => (
              <label key={kind}>
                <input
                  type="radio"
                  name="kind"
                  value={kind}
                  checked={q.kind === kind}
                  onChange={() => setQuote({ kind })}
                />
                <span>
                  {kind === "microsat" ? "Microsatellite" : "Cubesat"}
                </span>
              </label>
            ))}
          </div>

          {q.kind === "microsat" ? (
            <div className="mass-row">
              <label htmlFor="mass">Wet mass</label>
              <input
                id="mass"
                type="range"
                min={10}
                max={450}
                step={5}
                value={Math.min(q.mass, 450)}
                onChange={(e) => setQuote({ mass: Number(e.target.value) })}
                aria-describedby="mass-note"
              />
              <span className="mass-input">
                <input
                  type="number"
                  min={1}
                  max={2000}
                  value={q.mass}
                  aria-label="Wet mass in kilograms"
                  onChange={(e) =>
                    setQuote({
                      mass: Math.max(
                        1,
                        Math.round(Number(e.target.value) || 1),
                      ),
                    })
                  }
                />
                kg
              </span>
              <p id="mass-note" className="hint">
                {q.mass < rideshare.minBilledKg
                  ? `Billed at the ${rideshare.minBilledKg} kg minimum.`
                  : q.mass <= 200
                    ? "Fits a 15-inch port."
                    : q.mass <= 450
                      ? "Needs a 24-inch port."
                      : "Too heavy for a rideshare port."}
              </p>
            </div>
          ) : (
            <div className="units" role="radiogroup" aria-label="Cubesat size">
              {rideshare.cubesatUnits.map((u) => (
                <label key={u}>
                  <input
                    type="radio"
                    name="units"
                    value={u}
                    checked={q.units === u}
                    onChange={() => setQuote({ units: u })}
                  />
                  <span>{u}U</span>
                </label>
              ))}
            </div>
          )}
        </fieldset>

        <fieldset>
          <legend>Destination</legend>
          <div className="orbit-options">
            {rideshare.orbits.map((o) => (
              <label key={o.id} className="option">
                <input
                  type="radio"
                  name="orbit"
                  value={o.id}
                  checked={p.orbit.id === o.id}
                  onChange={() => setQuote({ orbit: o.id })}
                />
                <span className="option-body">
                  <strong>{o.label}</strong>
                  <span>{o.detail}</span>
                </span>
                <span className="option-price tnum">
                  from {money(o.perKg)}/kg
                </span>
              </label>
            ))}
          </div>
          {p.orbit.custom && (
            <div className="mass-row">
              <label htmlFor="altitude">Release altitude</label>
              <input
                id="altitude"
                type="range"
                min={350}
                max={1200}
                step={50}
                value={q.altitude}
                onChange={(e) => setQuote({ altitude: Number(e.target.value) })}
              />
              <output htmlFor="altitude" className="mass-input tnum">
                {num(q.altitude)} km
              </output>
            </div>
          )}
        </fieldset>

        {!compact && (
          <>
            <fieldset>
              <legend>Flight</legend>
              {p.options.length ? (
                <>
                  <label htmlFor="flight" className="visually-hidden">
                    Flight
                  </label>
                  <select
                    id="flight"
                    value={p.flight?.id}
                    onChange={(e) => setQuote({ flight: e.target.value })}
                  >
                    {p.options.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} · NET {day(f.date)} · {num(f.openKg)} kg open
                      </option>
                    ))}
                  </select>
                  {p.flight?.deadline && (
                    <p className="hint">
                      Bookings close {day(p.flight.deadline)}.
                    </p>
                  )}
                </>
              ) : (
                <p className="hint">No open rideshare for this orbit.</p>
              )}
            </fieldset>

            <fieldset>
              <legend>Services</legend>
              <div className="addons">
                {rideshare.addons.map((a) => (
                  <label key={a.id} className="check">
                    <input
                      type="checkbox"
                      checked={q.addons.includes(a.id)}
                      onChange={(e) =>
                        setQuote({
                          addons: e.target.checked
                            ? [...q.addons, a.id]
                            : q.addons.filter((x) => x !== a.id),
                        })
                      }
                    />
                    <span className="option-body">
                      <strong>{a.label}</strong>
                      <span>{a.detail}</span>
                    </span>
                    <span className="option-price tnum">{money(a.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}
      </form>

      <section className="quote-sheet" aria-label="Your quote">
        <div className="quote-orbit">
          <OrbitDiagram
            altitude={altitude}
            inclination={p.orbit.inclination}
            reference={p.orbit.custom ? 550 : undefined}
            label="Your orbit"
          />
          <dl className="orbit-facts tnum">
            <div>
              <dt>Altitude</dt>
              <dd>{num(altitude)} km</dd>
            </div>
            <div>
              <dt>Inclination</dt>
              <dd>{p.orbit.inclination}°</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{periodMinutes(altitude).toFixed(1)} min</dd>
            </div>
          </dl>
        </div>

        {!compact && (
          <table className="quote-lines tnum">
            <caption className="visually-hidden">Price breakdown</caption>
            <tbody>
              {p.lines.map((l) => (
                <tr key={l.label}>
                  <th scope="row">{l.label}</th>
                  <td>{money(l.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="quote-total" aria-live="polite" aria-atomic="true">
          <span>
            {compact ? "Estimated launch price" : "Total, fixed price"}
          </span>
          <strong className="tnum">{money(p.total)}</strong>
          <span className="tnum">
            {money(p.perKg)}/kg · {num(p.mass)} kg
            {p.flight ? ` · ${p.flight.name}` : ""}
          </span>
        </div>

        {p.problem && (
          <p className="quote-problem" role="alert">
            {p.problem}
          </p>
        )}

        {!compact && (
          <dl className="schedule tnum">
            {p.schedule.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{money(s.amount)}</dd>
              </div>
            ))}
          </dl>
        )}

        {compact ? (
          <Link to="/rideshare" className="btn btn-primary">
            Choose a flight and services{" "}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            disabled={!!p.problem}
            onClick={() => navigate("/reserve")}
          >
            Reserve this slot <ArrowRight aria-hidden="true" size={18} />
          </button>
        )}
      </section>
    </div>
  );
}
