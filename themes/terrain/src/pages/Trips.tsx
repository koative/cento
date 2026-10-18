import { useMemo, useState } from "react";
import { Link } from "../router";
import { areas, grades, trips, type Area, type Grade } from "../content";
import {
  eur,
  monthNames,
  nextDeparture,
  num,
  season,
  totals,
} from "../lib/trips";
import { Blaze } from "../components/Marks";
import { TripCard } from "../components/TripCard";

type Sort = "next" | "price" | "days" | "grade";
const lengths = {
  any: "Any length",
  short: "4–5 days",
  long: "6–7 days",
} as const;

export function Trips() {
  const [area, setArea] = useState<Area | "all">("all");
  const [picked, setPicked] = useState<Grade[]>([]);
  const [length, setLength] = useState<keyof typeof lengths>("any");
  const [month, setMonth] = useState(0);
  const [sort, setSort] = useState<Sort>("next");
  const [view, setView] = useState<"cards" | "table">("cards");

  const list = useMemo(() => {
    const out = trips.filter(
      (t) =>
        (area === "all" || t.area === area) &&
        (picked.length === 0 || picked.includes(t.grade)) &&
        (length === "any" ||
          (length === "short" ? t.days.length <= 5 : t.days.length >= 6)) &&
        (month === 0 || t.months.includes(month)),
    );
    const next = (t: (typeof trips)[number]) =>
      nextDeparture(t)?.start ?? "9999";
    const by: Record<
      Sort,
      (a: (typeof trips)[number], b: (typeof trips)[number]) => number
    > = {
      next: (a, b) => next(a).localeCompare(next(b)),
      price: (a, b) => a.price - b.price,
      days: (a, b) => a.days.length - b.days.length,
      grade: (a, b) => a.grade - b.grade || a.price - b.price,
    };
    return out.sort(by[sort]);
  }, [area, picked, length, month, sort]);

  const toggle = (g: Grade) =>
    setPicked((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]));
  const reset = () => {
    setArea("all");
    setPicked([]);
    setLength("any");
    setMonth(0);
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>All trips</h1>
        <p className="lede">
          Eight guided treks on four continents, four to seven days long, every
          one led by a guide from the valley it starts in. Prices are per person
          and include huts or guesthouses, most meals and transfers on the
          route.
        </p>
      </header>

      <section className="wrap" aria-label="Filter and sort trips">
        <div className="filters">
          <label className="control">
            <span>Region</span>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value as Area | "all")}
            >
              <option value="all">Everywhere</option>
              {areas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <fieldset className="control chips">
            <legend>Grade</legend>
            <div>
              {([1, 2, 3] as Grade[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  className="chip"
                  aria-pressed={picked.includes(g)}
                  onClick={() => toggle(g)}
                >
                  <Blaze grade={g} />
                </button>
              ))}
            </div>
          </fieldset>
          <label className="control">
            <span>Length</span>
            <select
              value={length}
              onChange={(e) =>
                setLength(e.target.value as keyof typeof lengths)
              }
            >
              {Object.entries(lengths).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className="control">
            <span>Month</span>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              <option value={0}>Any month</option>
              {monthNames.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="control">
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="next">Next departure</option>
              <option value="price">Price, lowest first</option>
              <option value="days">Length, shortest first</option>
              <option value="grade">Grade, easiest first</option>
            </select>
          </label>
        </div>
        <div className="results-bar">
          <p aria-live="polite">
            {list.length === trips.length
              ? `All ${trips.length} trips`
              : `${list.length} of ${trips.length} trips`}
          </p>
          <fieldset className="view-toggle">
            <legend className="sr-only">View</legend>
            {(["cards", "table"] as const).map((v) => (
              <label key={v}>
                <input
                  type="radio"
                  name="view"
                  value={v}
                  checked={view === v}
                  onChange={() => setView(v)}
                />
                <span>{v === "cards" ? "Cards" : "Compare"}</span>
              </label>
            ))}
          </fieldset>
        </div>
      </section>

      <section className="wrap section-tight" aria-label="Trips">
        {list.length === 0 ? (
          <div className="empty">
            <h2>No trips on that path</h2>
            <p>
              Nothing matches every filter. Try another month or grade, or let
              the route finder weigh the trade-offs for you.
            </p>
            <div className="actions">
              <button type="button" className="btn btn-primary" onClick={reset}>
                Clear filters
              </button>
              <Link to="/route-finder" className="btn btn-ghost">
                Open the route finder
              </Link>
            </div>
          </div>
        ) : view === "cards" ? (
          <div className="trip-grid">
            {list.map((t) => (
              <TripCard key={t.slug} trip={t} />
            ))}
          </div>
        ) : (
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Trip comparison table"
          >
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">Trip</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Days</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Climb</th>
                  <th scope="col">Highest</th>
                  <th scope="col">Season</th>
                  <th scope="col">From</th>
                </tr>
              </thead>
              <tbody>
                {list.map((t) => {
                  const s = totals(t);
                  return (
                    <tr key={t.slug}>
                      <th scope="row">
                        <Link to={`/trips/${t.slug}`}>{t.name}</Link>
                        <span className="muted">
                          {t.region}, {t.country}
                        </span>
                      </th>
                      <td>
                        <Blaze grade={t.grade} />
                      </td>
                      <td className="num">{t.days.length}</td>
                      <td className="num">{s.km} km</td>
                      <td className="num">{num(s.up)} m</td>
                      <td className="num">{num(s.max)} m</td>
                      <td>{season(t.months)}</td>
                      <td className="num">{eur(t.price)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="fine">
          Grades:{" "}
          {([1, 2, 3] as Grade[])
            .map((g) => `${grades[g].blaze} = ${grades[g].name.toLowerCase()}`)
            .join(" • ")}
          .
        </p>
      </section>
    </>
  );
}
