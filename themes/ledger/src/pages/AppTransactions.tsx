import { useState } from "react";
import { ArrowDown, ArrowUp, Download, Search } from "lucide-react";
import { accounts, envelopes } from "../content";
import { categoryName, shortDate } from "../lib/format";
import { actions, useLedger } from "../lib/store";
import { Amount } from "../components/Amount";

type Key = "date" | "payee" | "amount";
const categories = [
  ...envelopes.map((e) => ({ id: e.id, name: e.name })),
  { id: "income", name: "Income" },
  { id: "transfer", name: "Transfer" },
];
const accountName = (id: string) =>
  accounts.find((a) => a.id === id)?.name ?? id;

export default function AppTransactions() {
  const { transactions } = useLedger();
  const [q, setQ] = useState("");
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({
    key: "date",
    dir: -1,
  });

  const needle = q.trim().toLowerCase();
  const list = transactions
    .filter(
      (t) =>
        (!needle || t.payee.toLowerCase().includes(needle)) &&
        (!account || t.account === account) &&
        (!category || t.category === category),
    )
    .sort((a, b) => {
      const v =
        sort.key === "amount"
          ? a.amount - b.amount
          : a[sort.key].localeCompare(b[sort.key]);
      return (v || a.id.localeCompare(b.id)) * sort.dir;
    });
  const total = list.reduce((s, t) => s + t.amount, 0);

  function header(key: Key, label: string, num = false) {
    const active = sort.key === key;
    return (
      <th
        scope="col"
        className={`c-${key}${num ? " num-col" : ""}`}
        aria-sort={
          active ? (sort.dir === 1 ? "ascending" : "descending") : "none"
        }
      >
        <button
          type="button"
          className="sort"
          onClick={() =>
            setSort({
              key,
              dir: active
                ? sort.dir === 1
                  ? -1
                  : 1
                : key === "payee"
                  ? 1
                  : -1,
            })
          }
        >
          {label}
          {active &&
            (sort.dir === 1 ? (
              <ArrowUp size={14} aria-hidden />
            ) : (
              <ArrowDown size={14} aria-hidden />
            ))}
        </button>
      </th>
    );
  }

  function exportCsv() {
    const rows = [
      ["Date", "Payee", "Category", "Account", "Amount"],
      ...list.map((t) => [
        t.date,
        t.payee,
        categoryName(t.category),
        accountName(t.account),
        t.amount.toFixed(2),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "ledger-transactions.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Transactions</h1>
          <p>Change a category and the budget updates straight away.</p>
        </div>
        <button
          className="btn btn-quiet"
          onClick={exportCsv}
          disabled={!list.length}
        >
          <Download size={16} aria-hidden /> Export CSV
        </button>
      </header>

      <div className="tx-tools">
        <div className="search">
          <Search size={17} aria-hidden />
          <label htmlFor="tx-q" className="sr-only">
            Search payees
          </label>
          <input
            id="tx-q"
            type="search"
            placeholder="Search payees"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="field field-inline">
          <label htmlFor="tx-account">Account</label>
          <select
            id="tx-account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          >
            <option value="">All accounts</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field field-inline">
          <label htmlFor="tx-cat">Category</label>
          <select
            id="tx-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="result-count" role="status">
        {list.length} of {transactions.length} transactions
      </p>

      {list.length ? (
        <div className="table-scroll">
          <table className="ledger-table tx-table">
            <caption className="sr-only">
              Transactions, sorted by {sort.key}
            </caption>
            <thead>
              <tr>
                {header("date", "Date")}
                {header("payee", "Payee")}
                <th scope="col" className="c-cat">
                  Category
                </th>
                <th scope="col" className="c-acct">
                  Account
                </th>
                {header("amount", "Amount", true)}
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id}>
                  <td className="num muted c-date">{shortDate(t.date)}</td>
                  <th scope="row" className="c-payee">
                    {t.payee}
                  </th>
                  <td className="c-cat">
                    <select
                      className="cell-select"
                      aria-label={`Category for ${t.payee}, ${shortDate(t.date)}`}
                      value={t.category}
                      onChange={(e) =>
                        actions.recategorize(t.id, e.target.value)
                      }
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="muted c-acct">{accountName(t.account)}</td>
                  <td className="num c-amount">
                    <Amount value={t.amount} sign />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <th scope="row" colSpan={4}>
                  Net of these {list.length}
                </th>
                <td className="num">
                  <Amount value={total} sign />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="empty">
          <p>
            No transactions match. Clear the search or pick a different account.
          </p>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => {
              setQ("");
              setAccount("");
              setCategory("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
