import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { financing, model, type PayOption } from "../content";
import { estimate, money, monthlyPayment, usePlan } from "../lib/energy";
import { CompareTable, PageHead } from "../components/Bits";

const YEARS = 20;

export default function Financing() {
  const plan = usePlan();
  const est = estimate(plan);
  const [price, setPrice] = useState(est.price);
  const [bill, setBill] = useState(plan.bill);
  const [offset, setOffset] = useState(Math.round(est.offset * 100) || 80);
  const [option, setOption] = useState<PayOption["id"]>("loan");
  const [downPct, setDownPct] = useState(0);
  const [term, setTerm] = useState(20);
  const chartId = useId();

  const down = Math.round((price * downPct) / 100);
  const loanMonthly = monthlyPayment(price - down, financing.loanApr, term);
  const subscribeMonthly =
    est.kwp * financing.subscribePerKwp +
    plan.batteries * financing.subscribeBattery;
  const payment =
    option === "cash" ? 0 : option === "loan" ? loanMonthly : subscribeMonthly;
  const remaining = bill * (1 - offset / 100);
  const newMonthly = payment + remaining;
  const diff = bill - newMonthly;

  // Cumulative spend, year 0 to 20: utility alone versus the chosen way to pay.
  const utility = [0];
  const solar = [option === "cash" ? price : option === "loan" ? down : 0];
  for (let y = 1; y <= YEARS; y++) {
    const rise = (1 + model.priceRise) ** (y - 1);
    const pay =
      option === "cash"
        ? 0
        : option === "loan"
          ? y <= term
            ? loanMonthly * 12
            : 0
          : subscribeMonthly * 12 * 1.019 ** (y - 1);
    utility.push(utility[y - 1] + bill * 12 * rise);
    solar.push(solar[y - 1] + remaining * 12 * rise + pay);
  }
  const breakeven = solar.findIndex((s, y) => y > 0 && s < utility[y]);
  const top = Math.max(utility[YEARS], solar[YEARS], 1);
  const Y = (v: number) => 190 - (v / top) * 170;
  const pts = (xs: number[]) =>
    xs.map((v, y) => `${40 + y * 22},${Y(v)}`).join(" ");
  // End labels sit right of the lines; nudge them apart when the totals are close.
  const yU = Y(utility[YEARS]) + 4;
  const yS =
    Math.abs(Y(solar[YEARS]) - Y(utility[YEARS])) < 16
      ? yU + 16
      : Y(solar[YEARS]) + 4;

  return (
    <>
      <PageHead title={financing.title} lead={financing.intro} />

      <section className="wrap calc" aria-label="Financing calculator">
        <div className="calc-inputs">
          <p className="quiet-note">
            Prefilled from your planner layout: {est.kwp.toFixed(2)} kWp,{" "}
            {plan.batteries} {plan.batteries === 1 ? "battery" : "batteries"}.{" "}
            <Link to="/planner" className="text-link">
              Change it
            </Link>
          </p>
          <fieldset className="segmented segmented-3">
            <legend>How you pay</legend>
            {financing.options.map((o) => (
              <label key={o.id}>
                <input
                  type="radio"
                  name="pay"
                  value={o.id}
                  checked={option === o.id}
                  onChange={() => setOption(o.id)}
                />
                <span>{o.short}</span>
              </label>
            ))}
          </fieldset>
          <p className="option-detail">
            {financing.options.find((o) => o.id === option)?.detail}
          </p>

          {option !== "subscribe" && (
            <div className="field">
              <label htmlFor="price">System price, before incentives</label>
              <div className="affix">
                <span aria-hidden="true">$</span>
                <input
                  id="price"
                  type="number"
                  inputMode="numeric"
                  min={3000}
                  max={120000}
                  step={10}
                  value={price}
                  onChange={(e) => setPrice(Math.max(0, +e.target.value))}
                />
              </div>
            </div>
          )}

          <label className="range-field">
            <span>
              Current monthly bill{" "}
              <output className="num">{money(bill)}</output>
            </span>
            <input
              type="range"
              min={60}
              max={480}
              step={10}
              value={bill}
              aria-valuetext={money(bill)}
              onChange={(e) => setBill(+e.target.value)}
            />
          </label>

          <label className="range-field">
            <span>
              Share of the bill solar covers{" "}
              <output className="num">{offset}%</output>
            </span>
            <input
              type="range"
              min={30}
              max={100}
              step={1}
              value={offset}
              aria-valuetext={`${offset}%`}
              onChange={(e) => setOffset(+e.target.value)}
            />
          </label>

          {option === "loan" && (
            <>
              <label className="range-field">
                <span>
                  Down payment <output className="num">{money(down)}</output>
                </span>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={downPct}
                  aria-valuetext={`${downPct}%, ${money(down)}`}
                  onChange={(e) => setDownPct(+e.target.value)}
                />
              </label>
              <fieldset className="segmented">
                <legend>Loan term at {financing.loanApr}% APR</legend>
                {financing.loanTerms.map((t) => (
                  <label key={t}>
                    <input
                      type="radio"
                      name="term"
                      value={t}
                      checked={term === t}
                      onChange={() => setTerm(t)}
                    />
                    <span>{t} yrs</span>
                  </label>
                ))}
              </fieldset>
            </>
          )}
        </div>

        <div className="calc-out">
          <div className="monthly" aria-live="polite">
            <div>
              <span>Today</span>
              <strong className="num">{money(bill)}</strong>
              <span>utility bill a month</span>
            </div>
            <div>
              <span>
                With {financing.options.find((o) => o.id === option)?.label}
              </span>
              <strong className="num">{money(newMonthly)}</strong>
              <span className="num">
                {option === "cash"
                  ? "remaining bill"
                  : `${money(payment)} payment + ${money(remaining)} bill`}
              </span>
            </div>
          </div>
          <p className="verdict" data-good={diff >= 0 ? "" : undefined}>
            {diff >= 0
              ? `${money(diff)} less each month than you pay now, from the first bill.`
              : option === "loan"
                ? `${money(-diff)} more each month while the loan runs; you own the system outright after year ${term}.`
                : `${money(-diff)} more each month than you pay now.`}
            {option === "cash" &&
              ` Your ${money(price)} is paid back in about ${breakeven > 0 ? breakeven : "over " + YEARS} years.`}
          </p>

          <figure className="cum-chart">
            <svg viewBox="0 0 560 214" role="img" aria-labelledby={chartId}>
              <title
                id={chartId}
              >{`Total spent over ${YEARS} years: ${money(utility[YEARS])} staying with the utility, ${money(solar[YEARS])} with solar`}</title>
              {[0, 5, 10, 15, 20].map((y) => (
                <g key={y}>
                  <line
                    x1={40 + y * 22}
                    x2={40 + y * 22}
                    y1="20"
                    y2="190"
                    className="tick"
                  />
                  <text
                    x={40 + y * 22}
                    y="208"
                    textAnchor="middle"
                    className="axis"
                  >
                    {y === 0 ? "Today" : `Year ${y}`}
                  </text>
                </g>
              ))}
              <polyline points={pts(utility)} className="cum-utility" />
              <polyline points={pts(solar)} className="cum-solar" />
              {breakeven > 0 && (
                <circle
                  cx={40 + breakeven * 22}
                  cy={Y(solar[breakeven])}
                  r="5"
                  className="cum-dot"
                />
              )}
              <text x="490" y={yU} className="cum-label">
                {money(utility[YEARS])}
              </text>
              <text x="490" y={yS} className="cum-label cum-label-solar">
                {money(solar[YEARS])}
              </text>
            </svg>
            <figcaption>
              <span className="key key-utility">
                Utility only, rising {(model.priceRise * 100).toFixed(1)}% a
                year
              </span>
              <span className="key key-solar">
                With solar: payments plus remaining bill
              </span>
            </figcaption>
          </figure>
          <div className="actions">
            <Link to="/quote" className="btn btn-sun">
              Get a fixed price <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Side by side</h2>
        </div>
        <CompareTable />
        <p className="quiet-note">{financing.disclaimer}</p>
      </section>
    </>
  );
}
