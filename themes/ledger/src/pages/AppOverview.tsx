import { ArrowRight, Snowflake } from "lucide-react";
import { Link } from "../router";
import { accounts, lastMonthPace } from "../content";
import { categoryName, shortDate } from "../lib/format";
import { actions, income, MONTH, spent, useLedger } from "../lib/store";
import { Amount } from "../components/Amount";
import { PaceChart } from "../components/Charts";
import { DebitCard } from "../components/DebitCard";

const TODAY = 18;

export default function AppOverview() {
  const { envelopes, transactions, hidden, frozen, prefs } = useLedger();
  const earned = income(transactions);
  const assigned = envelopes.reduce((s, e) => s + e.assigned, 0);
  const net = accounts.reduce((s, a) => s + a.balance, 0);

  const daily = Array.from(
    { length: TODAY },
    (_, d) =>
      -transactions
        .filter(
          (t) =>
            t.date === `${MONTH}-${String(d + 1).padStart(2, "0")}` &&
            t.category !== "income" &&
            t.category !== "transfer",
        )
        .reduce((s, t) => s + t.amount, 0),
  );
  const pace = daily.map((_, i) =>
    daily.slice(0, i + 1).reduce((s, v) => s + v, 0),
  );

  const watch = envelopes
    .map((e) => ({ ...e, out: spent(e.id, transactions) }))
    .filter((e) => e.group !== "Bills" && e.out > e.assigned * 0.5)
    .sort((a, b) => b.out / b.assigned - a.out / a.assigned);
  const goal = accounts.find((a) => a.id === "lisbon")!;

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Good morning, {prefs.name.split(" ")[0]}</h1>
          <p>Sunday, October 18 · 13 days left in the month</p>
        </div>
        <Link to="/app/budgets" className="btn btn-primary">
          Assign money
        </Link>
      </header>

      <section className="sum-strip" aria-label="October at a glance">
        <p>
          <span>Income in October</span>
          <Amount value={earned} />
        </p>
        <p aria-hidden className="sum-op">
          −
        </p>
        <p>
          <span>Assigned to envelopes</span>
          <Amount value={assigned} />
        </p>
        <p aria-hidden className="sum-op">
          =
        </p>
        <p
          className="sum-result"
          data-over={earned - assigned < 0 ? "" : undefined}
        >
          <span>To be assigned</span>
          <mark>
            <Amount value={earned - assigned} />
          </mark>
        </p>
        <p className="sum-net">
          <span>Net worth</span>
          <Amount value={net} />
        </p>
      </section>

      <div className="app-grid">
        <section className="panel panel-wide" aria-labelledby="pace-h">
          <div className="panel-head">
            <h2 id="pace-h">Spending pace</h2>
            <p>
              <Amount value={pace[TODAY - 1]} cents={false} /> spent so far,{" "}
              <Amount
                value={Math.abs(lastMonthPace[TODAY - 1] - pace[TODAY - 1])}
                cents={false}
              />{" "}
              {pace[TODAY - 1] <= lastMonthPace[TODAY - 1] ? "less" : "more"}{" "}
              than this point in September
            </p>
          </div>
          <PaceChart
            thisMonth={pace}
            lastMonth={lastMonthPace}
            hidden={hidden}
          />
        </section>

        <section className="panel" aria-labelledby="watch-h">
          <div className="panel-head">
            <h2 id="watch-h">Envelopes to watch</h2>
            <Link to="/app/budgets" className="text-link">
              Budget
            </Link>
          </div>
          <ul className="watch-list">
            {watch.map((e) => (
              <li key={e.id}>
                <span>
                  {e.name}
                  <small>
                    <Amount value={e.out} cents={false} tone={false} /> of{" "}
                    <Amount value={e.assigned} cents={false} tone={false} />
                  </small>
                </span>
                <span
                  className="meter"
                  data-over={e.out > e.assigned ? "" : undefined}
                  aria-hidden
                >
                  <span
                    style={{
                      width: `${Math.min(100, (e.out / e.assigned) * 100)}%`,
                    }}
                  />
                </span>
                <Amount value={e.assigned - e.out} />
              </li>
            ))}
          </ul>
        </section>

        <section className="panel" aria-labelledby="recent-h">
          <div className="panel-head">
            <h2 id="recent-h">Latest activity</h2>
            <Link to="/app/transactions" className="text-link">
              All transactions
            </Link>
          </div>
          <ul className="tx-list">
            {transactions.slice(0, 6).map((t) => (
              <li key={t.id}>
                <span>
                  {t.payee}
                  <small>
                    {categoryName(t.category)} · {shortDate(t.date)}
                  </small>
                </span>
                <Amount value={t.amount} sign />
              </li>
            ))}
          </ul>
        </section>

        <section className="panel" aria-labelledby="card-h">
          <div className="panel-head">
            <h2 id="card-h">Your card</h2>
          </div>
          <DebitCard frozen={frozen} />
          <div className="card-row">
            <p role="status">
              {frozen
                ? "Frozen. Purchases are declined."
                : "Active, spending from Everyday checking."}
            </p>
            <button
              className="btn btn-quiet btn-small"
              aria-pressed={frozen}
              onClick={actions.toggleFrozen}
            >
              <Snowflake size={15} aria-hidden />{" "}
              {frozen ? "Unfreeze" : "Freeze"}
            </button>
          </div>
        </section>

        <section className="panel" aria-labelledby="goal-h">
          <div className="panel-head">
            <h2 id="goal-h">Lisbon, June</h2>
            <Link to={`/app/accounts/${goal.id}`} className="text-link">
              Account
            </Link>
          </div>
          <p className="goal-figure">
            <Amount value={goal.balance} cents={false} />{" "}
            <span>of $3,000 by June 1</span>
          </p>
          <span className="meter meter-thick" aria-hidden>
            <span style={{ width: `${(goal.balance / 3000) * 100}%` }} />
          </span>
          <p className="panel-note">
            On track at $300 a month. Seven more paydays.
          </p>
          <Link to="/app/accounts" className="text-link">
            All accounts <ArrowRight size={14} aria-hidden />
          </Link>
        </section>
      </div>
    </div>
  );
}
