import { useState } from "react";
import { ArrowRight, Check, Moon, Sun } from "lucide-react";
import { Link } from "../router";
import {
  focuses,
  ritualCopy,
  skinTypes,
  steps,
  type Focus,
  type Skin,
  type Step,
  type Time,
} from "../content";
import { addLines, money } from "../lib/cart";
import { PLAN, buildRitual, ritualSeconds } from "../lib/ritual";
import { Strata } from "../components/Strata";

export function Ritual() {
  const [time, setTime] = useState<Time>(
    new Date().getHours() >= 16 ? "pm" : "am",
  );
  const [skin, setSkin] = useState<Skin>("combination");
  const [focus, setFocus] = useState<Focus>("hydration");
  const [minutes, setMinutes] = useState(5);
  const [swaps, setSwaps] = useState<Partial<Record<Step, string>>>({});
  const [added, setAdded] = useState("");

  const ritual = buildRitual({ time, skin, focus, minutes }, swaps);
  const skipped = PLAN[time][minutes].filter(
    (s) => !ritual.some((r) => r.step === s),
  );
  const total = ritual.reduce((s, r) => s + r.product.sizes[0].price, 0);
  const secs = ritualSeconds(ritual);
  const when = time === "am" ? "morning" : "evening";

  function change<T>(set: (v: T) => void) {
    return (v: T) => {
      set(v);
      setAdded("");
    };
  }

  function addAll() {
    addLines(
      ritual.map(({ product: p }) => ({
        id: p.id,
        name: p.name,
        size: p.sizes[0].label,
        unit: p.sizes[0].price,
        qty: 1,
      })),
    );
    setAdded(`Your ${when} ritual, ${ritual.length} products, is in your bag.`);
  }

  return (
    <div className="ritual-page" data-time={time}>
      <header className="page-head">
        <h1>{ritualCopy.title}</h1>
        <p className="lede">{ritualCopy.text}</p>
      </header>

      <div className="builder">
        <form
          className="builder-form"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Ritual questions"
        >
          <fieldset>
            <legend>When is this ritual for?</legend>
            <div className="options two">
              {(
                [
                  ["am", "Morning", Sun],
                  ["pm", "Evening", Moon],
                ] as const
              ).map(([id, label, Icon]) => (
                <label key={id} className="option">
                  <input
                    type="radio"
                    name="time"
                    checked={time === id}
                    onChange={() => change(setTime)(id)}
                  />
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>How does your skin feel by midday?</legend>
            <div className="options two">
              {skinTypes.map((s) => (
                <label key={s.id} className="option">
                  <input
                    type="radio"
                    name="skin"
                    checked={skin === s.id}
                    onChange={() => change(setSkin)(s.id)}
                  />
                  <span>
                    {s.label}
                    <small>{s.hint}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>What would you most like to change?</legend>
            <div className="options">
              {focuses.map((f) => (
                <label key={f.id} className="option">
                  <input
                    type="radio"
                    name="focus"
                    checked={focus === f.id}
                    onChange={() => change(setFocus)(f.id)}
                  />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>How long do you have?</legend>
            <div className="options three">
              {ritualCopy.minutes.map((m) => (
                <label key={m.value} className="option">
                  <input
                    type="radio"
                    name="minutes"
                    checked={minutes === m.value}
                    onChange={() => change(setMinutes)(m.value)}
                  />
                  <span>
                    {m.label}
                    <small>{m.hint}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="quiet">{ritualCopy.note}</p>
        </form>

        <section className="builder-result" aria-labelledby="result-h">
          <h2 id="result-h">
            Your {when} ritual
            <span aria-live="polite" className="result-meta">
              {ritual.length} layers · about{" "}
              {Math.max(1, Math.round(secs / 60))}{" "}
              {Math.round(secs / 60) === 1 ? "minute" : "minutes"}
            </span>
          </h2>
          <p className="strata-key">
            Applied from the bottom up, thinnest to thickest. Change any step
            with its menu.
          </p>
          <Strata
            ritual={ritual}
            onSwap={(step, id) => change(setSwaps)({ ...swaps, [step]: id })}
          />
          {skipped.length > 0 && (
            <p className="skipped">
              {skipped
                .map((s) => steps.find((x) => x.id === s)!.label)
                .join(" and ")}{" "}
              left out: none of ours suits {skin} skin at this step, and your
              skin makes enough of its own.
            </p>
          )}
          <div className="result-buy">
            <button type="button" className="btn btn-wide" onClick={addAll}>
              Add all {ritual.length} to bag · {money(total)}
            </button>
            <p className="added" role="status">
              {added && (
                <>
                  <Check size={16} aria-hidden="true" /> {added}{" "}
                  <Link to="/cart">View bag</Link>
                </>
              )}
            </p>
          </div>
        </section>
      </div>

      <section className="section builder-notes">
        <h2>How the builder decides</h2>
        <div className="notes-cols">
          <p>
            It keeps only the products made for your skin type and time of day,
            then ranks them by how well they answer what you want to change.
            Steps that need a product your skin does not suit are left out
            rather than forced.
          </p>
          <p>
            Layers are ordered by texture, from watery essence to the richest
            cream, and each carries its own pause so the next one does not pill.
            The minutes are the real total, settling time included.
          </p>
          <p>
            Want the reasoning behind the order?{" "}
            <Link to="/journal/thinnest-to-thickest" className="text-link">
              Read how to layer <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
