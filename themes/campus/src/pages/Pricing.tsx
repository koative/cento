import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { pricing, type Billing } from "../content";

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [seats, setSeats] = useState(8);
  const setSeatCount = (n: number) =>
    setSeats(Math.min(200, Math.max(5, Math.round(n) || 5)));
  const billedSeats = Math.max(5, seats);

  return (
    <div className="wrap page">
      <header className="page-head center">
        <h1>{pricing.heading}</h1>
        <p className="lede">{pricing.text}</p>
        <fieldset className="segmented">
          <legend className="sr-only">Billing period</legend>
          {(["monthly", "yearly"] as const).map((b) => (
            <label key={b}>
              <input
                type="radio"
                name="billing"
                value={b}
                checked={billing === b}
                onChange={() => setBilling(b)}
              />
              <span>
                {b === "monthly" ? "Monthly" : "Yearly — save a third"}
              </span>
            </label>
          ))}
        </fieldset>
      </header>

      <div className="plans">
        {pricing.plans.map((p) => {
          const price = billing === "yearly" ? p.yearly : p.monthly;
          return (
            <section
              key={p.id}
              className={p.featured ? "plan plan-featured" : "plan"}
              aria-labelledby={`plan-${p.id}`}
            >
              <h2 id={`plan-${p.id}`}>{p.name}</h2>
              <p className="plan-blurb">{p.blurb}</p>
              <p className="plan-price">
                <span className="num">${price}</span>{" "}
                <span className="plan-unit">{p.unit}</span>
              </p>
              <p className="plan-note num" aria-live="polite">
                {p.id === "course"
                  ? "Courses are $59–$119 each"
                  : billing === "yearly"
                    ? `$${price * 12} billed once a year`
                    : "Billed monthly, cancel any time"}
              </p>

              {p.id === "teams" && (
                <div className="seats">
                  <label htmlFor="seats">Seats</label>
                  <div className="stepper">
                    <button
                      type="button"
                      aria-label="Remove a seat"
                      onClick={() => setSeatCount(seats - 1)}
                      disabled={seats <= 5}
                    >
                      <Minus size={16} aria-hidden />
                    </button>
                    <input
                      id="seats"
                      type="number"
                      inputMode="numeric"
                      min={5}
                      max={200}
                      value={seats}
                      onChange={(e) =>
                        setSeats(Math.min(200, Number(e.target.value) || 0))
                      }
                      onBlur={() => setSeatCount(seats)}
                    />
                    <button
                      type="button"
                      aria-label="Add a seat"
                      onClick={() => setSeatCount(seats + 1)}
                      disabled={seats >= 200}
                    >
                      <Plus size={16} aria-hidden />
                    </button>
                  </div>
                  <p className="seats-total num" aria-live="polite">
                    $
                    {(
                      billedSeats *
                      price *
                      (billing === "yearly" ? 12 : 1)
                    ).toLocaleString("en-US")}{" "}
                    {billing === "yearly" ? "a year" : "a month"} for{" "}
                    {billedSeats} seats
                  </p>
                </div>
              )}

              <ul className="ticks">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={16} aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to={p.id === "course" ? "/courses" : "/signup"}
                className={
                  p.featured
                    ? "btn btn-primary btn-block"
                    : "btn btn-quiet btn-block"
                }
              >
                {p.cta}
              </Link>
            </section>
          );
        })}
      </div>

      <section className="section">
        <h2>Compare plans</h2>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Plan comparison"
        >
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                {pricing.plans.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.compare.map((r) => (
                <tr key={r.row}>
                  <th scope="row">{r.row}</th>
                  {r.values.map((v, i) => (
                    <td key={i}>
                      {v === "—" ? <span aria-label="Not included">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section faq">
        <h2>Questions people ask before joining</h2>
        <div className="faq-list">
          {pricing.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
