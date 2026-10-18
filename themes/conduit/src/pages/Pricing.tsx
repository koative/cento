import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";
import { num } from "../lib/format";

const usd = (n: number) => `$${num(Math.round(n))}`;
// Slider position 0–100 maps logarithmically onto 5,000 – 5,000,000 requests a month.
const toRequests = (v: number) => {
  const raw = 5000 * 10 ** ((v / 100) * 3);
  const step = 10 ** Math.max(3, Math.floor(Math.log10(raw)) - 1);
  return Math.round(raw / step) * step;
};

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [slider, setSlider] = useState(48);
  const requests = toRequests(slider);

  const costs = pricing.tiers
    .filter((t) => t.monthly !== null)
    .map((t) => {
      const base = (yearly ? t.yearly : t.monthly) ?? 0;
      const over = Math.max(0, requests - t.requests);
      const cost =
        t.rate === null
          ? over > 0
            ? null
            : base
          : base + (over / 1000) * t.rate;
      return { name: t.name, base, over, cost };
    });
  const best = costs
    .filter((c) => c.cost !== null)
    .sort((a, b) => (a.cost ?? 0) - (b.cost ?? 0))[0];

  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>{pricing.heading}</h1>
        <p className="lede">{pricing.lede}</p>
        <div className="segmented" role="group" aria-label="Billing period">
          <button
            type="button"
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            Yearly <span className="save">save 20%</span>
          </button>
        </div>
      </header>

      <section className="wrap tiers" aria-label="Plans">
        {pricing.tiers.map((t) => {
          const price = yearly ? t.yearly : t.monthly;
          return (
            <article
              key={t.name}
              className="tier"
              data-featured={t.name === "Team" ? "" : undefined}
            >
              <h2>{t.name}</h2>
              <p className="tier-summary">{t.summary}</p>
              <p className="tier-price">
                {price === null ? (
                  <span className="tier-amount">Let's talk</span>
                ) : (
                  <>
                    <span className="tier-amount tabular">${price}</span>
                    <span className="muted">
                      {" "}
                      per month{yearly && price > 0 ? ", billed yearly" : ""}
                    </span>
                  </>
                )}
              </p>
              <p className="tier-over muted">Over the limit: {t.overage}</p>
              <ul className="ticks">
                {t.features.map((f) => (
                  <li key={f}>
                    <Check size={16} aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to={t.cta.to}
                className={
                  t.name === "Team" ? "btn btn-signal" : "btn btn-quiet"
                }
              >
                {t.cta.label}
              </Link>
            </article>
          );
        })}
      </section>

      <section className="band">
        <div className="wrap section estimator">
          <div>
            <h2>Estimate a month</h2>
            <p>
              Drag to your expected request volume. Retries and validation
              failures are free, so count only calls that reach a provider.
            </p>
            <div className="field">
              <label htmlFor="volume">
                Requests per month:{" "}
                <strong className="tabular">{num(requests)}</strong>
              </label>
              <input
                id="volume"
                type="range"
                min={0}
                max={100}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                aria-valuetext={`${num(requests)} requests`}
              />
              <div className="range-scale muted tabular" aria-hidden="true">
                <span>5k</span>
                <span>50k</span>
                <span>500k</span>
                <span>5M</span>
              </div>
            </div>
          </div>
          <div className="estimate" aria-live="polite">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Base</th>
                  <th scope="col">Overage</th>
                  <th scope="col">Month</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((c) => (
                  <tr
                    key={c.name}
                    data-best={best?.name === c.name ? "" : undefined}
                  >
                    <th scope="row">{c.name}</th>
                    <td className="tabular">{usd(c.base)}</td>
                    <td className="tabular">
                      {c.cost === null
                        ? "over cap"
                        : c.over
                          ? num(c.over)
                          : "—"}
                    </td>
                    <td className="tabular">
                      {c.cost === null ? "—" : usd(c.cost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              {best ? (
                <>
                  <strong>{best.name}</strong> is the cheapest fit at{" "}
                  {usd(best.cost ?? 0)} a month
                  {yearly ? " on yearly billing" : ""}.
                </>
              ) : null}
              {requests >= 3000000 &&
                " At this volume, Enterprise committed pricing is usually lower — write to sales."}
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="section-title">Compare plans</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Plan comparison"
        >
          <table className="data-table compare">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {pricing.tiers.map((t) => (
                  <th key={t.name} scope="col">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.compare.map((r) => (
                <tr key={r.row}>
                  <th scope="row">{r.row}</th>
                  {r.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section faq">
        <h2 className="section-title">Questions about billing</h2>
        {pricing.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
