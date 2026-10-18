import { ArrowLeft, Snowflake } from "lucide-react";
import { Link } from "../router";
import { accounts, historyMonths, type Account } from "../content";
import { categoryName, shortDate } from "../lib/format";
import { actions, useLedger } from "../lib/store";
import { Amount } from "../components/Amount";
import { BalanceChart } from "../components/Charts";
import { DebitCard } from "../components/DebitCard";

export default function AppAccount({ account }: { account: Account }) {
  const { transactions, hidden, frozen } = useLedger();
  const list = transactions.filter((t) => t.account === account.id);
  const change = account.balance - account.history[account.history.length - 2];

  return (
    <div className="app-page">
      <Link to="/app/accounts" className="back-link">
        <ArrowLeft size={16} aria-hidden /> Accounts
      </Link>
      <header className="app-head">
        <div>
          <h1>{account.name}</h1>
          <p>
            {account.institution} ·· {account.mask} · {account.kind}
            {account.rate && ` · ${account.rate}`}
          </p>
        </div>
        <p className="account-balance">
          <Amount value={account.balance} />
          <small>
            <Amount value={change} sign /> since September
          </small>
        </p>
      </header>

      <div className="app-grid">
        <section className="panel panel-wide" aria-labelledby="hist-h">
          <div className="panel-head">
            <h2 id="hist-h">Six months</h2>
            <p>{account.note}</p>
          </div>
          <BalanceChart
            months={historyMonths}
            values={account.history}
            hidden={hidden}
          />
        </section>

        <section className="panel" aria-labelledby="acct-tx-h">
          <div className="panel-head">
            <h2 id="acct-tx-h">Transactions</h2>
            <Link to="/app/transactions" className="text-link">
              All
            </Link>
          </div>
          {list.length ? (
            <ul className="tx-list">
              {list.map((t) => (
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
          ) : (
            <p className="panel-note">No transactions in the last 30 days.</p>
          )}
        </section>

        {account.id === "everyday" ? (
          <section className="panel" aria-labelledby="acct-card-h">
            <div className="panel-head">
              <h2 id="acct-card-h">Linked card</h2>
            </div>
            <DebitCard frozen={frozen} mask={account.mask} />
            <div className="card-row">
              <p role="status">
                {frozen
                  ? "Frozen. Purchases are declined."
                  : "Active. Contactless limit $250."}
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
        ) : (
          <section className="panel" aria-labelledby="acct-other-h">
            <div className="panel-head">
              <h2 id="acct-other-h">Other accounts</h2>
            </div>
            <ul className="tx-list">
              {accounts
                .filter((a) => a.id !== account.id)
                .map((a) => (
                  <li key={a.id}>
                    <Link to={`/app/accounts/${a.id}`}>{a.name}</Link>
                    <Amount value={a.balance} />
                  </li>
                ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
