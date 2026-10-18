import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Link } from "../router";
import {
  planCompare,
  planFaqs,
  planMultiplier,
  planPets,
  plans,
} from "../content";
import { money } from "../lib/format";
import { Faq } from "../components/Faq";

export function Plans() {
  const [pet, setPet] = useState("dog-medium");
  const [yearly, setYearly] = useState(false);
  const petLabel = planPets.find((p) => p.id === pet)!.label.toLowerCase();

  return (
    <>
      <section className="page-head wrap">
        <h1>Pet health plans</h1>
        <p className="lede">
          The routine care your pet needs anyway — exams, boosters, flea and
          worm treatment — spread into one monthly payment, with free nurse
          visits and money off everything else.
        </p>
      </section>

      <section className="section wrap" aria-label="Plan prices">
        <div className="plan-controls">
          <fieldset>
            <legend>Price for</legend>
            <div className="chips">
              {planPets.map((p) => (
                <label key={p.id} className="chip chip-radio">
                  <input
                    type="radio"
                    name="plan-pet"
                    value={p.id}
                    checked={pet === p.id}
                    onChange={() => setPet(p.id)}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Billing</legend>
            <div className="seg">
              <label className="seg-option">
                <input
                  type="radio"
                  name="billing"
                  checked={!yearly}
                  onChange={() => setYearly(false)}
                />
                <span>Monthly</span>
              </label>
              <label className="seg-option">
                <input
                  type="radio"
                  name="billing"
                  checked={yearly}
                  onChange={() => setYearly(true)}
                />
                <span>Yearly · 1 month free</span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="plan-grid" aria-live="polite">
          {plans.map((p) => {
            const monthly = Math.round(p.base * planMultiplier[pet]);
            return (
              <article
                key={p.id}
                className="plan"
                data-featured={p.featured ? "" : undefined}
              >
                <h2>{p.name}</h2>
                <p className="plan-for">{p.forWho}</p>
                <p className="plan-price">
                  <b>{money(yearly ? monthly * 11 : monthly)}</b>
                  <span>/{yearly ? "year" : "month"}</span>
                </p>
                <p className="plan-sub">
                  {yearly
                    ? `Saves ${money(monthly)} against monthly`
                    : `${money(monthly * 12)} over a year`}{" "}
                  · for a {petLabel}
                </p>
                <ul className="plan-list">
                  {p.includes.map((i) => (
                    <li key={i}>
                      <Check aria-hidden="true" /> {i}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book?reason=wellness"
                  className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  Join at your next visit
                </Link>
              </article>
            );
          })}
        </div>
        <p className="fine center">
          Prices are per pet. Sign-up happens at the clinic so we can examine
          your pet first; the first month is taken on the day.
        </p>
      </section>

      <section className="section wrap" aria-labelledby="h-compare">
        <h2 id="h-compare">Side by side</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="h-compare"
        >
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Included</th>
                {plans.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planCompare.map((row) => (
                <tr key={row.item}>
                  <th scope="row">{row.item}</th>
                  {row.values.map((v, i) => (
                    <td key={i}>
                      {v === true ? (
                        <Check role="img" aria-label="Included" />
                      ) : v === false ? (
                        <Minus role="img" aria-label="Not included" />
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="section wrap faq-section"
        aria-labelledby="h-plan-faq"
      >
        <h2 id="h-plan-faq">Plan questions</h2>
        <Faq items={planFaqs} />
      </section>
    </>
  );
}
