import type { CSSProperties } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Link, navigate } from "../router";
import {
  budgetLines,
  guestTiers,
  packages,
  priorityOptions,
  type BudgetLineId,
} from "../content";
import {
  allocate,
  iso,
  longDate,
  money,
  resetPlan,
  schedule,
  setPlan,
  shortDate,
  suggest,
  today,
  usePlan,
  weeksUntil,
} from "../lib/plan";

const stateLabel = {
  done: "Done",
  late: "Behind",
  next: "Next up",
  later: "",
} as const;

export function Planner() {
  const plan = usePlan();
  const weeks = weeksUntil(plan.date);
  const future = weeks >= 1;
  const steps = schedule(plan);
  const done = steps.filter((s) => s.state === "done").length;
  const late = steps.filter((s) => s.state === "late").length;
  const split = allocate(plan.budget, plan.priorities);
  const pkg = packages.find((p) => p.id === suggest(weeks, plan.guests))!;
  const tier = plan.guests <= 80 ? 0 : plan.guests <= 150 ? 1 : 2;
  const fee = pkg.prices[tier] ?? pkg.prices[0]!;
  const todayIndex = steps.findIndex(
    (s) => s.due.getTime() >= today().getTime(),
  );
  const lineLabel = (id: BudgetLineId) =>
    budgetLines.find((l) => l.id === id)!.label;

  function togglePriority(id: BudgetLineId) {
    const has = plan.priorities.includes(id);
    setPlan({
      priorities: has
        ? plan.priorities.filter((p) => p !== id)
        : [...plan.priorities, id],
    });
  }

  function toggleDone(id: string) {
    setPlan({
      done: plan.done.includes(id)
        ? plan.done.filter((d) => d !== id)
        : [...plan.done, id],
    });
  }

  return (
    <div className="page planner-page">
      <header className="page-head">
        <h1>The countdown planner</h1>
        <p className="lede">
          Give it a date, a guest count and a budget. It counts back every
          booking that matters, tells you what is already behind, and splits the
          money the way our last forty weddings did. Your plan stays in this
          browser.
        </p>
      </header>

      <div className="planner">
        <form
          className="planner-controls"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Your wedding"
        >
          <div className="field">
            <label htmlFor="p-date">Wedding date</label>
            <input
              id="p-date"
              type="date"
              value={plan.date}
              min={iso(today())}
              onChange={(e) =>
                e.target.value && setPlan({ date: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label htmlFor="p-guests">
              Guests{" "}
              <output htmlFor="p-guests" className="num">
                {plan.guests}
              </output>
            </label>
            <input
              id="p-guests"
              type="range"
              min={2}
              max={250}
              value={plan.guests}
              onChange={(e) => setPlan({ guests: Number(e.target.value) })}
            />
          </div>

          <div className="field">
            <label htmlFor="p-budget">Total budget, US dollars</label>
            <input
              id="p-budget"
              type="number"
              inputMode="numeric"
              min={5000}
              step={1000}
              value={plan.budget}
              onChange={(e) =>
                setPlan({ budget: Math.max(0, Number(e.target.value) || 0) })
              }
            />
          </div>

          <fieldset className="chips">
            <legend>What matters most? Choose up to two.</legend>
            {priorityOptions.map((id) => {
              const on = plan.priorities.includes(id);
              return (
                <label key={id} className="chip" data-on={on || undefined}>
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={!on && plan.priorities.length >= 2}
                    onChange={() => togglePriority(id)}
                  />
                  {lineLabel(id)}
                </label>
              );
            })}
          </fieldset>

          <button type="button" className="text-btn" onClick={resetPlan}>
            <RotateCcw size={16} strokeWidth={1.5} aria-hidden="true" /> Start a
            new plan
          </button>
        </form>

        <div className="planner-output">
          <section
            className="place-card"
            aria-labelledby="pc-title"
            aria-live="polite"
          >
            <h2 id="pc-title">{longDate(plan.date)}</h2>
            {future ? (
              <p className="pc-count">
                <span className="num">{weeks}</span> weeks to go ·{" "}
                <span className="num">{done}</span> of{" "}
                <span className="num">{steps.length}</span> done ·{" "}
                <span className="num">
                  {money(plan.guests ? plan.budget / plan.guests : 0)}
                </span>{" "}
                a guest
              </p>
            ) : (
              <p className="pc-count">
                Choose a date at least a week from today to count back from.
              </p>
            )}
            {future && late > 0 && (
              <p className="pc-note">
                {late === 1 ? "One milestone is" : `${late} milestones are`}{" "}
                already behind the calendar. That is normal for a shorter
                engagement: tick what you have done and the rest is your
                catch-up list.
              </p>
            )}
          </section>

          <section aria-labelledby="tl-title">
            <h2 id="tl-title" className="h3">
              Order of planning
            </h2>
            <ol className="timeline" key={plan.date}>
              {steps.map((s, i) => (
                <li
                  key={s.id}
                  data-state={s.state}
                  style={{ "--i": i } as CSSProperties}
                >
                  {i === todayIndex && future && (
                    <p className="today-mark">
                      <span>Today, {shortDate(today())}</span>
                    </p>
                  )}
                  <div className="tl-row">
                    <input
                      id={"m-" + s.id}
                      type="checkbox"
                      className="tl-check"
                      checked={s.state === "done"}
                      onChange={() => toggleDone(s.id)}
                    />
                    <span className="tl-box" aria-hidden="true">
                      <Check size={14} strokeWidth={2} />
                    </span>
                    <label htmlFor={"m-" + s.id} className="tl-title">
                      {s.title}
                    </label>
                    <time className="tl-due num" dateTime={iso(s.due)}>
                      {shortDate(s.due)}
                    </time>
                    <p className="tl-detail">
                      {stateLabel[s.state] && (
                        <strong className="tl-state">
                          {stateLabel[s.state]}.{" "}
                        </strong>
                      )}
                      {s.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="bg-title" className="budget">
            <h2 id="bg-title" className="h3">
              Where {money(plan.budget)} goes
            </h2>
            <div className="budget-bar" aria-hidden="true">
              {split.map((l) => (
                <span
                  key={l.id}
                  data-line={l.id}
                  style={{ flexBasis: `${l.pct}%` }}
                />
              ))}
            </div>
            <table className="budget-table">
              <caption className="visually-hidden">
                Suggested budget split
              </caption>
              <thead>
                <tr>
                  <th scope="col">Line</th>
                  <th scope="col">Share</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {split.map((l) => (
                  <tr
                    key={l.id}
                    data-priority={plan.priorities.includes(l.id) || undefined}
                  >
                    <th scope="row">
                      <span
                        className="swatch"
                        data-line={l.id}
                        aria-hidden="true"
                      />
                      {l.label}
                    </th>
                    <td className="num">{l.pct.toFixed(0)}%</td>
                    <td className="num">{money(l.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fine">
              Illustrative split from our own weddings; your venue and region
              will move these lines.
            </p>
          </section>

          {future && (
            <section className="suggestion" aria-labelledby="sg-title">
              <h2 id="sg-title" className="h3">
                The package that fits: {pkg.name}
              </h2>
              <p>
                {pkg.kind}, {pkg.joins.toLowerCase()}. For{" "}
                {guestTiers[tier].toLowerCase()}, the fee is{" "}
                <span className="num">{money(fee)}</span>. {pkg.summary}
              </p>
              <div className="actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate("/enquire")}
                >
                  Send this plan with an enquiry
                </button>
                <Link to="/services" className="text-link">
                  Compare all packages
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
