import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing, systems } from "../content";
import { PageHead } from "../components/PageHead";
import { usd } from "../lib/format";

const billable = systems.filter((s) => s.ratePerSecond !== null);
const OVERHEAD_S = 0.05; // per-circuit load and reset time on the control stack

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [slug, setSlug] = useState("moraine-108");
  const [circuits, setCircuits] = useState(200);
  const [shots, setShots] = useState(4000);
  const sys = billable.find((s) => s.slug === slug)!;
  const seconds = circuits * (shots * sys.shotMicros * 1e-6 + OVERHEAD_S);
  const cost = seconds * sys.ratePerSecond!;

  return (
    <>
      <PageHead title={pricing.heading} lead={pricing.lead} />

      <section className="wrap" aria-labelledby="plans-h">
        <div className="plans-bar">
          <h2 id="plans-h">Plans</h2>
          <div
            className="billing-toggle"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
            >
              Annual
            </button>
          </div>
          <p className="quiet-note">
            {annual ? pricing.annualNote : "Monthly billing, cancel any time."}
          </p>
        </div>
        <ul className="plans">
          {pricing.plans.map((p) => {
            const price = annual ? p.annual : p.monthly;
            return (
              <li
                key={p.id}
                className="plan"
                data-featured={p.id === "research" || undefined}
              >
                <h3>{p.name}</h3>
                <p className="plan-line">{p.line}</p>
                <p className="plan-price">
                  {price === null
                    ? "Custom"
                    : price === 0
                      ? "Free"
                      : usd(price)}
                  {price !== null && price > 0 && <span> / month</span>}
                </p>
                <p className="plan-minutes">{p.minutes}</p>
                <p className="plan-systems">{p.systems}</p>
                <ul className="ticks">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={16} aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/access"
                  className={
                    p.id === "research" ? "btn btn-primary" : "btn btn-quiet"
                  }
                >
                  {p.cta}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section wrap rates" aria-labelledby="rates-h">
        <div className="rates-table">
          <h2 id="rates-h">On-demand rates</h2>
          <p>Billed per QPU-second beyond your plan's included time.</p>
          <table className="spec-table">
            <thead>
              <tr>
                <th scope="col">System</th>
                <th scope="col">Per QPU-second</th>
                <th scope="col">Per shot, typical</th>
              </tr>
            </thead>
            <tbody>
              {billable.map((s) => (
                <tr key={s.slug}>
                  <th scope="row">
                    <Link to={`/systems/${s.slug}`}>{s.name}</Link>
                  </th>
                  <td>${s.ratePerSecond!.toFixed(2)}</td>
                  <td>{s.shotMicros} µs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form
          className="estimator"
          onSubmit={(e) => e.preventDefault()}
          aria-labelledby="est-h"
        >
          <h2 id="est-h">Estimate a job</h2>
          <div className="field">
            <label htmlFor="est-system">System</label>
            <select
              id="est-system"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            >
              {billable.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="est-circuits">Circuits</label>
            <input
              id="est-circuits"
              type="number"
              inputMode="numeric"
              min={1}
              max={100000}
              value={circuits}
              onChange={(e) =>
                setCircuits(
                  Math.max(1, Math.min(100000, Number(e.target.value) || 1)),
                )
              }
            />
          </div>
          <div className="field">
            <label htmlFor="est-shots">Shots per circuit</label>
            <input
              id="est-shots"
              type="number"
              inputMode="numeric"
              min={1}
              max={100000}
              step={100}
              value={shots}
              onChange={(e) =>
                setShots(
                  Math.max(1, Math.min(100000, Number(e.target.value) || 1)),
                )
              }
            />
          </div>
          <output
            className="estimate"
            htmlFor="est-system est-circuits est-shots"
            aria-live="polite"
          >
            <span>
              <strong>
                {seconds < 60
                  ? `${seconds.toFixed(1)} s`
                  : `${(seconds / 60).toFixed(1)} min`}
              </strong>{" "}
              of QPU time
            </span>
            <span>
              <strong>{usd(cost)}</strong> on demand
            </span>
          </output>
          <p className="quiet-note">
            Includes 50 ms of load and reset per circuit.{" "}
            {seconds <= 600 && slug === "firn-24"
              ? "Fits inside the Open plan's free minutes."
              : ""}
          </p>
        </form>
      </section>

      <section className="section wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions about billing</h2>
        <div className="faq-list">
          {pricing.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
