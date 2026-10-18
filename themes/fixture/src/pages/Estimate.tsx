import { useRef, useState, type ReactNode } from "react";
import { Minus, Phone, Plus } from "lucide-react";
import { Link, navigate } from "../router";
import {
  brand,
  estimateOptions,
  services,
  tiers,
  trades,
  type Trade,
} from "../content";
import {
  areaForZip,
  defaultInput,
  estimate,
  fromPrice,
  loadEstimate,
  saveEstimate,
  type EstimateInput,
} from "../lib/estimate";
import { money } from "../lib/format";
import { EstimateLines, WorkOrder } from "../components/WorkOrder";

function Choice({
  name,
  value,
  checked,
  onPick,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onPick: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="choice">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onPick(value)}
      />
      <span className="choice-body">{children}</span>
    </label>
  );
}

export function Estimate() {
  const [input, setInput] = useState<EstimateInput>(
    () => loadEstimate() ?? defaultInput(),
  );
  const [no] = useState(() => `E-${20000 + Math.floor(Math.random() * 9000)}`);
  const set = (patch: Partial<EstimateInput>) =>
    setInput((i) => ({ ...i, ...patch }));
  const sheet = useRef<HTMLElement>(null);

  const e = estimate(input);
  const m = e.service.model;
  const trade = e.service.trade;
  const zip = input.zip.trim();
  const zipArea = areaForZip(zip);
  const ageNote = estimateOptions.age.find((a) => a.id === input.age)?.note;

  const book = () => {
    saveEstimate(input);
    navigate("/book");
  };

  return (
    <>
      <section className="page-head wrap">
        <h1>Instant estimate</h1>
        <p className="lede">
          The same arithmetic our technicians do at your door. Change anything
          on the left and the work order rewrites itself line by line.
        </p>
      </section>

      <div className="wrap estimate-grid">
        <form
          className="estimator"
          onSubmit={(ev) => (ev.preventDefault(), book())}
          aria-label="Estimate details"
        >
          <fieldset>
            <legend>What needs doing?</legend>
            <div className="segmented" role="group" aria-label="Trade">
              {(Object.keys(trades) as Trade[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={trade === t}
                  onClick={() =>
                    trade !== t &&
                    set({
                      slug: services.find((s) => s.trade === t)!.slug,
                      qty: 1,
                    })
                  }
                >
                  {trades[t].label}
                </button>
              ))}
            </div>
            <div className="choices choices-jobs">
              {services
                .filter((s) => s.trade === trade)
                .map((s) => (
                  <Choice
                    key={s.slug}
                    name="job"
                    value={s.slug}
                    checked={input.slug === s.slug}
                    onPick={(slug) => set({ slug, qty: 1 })}
                  >
                    <b>{s.name}</b>
                    <span>from {money(fromPrice(s))}</span>
                  </Choice>
                ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>How many {m.units}?</legend>
            <div className="stepper">
              <button
                type="button"
                aria-label={`One fewer ${m.unit}`}
                disabled={input.qty <= 1}
                onClick={() => set({ qty: input.qty - 1 })}
              >
                <Minus aria-hidden="true" />
              </button>
              <output aria-live="polite">
                {input.qty} {input.qty === 1 ? m.unit : m.units}
              </output>
              <button
                type="button"
                aria-label={`One more ${m.unit}`}
                disabled={input.qty >= m.max}
                onClick={() => set({ qty: input.qty + 1 })}
              >
                <Plus aria-hidden="true" />
              </button>
            </div>
            <p className="field-hint">
              Up to {m.max} per visit online. More than that and we'll price it
              on a free survey.
            </p>
          </fieldset>

          <fieldset>
            <legend>When was the house built?</legend>
            <div className="choices choices-row">
              {estimateOptions.age.map((a) => (
                <Choice
                  key={a.id}
                  name="age"
                  value={a.id}
                  checked={input.age === a.id}
                  onPick={(age) => set({ age })}
                >
                  <b>{a.label}</b>
                  <span>
                    {a.factor === 1
                      ? "Standard labour"
                      : `Labour × ${a.factor}`}
                  </span>
                </Choice>
              ))}
            </div>
            {ageNote && <p className="field-hint">{ageNote}.</p>}
          </fieldset>

          <fieldset>
            <legend>How easy is it to reach?</legend>
            <div className="choices">
              {estimateOptions.access.map((a) => (
                <Choice
                  key={a.id}
                  name="access"
                  value={a.id}
                  checked={input.access === a.id}
                  onPick={(access) => set({ access })}
                >
                  <b>{a.label}</b>
                  <span>{a.detail}</span>
                </Choice>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>How soon?</legend>
            <div className="choices">
              {estimateOptions.timing.map((t) => (
                <Choice
                  key={t.id}
                  name="timing"
                  value={t.id}
                  checked={input.timing === t.id}
                  onPick={(timing) => set({ timing })}
                >
                  <b>
                    {t.label}{" "}
                    <em>{t.fee ? `+ ${money(t.fee)}` : "No surcharge"}</em>
                  </b>
                  <span>{t.detail}</span>
                </Choice>
              ))}
            </div>
            {input.timing === "now" && (
              <p className="callout-now">
                <Phone aria-hidden="true" />
                <span>
                  Water or sparks right now? Don't fill in forms — call{" "}
                  <a href={brand.emergencyHref}>{brand.emergency}</a>.
                </span>
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend>Where is the job?</legend>
            <div className="field field-zip">
              <label htmlFor="f-est-zip">ZIP code (optional)</label>
              <input
                id="f-est-zip"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="40703"
                value={input.zip}
                aria-describedby="est-zip-verdict"
                onChange={(ev) =>
                  set({ zip: ev.target.value.replace(/\D/g, "") })
                }
              />
              <p
                id="est-zip-verdict"
                className="zip-verdict"
                data-tier={zipArea?.tier}
                aria-live="polite"
              >
                {zip.length < 5
                  ? "Adds the trip fee if you're past the ring road."
                  : zipArea
                    ? zipArea.tier === "none"
                      ? `${zipArea.name} is outside our area — we'll pass you to a firm we trust.`
                      : `${zipArea.name} · ${tiers[zipArea.tier].label} · ${tiers[zipArea.tier].fee}`
                    : `We don't recognise ${zip}. Check the service areas map.`}
              </p>
            </div>
          </fieldset>
        </form>

        <aside
          className="estimate-aside"
          aria-label="Your work order"
          ref={sheet}
        >
          <WorkOrder no={no} title="Estimate" className="wo-live">
            <EstimateLines input={input} live />
          </WorkOrder>
          <p className="fine">
            The range covers what we usually find once a wall or panel is open.
            The technician writes a fixed price at the door before any work
            starts — it is never above the top of this range without your
            say-so.
          </p>
          <div className="actions">
            <button
              type="button"
              className="btn btn-live btn-lg"
              onClick={book}
              disabled={zipArea?.tier === "none"}
            >
              Book this visit
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setInput(defaultInput())}
            >
              Start over
            </button>
          </div>
          {e.hours > 16 && (
            <p className="fine">
              A job this size starts with a free survey.{" "}
              <Link to="/book">Book one</Link> and we'll walk the house first.
            </p>
          )}
        </aside>
      </div>

      <div className="est-bar">
        <p>
          Estimate{" "}
          <b>
            {money(e.low)} – {money(e.high)}
          </b>
        </p>
        <button
          type="button"
          className="btn btn-live"
          onClick={() => sheet.current?.scrollIntoView({ behavior: "smooth" })}
        >
          View work order
        </button>
      </div>
    </>
  );
}
