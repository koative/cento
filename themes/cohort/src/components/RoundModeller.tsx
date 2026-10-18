import { useId, useState, type CSSProperties } from "react";
import { modellerDefaults } from "../content";
import { modelRound, type Holder, type RoundInput } from "../lib/round";
import { compact, pct } from "../lib/format";

const holders: { key: Holder; label: string }[] = [
  { key: "founders", label: "Founders" },
  { key: "angels", label: "Angels & earlier" },
  { key: "pool", label: "Option pool" },
  { key: "cohort", label: "Cohort" },
  { key: "others", label: "Co-investors" },
];

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
};

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: SliderProps) {
  const id = useId();
  return (
    <div className="slider">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{display}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        style={
          {
            "--fill": `${((value - min) / (max - min)) * 100}%`,
          } as CSSProperties
        }
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Bar({
  label,
  shares,
}: {
  label: string;
  shares: Record<Holder, number>;
}) {
  return (
    <div className="cap-bar">
      <p className="cap-bar-label">{label}</p>
      <div className="cap-bar-track" aria-hidden="true">
        {holders
          .filter(({ key }) => shares[key] > 0)
          .map(({ key }) => (
            <span
              key={key}
              className={`seg seg-${key}`}
              style={{ flexBasis: `${shares[key]}%` }}
            >
              {shares[key] >= 15 && pct(shares[key])}
            </span>
          ))}
      </div>
    </div>
  );
}

/** Founders' dilution through one priced round: the arithmetic we walk through at every first meeting. */
export function RoundModeller() {
  const [input, setInput] = useState<RoundInput>({
    ...modellerDefaults,
    poolTiming: "post",
  });
  const set = (patch: Partial<RoundInput>) =>
    setInput((i) => ({ ...i, ...patch }));
  const r = modelRound(input);

  return (
    <div className="modeller">
      <div className="modeller-controls">
        <Slider
          label="Pre-money valuation"
          value={input.preMoney}
          min={4_000_000}
          max={40_000_000}
          step={500_000}
          display={compact(input.preMoney)}
          onChange={(v) => set({ preMoney: v })}
        />
        <Slider
          label="Amount raised"
          value={input.raise}
          min={500_000}
          max={10_000_000}
          step={250_000}
          display={compact(input.raise)}
          onChange={(v) => set({ raise: v })}
        />
        <Slider
          label="Option pool after the round"
          value={input.poolTarget}
          min={0}
          max={20}
          step={1}
          display={`${input.poolTarget}%`}
          onChange={(v) => set({ poolTarget: v })}
        />
        <Slider
          label="Cohort's part of the round"
          value={input.cohortShare}
          min={20}
          max={100}
          step={5}
          display={`${input.cohortShare}%`}
          onChange={(v) => set({ cohortShare: v })}
        />
        <fieldset className="timing">
          <legend>Who pays for the pool top-up?</legend>
          <label>
            <input
              type="radio"
              name="pool-timing"
              checked={input.poolTiming === "pre"}
              onChange={() => set({ poolTiming: "pre" })}
            />
            <span>
              Existing holders
              <small>Pool created pre-money, the market habit</small>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="pool-timing"
              checked={input.poolTiming === "post"}
              onChange={() => set({ poolTiming: "post" })}
            />
            <span>
              Everyone, new money included
              <small>Pool created post-money, how we write it</small>
            </span>
          </label>
        </fieldset>
        <p className="modeller-start">
          Starting cap table: founders {modellerDefaults.capTable.founders}%,
          angels {modellerDefaults.capTable.angels}%, pool{" "}
          {modellerDefaults.capTable.pool}%.
        </p>
      </div>

      <div className="modeller-result">
        <p className="modeller-headline" aria-live="polite">
          Founders keep <strong>{pct(r.after.founders)}</strong> after raising{" "}
          {compact(input.raise)} at a {compact(r.postMoney)} post-money. Cohort
          would own {pct(r.after.cohort)}.
        </p>
        <Bar label="Today" shares={r.before} />
        <Bar label="After the round" shares={r.after} />
        <table className="cap-table">
          <caption className="sr-only">
            Ownership before and after the round
          </caption>
          <thead>
            <tr>
              <th scope="col">Holder</th>
              <th scope="col">Today</th>
              <th scope="col">After</th>
            </tr>
          </thead>
          <tbody>
            {holders.map(({ key, label }) => (
              <tr key={key}>
                <th scope="row">
                  <i className={`swatch seg-${key}`} aria-hidden="true" />
                  {label}
                </th>
                <td>{r.before[key] ? pct(r.before[key]) : "—"}</td>
                <td>{pct(r.after[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="modeller-note">
          {input.poolTiming === "pre"
            ? `The pool top-up costs founders ${r.poolCost.toFixed(1)} points and lowers the effective pre-money to ${compact(r.effectivePre)}.`
            : `Sharing the top-up with the new money keeps the headline pre-money honest; founders give up ${r.poolCost.toFixed(1)} points in total.`}{" "}
          Illustrative arithmetic, not an offer.
        </p>
      </div>
    </div>
  );
}
