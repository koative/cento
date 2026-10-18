import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Minus,
  Plane,
  Plus,
  TrainFront,
  X,
} from "lucide-react";
import { Link, navigate } from "../router";
import {
  destinationBySlug,
  destinations,
  journeys,
  monthNames,
  planningFee,
  tiers,
  type Destination,
} from "../content";
import { RouteMap } from "../components/RouteMap";
import {
  addStop,
  duration,
  loadStops,
  money,
  setPlan,
  summarise,
  tripDate,
  usePlan,
} from "../lib/plan";

const MAX_NIGHTS = 21;

export function Planner() {
  const plan = usePlan();
  const sum = summarise(plan);
  const route = sum.stops.map((s) => s.d);
  const [adding, setAdding] = useState("");
  const remaining = destinations.filter(
    (d) => !plan.stops.some((s) => s.slug === d.slug),
  );
  const chart = useRef<HTMLElement>(null);

  // On narrow screens the chart scrolls sideways; open it on Europe, where most routes start.
  useEffect(() => {
    const map = chart.current?.querySelector(".route-map");
    if (map) map.scrollLeft = (map.scrollWidth - map.clientWidth) * 0.4;
  }, []);

  const toggle = (d: Destination) =>
    plan.stops.some((s) => s.slug === d.slug)
      ? setPlan((p) => ({
          ...p,
          stops: p.stops.filter((s) => s.slug !== d.slug),
        }))
      : addStop(d);
  const nights = (slug: string, delta: number) =>
    setPlan((p) => ({
      ...p,
      stops: p.stops.map((s) =>
        s.slug === slug
          ? {
              ...s,
              nights: Math.min(MAX_NIGHTS, Math.max(1, s.nights + delta)),
            }
          : s,
      ),
    }));
  const move = (i: number, delta: number) =>
    setPlan((p) => {
      const stops = [...p.stops];
      [stops[i], stops[i + delta]] = [stops[i + delta], stops[i]];
      return { ...p, stops };
    });

  return (
    <>
      <header className="page-head wrap">
        <h1>Itinerary planner</h1>
        <p className="lede">
          Plot your stops on the chart, give each one its nights, and watch the
          route, the dates and a rough cost come together. When it looks right,
          send it to a planner. Your draft stays in this browser until you clear
          it.
        </p>
      </header>

      <section
        className="wrap planner-chart"
        aria-label="Route chart"
        ref={chart}
      >
        <RouteMap
          route={route}
          onToggle={toggle}
          label={
            route.length
              ? `Your route: ${route.map((d) => d.name).join(" to ")}`
              : "Chart of all ten destinations; none chosen yet"
          }
        />
        <p className="chart-hint">
          Select a fix on the chart to add it as the next stop; select a
          numbered stop to take it out.
        </p>
      </section>

      <section className="wrap section-tight planner-grid">
        <div className="planner-route">
          <h2>Your route</h2>
          {sum.stops.length === 0 ? (
            <div className="planner-empty">
              <p>
                No stops yet. Choose fixes on the chart, add one below, or start
                from a journey we already run:
              </p>
              <ul>
                {journeys.slice(0, 3).map((j) => (
                  <li key={j.slug}>
                    <button
                      type="button"
                      className="btn btn-line"
                      onClick={() => loadStops(j.stops)}
                    >
                      {j.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ol className="stops">
              {sum.stops.map((s, i) => {
                const leg = sum.legs[i - 1];
                const arrival = plan.start
                  ? new Date(plan.start + "T12:00:00")
                  : null;
                arrival?.setDate(arrival.getDate() + s.first - 1);
                const season = arrival ? s.d.rating[arrival.getMonth()] : 2;
                return (
                  <li key={s.slug}>
                    {leg && (
                      <p className="leg">
                        {leg.mode === "flight" ? (
                          <Plane aria-hidden="true" />
                        ) : (
                          <TrainFront aria-hidden="true" />
                        )}
                        {leg.mode === "flight" ? "Fly" : "Rail and road"}, about{" "}
                        {duration(leg.hours)} ·{" "}
                        <span className="num">
                          {Math.round(leg.km).toLocaleString("en-US")} km
                        </span>
                      </p>
                    )}
                    <div className="stop">
                      <span className="stop-n" aria-hidden="true">
                        {i + 1}
                      </span>
                      <div className="stop-main">
                        <h3>
                          <Link
                            to={`/destinations/${s.slug}`}
                            className="place"
                          >
                            {s.d.name}
                          </Link>
                        </h3>
                        <p className="stop-days">
                          Days {s.first}–{s.last}
                          {arrival &&
                            ` · from ${tripDate(plan.start, s.first)}`}
                        </p>
                        {arrival && season === 0 && (
                          <p className="stop-warn">
                            {monthNames[arrival.getMonth()]} is off season here.
                            Ask us about it or move this stop.
                          </p>
                        )}
                      </div>
                      <div
                        className="stepper"
                        role="group"
                        aria-label={`Nights in ${s.d.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => nights(s.slug, -1)}
                          disabled={s.nights <= 1}
                          aria-label={`One night fewer in ${s.d.name}`}
                        >
                          <Minus aria-hidden="true" />
                        </button>
                        <output aria-live="polite">
                          <span className="num">{s.nights}</span>{" "}
                          {s.nights === 1 ? "night" : "nights"}
                        </output>
                        <button
                          type="button"
                          onClick={() => nights(s.slug, 1)}
                          disabled={s.nights >= MAX_NIGHTS}
                          aria-label={`One more night in ${s.d.name}`}
                        >
                          <Plus aria-hidden="true" />
                        </button>
                      </div>
                      <div className="stop-tools">
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => move(i, -1)}
                          disabled={i === 0}
                          aria-label={`Move ${s.d.name} earlier`}
                        >
                          <ArrowUp aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => move(i, 1)}
                          disabled={i === sum.stops.length - 1}
                          aria-label={`Move ${s.d.name} later`}
                        >
                          <ArrowDown aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => toggle(s.d)}
                          aria-label={`Remove ${s.d.name}`}
                        >
                          <X aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          {remaining.length > 0 && (
            <form
              className="add-stop"
              onSubmit={(e) => {
                e.preventDefault();
                const d = destinationBySlug(adding);
                if (d) addStop(d);
                setAdding("");
              }}
            >
              <label htmlFor="add-stop">Add a stop</label>
              <div className="add-row">
                <select
                  id="add-stop"
                  value={adding}
                  onChange={(e) => setAdding(e.target.value)}
                >
                  <option value="">Choose a destination</option>
                  {remaining.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}, {d.country}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="btn btn-ink"
                  disabled={!adding}
                >
                  <Plus aria-hidden="true" /> Add
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="sheet" aria-labelledby="sheet-title">
          <h2 id="sheet-title">Route sheet</h2>
          <div className="sheet-fields">
            <label>
              First day
              <input
                type="date"
                value={plan.start}
                onChange={(e) =>
                  setPlan((p) => ({ ...p, start: e.target.value }))
                }
              />
            </label>
            <div className="sheet-travellers">
              <span id="travellers-label">Travellers</span>
              <div
                className="stepper"
                role="group"
                aria-labelledby="travellers-label"
              >
                <button
                  type="button"
                  onClick={() =>
                    setPlan((p) => ({
                      ...p,
                      travellers: Math.max(1, p.travellers - 1),
                    }))
                  }
                  disabled={plan.travellers <= 1}
                  aria-label="One traveller fewer"
                >
                  <Minus aria-hidden="true" />
                </button>
                <output aria-live="polite">
                  <span className="num">{plan.travellers}</span>
                </output>
                <button
                  type="button"
                  onClick={() =>
                    setPlan((p) => ({
                      ...p,
                      travellers: Math.min(12, p.travellers + 1),
                    }))
                  }
                  disabled={plan.travellers >= 12}
                  aria-label="One more traveller"
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <fieldset className="tiers">
            <legend>Where you stay</legend>
            {tiers.map((t) => (
              <label key={t.id}>
                <input
                  type="radio"
                  name="tier"
                  checked={plan.tier === t.id}
                  onChange={() => setPlan((p) => ({ ...p, tier: t.id }))}
                />
                <span>
                  <strong>{t.label}</strong>
                  {t.note}
                </span>
              </label>
            ))}
          </fieldset>

          {sum.nights > 0 && (
            <div className="timebar" aria-hidden="true">
              {sum.stops.map((s, i) => (
                <span key={s.slug} style={{ flexGrow: s.nights }}>
                  <b>{i + 1}</b>
                  <em>{s.nights}n</em>
                </span>
              ))}
            </div>
          )}

          <dl className="totals" aria-live="polite">
            <div>
              <dt>Length</dt>
              <dd>
                {sum.days ? `${sum.days} days, ${sum.nights} nights` : "—"}
                {plan.start && sum.days > 0 && (
                  <small>
                    {tripDate(plan.start, 1)} to{" "}
                    {tripDate(plan.start, sum.days)}
                  </small>
                )}
              </dd>
            </div>
            <div>
              <dt>Legs between stops</dt>
              <dd>
                {sum.legs.length
                  ? `${sum.legs.filter((l) => l.mode === "flight").length} flights, ${sum.legs.filter((l) => l.mode === "rail").length} by land`
                  : "—"}
              </dd>
            </div>
            <div className="totals-main">
              <dt>Estimate per person</dt>
              <dd>
                <span className="num">
                  {sum.perPerson ? money(sum.perPerson) : "—"}
                </span>
                {sum.perPerson > 0 && (
                  <small>
                    {money(sum.total)} for {plan.travellers}{" "}
                    {plan.travellers === 1 ? "traveller" : "travellers"}
                  </small>
                )}
              </dd>
            </div>
          </dl>
          <p className="fine">
            A planning estimate for stays and the legs between stops, before
            international flights and guides. Your planner's first draft carries
            the real price; the {money(planningFee)} planning fee is credited
            against it.
          </p>
          <div className="sheet-actions">
            <button
              type="button"
              className="btn btn-accent"
              disabled={!sum.stops.length}
              onClick={() => navigate("/enquire")}
            >
              Send this route to a planner <ArrowRight aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-line"
              disabled={!sum.stops.length}
              onClick={() => setPlan((p) => ({ ...p, stops: [] }))}
            >
              Clear the route
            </button>
          </div>
        </aside>
      </section>
    </>
  );
}
