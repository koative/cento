import { ArrowRight, Minus, Plus, RotateCcw, Sparkles } from "lucide-react";
import { Link, navigate } from "../router";
import { model, planner } from "../content";
import {
  estimate,
  kwh,
  money,
  savePlan,
  usePlan,
  type Plan,
} from "../lib/energy";
import { EnergyDay } from "../components/EnergyDay";
import { RoofPlan, roofSlots } from "../components/RoofPlan";
import { PageHead } from "../components/Bits";

export default function Planner() {
  const plan = usePlan();
  const est = estimate(plan);
  const set = (patch: Partial<Plan>) => savePlan({ ...plan, ...patch });
  const facing =
    model.orientations.find((o) => o.id === plan.orientation) ??
    model.orientations[0];

  // Smallest layout that covers the household's yearly use, filled ridge-down.
  function fitToUse() {
    const perPanel =
      (model.panelWatts / 1000) * model.yieldPerKwp * facing.factor;
    const need = Math.min(
      roofSlots.length,
      Math.max(4, Math.ceil(est.annualUse / perPanel)),
    );
    set({ panels: roofSlots.slice(roofSlots.length - need) });
  }

  const results: [string, string][] = [
    ["System size", `${est.kwp.toFixed(2)} kWp`],
    ["Produced per year", kwh(est.annualGen)],
    ["Home use per year", kwh(est.annualUse)],
    [
      "Used at home",
      est.annualGen
        ? `${Math.round((est.selfUsed / est.annualGen) * 100)}% of production`
        : "—",
    ],
  ];

  return (
    <>
      <PageHead title={planner.title} lead={planner.intro} />

      <section className="wrap planner" aria-label="Plan your system">
        <div className="planner-left">
          <div className="planner-roof">
            <div className="planner-toolbar">
              <p className="num">
                <strong>{plan.panels.length}</strong> of {roofSlots.length}{" "}
                slots · {model.panelWatts} W panels
              </p>
              <div className="toolbar-actions">
                <button
                  type="button"
                  className="btn btn-small btn-line"
                  onClick={fitToUse}
                >
                  <Sparkles size={16} aria-hidden /> Fit to my use
                </button>
                <button
                  type="button"
                  className="btn btn-small btn-line"
                  onClick={() => set({ panels: roofSlots })}
                >
                  Fill roof
                </button>
                <button
                  type="button"
                  className="btn btn-small btn-quiet"
                  onClick={() => set({ panels: [] })}
                  disabled={!plan.panels.length}
                >
                  <RotateCcw size={16} aria-hidden /> Clear
                </button>
              </div>
            </div>
            <RoofPlan
              panels={plan.panels}
              onChange={(panels) => set({ panels })}
              facing={facing.label}
            />
            <p className="hint">
              Click a slot to place or lift a panel. On a keyboard, Tab to the
              roof, move with the arrow keys, press Space.
            </p>
          </div>

          <div className="assumptions">
            <h2>The arithmetic behind it</h2>
            <p>{planner.disclaimer}</p>
            <dl className="spec-table">
              {(
                [
                  [
                    "Utility import rate",
                    `$${model.importRate.toFixed(2)} per kWh`,
                  ],
                  ["Export credit", `$${model.exportRate.toFixed(2)} per kWh`],
                  [
                    "Yield, south-facing",
                    `${kwh(model.yieldPerKwp)} per kWp per year`,
                  ],
                  [
                    "Orientation losses",
                    model.orientations
                      .map((o) => `${o.label} ${Math.round(o.factor * 100)}%`)
                      .join(" · "),
                  ],
                  [
                    "Installed price",
                    `$${model.pricePerWatt.toFixed(2)} per watt, panels and inverter`,
                  ],
                  [
                    "Battery",
                    `${money(model.batteryPrice)} per Store 13, ${model.batteryKw} kW, 90% round trip`,
                  ],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className="num">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="planner-controls">
          <fieldset className="segmented">
            <legend>Roof faces</legend>
            {model.orientations.map((o) => (
              <label key={o.id}>
                <input
                  type="radio"
                  name="orientation"
                  value={o.id}
                  checked={plan.orientation === o.id}
                  onChange={() => set({ orientation: o.id })}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </fieldset>

          <label className="range-field">
            <span>
              Average monthly electricity bill{" "}
              <output className="num">{money(plan.bill)}</output>
            </span>
            <input
              type="range"
              min={60}
              max={480}
              step={10}
              value={plan.bill}
              aria-valuetext={money(plan.bill)}
              onChange={(e) => set({ bill: +e.target.value })}
            />
          </label>

          <div className="stepper-row">
            <span id="battery-label">
              Store 13 batteries <small>{model.batteryKwh} kWh each</small>
            </span>
            <div
              className="stepper"
              role="group"
              aria-labelledby="battery-label"
            >
              <button
                type="button"
                aria-label="One battery fewer"
                disabled={plan.batteries <= 0}
                onClick={() => set({ batteries: plan.batteries - 1 })}
              >
                <Minus size={18} aria-hidden />
              </button>
              <output className="num" aria-live="polite">
                {plan.batteries}
              </output>
              <button
                type="button"
                aria-label="One battery more"
                disabled={plan.batteries >= 2}
                onClick={() => set({ batteries: plan.batteries + 1 })}
              >
                <Plus size={18} aria-hidden />
              </button>
            </div>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={plan.ev}
              onChange={(e) => set({ ev: e.target.checked })}
            />
            <span>
              Electric car charged at home{" "}
              <small>
                Adds {kwh(model.evKwhPerYear)} a year and a Grid Charge 48
              </small>
            </span>
          </label>

          <div className="readout">
            <div className="readout-main">
              <span>Estimated yearly saving</span>
              <strong className="num">{money(est.savings)}</strong>
              <span className="num">
                {Math.round(est.offset * 100)}% of your electricity bill
              </span>
            </div>
            <dl>
              {results.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className="num">{v}</dd>
                </div>
              ))}
              <div>
                <dt>Installed price, before incentives</dt>
                <dd className="num">{money(est.price)}</dd>
              </div>
              <div>
                <dt>Simple payback</dt>
                <dd className="num">
                  {est.savings > 0 ? `${est.payback.toFixed(1)} years` : "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn btn-sun"
              onClick={() => navigate("/quote")}
              disabled={!plan.panels.length}
            >
              Price this design <ArrowRight size={18} aria-hidden />
            </button>
            <Link to="/financing" className="btn btn-line">
              See monthly payments
            </Link>
          </div>
          <p className="quiet-note">
            Your layout is kept on this device and carried into the quote and
            financing pages.
          </p>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Your roof, hour by hour</h2>
          <p>
            An average day for the layout above. Batteries fill from the midday
            surplus and carry the evening peak.
          </p>
        </div>
        <EnergyDay
          hours={est.hours}
          capacity={plan.batteries * model.batteryKwh}
        />
      </section>
    </>
  );
}
