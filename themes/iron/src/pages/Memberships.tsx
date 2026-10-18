import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Link } from "../router";
import { compare, extras, faqs, joiningFee, plans, policies } from "../content";
import { money } from "../lib";
import { Rates } from "../components/Rates";

export function Memberships() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <>
      <header className="page-head wrap">
        <h1>Memberships</h1>
        <p className="lede">
          Three plans, no contracts. Every one starts with the four-week
          Foundations course and includes the floor during all staffed hours.
        </p>
      </header>

      <section className="wrap" aria-labelledby="plans-title">
        <h2 id="plans-title" className="sr-only">
          Plans
        </h2>
        <fieldset className="billing">
          <legend className="sr-only">Billing</legend>
          {(["monthly", "annual"] as const).map((b) => (
            <label key={b} className="billing-opt">
              <input
                type="radio"
                name="billing"
                value={b}
                checked={billing === b}
                onChange={() => setBilling(b)}
              />
              <span>
                {b === "monthly"
                  ? "Pay monthly"
                  : "Pay yearly — two months free"}
              </span>
            </label>
          ))}
        </fieldset>

        <ul className="plans">
          {plans.map((p) => (
            <li
              key={p.id}
              className="plan"
              data-featured={p.id === "classes" ? "" : undefined}
            >
              <h3>{p.name}</h3>
              <p className="plan-pitch">{p.pitch}</p>
              <p className="plan-price" aria-live="polite">
                <strong>
                  {money(billing === "monthly" ? p.monthly : p.annual)}
                </strong>
                <span>{billing === "monthly" ? "a month" : "a year"}</span>
              </p>
              <p className="plan-note">
                {billing === "monthly"
                  ? `Plus ${money(joiningFee)} joining fee`
                  : `${money(Math.round(p.annual / 12))} a month, no joining fee`}
              </p>
              <ul className="ticks">
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <Link
                to={`/join?plan=${p.id}&billing=${billing}`}
                className={`btn ${p.id === "classes" ? "btn-primary" : "btn-ghost"}`}
              >
                Join with {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="plans-foot">
          Most members choose Classes. Change plan from the first of any month.
        </p>
      </section>

      <section className="wrap section" aria-labelledby="compare">
        <h2 id="compare">Side by side</h2>
        <div className="table-scroll">
          <table className="compare">
            <thead>
              <tr>
                <td />
                {plans.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {plans.map((p) => {
                    const v = row[p.id];
                    return (
                      <td key={p.id}>
                        {v === true ? (
                          <Check aria-label="Included" />
                        ) : v === false ? (
                          <Minus aria-label="Not included" />
                        ) : (
                          v
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="extras">
        <div className="wrap two-col">
          <div>
            <h2 id="extras">Without a membership</h2>
            <dl className="specs">
              {extras.map((e) => (
                <div key={e.name}>
                  <dt>
                    {e.name}
                    {e.price !== null && (
                      <span className="spec-price">{money(e.price)}</span>
                    )}
                  </dt>
                  <dd>{e.note}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2>Personal training blocks</h2>
            <Rates />
          </div>
        </div>
      </section>

      <section className="wrap section two-col" aria-labelledby="policies">
        <div>
          <h2 id="policies">The small print, in large print</h2>
          <dl className="specs">
            {policies.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>Questions</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
