import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  Plus,
  Snowflake,
  Eye,
  EyeOff,
  CreditCard,
  Home,
  Target,
  Settings,
  Command,
  ShoppingBag,
  Coffee,
  Music2,
  X,
} from "lucide-react";
const transactions = [
  {
    name: "Studio North",
    type: "Salary · Today",
    amount: 4200,
    icon: ArrowDownLeft,
  },
  {
    name: "Sunday Supply",
    type: "Shopping · Today",
    amount: -86.4,
    icon: ShoppingBag,
  },
  {
    name: "Little Company",
    type: "Coffee · Yesterday",
    amount: -12.5,
    icon: Coffee,
  },
  {
    name: "Sound & Color",
    type: "Subscription · Yesterday",
    amount: -10.99,
    icon: Music2,
  },
];
export default function App() {
  const [hidden, setHidden] = useState(false),
    [frozen, setFrozen] = useState(false),
    [tab, setTab] = useState("Overview"),
    [budget, setBudget] = useState(2400),
    [showBudget, setShowBudget] = useState(false),
    [goal, setGoal] = useState(1850),
    [notice, setNotice] = useState(""),
    [transfer, setTransfer] = useState(false);
  const money = (n: number) =>
    hidden
      ? "••••••"
      : n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  return (
    <div className="ledger-app">
      <aside className="rail">
        <a href="#overview" className="logo">
          <Command size={27} /> ledger<span>®</span>
        </a>
        <div className="workspace">
          <span className="avatar">JD</span>
          <div>
            Jamie Davis<small>Personal workspace</small>
          </div>
        </div>
        <nav aria-label="Main navigation">
          {[
            { name: "Overview", icon: Home },
            { name: "Cards", icon: CreditCard },
            { name: "Goals", icon: Target },
            { name: "Preferences", icon: Settings },
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={tab === name ? "active" : ""}
              onClick={() => {
                setTab(name);
                document
                  .getElementById(
                    name === "Cards"
                      ? "card"
                      : name === "Goals"
                        ? "goals"
                        : name === "Preferences"
                          ? "preferences"
                          : "overview",
                  )
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <Icon size={19} />
              {name}
              {tab === name && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="rail-note">
          <div className="note-flower">
            <Command size={40} strokeWidth={1.4} />
          </div>
          <h3>
            Make room for
            <br />
            what's next.
          </h3>
          <p>
            A little intention.
            <br />A lot of possibility.
          </p>
          <button
            onClick={() => {
              setTab("Goals");
              document
                .getElementById("goals")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore your goals <ArrowUpRight size={17} />
          </button>
        </div>
        <a className="back" href="../../">
          A Koative template <ArrowUpRight size={14} />
        </a>
      </aside>
      <main id="overview">
        <header className="topbar">
          <span>Your money, in a good place.</span>
          <span className="demo-label">Demo workspace</span>
        </header>
        <div className="greeting">
          <div>
            <h1>A little more possibility.</h1>
            <p>Good morning, Jamie. Let's make today count.</p>
          </div>
          <button
            className="round-button"
            onClick={() => setHidden(!hidden)}
            aria-label={hidden ? "Show balances" : "Hide balances"}
          >
            {hidden ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <section className="account-grid" aria-label="Account overview">
          <div className="balance">
            <span className="label">
              Your total balance <span>USD</span>
            </span>
            <div className="big-balance">{money(14860.28)}</div>
            <p>
              <span className="positive">
                <ArrowUpRight size={15} /> 8.2%
              </span>{" "}
              a little ahead of last month
            </p>
            <div className="balance-actions">
              <button
                className="primary"
                onClick={() => setTransfer(!transfer)}
              >
                <ArrowUpRight size={17} /> Move money
              </button>
              <button
                className="secondary"
                onClick={() => {
                  setNotice(
                    "Account details: Demo checking • 0082. Routing information is not available in this sample.",
                  );
                }}
              >
                <Plus size={17} /> Account details
              </button>
            </div>
            {transfer && (
              <form
                className="transfer-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setNotice(
                    "Transfer preview complete. This demo does not move real money.",
                  );
                  setTransfer(false);
                }}
              >
                <label>
                  Recipient
                  <input required placeholder="Name or account" />
                </label>
                <label>
                  Amount ($)
                  <input
                    type="number"
                    min="1"
                    max="14860.28"
                    required
                    placeholder="250"
                    step="0.01"
                  />
                </label>
                <button className="primary">
                  Preview transfer <ArrowRight size={15} />
                </button>
              </form>
            )}
            <div className="balance-bottom">
              <span>
                <ArrowDownLeft size={19} />
                <div>
                  Money in<strong>{money(6240)}</strong>
                </div>
              </span>
              <span>
                <ArrowUpRight size={19} />
                <div>
                  Money out<strong>{money(2168.72)}</strong>
                </div>
              </span>
            </div>
          </div>
          <div id="card" className="card-stage">
            <div className={"bank-card " + (frozen ? "frozen" : "")}>
              <div className="card-top">
                <strong>ledger.</strong>
                <span>DEBIT</span>
              </div>
              <div className="card-orbits">
                <i />
                <i />
                <i />
              </div>
              <div className="chip" />
              <div className="card-bottom">
                <span>
                  Jamie Davis<small>•••• 0082</small>
                </span>
                <b>visa</b>
              </div>
              {frozen && (
                <div className="frozen-label">
                  <Snowflake size={16} /> Card frozen
                </div>
              )}
            </div>
            <div className="card-controls">
              <span>
                <i className={frozen ? "paused" : "live"} />
                {frozen ? "Your card is paused" : "Your everyday card"}
              </span>
              <button onClick={() => setFrozen(!frozen)}>
                <Snowflake size={15} />
                {frozen ? "Unfreeze" : "Freeze card"}
              </button>
            </div>
          </div>
        </section>
        <section className="detail-grid">
          <div className="transactions">
            <div className="section-heading">
              <h2>The everyday details</h2>
              <span>Recent activity</span>
            </div>
            {transactions.map((t) => (
              <div className="transaction" key={t.name}>
                <span className="transaction-icon">
                  <t.icon size={21} />
                </span>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.type}</small>
                </div>
                <b className={t.amount > 0 ? "positive" : ""}>
                  {t.amount > 0 ? "+" : ""}
                  {money(t.amount)}
                </b>
              </div>
            ))}
            <p className="sample-note">
              Illustrative transactions. No connected bank account.
            </p>
          </div>
          <div className="budget" id="preferences">
            <div className="section-heading">
              <h2>Spend with intention</h2>
              <button
                className="text-button"
                onClick={() => setShowBudget(!showBudget)}
              >
                Edit budget <ArrowUpRight size={15} />
              </button>
            </div>
            <div className="budget-number">
              {money(1620)}
              <small> of {money(budget)}</small>
            </div>
            <div className="budget-track">
              <span
                style={{ width: `${Math.min(100, (1620 / budget) * 100)}%` }}
              />
            </div>
            <div className="budget-meta">
              <span>Monthly spending</span>
              <b>{money(Math.max(0, budget - 1620))} left</b>
            </div>
            {showBudget && (
              <label className="budget-input">
                Set monthly budget ($)
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={budget}
                  onChange={(e) =>
                    setBudget(Math.max(100, Number(e.target.value)))
                  }
                />
              </label>
            )}
            <div className="categories">
              <span>
                <i /> Shopping <b>$640</b>
              </span>
              <span>
                <i /> Food & coffee <b>$380</b>
              </span>
              <span>
                <i /> Everything else <b>$600</b>
              </span>
            </div>
          </div>
        </section>
        <section id="goals" className="goal">
          <div className="goal-illustration">
            <Target size={60} strokeWidth={1} />
          </div>
          <div>
            <h2>A summer somewhere new.</h2>
            <p>Your little escape fund. One step closer every day.</p>
          </div>
          <div className="goal-amount">
            <strong>{money(goal)}</strong>
            <span>of $3,000 saved</span>
          </div>
          <button
            onClick={() => {
              setGoal(Math.min(3000, goal + 100));
              setNotice("Added $100 to your sample escape fund.");
            }}
            disabled={goal >= 3000}
          >
            <Plus size={17} />
            {goal >= 3000 ? "Goal reached" : "Add $100"}
          </button>
        </section>
        <footer>
          Ledger is a fictional financial interface. All balances and activity
          are sample data.<span>Made for a life well lived.</span>
        </footer>
        {notice && (
          <div className="notice" role="status">
            {notice}
            <button
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <X size={17} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
