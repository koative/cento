import { Link } from "../router";
import { households } from "../content";
import { money } from "../lib/format";

export default function Households() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{households.heading}</h1>
        <p className="lede">{households.lede}</p>
      </header>

      <div className="wrap household-list">
        {households.list.map((h) => {
          const total = h.envelopes.reduce((s, e) => s + e.amount, 0);
          return (
            <section
              key={h.id}
              className="household"
              aria-labelledby={`hh-${h.id}`}
            >
              <div className="household-copy">
                <h2 id={`hh-${h.id}`}>{h.name}</h2>
                <p className="household-who">{h.who}</p>
                <dl>
                  <dt>The problem</dt>
                  <dd>{h.problem}</dd>
                  <dt>The setup</dt>
                  <dd>{h.approach}</dd>
                </dl>
                <blockquote>“{h.quote}”</blockquote>
              </div>
              <table className="ledger-table">
                <caption>
                  A typical month,{" "}
                  <span className="num">
                    {money(h.income, { cents: false })}
                  </span>{" "}
                  take-home
                </caption>
                <tbody>
                  {h.envelopes.map((e) => (
                    <tr key={e.name}>
                      <th scope="row">
                        {e.name}
                        <span className="meter" aria-hidden>
                          <span
                            style={{ width: `${(e.amount / h.income) * 100}%` }}
                          />
                        </span>
                      </th>
                      <td className="num">
                        {money(e.amount, { cents: false })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <th scope="row">Left to assign</th>
                    <td className="num">
                      {money(h.income - total, { cents: false })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </section>
          );
        })}
      </div>

      <section className="close wrap" aria-labelledby="hh-close">
        <h2 id="hh-close">Set up your own month</h2>
        <p>
          Start with three envelopes: rent, food, and one thing you are saving
          for. Add the rest as the month teaches you.
        </p>
        <div className="actions">
          <Link to="/signup" className="btn btn-primary btn-large">
            Start free
          </Link>
          <Link
            to="/guides/give-every-dollar-a-job"
            className="btn btn-quiet btn-large"
          >
            Read the one-paycheck guide
          </Link>
        </div>
      </section>
    </>
  );
}
