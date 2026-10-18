import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { Link } from "../router";
import { grades, landscapes, type Grade, type Landscape } from "../content";
import { rank, type Wish } from "../lib/finder";
import { eur, monthNames, query } from "../lib/trips";
import { Blaze } from "../components/Marks";
import { Profile } from "../components/Profile";
import { Signpost } from "../components/Signpost";

const defaults: Wish = {
  month: 0,
  days: 6,
  grade: 2,
  sleep: "any",
  landscapes: [],
  budget: 3000,
};

/** Defaults, overridden by ?month=&days=&grade= from the home page quick finder. */
function initial(): Wish {
  const q = query();
  const pick = (key: string, lo: number, hi: number, d: number) => {
    const v = Number(q.get(key) ?? d);
    return Number.isInteger(v) && v >= lo && v <= hi ? v : d;
  };
  return {
    ...defaults,
    month: pick("month", 0, 12, 0),
    days: pick("days", 4, 8, 6),
    grade: pick("grade", 1, 3, 2) as Grade,
  };
}

export function RouteFinder() {
  const [wish, setWish] = useState<Wish>(initial);
  const set = <K extends keyof Wish>(k: K, v: Wish[K]) =>
    setWish((w) => ({ ...w, [k]: v }));
  const results = useMemo(() => rank(wish), [wish]);
  const top = results.slice(0, 3);
  const toggleLand = (l: Landscape) =>
    set(
      "landscapes",
      wish.landscapes.includes(l)
        ? wish.landscapes.filter((x) => x !== l)
        : [...wish.landscapes, l],
    );

  return (
    <>
      <header className="page-head wrap">
        <h1>Route finder</h1>
        <p className="lede">
          Six questions, eight trips, one honest ranking. Every answer re-sorts
          the list, and each trip tells you exactly where it fits and where it
          doesn't.
        </p>
      </header>

      <div className="wrap finder">
        <form
          className="finder-form"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Your trip"
        >
          <label className="control">
            <span>When can you go?</span>
            <select
              value={wish.month}
              onChange={(e) => set("month", Number(e.target.value))}
            >
              <option value={0}>Any month</option>
              {monthNames.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="control range">
            <span>
              Days you have <output>{wish.days} days</output>
            </span>
            <input
              type="range"
              min={4}
              max={8}
              step={1}
              value={wish.days}
              onChange={(e) => set("days", Number(e.target.value))}
            />
          </label>

          <fieldset className="control">
            <legend>How hard?</legend>
            <div className="grade-pick">
              {([1, 2, 3] as Grade[]).map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="grade"
                    checked={wish.grade === g}
                    onChange={() => set("grade", g)}
                  />
                  <span>
                    <Blaze grade={g} />
                    <small>
                      {grades[g].hours}, {grades[g].ascent}
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="control">
            <legend>Where do you want to sleep?</legend>
            <div className="seg">
              {(
                [
                  ["any", "Any"],
                  ["comfort", "Guesthouses"],
                  ["hut", "Mountain huts"],
                ] as const
              ).map(([v, l]) => (
                <label key={v}>
                  <input
                    type="radio"
                    name="sleep"
                    checked={wish.sleep === v}
                    onChange={() => set("sleep", v)}
                  />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="control">
            <legend>Landscapes you'd love</legend>
            <div className="chip-row">
              {landscapes.map((l) => (
                <button
                  key={l}
                  type="button"
                  className="chip"
                  aria-pressed={wish.landscapes.includes(l)}
                  onClick={() => toggleLand(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="control range">
            <span>
              Budget per person <output>{eur(wish.budget)}</output>
            </span>
            <input
              type="range"
              min={700}
              max={3000}
              step={100}
              value={wish.budget}
              onChange={(e) => set("budget", Number(e.target.value))}
            />
          </label>

          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={() => setWish(defaults)}
          >
            Start again
          </button>
        </form>

        <section className="finder-results" aria-labelledby="matches-title">
          <h2 id="matches-title" className="sr-only">
            Your matches
          </h2>
          <p className="sr-only" aria-live="polite">
            Best match: {top[0].trip.name}, {top[0].score}% fit.
          </p>
          <div className="finder-sign">
            <Signpost
              label="Your best three"
              here="Best for you"
              signs={top.map((m) => ({
                to: `/trips/${m.trip.slug}`,
                label: m.trip.name,
                meta: `${m.score}% fit • ${m.trip.days.length} days`,
                grade: m.trip.grade,
              }))}
            />
          </div>
          <ol className="match-list">
            {results.map((m, i) => (
              <li
                key={m.trip.slug}
                className="match"
                data-top={i === 0 ? "" : undefined}
              >
                <div
                  className="match-score"
                  aria-label={`${m.score} percent fit`}
                >
                  <strong>{m.score}</strong>
                  <span>% fit</span>
                </div>
                <div className="match-body">
                  <h3>
                    <Link to={`/trips/${m.trip.slug}`}>{m.trip.name}</Link>
                  </h3>
                  <p className="muted">
                    {m.trip.region}, {m.trip.country} • {m.trip.days.length}{" "}
                    days • from {eur(m.trip.price)}
                  </p>
                  <ul className="reasons">
                    {m.reasons.map((r) => (
                      <li key={r.text} data-ok={r.ok ? "" : undefined}>
                        {r.ok ? (
                          <Check aria-hidden="true" />
                        ) : (
                          <X aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {r.ok ? "Fits: " : "Trade-off: "}
                        </span>
                        {r.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="match-profile">
                  <Profile days={m.trip.days} compact />
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
