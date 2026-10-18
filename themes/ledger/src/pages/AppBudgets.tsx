import { useRef, useState, type FormEvent } from "react";
import { ArrowRightLeft } from "lucide-react";
import { app } from "../content";
import { money } from "../lib/format";
import { actions, income, spent, useLedger } from "../lib/store";
import { Amount } from "../components/Amount";

export default function AppBudgets() {
  const { envelopes, transactions } = useLedger();
  const rows = envelopes.map((e) => {
    const out = spent(e.id, transactions);
    return { ...e, out, left: e.assigned - out };
  });
  const groups = [...new Set(rows.map((r) => r.group))];
  const earned = income(transactions);
  const assigned = rows.reduce((s, r) => s + r.assigned, 0);
  const toAssign = earned - assigned;
  const totalOut = rows.reduce((s, r) => s + r.out, 0);

  const [move, setMove] = useState({ from: "", to: "", amount: "" });
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const panel = useRef<HTMLFormElement>(null);

  function cover(id: string, amount: number) {
    const donor = rows
      .filter(
        (r) => r.id !== id && (r.group === "Wants" || r.group === "Everyday"),
      )
      .sort(
        (a, b) =>
          Number(b.group === "Wants") - Number(a.group === "Wants") ||
          b.left - a.left,
      )[0];
    setMove({ from: donor.id, to: id, amount: amount.toFixed(2) });
    setError("");
    panel.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    panel.current
      ?.querySelector<HTMLSelectElement>("select")
      ?.focus({ preventScroll: true });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const amount = Number(move.amount);
    const from = rows.find((r) => r.id === move.from);
    const to = rows.find((r) => r.id === move.to);
    const problem = !from
      ? "Choose the envelope to take money from."
      : !to
        ? "Choose the envelope that receives the money."
        : from.id === to.id
          ? "Pick two different envelopes."
          : !(amount > 0)
            ? "Enter an amount above $0."
            : amount > from.assigned
              ? `${from.name} only has ${money(from.assigned)} assigned. Enter that or less.`
              : "";
    setError(problem);
    if (problem || !from || !to) return;
    actions.move(from.id, to.id, amount);
    setNote(`Moved ${money(amount)} from ${from.name} to ${to.name}.`);
    setMove({ from: "", to: "", amount: "" });
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>{app.month} budget</h1>
          <p>
            Type in the Assigned column to change an envelope. Red means it
            needs covering.
          </p>
        </div>
      </header>

      <section
        className="assign-banner"
        data-state={toAssign === 0 ? "zero" : toAssign < 0 ? "over" : "left"}
        aria-live="polite"
      >
        <p>
          <mark>
            <Amount value={toAssign} />
          </mark>
          <span>
            {toAssign === 0
              ? "Every dollar has a job this month."
              : toAssign > 0
                ? "to be assigned. Give it a job before you spend it."
                : "assigned that you do not have yet. Take it back from an envelope."}
          </span>
        </p>
        <p className="assign-sum">
          <Amount value={earned} cents={false} /> income −{" "}
          <Amount value={assigned} cents={false} /> assigned
        </p>
      </section>

      <div className="table-scroll">
        <table className="ledger-table budget-table">
          <caption className="sr-only">Envelopes for {app.month}</caption>
          <thead>
            <tr>
              <th scope="col">Envelope</th>
              <th scope="col" className="num-col">
                Assigned
              </th>
              <th scope="col" className="num-col">
                Spent
              </th>
              <th scope="col" className="num-col">
                Available
              </th>
            </tr>
          </thead>
          {groups.map((g) => (
            <tbody key={g}>
              <tr className="group-row">
                <th scope="colgroup" colSpan={4}>
                  {g}
                </th>
              </tr>
              {rows
                .filter((r) => r.group === g)
                .map((r) => (
                  <tr key={r.id} data-over={r.left < 0 ? "" : undefined}>
                    <th scope="row">
                      <span className="env-name">{r.name}</span>
                      <span
                        className="meter"
                        data-over={r.left < 0 ? "" : undefined}
                        aria-hidden
                      >
                        <span
                          style={{
                            width: `${r.assigned ? Math.min(100, (r.out / r.assigned) * 100) : r.out ? 100 : 0}%`,
                          }}
                        />
                      </span>
                    </th>
                    <td className="num" data-label="Assigned">
                      <span className="money-cell">
                        <span aria-hidden>$</span>
                        <input
                          key={r.assigned}
                          className="num"
                          inputMode="decimal"
                          aria-label={`Assigned to ${r.name}`}
                          defaultValue={r.assigned.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                          onFocus={(e) => e.currentTarget.select()}
                          onKeyDown={(e) =>
                            e.key === "Enter" && e.currentTarget.blur()
                          }
                          onBlur={(e) => {
                            const v = Number(
                              e.currentTarget.value.replace(/[$,\s]/g, ""),
                            );
                            if (Number.isFinite(v) && v !== r.assigned)
                              actions.assign(r.id, v);
                            else
                              e.currentTarget.value = r.assigned.toLocaleString(
                                "en-US",
                                { minimumFractionDigits: 2 },
                              );
                          }}
                        />
                      </span>
                    </td>
                    <td className="num" data-label="Spent">
                      <Amount value={r.out} tone={false} />
                    </td>
                    <td className="num" data-label="Available">
                      <span className="avail">
                        <Amount value={r.left} />
                        {r.left < 0 && (
                          <button
                            type="button"
                            className="btn btn-small btn-danger"
                            onClick={() => cover(r.id, -r.left)}
                          >
                            Cover
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          ))}
          <tfoot>
            <tr className="total-row">
              <th scope="row">Total</th>
              <td className="num" data-label="Assigned">
                <Amount value={assigned} />
              </td>
              <td className="num" data-label="Spent">
                <Amount value={totalOut} tone={false} />
              </td>
              <td className="num" data-label="Available">
                <Amount value={assigned - totalOut} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <form
        className="panel move-panel"
        ref={panel}
        onSubmit={submit}
        noValidate
        aria-labelledby="move-h"
      >
        <h2 id="move-h">
          <ArrowRightLeft size={18} aria-hidden /> Move money between envelopes
        </h2>
        <div className="move-fields">
          <div className="field">
            <label htmlFor="move-from">From</label>
            <select
              id="move-from"
              value={move.from}
              onChange={(e) => setMove({ ...move, from: e.target.value })}
            >
              <option value="">Choose…</option>
              {rows.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({money(r.left)} left)
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="move-to">To</label>
            <select
              id="move-to"
              value={move.to}
              onChange={(e) => setMove({ ...move, to: e.target.value })}
            >
              <option value="">Choose…</option>
              {rows.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="move-amount">Amount</label>
            <input
              id="move-amount"
              inputMode="decimal"
              className="num"
              placeholder="0.00"
              value={move.amount}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "move-err" : undefined}
              onChange={(e) =>
                setMove({
                  ...move,
                  amount: e.target.value.replace(/[^\d.]/g, ""),
                })
              }
            />
          </div>
          <button className="btn btn-primary">Move money</button>
        </div>
        {error && (
          <p className="field-error" id="move-err">
            {error}
          </p>
        )}
        <p className="form-success" role="status">
          {note}
        </p>
      </form>
    </div>
  );
}
