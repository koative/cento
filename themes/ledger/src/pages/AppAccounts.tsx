import { ChevronRight } from "lucide-react";
import { Link } from "../router";
import { accounts, type AccountKind } from "../content";
import { Amount } from "../components/Amount";

const kinds: AccountKind[] = [
  "Cash",
  "Savings",
  "Credit",
  "Investments",
  "Loans",
];

export default function AppAccounts() {
  const assets = accounts
    .filter((a) => a.balance > 0)
    .reduce((s, a) => s + a.balance, 0);
  const debts = -accounts
    .filter((a) => a.balance < 0)
    .reduce((s, a) => s + a.balance, 0);

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Accounts</h1>
          <p>
            Six accounts at five institutions. Balances refreshed today at 7:42
            am.
          </p>
        </div>
      </header>

      <section className="panel worth" aria-labelledby="worth-h">
        <h2 id="worth-h">What you own and what you owe</h2>
        <div className="worth-bar" aria-hidden>
          <span className="worth-assets" style={{ flexGrow: assets }} />
          <span className="worth-debts" style={{ flexGrow: debts }} />
        </div>
        <dl className="worth-legend">
          <div>
            <dt>Assets</dt>
            <dd>
              <Amount value={assets} />
            </dd>
          </div>
          <div>
            <dt>Debts</dt>
            <dd>
              <Amount value={-debts} />
            </dd>
          </div>
          <div>
            <dt>Net worth</dt>
            <dd>
              <Amount value={assets - debts} />
            </dd>
          </div>
        </dl>
      </section>

      <div className="table-scroll">
        <table className="ledger-table account-table">
          <caption className="sr-only">All accounts by type</caption>
          <thead>
            <tr>
              <th scope="col">Account</th>
              <th scope="col" className="c-inst">
                Institution
              </th>
              <th scope="col" className="num-col">
                Balance
              </th>
            </tr>
          </thead>
          {kinds.map((k) => {
            const list = accounts.filter((a) => a.kind === k);
            return (
              <tbody key={k}>
                <tr className="group-row">
                  <th scope="colgroup" colSpan={2}>
                    {k}
                  </th>
                  <td className="num">
                    <Amount value={list.reduce((s, a) => s + a.balance, 0)} />
                  </td>
                </tr>
                {list.map((a) => (
                  <tr key={a.id}>
                    <th scope="row">
                      <Link to={`/app/accounts/${a.id}`} className="row-link">
                        {a.name}
                        <ChevronRight size={16} aria-hidden />
                      </Link>
                    </th>
                    <td className="muted c-inst">
                      {a.institution} ·· {a.mask}
                    </td>
                    <td className="num">
                      <Amount value={a.balance} />
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          })}
          <tfoot>
            <tr className="total-row">
              <th scope="row" colSpan={2}>
                Net worth
              </th>
              <td className="num">
                <Amount value={assets - debts} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
