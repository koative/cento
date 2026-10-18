import { useState } from "react";
import { Link } from "../router";
import { money } from "../lib/format";

const START = [
  { id: "bills", name: "Rent & bills", amount: 1865, share: 0.38 },
  { id: "groceries", name: "Groceries", amount: 520, share: 0.1 },
  { id: "transit", name: "Getting around", amount: 96, share: 0.02 },
  { id: "eating", name: "Eating out", amount: 200, share: 0.1 },
  { id: "fun", name: "Fun money", amount: 230, share: 0.2 },
  { id: "savings", name: "Savings", amount: 700, share: 0.2 },
];

/** The signature: a paycheck split into envelopes until "left to assign" reads zero. */
export function Allocator() {
  const [pay, setPay] = useState("4200");
  const [jobs, setJobs] = useState(START);
  const income = Math.max(0, Number(pay) || 0);
  const assigned = jobs.reduce((s, j) => s + j.amount, 0);
  const left = income - assigned;
  const max = Math.max(income, ...jobs.map((j) => j.amount));

  const setAmount = (id: string, amount: number) =>
    setJobs((js) => js.map((j) => (j.id === id ? { ...j, amount } : j)));

  function split() {
    const next = jobs.map((j) => ({
      ...j,
      amount: Math.floor((income * j.share) / 5) * 5,
    }));
    const rest = income - next.reduce((s, j) => s + j.amount, 0);
    setJobs(
      next.map((j) =>
        j.id === "savings" ? { ...j, amount: j.amount + rest } : j,
      ),
    );
  }

  return (
    <div className="allocator">
      <div className="alloc-pay">
        <label htmlFor="alloc-pay">Take-home pay this month</label>
        <div className="money-input">
          <span aria-hidden>$</span>
          <input
            id="alloc-pay"
            inputMode="numeric"
            value={pay && Number(pay).toLocaleString("en-US")}
            onChange={(e) =>
              setPay(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
            }
          />
        </div>
        <div className="alloc-bar" aria-hidden>
          {jobs.map((j) => (
            <span key={j.id} style={{ flexGrow: j.amount }} data-job={j.id} />
          ))}
          {left > 0 && (
            <span style={{ flexGrow: left }} className="alloc-left" />
          )}
        </div>
        <div className="alloc-presets">
          <button
            type="button"
            className="btn btn-quiet btn-small"
            onClick={split}
          >
            Try the 50/30/20 split
          </button>
          <button
            type="button"
            className="btn btn-quiet btn-small"
            disabled={left <= 0}
            onClick={() =>
              setAmount(
                "savings",
                (jobs.find((j) => j.id === "savings")?.amount ?? 0) + left,
              )
            }
          >
            Send the rest to savings
          </button>
        </div>
      </div>

      <table className="ledger-table alloc-table">
        <caption className="sr-only">Envelopes for this paycheck</caption>
        <thead>
          <tr>
            <th scope="col">Envelope</th>
            <th scope="col" className="num-col">
              Assigned
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.id}>
              <th scope="row">
                <label htmlFor={`alloc-${j.id}`}>
                  <i data-job={j.id} aria-hidden />
                  {j.name}
                </label>
                <input
                  id={`alloc-${j.id}`}
                  type="range"
                  min={0}
                  max={max}
                  step={5}
                  value={j.amount}
                  aria-valuetext={money(j.amount, { cents: false })}
                  onChange={(e) => setAmount(j.id, Number(e.target.value))}
                />
              </th>
              <td className="num">{money(j.amount, { cents: false })}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <th scope="row">Assigned</th>
            <td className="num">{money(assigned, { cents: false })}</td>
          </tr>
          <tr
            className="left-row"
            data-state={left === 0 ? "zero" : left < 0 ? "over" : "left"}
          >
            <th scope="row">{left < 0 ? "Over-assigned" : "Left to assign"}</th>
            <td className="num">
              <mark>{money(Math.abs(left), { cents: false })}</mark>
            </td>
          </tr>
        </tfoot>
      </table>
      <p className="alloc-status" role="status">
        {left === 0
          ? "Every dollar has a job. That is a budget."
          : left > 0
            ? `${money(left, { cents: false })} still needs a job. Give it one, even if the job is “next month”.`
            : `You have planned ${money(-left, { cents: false })} more than you earn. Take it from an envelope that can wait.`}
      </p>
      <p className="alloc-foot">
        Nothing you type leaves this page.{" "}
        <Link to="/app/budgets">Open the full budget demo</Link>
      </p>
    </div>
  );
}
