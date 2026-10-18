import { useState, type CSSProperties } from "react";
import { RotateCcw, Send } from "lucide-react";
import { Link } from "../router";
import { engagements, roiPage } from "../content";
import {
  defaults,
  project,
  summarize,
  toQuery,
  type Inputs,
  type Month,
  type Tier,
} from "../lib/roi";
import { money, moneyShort } from "../lib/format";

export function RoiModel() {
  const [input, setInput] = useState<Inputs>(defaults);
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
    setInput((i) => ({ ...i, [k]: v }));
  const months = project(input);
  const s = summarize(months, input.margin);

  return (
    <div className="roi">
      <form
        className="roi-controls"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Model assumptions"
      >
        <div className="slider">
          <label htmlFor="roi-revenue">Monthly revenue today</label>
          <output htmlFor="roi-revenue">{money(input.revenue)}</output>
          <input
            id="roi-revenue"
            type="range"
            min={50000}
            max={3000000}
            step={10000}
            value={input.revenue}
            aria-valuetext={money(input.revenue)}
            onChange={(e) => set("revenue", Number(e.target.value))}
          />
          <p className="slider-ends" aria-hidden="true">
            <span>$50k</span>
            <span>$3M</span>
          </p>
        </div>

        <div className="slider">
          <label htmlFor="roi-margin">Gross margin</label>
          <output htmlFor="roi-margin">{input.margin}%</output>
          <input
            id="roi-margin"
            type="range"
            min={20}
            max={90}
            step={1}
            value={input.margin}
            aria-valuetext={`${input.margin} percent`}
            onChange={(e) => set("margin", Number(e.target.value))}
          />
          <p className="slider-ends" aria-hidden="true">
            <span>20%</span>
            <span>90%</span>
          </p>
        </div>

        <fieldset className="choice">
          <legend>Engagement</legend>
          {engagements.map((e) => (
            <label key={e.id} className="choice-opt">
              <input
                type="radio"
                name="tier"
                value={e.id}
                checked={input.tier === e.id}
                onChange={() => set("tier", e.id as Tier)}
              />
              <span className="choice-name">{e.name}</span>
              <span className="choice-meta">
                {e.oneOff
                  ? `${money(e.monthly)} once`
                  : `${money(e.monthly)} / month`}
              </span>
            </label>
          ))}
        </fieldset>

        <fieldset className="choice">
          <legend>Where you're starting</legend>
          {roiPage.maturity.map((m) => (
            <label key={m.id} className="choice-opt">
              <input
                type="radio"
                name="maturity"
                value={m.id}
                checked={input.maturity === m.id}
                onChange={() => set("maturity", m.id)}
              />
              <span className="choice-name">{m.label}</span>
            </label>
          ))}
        </fieldset>

        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setInput(defaults)}
        >
          <RotateCcw aria-hidden="true" /> Reset assumptions
        </button>
      </form>

      <div className="roi-out">
        <p className="roi-headline" aria-live="polite">
          <span className="roi-range">
            {moneyShort(s.low)}–<wbr />
            {moneyShort(s.high)}
          </span>
          <span>
            added revenue over 12 months, most likely{" "}
            <mark>{moneyShort(s.expected)}</mark>.
          </span>
        </p>

        <RevenueChart months={months} base={input.revenue} />
        <ReturnBars months={months} payback={s.payback} />

        <dl className="roi-facts">
          <div>
            <dt>Gross profit added</dt>
            <dd>{money(s.profit)}</dd>
          </div>
          <div>
            <dt>Surge fees, 12 months</dt>
            <dd>{money(s.fees)}</dd>
          </div>
          <div>
            <dt>Profit per dollar of fees</dt>
            <dd>{s.multiple.toFixed(1)}×</dd>
          </div>
          <div>
            <dt>Pays back</dt>
            <dd>{s.payback ? `Month ${s.payback}` : "Not within 12 months"}</dd>
          </div>
        </dl>

        <div className="btn-row">
          <Link to={`/proposal?${toQuery(input)}`} className="btn btn-ink">
            <Send aria-hidden="true" /> Attach this model to a proposal
          </Link>
        </div>

        <details className="roi-table">
          <summary>Month-by-month table</summary>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Added revenue (low)</th>
                  <th scope="col">Expected</th>
                  <th scope="col">High</th>
                  <th scope="col">Fee</th>
                  <th scope="col">Cumulative return</th>
                </tr>
              </thead>
              <tbody>
                {months.map((m) => (
                  <tr key={m.month}>
                    <th scope="row">{m.month}</th>
                    <td>{money(m.low)}</td>
                    <td>{money(m.expected)}</td>
                    <td>{money(m.high)}</td>
                    <td>{money(m.fee)}</td>
                    <td data-neg={m.net < 0 ? "" : undefined}>
                      {money(m.net)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <p className="fine">{roiPage.note}</p>
      </div>
    </div>
  );
}

/** Monthly revenue: today's baseline, the low–high band and the expected line. Labels are HTML so they never scale with the SVG. */
function RevenueChart({ months, base }: { months: Month[]; base: number }) {
  const top =
    base + Math.max(...months.map((m) => m.high)) * 1.08 + base * 0.01;
  const bottom = base - (top - base) * 0.12;
  const x = (i: number) => (i / 12) * 100;
  const y = (v: number) => ((top - (base + v)) / (top - bottom)) * 100;
  const pts = [{ month: 0, low: 0, expected: 0, high: 0 }, ...months];
  const line = (k: "low" | "expected" | "high") =>
    pts.map((m, i) => `${x(i)},${y(m[k])}`).join(" ");
  const band = `${line("high")} ${pts
    .map((m, i) => `${x(i)},${y(m.low)}`)
    .reverse()
    .join(" ")}`;
  const ticks = [base, base + (top - base) / 2, top - (top - base) * 0.08];

  return (
    <figure className="chart">
      <figcaption>Monthly revenue with a Surge program</figcaption>
      <div className="chart-plot">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon className="chart-band" points={band} />
          <line className="chart-base" x1="0" x2="100" y1={y(0)} y2={y(0)} />
          <polyline className="chart-line" points={line("expected")} />
        </svg>
        {ticks.map((t) => (
          <span
            key={t}
            className="chart-tick"
            style={{ "--y": `${y(t - base)}%` } as CSSProperties}
          >
            {moneyShort(t)}
          </span>
        ))}
        <span
          className="chart-tag"
          style={{ "--y": `${y(0)}%` } as CSSProperties}
        >
          Today
        </span>
      </div>
      <ol className="chart-x" aria-hidden="true">
        {months.map((m) => (
          <li key={m.month}>M{m.month}</li>
        ))}
      </ol>
      <p className="chart-key" aria-hidden="true">
        <span data-k="line">Expected</span>
        <span data-k="band">Low–high range</span>
        <span data-k="base">Today's revenue</span>
      </p>
    </figure>
  );
}

/** Cumulative return after fees: below the line until the program has paid for itself. */
function ReturnBars({
  months,
  payback,
}: {
  months: Month[];
  payback: number | null;
}) {
  const pos = Math.max(...months.map((m) => m.net), 0);
  const neg = Math.max(...months.map((m) => -m.net), 0);
  const span = pos + neg || 1;
  return (
    <figure className="returns">
      <figcaption>Cumulative return after fees</figcaption>
      <div
        className="returns-plot"
        style={{ "--pos": pos / span } as CSSProperties}
      >
        {months.map((m) => (
          <span
            key={m.month}
            className="return-bar"
            data-neg={m.net < 0 ? "" : undefined}
            data-payback={m.month === payback ? "" : undefined}
            style={{ "--h": Math.abs(m.net) / span } as CSSProperties}
            title={`Month ${m.month}: ${money(m.net)}`}
          />
        ))}
      </div>
      <ol className="chart-x" aria-hidden="true">
        {months.map((m) => (
          <li key={m.month}>M{m.month}</li>
        ))}
      </ol>
      <p className="returns-note">
        {payback
          ? `Fees covered by added gross profit in month ${payback}.`
          : "Added gross profit does not cover fees inside 12 months at these assumptions."}
      </p>
    </figure>
  );
}
